import styled from "styled-components";

const StyledSkeleton = styled.div<{
  $variant: string;
  $width: number;
  $height: number;
}>`
  ${({ $variant, $width, $height, theme }) => {
    const neutral = theme.palette?.neutral || {};

    return `
      width: ${$width}px;
      height: ${$height}px;
      border-radius: ${$variant === "circular" ? "50%" : "4px"};
      font-family: "Nunito Sans", "Helvetica Neue", Helvetica, Arial, sans-serif;

       background-image: linear-gradient(
        90deg, 
        ${neutral[300]} 0, 
        ${neutral[100]} 30%, 
        ${neutral[100]} 70%, 
        ${neutral[300]} 100%
      );

      /* 3. Estirar el fondo para que pueda "viajar" */
      background-size: 200% 100%; 
      
      /* 4. La animación */
      animation: shimmer 2s infinite;

      @keyframes shimmer {
        0% {
          background-position: 100% 0;
        }
        100% {
          background-position: -100% 0;
        }
      }

    `;
  }};
`;

export const Skeleton = ({
  width = 100,
  height = 100,
  variant = "rectangular",
}: any) => {
  return <StyledSkeleton $variant={variant} $width={width} $height={height} />;
};
