import {
  Box,
  Card,
  CardBody,
  Heading,
  HStack,
  SimpleGrid,
  Text,
} from "@chakra-ui/react";
import { BsBackpack2, BsCameraReels, BsInfoCircle } from "react-icons/bs";
import { IoCalendarOutline, IoPeopleOutline } from "react-icons/io5";
import { LuClock4 } from "react-icons/lu";

const Status = () => {
  return (
    <SimpleGrid columns={{ sm: 2, md: 2, lg: 3, xl: 3 }} spacing={6}>
      <Card borderRadius="xl" boxShadow="lg">
        <CardBody>
          <HStack gap={3}>
            <BsInfoCircle size={36} color="green" />
            <Box>
              <Heading as="h4" fontSize="md" fontFamily="fontBold">
                وضعیت دوره
              </Heading>
              <Text>16 ساعت</Text>
            </Box>
          </HStack>
        </CardBody>
      </Card>
      <Card borderRadius="xl" boxShadow="lg">
        <CardBody>
          <HStack gap={3}>
            <LuClock4 size={36} color="green" />
            <Box>
              <Heading as="h4" fontSize="md" fontFamily="fontBold">
                وضعیت دوره
              </Heading>
              <Text>16 ساعت</Text>
            </Box>
          </HStack>
        </CardBody>
      </Card>
      <Card borderRadius="xl" boxShadow="lg">
        <CardBody>
          <HStack gap={3}>
            <IoCalendarOutline size={36} color="green" />
            <Box>
              <Heading as="h4" fontSize="md" fontFamily="fontBold">
                وضعیت دوره
              </Heading>
              <Text>16 ساعت</Text>
            </Box>
          </HStack>
        </CardBody>
      </Card>
      <Card borderRadius="xl" boxShadow="lg">
        <CardBody>
          <HStack gap={3}>
            <IoPeopleOutline size={36} color="green" />
            <Box>
              <Heading as="h4" fontSize="md" fontFamily="fontBold">
                وضعیت دوره
              </Heading>
              <Text>16 ساعت</Text>
            </Box>
          </HStack>
        </CardBody>
      </Card>
      <Card borderRadius="xl" boxShadow="lg">
        <CardBody>
          <HStack gap={3}>
            <BsBackpack2 size={36} color="green" />
            <Box>
              <Heading as="h4" fontSize="md" fontFamily="fontBold">
                وضعیت دوره
              </Heading>
              <Text>16 ساعت</Text>
            </Box>
          </HStack>
        </CardBody>
      </Card>
      <Card borderRadius="xl" boxShadow="lg">
        <CardBody>
          <HStack gap={3}>
            <BsCameraReels size={36} color="green" />
            <Box>
              <Heading as="h4" fontSize="md" fontFamily="fontBold">
                وضعیت دوره
              </Heading>
              <Text>16 ساعت</Text>
            </Box>
          </HStack>
        </CardBody>
      </Card>
    </SimpleGrid>
  );
};

export default Status;
