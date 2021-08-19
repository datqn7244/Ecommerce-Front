import React, { createContext } from "react";
import { ThemeProvider } from "@material-ui/core/styles";

import getTheme, { Themes } from "./base";
import usePersistentState from "../custom-hooks/usePersistentState";

const initialTheme: ThemeContextProps = {
  currentTheme: "light",
  setTheme: () => {},
};

export const CustomThemeContext =
  createContext<ThemeContextProps>(initialTheme);

const CustomThemeProvider: React.FC<{}> = ({ children }) => {
  const [currentTheme, setCurrentTheme] = usePersistentState(
    "light" as ContextTheme,
    "theme"
  );

  const theme = getTheme(currentTheme);
  const contextValue: ThemeContextProps = {
    currentTheme: currentTheme as keyof Themes,
    setTheme: setCurrentTheme,
  };
  return (
    <CustomThemeContext.Provider value={contextValue}>
      <ThemeProvider theme={{ ...theme }}>{children}</ThemeProvider>
    </CustomThemeContext.Provider>
  );
};

export default CustomThemeProvider;
