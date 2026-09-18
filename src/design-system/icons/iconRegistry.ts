import type { IconDefinition, NavigationGroup, NavigationModuleItem } from "./iconTypes";
import { ICON_DEFINITIONS } from "./iconDefinitions";

/**
 * ─────────────────────────────────────────────────────────────────────────────
 * CANONICAL CONCEPT MAPPING TABLE
 * ─────────────────────────────────────────────────────────────────────────────
 * Enforces the core rule: ONE CONCEPT = ONE CANONICAL ICON.
 * Maps all legacy icon identifiers, route IDs, and UI variants to the single
 * canonical design token key.
 */
export const CANONICAL_CONCEPT_MAP: Record<string, string> = {
  // Global & Shared
  dashboard: "dashboard",
  overview: "dashboard",
  "my tasks": "tasks",
  tasks: "tasks",
  task: "tasks",
  checklist: "tasks",
  approvals: "approvals",
  approval: "approvals",
  task_alt: "approvals",
  calendar: "calendar",
  events: "calendar",
  schedule: "calendar",
  notes: "notes",
  description: "notes",
  notifications: "notifications",
  bell: "notifications",
  search: "search",
  filter: "filter",
  filter_list: "filter",
  announcements: "announcements",
  campaign: "announcements",
  help: "help",
  help_outline: "help",
  settings: "settings",
  hrsettings: "hrSettings",
  crmsettings: "settings",
  pmsettings: "settings",
  customize: "settings",
  operations: "operations",
  hub: "operations",
  reports: "reports",
  analytics: "reports",
  documents: "documents",
  docs: "documents",
  document: "documents",
  folders: "documents",
  folder: "documents",
  assets: "assets",
  inventory_2: "assets",
  requests: "requests",
  assignment: "requests",
  more: "more",
  more_horiz: "more",
  moreh: "more",
  home: "home",
  add: "add",
  plus: "add",
  edit: "edit",
  delete: "delete",
  security: "security",
  sop: "sop",

  // Shell Utilities
  "what's new": "whatsNew",
  "whats new": "whatsNew",
  whatsnew: "whatsNew",
  badgeinfo: "whatsNew",
  badge_info: "whatsNew",
  explore: "explore",
  rocket: "explore",
  apps: "apps",
  grid: "apps",
  grid2x2: "apps",
  "quick actions": "apps",
  sparkles: "sparkles",
  ai: "sparkles",

  // HRMS Concepts
  employees: "employees",
  groups: "employees",
  people: "employees",
  directory: "employees",
  "employee directory": "employees",
  "employeedirectory": "employees",
  workforce: "workforce",
  onboarding: "onboarding",
  onboard: "onboarding",
  person_add: "onboarding",
  leave: "leave",
  "leave tracker": "leave",
  event_busy: "leave",
  attendance: "attendance",
  "time tracker": "timeTracker",
  timetracker: "timeTracker",
  timer: "timeTracker",
  shifts: "shifts",
  "shift management": "shifts",
  date_range: "shifts",
  timesheets: "timesheets",
  payroll: "payroll",
  compensation: "compensation",
  benefits: "benefits",
  performance: "performance",
  perf: "performance",
  trending_up: "performance",
  goals: "goals",
  reviews: "reviews",
  learning: "learning",
  school: "learning",
  career: "career",
  route: "career",
  recruitment: "recruitment",
  recruit: "recruitment",
  work: "recruitment",
  candidates: "candidates",
  badge: "candidates",
  interviews: "interviews",
  event_available: "interviews",
  jobopenings: "jobOpenings",
  "job openings": "jobOpenings",
  offers: "offers",
  organization: "organization",
  account_tree: "organization",

  // CRM Concepts
  leads: "leads",
  contacts: "contacts",
  accounts: "accounts",
  deals: "deals",
  pipeline: "pipeline",
  campaigns: "campaigns",
  products: "products",
  quotes: "quotes",
  invoices: "invoices",
  support: "support",

  // Project Management (PM) Concepts
  projects: "projects",
  planning: "planning",
  milestones: "milestones",
  risks: "risks",
  issues: "issues",
  changes: "changes",
  delivery: "delivery",
};

/**
 * Resolves any semantic or legacy icon name to its canonical IconDefinition.
 */
