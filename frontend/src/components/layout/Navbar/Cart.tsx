import { Box } from "@chakra-ui/react";
import { IoCartOutline } from "react-icons/io5";

const Cart = () => {
  return (
    <Box bg="gray.100" borderRadius="3xl" padding={2}>
      <IoCartOutline size={22} color="black" />
    </Box>
  );
};

export default Cart;
