import React from "react";
import * as L from "lucide-react";

export interface BezentEnterpriseIconProps {
  name: string;
  active?: boolean;
  hovered?: boolean;
  size?: number;
  color?: string;
  className?: string;
  style?: React.CSSProperties;
}

/**
 * Standardized BEZENT Professional Enterprise Icon System
 *
 * Requirements:
 * - Default: 20px, stroke: 1.75px, strokeLinecap: round, strokeLinejoin: round, color: #4B2A63
 * - Hover: stroke: 1.75px, color: #7114BD (remains outline, never solid on hover)
 * - Active: True solid variant (never CSS fill on outline), color: #7114BD
 * - Optics: Strict vertical and optical alignment across all icons
 */
export function BezentEnterpriseIcon({
  name,
  active = false,
  hovered = false,
  size = 20,
  color,
  className,
  style,
}: BezentEnterpriseIconProps) {
  // Determine effective color via global BEZENT icon system tokens
  const effectiveColor =
    color ??
    (active
      ? "var(--icon-active, #A020F0)"
      : hovered
      ? "var(--icon-hover, #B56CFF)"
      : "var(--icon-default, #B8A7C7)");

  const normalized = name.toLowerCase().replace(/[^a-z0-9]/g, "");

  // Common outline props matching global enterprise style
  const outlineProps = {
    size,
    strokeWidth: 2,
    strokeLinecap: "round" as const,
    strokeLinejoin: "round" as const,
    color: effectiveColor,
  };

  // ── True Solid Renderers (Preserves geometry and negative space cutouts) ──

  // 1. Employees / People / Users
  if (normalized.includes("employee") || normalized.includes("people") || normalized.includes("usersround") || normalized.includes("users")) {
    if (active) {
      return (
        <svg width={size} height={size} viewBox="0 0 24 24" fill="none" aria-hidden="true" className={className} style={style}>
          <circle cx="16" cy="7" r="3.5" fill={effectiveColor} />
          <path d="M22 21v-2a4 4 0 0 0-3-3.87h-3v5.87z" fill={effectiveColor} />
          <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2z" fill={effectiveColor} stroke="#FFFFFF" strokeWidth={1.8} />
          <circle cx="9" cy="7" r="4" fill={effectiveColor} stroke="#FFFFFF" strokeWidth={1.8} />
        </svg>
      );
    }
    return <L.Users {...outlineProps} className={className} style={style} />;
  }

  // 2. Organization / Network / Workflow
  if (normalized.includes("org") || normalized.includes("network")) {
    if (active) {
      return (
        <svg width={size} height={size} viewBox="0 0 24 24" fill="none" aria-hidden="true" className={className} style={style}>
          <rect x="9" y="2" width="6" height="6" rx="1.5" fill={effectiveColor} />
          <rect x="2" y="16" width="6" height="6" rx="1.5" fill={effectiveColor} />
          <rect x="16" y="16" width="6" height="6" rx="1.5" fill={effectiveColor} />
          <path d="M5 16v-3a1 1 0 0 1 1-1h12a1 1 0 0 1 1 1v3 M12 8v4" stroke={effectiveColor} strokeWidth={2.2} strokeLinecap="round" />
        </svg>
      );
    }
    return <L.Network {...outlineProps} className={className} style={style} />;
  }

  // Operations / Workflow
  if (normalized === "operations" || normalized === "workflow") {
    return <L.Workflow {...outlineProps} strokeWidth={active ? 2.2 : 1.75} className={className} style={style} />;
  }

  // 3. Recruitment / UserSearch
  if (normalized.includes("recruit") || normalized.includes("usersearch")) {
    if (active) {
      return (
        <svg width={size} height={size} viewBox="0 0 24 24" fill="none" aria-hidden="true" className={className} style={style}>
          <circle cx="10" cy="7" r="4" fill={effectiveColor} />
          <path d="M10.5 15H7a4 4 0 0 0-4 4v2" fill={effectiveColor} />
          <circle cx="17" cy="17" r="3" stroke={effectiveColor} strokeWidth={2.2} />
          <path d="m21 21-1.9-1.9" stroke={effectiveColor} strokeWidth={2.5} strokeLinecap="round" />
        </svg>
      );
    }
    return <L.UserSearch {...outlineProps} className={className} style={style} />;
  }

  // 4. Job Openings / Briefcase
  if (normalized.includes("job") || normalized.includes("opening") || normalized.includes("briefcase")) {
    if (active) {
      return (
        <svg width={size} height={size} viewBox="0 0 24 24" fill="none" aria-hidden="true" className={className} style={style}>
          <path d="M16 6V4a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v2" stroke={effectiveColor} strokeWidth={2.4} strokeLinecap="round" strokeLinejoin="round" />
          <rect width="20" height="14" x="2" y="6" rx="2.5" fill={effectiveColor} />
          <line x1="2" x2="22" y1="12" y2="12" stroke="#FFFFFF" strokeWidth={1.8} />
          <rect x="10.5" y="10.5" width="3" height="3" rx="0.75" fill="#FFFFFF" />
        </svg>
      );
    }
    return <L.Briefcase {...outlineProps} className={className} style={style} />;
  }

  // 5. Candidates / ContactRound
  if (normalized.includes("candidate") || normalized.includes("contactround")) {
    if (active) {
      return (
        <svg width={size} height={size} viewBox="0 0 24 24" fill="none" aria-hidden="true" className={className} style={style}>
          <rect width="18" height="18" x="3" y="3" rx="2.5" fill={effectiveColor} />
          <circle cx="12" cy="10" r="3" fill="#FFFFFF" />
          <path d="M7 18a5 5 0 0 1 10 0" fill="#FFFFFF" />
        </svg>
      );
    }
    return <L.ContactRound {...outlineProps} className={className} style={style} />;
  }

  // 6. Interviews / MessagesSquare
  if (normalized.includes("interview") || normalized.includes("messagessquare")) {
    if (active) {
      return (
        <svg width={size} height={size} viewBox="0 0 24 24" fill="none" aria-hidden="true" className={className} style={style}>
          <path d="M14 9a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v6a2 2 0 0 1-2 2h-1l-2 2v-2h-1a2 2 0 0 1-2-2V9z" fill={effectiveColor} opacity="0.8" />
          <path d="M3 5a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H8l-4 4V15H5a2 2 0 0 1-2-2V5z" fill={effectiveColor} />
        </svg>
      );
    }
    return <L.MessagesSquare {...outlineProps} className={className} style={style} />;
  }

  // 7. Offers / FileCheck2
  if (normalized.includes("offer") || normalized.includes("filecheck")) {
    if (active) {
      return (
        <svg width={size} height={size} viewBox="0 0 24 24" fill="none" aria-hidden="true" className={className} style={style}>
          <path d="M4 4a2 2 0 0 1 2-2h8l6 6v12a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V4z" fill={effectiveColor} />
          <path d="M14 2v6h6" fill="#FFFFFF" opacity="0.25" />
          <path d="m9 14.5 2.5 2.5 5-5" stroke="#FFFFFF" strokeWidth={2.4} strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      );
    }
    return <L.FileCheck2 {...outlineProps} className={className} style={style} />;
  }

  // 8. Attendance / UserCheck
  if (normalized.includes("attendance") || normalized.includes("usercheck")) {
    if (active) {
      return (
        <svg width={size} height={size} viewBox="0 0 24 24" fill="none" aria-hidden="true" className={className} style={style}>
          <circle cx="9" cy="7" r="4" fill={effectiveColor} />
          <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2z" fill={effectiveColor} />
          <circle cx="18.5" cy="11.5" r="4.5" fill={effectiveColor} />
          <polyline points="16.5 11.5 18 13 21 10" stroke="#FFFFFF" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      );
    }
    return <L.UserCheck {...outlineProps} className={className} style={style} />;
  }

  // 9. Leave / CalendarX
  if (normalized.includes("leave") || normalized.includes("calendardays") || normalized.includes("calendarx")) {
    if (active) {
      return (
        <svg width={size} height={size} viewBox="0 0 24 24" fill="none" aria-hidden="true" className={className} style={style}>
          <line x1="16" x2="16" y1="2" y2="6" stroke={effectiveColor || "#7114BD"} strokeWidth={2.4} strokeLinecap="round" />
          <line x1="8" x2="8" y1="2" y2="6" stroke={effectiveColor || "#7114BD"} strokeWidth={2.4} strokeLinecap="round" />
          <rect width="18" height="18" x="3" y="4" rx="2" fill={effectiveColor || "#7114BD"} />
          <line x1="3" x2="21" y1="10" y2="10" stroke="#FFFFFF" strokeWidth={1.8} />
          <line x1="10" x2="14" y1="14" y2="18" stroke="#FFFFFF" strokeWidth={2.2} strokeLinecap="round" />
          <line x1="14" x2="10" y1="14" y2="18" stroke="#FFFFFF" strokeWidth={2.2} strokeLinecap="round" />
        </svg>
      );
    }
    return <L.CalendarX {...outlineProps} className={className} style={style} />;
  }

  // 10. Shifts / Work & Time / Clock3
  if (normalized.includes("shift") || normalized.includes("worktime") || normalized.includes("clock")) {
    if (active) {
      return (
        <svg width={size} height={size} viewBox="0 0 24 24" fill="none" aria-hidden="true" className={className} style={style}>
          <circle cx="12" cy="12" r="9.5" fill={effectiveColor} />
          <path d="M12 7v5h4.5" stroke="#FFFFFF" strokeWidth={2.2} strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      );
    }
    return <L.Clock3 {...outlineProps} className={className} style={style} />;
  }

  // 11. Timesheets / ClipboardClock
  if (normalized.includes("timesheet") || normalized.includes("clipboardclock")) {
    if (active) {
      return (
        <svg width={size} height={size} viewBox="0 0 24 24" fill="none" aria-hidden="true" className={className} style={style}>
          <rect x="4" y="4" width="16" height="17" rx="2.5" fill={effectiveColor} />
          <path d="M9 2h6a1 1 0 0 1 1 1v2H8V3a1 1 0 0 1 1-1z" fill={effectiveColor} />
          <circle cx="14" cy="14" r="4.5" fill="#FFFFFF" />
          <path d="M14 11.5V14l1.5 1.5" stroke={effectiveColor} strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      );
    }
    return <L.ClipboardClock {...outlineProps} className={className} style={style} />;
  }

  // 12. Time Tracker / Timer
  if (normalized.includes("timetrack") || normalized.includes("timer")) {
    if (active) {
      return (
        <svg width={size} height={size} viewBox="0 0 24 24" fill="none" aria-hidden="true" className={className} style={style}>
          <line x1="10" x2="14" y1="2" y2="2" stroke={effectiveColor || "#7114BD"} strokeWidth={2.4} strokeLinecap="round" />
          <line x1="12" x2="12" y1="2" y2="6" stroke={effectiveColor || "#7114BD"} strokeWidth={2.4} strokeLinecap="round" />
          <circle cx="12" cy="14" r="8" fill={effectiveColor || "#7114BD"} />
          <line x1="12" x2="12" y1="14" y2="9.5" stroke="#FFFFFF" strokeWidth={2.2} strokeLinecap="round" />
          <line x1="12" x2="15.2" y1="14" y2="11.8" stroke="#FFFFFF" strokeWidth={2.2} strokeLinecap="round" />
          <circle cx="12" cy="14" r="1.5" fill="#FFFFFF" />
        </svg>
      );
    }
    return <L.Timer {...outlineProps} className={className} style={style} />;
  }

  // 13. Performance / Activity
  if (normalized.includes("perform") || normalized.includes("activity")) {
    return <L.Activity {...outlineProps} strokeWidth={active ? 2.3 : 1.75} className={className} style={style} />;
  }

  // 14. Goals & OKRs / Target
  if (normalized.includes("goal") || normalized.includes("okr") || normalized.includes("target")) {
    if (active) {
      return (
        <svg width={size} height={size} viewBox="0 0 24 24" fill="none" aria-hidden="true" className={className} style={style}>
          <circle cx="12" cy="12" r="9.5" stroke={effectiveColor} strokeWidth={2.2} />
          <circle cx="12" cy="12" r="5.8" fill={effectiveColor} />
          <circle cx="12" cy="12" r="2.2" fill="#FFFFFF" />
        </svg>
      );
    }
    return <L.Target {...outlineProps} className={className} style={style} />;
  }

  // 15. Learning / GraduationCap
  if (normalized.includes("learn") || normalized.includes("graduationcap")) {
    if (active) {
      return (
        <svg width={size} height={size} viewBox="0 0 24 24" fill="none" aria-hidden="true" className={className} style={style}>
          <path d="M22 10v6 M2 10l10-5 10 5-10 5z" fill={effectiveColor} />
          <path d="M6 12v5c0 2 3 3 6 3s6-1 6-3v-5" fill={effectiveColor} />
        </svg>
      );
    }
    return <L.GraduationCap {...outlineProps} className={className} style={style} />;
  }

  // 16. Career Paths / Route
  if (normalized.includes("career") || normalized.includes("route")) {
    if (active) {
      return (
        <svg width={size} height={size} viewBox="0 0 24 24" fill="none" aria-hidden="true" className={className} style={style}>
          <circle cx="6" cy="19" r="3.5" fill={effectiveColor} />
          <path d="M9 19h8.5a3.5 3.5 0 0 0 0-7h-11a3.5 3.5 0 0 1 0-7H15" stroke={effectiveColor} strokeWidth={2.4} strokeLinecap="round" />
          <circle cx="18" cy="5" r="3.5" fill={effectiveColor} />
        </svg>
      );
    }
    return <L.Route {...outlineProps} className={className} style={style} />;
  }

  // 17. Payroll / Pay & Benefits / CreditCard
  if (normalized.includes("pay") || normalized.includes("wallet") || normalized.includes("creditcard")) {
    if (active) {
      return (
        <svg width={size} height={size} viewBox="0 0 24 24" fill="none" aria-hidden="true" className={className} style={style}>
          <rect width="20" height="14" x="2" y="5" rx="2.5" fill={effectiveColor} />
          <line x1="2" x2="22" y1="10" y2="10" stroke="#FFFFFF" strokeWidth={2} />
          <rect x="5" y="13.5" width="4" height="2.5" rx="0.5" fill="#FFFFFF" />
        </svg>
      );
    }
    return <L.CreditCard {...outlineProps} className={className} style={style} />;
  }

  // 18. Compensation / HandCoins
  if (normalized.includes("comp") || normalized.includes("handcoin")) {
    if (active) {
      return (
        <svg width={size} height={size} viewBox="0 0 24 24" fill="none" aria-hidden="true" className={className} style={style}>
          <circle cx="11" cy="6" r="3.5" fill={effectiveColor} />
          <circle cx="18" cy="8" r="2.8" fill={effectiveColor} />
          <path d="M11 15h2a2 2 0 1 0 0-4h-3c-.6 0-1.1.2-1.4.6L3 17" stroke={effectiveColor} strokeWidth={2.2} strokeLinecap="round" />
          <path d="m7 21 1.6-1.4c.3-.4.8-.6 1.4-.6h4c1.1 0 2.1-.4 2.8-1.2l4.6-4.4a2 2 0 0 0-2.75-2.91l-4.2 3.9" stroke={effectiveColor} strokeWidth={2.2} strokeLinecap="round" />
        </svg>
      );
    }
    return <L.HandCoins {...outlineProps} className={className} style={style} />;
  }

  // 19. Benefits / HeartHandshake
  if (normalized.includes("benefit") || normalized.includes("hearthandshake")) {
    if (active) {
      return (
        <svg width={size} height={size} viewBox="0 0 24 24" fill="none" aria-hidden="true" className={className} style={style}>
          <path d="M19 14c1.5-1.5 2.5-3 2.5-4.5a4.5 4.5 0 0 0-8-2.5 4.5 4.5 0 0 0-8 2.5c0 1.5 1 3 2.5 4.5l4 4a2 2 0 0 0 3 0l4-4z" fill={effectiveColor} />
          <path d="m11 13 2 2 3-3" stroke="#FFFFFF" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      );
    }
    return <L.HeartHandshake {...outlineProps} className={className} style={style} />;
  }

  // 20. Documents / Workplace / Folders / Folder
  if (normalized.includes("document") || normalized.includes("folders") || normalized === "folder" || normalized === "workplace") {
    if (active) {
      return (
        <svg width={size} height={size} viewBox="0 0 24 24" fill="none" aria-hidden="true" className={className} style={style}>
          <path d="M3 6a2 2 0 0 1 2-2h4.6a2 2 0 0 1 1.4.6L12.4 6H19a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V6z" fill={effectiveColor} />
        </svg>
      );
    }
    return <L.Folders {...outlineProps} className={className} style={style} />;
  }

  // 21. Assets / Package
  if (normalized.includes("asset") || normalized.includes("package")) {
    if (active) {
      return (
        <svg width={size} height={size} viewBox="0 0 24 24" fill="none" aria-hidden="true" className={className} style={style}>
          <path d="M16.5 9.4 7.55 4.24a1.8 1.8 0 0 0-1.8 0L2.8 5.95a1.8 1.8 0 0 0-.9 1.56v8.98a1.8 1.8 0 0 0 .9 1.56l2.95 1.71a1.8 1.8 0 0 0 1.8 0l8.95-5.16a1.8 1.8 0 0 0 .9-1.56V9.4z" fill={effectiveColor} />
          <path d="m21.2 7.5-8.7 5-8.7-5 M12.5 12.5v9.5" stroke="#FFFFFF" strokeWidth={1.8} strokeLinecap="round" />
        </svg>
      );
    }
    return <L.Package {...outlineProps} className={className} style={style} />;
  }

  // 22. Employee Requests / MessageSquareMore
  if (normalized.includes("request") || normalized.includes("messagesquaremore")) {
    if (active) {
      return (
        <svg width={size} height={size} viewBox="0 0 24 24" fill="none" aria-hidden="true" className={className} style={style}>
          <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" fill={effectiveColor} />
          <circle cx="8" cy="10" r="1.2" fill="#FFFFFF" />
          <circle cx="12" cy="10" r="1.2" fill="#FFFFFF" />
          <circle cx="16" cy="10" r="1.2" fill="#FFFFFF" />
        </svg>
      );
    }
    return <L.MessageSquareMore {...outlineProps} className={className} style={style} />;
  }

  // 23. Standard Ops / SOP / ListChecks
  if (normalized.includes("sop") || normalized.includes("listcheck")) {
    return <L.ListChecks {...outlineProps} strokeWidth={active ? 2.3 : 1.75} className={className} style={style} />;
  }

  // 24. HR Settings / HR Operations / Wrench
  if (normalized.includes("setting") || normalized.includes("hroperation") || normalized.includes("wrench")) {
    if (active) {
      return (
        <svg width={size} height={size} viewBox="0 0 24 24" fill="none" aria-hidden="true" className={className} style={style}>
          <path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z" fill={effectiveColor} />
        </svg>
      );
    }
    return <L.Wrench {...outlineProps} className={className} style={style} />;
  }

  // 25. Growth / TrendingUp
  if (normalized.includes("growth") || normalized.includes("trending")) {
    return <L.TrendingUp {...outlineProps} strokeWidth={active ? 2.3 : 1.75} className={className} style={style} />;
  }

  // 26. Reports / Analytics / PieChart
  if (normalized.includes("report") || normalized.includes("analytic") || normalized.includes("piechart")) {
    if (active) {
      return (
        <svg width={size} height={size} viewBox="0 0 24 24" fill="none" aria-hidden="true" className={className} style={style}>
          <path d="M21.21 15.89A10 10 0 1 1 8 2.83 L12 12 Z" fill={effectiveColor} />
          <path d="M22 12A10 10 0 0 0 12 2v10z" fill="#FFFFFF" stroke={effectiveColor} strokeWidth={1} strokeLinejoin="round" />
        </svg>
      );
    }
    return <L.PieChart {...outlineProps} className={className} style={style} />;
  }

  // 27. All Tools / LayoutGrid / Apps
  if (normalized === "all" || normalized.includes("alltool") || normalized.includes("layoutgrid") || normalized === "apps") {
    if (active) {
      return (
        <svg width={size} height={size} viewBox="0 0 24 24" fill="none" aria-hidden="true" className={className} style={style}>
          <rect x="3" y="3" width="7" height="7" rx="1.5" fill={effectiveColor} />
          <rect x="14" y="3" width="7" height="7" rx="1.5" fill={effectiveColor} />
          <rect x="3" y="14" width="7" height="7" rx="1.5" fill={effectiveColor} />
          <rect x="14" y="14" width="7" height="7" rx="1.5" fill={effectiveColor} />
        </svg>
      );
    }
    return <L.LayoutGrid {...outlineProps} className={className} style={style} />;
  }

  // Fallback: Default to Briefcase or HelpCircle in standard enterprise outline
  return <L.BriefcaseBusiness {...outlineProps} className={className} style={style} />;
}
