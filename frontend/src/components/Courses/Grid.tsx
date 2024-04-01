import { Box, SimpleGrid } from "@chakra-ui/react";
import { Card, CardContainer } from ".";
import { useProducts } from "../../hooks";

const CourseGrid = () => {
  const { data: courses } = useProducts();
  return (
    <Box padding="20px">
      <SimpleGrid columns={{ sm: 1, md: 2, lg: 3, xl: 4 }} spacing={6}>
        {courses?.map((course) => (
          <CardContainer key={course.id}>
            <Card course={course} />
          </CardContainer>
        ))}
      </SimpleGrid>
    </Box>
  );
};

export default CourseGrid;
