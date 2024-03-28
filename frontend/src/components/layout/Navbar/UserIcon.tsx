import { Box } from "@chakra-ui/react";
import { IoPersonOutline } from "react-icons/io5";

const UserIcon = () => {
  return (
    <Box bg="gray.100" borderRadius="3xl" padding={2}>
      <IoPersonOutline size={22} color="black" />
    </Box>
  );
};

export default UserIcon;
