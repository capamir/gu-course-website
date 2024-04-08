import { GridItem, HStack, Image, Text } from "@chakra-ui/react";
import React from "react";
import { Link } from "react-router-dom";
import { menuItemList } from "../../constants/Profile";
import TabItem from "./TabItem";
import { RiLogoutBoxRLine } from "react-icons/ri";
import { logo } from "../../assets";

interface Props {
  tab: string;
  handleClick: (label: string) => void;
  handleLogout: () => void;
}

const Sidebar: React.FC<Props> = ({ tab, handleClick, handleLogout }) => {
  return (
    <GridItem area="aside" paddingX={10}>
      <Link to="/">
        <HStack marginBottom={10}>
          <Image src={logo} boxSize="70px" objectFit="cover" />
          <Text fontFamily="fontBold" fontSize="2xl">
            ML Course
          </Text>
        </HStack>
      </Link>
      {menuItemList.map((item) => (
        <TabItem
          key={item.label}
          tab={tab}
          label={item.label}
          text={item.text}
          onClick={handleClick}
        >
          <item.icon size={24} />
        </TabItem>
      ))}

      <TabItem tab={tab} label="logout" text="خروج" onClick={handleLogout}>
        <RiLogoutBoxRLine size={24} />
      </TabItem>
    </GridItem>
  );
};

export default Sidebar;
