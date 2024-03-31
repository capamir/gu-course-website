import {
  Box,
  Card,
  CardBody,
  Flex,
  Grid,
  GridItem,
  HStack,
  Image,
  Show,
  Spacer,
  Text,
} from "@chakra-ui/react";
import { RiMenu3Line } from "react-icons/ri";
import { Link } from "react-router-dom";
import { logo } from "../assets";
import ColorModeSwitch from "../components/layout/Navbar/ColorModeSwitch";
import { useState } from "react";

const Profile = () => {
  const [tab, setTab] = useState("پیشخوان");
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
          <HStack
            alignItems="center"
            paddingX={3}
            paddingY={2}
            marginY={3}
            borderRadius="md"
            bg={tab === "پیشخوان" ? "#00d084" : ""}
            onClick={() => setTab("پیشخوان")}
            cursor="pointer"
          >
            <RiMenu3Line size={24} />
            <Text>پیشخوان</Text>
          </HStack>
          <HStack
            alignItems="center"
            paddingX={3}
            paddingY={2}
            marginY={3}
            borderRadius="md"
            bg={tab === "دوره ها" ? "#00d084" : ""}
            cursor="pointer"
            onClick={() => setTab("دوره ها")}
          >
            <RiMenu3Line size={24} />
            <Text>دوره ها</Text>
          </HStack>
          <HStack
            alignItems="center"
            paddingX={3}
            paddingY={2}
            marginY={3}
            borderRadius="md"
            bg={tab === "تیکت ها" ? "#00d084" : ""}
            cursor="pointer"
            onClick={() => setTab("تیکت ها")}
          >
            <RiMenu3Line size={24} />
            <Text>تیکت ها</Text>
          </HStack>
          <HStack
            alignItems="center"
            paddingX={3}
            paddingY={2}
            marginY={3}
            borderRadius="md"
            bg={tab === "خروج" ? "#00d084" : ""}
            cursor="pointer"
            onClick={() => setTab("خروج")}
          >
            <RiMenu3Line size={24} />
            <Text>خروج</Text>
          </HStack>
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
                  <HStack alignItems="center">
                    <RiMenu3Line size={26} />
                    <Text>{tab}</Text>
                  </HStack>
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
