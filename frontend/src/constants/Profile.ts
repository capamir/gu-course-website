import { BiConversation } from "react-icons/bi";
import {
  IoCartOutline,
  IoFolderOpenOutline,
  IoHomeOutline,
} from "react-icons/io5";
import { MenuItemType } from "../types/Profile";

export const menuItemList: MenuItemType[] = [
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
