
import type { Meta, StoryObj } from "@storybook/react-vite";
import { Skeleton } from "./Skeleton";

const meta: Meta<typeof Skeleton> = {
  title: "Components/Skeleton",
  component: Skeleton,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
};

export default meta;

type Story = StoryObj<typeof Skeleton>;

export const Default: Story = {
  args: {
    width: 40,
    height: 40,
  },
};


export const Circular: Story = {
  args: {
    variant: "circular",
    width: 100,
    height: 100,
  },
};

export const Rectangular: Story = {
  args: {
    variant: "rectangular",
    width: 200,
    height: 100,
  },
};

export const WithShimmer: Story = {
  args: {
    width: 200,
    height: 100,
    variant: "rectangular",
  },
};

export const WithPulse: Story = {
  args: {
    width: 200,
    height: 100,
    animation: 'wave',
    variant: "rectangular",
  },
};