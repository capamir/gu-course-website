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
import { Link, useParams } from "react-router-dom";
import { logo } from "../assets";
import ColorModeSwitch from "../components/layout/Navbar/ColorModeSwitch";
import { CustomMenuItem, TabItem } from "../components/Profile";

const Profile = () => {
  const params = useParams();
  const [tab, setTab] = useState("home");
  useEffect(() => {
    if (params.tab) setTab(params.tab);
  }, [params.tab]);
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
          <TabItem tab={tab} setTab={setTab} label="home" text="پیشخوان">
            <IoHomeOutline size={24} />
          </TabItem>
          <TabItem tab={tab} setTab={setTab} label="courses" text="دوره ها">
            <IoFolderOpenOutline size={24} />
          </TabItem>
          <TabItem tab={tab} setTab={setTab} label="orders" text="سفارشات">
            <IoCartOutline size={24} />
          </TabItem>
          <TabItem tab={tab} setTab={setTab} label="tickets" text="تیکت ها">
            <BiConversation size={24} />
          </TabItem>

          <TabItem tab={tab} setTab={setTab} label="logout" text="خروج">
            <RiLogoutBoxRLine size={24} />
          </TabItem>
        </GridItem>
      </Show>
      <GridItem area="main">
        <Card borderRadius="xl">
          <CardBody>
            <Flex>
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
                      <CustomMenuItem
                        tab={tab}
                        setTab={setTab}
                        label="home"
                        text="پیشخوان"
                      >
                        <RiMenu3Line size={24} />
                      </CustomMenuItem>
                      <CustomMenuItem
                        tab={tab}
                        setTab={setTab}
                        label="courses"
                        text="دوره ها"
                      >
                        <IoFolderOpenOutline size={24} />
                      </CustomMenuItem>
                      <CustomMenuItem
                        tab={tab}
                        setTab={setTab}
                        label="orders"
                        text="سفارشات"
                      >
                        <IoCartOutline size={24} />
                      </CustomMenuItem>
                      <CustomMenuItem
                        tab={tab}
                        setTab={setTab}
                        label="tickets"
                        text="تیکت ها"
                      >
                        <BiConversation size={24} />
                      </CustomMenuItem>
                      <CustomMenuItem
                        tab={tab}
                        setTab={setTab}
                        label="logout"
                        text="خروج"
                      >
                        <RiLogoutBoxRLine size={24} />
                      </CustomMenuItem>
                    </MenuList>
                  </Menu>
                </Show>
              </Box>
              <Spacer />
              <ColorModeSwitch />
            </Flex>
          </CardBody>
        </Card>
      </GridItem>
    </Grid>
  );
};

export default Profile;