export function getBezentIconDefinition(name: string): IconDefinition {
  const normalized = (name || "").toLowerCase().trim();
  const canonicalKey = CANONICAL_CONCEPT_MAP[normalized] || normalized;
  return ICON_DEFINITIONS[canonicalKey] ?? ICON_DEFINITIONS.dashboard;
}

/**
 * ─────────────────────────────────────────────────────────────────────────────
 * ENTERPRISE NAVIGATION CONFIGURATION
 * ─────────────────────────────────────────────────────────────────────────────
 * Fixed Primary Rail: 6 invariant slots.
 * Dynamic Slot: Position 7 (immediately above More), defaulting to Employees.
 */
export interface NavigationCatalogItem extends NavigationModuleItem {
  group: "people" | "workforce" | "development" | "administration";
  route?: string;
  permission?: string;
}

export const FIXED_PRIMARY_ITEMS: NavigationModuleItem[] = [
  {
    id: "Dashboard",
    label: "Dashboard",
    icon: "dashboard",
    subtitle: "Overview & Insights",
    supportsSubNavShell: true,
    route: "/dashboard",
  },
  {
    id: "Onboarding",
    label: "Onboarding",
    icon: "onboarding",
    subtitle: "Employee Onboarding",
    supportsSubNavShell: true,
    route: "/onboarding",
  },
  {
    id: "Leave Tracker",
    label: "Leave Tracker",
    icon: "leave",
    subtitle: "Leave Management",
    supportsSubNavShell: true,
    route: "/leave-tracker",
  },
  {
    id: "Attendance",
    label: "Attendance",
    icon: "attendance",
    subtitle: "Attendance Management",
    supportsSubNavShell: true,
    route: "/attendance",
  },
  {
    id: "Time Tracker",
    label: "Time Tracker",
    icon: "timeTracker",
    subtitle: "Time & Work Tracking",
    supportsSubNavShell: true,
    route: "/time-tracker",
  },
  {
    id: "Performance",
    label: "Performance",
    icon: "performance",
    subtitle: "Performance Management",
    supportsSubNavShell: true,
    route: "/performance",
  },
];

export const MORE_GROUP_DEFINITIONS: { id: "people" | "workforce" | "development" | "administration"; title: string }[] = [
  { id: "people",         title: "People & Talent" },
  { id: "workforce",      title: "Workforce" },
  { id: "development",    title: "Development" },
  { id: "administration", title: "Administration" },
];

export const MODULE_CATALOG: Record<string, NavigationCatalogItem> = {
  Employees: {
    id: "Employees",
    label: "Employees",
    icon: "employees",
    subtitle: "Employee Management",
    supportsSubNavShell: true,
    group: "people",
    route: "/employees",
  },
  Organization: {
    id: "Organization",
    label: "Organization",
    icon: "organization",
    subtitle: "Company Structure",
    supportsSubNavShell: true,
    group: "people",
    route: "/organization",
  },
  Recruitment: {
    id: "Recruitment",
    label: "Recruitment",
    icon: "recruitment",
    subtitle: "Talent Acquisition",
    supportsSubNavShell: true,
    group: "people",
    route: "/recruitment",
  },
  "Job Openings": {
    id: "Job Openings",
    label: "Job Openings",
    icon: "jobOpenings",
    group: "people",
    route: "/job-openings",
  },
  Candidates: {
    id: "Candidates",
    label: "Candidates",
    icon: "candidates",
    group: "people",
    route: "/candidates",
  },
  Interviews: {
    id: "Interviews",
    label: "Interviews",
    icon: "interviews",
    group: "people",
    route: "/interviews",
  },
  Offers: {
    id: "Offers",
    label: "Offers",
    icon: "offers",
    group: "people",
    route: "/offers",
  },
  Shifts: {
    id: "Shifts",
    label: "Shifts",
    icon: "shifts",
    group: "workforce",
    route: "/shifts",
  },
  Timesheets: {
    id: "Timesheets",
    label: "Timesheets",
    icon: "timesheets",
    group: "workforce",
    route: "/timesheets",
  },
  Payroll: {
    id: "Payroll",
    label: "Payroll",
    icon: "payroll",
    group: "workforce",
    route: "/payroll",
  },
  Compensation: {
    id: "Compensation",
    label: "Compensation",
    icon: "compensation",
    group: "workforce",
    route: "/compensation",
  },
  Benefits: {
    id: "Benefits",
    label: "Benefits",
    icon: "benefits",
    group: "workforce",
    route: "/benefits",
  },
  Workforce: {
    id: "Workforce",
    label: "Workforce Hub",
    icon: "workforce",
    group: "workforce",
    route: "/workforce",
  },
  Learning: {
    id: "Learning",
    label: "Learning",
    icon: "learning",
    group: "development",
    route: "/learning",
  },
  Career: {
    id: "Career",
    label: "Career Paths",
    icon: "career",
    group: "development",
    route: "/career",
  },
  Goals: {
    id: "Goals",
    label: "Goals & OKRs",
    icon: "goals",
    group: "development",
    route: "/goals",
  },
  Reviews: {
    id: "Reviews",
    label: "Appraisals",
    icon: "reviews",
    group: "development",
    route: "/reviews",
  },
  Documents: {
    id: "Documents",
    label: "Documents",
    icon: "documents",
    group: "administration",
    route: "/documents",
  },
  Assets: {
    id: "Assets",
    label: "Assets",
    icon: "assets",
    group: "administration",
    route: "/assets",
  },
  "Employee Requests": {
    id: "Employee Requests",
    label: "Employee Requests",
    icon: "requests",
    group: "administration",
    route: "/employee-requests",
  },
  Operations: {
    id: "Operations",
    label: "Operations",
    icon: "operations",
    group: "administration",
    route: "/operations",
  },
  Reports: {
    id: "Reports",
    label: "Reports",
    icon: "reports",
    group: "administration",
    route: "/reports",
  },
  Settings: {
    id: "Settings",
    label: "HR Settings",
    icon: "hrSettings",
    group: "administration",
    route: "/settings",
  },
  SOP: {
    id: "SOP",
    label: "Standard Ops",
    icon: "sop",
    group: "administration",
    route: "/sop",
  },
};

