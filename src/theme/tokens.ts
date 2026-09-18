/**
 * BEZENT Enterprise Theme Token Definitions
 * Centralized semantic token architecture for HRMS, CRM, PM, Payroll, Reports, Settings, and Shell.
 */

export const THEME_TOKENS = {
  bg: {
    app: "var(--bg-app)",
    surface: "var(--bg-surface)",
    surfaceSecondary: "var(--bg-surface-secondary)",
    header: "var(--bg-header)",
    sidebar: "var(--bg-sidebar)",
    footer: "var(--bg-footer)",
    popup: "var(--bg-popup)",
    popupHeader: "var(--bg-popup-header)",
    search: "var(--bg-search)",
    hover: "var(--bg-hover)",
    selected: "var(--bg-selected)",
  },
  text: {
    brand: "var(--text-brand)",
    primary: "var(--text-primary)",
    secondary: "var(--text-secondary)",
    muted: "var(--text-muted)",
    disabled: "var(--text-disabled)",
    inverse: "var(--text-inverse)",
  },
  border: {
    default: "var(--border-default)",
    subtle: "var(--border-subtle)",
    divider: "var(--border-divider)",
    focus: "var(--border-focus)",
  },
  icon: {
    default: "var(--icon-default)",
    hover: "var(--icon-hover)",
    active: "var(--icon-active)",
    muted: "var(--icon-muted)",
    onSolid: "var(--icon-on-solid)",
    surface: "var(--icon-surface)",
    surfaceHover: "var(--icon-surface-hover)",
    surfaceActive: "var(--icon-surface-active)",
  },
  accent: {
    primary: "var(--accent-primary)",
    hover: "var(--accent-hover)",
    pressed: "var(--accent-pressed)",
    soft: "var(--accent-soft)",
    heading: "var(--accent-heading)",
  },
  nav: {
    hover: "var(--nav-hover)",
    selected: "var(--nav-selected)",
    iconBgSelected: "var(--nav-icon-bg-selected)",
    iconBgHover: "var(--nav-icon-bg-hover)",
  },
  shadow: {
    popup: "var(--shadow-popup)",
    card: "var(--shadow-card)",
    dropdown: "var(--shadow-dropdown)",
  },
  status: {
    success: "var(--status-success)",
  },
} as const;

export default THEME_TOKENS;
