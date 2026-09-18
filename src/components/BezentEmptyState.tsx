import React from "react";
import { ArrowRight, Plus, type LucideIcon } from "lucide-react";
import { useTheme } from "../theme/ThemeContext";
import { BezentEmptyStateIllustration } from "./BezentEmptyStateIllustration";

// ─── Module Variant Types ─────────────────────────────────────────────────────

export type EmptyStateVariant =
  | "reports"
  | "employees"
  | "recruitment"
  | "candidates"
  | "attendance"
  | "leave"
  | "documents"
  | "tasks"
  | "projects"
  | "payroll"
  | "approvals"
  | "calendar"
  | "notifications"
  | "search"
  | "assets"
  | "leads"
  | "crm"
  | "shifts"
  | "timesheets"
  | "performance"
  | "goals"
  | "default";

export type EmptyStateSize = "small" | "medium" | "large" | "compact" | "default";

export interface EmptyStateActionConfig {
  label: string;
  onClick?: () => void;
  icon?: React.ReactNode;
}

export interface EmptyStatePreset {
  title: string;
  description: string;
  actionLabel: string;
}

// ─── Module Presets (Unified "Let's get started" + Context-Specific Content) ─

export const BEZENT_EMPTY_PRESETS: Record<EmptyStateVariant, EmptyStatePreset> = {
  employees: {
    title: "Let's get started",
    description: "Add your first employee to start building your team.",
    actionLabel: "Add Employee",
  },
  reports: {
    title: "Let's get started",
    description: "Create your first report to turn your data into insights.",
    actionLabel: "Create Report",
  },
  tasks: {
    title: "Let's get started",
    description: "Create your first task and start planning the work.",
    actionLabel: "Create Task",
  },
  projects: {
    title: "Let's get started",
    description: "Create your first project and start planning the work.",
    actionLabel: "Create Project",
  },
  recruitment: {
    title: "Let's get started",
    description: "Add your first candidate or job opening to build your talent pipeline.",
    actionLabel: "Add Candidate",
  },
  candidates: {
    title: "Let's get started",
    description: "Add your first candidate or job opening to build your talent pipeline.",
    actionLabel: "Add Candidate",
  },
  attendance: {
    title: "Let's get started",
    description: "Log daily attendance or configure automated shift check-ins.",
    actionLabel: "Log Attendance",
  },
  leave: {
    title: "Let's get started",
    description: "Submit your first time-off request or manage company holidays.",
    actionLabel: "Apply Leave",
  },
  shifts: {
    title: "Let's get started",
    description: "Configure work shifts and schedule your team rosters.",
    actionLabel: "Create Shift",
  },
  timesheets: {
    title: "Let's get started",
    description: "Track work hours and submit timesheets for team review.",
    actionLabel: "Log Timesheet",
  },
  payroll: {
    title: "Let's get started",
    description: "Configure payroll schedules, salary structures, and payouts.",
    actionLabel: "Run Payroll",
  },
  documents: {
    title: "Let's get started",
    description: "Upload your first document or company policy handbook.",
    actionLabel: "Upload Document",
  },
  performance: {
    title: "Let's get started",
    description: "Set up goals, performance reviews, and growth milestones.",
    actionLabel: "Set Goal",
  },
  goals: {
    title: "Let's get started",
    description: "Set up goals, performance reviews, and growth milestones.",
    actionLabel: "Set Goal",
  },
  leads: {
    title: "Let's get started",
    description: "Add your first lead to start building your pipeline.",
    actionLabel: "Add Lead",
  },
  crm: {
    title: "Let's get started",
    description: "Add your first lead or deal to start building your pipeline.",
    actionLabel: "Add Lead",
  },
  assets: {
    title: "Let's get started",
    description: "Track and manage company equipment, devices, and inventory.",
    actionLabel: "Add Asset",
  },
  approvals: {
    title: "Let's get started",
    description: "Manage approval workflows and review pending team requests.",
    actionLabel: "Review Requests",
  },
  calendar: {
    title: "Let's get started",
    description: "Schedule your first company event or team meeting.",
    actionLabel: "Schedule Event",
  },
  notifications: {
    title: "Let's get started",
    description: "Stay informed on announcements, reminders, and activity updates.",
    actionLabel: "View Activity",
  },
  search: {
    title: "Let's get started",
    description: "Search across people, documents, tasks, and company services.",
    actionLabel: "Search",
  },
  default: {
    title: "Let's get started",
    description: "Add your first record and see everything come to life here.",
    actionLabel: "Add Now",
  },
};

// ─── Component Props Interface ───────────────────────────────────────────────

export interface BezentEmptyStateProps {
  /**
   * Primary title (defaults to universal "Let's get started").
   */
  title?: React.ReactNode;

  /**
   * Context-specific description text.
   */
  description?: React.ReactNode;

  /**
   * Primary action CTA button label (e.g. "Add Employee", "Create Project").
   */
  actionLabel?: string;

  /**
   * Primary action click callback.
   */
  onAction?: () => void;

