import {
  Button,
  Card,
  CardBody,
  Flex,
  Heading,
  HStack,
  Spacer,
  Text,
  useColorMode,
} from "@chakra-ui/react";
import Toman from "../common/Toman";

const CartItems = () => {
  const { colorMode } = useColorMode();

  return (
    <Card
      borderRadius="xl"
      bg={colorMode === "dark" ? "" : "gray.50"}
      boxShadow="md"
    >
      <CardBody>
        <Flex gap={5} alignItems="center">
          <Heading as="h4" fontSize="lg" fontFamily="fontBold">
            آموزش داکر
          </Heading>
          <Text>مدرس: صادق اسکندری</Text>
          <Spacer />
          <HStack marginX="auto" marginBottom={{ base: 4, md: "0" }}>
            <Text color="brand-primary" fontFamily="fontBold" fontSize="lg">
              3,500,000
            </Text>
            <Toman />
          </HStack>
          <Button>حذف</Button>
        </Flex>
      </CardBody>
    </Card>
  );
};

export default CartItems;
