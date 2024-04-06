import { Box } from "@chakra-ui/react";
import { useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { useAuthStore } from "../../store";

const Auth = () => {
  const navigate = useNavigate();
  const user = useAuthStore((s) => s.user);

  useEffect(() => {
    // if (user.id) navigate("/");
  }, [navigate, user]);

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
