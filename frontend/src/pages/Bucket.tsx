import {
  Button,
  Card,
  CardBody,
  CardHeader,
  Flex,
  Heading,
  HStack,
  Spacer,
} from "@chakra-ui/react";
import { IoCartOutline, IoWalletSharp } from "react-icons/io5";
import { useDataStore } from "../store";
import { CartItems } from "../components";

const Bucket = () => {
  const bucket = useDataStore((s) => s.bucket);

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
        {bucket.map((item) => (
          <CartItems key={item.product_id} item={item} />
        ))}
      </CardBody>
    </Card>
  );
};

export default Bucket;
