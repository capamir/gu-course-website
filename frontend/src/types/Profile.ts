export interface Props {
  tab: string;
  label: string;
  text: string;
  children: JSX.Element;
  onClick: (label: string) => void;
}