  /**
   * Alias for actionLabel.
   */
  primaryAction?: string | EmptyStateActionConfig;

  /**
   * Alias for onAction.
   */
  onPrimaryAction?: () => void;

  /**
   * Optional custom icon inside primary CTA.
   */
  actionIcon?: React.ReactNode;

  /**
   * Optional secondary action config or label.
   */
  secondaryAction?: string | EmptyStateActionConfig;

  /**
   * Secondary action label string.
   */
  secondaryActionLabel?: string;

  /**
   * Secondary action click handler.
   */
  onSecondaryAction?: () => void;

  /**
   * Module variant key to resolve default context-specific copy.
   */
  variant?: EmptyStateVariant;

  /**
   * Alias for variant.
   */
  type?: EmptyStateVariant;

  /**
   * Alias for variant.
   */
  illustration?: EmptyStateVariant;

  /**
   * Size mode: 'small' | 'medium' | 'large' | 'compact' | 'default'.
   */
  size?: EmptyStateSize;

  /**
   * Hide the illustration.
   */
  hideIllustration?: boolean;

  /**
   * Additional CSS class name.
   */
  className?: string;

  /**
   * Inline CSS styles.
   */
  style?: React.CSSProperties;
}

/**
 * BEZENT Universal Animated Empty State Component
 *
 * Implements the unified BEZENT Empty-State Specification:
 * - Universal Title: "Let's get started"
 * - Context-specific supporting copy & action CTA
 * - Animated SVG workspace scene (gentle paper plane flight, dotted path reveal, breathing plus button, subtle card float)
 * - Zero panda/mascots, clean minimal SaaS aesthetics
 * - Fully accessible with @media (prefers-reduced-motion: reduce) support
 */
