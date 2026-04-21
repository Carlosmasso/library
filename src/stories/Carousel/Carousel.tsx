import { useCallback, useEffect, useRef, useState } from "react";
// import "./Carousel.css";
import styled from "styled-components";

export type CarouselVariant = "default" | "minimal" | "dark" | "card";

export interface CarouselProps {
  items: (string | React.ReactNode)[]; // Update the type to allow strings or React nodes
  autoplay?: boolean;
  autoplayInterval?: number;
  showArrows?: boolean;
  showDots?: boolean;
  showCounter?: boolean;
  loop?: boolean;
  variant?: CarouselVariant;
  aspectRatio?: string;
  gap?: number;
  slidesPerView?: number;
  onSlideChange?: (index: number) => void;
}

export function Carousel({
  items = [],
  autoplay = false,
  autoplayInterval = 3000,
  showArrows = true,
  showDots = true,
  showCounter = false,
  loop = true,
  variant = "default",
  aspectRatio = "16/9",
  gap = 0,
  slidesPerView = 1,
  onSlideChange,
}: CarouselProps) {
  const [current, setCurrent] = useState(0);
  const [dragging, setDragging] = useState(false);
  const [dragStart, setDragStart] = useState(0);
  const [dragOffset, setDragOffset] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const autoplayRef = useRef<NodeJS.Timeout | null>(null);
  const trackRef = useRef<HTMLDivElement | null>(null);

  const total = items.length;
  const maxIndex = Math.max(0, total - slidesPerView);

  const goTo = useCallback(
    (index: number) => {
      if (isTransitioning) return;
      let next = index;
      if (loop) {
        next = ((index % total) + total) % total;
      } else {
        next = Math.max(0, Math.min(index, maxIndex));
      }
      setIsTransitioning(true);
      setCurrent(next);
      onSlideChange?.(next);
      setTimeout(() => setIsTransitioning(false), 400);
    },
    [isTransitioning, loop, total, maxIndex, onSlideChange],
  );

  const prev = useCallback(() => goTo(current - 1), [current, goTo]);
  const next = useCallback(() => goTo(current + 1), [current, goTo]);

  useEffect(() => {
    if (!autoplay) return;
    autoplayRef.current = setInterval(
      next,
      autoplayInterval,
    ) as unknown as NodeJS.Timeout;
    return () => {
      if (autoplayRef.current) clearInterval(autoplayRef.current);
    };
  }, [autoplay, autoplayInterval, next]);

  // Keyboard navigation
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft") prev();
      if (e.key === "ArrowRight") next();
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [prev, next]);

  // Drag / swipe handlers
  const onDragStart = (clientX: number) => {
    setDragging(true);
    setDragStart(clientX);
    setDragOffset(0);
    if (autoplayRef.current) clearInterval(autoplayRef.current);
  };

  const onDragMove = (clientX: number) => {
    if (!dragging) return;
    setDragOffset(clientX - dragStart);
  };

  const onDragEnd = () => {
    if (!dragging) return;
    setDragging(false);
    if (dragOffset < -60) next();
    else if (dragOffset > 60) prev();
    setDragOffset(0);
  };

  const slideWidth = 100 / slidesPerView;
  const translateX =
    -(current * slideWidth) +
    (dragging ? (dragOffset / (trackRef.current?.offsetWidth || 1)) * 100 : 0);

  if (!total) return null;

  return (
    <StyledCarousel
      className={`carousel carousel--${variant}`}
      role="region"
      aria-label="Carousel"
      aria-roledescription="carousel"
    >
      <div
        className="carousel__viewport"
        style={{ "--aspect-ratio": aspectRatio } as React.CSSProperties}
        onMouseDown={(e) => onDragStart(e.clientX)}
        onMouseMove={(e) => onDragMove(e.clientX)}
        onMouseUp={onDragEnd}
        onMouseLeave={onDragEnd}
        onTouchStart={(e) => onDragStart(e.touches[0].clientX)}
        onTouchMove={(e) => onDragMove(e.touches[0].clientX)}
        onTouchEnd={onDragEnd}
      >
        <div
          ref={trackRef}
          className={`carousel__track ${dragging ? "carousel__track--dragging" : ""}`}
          style={{
            transform: `translateX(${translateX}%)`,
            gap: `${gap}px`,
          }}
          aria-live="polite"
        >
          {items.map((item, i) => (
            <div
              key={i}
              className="carousel__slide"
              style={{ minWidth: `calc(${slideWidth}% - ${gap}px)` }}
              aria-hidden={i !== current}
              aria-roledescription="slide"
              aria-label={`Slide ${i + 1} of ${total}`}
            >
              {typeof item === "string" ? (
                <img
                  src={item}
                  alt={`Slide ${i + 1}`}
                  className="carousel__image"
                  draggable={false}
                />
              ) : (
                item
              )}
            </div>
          ))}
        </div>

        {showArrows && (
          <>
            <button
              className="carousel__arrow carousel__arrow--prev"
              onClick={prev}
              disabled={!loop && current === 0}
              aria-label="Previous slide"
            >
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                <path
                  d="M12.5 15L7.5 10L12.5 5"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </button>
            <button
              className="carousel__arrow carousel__arrow--next"
              onClick={next}
              disabled={!loop && current >= maxIndex}
              aria-label="Next slide"
            >
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                <path
                  d="M7.5 5L12.5 10L7.5 15"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </button>
          </>
        )}

        {showCounter && (
          <div className="carousel__counter" aria-live="polite">
            {current + 1} / {total}
          </div>
        )}
      </div>

      {showDots && total > 1 && (
        <div
          className="carousel__dots"
          role="tablist"
          aria-label="Carousel navigation"
        >
          {Array.from({ length: loop ? total : maxIndex + 1 }).map((_, i) => (
            <button
              key={i}
              role="tab"
              aria-selected={i === current}
              aria-label={`Go to slide ${i + 1}`}
              className={`carousel__dot ${i === current ? "carousel__dot--active" : ""}`}
              onClick={() => goTo(i)}
            />
          ))}
        </div>
      )}
    </StyledCarousel>
  );
}

