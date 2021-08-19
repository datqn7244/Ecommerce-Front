import { Theme } from "@material-ui/core/styles/createTheme";
import dark from "./dark";
import light from "./light";

export type Themes = {
  light: Theme;
  dark: Theme;
};

const themes: Themes = { light, dark };

export default function getTheme(theme: ContextTheme) {
  return themes[theme];
}
