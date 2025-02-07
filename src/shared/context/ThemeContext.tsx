import { createContext } from "react";

type Context = {
  theme: string;
  changeTheme: () => void
}

export const ThemeContext = createContext<Context | null>(null)