export default Carousel;

const StyledCarousel = styled.div<{}>`
  ${({}) => {
    return `
      --carousel-arrow-size: 40px;
      --carousel-dot-size: 8px;
      --carousel-arrow-bg: rgba(255, 255, 255, 0.95);
      --carousel-arrow-color: #111;
      --carousel-dot-color: rgba(0, 0, 0, 0.2);
      --carousel-dot-active: #111;
      --carousel-radius: 12px;
      font-family: "Nunito Sans", "Helvetica Neue", Helvetica, Arial, sans-serif;

      width: 100%;
      user-select: none;
      -webkit-user-select: none;

      .carousel__viewport {
        position: relative;
        width: 100%;
        aspect-ratio: var(--aspect-ratio, 16/9);
        overflow: hidden;
        border-radius: var(--carousel-radius);
        background: #f1f1f1;
        cursor: grab;
      }

      .carousel__viewport:active {
        cursor: grabbing;
      }

      .carousel__track {
        display: flex;
        height: 100%;
        transition: transform 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94);
        will-change: transform;
      }

      .carousel__track--dragging {
        transition: none;
      }

      .carousel__slide {
        flex-shrink: 0;
        height: 100%;
        overflow: hidden;
      }

      .carousel__image {
        width: 100%;
        height: 100%;
        object-fit: cover;
        display: block;
        pointer-events: none;
      }

      .carousel__arrow {
        position: absolute;
        top: 50%;
        transform: translateY(-50%);
        width: var(--carousel-arrow-size);
        height: var(--carousel-arrow-size);
        border-radius: 50%;
        border: none;
        background: var(--carousel-arrow-bg);
        color: var(--carousel-arrow-color);
        display: flex;
        align-items: center;
        justify-content: center;
        cursor: pointer;
        z-index: 10;
        box-shadow: 0 2px 12px rgba(0, 0, 0, 0.15);
        transition: transform 0.15s ease, opacity 0.15s ease, box-shadow 0.15s ease;
        opacity: 0;
      }

      .carousel__viewport:hover .carousel__arrow {
        opacity: 1;
      }

      .carousel__arrow:hover {
        transform: translateY(-50%) scale(1.08);
        box-shadow: 0 4px 20px rgba(0, 0, 0, 0.2);
      }

      .carousel__arrow:active {
        transform: translateY(-50%) scale(0.96);
      }

      .carousel__arrow:disabled {
        opacity: 0.3 !important;
        cursor: not-allowed;
      }

      .carousel__arrow--prev { left: 12px; }
      .carousel__arrow--next { right: 12px; }
      .carousel__counter {
        position: absolute;
        bottom: 12px;
        right: 12px;
        background: rgba(0, 0, 0, 0.5);
        color: #fff;
        font-size: 12px;
        font-weight: 600;
        padding: 4px 10px;
        border-radius: 20px;
        letter-spacing: 0.03em;
        backdrop-filter: blur(4px);
      }
      .carousel__dots {
        display: flex;
        justify-content: center;
        gap: 6px;
        padding: 12px 0 4px;
      }

      .carousel__dot {
        width: var(--carousel-dot-size);
        height: var(--carousel-dot-size);
        border-radius: 50%;
        border: none;
        background: var(--carousel-dot-color);
        cursor: pointer;
        padding: 0;
        transition: background 0.2s ease, transform 0.2s ease, width 0.2s ease;
      }

      .carousel__dot--active {
        background: var(--carousel-dot-active);
        width: 24px;
        border-radius: 4px;
      }

      .carousel__dot:hover:not(.carousel__dot--active) {
        background: rgba(0, 0, 0, 0.4);
        transform: scale(1.2);
      }
        .carousel--minimal {
        --carousel-arrow-bg: transparent;
        --carousel-arrow-color: #fff;
        --carousel-dot-color: rgba(255, 255, 255, 0.4);
        --carousel-dot-active: #fff;
      }

      .carousel--minimal .carousel__arrow {
        box-shadow: none;
        opacity: 1;
      }

      .carousel--minimal .carousel__arrow:hover {
        background: rgba(255, 255, 255, 0.15);
      }
      .carousel--dark {
        --carousel-arrow-bg: rgba(0, 0, 0, 0.7);
        --carousel-arrow-color: #fff;
        --carousel-dot-color: rgba(255, 255, 255, 0.3);
        --carousel-dot-active: #fff;
        --carousel-radius: 8px;
      }

      .carousel--dark .carousel__arrow {
        opacity: 1;
      }
      .carousel--card {
        --carousel-radius: 0;
        --carousel-arrow-size: 36px;
      }

      .carousel--card .carousel__slide {
        padding: 0 8px;
      }

      .carousel--card .carousel__viewport {
        overflow: visible;
      }

      @media (max-width: 480px) {
        .carousel {
          --carousel-arrow-size: 32px;
        }

        .carousel__arrow {
          opacity: 1;
        }
      }
    `;
  }};
`;
