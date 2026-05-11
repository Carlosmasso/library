import styled, { keyframes, css } from "styled-components";

// 1. Animación para el movimiento del degradado (Wave/Shimmer)
const waveKeyframes = keyframes`
  0% { background-position: -200% 0; }
  100% { background-position: 200% 0; }
`;

// 2. Animación para el parpadeo suave (Pulse)
const pulseKeyframes = keyframes`
  0% { opacity: 1; }
  50% { opacity: 0.4; }
  100% { opacity: 1; }
`;

const StyledSkeleton = styled.div<{
  $variant: string;
  $width: number;
  $height: number;
  $animation: "pulse" | "wave";
}>`
  width: ${({ $width }) => $width}px;
  height: ${({ $height }) => $height}px;
  border-radius: ${({ $variant }) => ($variant === "circular" ? "50%" : "4px")};

  /* Color base común */
  background-color: ${({ theme }) =>
    theme.palette?.neutral?.[300] || "#e2e5e7"};

  /* --- LÓGICA DE WAVE / SHIMMER --- */
  ${({ $animation, theme }) =>
    $animation === "wave" &&
    css`
      background-image: linear-gradient(
        90deg,
        ${theme.palette?.neutral?.[300] || "#e2e5e7"} 25%,
        ${theme.palette?.neutral?.[100] || "#f5f5f5"} 50%,
        ${theme.palette?.neutral?.[300] || "#e2e5e7"} 75%
      );
      background-size: 200% 100%;
      animation: ${waveKeyframes} 2s infinite linear;
    `}

  /* --- LÓGICA DE PULSE --- */
  ${({ $animation }) =>
    $animation === "pulse" &&
    css`
      animation: ${pulseKeyframes} 1.5s infinite ease-in-out;
    `}
`;

export const Skeleton = ({
  width = 100,
  height = 20,
  variant = "rectangular",
  animation = "pulse", // Por defecto ahora sí se verá diferente a wave
}: any) => {
  return (
    <StyledSkeleton
      $variant={variant}
      $animation={animation}
      $width={width}
      $height={height}
    />
  );
};
