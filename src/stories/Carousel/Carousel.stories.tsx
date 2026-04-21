import type { Meta, StoryObj } from "@storybook/react-vite";
import { useState } from "react";
import { Carousel } from "./Carousel";

// ─── Sample data ─────────────────────────────────────────────────────────────

const IMAGE_SLIDES = [
  "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1200&q=80",
  "https://images.unsplash.com/photo-1501854140801-50d01698950b?w=1200&q=80",
  "https://images.unsplash.com/photo-1470770841072-f978cf4d019e?w=1200&q=80",
  "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=1200&q=80",
  "https://images.unsplash.com/photo-1518173946687-a4c8892bbd9f?w=1200&q=80",
];

const CARD_COLORS = ["#f87171", "#fb923c", "#facc15", "#4ade80", "#60a5fa", "#a78bfa"];

interface CardSlideProps {
  color: string;
  index: number;
}

const CardSlide = ({ color, index }: CardSlideProps) => (
  <div
    style={{
      width: "100%",
      height: "100%",
      background: color,
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      flexDirection: "column",
      gap: 8,
      borderRadius: 12,
    }}
  >
    <span style={{ fontSize: 48, color: "rgba(0,0,0,0.25)" }}>0{index + 1}</span>
    <span style={{ fontSize: 14, fontWeight: 600, color: "rgba(0,0,0,0.5)", letterSpacing: "0.08em" }}>
      SLIDE {index + 1}
    </span>
  </div>
);

const CUSTOM_SLIDES = CARD_COLORS.map((color, i) => (
  <CardSlide key={i} color={color} index={i} />
));

// ─── Meta ─────────────────────────────────────────────────────────────────────

/**
 * A flexible, accessible `Carousel` component with drag/swipe support,
 * keyboard navigation, autoplay, multiple variants and configurable slides per view.
 *
 * ### Features
 * - Touch & mouse drag to swipe
 * - Keyboard navigation (← →)
 * - Autoplay with configurable interval
 * - `loop`, `showArrows`, `showDots`, `showCounter` controls
 * - 4 visual variants: `default`, `minimal`, `dark`, `card`
 * - `slidesPerView` for multi-item carousels
 * - Accepts image URLs **or** arbitrary React nodes as slides
 * - ARIA compliant (role="region", role="tab", aria-live)
 */
const meta: Meta<typeof Carousel> = {
  title: "Components/Carousel",
  component: Carousel,
  tags: ["autodocs"],
  parameters: {
    layout: "padded",
    docs: {
      description: {
        component:
          "Flexible carousel with drag support, autoplay, keyboard navigation and multiple visual variants.",
      },
    },
  },
  argTypes: {
    variant: {
      control: "select",
      options: ["default", "minimal", "dark", "card"],
      description: "Visual style preset",
      table: { defaultValue: { summary: "default" } },
    },
    autoplay: {
      control: "boolean",
      description: "Enable automatic slide advancement",
    },
    autoplayInterval: {
      control: { type: "range", min: 1000, max: 8000, step: 500 },
      description: "Milliseconds between slides when autoplay is on",
      table: { defaultValue: { summary: "3000" } },
    },
    showArrows: {
      control: "boolean",
      description: "Show previous/next arrow buttons",
    },
    showDots: {
      control: "boolean",
      description: "Show pagination dots below the carousel",
    },
    showCounter: {
      control: "boolean",
      description: "Show a slide counter overlay (e.g. 2 / 5)",
    },
    loop: {
      control: "boolean",
      description: "Enable infinite looping",
    },
    aspectRatio: {
      control: "text",
      description: "CSS aspect-ratio of the viewport (e.g. 16/9, 4/3, 1/1)",
      table: { defaultValue: { summary: "16/9" } },
    },
    slidesPerView: {
      control: { type: "range", min: 1, max: 4, step: 1 },
      description: "Number of slides visible at once",
      table: { defaultValue: { summary: "1" } },
    },
    gap: {
      control: { type: "range", min: 0, max: 32, step: 4 },
      description: "Gap between slides in pixels",
      table: { defaultValue: { summary: "0" } },
    },
    onSlideChange: {
      action: "slideChanged",
      description: "Callback fired with the new index when slide changes",
    },
    items: {
      control: false,
      description: "Array of image URL strings or React nodes",
    },
  },
} satisfies Meta<typeof Carousel>;

export default meta;

type Story = StoryObj<typeof Carousel>;

// ─── Stories ──────────────────────────────────────────────────────────────────

/** Default carousel with real landscape photography. Arrows appear on hover. */
export const Default: Story = {
  args: {
    items: IMAGE_SLIDES,
    showArrows: true,
    showDots: true,
    showCounter: false,
    loop: true,
    autoplay: false,
    variant: "default",
    aspectRatio: "16/9",
    slidesPerView: 1,
    gap: 0,
  },
};

