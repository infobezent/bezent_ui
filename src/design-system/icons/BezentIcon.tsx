import type { BezentIconProps, BezentIconSizeToken } from "./iconTypes";
import { BEZENT_ICON_SIZES } from "./iconTypes";
import { getBezentIconDefinition } from "./iconRegistry";

export { BEZENT_ICON_SIZES };

export const BEZENT_ICON_COLORS = {
  normal: "var(--icon-default, #B8A7C7)",
  hover: "var(--icon-hover, #B56CFF)",
  selected: "var(--icon-active, #A020F0)",
  muted: "var(--icon-muted, #8E7E9E)",
  white: "var(--icon-on-solid, #FFFFFF)",
};

export function BezentIcon({
  name,
  variant = "outline",
  size = 20,
  color,
  secondaryColor,
  structuralColor,
  accentColor,
  cutoutColor,
  strokeWidth = 1.75,
  active,
  isDark: isDarkProp,
  className,
  style,
  title,
  "aria-label": ariaLabel,
  "aria-hidden": ariaHidden = true,
}: BezentIconProps) {
  const pixelSize =
    typeof size === "number"
      ? size
      : (BEZENT_ICON_SIZES as Record<string, number>)[size] ?? 20;

  const isSelected = active ?? (variant === "solid");

  // Determine duotone stroke & secondary fill colors via dynamic CSS tokens with rock-solid dark mode defaults
  const effectiveStroke =
    color ??
    (isSelected
      ? "var(--icon-stroke-active, var(--icon-active, #A020F0))"
      : "var(--icon-stroke, var(--icon-default, #B8A7C7))");

  const effectiveSecondary =
    secondaryColor ??
    (isSelected
      ? "var(--icon-fill-active, var(--icon-surface-active, rgba(160, 32, 240, 0.18)))"
      : "var(--icon-fill, var(--icon-surface, rgba(160, 32, 240, 0.10)))");

  const effectiveStructural =
    structuralColor ??
    (isSelected
      ? "var(--nav-icon-active-structural, #581093)"
      : "var(--nav-icon-active-structural, #581093)");

  const effectiveAccent =
    accentColor ??
    "var(--icon-accent-active, #931CF5)";

  const effectiveCutout =
    cutoutColor ??
    "var(--nav-cutout, #FFFFFF)";

  const isDark =
    isDarkProp ??
    (typeof document !== "undefined" &&
      document.documentElement.getAttribute("data-theme") === "dark");

  const definition = getBezentIconDefinition(name);
  const renderFn = isSelected ? definition.solid : definition.outline;

  return (
    <span
      className={`bezent-duotone-icon ${isSelected ? "is-active" : ""} ${className || ""}`.trim()}
      title={title}
      aria-label={ariaLabel}
      aria-hidden={ariaHidden}
      style={{
        width: pixelSize,
        height: pixelSize,
        display: "inline-flex",
        alignItems: "center",
        justifyContent: "center",
        flexShrink: 0,
        ...style,
      }}
    >
      {renderFn({
        size: pixelSize,
        color: effectiveStroke,
        secondaryColor: effectiveSecondary,
        structuralColor: effectiveStructural,
        accentColor: effectiveAccent,
        cutoutColor: effectiveCutout,
        strokeWidth,
        isDark,
      })}
    </span>
  );
}

export default BezentIcon;
