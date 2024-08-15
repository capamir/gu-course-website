import { HStack, Image } from "@chakra-ui/react";
import { Link } from "react-router-dom";
import { logo } from "../../../assets";
import SearchInput from "./SearchInput";
import ColorModeSwitch from "./ColorModeSwitch";
import UserIcon from "./UserIcon";
import Cart from "./Cart";

const Navbar = () => {
  return (
    <HStack padding={4} boxShadow="sm">
      <Link to="/">
        <HStack w="300px" marginX={4}>
          <Image src={logo} boxSize="60px" objectFit="cover" w="300px" />
        </HStack>
      </Link>
      <SearchInput />
      <ColorModeSwitch />
      <Cart />
      <UserIcon />
    </HStack>
  );
};

export default Navbar;
