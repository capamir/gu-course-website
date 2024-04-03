import {
  Box,
  Button,
  Flex,
  Heading,
  HStack,
  Image,
  Spacer,
  Text,
} from "@chakra-ui/react";
import { HiOutlineAcademicCap } from "react-icons/hi2";
import { noImage } from "../../assets";
import Toman from "../common/Toman";
import { useDataStore } from "../../store";
import { ProductType } from "../../types/Product";
import { useEffect } from "react";
import { axiosInstance } from "../../services/apiClient";
import { CartType } from "../../types/Cart";
import { useAddCartItem } from "../../hooks/useCart";

interface Props {
  course: ProductType;
}

const Bio: React.FC<Props> = ({ course }) => {
  const { id, title, bio, price, image } = course;
  const cart_id = useDataStore((s) => s.cart_id);
  const setProduct = useDataStore((s) => s.setProduct);
  const setCartId = useDataStore((s) => s.setCartId);
  const { mutate } = useAddCartItem();

  const handleClick = async () => {
    if (!cart_id) {
      try {
        const cartResponseData = await axiosInstance
          .post<CartType>("store/carts/")
          .then((res) => res.data);
        setCartId(cartResponseData.id);
      } catch (e) {
        console.log(e);
      }
    }
    setProduct({ product_id: id, title, price, image });
    mutate({ product_id: id });
  };
  useEffect(() => {}, []);
  return (
    <Flex
      gap={7}
      marginBottom={8}
      direction={{ base: "column-reverse", md: "row" }}
      justifyContent="space-between"
    >
      <Box flex="1">
        <Heading as="h1" marginY={5} fontSize="2xl" fontFamily="fontBold">
          {title}
        </Heading>
        <Text fontFamily="fontBody" fontSize="lg">
          {bio}
        </Text>
        <Flex
          paddingLeft={3}
          marginTop={{ base: 10, md: "100px" }}
          direction={{ base: "column-reverse", md: "row" }}
        >
          <Button
            leftIcon={<HiOutlineAcademicCap size={24} />}
            colorScheme="green"
            variant="solid"
            borderRadius="3xl"
            size="md"
            onClick={handleClick}
          >
            ثبت نام در دوره
          </Button>
          <Spacer />
          <HStack marginX="auto" marginBottom={{ base: 4, md: "0" }}>
            <Text color="brand-primary" fontFamily="fontBold" fontSize="lg">
              {price}
            </Text>
            <Toman />
          </HStack>
        </Flex>
      </Box>
      <Box>
        <Image src={noImage} borderRadius="3xl" />
      </Box>
    </Flex>
  );
};

export default Bio;
