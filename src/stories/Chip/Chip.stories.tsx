
import type { Meta, StoryObj } from "@storybook/react-vite";
import { Chip } from "./Chip";
import { Avatar } from "../Avatar/Avatar";

const meta: Meta<typeof Chip> = {
  title: "Components/Chip",
  component: Chip,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
};

export default meta;

type Story = StoryObj<typeof Chip>;

export const Default: Story = {
  args: {
    label: "Chip",
    color: "primary",
  },
};

export const Clickable: Story = {
  args: {
    label: "Clickable Chip",
    color: "secondary",
    onDelete: () => alert("Deleted"),
  },
};

export const Outlined: Story = {
  args: {
    label: "Outlined Chip",
    color: "primary",
    variant: "outlined",
    onDelete: () => alert("Deleted"),
  },
};

export const WithIcon: Story = {
  args: {
    label: "Chip with Icon",
    icon: <Avatar size="xs" src="https://i.pravatar.cc/150?img=3" alt="Avatar" />,
    onDelete: () => alert("Deleted"),
  },
};

export const WithAvatar: Story = {
  args: {
    label: "Chip with Avatar",
    icon: <Avatar size="xs" variant="tertiary" name="John Doe" />,
    color: "secondary",
  },
};