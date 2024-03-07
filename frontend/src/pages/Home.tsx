import { Box } from "@chakra-ui/react";
import { CourseGrid, CourseHeading } from "../components";

const Home = () => {
  return (
    <Box>
      <Box paddingRight={3}>
        <CourseHeading />
        <CourseGrid />
      </Box>
    </Box>
  );
};

export default Home;
