import { Box } from "@chakra-ui/react";
import { IoPersonOutline } from "react-icons/io5";
import { Link } from "react-router-dom";

const UserIcon = () => {
  return (
    <Link to="/profile">
      <Box bg="gray.100" borderRadius="3xl" padding={2}>
        <IoPersonOutline size={22} color="black" />
      </Box>
    </Link>
  );
};

export default UserIcon;
