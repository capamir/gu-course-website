import {
  Box,
  Flex,
  HStack,
  Menu,
  MenuButton,
  MenuList,
  Show,
  Spacer,
  Text,
} from "@chakra-ui/react";
import React from "react";
import { RiLogoutBoxRLine, RiMenu3Line } from "react-icons/ri";
import { menuItemList } from "../../constants/Profile";
import Cart from "../layout/Navbar/Cart";
import ColorModeSwitch from "../layout/Navbar/ColorModeSwitch";
import CustomMenuItem from "./CustomMenuItem";

interface Props {
  tab: string;
  name: string;
  handleClick: (label: string) => void;
  handleLogout: () => void;
}

const Navbar: React.FC<Props> = ({ tab, name, handleClick, handleLogout }) => {
  return (
    <Flex gap={3} marginBottom={12}>
      <Box>
        <Show above="lg">
          <Text>{name} عزیز خوش آمدی</Text>
        </Show>
        <Show below="lg">
          <Menu>
            <MenuButton as={Box} cursor="pointer">
              <HStack alignItems="center">
                <RiMenu3Line size={26} />
                <Text>{tab}</Text>
              </HStack>
            </MenuButton>
            <MenuList>
              {menuItemList.map((item) => (
                <CustomMenuItem
                  key={item.label}
                  tab={tab}
                  label={item.label}
                  text={item.text}
                  onClick={handleClick}
                >
                  <item.icon size={24} />
                </CustomMenuItem>
              ))}

              <CustomMenuItem
                tab={tab}
                label="logout"
                text="خروج"
                onClick={handleLogout}
              >
                <RiLogoutBoxRLine size={24} />
              </CustomMenuItem>
            </MenuList>
          </Menu>
        </Show>
      </Box>
      <Spacer />
      <Cart />
      <ColorModeSwitch />
    </Flex>
  );
};

export default Navbar;
