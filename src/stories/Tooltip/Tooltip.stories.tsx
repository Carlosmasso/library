import type { Meta, StoryObj } from "@storybook/react";
import { useState } from "react";
import { Tooltip } from "./Tooltip";
import { Button } from "../Button/Button";

const meta: Meta<typeof Tooltip> = {
  title: "Components/Tooltip",
  component: Tooltip,
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component:
          "Flexible tooltip with 12 placements, 5 variants, multiple triggers, SVG arrow, portal rendering, and controlled/uncontrolled mode.",
      },
    },
  },
  argTypes: {
    placement: {
      control: "select",
      options: [
        "top", "top-start", "top-end",
        "bottom", "bottom-start", "bottom-end",
        "left", "left-start", "left-end",
        "right", "right-start", "right-end",
      ],
    },
    variant: {
      control: "select",
      options: ["default", "info", "success", "warning", "error"],
    },
    trigger: {
      control: "select",
      options: ["hover", "click", "focus", "manual"],
    },
    showDelay: { control: { type: "number", min: 0, max: 1000, step: 50 } },
    hideDelay: { control: { type: "number", min: 0, max: 1000, step: 50 } },
    maxWidth:  { control: { type: "number", min: 80,  max: 480,  step: 8  } },
    offset:    { control: { type: "number", min: 0,   max: 32,   step: 1  } },
  },
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof Tooltip>;

// ── Shared trigger button ─────────────────────────────────────────

const Btn = (props: React.ButtonHTMLAttributes<HTMLButtonElement>) => (
  <button
    style={{
      padding: "8px 16px",
      borderRadius: 6,
      border: "1px solid #e5e7eb",
      background: "#fff",
      fontSize: 13,
      fontFamily: "inherit",
      cursor: "pointer",
      color: "#374151",
    }}
    {...props}
  />
);

// ─────────────────────────────────────────────────────────────────
// Stories
// ─────────────────────────────────────────────────────────────────

export const Default: Story = {
  args: {
    content: "This is a tooltip",
    placement: "top",
    variant: "default",
    trigger: "hover",
    arrow: true,
    showDelay: 0,
    hideDelay: 100,
    maxWidth: 240,
    offset: 8,
    disabled: false,
  },
  render: (args) => (
    <Tooltip {...args}>
      <Button label="Hover me" />
    </Tooltip>
  ),
};

// ── Placements ───────────────────────────────────────────────────

export const Placements: Story = {
  render: () => (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "repeat(3, auto)",
        gap: 12,
        padding: 48,
        alignItems: "center",
        justifyItems: "center",
      }}
    >
      {(
        [
          "top-start", "top", "top-end",
          "left-start", null, "right-start",
          "left-end",   null, "right-end",
          "bottom-start", "bottom", "bottom-end",
        ] as const
      ).map((p, i) =>
        p ? (
          <Tooltip key={p} content={p} placement={p}>
            <Button label={p} />
          </Tooltip>
        ) : (
          <span key={i} />
        )
      )}
    </div>
  ),
};

// ── Variants ─────────────────────────────────────────────────────

export const Variants: Story = {
  render: () => (
    <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
      {(["default", "info", "success", "warning", "error"] as const).map((v) => (
        <Tooltip
          key={v}
          content={`${v.charAt(0).toUpperCase() + v.slice(1)} tooltip`}
          variant={v}
          placement="top"
        >
          <Button label={v} />
        </Tooltip>
      ))}
    </div>
  ),
};

// ── Click trigger ────────────────────────────────────────────────

export const ClickTrigger: Story = {
  render: () => (
    <Tooltip content="Opened on click — click again to close" trigger="click">
      <Button label="Click me" />
    </Tooltip>
  ),
};

// ── Focus trigger ────────────────────────────────────────────────

export const FocusTrigger: Story = {
  render: () => (
    <Tooltip
      content="Visible while this input has focus"
      trigger="focus"
      placement="bottom"
    >
      <input
        placeholder="Focus me"
        style={{
          padding: "8px 12px",
          borderRadius: 6,
          border: "1px solid #e5e7eb",
          fontSize: 13,
          fontFamily: "inherit",
          outline: "none",
        }}
      />
    </Tooltip>
  ),
};

// ── Rich content ─────────────────────────────────────────────────

export const RichContent: Story = {
  render: () => (
    <Tooltip
      placement="top"
      maxWidth={220}
      content={
        <div>
          <p style={{ margin: "0 0 4px", fontWeight: 600, fontSize: 12 }}>
            Keyboard shortcut
          </p>
          <p style={{ margin: 0, opacity: 0.8, fontSize: 11 }}>
            Press{" "}
            <kbd
              style={{
                background: "#374151",
                padding: "1px 5px",
                borderRadius: 3,
                fontSize: 10,
              }}
            >
              ⌘K
            </kbd>{" "}
            to open the command palette.
          </p>
        </div>
      }
    >
      <Button label="Rich tooltip" />
    </Tooltip>
  ),
};

// ── Delays ───────────────────────────────────────────────────────

export const WithDelay: Story = {
  render: () => (
    <div style={{ display: "flex", gap: 12 }}>
      <Tooltip content="No delay" showDelay={0} hideDelay={0}>
        <Button label="No delay" />
      </Tooltip>
      <Tooltip content="Shows after 400 ms" showDelay={400}>
        <Button label="Show 400 ms" />
      </Tooltip>
      <Tooltip content="Hides after 600 ms" hideDelay={600}>
        <Button label="Hide 600 ms" />
      </Tooltip>
    </div>
  ),
};

// ── No arrow ─────────────────────────────────────────────────────

export const NoArrow: Story = {
  render: () => (
    <Tooltip content="No arrow on this tooltip" arrow={false}>
      <Button label="No arrow" />
    </Tooltip>
  ),
};

// ── Disabled ─────────────────────────────────────────────────────

export const Disabled: Story = {
  render: () => (
    <Tooltip content="You won't see this" disabled>
      <Button label="Disabled tooltip" />
    </Tooltip>
  ),
};

// ── Controlled ───────────────────────────────────────────────────

export const Controlled: Story = {
  render: () => {
    const [open, setOpen] = useState(false);
    return (
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: 20,
        }}
      >
        <Tooltip
          content="Controlled externally"
          trigger="manual"
          open={open}
          onOpenChange={setOpen}
          placement="top"
        >
          <Button label="Anchor element" />
        </Tooltip>
        <button
          onClick={() => setOpen((o) => !o)}
          style={{
            padding: "8px 20px",
            borderRadius: 6,
            border: `1px solid #3b82f6`,
            background: open ? "#3b82f6" : "#fff",
            color: open ? "#fff" : "#3b82f6",
            fontSize: 13,
            cursor: "pointer",
            transition: "all 0.15s",
          }}
        >
          {open ? "Hide tooltip" : "Show tooltip"}
        </button>
      </div>
    );
  },
};