import React, { useRef, useState, useEffect, useCallback } from "react";
import styled, { keyframes, useTheme } from "styled-components";
import { createPortal } from "react-dom";

// ─────────────────────────────────────────────────────────────────
// Types
// ─────────────────────────────────────────────────────────────────

export type TooltipPlacement =
  | "top"
  | "top-start"
  | "top-end"
  | "bottom"
  | "bottom-start"
  | "bottom-end"
  | "left"
  | "left-start"
  | "left-end"
  | "right"
  | "right-start"
  | "right-end";

export type TooltipTrigger = "hover" | "click" | "focus" | "manual";

export interface TooltipProps {
  /** Content shown inside the tooltip bubble */
  content: React.ReactNode;
  /** The element that triggers the tooltip */
  children: React.ReactElement;
  /** Preferred placement — auto-flips if the viewport has no room */
  placement?: TooltipPlacement;
  /** Visual variant */
  variant?: string;
  /** What event(s) show/hide the tooltip */
  trigger?: TooltipTrigger | TooltipTrigger[];
  /** Controlled open state — pair with trigger="manual" */
  open?: boolean;
  /** Delay before showing (ms) */
  showDelay?: number;
  /** Delay before hiding (ms) */
  hideDelay?: number;
  /** Max width of the bubble (px) */
  maxWidth?: number;
  /** Gap between anchor and bubble (px) */
  offset?: number;
  /** Disable the tooltip entirely */
  disabled?: boolean;
  /** Show the directional arrow */
  arrow?: boolean;
  /** Render into document.body via portal */
  portal?: boolean;
  /** Called when visibility changes */
  onOpenChange?: (open: boolean) => void;
}

// ─────────────────────────────────────────────────────────────────
// Constants
// ─────────────────────────────────────────────────────────────────

/** Half-width of the arrow base (px). Full base = ARROW_W * 2 */
const ARROW_W = 6;
/** Height of the arrow triangle (px) */
const ARROW_H = 6;
/** Minimum distance arrow can be from bubble edge (px) */
const ARROW_EDGE_MIN = 8;

type Side = "top" | "bottom" | "left" | "right";

// ─────────────────────────────────────────────────────────────────
// Animations
// ─────────────────────────────────────────────────────────────────

const fadeIn = keyframes`
  from { opacity: 0; transform: scale(0.95); }
  to   { opacity: 1; transform: scale(1);    }
`;

const fadeOut = keyframes`
  from { opacity: 1; transform: scale(1);    }
  to   { opacity: 0; transform: scale(0.95); }
`;

// ─────────────────────────────────────────────────────────────────
// Styled bubble
// ─────────────────────────────────────────────────────────────────

const Bubble = styled.div<{
  $variant: string;
  $maxWidth: number;
  $closing: boolean;
}>`
  position: fixed;
  z-index: 9999;

  padding: 6px 10px;
  border-radius: 6px;
  border: 1px solid
    ${({ $variant, theme }) => theme.palette?.semantic?.[$variant] || "#111827"};
  background: ${({ $variant, theme }) =>
    theme.palette?.semantic?.[$variant] || "#111827"};
  color: ${({ theme }) => theme.palette?.neutral?.[0] || "#f9fafb"};
  font-family: "Nunito Sans", "Helvetica Neue", Helvetica, Arial, sans-serif;
  max-width: ${({ $maxWidth }) => $maxWidth}px;
  font-size: 12px;
  font-weight: 450;
  line-height: 1.5;
  letter-spacing: 0.01em;

  pointer-events: none;
  user-select: none;
  white-space: normal;
  word-break: break-word;

  box-shadow:
    0 1px 2px rgba(0, 0, 0, 0.06),
    0 4px 12px rgba(0, 0, 0, 0.1);

  animation: ${({ $closing }) => ($closing ? fadeOut : fadeIn)} 0.13s
    cubic-bezier(0.16, 1, 0.3, 1) forwards;
`;

// ─────────────────────────────────────────────────────────────────
// Position computation
// ─────────────────────────────────────────────────────────────────

interface ComputedPos {
  /** Bubble top (fixed coords) */
  bubbleTop: number;
  /** Bubble left (fixed coords) */
  bubbleLeft: number;
  /** Resolved side after auto-flip */
  side: Side;
  /**
   * Arrow position along the cross axis of the bubble.
   * For top/bottom: distance from bubble left edge.
   * For left/right: distance from bubble top edge.
   */
  arrowCross: number;
}

function getSide(placement: TooltipPlacement): Side {
  return placement.split("-")[0] as Side;
}

