import type { Meta, StoryObj } from '@storybook/react-vite';
import { Spinner } from './Spinner';

const meta = {
  title: 'Spinner',
  component: Spinner,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  // Definimos controles para que sea fácil probar en Storybook
  argTypes: {
    variant: {
      control: 'select',
      options: ['primary', 'secondary', 'tertiary'],
    },
    size: {
      control: { type: 'range', min: 16, max: 100, step: 4 },
    },
    enableTrackSlot: {
      control: 'boolean',
    },
  },
} satisfies Meta<typeof Spinner>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {
    variant: 'primary',
    size: 40,
    enableTrackSlot: true,
  },
};

export const SecondaryWithTrack: Story = {
  args: {
    variant: 'secondary',
    size: 40,
    enableTrackSlot: false,
  },
};

export const LargeWithTrack: Story = {
  args: {
    variant: 'primary',
    size: 80,
    enableTrackSlot: true,
  },
};
