import React from "react";
import styled from "styled-components";

export interface SliderProps {
  value?: number;
  defaultValue?: number;
  min?: number;
  max?: number;
  step?: number;
  onChange?: (value: number) => void;
  disabled?: boolean;
  variant?: "primary" | "secondary";
  marks?: boolean;
  vertical?: boolean;
}

const Wrapper = styled.div<{ $vertical: boolean }>`
  position: relative;
  display: inline-flex;
  ${({ $vertical }) =>
    $vertical
      ? `
    height: 150px;
    width: 24px;
    align-items: center;
    justify-content: center;
  `
      : `
    width: 100%;
  `}
`;

const Tooltip = styled.div<{ $left: number; $vertical: boolean }>`
  position: absolute;
  z-index: 10;

  padding: 4px 8px;
  border-radius: 6px;

  font-size: 12px;
  font-weight: 500;
  line-height: 1;

  background: ${({ theme }) => theme.colors?.neutral?.[700] || "#111"};
  color: ${({ theme }) => theme.colors?.neutral?.[0] || "#fff"};

  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  font-family: "Nunito Sans", "Helvetica Neue", Helvetica, Arial, sans-serif;
  white-space: nowrap;
  pointer-events: none;

  opacity: 0;
  transform: scale(0.9);
  transition:
    opacity 0.15s ease,
    transform 0.15s ease;

  ${({ $vertical, $left }) =>
    $vertical
      ? `
    bottom: ${$left}%;
    left: 32px;
    transform: translateY(50%) scale(0.9);
  `
      : `
    left: ${$left}%;
    top: -36px;
    transform: translateX(-50%) scale(0.9);
  `}

  /* visible state (lo activas con un class o prop si quieres animarlo mejor) */
  &.visible {
    opacity: 1;
  }

  /* Flechita */
  &::after {
    content: "";
    position: absolute;
    width: 6px;
    height: 6px;
    background: inherit;
    transform: rotate(45deg);

    ${({ $vertical }) =>
      $vertical
        ? `
      left: -3px;
      top: 50%;
      transform: translateY(-50%) rotate(45deg);
    `
        : `
      bottom: -3px;
      left: 50%;
      transform: translateX(-50%) rotate(45deg);
    `}
  }
`;

const StyledSlider = styled.input<{
  $variant: string;
  $disabled: boolean;
  $progress: number;
  $vertical: boolean;
}>`
  ${({ $variant, $disabled, $progress, $vertical, theme }) => {
    const variantTheme = theme.colors?.[$variant] || {};
    const main = variantTheme[500] || "#6366f1";
    const track = theme.colors?.neutral?.[300] || "#e5e7eb";

    return `
      -webkit-appearance: none;
      appearance: none;

      width: ${$vertical ? "150px" : "100%"};
      height: 4px;
      border-radius: 2px;
      outline: none;

      background: linear-gradient(
        to right,
        ${main} 0%,
        ${main} ${$progress}%,
        ${track} ${$progress}%,
        ${track} 100%
      );

      cursor: ${$disabled ? "not-allowed" : "pointer"};
      opacity: ${$disabled ? 0.6 : 1};

      ${$vertical ? `transform: rotate(-90deg);` : ""}

      &::-webkit-slider-thumb {
        -webkit-appearance: none;
        width: 16px;
        height: 16px;
        border-radius: 50%;
        background: ${main};
      }

      &::-moz-range-thumb {
        width: 16px;
        height: 16px;
        border-radius: 50%;
        background: ${main};
        border: none;
      }

      &::-moz-range-track {
        background: transparent;
      }
    `;
  }}
`;

export const Slider = ({
  value,
  defaultValue = 50,
  min = 0,
  max = 100,
  step = 1,
  onChange,
  disabled = false,
  variant = "primary",
  marks = false,
  vertical = false,
}: SliderProps) => {
  const [currentValue, setCurrentValue] = React.useState(value ?? defaultValue);
  const [hovered, setHovered] = React.useState(false);

  const percentage = ((currentValue - min) / (max - min)) * 100;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = Number(e.target.value);
    setCurrentValue(newValue);
    onChange?.(newValue);
  };

  return (
    <Wrapper $vertical={vertical}>
      {marks && hovered && (
        <Tooltip
          className={hovered ? "visible" : ""}
          $left={percentage}
          $vertical={vertical}
        >
          {currentValue}
        </Tooltip>
      )}

      <StyledSlider
        type="range"
        value={currentValue}
        min={min}
        max={max}
        step={step}
        onChange={handleChange}
        disabled={disabled}
        $variant={variant}
        $disabled={disabled}
        $vertical={vertical}
        $progress={percentage}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
      />
    </Wrapper>
  );
};
