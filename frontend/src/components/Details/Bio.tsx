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

interface Props {
  course: ProductType;
}

const Bio: React.FC<Props> = ({ course }) => {
  const { id, title, bio, price, image } = course;
  const setProduct = useDataStore((s) => s.setProduct);

  const handleClick = () => {
    setProduct({ id, title, price, image });
  };

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
