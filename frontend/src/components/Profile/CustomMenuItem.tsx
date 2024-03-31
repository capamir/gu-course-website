import { MenuItem, Text } from "@chakra-ui/react";
import React from "react";

interface Props {
  tab: string;
  setTab: (tab: string) => void;
  label: string;
  children: JSX.Element;
}

const CustomMenuItem: React.FC<Props> = ({ tab, setTab, label, children }) => {
  return (
    <MenuItem
      gap={1}
      marginY={2}
      onClick={() => setTab(label)}
      bg={tab === label ? "#00d084" : ""}
    >
      {children}
      <Text>{label}</Text>
    </MenuItem>
  );
};

export default CustomMenuItem;
