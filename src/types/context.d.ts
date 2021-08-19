type ContextTheme = "light" | "dark";

type ThemeContextProps = {
  currentTheme: ContextTheme;
  setTheme: React.Dispatch<React.SetStateAction<ContextTheme>>;
};
