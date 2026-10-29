import os
import asyncio
import logging
from html import escape
from pathlib import Path
from datetime import datetime, timezone, timedelta
from typing import Annotated, Literal, Optional, Any

from bson import ObjectId
from dotenv import load_dotenv
from fastapi import FastAPI, APIRouter, HTTPException, Request
from motor.motor_asyncio import AsyncIOMotorClient
from pydantic import BaseModel, BeforeValidator, ConfigDict, EmailStr, Field
from starlette.middleware.cors import CORSMiddleware

ROOT_DIR = Path(__file__).parent
load_dotenv(ROOT_DIR / ".env")

from email_service import send_email, EmailError, EMAIL_FROM_NAME  # noqa: E402

client = AsyncIOMotorClient(os.environ["MONGO_URL"])
db = client[os.environ["DB_NAME"]]
NOTIFY_TO = os.environ["ENQUIRY_NOTIFY_EMAIL"]

logging.basicConfig(level=logging.INFO, format="%(asctime)s - %(name)s - %(levelname)s - %(message)s")
logger = logging.getLogger(__name__)

app = FastAPI(title="SOLD AI Studio API")
api = APIRouter(prefix="/api")

PyObjectId = Annotated[str, BeforeValidator(lambda v: str(v) if isinstance(v, ObjectId) else v)]

SERVICES = Literal["Brand Strategy", "Brand Identity", "Digital Experience", "UI/UX Design", "Creative Direction", "Not Sure"]
BUDGETS = Literal["S$5,000 - S$10,000", "S$10,000 - S$20,000", "S$20,000 - S$50,000", "S$50,000+"]


class BaseDocument(BaseModel):
    model_config = ConfigDict(populate_by_name=True)
    id: Optional[PyObjectId] = Field(default=None, alias="_id")

    def to_mongo(self) -> dict[str, Any]:
        data = self.model_dump(by_alias=True, exclude_none=True)
        data.pop("_id", None)
        return data

    @classmethod
    def from_mongo(cls, doc: dict):
        return cls.model_validate(doc)


class Enquiry(BaseDocument):
    name: str
    email: str
    company: str = ""
    service: str
    budget: str
    message: str
    page: str = "/"
    ip: str = ""
    email_status: str = "pending"
    created_at: str


class EnquiryIn(BaseModel):
    name: str = Field(min_length=2, max_length=120)
    email: EmailStr
    company: str = Field(default="", max_length=160)
    service: SERVICES
    budget: BUDGETS
    message: str = Field(min_length=10, max_length=4000)
    page: str = Field(default="/", max_length=200)
    website: str = Field(default="", max_length=200)
    elapsed_ms: int = 0


def _client_ip(request: Request) -> str:
    fwd = request.headers.get("x-forwarded-for", "")
    return fwd.split(",")[0].strip() if fwd else (request.client.host if request.client else "")


def _row(label: str, value: str) -> str:
    return (f'<tr><td style="padding:8px 0;font-family:Arial,sans-serif;font-size:12px;color:#6b7280;'
            f'text-transform:uppercase;letter-spacing:1px;width:140px;vertical-align:top">{escape(label)}</td>'
            f'<td style="padding:8px 0;font-family:Arial,sans-serif;font-size:15px;color:#0b1220">{value}</td></tr>')


def _enquiry_html(e: Enquiry) -> str:
    msg = escape(e.message).replace("\n", "<br>")
    rows = "".join([
        _row("Name", escape(e.name)),
        _row("Email", f'<a href="mailto:{escape(e.email)}" style="color:#2D6BFF">{escape(e.email)}</a>'),
        _row("Company", escape(e.company) or "—"),
        _row("Service", escape(e.service)),
        _row("Budget", escape(e.budget)),
        _row("Sent from page", escape(e.page)),
        _row("Message", msg),
    ])
    return (f'<table role="presentation" width="100%" style="background:#f4f6fb;padding:24px"><tr><td>'
            f'<table role="presentation" width="100%" style="max-width:600px;margin:0 auto;background:#ffffff;padding:28px">'
            f'<tr><td style="font-family:Arial,sans-serif;font-size:12px;letter-spacing:2px;color:#2D6BFF">NEW ENQUIRY</td></tr>'
            f'<tr><td style="font-family:Arial,sans-serif;font-size:22px;color:#0b1220;padding:8px 0 16px">'
            f'{escape(e.name)} — {escape(e.service)}</td></tr>'
            f'<tr><td><table role="presentation" width="100%">{rows}</table></td></tr>'
            f'<tr><td style="font-family:Arial,sans-serif;font-size:12px;color:#888;padding-top:20px">'
            f'Sent by the {escape(EMAIL_FROM_NAME)} website enquiry form. Reply to the sender using the email link above.'
            f'</td></tr></table></td></tr></table>')


async def _notify(enquiry_id: str, e: Enquiry) -> None:
    status = "sent"
    try:
        await send_email(to=NOTIFY_TO, subject=f"New enquiry: {e.name} — {e.service}", html=_enquiry_html(e))
    except (EmailError, ValueError) as err:
        status = f"failed:{err}"
    await db.enquiries.update_one({"_id": ObjectId(enquiry_id)}, {"$set": {"email_status": status}})


@api.get("/")
async def root():
    return {"status": "ok", "service": "sold-ai-studio"}


@api.post("/enquiries", status_code=201)
async def create_enquiry(payload: EnquiryIn, request: Request):
    if payload.website:
        return {"id": "ok", "status": "received"}
    if payload.elapsed_ms and payload.elapsed_ms < 1500:
        raise HTTPException(status_code=400, detail="That was quick — please review your details and send again.")
    ip = _client_ip(request)
    since = (datetime.now(timezone.utc) - timedelta(minutes=10)).isoformat()
    if ip and await db.enquiries.count_documents({"ip": ip, "created_at": {"$gte": since}}) >= 5:
        raise HTTPException(status_code=429, detail="Too many enquiries in a short time. Please email hello@sold.com.sg.")
    e = Enquiry(
        name=payload.name.strip(), email=str(payload.email), company=payload.company.strip(),
        service=payload.service, budget=payload.budget, message=payload.message.strip(),
        page=payload.page, ip=ip, created_at=datetime.now(timezone.utc).isoformat(),
    )
    res = await db.enquiries.insert_one(e.to_mongo())
    enquiry_id = str(res.inserted_id)
    asyncio.create_task(_notify(enquiry_id, e))
    return {"id": enquiry_id, "status": "received"}


app.include_router(api)
app.add_middleware(
    CORSMiddleware,
    allow_credentials=True,
    allow_origins=os.environ.get("CORS_ORIGINS", "*").split(","),
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.on_event("shutdown")
async def shutdown_db_client():
    client.close()