/** Autoplay advances slides every 2.5 seconds. Hover to see arrows. */
export const Autoplay: Story = {
  args: {
    ...Default.args,
    autoplay: true,
    autoplayInterval: 2500,
    showCounter: true,
  },
  parameters: {
    docs: {
      description: {
        story:
          "Set `autoplay={true}` and `autoplayInterval` (ms) to advance automatically. The counter overlay shows current position.",
      },
    },
  },
};

/** No arrows, no dots — clean embed-friendly layout. Use swipe or keyboard. */
export const Minimal: Story = {
  args: {
    ...Default.args,
    variant: "minimal",
    showArrows: false,
    showDots: false,
    showCounter: true,
  },
  parameters: {
    docs: {
      description: {
        story: "The `minimal` variant removes visible controls. Counter overlay only. Swipe or use ← → keys.",
      },
    },
  },
};

/** Dark variant with always-visible dark arrows. Suits dark-mode UIs. */
export const Dark: Story = {
  args: {
    ...Default.args,
    variant: "dark",
  },
  decorators: [
    (Story) => (
      <div style={{ background: "#111", padding: 24, borderRadius: 16 }}>
        <Story />
      </div>
    ),
  ],
  parameters: {
    backgrounds: { default: "dark" },
    docs: {
      description: {
        story: "The `dark` variant uses white dots and always-visible dark arrows for dark backgrounds.",
      },
    },
  },
};

/** Square format — ideal for social-style or product photography. */
export const Square: Story = {
  args: {
    ...Default.args,
    aspectRatio: "1/1",
    showCounter: true,
  },
};

/** Portrait mode (4:5) — matches Instagram portrait posts. */
export const Portrait: Story = {
  args: {
    ...Default.args,
    aspectRatio: "4/5",
  },
};

/** Custom React nodes as slides — works with any content, not just images. */
export const CustomSlides: Story = {
  args: {
    items: CUSTOM_SLIDES,
    showArrows: true,
    showDots: true,
    loop: true,
    aspectRatio: "16/9",
    variant: "default",
  },
  parameters: {
    docs: {
      description: {
        story:
          "`items` accepts React nodes, not just URLs. Pass any component — cards, videos, banners, forms.",
      },
    },
  },
};

/** Three slides visible at once. Use `gap` to add breathing room between them. */
export const MultipleSlides: Story = {
  args: {
    items: CUSTOM_SLIDES,
    slidesPerView: 3,
    gap: 16,
    showArrows: true,
    showDots: true,
    loop: false,
    aspectRatio: "16/9",
    variant: "default",
  },
  parameters: {
    docs: {
      description: {
        story:
          "`slidesPerView={3}` with `gap={16}` — great for product grids. Note: `loop` is disabled here since the track ends naturally.",
      },
    },
  },
};

/** No looping — arrows and dots disable gracefully at the boundaries. */
export const NoLoop: Story = {
  args: {
    ...Default.args,
    loop: false,
  },
  parameters: {
    docs: {
      description: {
        story:
          "With `loop={false}`, the prev arrow is disabled on the first slide and the next on the last.",
      },
    },
  },
};

/** Controlled story — parent tracks current index with `onSlideChange`. */
export const Controlled: Story = {
  render: (args) => {
    const [index, setIndex] = useState(0);
    const labels = ["Mountains", "Forest", "Lake", "Forest path", "Sunset"];
    return (
      <div style={{ fontFamily: "system-ui, sans-serif" }}>
        <Carousel {...args} onSlideChange={setIndex} />
        <div
          style={{
            marginTop: 16,
            padding: "12px 16px",
            background: "#f5f5f5",
            borderRadius: 8,
            fontSize: 14,
            color: "#555",
          }}
        >
          Current slide: <strong>{index + 1}</strong> —{" "}
          <em>{labels[index] ?? `Slide ${index + 1}`}</em>
        </div>
      </div>
    );
  },
  args: {
    items: IMAGE_SLIDES,
    showArrows: true,
    showDots: true,
    loop: true,
    aspectRatio: "16/9",
    variant: "default",
  },
  parameters: {
    docs: {
      description: {
        story:
          "Use `onSlideChange` to keep external state in sync. Here the parent renders the current slide name below the carousel.",
      },
    },
  },
};

/** All controls off — barebones. Navigate only with keyboard (← →) or drag. */
export const KeyboardOnly: Story = {
  args: {
    ...Default.args,
    showArrows: false,
    showDots: false,
    showCounter: true,
  },
  parameters: {
    docs: {
      description: {
        story:
          "No visible controls. Use ← → arrow keys or drag/swipe to navigate. Counter shows position.",
      },
    },
  },
};