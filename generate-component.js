#!/usr/bin/env node

import fs from "fs";
import path from "path";

const componentName = process.argv[2];

if (!componentName) {
  console.error("Debes indicar el nombre del componente");
  process.exit(1);
}

const basePath = process.cwd();
const componentDir = path.join(basePath, "src/stories", componentName);

if (fs.existsSync(componentDir)) {
  console.error("El componente ya existe");
  process.exit(1);
}

fs.mkdirSync(componentDir, { recursive: true });

const componentTemplate = `import styled from "styled-components";

const Styled${componentName} = styled.div<{
  $variant: string;
}>\`
  \${({ $variant, theme }) => {
    const bgMain = theme[$variant]?.main || "#000";
    const bgText = theme[$variant]?.text || "#fff";
    return \`
      font-family: "Nunito Sans", "Helvetica Neue", Helvetica, Arial, sans-serif;
    \`;
  }};
\`;

export const ${componentName} = ({ children }: any) => {
  return <Styled${componentName}>{children}</Styled${componentName}>;
};
`;

fs.writeFileSync(
  path.join(componentDir, `${componentName}.tsx`),
  componentTemplate,
);

const storyTemplate = `
import type { Meta, StoryObj } from "@storybook/react-vite";
import { ${componentName} } from "./${componentName}";

const meta: Meta<typeof ${componentName}> = {
  title: "Components/${componentName}",
  component: ${componentName},
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
};

export default meta;

type Story = StoryObj<typeof ${componentName}>;

export const Default: Story = {
  args: {
    children: "${componentName}",
  },
};
`;

fs.writeFileSync(
  path.join(componentDir, `${componentName}.stories.tsx`),
  storyTemplate,
);

console.log(`Componente ${componentName} creado correctamente`);
