import type { Meta, StoryObj } from "@storybook/react-vite";
import styled, { useTheme } from "styled-components";

const meta: Meta = {
  title: "Theme/Overview",
  // tags: ["autodocs"],
  parameters: {
    layout: "padded",
    options: { showPanel: false },
  },
};

export default meta;
type Story = StoryObj;

// ─── Color swatches ───────────────────────────────────────────────────────────

const ColorGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(140px, 1fr));
  gap: 12px;
  margin-bottom: 40px;
`;

const Swatch = styled.div<{ $color: string }>`
  border-radius: 10px;
  overflow: hidden;
  border: 1px solid rgba(0, 0, 0, 0.08);
`;

const SwatchColor = styled.div<{ $color: string }>`
  background: ${({ $color }) => $color};
  height: 64px;
`;

const SwatchLabel = styled.div`
  padding: 8px 10px;
  background: #fff;
  font-size: 11px;
  font-family: monospace;
  line-height: 1.5;
  color: #333;

  strong {
    display: block;
    font-size: 12px;
    font-family: sans-serif;
    color: #111;
    margin-bottom: 2px;
  }
`;

// ─── Typography rows ──────────────────────────────────────────────────────────

const TypoTable = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1px;
  border: 1px solid #e5e7eb;
  border-radius: 10px;
  overflow: hidden;
  margin-bottom: 40px;
`;

const TypoRow = styled.div`
  display: grid;
  grid-template-columns: 140px 1fr 200px;
  align-items: center;
  gap: 16px;
  padding: 16px 20px;
  background: #fff;
  border-bottom: 1px solid #f3f4f6;

  &:last-child { border-bottom: none; }
`;

const TypoMeta = styled.div`
  font-size: 11px;
  font-family: monospace;
  color: #6b7280;
  line-height: 1.6;
`;

// ─── Spacing ──────────────────────────────────────────────────────────────────

const SpacingRow = styled.div`
  display: flex;
  align-items: center;
  gap: 16px;
  padding: 8px 0;
  border-bottom: 1px solid #f3f4f6;
`;

const SpacingBar = styled.div<{ $size: string }>`
  height: 20px;
  width: ${({ $size }) => $size};
  background: #6366f1;
  border-radius: 4px;
  flex-shrink: 0;
`;

const SpacingMeta = styled.div`
  font-size: 12px;
  font-family: monospace;
  color: #6b7280;
  min-width: 80px;
`;

// ─── Radii ────────────────────────────────────────────────────────────────────

const RadiiGrid = styled.div`
  display: flex;
  gap: 16px;
  flex-wrap: wrap;
  margin-bottom: 40px;
`;

const RadiiBox = styled.div<{ $radius: string }>`
  width: 80px;
  height: 80px;
  background: #e0e7ff;
  border-radius: ${({ $radius }) => $radius};
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  font-size: 11px;
  font-family: monospace;
  color: #4338ca;
  text-align: center;
  gap: 4px;
  border: 2px solid #c7d2fe;
`;

// ─── Section header ───────────────────────────────────────────────────────────

const Section = styled.div`
  margin-bottom: 40px;
`;

const SectionTitle = styled.h2`
  font-size: 13px;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.08em;
  color: #6b7280;
  margin: 0 0 16px;
  padding-bottom: 8px;
  border-bottom: 2px solid #f3f4f6;
`;

// ─── Component ────────────────────────────────────────────────────────────────

