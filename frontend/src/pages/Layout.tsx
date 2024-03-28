import { Box } from "@chakra-ui/react";
import { Outlet } from "react-router-dom";
import { Footer, Navbar } from "../components";

const Layout = () => {
  return (
    <>
      <Navbar />
      <Box padding={5}>
        <Outlet />
      </Box>
      <Footer />
    </>
  );
};

export default Layout;
