import { HStack, Text } from "@chakra-ui/react";
import React from "react";
import { Props } from "../../types/Profile";

const TabItem: React.FC<Props> = ({ tab, label, text, children, onClick }) => {
  return (
    <HStack
      alignItems="center"
      paddingX={3}
      paddingY={2}
      marginY={3}
      borderRadius="md"
      bg={tab === label ? "#00d084" : ""}
      onClick={() => onClick(label)}
    >
      {children}
      <Text>{text}</Text>
    </HStack>
  );
};

export default TabItem;
