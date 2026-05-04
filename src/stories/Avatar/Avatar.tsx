import styled from "styled-components";

const StyledAvatar = styled.div<{
  $variant: string;
  $dimension: number;
  $shape: "circle" | "square";
}>`
  ${({ $dimension, $shape, $variant, theme }) => {
    const bgMain = theme[$variant]?.main || "#000";
    const bgText = theme[$variant]?.text || "#fff";
    return `

      display: flex;
      overflow: hidden;
      font-weight: 500;
      color: ${bgText};
      align-items: center;
      width: ${$dimension}px;
      height: ${$dimension}px;
      justify-content: center;
      background-color: ${bgMain};
      font-size: ${$dimension / 2.5}px;
      border-radius: ${$shape === "circle" ? "50%" : "8px"};
      font-family: "Nunito Sans", "Helvetica Neue", Helvetica, Arial, sans-serif;
    `;
  }};
`;

const sizeMap = {
  sm: 32,
  md: 40,
  lg: 56,
};

export const Avatar = ({
  src,
  name,
  alt = "avatar",
  size = "md",
  shape = "circle",
  variant = "primary",
}: any) => {
  const dimension = sizeMap[size];

  const getInitials = (name?: string) => {
    if (!name) return "?";
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase()
      .slice(0, 2);
  };

  return (
    <StyledAvatar $dimension={dimension} $shape={shape} $variant={variant}>
      {src ? (
        <img
          src={src}
          alt={alt}
          style={{ width: "100%", height: "100%", objectFit: "cover" }}
        />
      ) : (
        getInitials(name)
      )}
    </StyledAvatar>
  );
};
