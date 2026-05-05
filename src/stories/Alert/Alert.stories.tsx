// Alert.stories.tsx
import type { Meta, StoryObj } from "@storybook/react-vite";
import { Alert } from "./Alert";

const meta: Meta<typeof Alert> = {
  title: "Components/Alert",
  component: Alert,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    variant: {
      control: { type: "select" },
      options: ["info", "success", "warning", "error"],
    },
  },
};

export default meta;
type Story = StoryObj<typeof Alert>;

export const Success: Story = {
  args: {
    variant: "success",
    title: "¡Operación exitosa!",
    description: "Los cambios se han guardado correctamente.",
  },
};

export const Error: Story = {
  args: {
    variant: "error",
    title: "Error de conexión",
    description: "No se pudo establecer conexión con el servidor.",
    onClose: () => alert("Cerrado"),
  },
};

export const Warning: Story = {
  args: {
    variant: "warning",
    title: "Advertencia",
    description: "Tu sesión está a punto de expirar.",
  },
};

export const Info: Story = {
  args: {
    variant: "info",
    title: "Información",
    description: "Hay una nueva actualización disponible.",
  },
};

export const NoDescription: Story = {
  args: {
    variant: "info",
    title: "Solo título",
  },
};