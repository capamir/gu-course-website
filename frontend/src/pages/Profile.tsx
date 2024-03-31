import { Box, Grid, GridItem, Show } from "@chakra-ui/react";
import { Navbar } from "../components/Profile";

const Profile = () => {
  return (
    <Box>
      <Navbar />
      <Grid
        templateAreas={{ base: `"main"`, lg: `"aside main"` }}
        templateColumns={{ base: "1fr", lg: "200px 1fr" }}
      >
        <Show above="lg">
          <GridItem area="aside" paddingX={5} marginY={7}>
            sidebar
          </GridItem>
        </Show>
        <Show below="lg">
          <GridItem area="aside" paddingX={5} marginY={7}>
            below lg
          </GridItem>
        </Show>
        <GridItem area="main">main</GridItem>
      </Grid>
    </Box>
  );
};

export default Profile;
