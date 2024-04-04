import { MenuItem, Text } from "@chakra-ui/react";
import React from "react";
import { useNavigate } from "react-router-dom";

interface Props {
  tab: string;
  setTab: (tab: string) => void;
  label: string;
  text: string;
  children: JSX.Element;
}

const CustomMenuItem: React.FC<Props> = ({
  tab,
  setTab,
  label,
  text,
  children,
}) => {
  const navigate = useNavigate();

  const handleClick = () => {
    setTab(label);
    navigate(`/profile?tab=${label}`);
  };
  return (
    <MenuItem
      gap={1}
      marginY={2}
      onClick={handleClick}
      bg={tab === label ? "#00d084" : ""}
    >
      {children}
      <Text>{text}</Text>
    </MenuItem>
  );
};

export default CustomMenuItem;
