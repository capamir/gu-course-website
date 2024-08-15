import {
  Box,
  Flex,
  Heading,
  Image,
  Text,
  useColorMode,
} from "@chakra-ui/react";
import { hero } from "../../assets";

const Hero = () => {
  const { colorMode } = useColorMode();
  return (
    <Flex
      direction={{ base: "column-reverse", lg: "row" }}
      marginBottom={7}
      justifyContent="space-between"
    >
      <Box flex="1" padding="100px">
        <Heading
          as="h1"
          fontFamily="fontHeading"
          fontSize="40px"
          fontWeight="bold"
          marginBottom={8}
        >
          به دیتاکورس کمپ خوش آمدید{" "}
        </Heading>
        <Text fontFamily="fontHeading" fontSize="26px" fontWeight="bold">
          با ما، علوم داده رو با خیال راحت فرابگیر{" "}
        </Text>
      </Box>
      <Box flex="1" w="50%">
        <Image src={hero} />
      </Box>
    </Flex>
  );
};

export default Hero;
