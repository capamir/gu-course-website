import { SimpleGrid } from "@chakra-ui/react";
import CartItems from "./CartItems";

const Items = () => {
  return (
    <SimpleGrid spacing={6}>
      <CartItems />
    </SimpleGrid>
  );
};

export default Items;
