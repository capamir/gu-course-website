import {
  Box,
  HStack,
  Menu,
  MenuButton,
  MenuList,
  Text,
} from "@chakra-ui/react";
import { IoCartOutline, IoWalletSharp } from "react-icons/io5";
import { Link } from "react-router-dom";
import { useDataStore } from "../../../store";
import CustomCartMenuItem from "./CustomCartMenuItem";

const Cart = () => {
  const bucket = useDataStore((s) => s.bucket);
  return (
    <Menu>
      <MenuButton as={Box} cursor="pointer">
        <Box position="relative" bg="gray.100" borderRadius="3xl" padding={2}>
          <IoCartOutline size={22} color="black" />
          <Text
            position="absolute"
            top="-2"
            right="-1"
            bg="green"
            borderRadius="3xl"
            paddingX={1}
          >
            {bucket.length}
          </Text>
        </Box>
      </MenuButton>
      <MenuList>
        {bucket.map((item) => (
          <CustomCartMenuItem key={item.product_id} item={item} />
        ))}
        <Link to="/cart">
          <HStack
            padding={2}
            marginX={2}
            bg="green"
            borderRadius="3xl"
            justifyContent="center"
          >
            <IoWalletSharp size={18} />
            <Text>ادامه پرداخت</Text>
          </HStack>
        </Link>
      </MenuList>
    </Menu>
  );
};

export default Cart;