function ThemeOverview() {
  const theme = useTheme() as any;
  console.log([theme])
  const colors = theme.colors ?? {};
  const typography = theme.typography ?? theme.fonts ?? {};
  const spacing = theme.spacing ?? theme.space ?? {};
  const radii = theme.radii ?? theme.radius ?? {};
  const fontSizes = theme.fontSizes ?? typography.sizes ?? {};
  const fontWeights = theme.fontWeights ?? typography.weights ?? {};
  const fontFamilies = theme.fonts ?? typography.families ?? {};

  return (
    <div style={{ fontFamily: "sans-serif", maxWidth: 960 }}>

      {/* Colors */}
      {Object.keys(colors).length > 0 && (
        <Section>
          <SectionTitle>Colors</SectionTitle>
          <ColorGrid>
            {Object.entries(colors).map(([key, value]) =>
              typeof value === "string" ? (
                <Swatch key={key} $color={value}>
                  <SwatchColor $color={value} />
                  <SwatchLabel>
                    <strong>{key}</strong>
                    {value}
                  </SwatchLabel>
                </Swatch>
              ) : typeof value === "object" && value !== null ? (
                Object.entries(value as Record<string, string>).map(([subKey, subValue]) => (
                  <Swatch key={`${key}.${subKey}`} $color={subValue}>
                    <SwatchColor $color={subValue} />
                    <SwatchLabel>
                      <strong>{key}.{subKey}</strong>
                      {subValue}
                    </SwatchLabel>
                  </Swatch>
                ))
              ) : null
            )}
          </ColorGrid>
        </Section>
      )}

      {/* Typography — font families */}
      {Object.keys(fontFamilies).length > 0 && (
        <Section>
          <SectionTitle>Font families</SectionTitle>
          <TypoTable>
            {Object.entries(fontFamilies).map(([key, value]) =>
              typeof value === "string" ? (
                <TypoRow key={key}>
                  <TypoMeta>{key}</TypoMeta>
                  <span style={{ fontFamily: value, fontSize: 20 }}>
                    The quick brown fox
                  </span>
                  <TypoMeta>{value}</TypoMeta>
                </TypoRow>
              ) : null
            )}
          </TypoTable>
        </Section>
      )}

      {/* Font sizes */}
      {Object.keys(fontSizes).length > 0 && (
        <Section>
          <SectionTitle>Font sizes</SectionTitle>
          <TypoTable>
            {Object.entries(fontSizes).map(([key, value]) => (
              <TypoRow key={key}>
                <TypoMeta>{key}<br />{String(value)}</TypoMeta>
                <span style={{ fontSize: String(value), lineHeight: 1.2 }}>
                  The quick brown fox
                </span>
                <TypoMeta />
              </TypoRow>
            ))}
          </TypoTable>
        </Section>
      )}

      {/* Font weights */}
      {Object.keys(fontWeights).length > 0 && (
        <Section>
          <SectionTitle>Font weights</SectionTitle>
          <TypoTable>
            {Object.entries(fontWeights).map(([key, value]) => (
              <TypoRow key={key}>
                <TypoMeta>{key}<br />{String(value)}</TypoMeta>
                <span style={{ fontWeight: value as any, fontSize: 20 }}>
                  The quick brown fox
                </span>
                <TypoMeta />
              </TypoRow>
            ))}
          </TypoTable>
        </Section>
      )}

      {/* Spacing */}
      {Object.keys(spacing).length > 0 && (
        <Section>
          <SectionTitle>Spacing</SectionTitle>
          {Object.entries(spacing).map(([key, value]) => (
            <SpacingRow key={key}>
              <SpacingMeta>{key}</SpacingMeta>
              <SpacingBar $size={String(value)} />
              <SpacingMeta>{String(value)}</SpacingMeta>
            </SpacingRow>
          ))}
        </Section>
      )}

      {/* Radii */}
      {Object.keys(radii).length > 0 && (
        <Section>
          <SectionTitle>Border radius</SectionTitle>
          <RadiiGrid>
            {Object.entries(radii).map(([key, value]) => (
              <RadiiBox key={key} $radius={String(value)}>
                <span>{key}</span>
                <span>{String(value)}</span>
              </RadiiBox>
            ))}
          </RadiiGrid>
        </Section>
      )}

    </div>
  );
}

export const Overview: Story = {
  render: () => <ThemeOverview />,
};
