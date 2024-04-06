import { MenuItem, Text } from "@chakra-ui/react";
import React from "react";
import { Props } from "../../types/Profile";

const CustomMenuItem: React.FC<Props> = ({
  tab,
  label,
  text,
  children,
  onClick,
}) => {
  return (
    <MenuItem
      gap={1}
      marginY={2}
      onClick={() => onClick(label)}
      bg={tab === label ? "#00d084" : ""}
    >
      {children}
      <Text>{text}</Text>
    </MenuItem>
  );
};

export default CustomMenuItem;
