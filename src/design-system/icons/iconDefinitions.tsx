import React from "react";
import type { BezentIconRenderProps, IconDefinition } from "./iconTypes";

const S = (color: string, strokeWidth = 1.75) => ({
  stroke: color,
  strokeWidth,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
  fill: "none",
});

export const ICON_DEFINITIONS: Record<string, IconDefinition> = {
  // ─── DASHBOARD ─────────────────────────────────────────────────────────────
  dashboard: {
    name: "dashboard", label: "Dashboard", category: "global",
    outline: ({ size, color, strokeWidth = 1.8 }) => (
      <svg width={size} height={size} viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <rect x="3" y="3" width="7.5" height="7.5" rx="2" stroke={color} strokeWidth={strokeWidth} />
        <rect x="13.5" y="3" width="7.5" height="7.5" rx="2" stroke={color} strokeWidth={strokeWidth} />
        <rect x="3" y="13.5" width="7.5" height="7.5" rx="2" stroke={color} strokeWidth={strokeWidth} />
        <rect x="13.5" y="13.5" width="7.5" height="7.5" rx="2" stroke={color} strokeWidth={strokeWidth} />
      </svg>
    ),
    solid: ({ size, color }) => (
      <svg width={size} height={size} viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <rect x="3" y="3" width="7.5" height="7.5" rx="2" fill={color} />
        <rect x="13.5" y="3" width="7.5" height="7.5" rx="2" fill={color} />
        <rect x="3" y="13.5" width="7.5" height="7.5" rx="2" fill={color} />
        <rect x="13.5" y="13.5" width="7.5" height="7.5" rx="2" fill={color} />
      </svg>
    ),
  },
  // ─── EMPLOYEES ─────────────────────────────────────────────────────────────
  employees: {
    name: "employees", label: "Employees", category: "hrms",
    outline: ({ size = 20, color = "#2D064D", strokeWidth = 2 }) => (
      <svg width={size} height={size} viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" stroke={color} strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round" />
        <circle cx="9" cy="7" r="4" stroke={color} strokeWidth={strokeWidth} />
        <path d="M22 21v-2a4 4 0 0 0-3-3.87" stroke={color} strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round" />
        <path d="M16 3.13a4 4 0 0 1 0 7.75" stroke={color} strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
    solid: ({ size = 20, color = "#7114BD" }) => (
      <svg width={size} height={size} viewBox="0 0 24 24" fill="none" aria-hidden="true">
        {/* Secondary Person (Background) */}
        <circle cx="16" cy="7" r="3.5" fill={color || "#7114BD"} />
        <path d="M22 21v-2a4 4 0 0 0-3-3.87h-3v5.87z" fill={color || "#7114BD"} />
        {/* Primary Person (Foreground) with WHITE separation/details */}
        <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2z" fill={color || "#7114BD"} stroke="#FFFFFF" strokeWidth={1.8} />
        <circle cx="9" cy="7" r="4" fill={color || "#7114BD"} stroke="#FFFFFF" strokeWidth={1.8} />
      </svg>
    ),
  },
  // ─── WORKFORCE HUB ─────────────────────────────────────────────────────────
  workforce: {
    name: "workforce", label: "Workforce Hub", category: "hrms",
    outline: ({ size, color, strokeWidth = 1.8 }) => (
      <svg width={size} height={size} viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <path d="M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z" stroke={color} strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round" />
        <circle cx="12" cy="11" r="3.5" stroke={color} strokeWidth={strokeWidth} />
        <path d="M8 18c.8-1.5 2.2-2.5 4-2.5s3.2 1 4 2.5" stroke={color} strokeWidth={strokeWidth} strokeLinecap="round" />
      </svg>
    ),
    solid: ({ size, color, cutoutColor = "#FFFFFF" }) => (
      <svg width={size} height={size} viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <path d="M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z" fill={color} />
        <circle cx="12" cy="10.5" r="3.2" fill={cutoutColor} />
        <path d="M8 17.5c.8-1.8 2.2-2.5 4-2.5s3.2.7 4 2.5" stroke={cutoutColor} strokeWidth={2} strokeLinecap="round" />
      </svg>
    ),
  },
  // ─── ONBOARDING ────────────────────────────────────────────────────────────
  onboarding: {
    name: "onboarding", label: "Onboarding", category: "hrms",
    outline: ({ size, color, strokeWidth = 1.8 }) => (
      <svg width={size} height={size} viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <circle cx="9" cy="7.5" r="4" stroke={color} strokeWidth={strokeWidth} />
        <path d="M2.5 20.5a6.5 6.5 0 0 1 13 0" stroke={color} strokeWidth={strokeWidth} strokeLinecap="round" />
        <path d="M19 8v6 M16 11h6" stroke={color} strokeWidth={strokeWidth} strokeLinecap="round" />
      </svg>
    ),
    solid: ({ size, color }) => (
      <svg width={size} height={size} viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <circle cx="9" cy="7.5" r="4" fill={color} />
        <path d="M2.5 20.5a6.5 6.5 0 0 1 13 0" fill={color} />
        <path d="M19 8v6 M16 11h6" stroke={color} strokeWidth={2.6} strokeLinecap="round" />
      </svg>
    ),
  },
  // ─── LEAVE TRACKER ─────────────────────────────────────────────────────────
  leave: {
    name: "leave", label: "Leave Tracker", category: "hrms",
    outline: ({ size = 20, color = "#2D064D", strokeWidth = 2 }) => (
      <svg width={size} height={size} viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <rect width="18" height="18" x="3" y="4" rx="2" stroke={color} strokeWidth={strokeWidth} />
        <line x1="16" x2="16" y1="2" y2="6" stroke={color} strokeWidth={strokeWidth} strokeLinecap="round" />
        <line x1="8" x2="8" y1="2" y2="6" stroke={color} strokeWidth={strokeWidth} strokeLinecap="round" />
        <line x1="3" x2="21" y1="10" y2="10" stroke={color} strokeWidth={strokeWidth} />
        <line x1="10" x2="14" y1="14" y2="18" stroke={color} strokeWidth={strokeWidth} strokeLinecap="round" />
        <line x1="14" x2="10" y1="14" y2="18" stroke={color} strokeWidth={strokeWidth} strokeLinecap="round" />
      </svg>
    ),
    solid: ({ size = 20, color = "#7114BD" }) => (
      <svg width={size} height={size} viewBox="0 0 24 24" fill="none" aria-hidden="true">
        {/* Top rings: #7114BD */}
        <line x1="16" x2="16" y1="2" y2="6" stroke={color || "#7114BD"} strokeWidth={2.4} strokeLinecap="round" />
        <line x1="8" x2="8" y1="2" y2="6" stroke={color || "#7114BD"} strokeWidth={2.4} strokeLinecap="round" />
        {/* Purple calendar body */}
        <rect width="18" height="18" x="3" y="4" rx="2" fill={color || "#7114BD"} />
        {/* WHITE header seam */}
        <line x1="3" x2="21" y1="10" y2="10" stroke="#FFFFFF" strokeWidth={1.8} />
        {/* WHITE X */}
        <line x1="10" x2="14" y1="14" y2="18" stroke="#FFFFFF" strokeWidth={2.2} strokeLinecap="round" />
        <line x1="14" x2="10" y1="14" y2="18" stroke="#FFFFFF" strokeWidth={2.2} strokeLinecap="round" />
      </svg>
    ),
  },
  // ─── ATTENDANCE ────────────────────────────────────────────────────────────
  attendance: {
    name: "attendance", label: "Attendance", category: "hrms",
    outline: ({ size = 20, color = "#2D064D", strokeWidth = 2 }) => (
      <svg width={size} height={size} viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" stroke={color} strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round" />
        <circle cx="9" cy="7" r="4" stroke={color} strokeWidth={strokeWidth} />
        <polyline points="16 11 18 13 22 9" stroke={color} strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
    solid: ({ size = 20, color = "#7114BD" }) => (
      <svg width={size} height={size} viewBox="0 0 24 24" fill="none" aria-hidden="true">
        {/* Purple person head */}
        <circle cx="9" cy="7" r="4" fill={color || "#7114BD"} />
        {/* Purple person body */}
        <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2z" fill={color || "#7114BD"} />
        {/* Purple badge + WHITE check mark */}
        <circle cx="18.5" cy="11.5" r="4.5" fill={color || "#7114BD"} />
        <polyline points="16.5 11.5 18 13 21 10" stroke="#FFFFFF" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
  },
  // ─── TIME TRACKER ──────────────────────────────────────────────────────────
  timeTracker: {
    name: "timeTracker", label: "Time Tracker", category: "hrms",
    outline: ({ size = 20, color = "#2D064D", strokeWidth = 2 }) => (
      <svg width={size} height={size} viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <line x1="10" x2="14" y1="2" y2="2" stroke={color} strokeWidth={strokeWidth} strokeLinecap="round" />
        <line x1="12" x2="12" y1="2" y2="6" stroke={color} strokeWidth={strokeWidth} strokeLinecap="round" />
        <circle cx="12" cy="14" r="8" stroke={color} strokeWidth={strokeWidth} />
        <line x1="12" x2="12" y1="14" y2="9.5" stroke={color} strokeWidth={strokeWidth} strokeLinecap="round" />
        <line x1="12" x2="15.2" y1="14" y2="11.8" stroke={color} strokeWidth={strokeWidth} strokeLinecap="round" />
        <circle cx="12" cy="14" r="1.2" fill={color} />
      </svg>
    ),
    solid: ({ size = 20, color = "#7114BD" }) => (
      <svg width={size} height={size} viewBox="0 0 24 24" fill="none" aria-hidden="true">
        {/* Top stopwatch crown: #7114BD */}
        <line x1="10" x2="14" y1="2" y2="2" stroke={color || "#7114BD"} strokeWidth={2.4} strokeLinecap="round" />
        <line x1="12" x2="12" y1="2" y2="6" stroke={color || "#7114BD"} strokeWidth={2.4} strokeLinecap="round" />
        {/* Stopwatch body: solid #7114BD */}
        <circle cx="12" cy="14" r="8" fill={color || "#7114BD"} />
        {/* Clock hands inside: PURE WHITE #FFFFFF */}
        <line x1="12" x2="12" y1="14" y2="9.5" stroke="#FFFFFF" strokeWidth={2.2} strokeLinecap="round" />
        <line x1="12" x2="15.2" y1="14" y2="11.8" stroke="#FFFFFF" strokeWidth={2.2} strokeLinecap="round" />
        {/* Center clock pin: #FFFFFF */}
        <circle cx="12" cy="14" r="1.5" fill="#FFFFFF" />
      </svg>
    ),
  },
  // ─── SHIFTS ────────────────────────────────────────────────────────────────
  shifts: {
    name: "shifts", label: "Shift Management", category: "hrms",
    outline: ({ size, color, strokeWidth = 1.8 }) => (
      <svg width={size} height={size} viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <circle cx="12" cy="12" r="9.5" stroke={color} strokeWidth={strokeWidth} />
        <path d="M12 7.5V12h4" stroke={color} strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
    solid: ({ size, color, cutoutColor = "#FFFFFF" }) => (
      <svg width={size} height={size} viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <circle cx="12" cy="12" r="9.5" fill={color} />
        <path d="M12 7.5V12h4" stroke={cutoutColor} strokeWidth={2.4} strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
  },
  // ─── TIMESHEETS ────────────────────────────────────────────────────────────
  timesheets: {
    name: "timesheets", label: "Timesheets", category: "hrms",
    outline: ({ size, color, strokeWidth = 1.8 }) => (
      <svg width={size} height={size} viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <rect x="4" y="4" width="16" height="17" rx="2.5" stroke={color} strokeWidth={strokeWidth} />
        <path d="M9 2h6a1 1 0 0 1 1 1v2H8V3a1 1 0 0 1 1-1z" stroke={color} strokeWidth={strokeWidth} strokeLinecap="round" />
        <circle cx="14" cy="14" r="4.5" stroke={color} strokeWidth={strokeWidth} />
        <path d="M14 12V14l1.5 1" stroke={color} strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
    solid: ({ size, color, cutoutColor = "#FFFFFF" }) => (
      <svg width={size} height={size} viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <rect x="4" y="4" width="16" height="17" rx="2.5" fill={color} />
        <path d="M9 2h6a1 1 0 0 1 1 1v2H8V3a1 1 0 0 1 1-1z" fill={color} />
        <circle cx="14" cy="14" r="4.5" fill={cutoutColor} />
        <path d="M14 11.8V14l1.5 1" stroke={color} strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
  },
  // ─── PERFORMANCE ───────────────────────────────────────────────────────────
  performance: {
    name: "performance", label: "Performance", category: "hrms",
    outline: ({ size, color, strokeWidth = 1.8 }) => (
      <svg width={size} height={size} viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <path d="M2 12h4l3-7 4 14 3-7h6" stroke={color} strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
    solid: ({ size, color }) => (
      <svg width={size} height={size} viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <path d="M2 12h4l3-7 4 14 3-7h6" stroke={color} strokeWidth={3.3} strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
  },
  // ?????? GOALS & OKRs ?????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????
  goals: {
    name: "goals", label: "Goals & OKRs", category: "hrms",
    outline: ({ size, color, strokeWidth = 1.75, secondaryColor = "var(--icon-fill, rgba(189,182,208,0.22))" }) => (
      <svg width={size} height={size} viewBox="0 0 24 24" aria-hidden="true">
        <circle cx="12" cy="12" r="10" {...S(color, strokeWidth)} />
        <circle cx="12" cy="12" r="6" {...S(color, strokeWidth)} />
        <circle cx="12" cy="12" r="2" fill={secondaryColor} stroke={color} strokeWidth={strokeWidth} />
      </svg>
    ),
    solid: ({ size, color, structuralColor = "#581093" }) => (
      <svg width={size} height={size} viewBox="0 0 24 24" fill="none" aria-hidden="true">
        {/* Outer ring — brand */}
        <circle cx="12" cy="12" r="10" fill={color} stroke={structuralColor} strokeWidth={1} />
        {/* Middle ring — structural */}
        <circle cx="12" cy="12" r="7" fill={structuralColor} />
        {/* Inner ring — brand */}
        <circle cx="12" cy="12" r="4.5" fill={color} />
        {/* Bullseye center — structural */}
        <circle cx="12" cy="12" r="1.8" fill={structuralColor} />
      </svg>
    ),
  },
  // ?????? APPRAISALS ???????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????
  reviews: {
    name: "reviews", label: "Appraisals", category: "hrms",
    outline: ({ size, color, strokeWidth = 1.75, secondaryColor = "var(--icon-fill, rgba(189,182,208,0.22))" }) => (
      <svg width={size} height={size} viewBox="0 0 24 24" aria-hidden="true">
        <path d="M11.525 2.295a.53.53 0 0 1 .95 0l2.31 4.679a2.123 2.123 0 0 0 1.595 1.16l5.166.756a.53.53 0 0 1 .294.904l-3.736 3.638a2.123 2.123 0 0 0-.611 1.878l.882 5.14a.53.53 0 0 1-.771.56l-4.618-2.428a2.122 2.122 0 0 0-1.973 0L6.396 21.01a.53.53 0 0 1-.77-.56l.881-5.139a2.122 2.122 0 0 0-.611-1.879L2.16 9.795a.53.53 0 0 1 .294-.906l5.165-.755a2.122 2.122 0 0 0 1.597-1.16z" fill={secondaryColor} stroke={color} strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
    solid: ({ size, color, structuralColor = "#581093" }) => (
      <svg width={size} height={size} viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <path d="M11.525 2.295a.53.53 0 0 1 .95 0l2.31 4.679a2.123 2.123 0 0 0 1.595 1.16l5.166.756a.53.53 0 0 1 .294.904l-3.736 3.638a2.123 2.123 0 0 0-.611 1.878l.882 5.14a.53.53 0 0 1-.771.56l-4.618-2.428a2.122 2.122 0 0 0-1.973 0L6.396 21.01a.53.53 0 0 1-.77-.56l.881-5.139a2.122 2.122 0 0 0-.611-1.879L2.16 9.795a.53.53 0 0 1 .294-.906l5.165-.755a2.122 2.122 0 0 0 1.597-1.16z" fill={color} stroke={structuralColor} strokeWidth={1.2} strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
  },
  // ?????? LEARNING ?????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????
  learning: {
    name: "learning", label: "Learning", category: "hrms",
    outline: ({ size, color, strokeWidth = 1.75, secondaryColor = "var(--icon-fill, rgba(189,182,208,0.22))" }) => (
      <svg width={size} height={size} viewBox="0 0 24 24" aria-hidden="true">
        <path d="m10.852 14.772-.383.923" {...S(color, strokeWidth)} />
        <path d="m10.852 9.228-.383-.923" {...S(color, strokeWidth)} />
        <path d="m13.148 14.772.382.924" {...S(color, strokeWidth)} />
        <path d="m13.531 8.305-.383.923" {...S(color, strokeWidth)} />
        <path d="m14.772 10.852.923-.383" {...S(color, strokeWidth)} />
        <path d="m14.772 13.148.923.383" {...S(color, strokeWidth)} />
        <path d="M17.598 6.5A3 3 0 1 0 12 5a3 3 0 0 0-5.63-1.446 3 3 0 0 0-.368 1.571 4 4 0 0 0-2.525 5.771" {...S(color, strokeWidth)} />
        <path d="M17.998 5.125a4 4 0 0 1 2.525 5.771" {...S(color, strokeWidth)} />
        <path d="M19.505 10.294a4 4 0 0 1-1.5 7.706" {...S(color, strokeWidth)} />
        <path d="M4.032 17.483A4 4 0 0 0 11.464 20c.18-.311.892-.311 1.072 0a4 4 0 0 0 7.432-2.516" {...S(color, strokeWidth)} />
        <path d="M4.5 10.291A4 4 0 0 0 6 18" {...S(color, strokeWidth)} />
        <path d="M6.002 5.125a3 3 0 0 0 .4 1.375" {...S(color, strokeWidth)} />
        <path d="m9.228 10.852-.923-.383" {...S(color, strokeWidth)} />
        <path d="m9.228 13.148-.923.383" {...S(color, strokeWidth)} />
        <circle cx="12" cy="12" r="3" fill={secondaryColor} stroke={color} strokeWidth={strokeWidth} />
      </svg>
    ),
    solid: ({ size, color, structuralColor = "#581093" }) => (
      <svg width={size} height={size} viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <path d="m10.852 14.772-.383.923" stroke={structuralColor} strokeWidth={2} strokeLinecap="round" />
        <path d="m10.852 9.228-.383-.923" stroke={structuralColor} strokeWidth={2} strokeLinecap="round" />
        <path d="m13.148 14.772.382.924" stroke={structuralColor} strokeWidth={2} strokeLinecap="round" />
        <path d="m13.531 8.305-.383.923" stroke={structuralColor} strokeWidth={2} strokeLinecap="round" />
        <path d="m14.772 10.852.923-.383" stroke={structuralColor} strokeWidth={2} strokeLinecap="round" />
        <path d="m14.772 13.148.923.383" stroke={structuralColor} strokeWidth={2} strokeLinecap="round" />
        <path d="m9.228 10.852-.923-.383" stroke={structuralColor} strokeWidth={2} strokeLinecap="round" />
        <path d="m9.228 13.148-.923.383" stroke={structuralColor} strokeWidth={2} strokeLinecap="round" />
        <path d="M17.598 6.5A3 3 0 1 0 12 5a3 3 0 0 0-5.63-1.446 3 3 0 0 0-.368 1.571 4 4 0 0 0-2.525 5.771" stroke={color} strokeWidth={1.75} strokeLinecap="round" fill="none" />
        <path d="M17.998 5.125a4 4 0 0 1 2.525 5.771" stroke={color} strokeWidth={1.75} strokeLinecap="round" fill="none" />
        <path d="M19.505 10.294a4 4 0 0 1-1.5 7.706" stroke={color} strokeWidth={1.75} strokeLinecap="round" fill="none" />
        <path d="M4.032 17.483A4 4 0 0 0 11.464 20c.18-.311.892-.311 1.072 0a4 4 0 0 0 7.432-2.516" stroke={color} strokeWidth={1.75} strokeLinecap="round" fill="none" />
        <path d="M4.5 10.291A4 4 0 0 0 6 18" stroke={color} strokeWidth={1.75} strokeLinecap="round" fill="none" />
        <path d="M6.002 5.125a3 3 0 0 0 .4 1.375" stroke={color} strokeWidth={1.75} strokeLinecap="round" fill="none" />
        <circle cx="12" cy="12" r="3.5" fill={color} stroke={structuralColor} strokeWidth={1} />
        <circle cx="12" cy="12" r="1.4" fill={structuralColor} />
      </svg>
    ),
  },
  // ?????? CAREER PATHS ?????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????
  career: {
    name: "career", label: "Career Paths", category: "hrms",
    outline: ({ size, color, strokeWidth = 1.75, secondaryColor = "var(--icon-fill, rgba(189,182,208,0.22))" }) => (
      <svg width={size} height={size} viewBox="0 0 24 24" aria-hidden="true">
        <path d="M12 13v8" {...S(color, strokeWidth)} />
        <path d="M12 3v3" {...S(color, strokeWidth)} />
        <path d="M18.172 6a2 2 0 0 1 1.414.586l2.06 2.06a1.207 1.207 0 0 1 0 1.708l-2.06 2.06a2 2 0 0 1-1.414.586H4a1 1 0 0 1-1-1V7a1 1 0 0 1 1-1z" fill={secondaryColor} stroke={color} strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
    solid: ({ size, color, structuralColor = "#581093" }) => (
      <svg width={size} height={size} viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <path d="M12 13v8" stroke={structuralColor} strokeWidth={2.2} strokeLinecap="round" />
        <path d="M12 3v3" stroke={structuralColor} strokeWidth={2.2} strokeLinecap="round" />
        <path d="M18.172 6a2 2 0 0 1 1.414.586l2.06 2.06a1.207 1.207 0 0 1 0 1.708l-2.06 2.06a2 2 0 0 1-1.414.586H4a1 1 0 0 1-1-1V7a1 1 0 0 1 1-1z" fill={color} stroke={structuralColor} strokeWidth={1.2} strokeLinecap="round" strokeLinejoin="round" />
        <circle cx="12" cy="3" r="1.8" fill={structuralColor} />
        <circle cx="12" cy="21" r="1.8" fill={structuralColor} />
      </svg>
    ),
  },
  // ─── PAYROLL ───────────────────────────────────────────────────────────────
  payroll: {
    name: "payroll", label: "Payroll", category: "hrms",
    outline: ({ size = 20, color = "#2D064D", strokeWidth = 2 }) => (
      <svg width={size} height={size} viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <rect width="20" height="14" x="2" y="5" rx="2" stroke={color} strokeWidth={strokeWidth} />
        <line x1="2" x2="22" y1="10" y2="10" stroke={color} strokeWidth={strokeWidth} />
        <line x1="6" x2="10" y1="15" y2="15" stroke={color} strokeWidth={strokeWidth} strokeLinecap="round" />
      </svg>
    ),
    solid: ({ size = 20, color = "#7114BD" }) => (
      <svg width={size} height={size} viewBox="0 0 24 24" fill="none" aria-hidden="true">
        {/* Purple card body */}
        <rect width="20" height="14" x="2" y="5" rx="2" fill={color || "#7114BD"} />
        {/* WHITE card stripe */}
        <line x1="2" x2="22" y1="10" y2="10" stroke="#FFFFFF" strokeWidth={2.2} />
        <rect x="5" y="14" width="4" height="2" rx="0.5" fill="#FFFFFF" />
      </svg>
    ),
  },
  // ?????? COMPENSATION ?????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????
  compensation: {
    name: "compensation", label: "Compensation", category: "hrms",
    outline: ({ size, color, strokeWidth = 1.75, secondaryColor = "var(--icon-fill, rgba(189,182,208,0.22))" }) => (
      <svg width={size} height={size} viewBox="0 0 24 24" aria-hidden="true">
        <path d="M11 15h2a2 2 0 1 0 0-4h-3c-.6 0-1.1.2-1.4.6L3 17" {...S(color, strokeWidth)} />
        <path d="m7 21 1.6-1.4c.3-.4.8-.6 1.4-.6h4c1.1 0 2.1-.4 2.8-1.2l4.6-4.4a2 2 0 0 0-2.75-2.91l-4.2 3.9" {...S(color, strokeWidth)} />
        <path d="m2 16 6 6" {...S(color, strokeWidth)} />
        <circle cx="16" cy="9" r="2.9" fill={secondaryColor} stroke={color} strokeWidth={strokeWidth} />
        <circle cx="6" cy="5" r="3" {...S(color, strokeWidth)} />
      </svg>
    ),
    solid: ({ size, color, structuralColor = "#581093" }) => (
      <svg width={size} height={size} viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <path d="M11 15h2a2 2 0 1 0 0-4h-3c-.6 0-1.1.2-1.4.6L3 17" stroke={color} strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" />
        <path d="m7 21 1.6-1.4c.3-.4.8-.6 1.4-.6h4c1.1 0 2.1-.4 2.8-1.2l4.6-4.4a2 2 0 0 0-2.75-2.91l-4.2 3.9" stroke={color} strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" />
        <path d="m2 16 6 6" stroke={color} strokeWidth={2} strokeLinecap="round" />
        <circle cx="16" cy="9" r="2.9" fill={color} stroke={structuralColor} strokeWidth={1} />
        <circle cx="6" cy="5" r="3" fill={structuralColor} stroke={color} strokeWidth={1} />
      </svg>
    ),
  },
  // ?????? BENEFITS ?????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????
  benefits: {
    name: "benefits", label: "Benefits", category: "hrms",
    outline: ({ size, color, strokeWidth = 1.75 }) => (
      <svg width={size} height={size} viewBox="0 0 24 24" aria-hidden="true">
        <path d="M19.414 14.414C21 12.828 22 11.5 22 9.5a5.5 5.5 0 0 0-9.591-3.676.6.6 0 0 1-.818.001A5.5 5.5 0 0 0 2 9.5c0 2.3 1.5 4 3 5.5l5.535 5.362a2 2 0 0 0 2.879.052 2.12 2.12 0 0 0-.004-3 2.124 2.124 0 1 0 3-3 2.124 2.124 0 0 0 3.004 0 2 2 0 0 0 0-2.828l-1.881-1.882a2.41 2.41 0 0 0-3.409 0l-1.71 1.71a2 2 0 0 1-2.828 0 2 2 0 0 1 0-2.828l2.823-2.762" {...S(color, strokeWidth)} />
      </svg>
    ),
    solid: ({ size, color, structuralColor = "#581093" }) => (
      <svg width={size} height={size} viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <path d="M19.414 14.414C21 12.828 22 11.5 22 9.5a5.5 5.5 0 0 0-9.591-3.676.6.6 0 0 1-.818.001A5.5 5.5 0 0 0 2 9.5c0 2.3 1.5 4 3 5.5l5.535 5.362a2 2 0 0 0 2.879.052 2.12 2.12 0 0 0-.004-3 2.124 2.124 0 1 0 3-3 2.124 2.124 0 0 0 3.004 0 2 2 0 0 0 0-2.828l-1.881-1.882a2.41 2.41 0 0 0-3.409 0l-1.71 1.71a2 2 0 0 1-2.828 0 2 2 0 0 1 0-2.828l2.823-2.762" stroke={color} strokeWidth={2.4} strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
  },
  // ?????? RECRUITMENT ????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????
  recruitment: {
    name: "recruitment", label: "Recruitment", category: "hrms",
    outline: ({ size, color, strokeWidth = 1.75, secondaryColor = "var(--icon-fill, rgba(189,182,208,0.22))" }) => (
      <svg width={size} height={size} viewBox="0 0 24 24" aria-hidden="true">
        <circle cx="10" cy="7" r="4" {...S(color, strokeWidth)} />
        <path d="M10.3 15H7a4 4 0 0 0-4 4v2" {...S(color, strokeWidth)} />
        <circle cx="17" cy="17" r="3" fill={secondaryColor} stroke={color} strokeWidth={strokeWidth} />
        <path d="m21 21-1.9-1.9" {...S(color, strokeWidth)} />
      </svg>
    ),
    solid: ({ size, color, structuralColor = "#581093" }) => (
      <svg width={size} height={size} viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <circle cx="10" cy="7" r="4" fill={color} />
        <path d="M3.5 21v-2a4 4 0 0 1 4-4h3.5" fill={color} stroke={structuralColor} strokeWidth={1} strokeLinecap="round" />
        <circle cx="17" cy="17" r="3" fill={structuralColor} stroke={color} strokeWidth={1} />
        <path d="m21 21-1.9-1.9" stroke={color} strokeWidth={2} strokeLinecap="round" />
      </svg>
    ),
  },
  // ─── CANDIDATES ────────────────────────────────────────────────────────────
  candidates: {
    name: "candidates", label: "Candidates", category: "hrms",
    outline: ({ size = 20, color = "#2D064D", strokeWidth = 2 }) => (
      <svg width={size} height={size} viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <rect width="18" height="18" x="3" y="3" rx="2" stroke={color} strokeWidth={strokeWidth} />
        <circle cx="12" cy="10" r="3.5" stroke={color} strokeWidth={strokeWidth} />
        <path d="M7 19a5 5 0 0 1 10 0" stroke={color} strokeWidth={strokeWidth} strokeLinecap="round" />
      </svg>
    ),
    solid: ({ size = 20, color = "#7114BD" }) => (
      <svg width={size} height={size} viewBox="0 0 24 24" fill="none" aria-hidden="true">
        {/* Purple ID/card body */}
        <rect width="18" height="18" x="3" y="3" rx="2" fill={color || "#7114BD"} />
        {/* WHITE person detail */}
        <circle cx="12" cy="10" r="3.5" fill="#FFFFFF" />
        <path d="M7 19a5 5 0 0 1 10 0z" fill="#FFFFFF" />
      </svg>
    ),
  },
  // ?????? INTERVIEWS ???????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????
  interviews: {
    name: "interviews", label: "Interviews", category: "hrms",
    outline: ({ size, color, strokeWidth = 1.75 }) => (
      <svg width={size} height={size} viewBox="0 0 24 24" aria-hidden="true">
        <path d="M2.992 16.342a2 2 0 0 1 .094 1.167l-1.065 3.29a1 1 0 0 0 1.236 1.168l3.413-.998a2 2 0 0 1 1.099.092 10 10 0 1 0-4.777-4.719" {...S(color, strokeWidth)} />
        <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3" {...S(color, strokeWidth)} />
        <path d="M12 17h.01" {...S(color, strokeWidth)} />
      </svg>
    ),
    solid: ({ size, color, structuralColor = "#581093" }) => (
      <svg width={size} height={size} viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <path d="M12 2a10 10 0 1 1-5.6 18.4l-3.4 1 1-3.3A10 10 0 0 1 12 2Z" fill={color} stroke={structuralColor} strokeWidth={1} />
        <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3" stroke={structuralColor} strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" />
        <circle cx="12" cy="17" r="1.2" fill={structuralColor} />
      </svg>
    ),
  },
  // ─── JOB OPENINGS ──────────────────────────────────────────────────────────
  jobOpenings: {
    name: "jobOpenings", label: "Job Openings", category: "hrms",
    outline: ({ size = 20, color = "#2D064D", strokeWidth = 2 }) => (
      <svg width={size} height={size} viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <path d="M16 6V4a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v2" stroke={color} strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round" />
        <rect width="20" height="14" x="2" y="6" rx="2" stroke={color} strokeWidth={strokeWidth} />
        <line x1="2" x2="22" y1="12" y2="12" stroke={color} strokeWidth={strokeWidth} />
      </svg>
    ),
    solid: ({ size = 20, color = "#7114BD" }) => (
      <svg width={size} height={size} viewBox="0 0 24 24" fill="none" aria-hidden="true">
        {/* Handle */}
        <path d="M16 6V4a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v2" stroke={color || "#7114BD"} strokeWidth={2.4} strokeLinecap="round" strokeLinejoin="round" />
        {/* Purple briefcase body */}
        <rect width="20" height="14" x="2" y="6" rx="2.5" fill={color || "#7114BD"} />
        {/* WHITE center/seam detail */}
        <line x1="2" x2="22" y1="12" y2="12" stroke="#FFFFFF" strokeWidth={1.8} />
        <rect x="10.5" y="10.5" width="3" height="3" rx="0.75" fill="#FFFFFF" />
      </svg>
    ),
  },
  // ─── PAYROLL ───────────────────────────────────────────────────────────────
  payroll: {
    name: "payroll", label: "Payroll", category: "hrms",
    outline: ({ size = 20, color = "#2D064D", strokeWidth = 2 }) => (
      <svg width={size} height={size} viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <rect width="20" height="14" x="2" y="5" rx="2" stroke={color} strokeWidth={strokeWidth} />
        <line x1="2" x2="22" y1="10" y2="10" stroke={color} strokeWidth={strokeWidth} />
      </svg>
    ),
    solid: ({ size = 20, color = "#7114BD" }) => (
      <svg width={size} height={size} viewBox="0 0 24 24" fill="none" aria-hidden="true">
        {/* Purple card body */}
        <rect width="20" height="14" x="2" y="5" rx="2.5" fill={color || "#7114BD"} />
        {/* WHITE card stripe */}
        <line x1="2" x2="22" y1="10" y2="10" stroke="#FFFFFF" strokeWidth={2} />
        <rect x="5" y="13.5" width="4" height="2.5" rx="0.5" fill="#FFFFFF" />
      </svg>
    ),
  },
  // ─── CANDIDATES ────────────────────────────────────────────────────────────
  candidates: {
    name: "candidates", label: "Candidates", category: "hrms",
    outline: ({ size = 20, color = "#2D064D", strokeWidth = 2 }) => (
      <svg width={size} height={size} viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <rect width="18" height="18" x="3" y="3" rx="2" stroke={color} strokeWidth={strokeWidth} />
        <circle cx="12" cy="10" r="3" stroke={color} strokeWidth={strokeWidth} />
        <path d="M7 18a5 5 0 0 1 10 0" stroke={color} strokeWidth={strokeWidth} strokeLinecap="round" />
      </svg>
    ),
    solid: ({ size = 20, color = "#7114BD" }) => (
      <svg width={size} height={size} viewBox="0 0 24 24" fill="none" aria-hidden="true">
        {/* Purple ID/card body */}
        <rect width="18" height="18" x="3" y="3" rx="2.5" fill={color || "#7114BD"} />
        {/* WHITE person detail */}
        <circle cx="12" cy="10" r="3" fill="#FFFFFF" />
        <path d="M7 18a5 5 0 0 1 10 0" fill="#FFFFFF" />
      </svg>
    ),
  },
  // ─── REPORTS ───────────────────────────────────────────────────────────────
  reports: {
    name: "reports", label: "Reports", category: "hrms",
    outline: ({ size = 20, color = "#2D064D", strokeWidth = 2 }) => (
      <svg width={size} height={size} viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <path d="M21.21 15.89A10 10 0 1 1 8 2.83" stroke={color} strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round" />
        <path d="M22 12A10 10 0 0 0 12 2v10z" stroke={color} strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
    solid: ({ size = 20, color = "#7114BD" }) => (
      <svg width={size} height={size} viewBox="0 0 24 24" fill="none" aria-hidden="true">
        {/* Purple chart body */}
        <path d="M21.21 15.89A10 10 0 1 1 8 2.83 L12 12 Z" fill={color || "#7114BD"} />
        {/* WHITE chart segment */}
        <path d="M22 12A10 10 0 0 0 12 2v10z" fill="#FFFFFF" stroke={color || "#7114BD"} strokeWidth={1} strokeLinejoin="round" />
      </svg>
    ),
  },
  // ?????? OFFERS ???????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????
  offers: {
    name: "offers", label: "Offers", category: "hrms",
    outline: ({ size, color, strokeWidth = 1.75, secondaryColor = "var(--icon-fill, rgba(189,182,208,0.22))" }) => (
      <svg width={size} height={size} viewBox="0 0 24 24" aria-hidden="true">
        <path d="M22 13V6a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2v12c0 1.1.9 2 2 2h8" fill={secondaryColor} stroke={color} strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round" />
        <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" {...S(color, strokeWidth)} />
        <path d="m16 19 2 2 4-4" {...S(color, strokeWidth)} />
      </svg>
    ),
    solid: ({ size, color, structuralColor = "#581093" }) => (
      <svg width={size} height={size} viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <path d="M22 13V6a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2v12c0 1.1.9 2 2 2h8" fill={color} stroke={structuralColor} strokeWidth={1} strokeLinecap="round" strokeLinejoin="round" />
        <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" stroke={structuralColor} strokeWidth={1.8} strokeLinecap="round" />
        <path d="m16 19 2 2 4-4" stroke={color} strokeWidth={2.2} strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
  },
  // ?????? ORGANIZATION ?????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????
  organization: {
    name: "organization", label: "Organization", category: "global",
    outline: ({ size, color, strokeWidth = 1.8 }) => (
      <svg width={size} height={size} viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <rect x="9" y="3" width="6" height="5" rx="1.5" stroke={color} strokeWidth={strokeWidth} />
        <rect x="3" y="16" width="6" height="5" rx="1.5" stroke={color} strokeWidth={strokeWidth} />
        <rect x="15" y="16" width="6" height="5" rx="1.5" stroke={color} strokeWidth={strokeWidth} />
        <path d="M12 8v4 M6 12h12 M6 12v4 M18 12v4" stroke={color} strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
    solid: ({ size, color }) => (
      <svg width={size} height={size} viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <rect x="9" y="3" width="6" height="5" rx="1.5" fill={color} />
        <rect x="3" y="16" width="6" height="5" rx="1.5" fill={color} />
        <rect x="15" y="16" width="6" height="5" rx="1.5" fill={color} />
        <path d="M12 8v4 M6 12h12 M6 12v4 M18 12v4" stroke={color} strokeWidth={2.2} strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
  },
  // ─── DOCUMENTS ─────────────────────────────────────────────────────────────
  documents: {
    name: "documents", label: "Documents", category: "global",
    outline: ({ size, color, strokeWidth = 1.8 }) => (
      <svg width={size} height={size} viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <path d="M4 19h16a2 2 0 0 0 2-2V8a2 2 0 0 0-2-2h-7l-2-2H4a2 2 0 0 0-2 2v11a2 2 0 0 0 2 2z" stroke={color} strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
    solid: ({ size, color, cutoutColor = "#FFFFFF" }) => (
      <svg width={size} height={size} viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <path d="M4 19h16a2 2 0 0 0 2-2V8a2 2 0 0 0-2-2h-7l-2-2H4a2 2 0 0 0-2 2v11a2 2 0 0 0 2 2z" fill={color} />
        <path d="M2 9.5h20" stroke={cutoutColor} strokeWidth={1.8} strokeLinecap="round" />
      </svg>
    ),
  },
  // ?????? SOPs ?????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????
  sop: {
    name: "sop", label: "SOPs", category: "global",
    outline: ({ size, color, strokeWidth = 1.75 }) => (
      <svg width={size} height={size} viewBox="0 0 24 24" aria-hidden="true">
        <path d="M13 5h8" {...S(color, strokeWidth)} />
        <path d="M13 12h8" {...S(color, strokeWidth)} />
        <path d="M13 19h8" {...S(color, strokeWidth)} />
        <path d="m3 17 2 2 4-4" {...S(color, strokeWidth)} />
        <path d="m3 7 2 2 4-4" {...S(color, strokeWidth)} />
      </svg>
    ),
    solid: ({ size, color, structuralColor = "#581093" }) => (
      <svg width={size} height={size} viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <path d="M13 5h8 M13 12h8 M13 19h8" stroke={color} strokeWidth={2.4} strokeLinecap="round" />
        <path d="m3 17 2 2 4-4 M3 7l2 2 4-4" stroke={structuralColor} strokeWidth={2.2} strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
  },
  // ─── ASSETS ────────────────────────────────────────────────────────────────
  assets: {
    name: "assets", label: "Assets", category: "global",
    outline: ({ size, color, strokeWidth = 1.8 }) => (
      <svg width={size} height={size} viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <path
          d="M12 2.5 L20 7 L20 16.5 L12 21 L4 16.5 L4 7 Z"
          stroke={color}
          strokeWidth={strokeWidth}
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M12 11.5 L12 21 M12 11.5 L4 7 M12 11.5 L20 7"
          stroke={color}
          strokeWidth={strokeWidth}
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M7.5 4.8 L16.5 9.8"
          stroke={color}
          strokeWidth={1.3}
          strokeLinecap="round"
          opacity={0.7}
        />
      </svg>
    ),
    solid: ({ size, color, structuralColor = "#581093", isDark }) => (
      <svg width={size} height={size} viewBox="0 0 24 24" fill="none" aria-hidden="true">
        {/* Top/Secondary face in #581093 */}
        <path
          d="M12 2.8 L19.4 7 L12 11.2 L4.6 7 Z"
          fill={structuralColor}
          stroke={structuralColor}
          strokeWidth={0.8}
          strokeLinejoin="round"
        />
        {/* Left front face in primary #931CF5 */}
        <path
          d="M4.6 7 L12 11.2 L12 20.4 L4.6 16.2 Z"
          fill={color}
          stroke={structuralColor}
          strokeWidth={0.8}
          strokeLinejoin="round"
        />
        {/* Right front face in primary #931CF5 */}
        <path
          d="M12 11.2 L19.4 7 L19.4 16.2 L12 20.4 Z"
          fill={color}
          stroke={structuralColor}
          strokeWidth={0.8}
          strokeLinejoin="round"
        />
        {/* Preserved cube edges and 3D geometry */}
        <path
          d="M12 11.2 L12 20.4 M12 11.2 L4.6 7 M12 11.2 L19.4 7"
          stroke={isDark ? "#280544" : "#4A0B78"}
          strokeWidth={1.5}
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        {/* Top tape / seam detail */}
        <path
          d="M7.8 5 L16.2 9.4"
          stroke={isDark ? "#BD74F9" : "#E9D0FD"}
          strokeWidth={1.4}
          strokeLinecap="round"
        />
      </svg>
    ),
  },
  // ?????? EMPLOYEE REQUESTS ??????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????
  requests: {
    name: "requests", label: "Employee Requests", category: "global",
    outline: ({ size, color, strokeWidth = 1.75, secondaryColor = "var(--icon-fill, rgba(189,182,208,0.22))" }) => (
      <svg width={size} height={size} viewBox="0 0 24 24" aria-hidden="true">
        <path d="M22 10.5V6a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2v12c0 1.1.9 2 2 2h12.5" fill={secondaryColor} stroke={color} strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round" />
        <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" {...S(color, strokeWidth)} />
        <path d="M18 15.28c.2-.4.5-.8.9-1a2.1 2.1 0 0 1 2.6.4c.3.4.5.8.5 1.3 0 1.3-2 2-2 2" {...S(color, strokeWidth)} />
        <path d="M20 22v.01" {...S(color, strokeWidth)} />
      </svg>
    ),
    solid: ({ size, color, structuralColor = "#581093" }) => (
      <svg width={size} height={size} viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <path d="M22 10.5V6a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2v12c0 1.1.9 2 2 2h12.5" fill={color} stroke={structuralColor} strokeWidth={1} strokeLinecap="round" strokeLinejoin="round" />
        <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" stroke={structuralColor} strokeWidth={1.8} strokeLinecap="round" />
        <path d="M18 15.28c.2-.4.5-.8.9-1a2.1 2.1 0 0 1 2.6.4c.3.4.5.8.5 1.3 0 1.3-2 2-2 2" stroke={color} strokeWidth={2} strokeLinecap="round" />
        <path d="M20 22v.01" stroke={color} strokeWidth={2.2} strokeLinecap="round" />
      </svg>
    ),
  },
  // ?????? OPERATIONS ???????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????
  operations: {
    name: "operations", label: "Operations", category: "global",
    outline: ({ size, color, strokeWidth = 1.75, secondaryColor = "var(--icon-fill, rgba(189,182,208,0.22))" }) => (
      <svg width={size} height={size} viewBox="0 0 24 24" aria-hidden="true">
        <path d="M12 17v4" {...S(color, strokeWidth)} />
        <path d="m14.305 7.53.923-.382" {...S(color, strokeWidth)} />
        <path d="m15.228 4.852-.923-.383" {...S(color, strokeWidth)} />
        <path d="m16.852 3.228-.383-.924" {...S(color, strokeWidth)} />
        <path d="m16.852 8.772-.383.923" {...S(color, strokeWidth)} />
        <path d="m19.148 3.228.383-.924" {...S(color, strokeWidth)} />
        <path d="m19.53 9.696-.382-.924" {...S(color, strokeWidth)} />
        <path d="m20.772 4.852.924-.383" {...S(color, strokeWidth)} />
        <path d="m20.772 7.148.924.383" {...S(color, strokeWidth)} />
        <path d="M22 13v2a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h7" {...S(color, strokeWidth)} />
        <path d="M8 21h8" {...S(color, strokeWidth)} />
        <circle cx="18" cy="6" r="3" fill={secondaryColor} stroke={color} strokeWidth={strokeWidth} />
      </svg>
    ),
    solid: ({ size, color, structuralColor = "#581093" }) => (
      <svg width={size} height={size} viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <rect x="2" y="3" width="13" height="14" rx="2" fill={color} stroke={structuralColor} strokeWidth={1} />
        <path d="M12 17v4 M8 21h8" stroke={color} strokeWidth={2} strokeLinecap="round" />
        <path d="m14.305 7.53.923-.382 M15.228 4.852l-.923-.383 M16.852 3.228l-.383-.924 M16.852 8.772l-.383.923 M19.148 3.228l.383-.924 M19.53 9.696l-.382-.924 M20.772 4.852l.924-.383 M20.772 7.148l.924.383" stroke={structuralColor} strokeWidth={1.8} strokeLinecap="round" />
        <circle cx="18" cy="6" r="3" fill={structuralColor} stroke={color} strokeWidth={1} />
        <circle cx="18" cy="6" r="1.3" fill={color} />
      </svg>
    ),
  },
  // ─── REPORTS ───────────────────────────────────────────────────────────────
  reports: {
    name: "reports", label: "Reports", category: "global",
    outline: ({ size = 20, color = "#2D064D", strokeWidth = 2 }) => (
      <svg width={size} height={size} viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <path d="M21.21 15.89A10 10 0 1 1 8 2.83" stroke={color} strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round" />
        <path d="M22 12A10 10 0 0 0 12 2v10z" stroke={color} strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
    solid: ({ size = 20, color = "#7114BD" }) => (
      <svg width={size} height={size} viewBox="0 0 24 24" fill="none" aria-hidden="true">
        {/* Purple chart body */}
        <path d="M21.21 15.89A10 10 0 1 1 8 2.83L12 12z" fill={color || "#7114BD"} />
        {/* WHITE chart segment */}
        <path d="M22 12A10 10 0 0 0 12 2v10z" fill={color || "#7114BD"} stroke="#FFFFFF" strokeWidth={1.8} />
      </svg>
    ),
  },
  // ─── SETTINGS (Gear) ───────────────────────────────────────────────────────
  settings: {
    name: "settings", label: "Settings", category: "global",
    outline: ({ size, color, strokeWidth = 1.75, secondaryColor = "var(--icon-fill, rgba(189,182,208,0.22))" }) => (
      <svg width={size} height={size} viewBox="0 0 24 24" aria-hidden="true">
        <path d="M9.671 4.136a2.34 2.34 0 0 1 4.659 0 2.34 2.34 0 0 0 3.319 1.915 2.34 2.34 0 0 1 2.33 4.033 2.34 2.34 0 0 0 0 3.831 2.34 2.34 0 0 1-2.33 4.033 2.34 2.34 0 0 0-3.319 1.915 2.34 2.34 0 0 1-4.659 0 2.34 2.34 0 0 0-3.32-1.915 2.34 2.34 0 0 1-2.33-4.033 2.34 2.34 0 0 0 0-3.831A2.34 2.34 0 0 1 6.35 6.051a2.34 2.34 0 0 0 3.319-1.915" {...S(color, strokeWidth)} />
        <circle cx="12" cy="12" r="3" fill={secondaryColor} stroke={color} strokeWidth={strokeWidth} />
      </svg>
    ),
    solid: ({ size, color, structuralColor = "#581093" }) => (
      <svg width={size} height={size} viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <path d="M9.671 4.136a2.34 2.34 0 0 1 4.659 0 2.34 2.34 0 0 0 3.319 1.915 2.34 2.34 0 0 1 2.33 4.033 2.34 2.34 0 0 0 0 3.831 2.34 2.34 0 0 1-2.33 4.033 2.34 2.34 0 0 0-3.319 1.915 2.34 2.34 0 0 1-4.659 0 2.34 2.34 0 0 0-3.32-1.915 2.34 2.34 0 0 1-2.33-4.033 2.34 2.34 0 0 0 0-3.831A2.34 2.34 0 0 1 6.35 6.051a2.34 2.34 0 0 0 3.319-1.915" fill={color} stroke={structuralColor} strokeWidth={1} strokeLinecap="round" strokeLinejoin="round" />
        <circle cx="12" cy="12" r="3" fill={structuralColor} />
        <circle cx="12" cy="12" r="1.4" fill={color} />
      </svg>
    ),
  },
  // ─── HR SETTINGS (Wrench) ──────────────────────────────────────────────────
  hrSettings: {
    name: "hrSettings", label: "HR Settings", category: "global",
    outline: ({ size, color, strokeWidth = 1.75 }) => (
      <svg width={size} height={size} viewBox="0 0 24 24" aria-hidden="true">
        <path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.106-3.105c.32-.322.863-.22.983.218a6 6 0 0 1-8.259 7.057l-7.91 7.91a1 1 0 0 1-2.999-3l7.91-7.91a6 6 0 0 1 7.057-8.259c.438.12.54.662.219.984z" {...S(color, strokeWidth)} />
      </svg>
    ),
    solid: ({ size, color, structuralColor = "#581093" }) => (
      <svg width={size} height={size} viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.106-3.105c.32-.322.863-.22.983.218a6 6 0 0 1-8.259 7.057l-7.91 7.91a1 1 0 0 1-2.999-3l7.91-7.91a6 6 0 0 1 7.057-8.259c.438.12.54.662.219.984z" fill={color} stroke={structuralColor} strokeWidth={1} strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
  },
  // ─── MORE ─────────────────────────────────────────────────────────────────
  more: {
    name: "more", label: "More", category: "global",
    outline: ({ size, color, strokeWidth = 1.8 }) => (
      <svg width={size} height={size} viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <circle cx="5" cy="12" r="2.2" stroke={color} strokeWidth={strokeWidth} fill="none" />
        <circle cx="12" cy="12" r="2.2" stroke={color} strokeWidth={strokeWidth} fill="none" />
        <circle cx="19" cy="12" r="2.2" stroke={color} strokeWidth={strokeWidth} fill="none" />
      </svg>
    ),
    solid: ({ size, color }) => (
      <svg width={size} height={size} viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <circle cx="5" cy="12" r="2.5" fill={color} />
        <circle cx="12" cy="12" r="2.5" fill={color} />
        <circle cx="19" cy="12" r="2.5" fill={color} />
      </svg>
    ),
  },
  // ?????? MY TASKS ?????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????
  tasks: {
    name: "tasks", label: "My Tasks", category: "global",
    outline: ({ size, color, strokeWidth = 1.75, secondaryColor = "var(--icon-fill, rgba(189,182,208,0.22))" }) => (
      <svg width={size} height={size} viewBox="0 0 24 24" aria-hidden="true">
        <rect width="8" height="4" x="8" y="2" rx="1" ry="1" {...S(color, strokeWidth)} />
        <path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2" fill={secondaryColor} stroke={color} strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round" />
        <path d="m9 14 2 2 4-4" {...S(color, strokeWidth)} />
      </svg>
    ),
    solid: ({ size, color, structuralColor = "#581093" }) => (
      <svg width={size} height={size} viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2" fill={color} stroke={structuralColor} strokeWidth={1} strokeLinecap="round" strokeLinejoin="round" />
        <rect width="8" height="4" x="8" y="2" rx="1" ry="1" fill={structuralColor} />
        <path d="m9 14 2 2 4-4" stroke="#FAF5FE" strokeWidth={2.2} strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
  },
  // ?????? APPROVALS ??????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????
  approvals: {
    name: "approvals", label: "Approvals", category: "global",
    outline: ({ size, color, strokeWidth = 1.75, secondaryColor = "var(--icon-fill, rgba(189,182,208,0.22))" }) => (
      <svg width={size} height={size} viewBox="0 0 24 24" aria-hidden="true">
        <path d="M3.85 8.62a4 4 0 0 1 4.78-4.77 4 4 0 0 1 6.74 0 4 4 0 0 1 4.78 4.78 4 4 0 0 1 0 6.74 4 4 0 0 1-4.77 4.78 4 4 0 0 1-6.75 0 4 4 0 0 1-4.78-4.77 4 4 0 0 1 0-6.76Z" fill={secondaryColor} stroke={color} strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round" />
        <path d="m16 9-5.5 5.5L8 12" {...S(color, strokeWidth)} />
      </svg>
    ),
    solid: ({ size, color, structuralColor = "#581093" }) => (
      <svg width={size} height={size} viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <path d="M3.85 8.62a4 4 0 0 1 4.78-4.77 4 4 0 0 1 6.74 0 4 4 0 0 1 4.78 4.78 4 4 0 0 1 0 6.74 4 4 0 0 1-4.77 4.78 4 4 0 0 1-6.75 0 4 4 0 0 1-4.78-4.77 4 4 0 0 1 0-6.76Z" fill={color} stroke={structuralColor} strokeWidth={1} strokeLinecap="round" strokeLinejoin="round" />
        <path d="m16 9-5.5 5.5L8 12" stroke="#FAF5FE" strokeWidth={2.4} strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
  },
  // ?????? CALENDAR ?????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????
  calendar: {
    name: "calendar", label: "Calendar", category: "global",
    outline: ({ size, color, strokeWidth = 1.75, secondaryColor = "var(--icon-fill, rgba(189,182,208,0.22))" }) => (
      <svg width={size} height={size} viewBox="0 0 24 24" aria-hidden="true">
        <path d="M12.127 21H5a2 2 0 01-2-2V5a2 2 0 012-2h14a2 2 0 012 2v5.125" {...S(color, strokeWidth)} />
        <path d="M14.62 17.8A2.25 2.25 0 1118 14.836a2.25 2.25 0 113.38 2.966l-2.626 2.856a.998.998 0 01-1.507 0z" fill={secondaryColor} stroke={color} strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round" />
        <path d="M16 2v3" {...S(color, strokeWidth)} />
        <path d="M3 9h18" {...S(color, strokeWidth)} />
        <path d="M8 2v3" {...S(color, strokeWidth)} />
      </svg>
    ),
    solid: ({ size, color, structuralColor = "#581093" }) => (
      <svg width={size} height={size} viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <path d="M3 5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2v4H3Z" fill={structuralColor} />
        <path d="M3 9h18v10a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2Z" fill={color} stroke={structuralColor} strokeWidth={1} />
        <path d="M16 2v3 M8 2v3" stroke="#FAF5FE" strokeWidth={2} strokeLinecap="round" />
        <path d="M14.62 17.8A2.25 2.25 0 1118 14.836a2.25 2.25 0 113.38 2.966l-2.626 2.856a.998.998 0 01-1.507 0z" fill={structuralColor} stroke={color} strokeWidth={1} strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
  },
  // ?????? NOTES ??????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????
  notes: {
    name: "notes", label: "Notes", category: "global",
    outline: ({ size, color, strokeWidth = 1.75, secondaryColor = "var(--icon-fill, rgba(189,182,208,0.22))" }) => (
      <svg width={size} height={size} viewBox="0 0 24 24" aria-hidden="true">
        <path d="M13.4 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-7.4" fill={secondaryColor} stroke={color} strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round" />
        <path d="M2 6h4" {...S(color, strokeWidth)} />
        <path d="M2 10h4" {...S(color, strokeWidth)} />
        <path d="M2 14h4" {...S(color, strokeWidth)} />
        <path d="M2 18h4" {...S(color, strokeWidth)} />
        <path d="M21.378 5.626a1 1 0 1 0-3.004-3.004l-5.01 5.012a2 2 0 0 0-.506.854l-.837 2.87a.5.5 0 0 0 .62.62l2.87-.837a2 2 0 0 0 .854-.506z" {...S(color, strokeWidth)} />
      </svg>
    ),
    solid: ({ size, color, structuralColor = "#581093" }) => (
      <svg width={size} height={size} viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <path d="M13.4 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-7.4" fill={color} stroke={structuralColor} strokeWidth={1} strokeLinecap="round" strokeLinejoin="round" />
        <path d="M2 6h4 M2 10h4 M2 14h4 M2 18h4" stroke={structuralColor} strokeWidth={1.8} strokeLinecap="round" />
        <path d="M21.378 5.626a1 1 0 1 0-3.004-3.004l-5.01 5.012a2 2 0 0 0-.506.854l-.837 2.87a.5.5 0 0 0 .62.62l2.87-.837a2 2 0 0 0 .854-.506z" fill={structuralColor} stroke={color} strokeWidth={1} strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
  },
  // ?????? NOTIFICATIONS ??????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????
  notifications: {
    name: "notifications", label: "Notifications", category: "global",
    outline: ({ size, color, strokeWidth = 1.75, secondaryColor = "var(--icon-fill, rgba(189,182,208,0.22))" }) => (
      <svg width={size} height={size} viewBox="0 0 24 24" aria-hidden="true">
        <path d="M10.268 21a2 2 0 0 0 3.464 0" {...S(color, strokeWidth)} />
        <path d="M3.262 15.326A1 1 0 0 0 4 17h16a1 1 0 0 0 .74-1.673C19.41 13.956 18 12.499 18 8A6 6 0 0 0 6 8c0 4.499-1.411 5.956-2.738 7.326" fill={secondaryColor} stroke={color} strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
    solid: ({ size, color, structuralColor = "#581093" }) => (
      <svg width={size} height={size} viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <path d="M3.262 15.326A1 1 0 0 0 4 17h16a1 1 0 0 0 .74-1.673C19.41 13.956 18 12.499 18 8A6 6 0 0 0 6 8c0 4.499-1.411 5.956-2.738 7.326" fill={color} stroke={structuralColor} strokeWidth={1} strokeLinecap="round" strokeLinejoin="round" />
        <path d="M10.268 21a2 2 0 0 0 3.464 0" stroke={structuralColor} strokeWidth={2} strokeLinecap="round" />
      </svg>
    ),
  },
  // ?????? SEARCH ???????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????
  search: {
    name: "search", label: "Search", category: "global",
    outline: ({ size, color, strokeWidth = 1.75, secondaryColor = "var(--icon-fill, rgba(189,182,208,0.22))" }) => (
      <svg width={size} height={size} viewBox="0 0 24 24" aria-hidden="true">
        <path d="m21 21-4.34-4.34" {...S(color, strokeWidth)} />
        <circle cx="11" cy="11" r="8" fill={secondaryColor} stroke={color} strokeWidth={strokeWidth} />
      </svg>
    ),
    solid: ({ size, color, structuralColor = "#581093" }) => (
      <svg width={size} height={size} viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <circle cx="11" cy="11" r="8" fill={color} stroke={structuralColor} strokeWidth={1} />
        <path d="m21 21-4.34-4.34" stroke={structuralColor} strokeWidth={2.4} strokeLinecap="round" />
        <circle cx="9.5" cy="9.5" r="2.5" fill="none" stroke="#FAF5FE" strokeWidth={1.2} opacity={0.5} />
      </svg>
    ),
  },
  // ?????? FILTER ???????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????
  filter: {
    name: "filter", label: "Filter", category: "global",
    outline: ({ size, color, strokeWidth = 1.75 }) => (
      <svg width={size} height={size} viewBox="0 0 24 24" aria-hidden="true">
        <path d="M10 5H3" {...S(color, strokeWidth)} />
        <path d="M12 19H3" {...S(color, strokeWidth)} />
        <path d="M14 3v4" {...S(color, strokeWidth)} />
        <path d="M16 17v4" {...S(color, strokeWidth)} />
        <path d="M21 12h-9" {...S(color, strokeWidth)} />
        <path d="M21 19h-5" {...S(color, strokeWidth)} />
        <path d="M21 5h-7" {...S(color, strokeWidth)} />
        <path d="M8 10v4" {...S(color, strokeWidth)} />
        <path d="M8 12H3" {...S(color, strokeWidth)} />
      </svg>
    ),
    solid: ({ size, color, structuralColor = "#581093" }) => (
      <svg width={size} height={size} viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <path d="M10 5H3 M12 19H3 M21 12h-9 M21 19h-5 M21 5h-7" stroke={color} strokeWidth={2.2} strokeLinecap="round" />
        <path d="M14 3v4 M16 17v4 M8 10v4" stroke={structuralColor} strokeWidth={2.2} strokeLinecap="round" />
        <path d="M8 12H3" stroke={structuralColor} strokeWidth={2.2} strokeLinecap="round" />
        <circle cx="14" cy="5" r="2.2" fill={structuralColor} />
        <circle cx="16" cy="19" r="2.2" fill={structuralColor} />
        <circle cx="8" cy="12" r="2.2" fill={structuralColor} />
      </svg>
    ),
  },
  // ?????? ANNOUNCEMENTS ??????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????
  announcements: {
    name: "announcements", label: "Announcements", category: "global",
    outline: ({ size, color, strokeWidth = 1.75, secondaryColor = "var(--icon-fill, rgba(189,182,208,0.22))" }) => (
      <svg width={size} height={size} viewBox="0 0 24 24" aria-hidden="true">
        <path d="M11 6a13 13 0 0 0 8.4-2.8A1 1 0 0 1 21 4v12a1 1 0 0 1-1.6.8A13 13 0 0 0 11 14H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2z" fill={secondaryColor} stroke={color} strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round" />
        <path d="M6 14a12 12 0 0 0 2.4 7.2 2 2 0 0 0 3.2-2.4A8 8 0 0 1 10 14" {...S(color, strokeWidth)} />
        <path d="M8 6v8" {...S(color, strokeWidth)} />
      </svg>
    ),
    solid: ({ size, color, structuralColor = "#581093" }) => (
      <svg width={size} height={size} viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <path d="M11 6a13 13 0 0 0 8.4-2.8A1 1 0 0 1 21 4v12a1 1 0 0 1-1.6.8A13 13 0 0 0 11 14H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2z" fill={color} stroke={structuralColor} strokeWidth={1} strokeLinecap="round" strokeLinejoin="round" />
        <path d="M8 6v8" stroke={structuralColor} strokeWidth={2.2} strokeLinecap="round" />
        <path d="M6 14a12 12 0 0 0 2.4 7.2 2 2 0 0 0 3.2-2.4A8 8 0 0 1 10 14" stroke={structuralColor} strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
  },
  // ?????? HELP ?????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????
  help: {
    name: "help", label: "Help", category: "global",
    outline: ({ size, color, strokeWidth = 1.75 }) => (
      <svg width={size} height={size} viewBox="0 0 24 24" aria-hidden="true">
        <path d="M3 11h3a2 2 0 0 1 2 2v3a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-5Zm0 0a9 9 0 1 1 18 0m0 0v5a2 2 0 0 1-2 2h-1a2 2 0 0 1-2-2v-3a2 2 0 0 1 2-2h3Z" {...S(color, strokeWidth)} />
        <path d="M21 16v2a4 4 0 0 1-4 4h-5" {...S(color, strokeWidth)} />
      </svg>
    ),
    solid: ({ size, color, structuralColor = "#581093" }) => (
      <svg width={size} height={size} viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <path d="M3 11a9 9 0 1 1 18 0" stroke={color} strokeWidth={2} strokeLinecap="round" fill="none" />
        <rect x="2" y="11" width="5" height="7" rx="1.5" fill={color} stroke={structuralColor} strokeWidth={1} />
        <rect x="17" y="11" width="5" height="7" rx="1.5" fill={color} stroke={structuralColor} strokeWidth={1} />
        <path d="M21 16v2a4 4 0 0 1-4 4h-5" stroke={structuralColor} strokeWidth={1.8} strokeLinecap="round" fill="none" />
      </svg>
    ),
  },
  // ─── WHAT'S NEW ────────────────────────────────────────────────────────────
  whatsNew: {
    name: "whatsNew", label: "What's New", category: "global",
    outline: ({ size, color, strokeWidth = 1.75, secondaryColor = "var(--icon-fill, rgba(189,182,208,0.22))" }) => (
      <svg width={size} height={size} viewBox="0 0 24 24" aria-hidden="true">
        <path d="M5.8 11.3 2 22l10.7-3.79" {...S(color, strokeWidth)} />
        <path d="M4 3h.01" {...S(color, strokeWidth)} />
        <path d="M22 8h.01" {...S(color, strokeWidth)} />
        <path d="M15 2h.01" {...S(color, strokeWidth)} />
        <path d="M22 20h.01" {...S(color, strokeWidth)} />
        <path d="m22 2-2.24.75a2.9 2.9 0 0 0-1.96 3.12c.1.86-.57 1.63-1.45 1.63h-.38c-.86 0-1.6.6-1.76 1.44L14 10" {...S(color, strokeWidth)} />
        <path d="m22 13-.82-.33c-.86-.34-1.82.2-1.98 1.11c-.11.7-.72 1.22-1.43 1.22H17" {...S(color, strokeWidth)} />
        <path d="m11 2 .33.82c.34.86-.2 1.82-1.11 1.98C9.52 4.9 9 5.52 9 6.23V7" {...S(color, strokeWidth)} />
        <path d="M11 13c1.93 1.93 2.83 4.17 2 5-.83.83-3.07-.07-5-2-1.93-1.93-2.83-4.17-2-5 .83-.83 3.07.07 5 2Z" fill={secondaryColor} stroke={color} strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
    solid: ({ size, color, structuralColor = "#581093" }) => (
      <svg width={size} height={size} viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <path d="M5.8 11.3 2 22l10.7-3.79" stroke={structuralColor} strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" />
        <path d="M4 3h.01M22 8h.01M15 2h.01M22 20h.01" stroke={color} strokeWidth={2.5} strokeLinecap="round" />
        <path d="m22 2-2.24.75a2.9 2.9 0 0 0-1.96 3.12c.1.86-.57 1.63-1.45 1.63h-.38c-.86 0-1.6.6-1.76 1.44L14 10" stroke={structuralColor} strokeWidth={1.5} />
        <path d="M11 13c1.93 1.93 2.83 4.17 2 5-.83.83-3.07-.07-5-2-1.93-1.93-2.83-4.17-2-5 .83-.83 3.07.07 5 2Z" fill={color} stroke={structuralColor} strokeWidth={1} />
      </svg>
    ),
  },
  // ─── EXPLORE (Rocket) ──────────────────────────────────────────────────────
  explore: {
    name: "explore", label: "Explore", category: "global",
    outline: ({ size, color, strokeWidth = 1.75, secondaryColor = "var(--icon-fill, rgba(189,182,208,0.22))" }) => (
      <svg width={size} height={size} viewBox="0 0 24 24" aria-hidden="true">
        <path d="M12 15v5s3.03-.55 4-2c1.08-1.62 0-5 0-5" {...S(color, strokeWidth)} />
        <path d="M4.5 16.5c-1.5 1.26-2 5-2 5s3.74-.5 5-2c.71-.84.7-2.13-.09-2.91a2.18 2.18 0 0 0-2.91-.09" {...S(color, strokeWidth)} />
        <path d="M9 12a22 22 0 0 1 2-3.95A12.88 12.88 0 0 1 22 2c0 2.72-.78 7.5-6 11a22.4 22.4 0 0 1-4 2z" fill={secondaryColor} stroke={color} strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round" />
        <path d="M9 12H4s.55-3.03 2-4c1.62-1.08 5 .05 5 .05" {...S(color, strokeWidth)} />
      </svg>
    ),
    solid: ({ size, color, structuralColor = "#581093" }) => (
      <svg width={size} height={size} viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <path d="M12 15v5s3.03-.55 4-2c1.08-1.62 0-5 0-5" stroke={structuralColor} strokeWidth={1.8} strokeLinecap="round" />
        <path d="M4.5 16.5c-1.5 1.26-2 5-2 5s3.74-.5 5-2c.71-.84.7-2.13-.09-2.91a2.18 2.18 0 0 0-2.91-.09" stroke={structuralColor} strokeWidth={1.8} strokeLinecap="round" />
        <path d="M9 12a22 22 0 0 1 2-3.95A12.88 12.88 0 0 1 22 2c0 2.72-.78 7.5-6 11a22.4 22.4 0 0 1-4 2z" fill={color} stroke={structuralColor} strokeWidth={1} strokeLinecap="round" strokeLinejoin="round" />
        <path d="M9 12H4s.55-3.03 2-4c1.62-1.08 5 .05 5 .05" stroke={structuralColor} strokeWidth={1.8} strokeLinecap="round" />
      </svg>
    ),
  },
  // ─── APPS ──────────────────────────────────────────────────────────────────
  apps: {
    name: "apps", label: "Apps", category: "global",
    outline: ({ size, color, strokeWidth = 1.75, secondaryColor = "var(--icon-fill, rgba(189,182,208,0.22))" }) => (
      <svg width={size} height={size} viewBox="0 0 24 24" aria-hidden="true">
        <rect width="7" height="7" x="3" y="3" rx="1" {...S(color, strokeWidth)} />
        <rect width="7" height="7" x="14" y="3" rx="1" {...S(color, strokeWidth)} />
        <rect width="7" height="7" x="14" y="14" rx="1" {...S(color, strokeWidth)} />
        <rect width="7" height="7" x="3" y="14" rx="1" fill={secondaryColor} stroke={color} strokeWidth={strokeWidth} />
      </svg>
    ),
    solid: ({ size, color, structuralColor = "#581093" }) => (
      <svg width={size} height={size} viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <rect width="7" height="7" x="3" y="3" rx="1" fill={color} stroke={structuralColor} strokeWidth={1} />
        <rect width="7" height="7" x="14" y="3" rx="1" fill={structuralColor} stroke={color} strokeWidth={1} />
        <rect width="7" height="7" x="14" y="14" rx="1" fill={color} stroke={structuralColor} strokeWidth={1} />
        <rect width="7" height="7" x="3" y="14" rx="1" fill={structuralColor} stroke={color} strokeWidth={1} />
      </svg>
    ),
  },
  // ?????? BEZENT AI (Astroid) ????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????
  sparkles: {
    name: "sparkles", label: "BEZENT AI", category: "global",
    outline: ({ size, color, strokeWidth = 1.75 }) => (
      <svg width={size} height={size} viewBox="0 0 24 24" aria-hidden="true">
        <path d="M12.983 21.186a1 1 0 0 1-1.966 0 10 10 0 0 0-8.203-8.203 1 1 0 0 1 0-1.966 10 10 0 0 0 8.203-8.203 1 1 0 0 1 1.966 0 10 10 0 0 0 8.203 8.203 1 1 0 0 1 0 1.966 10 10 0 0 0-8.203 8.203" {...S(color, strokeWidth)} />
      </svg>
    ),
    solid: ({ size, color, structuralColor = "#581093" }) => (
      <svg width={size} height={size} viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <path d="M12.983 21.186a1 1 0 0 1-1.966 0 10 10 0 0 0-8.203-8.203 1 1 0 0 1 0-1.966 10 10 0 0 0 8.203-8.203 1 1 0 0 1 1.966 0 10 10 0 0 0 8.203 8.203 1 1 0 0 1 0 1.966 10 10 0 0 0-8.203 8.203" fill={color} stroke={structuralColor} strokeWidth={1} />
        <circle cx="12" cy="12" r="3" fill={structuralColor} />
      </svg>
    ),
  },
  // ─── CRM ──────────────────────────────────────────────────────────────────
  leads: {
    name: "leads", label: "Leads", category: "crm",
    outline: ({ size, color, strokeWidth = 1.75, secondaryColor = "var(--icon-fill, rgba(189,182,208,0.22))", accentColor = "#931CF5" }) => (
      <svg width={size} height={size} viewBox="0 0 24 24" aria-hidden="true">
        <path d="M4 14v-4a8 8 0 0 1 16 0v4M4 10h4M16 10h4" {...S(color, strokeWidth)} />
        <circle cx="12" cy="16" r="3.2" fill={secondaryColor} stroke={color} strokeWidth={strokeWidth} />
        <circle cx="12" cy="16" r="1.1" fill={accentColor} />
      </svg>
    ),
    solid: ({ size, color, structuralColor = "#581093" }) => (
      <svg width={size} height={size} viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <path d="M4 14v-4a8 8 0 0 1 16 0v4M4 10h4M16 10h4" stroke={color} strokeWidth={2} strokeLinecap="round" />
        <circle cx="12" cy="16" r="3.2" fill={color} stroke={structuralColor} strokeWidth={1} />
        <circle cx="12" cy="16" r="1.3" fill={structuralColor} />
      </svg>
    ),
  },
  contacts: {
    name: "contacts", label: "Contacts", category: "crm",
    outline: ({ size, color, strokeWidth = 1.75, secondaryColor = "var(--icon-fill, rgba(189,182,208,0.22))" }) => (
      <svg width={size} height={size} viewBox="0 0 24 24" aria-hidden="true">
        <rect x="4" y="3" width="16" height="18" rx="3" {...S(color, strokeWidth)} />
        <path d="M2 8h2M2 12h2M2 16h2" {...S(color, strokeWidth)} />
        <circle cx="12" cy="10" r="2.8" fill={secondaryColor} stroke={color} strokeWidth={strokeWidth} />
        <path d="M8.5 16a3.5 3.5 0 0 1 7 0" {...S(color, strokeWidth)} />
      </svg>
    ),
    solid: ({ size, color, structuralColor = "#581093" }) => (
      <svg width={size} height={size} viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <rect x="4" y="3" width="16" height="18" rx="3" fill={color} stroke={structuralColor} strokeWidth={1} />
        <path d="M2 8h2M2 12h2M2 16h2" stroke={structuralColor} strokeWidth={1.8} strokeLinecap="round" />
        <circle cx="12" cy="10" r="2.8" fill={structuralColor} />
        <path d="M8.5 16a3.5 3.5 0 0 1 7 0" stroke={structuralColor} strokeWidth={1.8} strokeLinecap="round" />
      </svg>
    ),
  },
  accounts: {
    name: "accounts", label: "Accounts", category: "crm",
    outline: ({ size, color, strokeWidth = 1.75, secondaryColor = "var(--icon-fill, rgba(189,182,208,0.22))" }) => (
      <svg width={size} height={size} viewBox="0 0 24 24" aria-hidden="true">
        <rect x="4" y="3" width="16" height="18" rx="2" {...S(color, strokeWidth)} />
        <path d="M8 7h2M14 7h2M8 11h2M14 11h2" {...S(color, strokeWidth)} />
        <rect x="10" y="15" width="4" height="6" rx="1" fill={secondaryColor} stroke={color} strokeWidth={strokeWidth} />
      </svg>
    ),
    solid: ({ size, color, structuralColor = "#581093" }) => (
      <svg width={size} height={size} viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <rect x="4" y="3" width="16" height="18" rx="2" fill={color} stroke={structuralColor} strokeWidth={1} />
        <path d="M8 7h2M14 7h2M8 11h2M14 11h2" stroke={structuralColor} strokeWidth={1.8} strokeLinecap="round" />
        <rect x="10" y="15" width="4" height="6" rx="1" fill={structuralColor} />
      </svg>
    ),
  },
  deals: {
    name: "deals", label: "Deals", category: "crm",
    outline: ({ size, color, strokeWidth = 1.75, secondaryColor = "var(--icon-fill, rgba(189,182,208,0.22))" }) => (
      <svg width={size} height={size} viewBox="0 0 24 24" aria-hidden="true">
        <path d="m11 17 2 2a1 1 0 0 0 1.4 0l4.3-4.3a1 1 0 0 0 0-1.4l-3-3a1 1 0 0 0-1.4 0l-1.3 1.3" {...S(color, strokeWidth)} />
        <path d="m13 7-2-2a1 1 0 0 0-1.4 0L5.3 9.3a1 1 0 0 0 0 1.4l3 3a1 1 0 0 0 1.4 0l1.3-1.3" {...S(color, strokeWidth)} />
        <circle cx="12" cy="12" r="2.6" fill={secondaryColor} stroke={color} strokeWidth={strokeWidth} />
      </svg>
    ),
    solid: ({ size, color, structuralColor = "#581093" }) => (
      <svg width={size} height={size} viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <path d="m11 17 2 2a1 1 0 0 0 1.4 0l4.3-4.3a1 1 0 0 0 0-1.4l-3-3a1 1 0 0 0-1.4 0l-1.3 1.3" stroke={color} strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" />
        <path d="m13 7-2-2a1 1 0 0 0-1.4 0L5.3 9.3a1 1 0 0 0 0 1.4l3 3a1 1 0 0 0 1.4 0l1.3-1.3" stroke={color} strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" />
        <circle cx="12" cy="12" r="2.6" fill={color} stroke={structuralColor} strokeWidth={1} />
        <circle cx="12" cy="12" r="1.1" fill={structuralColor} />
      </svg>
    ),
  },
  pipeline: {
    name: "pipeline", label: "Pipeline", category: "crm",
    outline: ({ size, color, strokeWidth = 1.75, secondaryColor = "var(--icon-fill, rgba(189,182,208,0.22))" }) => (
      <svg width={size} height={size} viewBox="0 0 24 24" aria-hidden="true">
        <path d="M3 5h18l-3 4H6z" {...S(color, strokeWidth)} />
        <path d="M6 10h12l-3 4H9z" fill={secondaryColor} stroke={color} strokeWidth={strokeWidth} strokeLinejoin="round" />
        <path d="M9 15h6v4H9z" {...S(color, strokeWidth)} />
      </svg>
    ),
    solid: ({ size, color, structuralColor = "#581093" }) => (
      <svg width={size} height={size} viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <path d="M3 5h18l-3 4H6z" fill={color} stroke={structuralColor} strokeWidth={1} strokeLinejoin="round" />
        <path d="M6 10h12l-3 4H9z" fill={structuralColor} stroke={structuralColor} strokeWidth={1} strokeLinejoin="round" />
        <path d="M9 15h6v4H9z" fill={color} stroke={structuralColor} strokeWidth={1} strokeLinejoin="round" />
      </svg>
    ),
  },
  campaigns: {
    name: "campaigns", label: "Campaigns", category: "crm",
    outline: ({ size, color, strokeWidth = 1.75, secondaryColor = "var(--icon-fill, rgba(189,182,208,0.22))", accentColor = "#931CF5" }) => (
      <svg width={size} height={size} viewBox="0 0 24 24" aria-hidden="true">
        <path d="M4.5 16.5c-1.5 1.26-2 5-2 5s3.74-.5 5-2c.71-.84.7-2.13-.09-2.91a2.18 2.18 0 0 0-2.91-.09z" {...S(color, strokeWidth)} />
        <path d="m12 15-3-3a22 22 0 0 1 2-3.95A12.88 12.88 0 0 1 22 2c0 2.72-.78 7.5-6 11a22.35 22.35 0 0 1-4 2z" {...S(color, strokeWidth)} />
        <circle cx="15.5" cy="8.5" r="2.2" fill={secondaryColor} stroke={color} strokeWidth={strokeWidth} />
        <circle cx="15.5" cy="8.5" r="0.9" fill={accentColor} />
      </svg>
    ),
    solid: ({ size, color, structuralColor = "#581093" }) => (
      <svg width={size} height={size} viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <path d="M4.5 16.5c-1.5 1.26-2 5-2 5s3.74-.5 5-2c.71-.84.7-2.13-.09-2.91a2.18 2.18 0 0 0-2.91-.09z" fill={structuralColor} stroke={color} strokeWidth={1} />
        <path d="m12 15-3-3a22 22 0 0 1 2-3.95A12.88 12.88 0 0 1 22 2c0 2.72-.78 7.5-6 11a22.35 22.35 0 0 1-4 2z" fill={color} stroke={structuralColor} strokeWidth={1} />
        <circle cx="15.5" cy="8.5" r="2.2" fill={structuralColor} />
      </svg>
    ),
  },
  products: {
    name: "products", label: "Products", category: "crm",
    outline: ({ size, color, strokeWidth = 1.75, secondaryColor = "var(--icon-fill, rgba(189,182,208,0.22))" }) => (
      <svg width={size} height={size} viewBox="0 0 24 24" aria-hidden="true">
        <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z" {...S(color, strokeWidth)} />
        <path d="M3.27 6.96L12 12.01l8.73-5.05M12 22.08V12" {...S(color, strokeWidth)} />
        <rect x="9.5" y="13.5" width="5" height="4" rx="1" fill={secondaryColor} stroke={color} strokeWidth={strokeWidth} />
      </svg>
    ),
    solid: ({ size, color, structuralColor = "#581093" }) => (
      <svg width={size} height={size} viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z" fill={color} stroke={structuralColor} strokeWidth={1} />
        <path d="M3.27 6.96L12 12.01l8.73-5.05M12 22.08V12" stroke={structuralColor} strokeWidth={1.5} />
        <rect x="9.5" y="13.5" width="5" height="4" rx="1" fill={structuralColor} />
      </svg>
    ),
  },
  quotes: {
    name: "quotes", label: "Quotes", category: "crm",
    outline: ({ size, color, strokeWidth = 1.75, secondaryColor = "var(--icon-fill, rgba(189,182,208,0.22))" }) => (
      <svg width={size} height={size} viewBox="0 0 24 24" aria-hidden="true">
        <rect x="3" y="3" width="18" height="18" rx="3" {...S(color, strokeWidth)} />
        <line x1="7" y1="16" x2="17" y2="16" {...S(color, strokeWidth)} />
        <path d="M8 8.5c0-1.4 1.1-2.5 2.5-2.5v1.5c-.6 0-1 .4-1 1h2v3H8v-3z" fill={secondaryColor} stroke={color} strokeWidth={1.2} />
        <path d="M13 8.5c0-1.4 1.1-2.5 2.5-2.5v1.5c-.6 0-1 .4-1 1h2v3h-3.5v-3z" fill={secondaryColor} stroke={color} strokeWidth={1.2} />
      </svg>
    ),
    solid: ({ size, color, structuralColor = "#581093" }) => (
      <svg width={size} height={size} viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <rect x="3" y="3" width="18" height="18" rx="3" fill={color} stroke={structuralColor} strokeWidth={1} />
        <line x1="7" y1="16" x2="17" y2="16" stroke={structuralColor} strokeWidth={1.8} strokeLinecap="round" />
        <path d="M8 8.5c0-1.4 1.1-2.5 2.5-2.5v1.5c-.6 0-1 .4-1 1h2v3H8v-3z" fill={structuralColor} />
        <path d="M13 8.5c0-1.4 1.1-2.5 2.5-2.5v1.5c-.6 0-1 .4-1 1h2v3h-3.5v-3z" fill={structuralColor} />
      </svg>
    ),
  },
  invoices: {
    name: "invoices", label: "Invoices", category: "crm",
    outline: ({ size, color, strokeWidth = 1.75, secondaryColor = "var(--icon-fill, rgba(189,182,208,0.22))" }) => (
      <svg width={size} height={size} viewBox="0 0 24 24" aria-hidden="true">
        <path d="M4 2v20l3-1.5 3 1.5 3-1.5 3 1.5 3-1.5 3 1.5V2H4z" {...S(color, strokeWidth)} />
        <line x1="8" y1="7" x2="16" y2="7" {...S(color, strokeWidth)} />
        <line x1="8" y1="11" x2="14" y2="11" {...S(color, strokeWidth)} />
        <rect x="8" y="14" width="8" height="3" rx="1" fill={secondaryColor} stroke={color} strokeWidth={strokeWidth} />
      </svg>
    ),
    solid: ({ size, color, structuralColor = "#581093" }) => (
      <svg width={size} height={size} viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <path d="M4 2v20l3-1.5 3 1.5 3-1.5 3 1.5 3-1.5 3 1.5V2H4z" fill={color} stroke={structuralColor} strokeWidth={1} />
        <line x1="8" y1="7" x2="16" y2="7" stroke={structuralColor} strokeWidth={1.8} strokeLinecap="round" />
        <line x1="8" y1="11" x2="14" y2="11" stroke={structuralColor} strokeWidth={1.8} strokeLinecap="round" />
        <rect x="8" y="14" width="8" height="3" rx="1" fill={structuralColor} />
      </svg>
    ),
  },
  support: {
    name: "support", label: "Support", category: "crm",
    outline: ({ size, color, strokeWidth = 1.75, secondaryColor = "var(--icon-fill, rgba(189,182,208,0.22))", accentColor = "#931CF5" }) => (
      <svg width={size} height={size} viewBox="0 0 24 24" aria-hidden="true">
        <circle cx="12" cy="12" r="9.5" {...S(color, strokeWidth)} />
        <line x1="4.93" y1="4.93" x2="8.5" y2="8.5" {...S(color, strokeWidth)} />
        <line x1="15.5" y1="15.5" x2="19.07" y2="19.07" {...S(color, strokeWidth)} />
        <line x1="15.5" y1="8.5" x2="19.07" y2="4.93" {...S(color, strokeWidth)} />
        <line x1="4.93" y1="19.07" x2="8.5" y2="15.5" {...S(color, strokeWidth)} />
        <circle cx="12" cy="12" r="4" fill={secondaryColor} stroke={color} strokeWidth={strokeWidth} />
        <circle cx="12" cy="12" r="1.3" fill={accentColor} />
      </svg>
    ),
    solid: ({ size, color, structuralColor = "#581093" }) => (
      <svg width={size} height={size} viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <circle cx="12" cy="12" r="9.5" fill={color} stroke={structuralColor} strokeWidth={1} />
        <line x1="4.93" y1="4.93" x2="8.5" y2="8.5" stroke={structuralColor} strokeWidth={1.8} strokeLinecap="round" />
        <line x1="15.5" y1="15.5" x2="19.07" y2="19.07" stroke={structuralColor} strokeWidth={1.8} strokeLinecap="round" />
        <line x1="15.5" y1="8.5" x2="19.07" y2="4.93" stroke={structuralColor} strokeWidth={1.8} strokeLinecap="round" />
        <line x1="4.93" y1="19.07" x2="8.5" y2="15.5" stroke={structuralColor} strokeWidth={1.8} strokeLinecap="round" />
        <circle cx="12" cy="12" r="4" fill={structuralColor} stroke={color} strokeWidth={1} />
        <circle cx="12" cy="12" r="1.5" fill={color} />
      </svg>
    ),
  },
  // ?????? PROJECT MANAGEMENT ???????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????
  projects: {
    name: "projects", label: "Projects", category: "pm",
    outline: ({ size, color, strokeWidth = 1.75, secondaryColor = "var(--icon-fill, rgba(189,182,208,0.22))", accentColor = "#931CF5" }) => (
      <svg width={size} height={size} viewBox="0 0 24 24" aria-hidden="true">
        <path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z" {...S(color, strokeWidth)} />
        <rect x="8" y="11" width="8" height="6" rx="1.5" fill={secondaryColor} stroke={color} strokeWidth={strokeWidth} />
        <path d="M12 12.5v3M10.5 14h3" stroke={accentColor ?? color} strokeWidth={1.4} strokeLinecap="round" />
      </svg>
    ),
    solid: ({ size, color, structuralColor = "#581093" }) => (
      <svg width={size} height={size} viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z" fill={color} stroke={structuralColor} strokeWidth={1} />
        <rect x="8" y="11" width="8" height="6" rx="1.5" fill={structuralColor} />
        <path d="M12 12.5v3M10.5 14h3" stroke={color} strokeWidth={1.6} strokeLinecap="round" />
      </svg>
    ),
  },
  planning: {
    name: "planning", label: "Planning", category: "pm",
    outline: ({ size, color, strokeWidth = 1.75, secondaryColor = "var(--icon-fill, rgba(189,182,208,0.22))" }) => (
      <svg width={size} height={size} viewBox="0 0 24 24" aria-hidden="true">
        <rect width="18" height="18" x="3" y="3" rx="3" {...S(color, strokeWidth)} />
        <path d="M3 9h18M9 21V9" {...S(color, strokeWidth)} />
        <rect x="12" y="12" width="6.5" height="5" rx="1.2" fill={secondaryColor} stroke={color} strokeWidth={strokeWidth} />
      </svg>
    ),
    solid: ({ size, color, structuralColor = "#581093" }) => (
      <svg width={size} height={size} viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <rect width="18" height="18" x="3" y="3" rx="3" fill={color} stroke={structuralColor} strokeWidth={1} />
        <path d="M3 9h18M9 21V9" stroke={structuralColor} strokeWidth={1.5} />
        <rect x="12" y="12" width="6.5" height="5" rx="1.2" fill={structuralColor} />
      </svg>
    ),
  },
  milestones: {
    name: "milestones", label: "Milestones", category: "pm",
    outline: ({ size, color, strokeWidth = 1.75, secondaryColor = "var(--icon-fill, rgba(189,182,208,0.22))", accentColor = "#931CF5" }) => (
      <svg width={size} height={size} viewBox="0 0 24 24" aria-hidden="true">
        <line x1="4" y1="2" x2="4" y2="22" {...S(color, strokeWidth)} />
        <path d="M4 15s1-1 4-1 5 2 8 2 4-1 4-1V3s-1 1-4 1-5-2-8-2-4 1-4 1z" fill={secondaryColor} stroke={color} strokeWidth={strokeWidth} strokeLinejoin="round" />
        <circle cx="11" cy="8.5" r="1.3" fill={accentColor} />
      </svg>
    ),
    solid: ({ size, color, structuralColor = "#581093" }) => (
      <svg width={size} height={size} viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <line x1="4" y1="2" x2="4" y2="22" stroke={structuralColor} strokeWidth={2} strokeLinecap="round" />
        <path d="M4 15s1-1 4-1 5 2 8 2 4-1 4-1V3s-1 1-4 1-5-2-8-2-4 1-4 1z" fill={color} stroke={structuralColor} strokeWidth={1} strokeLinejoin="round" />
        <circle cx="11" cy="8.5" r="1.6" fill={structuralColor} />
      </svg>
    ),
  },
  risks: {
    name: "risks", label: "Risks", category: "pm",
    outline: ({ size, color, strokeWidth = 1.75, secondaryColor = "var(--icon-fill, rgba(189,182,208,0.22))" }) => (
      <svg width={size} height={size} viewBox="0 0 24 24" aria-hidden="true">
        <path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3Z" {...S(color, strokeWidth)} />
        <line x1="12" y1="9" x2="12" y2="13" stroke={color} strokeWidth={strokeWidth} strokeLinecap="round" />
        <circle cx="12" cy="17" r="1.5" fill={secondaryColor} stroke={color} strokeWidth={strokeWidth} />
      </svg>
    ),
    solid: ({ size, color, structuralColor = "#581093" }) => (
      <svg width={size} height={size} viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3Z" fill={color} stroke={structuralColor} strokeWidth={1} />
        <line x1="12" y1="9" x2="12" y2="13" stroke={structuralColor} strokeWidth={2} strokeLinecap="round" />
        <circle cx="12" cy="17" r="1.5" fill={structuralColor} />
      </svg>
    ),
  },
  issues: {
    name: "issues", label: "Issues", category: "pm",
    outline: ({ size, color, strokeWidth = 1.75, secondaryColor = "var(--icon-fill, rgba(189,182,208,0.22))" }) => (
      <svg width={size} height={size} viewBox="0 0 24 24" aria-hidden="true">
        <circle cx="12" cy="12" r="9.5" {...S(color, strokeWidth)} />
        <line x1="12" y1="7.5" x2="12" y2="12" stroke={color} strokeWidth={strokeWidth} strokeLinecap="round" />
        <circle cx="12" cy="16" r="1.8" fill={secondaryColor} stroke={color} strokeWidth={strokeWidth} />
      </svg>
    ),
    solid: ({ size, color, structuralColor = "#581093" }) => (
      <svg width={size} height={size} viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <circle cx="12" cy="12" r="9.5" fill={color} stroke={structuralColor} strokeWidth={1} />
        <line x1="12" y1="7.5" x2="12" y2="12" stroke={structuralColor} strokeWidth={2} strokeLinecap="round" />
        <circle cx="12" cy="16" r="1.8" fill={structuralColor} />
      </svg>
    ),
  },
  changes: {
    name: "changes", label: "Change Requests", category: "pm",
    outline: ({ size, color, strokeWidth = 1.75, secondaryColor = "var(--icon-fill, rgba(189,182,208,0.22))" }) => (
      <svg width={size} height={size} viewBox="0 0 24 24" aria-hidden="true">
        <circle cx="18" cy="18" r="3" {...S(color, strokeWidth)} />
        <path d="M13 6h3a2 2 0 0 1 2 2v7M6 9v12" {...S(color, strokeWidth)} />
        <circle cx="6" cy="6" r="3" fill={secondaryColor} stroke={color} strokeWidth={strokeWidth} />
      </svg>
    ),
    solid: ({ size, color, structuralColor = "#581093" }) => (
      <svg width={size} height={size} viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <circle cx="18" cy="18" r="3" fill={color} stroke={structuralColor} strokeWidth={1} />
        <path d="M13 6h3a2 2 0 0 1 2 2v7M6 9v12" stroke={structuralColor} strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" />
        <circle cx="6" cy="6" r="3" fill={color} stroke={structuralColor} strokeWidth={1} />
      </svg>
    ),
  },
  delivery: {
    name: "delivery", label: "Delivery", category: "pm",
    outline: ({ size, color, strokeWidth = 1.75, secondaryColor = "var(--icon-fill, rgba(189,182,208,0.22))" }) => (
      <svg width={size} height={size} viewBox="0 0 24 24" aria-hidden="true">
        <path d="M16 8h4l3 3v5h-7V8z" {...S(color, strokeWidth)} />
        <circle cx="5.5" cy="18.5" r="2.5" {...S(color, strokeWidth)} />
        <circle cx="18.5" cy="18.5" r="2.5" {...S(color, strokeWidth)} />
        <rect width="14" height="11" x="2" y="6" rx="2" fill={secondaryColor} stroke={color} strokeWidth={strokeWidth} />
      </svg>
    ),
    solid: ({ size, color, structuralColor = "#581093" }) => (
      <svg width={size} height={size} viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <path d="M16 8h4l3 3v5h-7V8z" fill={structuralColor} stroke={color} strokeWidth={1} />
        <rect width="14" height="11" x="2" y="6" rx="2" fill={color} stroke={structuralColor} strokeWidth={1} />
        <circle cx="5.5" cy="18.5" r="2.5" fill={structuralColor} stroke={color} strokeWidth={1} />
        <circle cx="18.5" cy="18.5" r="2.5" fill={structuralColor} stroke={color} strokeWidth={1} />
      </svg>
    ),
  },
  // ?????? UTILITY ACTIONS ????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????
  home: {
    name: "home", label: "Home", category: "global",
    outline: ({ size, color, strokeWidth = 1.75, secondaryColor = "var(--icon-fill, rgba(189,182,208,0.22))" }) => (
      <svg width={size} height={size} viewBox="0 0 24 24" aria-hidden="true">
        <path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" {...S(color, strokeWidth)} />
        <rect x="9" y="14" width="6" height="7" rx="1" fill={secondaryColor} stroke={color} strokeWidth={strokeWidth} />
      </svg>
    ),
    solid: ({ size, color, structuralColor = "#581093" }) => (
      <svg width={size} height={size} viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" fill={color} stroke={structuralColor} strokeWidth={1} />
        <rect x="9" y="14" width="6" height="7" rx="1" fill={structuralColor} />
      </svg>
    ),
  },
  add: {
    name: "add", label: "Add", category: "global",
    outline: ({ size, color, strokeWidth = 1.75, secondaryColor = "var(--icon-fill, rgba(189,182,208,0.22))", accentColor = "#931CF5" }) => (
      <svg width={size} height={size} viewBox="0 0 24 24" aria-hidden="true">
        <circle cx="12" cy="12" r="9.5" fill={secondaryColor} stroke={color} strokeWidth={strokeWidth} />
        <line x1="12" y1="7.5" x2="12" y2="16.5" stroke={accentColor ?? color} strokeWidth={strokeWidth} strokeLinecap="round" />
        <line x1="7.5" y1="12" x2="16.5" y2="12" stroke={accentColor ?? color} strokeWidth={strokeWidth} strokeLinecap="round" />
      </svg>
    ),
    solid: ({ size, color, structuralColor = "#581093" }) => (
      <svg width={size} height={size} viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <circle cx="12" cy="12" r="9.5" fill={color} stroke={structuralColor} strokeWidth={1} />
        <line x1="12" y1="7.5" x2="12" y2="16.5" stroke={structuralColor} strokeWidth={2.4} strokeLinecap="round" />
        <line x1="7.5" y1="12" x2="16.5" y2="12" stroke={structuralColor} strokeWidth={2.4} strokeLinecap="round" />
      </svg>
    ),
  },
  edit: {
    name: "edit", label: "Edit", category: "global",
    outline: ({ size, color, strokeWidth = 1.75, secondaryColor = "var(--icon-fill, rgba(189,182,208,0.22))" }) => (
      <svg width={size} height={size} viewBox="0 0 24 24" aria-hidden="true">
        <path d="M17 3a2.85 2.83 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5Z" {...S(color, strokeWidth)} />
        <polygon points="2,22 7.5,20.5 3.5,16.5" fill={secondaryColor} stroke={color} strokeWidth={strokeWidth} strokeLinejoin="round" />
      </svg>
    ),
    solid: ({ size, color, structuralColor = "#581093" }) => (
      <svg width={size} height={size} viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <path d="M17 3a2.85 2.83 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5Z" fill={color} stroke={structuralColor} strokeWidth={1} />
        <polygon points="2,22 7.5,20.5 3.5,16.5" fill={structuralColor} />
      </svg>
    ),
  },
  delete: {
    name: "delete", label: "Delete", category: "global",
    outline: ({ size, color, strokeWidth = 1.75, secondaryColor = "var(--icon-fill, rgba(189,182,208,0.22))" }) => (
      <svg width={size} height={size} viewBox="0 0 24 24" aria-hidden="true">
        <path d="M3 6h18M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2" {...S(color, strokeWidth)} />
        <rect x="9.5" y="10" width="5" height="7" rx="1" fill={secondaryColor} stroke={color} strokeWidth={strokeWidth} />
      </svg>
    ),
    solid: ({ size, color, structuralColor = "#581093" }) => (
      <svg width={size} height={size} viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <path d="M3 6h18M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2" stroke={color} strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" />
        <rect x="9.5" y="10" width="5" height="7" rx="1" fill={structuralColor} />
      </svg>
    ),
  },
  security: {
    name: "security", label: "Security", category: "global",
    outline: ({ size, color, strokeWidth = 1.75, secondaryColor = "var(--icon-fill, rgba(189,182,208,0.22))", accentColor = "#931CF5" }) => (
      <svg width={size} height={size} viewBox="0 0 24 24" aria-hidden="true">
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" {...S(color, strokeWidth)} />
        <circle cx="12" cy="11.5" r="3.5" fill={secondaryColor} stroke={color} strokeWidth={strokeWidth} />
        <path d="m10.2 11.5 1.3 1.3 2.5-2.5" stroke={accentColor ?? color} strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" fill="none" />
      </svg>
    ),
    solid: ({ size, color, structuralColor = "#581093" }) => (
      <svg width={size} height={size} viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" fill={color} stroke={structuralColor} strokeWidth={1} strokeLinecap="round" strokeLinejoin="round" />
        <circle cx="12" cy="11.5" r="3.5" fill={structuralColor} stroke={color} strokeWidth={1} />
        <path d="m10.2 11.5 1.3 1.3 2.5-2.5" stroke={color} strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round" fill="none" />
      </svg>
    ),
  },
};
