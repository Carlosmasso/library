import type { Meta, StoryObj } from "@storybook/react-vite";
import styled, { useTheme } from "styled-components";

const meta: Meta = {
  title: "Theme/Rest",
  parameters: {
    layout: "padded",
  },
};

export default meta;
type Story = StoryObj;

function ThemeColors() {
  const theme = useTheme() as any;
  const typographies = theme.typography;
  const borderRadiuses = theme.borderRadius;
  const shadows = theme.shadows;
  const breakpoints = theme.breakpoints;
  const zIndexes = theme.zIndex;

  return (
    <div
      style={{
        display: "grid",
        gap: theme.spacing(4),
        fontFamily: "monospace",
        margin: theme.spacing(2),
      }}
    >
      <Section>
        <Title>{"> "}Typographies</Title>
        {Object.entries(typographies ?? {}).map(([typoKey, colorValues]) => (
          <Row key={typoKey}>
            <div className="title">{typoKey}</div>
            {Object.entries(colorValues as any).map(
              ([shade, value]: [string, string]) => (
                <Card>
                  <SwatchLabel style={{ [typoKey]: value }}>
                    <strong>
                      {typoKey}.{shade}
                    </strong>
                    <span>{value}</span>
                  </SwatchLabel>
                </Card>
              ),
            )}
          </Row>
        ))}
      </Section>

      <Section>
        <Title>{"> "}Border Radius</Title>
        <Row>
          {Object.entries(borderRadiuses ?? {}).map(
            ([typoKey, borderRadius]) => (
              <BorderRadiusDiv $borderRadius={borderRadius}>
                <strong>
                  {typoKey}.{borderRadius}
                </strong>
              </BorderRadiusDiv>
            ),
          )}
        </Row>
      </Section>

      <Section>
        <Title>{"> "}Shadows</Title>
        <Row>
          {Object.entries(shadows ?? {}).map(([shadowKey, shadowValue]) => (
            <ShadowDiv $shadow={shadowValue}>
              <strong>
                {shadowKey}.{shadowValue}
              </strong>
            </ShadowDiv>
          ))}
        </Row>
      </Section>

      <Section>
        <Title>{"> "}Breakpoints</Title>
        <Row>
          {Object.entries(breakpoints ?? {}).map(
            ([breakpointKey, breakpointValue]) => (
              <ShadowDiv>
                <strong>
                  {breakpointKey}.{breakpointValue}
                </strong>
              </ShadowDiv>
            ),
          )}
        </Row>
      </Section>

      <Section>
        <Title>{"> "}Z - Indexes</Title>
        <Row>
          {Object.entries(zIndexes ?? {}).map(
            ([zIndexKey, zIndexValue]) => (
              <ShadowDiv>
                <strong>
                  {zIndexKey}.{zIndexValue}
                </strong>
              </ShadowDiv>
            ),
          )}
        </Row>
      </Section>
    </div>
  );
}

export const Rest: Story = {
  render: () => <ThemeColors />,
};

const Section = styled.div<{ $orientation?: "horizontal" | "vertical" }>`
  display: grid;
  gap: ${({ theme }) => theme.spacing(2)};
`;

const ShadowDiv = styled.div<{ $shadow: string }>`
  background: #fff;
  padding: 20px;
  box-shadow: ${({ $shadow }) => $shadow};
  display: grid;
  place-items: center;
  color: #333;
  border: 1px solid #333;
`;

const BorderRadiusDiv = styled.div<{ $borderRadius: string }>`
  border-radius: ${({ $borderRadius }) => $borderRadius};
  background: #6366f1;
  height: 100px;
  width: 100px;
  display: grid;
  place-items: center;
  color: #fff;
`;

const Title = styled.h3`
  padding-bottom: 12px;
  border-bottom: 1px solid rgba(0, 0, 0, 0.08);
`;

const Row = styled.div`
  display: flex;
  gap: 12px;
  align-items: center;
  justify-content: space-between;
  .title {
    font-size: 14px;
    min-width: 80px;
  }
`;

const Card = styled.div`
  width: 100%;
  overflow: hidden;
  border-radius: 10px;
  border: 1px solid rgba(0, 0, 0, 0.08);
`;

const SwatchLabel = styled.div`
  color: #333;
  padding: 8px 10px;
  background: #fff;

  strong {
    display: block;
    font-size: 12px;
    margin-bottom: 2px;
  }
`;
