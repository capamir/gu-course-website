import {
  Box,
  Card,
  CardBody,
  Flex,
  Heading,
  HStack,
  Spacer,
  Text,
} from "@chakra-ui/react";
import { FaStar } from "react-icons/fa";
import { IoIosPeople } from "react-icons/io";

const Progress = () => {
  return (
    <Card borderRadius="2xl" boxShadow="md">
      <CardBody>
        <Flex gap={2} marginBottom={9}>
          <HStack bg="gray.100" padding={4} borderRadius="xl" gap={3}>
            <IoIosPeople size={43} color="green" />
            <Box>
              <Heading as="h4" fontSize="lg" fontFamily="fontBody">
                45
              </Heading>
              <Text fontSize="sm">دانشجو</Text>
            </Box>
          </HStack>
          <Spacer />

          <HStack bg="gray.100" padding={4} borderRadius="xl" gap={3}>
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
