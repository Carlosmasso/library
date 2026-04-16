import styled from "styled-components";
import type { CSSProperties, HTMLAttributes } from "react";

export interface TagProps extends Omit<
  HTMLAttributes<HTMLDivElement>,
  "label"
> {
  variant?: "primary" | "secondary" | "tertiary";
  size?: "small" | "medium" | "large";
  label: string;
  onClick?: () => void;
  style?: CSSProperties;
}

const StyledTag = styled.div<{ $variant: string; $size: string }>`
  padding: 6px 18px;
  border-radius: 8px;
  font-family: "Nunito Sans", "Helvetica Neue", Helvetica, Arial, sans-serif;
  cursor: pointer;
  ${({ $variant, $size, theme }) => `
      color: ${theme[$variant]?.text};
      background: ${theme[$variant]?.main};
        padding: ${theme.sizes[$size].padding};
      font-size: ${theme.sizes[$size].fontSize};
    `};
`;

/** Primary UI component for user interaction */
export const Tag = ({
  size = "medium",
  variant = "primary",
  label,
  ...rest
}: TagProps) => {
  return (
    <StyledTag $variant={variant} $size={size} {...rest}>
      {label}
    </StyledTag>
  );
};