function computePosition(
  anchor: DOMRect,
  bubbleW: number,
  bubbleH: number,
  placement: TooltipPlacement,
  gap: number,
): ComputedPos {
  const side = getSide(placement);
  const align = placement.includes("-")
    ? (placement.split("-")[1] as "start" | "end")
    : "center";

  const vw = window.innerWidth;
  const vh = window.innerHeight;

  // ── Step 1: ideal bubble position ──────────────────────────────
  let bTop = 0;
  let bLeft = 0;

  if (side === "top") bTop = anchor.top - bubbleH - gap;
  if (side === "bottom") bTop = anchor.bottom + gap;
  if (side === "left") bLeft = anchor.left - bubbleW - gap;
  if (side === "right") bLeft = anchor.right + gap;

  if (side === "top" || side === "bottom") {
    if (align === "center")
      bLeft = anchor.left + anchor.width / 2 - bubbleW / 2;
    if (align === "start") bLeft = anchor.left;
    if (align === "end") bLeft = anchor.right - bubbleW;
  }
  if (side === "left" || side === "right") {
    if (align === "center") bTop = anchor.top + anchor.height / 2 - bubbleH / 2;
    if (align === "start") bTop = anchor.top;
    if (align === "end") bTop = anchor.bottom - bubbleH;
  }

  // ── Step 2: auto-flip ──────────────────────────────────────────
  let finalSide = side;

  if (side === "top" && bTop < 8) {
    finalSide = "bottom";
    bTop = anchor.bottom + gap;
  }
  if (side === "bottom" && bTop + bubbleH > vh - 8) {
    finalSide = "top";
    bTop = anchor.top - bubbleH - gap;
  }
  if (side === "left" && bLeft < 8) {
    finalSide = "right";
    bLeft = anchor.right + gap;
  }
  if (side === "right" && bLeft + bubbleW > vw - 8) {
    finalSide = "left";
    bLeft = anchor.left - bubbleW - gap;
  }

  // ── Step 3: clamp to viewport ──────────────────────────────────
  bLeft = Math.max(8, Math.min(bLeft, vw - bubbleW - 8));
  bTop = Math.max(8, Math.min(bTop, vh - bubbleH - 8));

  // ── Step 4: arrow cross-axis position ─────────────────────────
  // We want the arrow tip to point at the anchor center.
  // arrowCross = where to place the center of the arrow along the bubble edge.
  const anchorMidX = anchor.left + anchor.width / 2;
  const anchorMidY = anchor.top + anchor.height / 2;

  let arrowCross: number;

  if (finalSide === "top" || finalSide === "bottom") {
    // horizontal cross axis: arrowCross = distance from bubble left
    arrowCross = anchorMidX - bLeft;
    arrowCross = Math.max(
      ARROW_EDGE_MIN + ARROW_W,
      Math.min(arrowCross, bubbleW - ARROW_EDGE_MIN - ARROW_W),
    );
  } else {
    // vertical cross axis: arrowCross = distance from bubble top
    arrowCross = anchorMidY - bTop;
    arrowCross = Math.max(
      ARROW_EDGE_MIN + ARROW_W,
      Math.min(arrowCross, bubbleH - ARROW_EDGE_MIN - ARROW_W),
    );
  }

  return { bubbleTop: bTop, bubbleLeft: bLeft, side: finalSide, arrowCross };
}

// ─────────────────────────────────────────────────────────────────
// Arrow SVG
// The tip of the triangle always points AWAY from the bubble,
// toward the anchor. We render a fixed SVG and position it with JS.
// ─────────────────────────────────────────────────────────────────

interface ArrowProps {
  side: Side;
  variant: string;
  /** Position of arrow CENTER along the cross axis (px from bubble edge) */
  cross: number;
  theme: any;
}

const Arrow: React.FC<ArrowProps> = ({ side, variant, cross }) => {
  // const { bg, border } = VARIANT_STYLES[variant];
  const theme = useTheme();
  const bg = variant
    ? theme?.palette?.semantic?.[variant] || "#111827"
    : "#111827";
  const border = "transparent";

  // SVG dimensions: the arrow is ARROW_W*2 wide, ARROW_H tall
  const svgW = ARROW_W * 2 + 2; // +2 for stroke
  const svgH = ARROW_H + 2;

  // Triangle points (tip = the sharp end pointing toward anchor)
  // We always draw pointing "down" and rotate via CSS.
  // Points: top-left, top-right, bottom-center (tip)
  const pts = `1,1 ${svgW - 1},1 ${svgW / 2},${svgH - 1}`;

  // Rotation: tip of triangle points toward anchor,
  // which is on the OPPOSITE side from the bubble placement.
  // placement=top → bubble is above anchor → tip points DOWN (0deg)
  // placement=bottom → bubble is below → tip points UP (180deg)
  // placement=left  → bubble is left  → tip points RIGHT (90deg)
  // placement=right → bubble is right → tip points LEFT (270deg)
  const rotations: Record<Side, number> = {
    top: 0,
    bottom: 180,
    left: 270,
    right: 90,
  };
  const rot = rotations[side];

  // Position the SVG so its center aligns with `cross` on the bubble edge
  const style: React.CSSProperties = {
    position: "absolute",
    pointerEvents: "none",
  };

  if (side === "top") {
    style.top = "98%";
    style.left = cross - svgW / 2;
  } else if (side === "bottom") {
    style.bottom = "98%";
    style.left = cross - svgW / 2;
  } else if (side === "left") {
    style.left = "98%";
    style.top = cross - svgH / 2;
  } else {
    style.right = "98%";
    style.top = cross - svgH / 2;
  }

  return (
    <svg
      width={svgW}
      height={svgH}
      viewBox={`0 0 ${svgW} ${svgH}`}
      style={{
        ...style,
        transform: `rotate(${rot}deg)`,
        overflow: "visible",
      }}
    >
      <polygon
        points={pts}
        fill={bg}
        stroke={border === "transparent" ? bg : border}
        strokeWidth="1"
        strokeLinejoin="round"
      />
    </svg>
  );
};

