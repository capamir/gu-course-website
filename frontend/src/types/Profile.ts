import { IconType } from "react-icons";

export interface Props {
  tab: string;
  label: string;
  text: string;
  children: JSX.Element;
  onClick: (label: string) => void;
}

export interface MenuItemType {
  label: string;
  text: string;
  icon: IconType;
}
