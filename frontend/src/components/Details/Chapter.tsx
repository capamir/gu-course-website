import React from "react";
import { ChapterType } from "../../types/Product";
import {
  Box,
  Card,
  CardBody,
  Collapse,
  Flex,
  Heading,
  Spacer,
  Text,
  useColorMode,
  useDisclosure,
} from "@chakra-ui/react";
import { HiMiniAcademicCap } from "react-icons/hi2";
import Lesson from "./Lesson";

interface Props {
  chapter: ChapterType;
}

const Chapter: React.FC<Props> = ({ chapter }) => {
  const { title, lesson_total, duration_Chapter, lessons } = chapter;
  const { colorMode } = useColorMode();
  const { isOpen, onToggle } = useDisclosure();

  return (
    <Card
      borderRadius="xl"
      bg={colorMode === "dark" ? "" : "gray.50"}
      boxShadow="md"
    >
      <CardBody>
        <Flex alignItems="center">
          <Heading
            as="h4"
            fontSize="lg"
            fontFamily="fontBold"
            onClick={onToggle}
            cursor="pointer"
          >
            {title}
          </Heading>
          <Spacer />
          <Text>
            <span>{lesson_total} </span>
            جلسه،
            <span>{duration_Chapter} </span>
            دقیقه
          </Text>
          <Box marginX={2} cursor="pointer">
            <HiMiniAcademicCap onClick={onToggle} size={19} />
          </Box>
        </Flex>
        <Collapse in={isOpen} animateOpacity>
          <Box mt={4}>
            {lessons?.map((lesson) => (
              <Lesson key={lesson.id} lesson={lesson} />
            ))}
          </Box>
        </Collapse>
      </CardBody>
    </Card>
  );
};

export default Chapter;
