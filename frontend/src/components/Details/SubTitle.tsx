import {
  Card,
  CardBody,
  Flex,
  Heading,
  HStack,
  SimpleGrid,
  Spacer,
  Text,
  useColorMode,
} from "@chakra-ui/react";
import { HiMiniAcademicCap } from "react-icons/hi2";

const SubTitle = () => {
  const { colorMode } = useColorMode();

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
          <Card
            borderRadius="xl"
            bg={colorMode === "dark" ? "" : "gray.50"}
            boxShadow="md"
          >
            <CardBody>
              <Flex>
                <Heading as="h4" fontSize="lg" fontFamily="fontBold">
                  وضعیت دوره
                </Heading>
                <Spacer />
                <Text>
                  <span>0 </span>
                  جلسه،
                  <span>0 </span>
                  دقیقه
                </Text>
              </Flex>
            </CardBody>
          </Card>
        </SimpleGrid>
      </CardBody>
    </Card>
  );
};

export default SubTitle;
