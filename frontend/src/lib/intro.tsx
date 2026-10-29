import { createContext, useContext } from "react";

export const IntroContext = createContext<boolean>(true);
export const useIntro = () => useContext(IntroContext);
