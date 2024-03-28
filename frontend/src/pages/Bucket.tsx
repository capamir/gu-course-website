import {
  Button,
  Card,
  CardBody,
  CardHeader,
  Flex,
  Heading,
  HStack,
  SimpleGrid,
  Spacer,
  Text,
} from "@chakra-ui/react";
import { IoCartOutline, IoWalletSharp } from "react-icons/io5";
import { Toman } from "../components";

const Bucket = () => {
  return (
    <Card marginY={6}>
      <CardHeader>
        <Flex>
          <HStack>
            <IoCartOutline size={42} color="#0693e3" />
            <Heading as="h2" fontFamily="fontBold" fontSize="2xl">
              سفارشات
            </Heading>
          </HStack>
          <Spacer />
          <Button
            leftIcon={<IoWalletSharp size={24} />}
            colorScheme="green"
            variant="solid"
            borderRadius="3xl"
            size="md"
          >
            ثبت نهایی
          </Button>
        </Flex>
      </CardHeader>
      <CardBody>
        <SimpleGrid spacing={6}>
          <Card borderRadius="xl" bg="gray.50">
            <CardBody>
              <Flex gap={5} alignItems="center">
                <Heading as="h4" fontSize="lg" fontFamily="fontBold">
                  آموزش داکر
                </Heading>
                <Text>مدرس: صادق اسکندری</Text>
                <Spacer />
                <HStack marginX="auto" marginBottom={{ base: 4, md: "0" }}>
                  <Text
                    color="brand-primary"
                    fontFamily="fontBold"
                    fontSize="lg"
                  >
                    3,500,000
                  </Text>
                  <Toman />
                </HStack>
                <Button>حذف</Button>
              </Flex>
            </CardBody>
          </Card>
        </SimpleGrid>
      </CardBody>
    </Card>
  );
};

export default Bucket;
