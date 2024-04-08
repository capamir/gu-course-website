import React from "react";
import { OrderType } from "../../types/Order";
import CourseItem from "./CourseItem";

interface Props {
  order: OrderType;
}

const ItemList: React.FC<Props> = ({ order }) => {
  return (
    <>
      {order.items!.map((item) => (
        <CourseItem
          key={item.id}
          title={item.product.title}
          license_code={item.license_code!}
        />
      ))}
    </>
  );
};

export default ItemList;