export function BezentEmptyState({
  variant,
  type,
  illustration,
  title,
  description,
  primaryAction,
  actionLabel,
  onPrimaryAction,
  onAction,
  actionIcon,
  secondaryAction,
  secondaryActionLabel,
  onSecondaryAction,
  size = "large",
  hideIllustration = false,
  className = "",
  style,
}: BezentEmptyStateProps) {
  // Determine dark mode
  let isDark = false;
  try {
    const themeContext = useTheme();
    isDark = themeContext.resolvedTheme === "dark";
  } catch (e) {
    if (typeof document !== "undefined") {
      isDark = document.documentElement.getAttribute("data-theme") === "dark";
    }
  }

  // Resolve module preset
  const resolvedVariantKey: EmptyStateVariant = (variant ?? type ?? illustration ?? "default") as EmptyStateVariant;
  const preset = BEZENT_EMPTY_PRESETS[resolvedVariantKey] ?? BEZENT_EMPTY_PRESETS.default;

  // Resolve Title (Universal "Let's get started" unless explicitly overridden)
  const resolvedTitle = title ?? preset.title;

  // Resolve Description
  const resolvedDesc = description ?? preset.description;

  // Resolve Primary Action config
  let resolvedActionLabel: string | undefined = actionLabel;
  let resolvedActionClick: (() => void) | undefined = onAction ?? onPrimaryAction;
  let resolvedActionIcon: React.ReactNode = actionIcon;

  if (typeof primaryAction === "string") {
    resolvedActionLabel = primaryAction;
  } else if (primaryAction && typeof primaryAction === "object") {
    resolvedActionLabel = primaryAction.label;
    if (primaryAction.onClick) resolvedActionClick = primaryAction.onClick;
    if (primaryAction.icon) resolvedActionIcon = primaryAction.icon;
  } else if (!resolvedActionLabel) {
    resolvedActionLabel = preset.actionLabel;
  }

  // Resolve Secondary Action config
  let resolvedSecondaryLabel: string | undefined = secondaryActionLabel;
  let resolvedSecondaryClick: (() => void) | undefined = onSecondaryAction;

  if (typeof secondaryAction === "string") {
    resolvedSecondaryLabel = secondaryAction;
  } else if (secondaryAction && typeof secondaryAction === "object") {
    resolvedSecondaryLabel = secondaryAction.label;
    if (secondaryAction.onClick) resolvedSecondaryClick = secondaryAction.onClick;
  }

  const isCompact = size === "small" || size === "compact";

  return (
    <div
      className={`bezent-empty-state bezent-empty-${resolvedVariantKey} ${className}`.trim()}
      role="region"
      aria-label={typeof resolvedTitle === "string" ? resolvedTitle : "Let's get started"}
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        textAlign: "center",
        maxWidth: isCompact ? 320 : 440,
        margin: "0 auto",
        padding: isCompact ? "12px 16px" : "28px 20px",
        boxSizing: "border-box",
        userSelect: "none",
        ...style,
      }}
    >
      {/* ── 1. Universal Animated Workspace SVG Illustration (150–190px wide) ── */}
      {!hideIllustration && (
        <div
          style={{
            marginBottom: isCompact ? 14 : 20,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            flexShrink: 0,
          }}
        >
          <BezentEmptyStateIllustration size={size} isDark={isDark} />
        </div>
      )}

      {/* ── 2. Universal Heading: "Let's get started" ── */}
      {resolvedTitle && (
        <h3
          style={{
            margin: 0,
            fontSize: isCompact ? 16 : 18.5,
            fontWeight: 700,
            lineHeight: 1.3,
            color: "var(--text-primary)",
            letterSpacing: "-0.02em",
          }}
        >
          {resolvedTitle}
        </h3>
      )}

      {/* ── 3. Context-Specific Description ── */}
      {resolvedDesc && (
        <p
          style={{
            margin: 0,
            marginTop: 8,
            fontSize: isCompact ? 12 : 13.5,
            fontWeight: 400,
            lineHeight: 1.5,
            color: "var(--text-muted)",
            maxWidth: isCompact ? 280 : 380,
            whiteSpace: "pre-line",
            textAlign: "center",
          }}
        >
          {resolvedDesc}
        </p>
      )}

      {/* ── 4. Primary CTA Button (Pill shape with subtle gradient) ── */}
      {(resolvedActionLabel || resolvedSecondaryLabel) && (
        <div
          style={{
            marginTop: isCompact ? 16 : 22,
            display: "inline-flex",
            alignItems: "center",
            gap: 10,
            flexWrap: "wrap",
            justifyContent: "center",
          }}
        >
          {resolvedActionLabel && (
            <button
              type="button"
              onClick={resolvedActionClick}
              style={{
                height: isCompact ? 34 : 38,
                padding: isCompact ? "0 18px" : "0 22px",
                fontSize: isCompact ? 12.5 : 13.5,
                fontWeight: 600,
                fontFamily: "inherit",
                borderRadius: 9999,
                border: "none",
                cursor: "pointer",
                display: "inline-flex",
                alignItems: "center",
                justifyContent: "center",
                gap: 7,
                background: "linear-gradient(135deg, #A855F7 0%, #931CF5 55%, #7E22CE 100%)",
                color: "#FFFFFF",
                boxShadow: isDark
                  ? "0 4px 14px rgba(147, 28, 245, 0.45)"
                  : "0 4px 14px rgba(147, 28, 245, 0.28)",
                transition: "box-shadow 150ms ease, transform 120ms ease, opacity 150ms ease",
                outline: "none",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = "translateY(-1px)";
                e.currentTarget.style.boxShadow = isDark
                  ? "0 6px 18px rgba(147, 28, 245, 0.6)"
                  : "0 6px 18px rgba(147, 28, 245, 0.38)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = "none";
                e.currentTarget.style.boxShadow = isDark
                  ? "0 4px 14px rgba(147, 28, 245, 0.45)"
                  : "0 4px 14px rgba(147, 28, 245, 0.28)";
              }}
              onMouseDown={(e) => {
                e.currentTarget.style.transform = "scale(0.98)";
              }}
              onMouseUp={(e) => {
                e.currentTarget.style.transform = "none";
              }}
            >
              {resolvedActionIcon ? (
                resolvedActionIcon
              ) : null}
              <span>{resolvedActionLabel}</span>
              <ArrowRight size={14} strokeWidth={2.2} />
            </button>
          )}

          {resolvedSecondaryLabel && (
            <button
              type="button"
              onClick={resolvedSecondaryClick}
              style={{
                height: isCompact ? 34 : 38,
                padding: isCompact ? "0 14px" : "0 18px",
                fontSize: isCompact ? 12.5 : 13.5,
                fontWeight: 500,
                fontFamily: "inherit",
                borderRadius: 9999,
                border: `1px solid ${isDark ? "rgba(233, 208, 253, 0.2)" : "var(--border-default, #E9D0FD)"}`,
                cursor: "pointer",
                display: "inline-flex",
                alignItems: "center",
                justifyContent: "center",
                background: "transparent",
                color: "var(--text-primary)",
                transition: "background-color 150ms ease, border-color 150ms ease",
                outline: "none",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = isDark
                  ? "rgba(147, 28, 245, 0.16)"
                  : "var(--bg-hover, #F4E7FE)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = "transparent";
              }}
            >
              <span>{resolvedSecondaryLabel}</span>
            </button>
          )}
        </div>
      )}

      {/* ── 5. Subtle Tagline (Full page workspace only) ── */}
      {!isCompact && (
        <div style={{ marginTop: 22, display: "flex", flexDirection: "column", alignItems: "center" }}>
          {/* Subtle accent dash */}
          <div
            style={{
              width: 18,
              height: 2,
              borderRadius: 1,
              background: isDark ? "rgba(189, 116, 249, 0.4)" : "#E9D0FD",
              marginBottom: 8,
            }}
          />
          <div
            style={{
              fontSize: 9.5,
              fontWeight: 600,
              letterSpacing: "0.12em",
              textTransform: "uppercase",
              color: "var(--text-muted)",
            }}
          >
            People &nbsp;|&nbsp; Process &nbsp;|&nbsp; Progress
          </div>
        </div>
      )}
    </div>
  );
}

// Re-export alias for seamless backward compatibility
export const EmptyState = BezentEmptyState;

export default BezentEmptyState;
