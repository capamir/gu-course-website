import { Box, useColorMode } from "@chakra-ui/react";
import { Outlet } from "react-router-dom";
import { Footer, Navbar } from "../components";

const Layout = () => {
  const { colorMode } = useColorMode();
  return (
    <>
      <Navbar />
      <Box padding={5} bg={colorMode === "dark" ? "" : "gray.50"}>
        <Outlet />
      </Box>
      <Footer />
    </>
  );
};

export default Layout;
