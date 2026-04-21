import { fn } from "storybook/test";
import { Button } from "./Button";
import { Trash } from 'lucide-react';
import type { Meta, StoryObj } from '@storybook/react-vite';

const meta = {
  title: "Components/Button",
  component: Button,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {},
  args: { onClick: fn() },
} satisfies Meta<typeof Button>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {
    label: "Button",
  },
};

export const Secondary: Story = {
  args: {
    variant: "secondary",
    label: "Button",
  },
};

export const Large: Story = {
  args: {
    size: "large",
    label: "Button",
  },
};

export const Small: Story = {
  args: {
    size: "small",
    label: "Button",
  },
};

export const WithStartAddorment: Story = {
  args: {
    label: "Button",
    startAddorment: <Trash />,
  },
};

export const WithEndAddorment: Story = {
  args: {
    label: "Button",
    endAddorment: <Trash />,
  },
};

export const Transparent: Story = {
  args: {
    label: "Button",
    transparent: true,
  },
};
