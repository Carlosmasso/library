import { useEffect, useState } from "react";
import styled from "styled-components";

const PADDINGS = { small: 0.5, medium: 1, large: 1.5 };

const StyledToggle = styled.div<{
  $variant: string;
  $size: "small" | "medium" | "large";
  $orientation: string;
  $itemCount: number;
  $selectedIndex: number;
}>`
  ${({ $variant, $size, $orientation, $itemCount, $selectedIndex, theme }) => {
    const isVertical = $orientation === "vertical";
    const bgMain = theme?.colors?.[$variant]?.[500] || "#000";
    const bgText = theme?.colors?.neutral?.[0] || "#fff";

    return `
      display: flex;
      position: relative; /* Para el slider absoluto */
      line-height: 1;
      font-weight: 700;
      overflow: hidden;
      border-radius: ${theme.spacing(0.5)};
      border: 1px solid ${bgMain};
      font-size: ${theme.sizes[$size].fontSize};
      flex-direction: ${isVertical ? "column" : "row"};
      font-family: "Nunito Sans", "Helvetica Neue", Helvetica, Arial, sans-serif;
      width: 100%;   /* Ocupa el ancho completo */
      min-width: 200px;     /* Opcional: un mínimo para que no se vea minúsculo */
      background: ${bgText};

      /* EL SLIDER QUE SE MUEVE */
      &::before {
        content: "";
        position: absolute;
        z-index: 1;
        background: ${bgMain};
        transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
        
        /* Cálculo de posición y tamaño */
        width: ${isVertical ? "100%" : `${100 / $itemCount}%`};
        height: ${isVertical ? `${100 / $itemCount}%` : "100%"};
        top: ${isVertical ? `${(100 / $itemCount) * $selectedIndex}%` : "0"};
        left: ${isVertical ? "0" : `${(100 / $itemCount) * $selectedIndex}%`};
      }

      .toggle-option {
        position: relative;
        z-index: 2;
        cursor: pointer;
        text-align: center;
        
        flex: 1; /* Hace que todas las opciones midan lo mismo si el padre crece */
        padding: ${theme.spacing(PADDINGS[$size])} ${theme.spacing(PADDINGS[$size] * 2)}; /* Más padding lateral */
        
        min-width: 0;
        overflow: hidden;
        text-overflow: ellipsis;
        transition: color 0.3s ease;
        color: ${bgMain};
        display: grid;
        place-content: center;

        &.selected {
          color: ${bgText};
        }

        &:not(:last-child) {
          border-${isVertical ? "bottom" : "right"}: 1px solid ${bgMain};
        }
      }
    `;
  }};
`;

export const Toggle = ({
  options = [],
  defaultValue,
  size = "medium",
  variant = "primary",
  orientation = "horizontal",
  onChange,
  ...rest
}: any) => {
  // Inicializamos en null para que nada esté seleccionado por defecto
  const [selected, setSelected] = useState<string | null>(null);

  useEffect(() => {
    if (defaultValue) {
      const exists = options.some((opt: any) => opt.value === defaultValue);
      setSelected(exists ? defaultValue : null); // Si el defaultValue existe en options, lo seleccionamos; si no, nada se selecciona
    } else {
      setSelected(options?.[0]?.value); // Si no hay defaultValue, seleccionamos la primera opción
    }
  }, [options, defaultValue]);

  const selectedIndex = options.findIndex((opt: any) => opt.value === selected);

  const handleOnClick = (value: string) => {
    setSelected(value);
    onChange?.(value);
  };

  if (!options || options.length === 0) return null; // O un mensaje de "No options available"

  return (
    <StyledToggle
      $size={size}
      $variant={variant}
      $orientation={orientation}
      $itemCount={options.length}
      $selectedIndex={selectedIndex}
      {...rest}
    >
      {options.map(({ label, value }) => (
        <div
          key={value}
          onClick={() => handleOnClick(value)}
          className={`toggle-option ${selected === value ? "selected" : ""} ${orientation}`}
        >
          {label}
        </div>
      ))}
    </StyledToggle>
  );
};
