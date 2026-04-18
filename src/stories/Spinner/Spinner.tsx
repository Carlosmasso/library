import type { CSSProperties, HTMLAttributes } from "react";
import styled from "styled-components";

export interface SpinnerProps extends Omit<
  HTMLAttributes<HTMLDivElement>,
  "label"
> {
  variant?: "primary" | "secondary" | "tertiary";
  style?: CSSProperties;
  size: number;
  enableTrackSlot?: boolean;
}

const StyledSpinner = styled.div<{
  $variant: string;
  $size: number;
  $enableTrackSlot?: boolean;
}>`
  ${({ $variant, $size, $enableTrackSlot, theme }) => {
    // Calculamos un grosor proporcional (ej. 1/8 del tamaño)
    // O puedes usar un valor fijo como: const strokeWidth = 3;
    const strokeWidth = Math.max($size * 0.12, 2); // Mínimo 2px para que se vea

    return `
      width: ${$size}px;
      height: ${$size}px;
      border-radius: 50%;
      display: inline-block;
      box-sizing: border-box;
      animation: rotation 1s linear infinite;
      
      /* Aplicamos el grosor dinámico aquí */
      border: ${strokeWidth}px solid ${$enableTrackSlot ? 'rgba(0, 0, 0, 0.1)' : 'transparent'};
      
      /* La parte animada debe tener el mismo grosor */
      border-top-color: ${theme[$variant]?.main || 'currentColor'};

      @keyframes rotation {
        0% { transform: rotate(0deg); }
        100% { transform: rotate(360deg); }
      } 
    `;
  }};
`;



/** Primary UI component for user interaction */
export const Spinner = ({
  size = 48,
  variant = "primary",
  enableTrackSlot = false,
  ...rest
}: SpinnerProps) => {
  return (
    <StyledSpinner
      $size={size}
      $variant={variant}
      $enableTrackSlot={enableTrackSlot}
      {...rest}
    />
  );
};
