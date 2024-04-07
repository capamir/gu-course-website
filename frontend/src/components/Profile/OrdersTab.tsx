import { Button, Flex, Heading, HStack, Spacer } from "@chakra-ui/react";
import { useDataStore } from "../../store";
import OrderItem from "./OrderItem";
import { IoCartOutline, IoWalletSharp } from "react-icons/io5";
import { useUpdateOrder } from "../../hooks/useOrder";

const OrdersTab = () => {
  const order = useDataStore((s) => s.order);
  const { mutate } = useUpdateOrder();
  const handleClick = () => {
    mutate({ payment_status: "C" });
  };
  return (
    <>
      <Flex marginBottom={5}>
        <HStack>
          <IoCartOutline size={36} color="#0693e3" />
          <Heading as="h3" fontFamily="fontBold" fontSize="xl">
            سفارشات
          </Heading>
        </HStack>
        <Spacer />
        <Button
          leftIcon={<IoWalletSharp size={20} />}
          colorScheme="green"
          variant="solid"
          borderRadius="2xl"
          size="md"
          onClick={handleClick}
        >
          پرداخت
        </Button>
      </Flex>
      {order.items &&
        order.items.map((item) => (
          <OrderItem key={item.id} item={item.product} />
        ))}
    </>
  );
};

export default OrdersTab;
