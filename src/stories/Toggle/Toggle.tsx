import styled from "styled-components";
import { useEffect, useState } from "react";
import type { CSSProperties, HTMLAttributes } from "react";

export interface ToggleProps extends Omit<HTMLAttributes<HTMLDivElement>, "onChange"> {
  orientation?: "horizontal" | "vertical";
  variant?: "primary" | "secondary" | "tertiary";
  size?: "small" | "medium" | "large";
  defaultValue?: string;
  options?: { label: string; value: string }[];
  onChange?: (value: string) => void;
  style?: CSSProperties;
}

const PADDINGS = {
  small: 0.5,
  medium: 1,
  large: 1.5,
};

const StyledToggle = styled.div<{
  $variant: string;
  $size: "small" | "medium" | "large";
  $orientation: string;
}>`
  ${({ $variant, $size, $orientation, theme }) => `
  display: flex;
  line-height: 1;
  font-weight: 700;
  overflow: hidden; /* IMPORTANTE: Esto arregla lo que preguntaste al principio */
  align-items: center;     
  border-radius: ${theme.spacing(0.5)};
  border: 1px solid ${theme[$variant]?.main};
  font-size: ${theme.sizes[$size].fontSize};
  flex-direction: ${$orientation === "vertical" ? "column" : "row"};
  font-family: "Nunito Sans", sans-serif; 
  width: fit-content;

  .toggle-option {
    cursor: pointer;
    text-align: center;
    width: 100%;
    padding: ${theme.spacing(PADDINGS[$size])};
    transition: all 0.2s ease;
    
    &.horizontal:not(:last-child) {
      border-right: 1px solid ${theme[$variant]?.main};
    }
    &.vertical:not(:last-child) {
      border-bottom: 1px solid ${theme[$variant]?.main};
    }

    &.selected {
      color: ${theme[$variant]?.text};
      background: ${theme[$variant]?.main};
    }
    &:not(.selected) {
      background: #fff; /* O el color de fondo de tu app */
      color: ${theme[$variant]?.main};
    }
    &:hover:not(.selected) {
      filter: brightness(0.95);
    }
  }
`};
`;

export const Toggle = ({
  defaultValue,
  size = "medium",
  variant = "primary",
  orientation = "horizontal",
  options = [],
  onChange,
  ...rest
}: ToggleProps) => {
  const [selected, setSelected] = useState<string | null>(null);

  // Inicializar estado
  useEffect(() => {
    if (defaultValue) {
      setSelected(defaultValue);
    } else if (options.length > 0) {
      setSelected(options[0].value);
    }
  }, [defaultValue, options]);

  const handleOnClick = (value: string) => {
    setSelected(value);
    if (onChange) onChange(value);
  };

  return (
    <StyledToggle
      $size={size}
      $variant={variant}
      $orientation={orientation}
      {...rest}
    >
      {options.map(({ label, value }) => (
        <div
          key={value}
          onClick={() => handleOnClick(value)} // CAMBIADO: de onChange a onClick
          className={`toggle-option ${selected === value ? "selected" : ""} ${orientation}`}
        >
          {label}
        </div>
      ))}
    </StyledToggle>
  );
};
