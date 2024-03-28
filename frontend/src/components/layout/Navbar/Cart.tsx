import { Box } from "@chakra-ui/react";
import { IoCartOutline } from "react-icons/io5";
import { Link } from "react-router-dom";

const Cart = () => {
  return (
    <Link to="/cart">
      <Box bg="gray.100" borderRadius="3xl" padding={2}>
        <IoCartOutline size={22} color="black" />
      </Box>
    </Link>
  );
};

export default Cart;
