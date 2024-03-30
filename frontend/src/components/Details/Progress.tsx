import {
  Box,
  Card,
  CardBody,
  Flex,
  Heading,
  HStack,
  Spacer,
  Text,
  useColorMode,
} from "@chakra-ui/react";
import { FaStar } from "react-icons/fa";
import { IoIosPeople } from "react-icons/io";

const Progress = () => {
  const { colorMode } = useColorMode();

  return (
    <Card borderRadius="2xl" boxShadow="md">
      <CardBody>
        <Flex gap={2} marginBottom={9}>
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
                45
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
                45
              </Heading>
              <Text fontSize="sm">دانشجو</Text>
            </Box>
          </HStack>
        </Flex>
        <Flex>
          <Text>درصد تکمیل دوره</Text>
          <Spacer />
          <Text>0%</Text>
        </Flex>
      </CardBody>
    </Card>
  );
};

export default Progress;
