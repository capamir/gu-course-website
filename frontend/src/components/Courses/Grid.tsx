import { Box, SimpleGrid } from "@chakra-ui/react";
import { Card, CardContainer } from ".";

const CourseGrid = () => {
  return (
    <Box padding="20px">
      <SimpleGrid columns={{ sm: 1, md: 2, lg: 3, xl: 4 }} spacing={6}>
        <CardContainer>
          <Card />
        </CardContainer>
        <CardContainer>
          <Card />
        </CardContainer>
        <CardContainer>
          <Card />
        </CardContainer>
        <CardContainer>
          <Card />
        </CardContainer>
        <CardContainer>
          <Card />
        </CardContainer>
        <CardContainer>
          <Card />
        </CardContainer>
      </SimpleGrid>
    </Box>
  );
};

export default CourseGrid;
