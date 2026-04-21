import type { Meta, StoryObj } from "@storybook/react-vite";
import styled, { useTheme } from "styled-components";

const meta: Meta = {
  title: "Theme/Colors",
  parameters: {
    layout: "padded",
  },
};

export default meta;
type Story = StoryObj;

function ThemeColors() {
  const theme = useTheme() as any;
  const palette = theme.colors;

  return (
    <div
      style={{
        gap: 20,
        display: "grid",
        fontFamily: "monospace",
      }}
    >
      {Object.entries(palette ?? {}).map(([colorName, colorValues]) => (
        <div
          key={colorName}
          style={{
            display: "flex",
            gap: theme.spacing(1),
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <div
            style={{
              padding: 10,
              fontSize: 14,
              minWidth: 80,
              background: "#fff",
            }}
          >
            {colorName}
          </div>
          {Object.entries(colorValues as any).map(([shade, background]: [string, string]) => (
            <Swatch key={`${colorName}.${shade}`} $color={background}>
              <SwatchColor $color={background} />
              <SwatchLabel>
                <strong>
                  {colorName}.{shade}
                </strong>
                {background}
              </SwatchLabel>
            </Swatch>
          ))}
        </div>
      ))}
    </div>
  );
}

export const Colors: Story = {
  render: () => <ThemeColors />,
};

const Swatch = styled.div<{ $color: string }>`
  overflow: hidden;
  border-radius: 10px;
  border: 1px solid rgba(0, 0, 0, 0.08);
  width: 100%;
`;

const SwatchColor = styled.div<{ $color: string }>`
  background: ${({ $color }) => $color};
  height: 64px;
`;

const SwatchLabel = styled.div`
  color: #333;
  font-size: 11px;
  line-height: 1.5;
  padding: 8px 10px;
  background: #fff;

  strong {
    display: block;
    font-size: 12px;
    font-family: sans-serif;
    margin-bottom: 2px;
  }
`;
