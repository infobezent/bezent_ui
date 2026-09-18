import React from "react";

export type IconVariant = "outline" | "solid";

export type BezentProduct = "hrms" | "crm" | "pm" | "global";

export interface BezentIconRenderProps {
  size: number;
  color: string;
  strokeWidth?: number;
  secondaryColor?: string;
  structuralColor?: string;
  accentColor?: string;
  cutoutColor?: string;
  isDark?: boolean;
}

export interface IconDefinition {
  name: string;
  label: string;
  category: BezentProduct;
  outline: (props: BezentIconRenderProps) => React.JSX.Element;
  solid: (props: BezentIconRenderProps) => React.JSX.Element;
}

export const BEZENT_ICON_SIZES = {
  primaryRail: 20,
  moreFlyout: 18,
  topNav: 18,
  topNavAction: 20,
  rightRail: 19,
  footer: 18,
  quickAction: 18,
  compact: 18,
  nav: 20,
  action: 20,
  module: 20,
  flyout: 18,
} as const;

export type BezentIconSizeToken = keyof typeof BEZENT_ICON_SIZES;

/**
 * Standardized BEZENT Sidebar Navigation Layout Tokens
 * Enforces invariant vertical pitch and icon alignment regardless of label line count.
 * Container: 36px x 36px, Icon: 20px, Radius: 10-11px per BEZENT design system standard.
 */
export const SIDEBAR_NAV_TOKENS = {
  itemWidth: 78,
  itemHeight: 68,
  paddingTop: 0,
  iconBoxSize: 40,
  iconBoxRadius: 10,
  iconSize: 20,
  iconToLabelGap: 4,
  labelAreaHeight: 24,
  labelFontSize: 10.5,
  labelLineHeight: "12px",
  labelMaxLines: 2,
  labelMaxWidth: 74,
  railItemGap: 2,
} as const;

export interface BezentIconProps {
  name: string;
  variant?: IconVariant;
  size?: number | string | BezentIconSizeToken;
  color?: string;
  secondaryColor?: string;
  structuralColor?: string;
  accentColor?: string;
  cutoutColor?: string;
  strokeWidth?: number;
  active?: boolean;
  className?: string;
  style?: React.CSSProperties;
  title?: string;
  "aria-label"?: string;
  "aria-hidden"?: boolean;
}

export interface NavigationChildItem {
  id: string;
  label: string;
  route: string;
  badge?: string | number;
  description?: string;
}

export interface NavigationModuleItem {
  id: string;
  label: string;
  icon: string;
  badge?: string | number;
  description?: string;
  subtitle?: string;
  supportsSubNavShell?: boolean;
  hasSubNav?: boolean;
  route?: string;
  children?: NavigationChildItem[];
}

export interface NavigationGroup {
  id: string;
  title: string;
  items: NavigationModuleItem[];
}

