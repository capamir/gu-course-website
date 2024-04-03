import { Card, CardBody, Heading, HStack, SimpleGrid } from "@chakra-ui/react";
import { HiMiniAcademicCap } from "react-icons/hi2";
import { ChapterType } from "../../types/Product";
import Chapter from "./Chapter";

interface Props {
  chapters: ChapterType[];
}

const SubTitle: React.FC<Props> = ({ chapters }) => {
  return (
    <Card marginY={6}>
      <CardBody>
        <HStack marginBottom={7}>
          <HiMiniAcademicCap size={42} color="#0693e3" />
          <Heading as="h2" fontFamily="fontBold" fontSize="2xl">
            سرفصل ها
          </Heading>
        </HStack>
        <SimpleGrid spacing={6}>
          {chapters.map((chapter) => (
            <Chapter key={chapter.id} chapter={chapter} />
          ))}
        </SimpleGrid>
      </CardBody>
    </Card>
  );
};

export default SubTitle;
