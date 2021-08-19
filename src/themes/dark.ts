import { createTheme } from '@material-ui/core/styles';

const theme = createTheme({
  palette: {
    type: "dark",
    primary: {
      light: "#39796b",
      main: "#004d40",
      dark: "#00251a",
      contrastText: "#ffffff",
    },
    secondary: {
      light: "#52c7b8",
      main: "#009688",
      dark: "#00675b",
      contrastText: "#000000",
    },
  },
  typography: {
    fontFamily: "'Varela Round', sans-serif",
  }
});

export default theme;
