import type { Meta, StoryObj } from '@storybook/react-vite';
import { fn } from 'storybook/test';
import { Tag } from './Tag';

const meta = {
  title: 'Components/Tag',
  component: Tag,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  args: { onClick: fn() },
} satisfies Meta<typeof Tag>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {
    label: "primary",
  },
};

export const Secondary: Story = {
  args: {
    label: 'Tag',
    variant: 'secondary',
  },
};

export const Tertiary: Story = {
  args: {
    label: 'Tag',
    variant: 'tertiary',
  },
};

export const Others: Story = {
  args: {
    label: 'Tag',
    variant: 'primary',
    style: { background: 'purple', color: 'white' },
  },
};

// export const Large: Story = {
//   args: {
//     size: 'large',
//     label: 'Tag',
//   },
// };

// export const Small: Story = {
//   args: {
//     size: 'small',
//     label: 'Tag',
//   },
// };
