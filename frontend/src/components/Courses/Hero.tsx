import {
  Box,
  Flex,
  Heading,
  Image,
  Text,
  useColorMode,
} from "@chakra-ui/react";
import { heroDark, heroLight } from "../../assets";

const Hero = () => {
  const { colorMode } = useColorMode();
  return (
    <Flex
      direction={{ base: "column-reverse", lg: "row" }}
      gap={7}
      marginBottom={7}
      justifyContent="space-between"
    >
      <Box flex="1" padding="100px">
        <Heading
          as="h1"
          fontFamily="fontHeading"
          fontSize="30px"
          fontWeight="bold"
          marginBottom={8}
        >
          آکادمی آموزش برنامه نویسی دیتاکمپ{" "}
        </Heading>
        <Text fontFamily="fontHeading" fontSize="xl" fontWeight="bold">
          با آکادمی دیتاکمپ، علوم داده رو با خیال راحت یاد بگیر و پیشرفت کن{" "}
        </Text>
      </Box>
      <Box flex="1">
        <Image src={colorMode === "dark" ? heroDark : heroLight} />
      </Box>
    </Flex>
  );
};

export default Hero;
