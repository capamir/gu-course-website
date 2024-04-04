import { Box } from "@chakra-ui/react";
import { IoPersonOutline } from "react-icons/io5";
import { Link } from "react-router-dom";
import { useAuthStore } from "../../../store";

const UserIcon = () => {
  const user = useAuthStore((s) => s.user);

  return (
    <Link to={user.id ? "/profile" : "/auth/login"}>
      <Box bg="gray.100" borderRadius="3xl" padding={2}>
        <IoPersonOutline size={22} color="black" />
      </Box>
    </Link>
  );
};

export default UserIcon;
