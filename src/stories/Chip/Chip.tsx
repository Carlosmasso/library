import styled from "styled-components";

const StyledChip = styled.div<{
  $color: string;
  $clickable: boolean;
  $variant: string;  
}>`
  ${({ $color, $clickable, $variant, theme }) => {
    const bgMain = theme.palette?.[$color]?.[500] || "#000";
    const bgText = theme.palette?.neutral?.[0] || "#fff";
    const isOutlined = $variant === "outlined";

    return `
      color: ${isOutlined ? bgMain : bgText};
      background-color: ${isOutlined ? "transparent" : bgMain};
      font-family: "Nunito Sans", "Helvetica Neue", Helvetica, Arial, sans-serif;
      padding: 6px 12px;
      border-radius: 16px;
      display: inline-block;
      line-height: 1;
      gap: 8px;
      display: inline-flex;
      align-items: center;
      border: ${isOutlined ? `1px solid ${bgMain}` : "none"};
      ${$clickable ? "cursor: pointer;" : ""}

      .delete-icon {
        color: ${isOutlined ? bgMain : bgText};
        font-size: 14px;
        width: 16px;
        height: 16px;
        border-radius: 50%;
        display: grid;
        place-content: center;
        border: ${isOutlined ? `1px solid ${bgMain}` : "none"};
        transition: background 0.15s ease;
      }
      &:hover .delete-icon {
        background: ${isOutlined ? theme.palette?.[$color]?.[200] : theme.palette?.[$color]?.[700]};
      }
    `;
  }};
`;

export const Chip = ({
  label,
  onClick,
  onDelete,
  icon,
  color = "primary",
  variant = "filled"
}: any) => {
  const clickable = Boolean(onClick || onDelete);
  return (
    <StyledChip $color={color} $variant={variant} $clickable={clickable} onClick={onClick}>
      {icon && <span className="icon">{icon}</span>}
      {label}
      {onDelete && (
        <span className="delete-icon" onClick={onDelete}>
          &times;
        </span>
      )}
    </StyledChip>
  );
};
