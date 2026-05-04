
import type { Meta, StoryObj } from "@storybook/react-vite";
import { Avatar } from "./Avatar";
import styled from "styled-components";

const meta: Meta<typeof Avatar> = {
  title: "Components/Avatar",
  component: Avatar,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
};

export default meta;

type Story = StoryObj<typeof Avatar>;

export const Default: Story = {
  args: {
    name: "Carlos Masso",
  },
};

export const WithImage: Story = {
  args: {
    src: "https://randomuser.me/api/portraits/men/75.jpg",
  },
};

export const Square: Story = {
  args: {
    name: "Carlos Masso",
    shape: "square",
  },
};

export const Large: Story = {
  args: {
    name: "Carlos Masso",
    size: "lg",
  },
};

export const CustomVariant: Story = {
  args: {
    name: "Carlos Masso",
    variant: "secondary",
  },
};

export const NoName: Story = {
  args: {
    size: "lg",
  },
};

export const LongName: Story = {
  args: {
    name: "Carlos Masso Rodriguez",
  },
};