import { Box } from "@chakra-ui/react";
import { Outlet } from "react-router-dom";

const Auth = () => {
  return (
    <Box position="relative" overflow="hidden" w="100%" h="100vh">
      <Outlet />
      <Box
        position="absolute"
        top="450px"
        width="100%"
        height="100vh"
        zIndex="-1"
        transform="skewY(-6deg)"
        background="linear-gradient(to left, #06846F, #54BEE8)"
      />
    </Box>
  );
};

export default Auth;
