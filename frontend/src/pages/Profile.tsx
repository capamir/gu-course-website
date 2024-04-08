import { Card, CardBody, Grid, GridItem, Show } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import {
  CoursesTab,
  HomeTab,
  Navbar,
  OrdersTab,
  Sidebar,
} from "../components/Profile";
import { useAuthStore } from "../store";

const Profile = () => {
  const { search } = useLocation();
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
    if (search) {
      const searchTab = search.split("=")[1];
      setTab(searchTab);
    }
  }, [search]);
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
        <Sidebar
          tab={tab}
          handleClick={handleClick}
          handleLogout={handleLogout}
        />
      </Show>
      <GridItem area="main">
        <Card borderRadius="xl">
          <CardBody>
            <Navbar
              tab={tab}
              name={user.name!}
              handleClick={handleClick}
              handleLogout={handleLogout}
            />
            {tab === "home" && <HomeTab />}
            {tab === "courses" && <CoursesTab />}
            {tab === "orders" && <OrdersTab />}
          </CardBody>
        </Card>
      </GridItem>
    </Grid>
  );
};

export default Profile;
