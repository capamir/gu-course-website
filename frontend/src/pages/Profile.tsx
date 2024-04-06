import {
  Box,
  Card,
  CardBody,
  Flex,
  Grid,
  GridItem,
  HStack,
  Image,
  Menu,
  MenuButton,
  MenuList,
  Show,
  Spacer,
  Text,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { BiConversation } from "react-icons/bi";
import {
  IoCartOutline,
  IoFolderOpenOutline,
  IoHomeOutline,
} from "react-icons/io5";
import { RiLogoutBoxRLine, RiMenu3Line } from "react-icons/ri";
import { Link, useNavigate, useParams } from "react-router-dom";
import { logo } from "../assets";
import ColorModeSwitch from "../components/layout/Navbar/ColorModeSwitch";
import { CustomMenuItem, TabItem } from "../components/Profile";
import { useAuthStore } from "../store";
import Cart from "../components/layout/Navbar/Cart";

const menuItemList = [
  {
    label: "home",
    text: "پیشخوان",
    icon: IoHomeOutline,
  },
  {
    label: "courses",
    text: "دوره ها",
    icon: IoFolderOpenOutline,
  },
  {
    label: "orders",
    text: "سفارشات",
    icon: IoCartOutline,
  },
  {
    label: "tickets",
    text: "تیکت ها",
    icon: BiConversation,
  },
];

const Profile = () => {
  const params = useParams();
  const navigate = useNavigate();
  const [tab, setTab] = useState("home");
  const user = useAuthStore((s) => s.user);
  const logout = useAuthStore((s) => s.logout);

  const handleClick = (label: string) => {
    setTab(label);
    navigate(`/profile?tab=${label}`);
  };
  const handleLogout = () => {
    logout();
    navigate("/");
  };

  useEffect(() => {
    if (params.tab) setTab(params.tab);
  }, [params.tab]);

  useEffect(() => {
    if (!user.id) navigate("auth/login");
  }, [navigate, user]);
  return (
    <Grid
      templateAreas={{ base: `"main"`, lg: `"aside main"` }}
      templateColumns={{ base: "1fr", lg: "300px 1fr" }}
      marginY={{ base: 0, lg: 9 }}
      marginX={{ base: 0, lg: 12 }}
    >
      <Show above="lg">
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
      </Show>
      <GridItem area="main">
        <Card borderRadius="xl">
          <CardBody>
            <Flex gap={3}>
              <Box>
                <Show above="lg">
                  <Text>امیرحسین عزیز خوش آمدی</Text>
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
          </CardBody>
        </Card>
      </GridItem>
    </Grid>
  );
};

export default Profile;
