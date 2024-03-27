import { HStack, Image, Show, Text } from "@chakra-ui/react";
import { Link } from "react-router-dom";
import { logo } from "../../assets";
import { ColorModeSwitch, SearchInput, UserIcon } from ".";

const Navbar = () => {
  return (
    <HStack padding={4} boxShadow="sm">
      <Link to="/">
        <HStack>
          <Image src={logo} boxSize="50px" objectFit="cover" />
          <Show above="md">
            <Text>ML Course</Text>
          </Show>
        </HStack>
      </Link>
      <SearchInput />
      <ColorModeSwitch />
      <UserIcon />
    </HStack>
  );
};

export default Navbar;
