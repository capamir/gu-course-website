import { Flex, Heading, Spacer, Text } from "@chakra-ui/react";
import React from "react";
import { MdPlayLesson } from "react-icons/md";
import { LessonType } from "../../types/Product";

interface Props {
  lesson: LessonType;
}

const Lesson: React.FC<Props> = ({ lesson }) => {
  const { title, duration } = lesson;
  return (
    <Flex alignItems="center">
      <MdPlayLesson />
      <Heading as="h4" fontSize="md" fontFamily="fontBold" mx={2}>
        {title}
      </Heading>
      <Spacer />
      <Text>
        <span>{duration} </span>
        دقیقه
      </Text>
    </Flex>
  );
};

export default Lesson;
