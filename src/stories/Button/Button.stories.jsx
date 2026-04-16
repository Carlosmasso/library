import { fn } from "storybook/test";
import { Button } from "./Button";

const meta = {
  title: "Example/Button",
  component: Button,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {},
  args: { onClick: fn() },
};

export default meta;

export const Primary = {
  args: {
    label: "Button",
  },
};

export const Secondary = {
  args: {
    variant: "secondary",
    label: "Button",
  },
};

export const Large = {
  args: {
    size: "large",
    label: "Button",
  },
};

export const Small = {
  args: {
    size: "small",
    label: "Button",
  },
};

export const WithStartAddorment = {
  args: {
    label: "Button",
    startAddorment: <div style={{ border: "1px solid red" }}>addorment</div>,
  },
};

export const WithEndAddorment = {
  args: {
    label: "Button",
    endAddorment: <div style={{ border: "1px solid red" }}>addorment</div>,
  },
};