// ─────────────────────────────────────────────────────────────────
// Component
// ─────────────────────────────────────────────────────────────────

export const Tooltip = ({
  content,
  children,
  placement = "top",
  variant = "default",
  trigger = "hover",
  open: controlledOpen,
  showDelay = 0,
  hideDelay = 100,
  maxWidth = 240,
  offset = 8,
  disabled = false,
  arrow = true,
  portal = true,
  onOpenChange,
}: TooltipProps) => {
  const isControlled = controlledOpen !== undefined;

  const [internalOpen, setInternalOpen] = useState(false);
  const [closing, setClosing] = useState(false);
  const [pos, setPos] = useState<ComputedPos | null>(null);

  const anchorRef = useRef<HTMLElement>(null);
  const bubbleRef = useRef<HTMLDivElement>(null);
  const showTimer = useRef<ReturnType<typeof setTimeout>>();
  const hideTimer = useRef<ReturnType<typeof setTimeout>>();

  const triggers = Array.isArray(trigger) ? trigger : [trigger];
  const isOpen = isControlled ? controlledOpen! : internalOpen;

  // ── show / hide ────────────────────────────────────────────────

  const show = useCallback(() => {
    if (disabled) return;
    clearTimeout(hideTimer.current);
    showTimer.current = setTimeout(() => {
      if (!isControlled) setInternalOpen(true);
      onOpenChange?.(true);
    }, showDelay);
  }, [disabled, showDelay, isControlled, onOpenChange]);

  const hide = useCallback(() => {
    clearTimeout(showTimer.current);
    hideTimer.current = setTimeout(() => {
      setClosing(true);
      setTimeout(() => {
        if (!isControlled) setInternalOpen(false);
        setClosing(false);
        onOpenChange?.(false);
      }, 120);
    }, hideDelay);
  }, [hideDelay, isControlled, onOpenChange]);

  // ── position update ────────────────────────────────────────────

  useEffect(() => {
    if (!isOpen) return;

    const update = () => {
      const anchor = anchorRef.current?.getBoundingClientRect();
      const bubble = bubbleRef.current?.getBoundingClientRect();
      if (!anchor || !bubble) return;
      setPos(
        computePosition(anchor, bubble.width, bubble.height, placement, offset),
      );
    };

    // Two rAFs: first paint mounts bubble, second has correct dimensions
    let raf1: number, raf2: number;
    raf1 = requestAnimationFrame(() => {
      raf2 = requestAnimationFrame(update);
    });

    window.addEventListener("scroll", update, true);
    window.addEventListener("resize", update);

    return () => {
      cancelAnimationFrame(raf1);
      cancelAnimationFrame(raf2);
      window.removeEventListener("scroll", update, true);
      window.removeEventListener("resize", update);
    };
  }, [isOpen, placement, offset, content]);

  // ── child props ────────────────────────────────────────────────

  const childProps: Record<string, unknown> = {};
  if (triggers.includes("hover")) {
    childProps.onMouseEnter = show;
    childProps.onMouseLeave = hide;
  }
  if (triggers.includes("focus")) {
    childProps.onFocus = show;
    childProps.onBlur = hide;
  }
  if (triggers.includes("click")) {
    childProps.onClick = () => (isOpen ? hide() : show());
  }

  const child = React.cloneElement(children, { ref: anchorRef, ...childProps });

  // ── bubble ─────────────────────────────────────────────────────

  const bubble =
    isOpen || closing ? (
      <Bubble
        ref={bubbleRef}
        role="tooltip"
        $variant={variant}
        $maxWidth={maxWidth}
        $closing={closing}
        style={
          pos
            ? { top: pos.bubbleTop, left: pos.bubbleLeft }
            : { visibility: "hidden", top: -9999, left: -9999 }
        }
      >
        {content}
        {arrow && pos && (
          <Arrow side={pos.side} variant={variant} cross={pos.arrowCross} />
        )}
      </Bubble>
    ) : null;

  return (
    <>
      {child}
      {portal && typeof document !== "undefined"
        ? createPortal(bubble, document.body)
        : bubble}
    </>
  );
};

export default Tooltip;
