import { Box } from "@chakra-ui/react";
import useCourses from "../../hooks/useCourses";
import ItemList from "./ItemList";

const CoursesTab = () => {
  const { data: orders } = useCourses();
  return (
    <Box>
      {orders &&
        orders.map((order) => <ItemList key={order.id} order={order} />)}
    </Box>
  );
};

export default CoursesTab;
