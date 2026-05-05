
import type { Meta, StoryObj } from "@storybook/react-vite";
import { Slider } from "./Slider";

const meta: Meta<typeof Slider> = {
  title: "Components/Slider",
  component: Slider,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  
};

export default meta;

type Story = StoryObj<typeof Slider>;

export const Default: Story = {
  args: {
    value: 50,
  },
};

export const Disabled: Story = {
  args: {
    value: 50,
    disabled: true,
  },
};

export const CustomVariant: Story = {
  args: {
    value: 50,
    variant: "secondary",
  },
};

export const WithMarks: Story = {
  args: {
    value: 50,
    marks: true,
  },
};

export const Vertical: Story = {
  args: {
    value: 50,
    vertical: true,
    marks: true,
  },
};

export const FullFeatured: Story = {
  args: {
    value: 50,
    min: 0,
    max: 200,
    step: 5,
    variant: "secondary",
    marks: true,
    vertical: true,
  },
};
