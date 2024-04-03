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
import { DetailsType } from "../../types/Product";

interface Props {
  details: DetailsType;
  updated: string;
}

interface StateType {
  [key: string]: string;
}
const statusState: StateType = {
  A: "پیش فروش",
  B: "در حال ضبط",
  C: "اتمام ضبط",
};

const Status: React.FC<Props> = ({ details, updated }) => {
  const { status, duration, support, requirement } = details;
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
              <Text>{statusState[status]}</Text>
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
                مدت زمان دوره
              </Heading>
              <Text>
                <span dir="ltr">{duration}</span> ساعت
              </Text>
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
                آخرین آپدیت
              </Heading>
              <Text>{updated}</Text>
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
                روش پشتیبانی
              </Heading>
              <Text>{support}</Text>
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
                پیش نیازها
              </Heading>
              <Text>{requirement}</Text>
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
                نوع مشاهده
              </Heading>
              <Text>به صورت آنلاین</Text>
            </Box>
          </HStack>
        </CardBody>
      </Card>
    </SimpleGrid>
  );
};

export default Status;
