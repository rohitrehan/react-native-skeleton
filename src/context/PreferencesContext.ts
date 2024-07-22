import React from "react";
import { LanguageKey } from "../core/languages";

export const PreferencesContext = React.createContext({
  toggleTheme: () => {},
  isThemeDark: false,
});
