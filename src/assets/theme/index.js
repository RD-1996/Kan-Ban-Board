import { createTheme } from "@mui/material/styles";
import { green } from "@mui/material/colors";
import { PRIMARY_COLOR } from "../constants/constants";

const theme = createTheme({
  palette: {
    primary: {
      main: PRIMARY_COLOR,
    },
    secondary: {
      main: green[500],
    },
  },

  typography: {
    fontSize: 12,
  },
});

export default theme;
