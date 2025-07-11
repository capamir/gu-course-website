import {
  Button,
  Card,
  CardBody,
  Flex,
  Heading,
  HStack,
  Image,
  Spacer,
  Text,
  useColorMode,
} from "@chakra-ui/react";
import Toman from "../common/Toman";
import { StoreCartItemType } from "../../types/Cart";
import { RiDeleteBin6Line } from "react-icons/ri";
import { useDataStore } from "../../store";
import { useRemoveCartItem } from "../../hooks/useCart";

interface Props {
  item: StoreCartItemType;
}

const CartItems: React.FC<Props> = ({ item }) => {
  const { colorMode } = useColorMode();
  const { mutate } = useRemoveCartItem();
  const removeProduct = useDataStore((s) => s.removeProduct);

  const handleClick = () => {
    mutate(item.id!);
    removeProduct(item.id!);
  };
  return (
    <Card
      borderRadius="xl"
      bg={colorMode === "dark" ? "" : "gray.50"}
      boxShadow="md"
      marginBottom={3}
    >
      <CardBody>
        <Flex gap={5} alignItems="center">
          <Image src={item.image} width={100} alt={item.title} />
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
          <Button
            colorScheme="red"
            leftIcon={<RiDeleteBin6Line size={18} />}
            onClick={handleClick}
          >
            حذف
          </Button>
        </Flex>
      </CardBody>
    </Card>
  );
};

export default CartItems;
