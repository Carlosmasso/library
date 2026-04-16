import styled from "styled-components";
import type { CSSProperties, HTMLAttributes } from "react";

export interface ButtonProps extends Omit<
  HTMLAttributes<HTMLButtonElement>,
  "label"
> {
  variant?: "primary" | "secondary" | "tertiary";
  size?: "small" | "medium" | "large";
  label: string;
  onClick?: () => void;
  style?: CSSProperties;
  startAddorment?: React.ReactNode;
  endAddorment?: React.ReactNode;
}

const StyledButton = styled.button<{ $variant: string; $size: string }>`
  border: 0;
  display: flex;
  cursor: pointer;
  line-height: 1;
  font-weight: 700;
  border-radius: 3em;
  align-items: center;
  gap: ${({ theme }) => theme.spacing(0.5)};
  font-family: 'Nunito Sans', 'Helvetica Neue', Helvetica, Arial, sans-serif;
  ${({ $variant, $size, theme }) => `
      color: ${theme[$variant]?.text};
      background: ${theme[$variant]?.main};
      padding: ${theme.sizes[$size].padding};
      font-size: ${theme.sizes[$size].fontSize};
    `};
`;

/** Primary UI component for user interaction */
export const Button = ({
  size = "medium",
  variant = "primary",
  label,
  ...rest
}: ButtonProps) => {
  const { startAddorment, endAddorment } = rest;
  return (
    <StyledButton type="button" $variant={variant} $size={size} {...rest}>
      {startAddorment}
      {label}
      {endAddorment}
    </StyledButton>
  );
};
