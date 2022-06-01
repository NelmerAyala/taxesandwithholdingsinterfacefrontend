import React from "react";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import { esES } from "@mui/material/locale";
const theme = createTheme(
  {
    typography: {
      fontSize: 16,
      fontFamily: "Larto",
      titles: {
        fontSize: "2rem",
      },
      subtitles: {
        fontSize: "1.5rem",
      },
      h4: {
        fontSize: "1.5rem",
        fontWeight: "bold",
      },
      h3: {
        fontSize: "2rem",
      },
      h2: {
        fontSize: "3rem",
      },
    },
    palette: {
      primary: { main: "#00BFB3" },
      secondary: { main: "#75787B", light: "#9D9D9C" },
      white: { main: "#FFFFFF" },
      error: { main: "#E20613" },
    },
  },
  esES
);

const Layout = ({ children }) => {
  return (
    <>
      <ThemeProvider theme={theme}>
        <main>{children}</main>
      </ThemeProvider>
    </>
  );
};

export default Layout;
