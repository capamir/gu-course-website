import { Card, CardBody, Flex, Heading, Spacer, Text } from "@chakra-ui/react";
import React from "react";
import { LessonType } from "../../types/Product";

interface Props {
  lesson: LessonType;
}

const Lesson: React.FC<Props> = ({ lesson }) => {
  const { title, duration } = lesson;
  return (
    <Card>
      <CardBody>
        <Flex alignItems="center">
          <Heading as="h4" fontSize="lg" fontFamily="fontBold">
            {title}
          </Heading>
          <Spacer />
          <Text>
            <span>{duration} </span>
            دقیقه
          </Text>
        </Flex>
      </CardBody>
    </Card>
  );
};

export default Lesson;
