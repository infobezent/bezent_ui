import React from "react";
import { BezentIcon } from "./BezentIcon";
import { useTheme } from "../../theme/ThemeContext";

export interface BezentNavIconProps {
  name: string;
  active: boolean;
  hovered?: boolean;
  size?: number;
  className?: string;
  style?: React.CSSProperties;
  children?: React.ReactNode;
}

/**
 * Standardized BEZENT Navigation Icon Container
 *
 * Implements the BEZENT High-Contrast Surface → Solid Icon Interaction Standard:
 * 1. Default (Surface): Outline icon, stroke: #2C0849 (1.8px), transparent background (no container), scale(0.97).
 * 2. Hover: Outline icon with #931CF5 stroke, on subtle #F4E7FE background (36px × 36px, radius 9px), 150ms ease-out.
 * 3. Selected (Controlled Solid): Bold duotone solid icon (main fill: #931CF5, dark structural/detail: #581093,
 *    clear geometry & cuts preserved) on #E9D0FD container (40px × 40px, radius 10px), scale(1.0), 180ms ease-out.
 */
export function BezentNavIcon({
  name,
  active,
  hovered = false,
  size = 20,
  className,
  style,
  children,
}: BezentNavIconProps) {
  const { mode } = useTheme();
  const isDark = mode === "dark";

  // Container Background Token
  const containerBg = active
    ? isDark
      ? "var(--nav-icon-bg-selected, #35104F)"
      : "var(--nav-icon-bg-selected, #EAD7FD)"
    : hovered
    ? isDark
      ? "var(--nav-icon-bg-hover, rgba(160, 32, 240, 0.10))"
      : "var(--nav-icon-bg-hover, #F7F0FE)"
    : "transparent";

  // Primary Stroke/Fill Color Token
  const primaryColor = active
    ? isDark
      ? "var(--nav-icon-active, #C084FC)"
      : "var(--nav-icon-active, #6D18C5)"
    : hovered
    ? isDark
      ? "var(--nav-icon-hover, #B56CFF)"
      : "var(--nav-icon-hover, #8418DC)"
    : isDark
    ? "var(--nav-icon-default, #B8A7C7)"
    : "var(--nav-icon-default, #4A275F)";

  // Dark Structural/Detail Color Token
  const structuralColor = active
    ? isDark
      ? "var(--nav-icon-active-structural, #7C24B8)"
      : "var(--nav-icon-active-structural, #581093)"
    : "transparent";

  // Stencil cutout: pure white in Light Mode, dark #35104F matching selected container in Dark Mode
  const cutoutColor = isDark ? "#35104F" : "#FFFFFF";

  // Container sizing: standardized 40px x 40px, radius 10px per enterprise standard
  return (
    <div
      className="bezent-nav-icon-anchor"
      style={{
        width: 40,
        height: 40,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        position: "relative",
        flexShrink: 0,
        ...style,
      }}
    >
      <div
        className={`bezent-nav-icon-box ${active ? "is-selected" : hovered ? "is-hovered" : "is-default"} ${className || ""}`.trim()}
        style={{
          width: 40,
          height: 40,
          borderRadius: 10,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: containerBg,
          transition: "background-color 140ms ease, color 140ms ease",
          flexShrink: 0,
          position: "relative",
        }}
      >
        <BezentIcon
          name={name}
          active={active}
          variant={active ? "solid" : "outline"}
          size={size}
          color={primaryColor}
          structuralColor={structuralColor}
          secondaryColor={structuralColor}
          cutoutColor={cutoutColor}
          strokeWidth={2}
          isDark={isDark}
          style={{
            transition: "color 140ms ease, opacity 140ms ease",
          }}
        />
        {children}
      </div>
    </div>
  );
}

export const NavIcon = BezentNavIcon;
export default BezentNavIcon;
