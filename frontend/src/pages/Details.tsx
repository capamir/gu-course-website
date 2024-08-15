import { Box, Grid, GridItem, Show } from "@chakra-ui/react";
import { useParams } from "react-router-dom";
import {
  Bio,
  Description,
  Progress,
  Review,
  Status,
  SubTitle,
} from "../components/Details";
import Teachers from "../components/Details/Teachers";
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
              <Status details={course.details!} updated={course.updated} />
              <Description description={course.description} />
              <SubTitle chapters={course.chapters!} />
              <Review id={id!} />
            </GridItem>
            <Show above="lg">
              <GridItem area="aside">
                <Progress
                  students={course.members_count}
                  rate={course.rate}
                  progress={course.details?.progress}
                />
                <Teachers teachers={course.teachers!} />
              </GridItem>
            </Show>
          </Grid>
        </Box>
      )}
    </>
  );
};

export default Details;
