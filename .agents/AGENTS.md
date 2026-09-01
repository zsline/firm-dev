# Workspace Rules

## Services Single Slider Standard
- Slides in `services-single__slider` consist of:
  - Left content (`.services-single__slide-content`): Badge (`.services-single__slide-badge`) + Description (`.services-single__slide-desc`) with `padding-left: 24px`. No titles or CTA buttons unless requested.
  - Right content (`.services-single__slide-media`): Vector SVG illustration strictly constrained to `max-width: 40%` slide width.
- Slider functionality:
  - Swiper instance with `autoplay`, `loop: true`, pagination, navigation arrows.
  - Pauses autoplay on mouse hover (`mouseenter` / `mouseleave` handlers and `pauseOnMouseEnter: true`).
