import {
  Card,
  CardBody,
  Flex,
  Heading,
  HStack,
  Spacer,
  Text,
  useColorMode,
} from "@chakra-ui/react";
import React from "react";
import Toman from "../common/Toman";

interface Props {
  item: { id: number; price: number; title: string };
}

const OrderItem: React.FC<Props> = ({ item }) => {
  const { colorMode } = useColorMode();

  return (
    <Card
      borderRadius="xl"
      bg={colorMode === "dark" ? "" : "gray.50"}
      boxShadow="md"
      marginBottom={3}
    >
      <CardBody>
        <Flex gap={5} alignItems="center">
          <Heading as="h4" fontSize="md" fontFamily="fontBold">
            {item.title}
          </Heading>
          <Spacer />
          <HStack marginX="auto">
            <Text color="brand-primary" fontFamily="fontBold" fontSize="md">
              {item.price}
            </Text>
            <Toman />
          </HStack>
        </Flex>
      </CardBody>
    </Card>
  );
};

export default OrderItem;
