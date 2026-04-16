import styled from "styled-components";
import type { CSSProperties, HTMLAttributes } from "react";

export interface ButtonProps extends Omit<
  HTMLAttributes<HTMLButtonElement>,
  "label"
> {
  variant?: "primary" | "secondary" | "tertiary";
  size?: "small" | "medium" | "large";
  transparent?: boolean;
  label: string;
  onClick?: () => void;
  style?: CSSProperties;
  startAddorment?: React.ReactNode;
  endAddorment?: React.ReactNode;
}

const StyledButton = styled.button<{ $variant: string; $size: string , $transparent: boolean}>`
  ${({ $variant, $size, $transparent, theme }) => `
  border: 0;
  display: flex;
  cursor: pointer;
  line-height: 1;
  font-weight: 700;
  border-radius: 3em;
  align-items: center;     
  gap: ${theme.spacing(0.5)};
  font-family: "Nunito Sans", "Helvetica Neue", Helvetica, Arial, sans-serif; 
  padding: ${theme.sizes[$size].padding};
  font-size: ${theme.sizes[$size].fontSize};
  color: ${$transparent ? theme[$variant]?.main : theme[$variant]?.text};
  background: ${$transparent ? "transparent" : theme[$variant]?.main};
  border: ${$transparent ? `1px solid ${theme[$variant]?.main}` : "0"};
`};`;

/** Primary UI component for user interaction */
export const Button = ({
  size = "medium",
  variant = "primary",
  transparent = false,
  label,
  ...rest
}: ButtonProps) => {
  const { startAddorment, endAddorment } = rest;
  return (
    <StyledButton
      type="button"
      $variant={variant}
      $transparent={transparent}
      $size={size}
      {...rest}
    >
      {startAddorment}
      {label}
      {endAddorment}
    </StyledButton>
  );
};
