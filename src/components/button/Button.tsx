import { StyledButton } from "@/styles/button/styledButton";
import type { ButtonProps } from "@/types/button/button";

export default function Button({ title, type, disabled }: ButtonProps) {
  return <StyledButton type={type} disabled={disabled}>{title}</StyledButton>;
}
