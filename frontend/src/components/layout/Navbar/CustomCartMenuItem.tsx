import React from "react";
import { StoreCartItemType } from "../../../types/Cart";
import {
  Box,
  HStack,
  Image,
  MenuItem,
  Text,
  useColorMode,
} from "@chakra-ui/react";

interface Props {
  item: StoreCartItemType;
}

const CustomCartMenuItem: React.FC<Props> = ({ item }) => {
  const { colorMode } = useColorMode();

  return (
    <MenuItem gap={2} marginY={2} bg={colorMode === "dark" ? "" : "gray.50"}>
      <Image src={item.image} width={50} />
      <Box>
        <Text fontFamily="fontBold" fontSize="sm">
          {item.title}
        </Text>
        <HStack marginX="auto" marginBottom={{ base: 4, md: "0" }}>
          <Text color="brand-primary" fontFamily="fontBold" fontSize="sm">
            {item.price}
          </Text>
        </HStack>
      </Box>
    </MenuItem>
  );
};

export default CustomCartMenuItem;
