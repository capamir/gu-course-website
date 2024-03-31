import { HStack, Image, Text } from "@chakra-ui/react";
import { Link } from "react-router-dom";
import { logo } from "../../assets";

const Navbar = () => {
  return (
    <HStack padding={4} boxShadow="sm" marginX={5}>
      <Link to="/">
        <HStack>
          <Image src={logo} boxSize="50px" objectFit="cover" />
          <Text>ML Course</Text>
        </HStack>
      </Link>
    </HStack>
  );
};

export default Navbar;
