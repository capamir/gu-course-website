import {
  Box,
  Card,
  CardBody,
  Flex,
  Heading,
  HStack,
  Progress,
  Spacer,
  Text,
  useColorMode,
} from "@chakra-ui/react";
import { FaStar } from "react-icons/fa";
import { IoIosPeople } from "react-icons/io";

interface Props {
  students: number;
  rate: number;
  progress: number | undefined;
}

const ProgressCard: React.FC<Props> = ({ students, rate, progress }) => {
  const { colorMode } = useColorMode();

  return (
    <Card borderRadius="2xl" boxShadow="md">
      <CardBody>
        <Flex gap={2} marginBottom={6}>
          <HStack
            bg={colorMode === "dark" ? "" : "gray.100"}
            boxShadow="md"
            padding={4}
            borderRadius="xl"
            gap={3}
          >
            <IoIosPeople size={43} color="green" />
            <Box>
              <Heading as="h4" fontSize="lg" fontFamily="fontBody">
                {students}
              </Heading>
              <Text fontSize="sm">دانشجو</Text>
            </Box>
          </HStack>
          <Spacer />

          <HStack
            padding={4}
            borderRadius="xl"
            gap={3}
            bg={colorMode === "dark" ? "" : "gray.100"}
            boxShadow="md"
          >
            <FaStar size={36} color="#fcb900" />
            <Box>
              <Heading as="h4" fontSize="lg" fontFamily="fontBody">
                {rate}
              </Heading>
              <Text fontSize="sm">رضایت</Text>
            </Box>
          </HStack>
        </Flex>
        <Flex marginY={4}>
          <Text>درصد تکمیل دوره</Text>
          <Spacer />
          <Text>{progress}%</Text>
        </Flex>
        <Progress value={progress} hasStripe />
      </CardBody>
    </Card>
  );
};

export default ProgressCard;
