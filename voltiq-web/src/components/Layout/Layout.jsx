import { Outlet } from "react-router-dom";
import { Box } from "@mui/material";
import { Footer } from "../Footer/Footer";
import { ScrollToTop } from "../ScrollToTop/ScrollToTop";
import { Navbar } from "../Navbar/Navbar";

export const Layout = () => {
  return (
    <>
      <ScrollToTop />

      <Box width="100%">
        <Box>
          <Navbar />
          <Outlet />
        </Box>
      </Box>

      <Footer />
    </>
  );
};
