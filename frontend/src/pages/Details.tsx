import { Box, Grid, GridItem, Show } from "@chakra-ui/react";
import { useParams } from "react-router-dom";
import {
  Bio,
  Description,
  Progress,
  Review,
  Status,
  SubTitle,
  Teacher,
} from "../components/Details";
import { useProduct } from "../hooks";

const Details = () => {
  const { id } = useParams();
  const { data: course } = useProduct(id!);

  return (
    <>
      {course && (
        <Box paddingX={{ base: "0", md: "5%" }} paddingY={{ base: "0", md: 4 }}>
          <Bio course={course} />

          <Grid
            templateAreas={{ base: `"main"`, lg: `"main aside"` }}
            templateColumns={{ base: "1fr", lg: "3fr 1fr" }}
            gap={6}
          >
            <GridItem>
              <Status />
              <Description description={course.description} />
              <SubTitle chapters={course.chapters!} />
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
      )}
    </>
  );
};

export default Details;
