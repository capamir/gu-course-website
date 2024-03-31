import { Box } from "@chakra-ui/react";
import { Grid, Heading, Hero } from "../components/Courses";

const Home = () => {
  return (
    <Box>
      <Hero />
      <Box paddingRight={3}>
        <Heading />
        <Grid />
      </Box>
    </Box>
  );
};

export default Home;