export function isModulePermitted(moduleId: string, userRole?: string): boolean {
  const item = MODULE_CATALOG[moduleId];
  if (!item) return false;
  if (item.permission && userRole && userRole !== "admin") {
    return false;
  }
  return true;
}

export function getMoreNavigationGroups(currentDynamicModuleId: string): NavigationGroup[] {
  return MORE_GROUP_DEFINITIONS.map(groupDef => {
    const items = Object.values(MODULE_CATALOG).filter(
      item => item.group === groupDef.id && item.id !== currentDynamicModuleId && isModulePermitted(item.id)
    );
    return {
      id: groupDef.id,
      title: groupDef.title,
      items,
    };
  }).filter(group => group.items.length > 0);
}

export const HRMS_PRIMARY_RAIL: NavigationModuleItem[] = [
  ...FIXED_PRIMARY_ITEMS,
  MODULE_CATALOG.Employees,
];

export const HRMS_MORE_GROUPS: NavigationGroup[] = getMoreNavigationGroups("Employees");

/**
 * Resolves the parent module item for a given child item ID or route path.
 */
export function getParentModuleForChild(childIdOrRoute: string): NavigationModuleItem | null {
  if (!childIdOrRoute) return null;
  const normalized = childIdOrRoute.toLowerCase().replace(/^#\/?/, "").replace(/^\//, "").trim();

  // 1. Check in FIXED_PRIMARY_ITEMS
  for (const item of FIXED_PRIMARY_ITEMS) {
    if (item.children) {
      for (const child of item.children) {
        if (
          child.id.toLowerCase() === normalized ||
          child.route.toLowerCase().replace(/^\//, "") === normalized ||
          child.label.toLowerCase() === normalized
        ) {
          return item;
        }
      }
    }
  }

  // 2. Check in MODULE_CATALOG
  for (const item of Object.values(MODULE_CATALOG)) {
    if (item.children) {
      for (const child of item.children) {
        if (
          child.id.toLowerCase() === normalized ||
          child.route.toLowerCase().replace(/^\//, "") === normalized ||
          child.label.toLowerCase() === normalized
        ) {
          return item;
        }
      }
    }
  }

  return null;
}

/**
 * Determines whether a sidebar module is active, either directly or because
 * one of its sub-navigation children is active.
 */
export function isParentModuleActive(
  moduleId: string,
  activeModuleId: string,
  activeChildId?: string | null
): boolean {
  if (activeModuleId === moduleId) return true;
  if (activeChildId) {
    const parent = getParentModuleForChild(activeChildId);
    if (parent && parent.id === moduleId) return true;
  }
  return false;
}
