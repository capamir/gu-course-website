import { HStack, Text } from "@chakra-ui/react";
import React from "react";
import { useNavigate } from "react-router-dom";

interface Props {
  tab: string;
  setTab: (tab: string) => void;
  label: string;
  text: string;
  children: JSX.Element;
}

const TabItem: React.FC<Props> = ({ tab, setTab, label, text, children }) => {
  const navigate = useNavigate();
  const handleClick = () => {
    setTab(label);
    navigate(`/profile?tab=${label}`);
  };
  return (
    <HStack
      alignItems="center"
      paddingX={3}
      paddingY={2}
      marginY={3}
      borderRadius="md"
      bg={tab === label ? "#00d084" : ""}
      onClick={handleClick}
      cursor="pointer"
    >
      {children}
      <Text>{text}</Text>
    </HStack>
  );
};

export default TabItem;
