# Push the SOLD AI Studio site to GitHub

The finished SOLD AI Studio website, in the Puture style, goes into a GitHub repository under the owner's own account.
The code goes up exactly as it is. Nothing is added or changed first.

## Who it's for
- The SOLD AI Studio owner, who wants a copy of the code in their own GitHub account
- Any developer or agency that later works on the site, or hosts it outside Emergent

## Core features and experience
- The whole current site goes up as it is: homepage, Studio, Services, Works, the 13 project pages, Contact, the enquiry form system and the design reference document.
- Private settings are left out on purpose: the email key, the database address and the alert email address. They stay in Emergent's Secrets tab.
- No setup guide is added (chosen by the owner). Anyone running the code elsewhere has to supply those private settings themselves.

## User flow
1. In Emergent, click the **Save** button, then **Save to GitHub**.
2. Connect your GitHub account the first time this is used.
3. Pick an existing repository or create a new one, and choose the branch.
4. Push. The code appears in the chosen repository.
5. Optional, later: clone the repository on a computer and copy the private settings from Emergent's Secrets tab.

## UI/UX feel
- The website itself does not change.
- Everything is done through Emergent's own Save to GitHub screen in a few clicks.

## Implementation phases
- **Phase 1 (now):** no build work. The owner pushes the current code with Save to GitHub. This needs a paid Emergent plan (Standard or higher). On the free plan the code can still be viewed and copied in the code editor.
- **Phase 2:** each later change, such as full case studies or the content editor, is pushed again the same way, so GitHub stays up to date.
- **Phase 3:** if the site moves to other hosting or another team, add a short setup guide and a list of the required settings at that point.

## Assumptions
- The push has to be done by the owner. The agent cannot push to GitHub on anyone's behalf.
- The owner has, or will create, a GitHub account and a repository. Whether it is private or public is chosen on the Save to GitHub screen. Private is the safer choice, because the code includes business content and the enquiry system.
- Private settings are never included in the push. This is Emergent's standard behaviour and is not changed.
- Nothing in the site is edited before the push, as the owner asked.
