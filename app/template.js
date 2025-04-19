"use client";
import DrawerAppBar from "./components/DrawerAppBar/DrawerAppBar";
import Footer from "./components/Footer";
import { ThemeProvider, createTheme } from "@mui/material/styles";

const theme = createTheme({
  typography: {
    allVariants: {
      fontFamily: "var(--font-poppins)",
    },
  },
});

export default function Template({ children }) {
  return (
    <div>
      <ThemeProvider theme={theme}>
        <DrawerAppBar />
        {children}
        <Footer />
      </ThemeProvider>
    </div>
  );
}
