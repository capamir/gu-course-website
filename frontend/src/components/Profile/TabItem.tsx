import { HStack, Text } from "@chakra-ui/react";
import React from "react";

interface Props {
  tab: string;
  setTab: (tab: string) => void;
  label: string;
  children: JSX.Element;
}

const TabItem: React.FC<Props> = ({ tab, setTab, label, children }) => {
  return (
    <HStack
      alignItems="center"
      paddingX={3}
      paddingY={2}
      marginY={3}
      borderRadius="md"
      bg={tab === label ? "#00d084" : ""}
      onClick={() => setTab(label)}
      cursor="pointer"
    >
      {children}
      <Text>{label}</Text>
    </HStack>
  );
};

export default TabItem;
