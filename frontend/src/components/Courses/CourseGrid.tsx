import { Box, SimpleGrid } from "@chakra-ui/react";
import { CourseCard, CourseCardContainer } from "..";

const CourseGrid = () => {
  return (
    <Box padding="20px">
      <SimpleGrid columns={{ sm: 1, md: 2, lg: 3, xl: 4 }} spacing={6}>
        <CourseCardContainer>
          <CourseCard />
        </CourseCardContainer>
        <CourseCardContainer>
          <CourseCard />
        </CourseCardContainer>
        <CourseCardContainer>
          <CourseCard />
        </CourseCardContainer>
        <CourseCardContainer>
          <CourseCard />
        </CourseCardContainer>
        <CourseCardContainer>
          <CourseCard />
        </CourseCardContainer>
        <CourseCardContainer>
          <CourseCard />
        </CourseCardContainer>
      </SimpleGrid>
    </Box>
  );
};

export default CourseGrid;
