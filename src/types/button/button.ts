export type ButtonProps = {
  title: string;
  type: "button" | "submit" | "reset";
  onClick?: () => void;
  className?: string;
  disabled?: boolean;
};
