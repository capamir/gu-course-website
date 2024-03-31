import { Box, Flex, Heading, Image, Text } from "@chakra-ui/react";
import { CourseGrid, CourseHeading } from "../components";
import { heroDark } from "../assets";

const Home = () => {
  return (
    <Box>
      <Flex
        direction={{ base: "column-reverse", md: "row" }}
        gap={7}
        marginBottom={8}
        justifyContent="space-between"
      >
        <Box flex="1" margin="150px">
          <Heading
            as="h1"
            fontFamily="fontHeading"
            fontSize="47px"
            fontWeight="bold"
            marginBottom={8}
          >
            آکادمی آموزش برنامه نویسی سبزلرن{" "}
          </Heading>
          <Text fontFamily="fontHeading" fontSize="xl" fontWeight="bold">
            با آکادمی خصوصی سبزلرن، علم برنامه نویسی رو با خیال راحت یاد بگیر و
            پیشرفت کن{" "}
          </Text>
        </Box>
        <Box>
          <Image src={heroDark} />
        </Box>
      </Flex>
      <Box paddingRight={3}>
        <CourseHeading />
        <CourseGrid />
      </Box>
    </Box>
  );
};

export default Home;
