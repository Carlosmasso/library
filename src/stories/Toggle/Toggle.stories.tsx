import type { Meta, StoryObj } from '@storybook/react-vite';
import { fn } from 'storybook/test';
import { Toggle } from './Toggle';

const meta = {
  title: 'Components/Toggle',
  component: Toggle,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  args: { onClick: fn() },
  argTypes: {
    defaultValue: {
      control: 'text',
    },
    variant: {
      control: 'select',
      options: ['primary', 'secondary', 'tertiary'],
    },
    orientation: {
      control: 'select',
      options: ['horizontal', 'vertical'],
    },
    size: {
      control: 'select',
      options: ['small', 'medium', 'large'],
    },
    options: {
      control: 'object',
    },
  },
} satisfies Meta<typeof Toggle>;

export default meta;
type Story = StoryObj<typeof meta>;

const options = [
  { label: 'Option 1', value: 'option1' },
  { label: 'Option 2 mas larga para probar fix', value: 'option2' },
  { label: 'Option 3', value: 'option3' },
];

export const Primary: Story = {
  args: {
    options: options,
  },
};

export const Secondary: Story = {
  args: {
    options: options,
    variant: 'secondary',
    onChange: (value) => console.log('Clicked! Value Secondary: ' + value),
  },
};

export const DefaultValue: Story = {
  args: {
    options: options,
    variant: 'primary',
    defaultValue: options[1].value,
  },
};

export const Vertical: Story = {
  args: {
    options: options,
    variant: 'primary',
    orientation: 'vertical',
  },
};