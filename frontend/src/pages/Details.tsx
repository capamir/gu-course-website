import { Box, Grid, GridItem, Show } from "@chakra-ui/react";
import {
  Bio,
  Description,
  Progress,
  Review,
  Status,
  SubTitle,
  Teacher,
} from "../components/Details";

const Details = () => {
  return (
    <Box paddingX={{ base: "0", md: "5%" }} paddingY={{ base: "0", md: 4 }}>
      <Bio />

      <Grid
        templateAreas={{ base: `"main"`, lg: `"main aside"` }}
        templateColumns={{ base: "1fr", lg: "3fr 1fr" }}
        gap={6}
      >
        <GridItem>
          <Status />
          <Description />
          <SubTitle />
          <Review />
        </GridItem>
        <Show above="lg">
          <GridItem area="aside">
            <Progress />
            <Teacher />
          </GridItem>
        </Show>
      </Grid>
    </Box>
  );
};

export default Details;
