import { createTheme } from "@mui/material/styles";

const theme = createTheme({
  palette: {
    mode: "dark",
    primary: { main: "#b23a5b" },
    secondary: { main: "#d9a441" },
    background: { default: "#1f1424", paper: "#2c1d33" },
    text: { primary: "#f3e9dc", secondary: "#b8a9b9" },
  },
  typography: {
    fontFamily: '"Figtree", system-ui, sans-serif',
    button: { textTransform: "none", fontWeight: 600 },
  },
  shape: { borderRadius: 12 },
  components: {
    MuiPaper: {
      styleOverrides: {
        root: { backgroundImage: "none" },
      },
    },
  },
});

export default theme;
