import { FilterChipConfig, SearchModuleKey, SearchResultItem, ContextSuggestion } from "./searchTypes";

export function getSearchModuleKey(input?: string): SearchModuleKey {
  if (!input) return "dashboard";
  const s = input.toLowerCase().replace(/^[#/]+/, "").replace(/\s+/g, "-").trim();
  if (s.includes("employee") || s.includes("people") || s.includes("directory")) return "employees";
  if (s.includes("attendance")) return "attendance";
  if (s.includes("leave") || s.includes("timeoff") || s.includes("holiday")) return "leave-tracker";
  if (s.includes("time") || s.includes("timesheet")) return "time-tracker";
  if (s.includes("performance") || s.includes("goal") || s.includes("appraisal") || s.includes("review")) return "performance";
  if (s.includes("benefit") || s.includes("insurance") || s.includes("claim")) return "benefits";
  if (s.includes("asset") || s.includes("inventory")) return "assets";
  if (s.includes("onboarding") || s.includes("joiner")) return "onboarding";
  if (s.includes("payroll") || s.includes("salary") || s.includes("compensation")) return "payroll";
  if (s.includes("workforce")) return "workforce";
  if (s.includes("recruitment") || s.includes("candidate") || s.includes("interview")) return "recruitment";
  return "dashboard";
}

export function getModuleDisplayName(key: SearchModuleKey): string {
  switch (key) {
    case "employees": return "Employees";
    case "attendance": return "Attendance";
    case "leave-tracker": return "Leave Tracker";
    case "time-tracker": return "Time Tracker";
    case "performance": return "Performance";
    case "benefits": return "Benefits";
    case "assets": return "Assets";
    case "onboarding": return "Onboarding";
    case "payroll": return "Payroll";
    case "workforce": return "Workforce";
    case "recruitment": return "Recruitment";
    case "dashboard": return "Dashboard";
    default: return "BEZENT";
  }
}

// ─── CONTEXTUAL FILTER CHIPS ──────────────────────────────────────────────────

export const MODULE_FILTER_CONFIGS: Record<SearchModuleKey, FilterChipConfig[]> = {
  employees: [
    {
      id: "department",
      label: "Department",
      options: [
        { label: "All Departments", value: "all" },
        { label: "Product Design", value: "Product Design" },
        { label: "Engineering", value: "Engineering" },
        { label: "Human Resources", value: "Human Resources" },
        { label: "Product Management", value: "Product Management" },
        { label: "Security & Compliance", value: "Security & Compliance" },
      ],
    },
    {
      id: "status",
      label: "Status",
      options: [
        { label: "All Statuses", value: "all" },
        { label: "Active", value: "Active" },
        { label: "On Leave", value: "On Leave" },
        { label: "Probation", value: "Probation" },
      ],
    },
    {
      id: "location",
      label: "Location",
      options: [
        { label: "All Locations", value: "all" },
        { label: "New York", value: "New York" },
        { label: "Bangalore", value: "Bangalore" },
        { label: "Chennai", value: "Chennai" },
        { label: "San Francisco", value: "San Francisco" },
        { label: "London", value: "London" },
      ],
    },
    {
      id: "created_by",
      label: "Created by",
      options: [
        { label: "Anyone", value: "all" },
        { label: "HR Admin", value: "HR Admin" },
        { label: "System Sync", value: "System Sync" },
      ],
    },
  ],

  attendance: [
    {
      id: "date",
      label: "Date",
      options: [
        { label: "Today", value: "Today" },
        { label: "Yesterday", value: "Yesterday" },
        { label: "This Week", value: "This Week" },
        { label: "Last 30 Days", value: "Last 30 Days" },
      ],
    },
    {
      id: "employee",
      label: "Employee",
      options: [
        { label: "All Employees", value: "all" },
        { label: "Mukesh Murugavel", value: "Mukesh" },
        { label: "Sarah Sanders", value: "Sarah" },
        { label: "Arun Kumar", value: "Arun" },
      ],
    },
    {
      id: "department",
      label: "Department",
      options: [
        { label: "All Departments", value: "all" },
        { label: "Engineering", value: "Engineering" },
        { label: "Product Design", value: "Product Design" },
        { label: "Operations", value: "Operations" },
      ],
    },
    {
      id: "status",
      label: "Status",
      options: [
        { label: "All Records", value: "all" },
        { label: "Present", value: "Present" },
        { label: "Late Arrival", value: "Late" },
        { label: "Missing Check-out", value: "Missing" },
        { label: "Regularization Pending", value: "Regularization" },
      ],
    },
  ],

  "leave-tracker": [
    {
      id: "leave_type",
      label: "Leave Type",
      options: [
        { label: "All Types", value: "all" },
        { label: "Casual Leave", value: "Casual" },
        { label: "Paid Time Off", value: "PTO" },
        { label: "Sick Leave", value: "Sick" },
        { label: "Maternity / Paternity", value: "Maternity" },
      ],
    },
    {
      id: "status",
      label: "Status",
      options: [
        { label: "All Statuses", value: "all" },
        { label: "Pending", value: "Pending" },
        { label: "Approved", value: "Approved" },
        { label: "Rejected", value: "Rejected" },
      ],
    },
    {
      id: "date",
      label: "Date",
      options: [
        { label: "Upcoming", value: "Upcoming" },
        { label: "This Month", value: "This Month" },
        { label: "Past Records", value: "Past" },
      ],
    },
    {
      id: "employee",
      label: "Employee",
      options: [
        { label: "All Employees", value: "all" },
        { label: "My Requests", value: "My" },
        { label: "Team Members", value: "Team" },
      ],
    },
  ],

  "time-tracker": [
    {
      id: "date",
      label: "Date",
      options: [
        { label: "Today", value: "Today" },
        { label: "This Week", value: "This Week" },
        { label: "Current Month", value: "Current Month" },
      ],
    },
    {
      id: "employee",
      label: "Employee",
      options: [
        { label: "All Staff", value: "all" },
        { label: "My Timers", value: "My" },
        { label: "Engineering Team", value: "Engineering" },
      ],
    },
    {
      id: "project",
      label: "Project",
      options: [
        { label: "All Projects", value: "all" },
        { label: "SaaS Navigation Core", value: "Core" },
        { label: "Design System 2.0", value: "Design" },
        { label: "HR Portal Refactor", value: "Portal" },
      ],
    },
    {
      id: "status",
      label: "Status",
      options: [
        { label: "All Statuses", value: "all" },
        { label: "Submitted", value: "Submitted" },
        { label: "Approved", value: "Approved" },
        { label: "Missing", value: "Missing" },
      ],
    },
  ],

  performance: [
    {
      id: "cycle",
      label: "Cycle",
      options: [
        { label: "Current Q3 2026", value: "Q3" },
        { label: "Annual 2026", value: "Annual" },
        { label: "H1 Review", value: "H1" },
      ],
    },
    {
      id: "employee",
      label: "Employee",
      options: [
        { label: "All Employees", value: "all" },
        { label: "Direct Reports", value: "Direct" },
        { label: "Self Evaluation", value: "Self" },
      ],
    },
    {
      id: "department",
      label: "Department",
      options: [
        { label: "All Departments", value: "all" },
        { label: "Engineering", value: "Engineering" },
        { label: "Product Design", value: "Design" },
      ],
    },
    {
      id: "status",
      label: "Status",
      options: [
        { label: "All Stages", value: "all" },
        { label: "Self-Review", value: "Self-Review" },
        { label: "Manager Review", value: "Manager" },
        { label: "Completed", value: "Completed" },
      ],
    },
  ],

  benefits: [
    {
      id: "benefit_type",
      label: "Benefit Type",
      options: [
        { label: "All Benefits", value: "all" },
        { label: "Health Insurance", value: "Health" },
        { label: "Wellness Allowance", value: "Wellness" },
        { label: "Dental & Vision", value: "Dental" },
      ],
    },
    {
      id: "employee",
      label: "Employee",
      options: [
        { label: "All Employees", value: "all" },
        { label: "Enrolled Only", value: "Enrolled" },
        { label: "Pending Enrollment", value: "Pending" },
      ],
    },
    {
      id: "status",
      label: "Status",
      options: [
        { label: "All Statuses", value: "all" },
        { label: "Active", value: "Active" },
        { label: "Claim Pending", value: "Claim Pending" },
      ],
    },
    {
      id: "year",
      label: "Year",
      options: [
        { label: "2026", value: "2026" },
        { label: "2025", value: "2025" },
      ],
    },
  ],

  assets: [
    {
      id: "asset_type",
      label: "Asset Type",
      options: [
        { label: "All Types", value: "all" },
        { label: "Laptops", value: "Laptop" },
        { label: "Monitors", value: "Monitor" },
        { label: "Peripherals", value: "Peripherals" },
      ],
    },
    {
      id: "status",
      label: "Status",
      options: [
        { label: "All Statuses", value: "all" },
        { label: "Assigned", value: "Assigned" },
        { label: "Available", value: "Available" },
        { label: "Under Repair", value: "Repair" },
      ],
    },
    {
      id: "employee",
      label: "Employee",
      options: [
        { label: "All Users", value: "all" },
        { label: "Mukesh Murugavel", value: "Mukesh" },
        { label: "Sarah Sanders", value: "Sarah" },
      ],
    },
    {
      id: "location",
      label: "Location",
      options: [
        { label: "All Hubs", value: "all" },
        { label: "Bangalore Tech Hub", value: "Bangalore" },
        { label: "New York HQ", value: "New York" },
        { label: "Remote", value: "Remote" },
      ],
    },
  ],

  onboarding: [
    {
      id: "status",
      label: "Status",
      options: [
        { label: "All Stages", value: "all" },
        { label: "In Progress", value: "In Progress" },
        { label: "Pending Verification", value: "Pending" },
        { label: "Completed", value: "Completed" },
      ],
    },
    {
      id: "department",
      label: "Department",
      options: [
        { label: "All Departments", value: "all" },
        { label: "Engineering", value: "Engineering" },
        { label: "Product Design", value: "Design" },
        { label: "Marketing", value: "Marketing" },
      ],
    },
    {
      id: "joining_date",
      label: "Joining Date",
      options: [
        { label: "September 2026", value: "Sep" },
        { label: "October 2026", value: "Oct" },
        { label: "Q4 2026", value: "Q4" },
      ],
    },
    {
      id: "assigned_to",
      label: "Assigned To",
      options: [
        { label: "All Coordinators", value: "all" },
        { label: "Priya S (HR)", value: "Priya" },
        { label: "David Miller", value: "David" },
      ],
    },
  ],

  dashboard: [
    {
      id: "module",
      label: "Module",
      options: [
        { label: "All Modules", value: "all" },
        { label: "Employees", value: "employees" },
        { label: "Attendance", value: "attendance" },
        { label: "Leave Tracker", value: "leave-tracker" },
        { label: "Assets", value: "assets" },
      ],
    },
    {
      id: "status",
      label: "Status",
      options: [
        { label: "All Records", value: "all" },
        { label: "Active", value: "Active" },
        { label: "Pending", value: "Pending" },
      ],
    },
    {
      id: "date",
      label: "Date",
      options: [
        { label: "Recent", value: "Recent" },
        { label: "This Month", value: "Month" },
      ],
    },
  ],

  payroll: [
    {
      id: "cycle",
      label: "Cycle",
      options: [
        { label: "September 2026", value: "Sep" },
        { label: "August 2026", value: "Aug" },
      ],
    },
    {
      id: "status",
      label: "Status",
      options: [
        { label: "All", value: "all" },
        { label: "Processed", value: "Processed" },
        { label: "Pending Review", value: "Pending" },
      ],
    },
  ],

  workforce: [
    {
      id: "department",
      label: "Department",
      options: [
        { label: "All", value: "all" },
        { label: "Engineering", value: "Engineering" },
        { label: "Product", value: "Product" },
      ],
    },
  ],

  recruitment: [
    {
      id: "stage",
      label: "Stage",
      options: [
        { label: "All Stages", value: "all" },
        { label: "Screening", value: "Screening" },
        { label: "Interview", value: "Interview" },
        { label: "Offered", value: "Offered" },
      ],
    },
  ],

  general: [
    {
      id: "scope",
      label: "Scope",
      options: [
        { label: "All BEZENT", value: "all" },
        { label: "Recent Items", value: "recent" },
      ],
    },
  ],
};

// ─── CONTEXTUAL SUGGESTIONS (EMPTY QUERY) ────────────────────────────────────

export const MODULE_SUGGESTIONS: Record<SearchModuleKey, ContextSuggestion[]> = {
  employees: [
    { id: "e-sug-1", label: "Recently viewed employees", icon: "user-check", moduleKey: "employees", sourceModuleLabel: "Employees", actionQuery: "Active" },
    { id: "e-sug-2", label: "New employees", icon: "user-plus", moduleKey: "employees", sourceModuleLabel: "Employees", actionQuery: "Sarah" },
    { id: "e-sug-3", label: "Employee profiles", icon: "user", moduleKey: "employees", sourceModuleLabel: "Employees", actionQuery: "EMP-" },
    { id: "e-sug-4", label: "Departments", icon: "briefcase", moduleKey: "employees", sourceModuleLabel: "Employees", actionQuery: "Product Design" },
    { id: "e-sug-5", label: "Reporting managers", icon: "users", moduleKey: "employees", sourceModuleLabel: "Employees", actionQuery: "Manager" },
  ],

  attendance: [
    { id: "a-sug-1", label: "Today's attendance", icon: "calendar", moduleKey: "attendance", sourceModuleLabel: "Attendance", actionQuery: "Today" },
    { id: "a-sug-2", label: "Late arrivals", icon: "alert-circle", moduleKey: "attendance", sourceModuleLabel: "Attendance", actionQuery: "Late" },
    { id: "a-sug-3", label: "Missing check-outs", icon: "clock", moduleKey: "attendance", sourceModuleLabel: "Attendance", actionQuery: "Missing" },
    { id: "a-sug-4", label: "Regularization requests", icon: "file-text", moduleKey: "attendance", sourceModuleLabel: "Attendance", actionQuery: "Regularization" },
    { id: "a-sug-5", label: "Attendance policy", icon: "shield", moduleKey: "attendance", sourceModuleLabel: "Attendance", actionQuery: "Policy" },
  ],

  "leave-tracker": [
    { id: "l-sug-1", label: "My leave requests", icon: "user", moduleKey: "leave-tracker", sourceModuleLabel: "Leave", actionQuery: "My leave" },
    { id: "l-sug-2", label: "Pending leave requests", icon: "clock", moduleKey: "leave-tracker", sourceModuleLabel: "Leave", actionQuery: "Pending" },
    { id: "l-sug-3", label: "Upcoming leaves", icon: "calendar", moduleKey: "leave-tracker", sourceModuleLabel: "Leave", actionQuery: "Upcoming" },
    { id: "l-sug-4", label: "Leave policies", icon: "book-open", moduleKey: "leave-tracker", sourceModuleLabel: "Leave", actionQuery: "Policy" },
    { id: "l-sug-5", label: "Holiday calendar 2026", icon: "calendar-days", moduleKey: "leave-tracker", sourceModuleLabel: "Leave", actionQuery: "Holiday" },
  ],

  "time-tracker": [
    { id: "t-sug-1", label: "Today's time logs", icon: "clock", moduleKey: "time-tracker", sourceModuleLabel: "Time Tracker", actionQuery: "Today" },
    { id: "t-sug-2", label: "Missing time entries", icon: "alert-triangle", moduleKey: "time-tracker", sourceModuleLabel: "Time Tracker", actionQuery: "Missing" },
    { id: "t-sug-3", label: "Weekly timesheets", icon: "file-spreadsheet", moduleKey: "time-tracker", sourceModuleLabel: "Time Tracker", actionQuery: "Timesheet" },
    { id: "t-sug-4", label: "Overtime records", icon: "trending-up", moduleKey: "time-tracker", sourceModuleLabel: "Time Tracker", actionQuery: "Overtime" },
    { id: "t-sug-5", label: "Recent timers", icon: "play-circle", moduleKey: "time-tracker", sourceModuleLabel: "Time Tracker", actionQuery: "Timer" },
  ],

  performance: [
    { id: "p-sug-1", label: "Performance reviews", icon: "award", moduleKey: "performance", sourceModuleLabel: "Performance", actionQuery: "Review" },
    { id: "p-sug-2", label: "Goals & OKRs", icon: "target", moduleKey: "performance", sourceModuleLabel: "Performance", actionQuery: "Goals" },
    { id: "p-sug-3", label: "Appraisals 2026", icon: "file-check", moduleKey: "performance", sourceModuleLabel: "Performance", actionQuery: "Appraisal" },
    { id: "p-sug-4", label: "360 Peer Feedback", icon: "message-square", moduleKey: "performance", sourceModuleLabel: "Performance", actionQuery: "Feedback" },
    { id: "p-sug-5", label: "Review cycles", icon: "refresh-cw", moduleKey: "performance", sourceModuleLabel: "Performance", actionQuery: "Cycle" },
  ],

  benefits: [
    { id: "b-sug-1", label: "Benefit plans", icon: "heart", moduleKey: "benefits", sourceModuleLabel: "Benefits", actionQuery: "Plan" },
    { id: "b-sug-2", label: "Employee enrollments", icon: "check-circle", moduleKey: "benefits", sourceModuleLabel: "Benefits", actionQuery: "Enrollment" },
    { id: "b-sug-3", label: "Health insurance", icon: "shield", moduleKey: "benefits", sourceModuleLabel: "Benefits", actionQuery: "Insurance" },
    { id: "b-sug-4", label: "Wellness allowances", icon: "smile", moduleKey: "benefits", sourceModuleLabel: "Benefits", actionQuery: "Allowance" },
    { id: "b-sug-5", label: "Pending claims", icon: "file-text", moduleKey: "benefits", sourceModuleLabel: "Benefits", actionQuery: "Claim" },
  ],

  assets: [
    { id: "ast-sug-1", label: "Recently assigned assets", icon: "laptop", moduleKey: "assets", sourceModuleLabel: "Assets", actionQuery: "Assigned" },
    { id: "ast-sug-2", label: "Available assets", icon: "box", moduleKey: "assets", sourceModuleLabel: "Assets", actionQuery: "Available" },
    { id: "ast-sug-3", label: "Asset requests", icon: "inbox", moduleKey: "assets", sourceModuleLabel: "Assets", actionQuery: "Request" },
    { id: "ast-sug-4", label: "Asset returns", icon: "corner-down-left", moduleKey: "assets", sourceModuleLabel: "Assets", actionQuery: "Return" },
    { id: "ast-sug-5", label: "Hardware inventory", icon: "monitor", moduleKey: "assets", sourceModuleLabel: "Assets", actionQuery: "Hardware" },
  ],

  onboarding: [
    { id: "onb-sug-1", label: "New joiners", icon: "user-plus", moduleKey: "onboarding", sourceModuleLabel: "Onboarding", actionQuery: "New joiners" },
    { id: "onb-sug-2", label: "Pending onboarding", icon: "clock", moduleKey: "onboarding", sourceModuleLabel: "Onboarding", actionQuery: "Pending" },
    { id: "onb-sug-3", label: "Onboarding checklists", icon: "check-square", moduleKey: "onboarding", sourceModuleLabel: "Onboarding", actionQuery: "Checklist" },
    { id: "onb-sug-4", label: "Document verification", icon: "file-text", moduleKey: "onboarding", sourceModuleLabel: "Onboarding", actionQuery: "Verification" },
    { id: "onb-sug-5", label: "Joining tasks", icon: "list-todo", moduleKey: "onboarding", sourceModuleLabel: "Onboarding", actionQuery: "Tasks" },
  ],

  dashboard: [
    { id: "d-sug-1", label: "Sarah Sanders (Product Design)", icon: "user", moduleKey: "employees", sourceModuleLabel: "Employees", actionQuery: "Sarah Sanders" },
    { id: "d-sug-2", label: "Today's attendance summary", icon: "calendar", moduleKey: "attendance", sourceModuleLabel: "Attendance", actionQuery: "Attendance" },
    { id: "d-sug-3", label: "Engineering headcount report", icon: "bar-chart-2", moduleKey: "workforce", sourceModuleLabel: "Reports", actionQuery: "Report" },
    { id: "d-sug-4", label: "Leave policy handbook", icon: "book-open", moduleKey: "leave-tracker", sourceModuleLabel: "Leave", actionQuery: "Leave Policy" },
    { id: "d-sug-5", label: "Active hardware inventory", icon: "laptop", moduleKey: "assets", sourceModuleLabel: "Assets", actionQuery: "MacBook" },
  ],

  payroll: [
    { id: "pay-sug-1", label: "September payroll summary", icon: "dollar-sign", moduleKey: "payroll", actionQuery: "September" },
    { id: "pay-sug-2", label: "Tax compliance reports", icon: "file-text", moduleKey: "payroll", actionQuery: "Tax" },
  ],

  workforce: [
    { id: "wf-sug-1", label: "Headcount distribution", icon: "pie-chart", moduleKey: "workforce", actionQuery: "Headcount" },
    { id: "wf-sug-2", label: "Department org chart", icon: "git-merge", moduleKey: "workforce", actionQuery: "Chart" },
  ],

  recruitment: [
    { id: "rec-sug-1", label: "Active job openings", icon: "briefcase", moduleKey: "recruitment", actionQuery: "Openings" },
    { id: "rec-sug-2", label: "Candidate pipeline", icon: "users", moduleKey: "recruitment", actionQuery: "Candidates" },
  ],

  general: [
    { id: "gen-sug-1", label: "Search across BEZENT", icon: "search", moduleKey: "dashboard", actionQuery: "" },
  ],
};

// ─── MASTER DATABASE OF SEARCHABLE RECORDS ────────────────────────────────────

export const ALL_SEARCH_RECORDS: SearchResultItem[] = [
  // ── EMPLOYEES
  {
    id: "emp-1",
    title: "Sarah Sanders",
    subtitle: "EMP-1042 • Product Design • Lead Designer",
    module: "Employees",
    moduleKey: "employees",
    targetRoute: "employees",
    icon: "user",
    badge: { text: "Active", color: "#1B7F4F", bg: "#EAFAF2" },
    metaRight: "New York",
    tags: ["Sarah", "Sanders", "Product Design", "EMP-1042", "Lead", "Designer", "Active"],
    isRecent: true,
  },
  {
    id: "emp-2",
    title: "Arun Kumar",
    subtitle: "EMP-1085 • Engineering • Staff Architect",
    module: "Employees",
    moduleKey: "employees",
    targetRoute: "employees",
    icon: "user",
    badge: { text: "Active", color: "#1B7F4F", bg: "#EAFAF2" },
    metaRight: "Bangalore",
    tags: ["Arun", "Kumar", "Engineering", "EMP-1085", "Staff", "Architect", "Active"],
    isRecent: true,
  },
  {
    id: "emp-3",
    title: "Priya S",
    subtitle: "EMP-1124 • Human Resources • People Partner",
    module: "Employees",
    moduleKey: "employees",
    targetRoute: "employees",
    icon: "user",
    badge: { text: "Active", color: "#1B7F4F", bg: "#EAFAF2" },
    metaRight: "Chennai",
    tags: ["Priya", "S", "Human Resources", "HR", "EMP-1124", "People Partner", "Active"],
    isRecent: true,
  },
  {
    id: "emp-4",
    title: "Mukesh Murugavel",
    subtitle: "EMP-1042 • Product Design • Senior Specialist",
    module: "Employees",
    moduleKey: "employees",
    targetRoute: "employees",
    icon: "user",
    badge: { text: "Active", color: "#1B7F4F", bg: "#EAFAF2" },
    metaRight: "EMP-1042",
    tags: ["Mukesh", "Murugavel", "Product Design", "EMP-1042", "Profile", "Senior Specialist", "Active"],
    isRecent: true,
  },
  {
    id: "emp-5",
    title: "David Miller",
    subtitle: "EMP-1019 • Product Management • Group PM",
    module: "Employees",
    moduleKey: "employees",
    targetRoute: "employees",
    icon: "user",
    badge: { text: "Active", color: "#1B7F4F", bg: "#EAFAF2" },
    metaRight: "San Francisco",
    tags: ["David", "Miller", "Product Management", "EMP-1019", "GPM", "Active"],
  },
  {
    id: "emp-6",
    title: "Elena Rostova",
    subtitle: "EMP-1150 • QA & Testing • Test Automation Lead",
    module: "Employees",
    moduleKey: "employees",
    targetRoute: "employees",
    icon: "user",
    badge: { text: "On Leave", color: "#7A5A00", bg: "#FFF8E0" },
    metaRight: "Berlin",
    tags: ["Elena", "Rostova", "QA", "Testing", "EMP-1150", "Leave", "On Leave"],
  },
  {
    id: "emp-7",
    title: "Marcus Vance",
    subtitle: "EMP-1090 • Security & Compliance • CISO Specialist",
    module: "Employees",
    moduleKey: "employees",
    targetRoute: "employees",
    icon: "user",
    badge: { text: "Active", color: "#1B7F4F", bg: "#EAFAF2" },
    metaRight: "London",
    tags: ["Marcus", "Vance", "Security", "Compliance", "EMP-1090", "CISO", "Active"],
  },

  // ── ATTENDANCE
  {
    id: "att-1",
    title: "Mukesh Murugavel — Today's Log",
    subtitle: "09:02 AM — Present • Bangalore Tech Hub",
    module: "Attendance",
    moduleKey: "attendance",
    targetRoute: "attendance",
    icon: "clock",
    badge: { text: "Present", color: "#1B7F4F", bg: "#EAFAF2" },
    metaRight: "09:02 AM",
    tags: ["Mukesh", "Murugavel", "Today", "Attendance", "Check-in", "Log", "Present", "On Time"],
    isRecent: true,
  },
  {
    id: "att-1b",
    title: "Mukesh Murugavel — Monthly Attendance",
    subtitle: "September 2026 • 21 days present • 0 late marks",
    module: "Attendance",
    moduleKey: "attendance",
    targetRoute: "attendance",
    icon: "calendar",
    badge: { text: "100% Present", color: "#1B7F4F", bg: "#EAFAF2" },
    metaRight: "Sep 2026",
    tags: ["Mukesh", "Murugavel", "Monthly", "Attendance", "September", "Present"],
    isRecent: true,
  },
  {
    id: "att-2",
    title: "Today's Attendance Summary",
    subtitle: "142 Checked In • 8 Late Arrivals • 4 On Leave",
    module: "Attendance",
    moduleKey: "attendance",
    targetRoute: "attendance",
    icon: "calendar",
    badge: { text: "92% Present", color: "#1B7F4F", bg: "#EAFAF2" },
    metaRight: "Today",
    tags: ["Attendance", "Summary", "Present", "Today", "Late", "Checked In"],
    isRecent: true,
  },
  {
    id: "att-3",
    title: "Late Arrivals Flagged",
    subtitle: "8 employees clocked in past 09:30 AM grace window",
    module: "Attendance",
    moduleKey: "attendance",
    targetRoute: "attendance",
    icon: "alert-circle",
    badge: { text: "Action Needed", color: "#7A5A00", bg: "#FFF8E0" },
    metaRight: "Today",
    tags: ["Late", "Arrivals", "Grace", "Attendance", "Clocked in"],
  },
  {
    id: "att-4",
    title: "Missing Check-outs Queue",
    subtitle: "Yesterday: 3 unclosed shifts flagged for auto-regularization",
    module: "Attendance",
    moduleKey: "attendance",
    targetRoute: "attendance",
    icon: "clock",
    badge: { text: "Review", color: "#7A5A00", bg: "#FFF8E0" },
    metaRight: "Yesterday",
    tags: ["Missing", "Check-outs", "Unclosed shifts", "Regularization", "Attendance"],
  },
  {
    id: "att-5",
    title: "Regularization Request — Priya S",
    subtitle: "WFH remote punch reconciliation request for Sep 17",
    module: "Attendance",
    moduleKey: "attendance",
    targetRoute: "attendance",
    icon: "file-text",
    badge: { text: "Pending HR", color: "#931CF5", bg: "#F5EEFD" },
    metaRight: "Sep 17",
    tags: ["Regularization", "Priya", "WFH", "Punch", "Request", "Pending"],
  },
  {
    id: "att-6",
    title: "Attendance Policy Handbook 2026",
    subtitle: "9-hour standard shift, biometric logging & grace windows",
    module: "Attendance",
    moduleKey: "attendance",
    targetRoute: "attendance",
    icon: "shield",
    metaRight: "Doc",
    tags: ["Policy", "Handbook", "Biometric", "Grace", "Rules", "Attendance"],
  },

  // ── LEAVE TRACKER
  {
    id: "lv-1",
    title: "My Leave Requests",
    subtitle: "Casual Leave • 24 Sep – 26 Sep (3 days) • Trip",
    module: "Leave Tracker",
    moduleKey: "leave-tracker",
    targetRoute: "leave-tracker",
    icon: "calendar",
    badge: { text: "Approved", color: "#1B7F4F", bg: "#EAFAF2" },
    metaRight: "24-26 Sep",
    tags: ["Leave", "Casual", "Request", "Approved", "My leave"],
    isRecent: true,
  },
  {
    id: "lv-2",
    title: "Pending Leave Requests — Marcus Vance",
    subtitle: "Annual Leave (5 days) • Awaiting manager signoff",
    module: "Leave Tracker",
    moduleKey: "leave-tracker",
    targetRoute: "leave-tracker",
    icon: "clock",
    badge: { text: "Pending", color: "#7A5A00", bg: "#FFF8E0" },
    metaRight: "Oct 12",
    tags: ["Marcus", "Leave", "Annual", "Pending", "Requests"],
  },
  {
    id: "lv-3",
    title: "Upcoming Leaves — Elena Rostova",
    subtitle: "Maternity Leave • Oct 01, 2026 – Jan 05, 2027",
    module: "Leave Tracker",
    moduleKey: "leave-tracker",
    targetRoute: "leave-tracker",
    icon: "calendar-days",
    badge: { text: "Scheduled", color: "#1B7F4F", bg: "#EAFAF2" },
    metaRight: "Q4 2026",
    tags: ["Elena", "Maternity", "Upcoming", "Leaves", "Scheduled"],
  },
  {
    id: "lv-4",
    title: "Holiday Calendar 2026",
    subtitle: "14 official public holidays & optional religious holidays",
    module: "Leave Tracker",
    moduleKey: "leave-tracker",
    targetRoute: "leave-tracker",
    icon: "calendar-check",
    metaRight: "14 Days",
    tags: ["Holiday", "Calendar", "Public", "Leaves", "Tracker"],
  },
  {
    id: "lv-5",
    title: "Leave Policy & Carryover Rules",
    subtitle: "Max 8 days PTO carryover to 2027 • Encashment guidelines",
    module: "Leave Tracker",
    moduleKey: "leave-tracker",
    targetRoute: "leave-tracker",
    icon: "book-open",
    metaRight: "HR Policy",
    tags: ["Policy", "Carryover", "PTO", "Encashment", "Leave"],
  },

  // ── TIME TRACKER
  {
    id: "tt-1",
    title: "Today's Time Logs",
    subtitle: "5.5 hrs recorded • Active timer: SaaS Shell UI Engine",
    module: "Time Tracker",
    moduleKey: "time-tracker",
    targetRoute: "time-tracker",
    icon: "play-circle",
    badge: { text: "Tracking", color: "#931CF5", bg: "#F5EEFD" },
    metaRight: "Today",
    tags: ["Today", "Time logs", "Active timer", "Tracking", "Shell"],
    isRecent: true,
  },
  {
    id: "tt-1b",
    title: "Mukesh Murugavel — Today's Time Log",
    subtitle: "7h 42m recorded • Active task: SaaS Navigation Core",
    module: "Time Tracker",
    moduleKey: "time-tracker",
    targetRoute: "time-tracker",
    icon: "play-circle",
    badge: { text: "7h 42m", color: "#931CF5", bg: "#F5EEFD" },
    metaRight: "7h 42m",
    tags: ["Mukesh", "Murugavel", "Today", "Time Log", "Tracking", "Core"],
    isRecent: true,
  },
  {
    id: "tt-2",
    title: "Missing Time Entries — Week 38",
    subtitle: "6 engineers with incomplete daily logs (<30 hrs)",
    module: "Time Tracker",
    moduleKey: "time-tracker",
    targetRoute: "time-tracker",
    icon: "alert-triangle",
    badge: { text: "6 Missing", color: "#B03B2E", bg: "#FDECEA" },
    metaRight: "Review",
    tags: ["Missing", "Entries", "Week 38", "Timesheet", "Engineers"],
  },
  {
    id: "tt-3",
    title: "Weekly Timesheets — Sprint 42",
    subtitle: "Engineering department: 382 billable hours approved",
    module: "Time Tracker",
    moduleKey: "time-tracker",
    targetRoute: "time-tracker",
    icon: "file-spreadsheet",
    badge: { text: "Approved", color: "#1B7F4F", bg: "#EAFAF2" },
    metaRight: "Sep 15",
    tags: ["Timesheets", "Sprint", "Billable", "Engineering", "Weekly"],
  },
  {
    id: "tt-4",
    title: "Overtime Records — September",
    subtitle: "Operations & Tech Support overtime compensation claims",
    module: "Time Tracker",
    moduleKey: "time-tracker",
    targetRoute: "time-tracker",
    icon: "trending-up",
    badge: { text: "24 hrs", color: "#7A5A00", bg: "#FFF8E0" },
    metaRight: "Pending",
    tags: ["Overtime", "September", "Support", "Claims", "Hours"],
  },

  // ── PERFORMANCE
  {
    id: "prf-1",
    title: "Q3 Performance Reviews Cycle",
    subtitle: "Self-evaluations open until Sep 30 • 68% submitted",
    module: "Performance",
    moduleKey: "performance",
    targetRoute: "performance",
    icon: "award",
    badge: { text: "Active Cycle", color: "#1B7F4F", bg: "#EAFAF2" },
    metaRight: "Sep 30",
    tags: ["Performance", "Reviews", "Cycle", "Q3", "Self-evaluations"],
    isRecent: true,
  },
  {
    id: "prf-2",
    title: "OKR Goals — Engineering Core",
    subtitle: "Launch Global Search v2 & Unified Shell Architecture (85%)",
    module: "Performance",
    moduleKey: "performance",
    targetRoute: "performance",
    icon: "target",
    badge: { text: "85% Done", color: "#931CF5", bg: "#F5EEFD" },
    metaRight: "Q3 OKR",
    tags: ["Goals", "OKR", "Engineering", "Search", "Architecture"],
  },
  {
    id: "prf-3",
    title: "360 Peer Feedback — Sarah Sanders",
    subtitle: "4 peer ratings received • Focus on design leadership",
    module: "Performance",
    moduleKey: "performance",
    targetRoute: "performance",
    icon: "message-square",
    badge: { text: "Ready", color: "#1B7F4F", bg: "#EAFAF2" },
    metaRight: "Peer",
    tags: ["Feedback", "360", "Sarah", "Peer reviews", "Performance"],
  },
  {
    id: "prf-4",
    title: "Annual Appraisals & Band Calibrations",
    subtitle: "Executive calibration sessions scheduled for Oct 10",
    module: "Performance",
    moduleKey: "performance",
    targetRoute: "performance",
    icon: "file-check",
    metaRight: "Oct 10",
    tags: ["Appraisals", "Calibrations", "Band", "Annual", "Review"],
  },

  // ── BENEFITS
  {
    id: "ben-1",
    title: "Health Insurance Plan — Gold Tier",
    subtitle: "Comprehensive BlueCross cover for employee & dependents",
    module: "Benefits",
    moduleKey: "benefits",
    targetRoute: "benefits",
    icon: "shield",
    badge: { text: "Active Plan", color: "#1B7F4F", bg: "#EAFAF2" },
    metaRight: "$500k",
    tags: ["Health", "Insurance", "Benefits", "Gold", "Medical"],
    isRecent: true,
  },
  {
    id: "ben-2",
    title: "Employee Enrollments 2026",
    subtitle: "Annual benefit re-enrollment window: 94% confirmed",
    module: "Benefits",
    moduleKey: "benefits",
    targetRoute: "benefits",
    icon: "check-circle",
    badge: { text: "94% Complete", color: "#1B7F4F", bg: "#EAFAF2" },
    metaRight: "2026",
    tags: ["Enrollments", "Benefits", "Annual", "Re-enrollment"],
  },
  {
    id: "ben-3",
    title: "Wellness & Gym Reimbursement Allowance",
    subtitle: "Monthly allowance ($150) for fitness & mental wellbeing",
    module: "Benefits",
    moduleKey: "benefits",
    targetRoute: "benefits",
    icon: "smile",
    badge: { text: "$150/mo", color: "#931CF5", bg: "#F5EEFD" },
    metaRight: "Active",
    tags: ["Wellness", "Gym", "Allowance", "Reimbursement", "Fitness"],
  },
  {
    id: "ben-4",
    title: "Medical Claim — Arun Kumar",
    subtitle: "Outpatient dental claim reimbursement submitted ($340)",
    module: "Benefits",
    moduleKey: "benefits",
    targetRoute: "benefits",
    icon: "file-text",
    badge: { text: "Under Review", color: "#7A5A00", bg: "#FFF8E0" },
    metaRight: "$340",
    tags: ["Claim", "Arun", "Dental", "Medical", "Reimbursement"],
  },

  // ── ASSETS
  {
    id: "ast-1",
    title: "Dell Latitude 5440",
    subtitle: "Assigned to Mukesh Murugavel • AST-4921 • Bangalore Tech Hub",
    module: "Assets",
    moduleKey: "assets",
    targetRoute: "assets",
    icon: "laptop",
    badge: { text: "Assigned", color: "#1B7F4F", bg: "#EAFAF2" },
    metaRight: "AST-4921",
    tags: ["Mukesh", "Murugavel", "Dell", "Latitude", "5440", "Laptop", "Assets", "AST-4921", "Hardware"],
    isRecent: true,
  },
  {
    id: "ast-2",
    title: "Dell UltraSharp 27\" 4K Monitor",
    subtitle: "AST-3180 • Available in IT inventory warehouse",
    module: "Assets",
    moduleKey: "assets",
    targetRoute: "assets",
    icon: "monitor",
    badge: { text: "Available", color: "#1B7F4F", bg: "#EAFAF2" },
    metaRight: "Inventory",
    tags: ["Dell", "Monitor", "4K", "UltraSharp", "Assets", "Available"],
  },
  {
    id: "ast-3",
    title: "Asset Request — Sarah Sanders",
    subtitle: "Magic Trackpad & Ergonomic Mechanical Keyboard request",
    module: "Assets",
    moduleKey: "assets",
    targetRoute: "assets",
    icon: "inbox",
    badge: { text: "Pending IT", color: "#7A5A00", bg: "#FFF8E0" },
    metaRight: "Sep 16",
    tags: ["Request", "Sarah", "Keyboard", "Trackpad", "Assets"],
  },
  {
    id: "ast-4",
    title: "Laptop Inventory Refresh 2026",
    subtitle: "18 MacBook Air M3 units pre-configured for new joiners",
    module: "Assets",
    moduleKey: "assets",
    targetRoute: "assets",
    icon: "box",
    metaRight: "18 Units",
    tags: ["Inventory", "Laptop", "MacBook", "Assets", "New Joiners"],
  },
  {
    id: "ast-5",
    title: "Asset Return — Priya S",
    subtitle: "Legacy ThinkPad X1 Carbon decommissioned for security wipe",
    module: "Assets",
    moduleKey: "assets",
    targetRoute: "assets",
    icon: "corner-down-left",
    badge: { text: "Returned", color: "#625A68", bg: "#E8E3EB" },
    metaRight: "Done",
    tags: ["Return", "Priya", "ThinkPad", "Decommissioned", "Assets"],
  },

  // ── ONBOARDING
  {
    id: "onb-1",
    title: "New Joiners Cohort — September 2026",
    subtitle: "6 new software engineers and product designers starting Sep 22",
    module: "Onboarding",
    moduleKey: "onboarding",
    targetRoute: "onboarding",
    icon: "user-plus",
    badge: { text: "6 Joiners", color: "#931CF5", bg: "#F5EEFD" },
    metaRight: "Sep 22",
    tags: ["New joiners", "Cohort", "Engineers", "September", "Onboarding"],
    isRecent: true,
  },
  {
    id: "onb-2",
    title: "Pending Onboarding — Alex Chen",
    subtitle: "Software Engineer • Step 3/5: IT & Credentials Provisioning",
    module: "Onboarding",
    moduleKey: "onboarding",
    targetRoute: "onboarding",
    icon: "clock",
    badge: { text: "In Progress", color: "#7A5A00", bg: "#FFF8E0" },
    metaRight: "Step 3/5",
    tags: ["Alex", "Chen", "Onboarding", "Pending", "Provisioning"],
  },
  {
    id: "onb-3",
    title: "Onboarding Checklist Template v4",
    subtitle: "Standard 30-60-90 day milestone milestones for technical roles",
    module: "Onboarding",
    moduleKey: "onboarding",
    targetRoute: "onboarding",
    icon: "check-square",
    metaRight: "Template",
    tags: ["Checklist", "Template", "Milestones", "30-60-90", "Onboarding"],
  },
  {
    id: "onb-4",
    title: "Document Verification Queue",
    subtitle: "4 identity & educational verification tasks awaiting review",
    module: "Onboarding",
    moduleKey: "onboarding",
    targetRoute: "onboarding",
    icon: "file-text",
    badge: { text: "4 Pending", color: "#B03B2E", bg: "#FDECEA" },
    metaRight: "Queue",
    tags: ["Document", "Verification", "Identity", "Review", "Onboarding"],
  },

  // ── WORKFORCE & DASHBOARD
  {
    id: "wf-1",
    title: "Engineering Headcount Report",
    subtitle: "Workforce distribution • 184 engineers across 4 international hubs",
    module: "Workforce",
    moduleKey: "workforce",
    targetRoute: "workforce",
    icon: "bar-chart-2",
    metaRight: "Q3 2026",
    tags: ["Engineering", "Headcount", "Workforce", "Report", "Hubs"],
  },
  {
    id: "pay-1",
    title: "Q3 Payroll Regularization Batch",
    subtitle: "Tax adjustments, expense claims & variable pay processing",
    module: "Payroll",
    moduleKey: "payroll",
    targetRoute: "payroll",
    icon: "dollar-sign",
    badge: { text: "Processed", color: "#1B7F4F", bg: "#EAFAF2" },
    metaRight: "Batch 4",
    tags: ["Payroll", "Regularization", "Tax", "Salary", "Processed"],
  },
];

// ─── SEARCH & RANKING ALGORITHM ───────────────────────────────────────────────

export interface SearchFilterParams {
  query: string;
  currentModuleKey: SearchModuleKey;
  activeFilterKey?: string | null;
  activeFilterValue?: string | null;
  limit?: number;
}

export function searchBEZENTRecords({
  query,
  currentModuleKey,
  activeFilterKey,
  activeFilterValue,
  limit = 20,
}: SearchFilterParams): {
  items: SearchResultItem[];
  currentModuleItems: SearchResultItem[];
  otherModuleItems: SearchResultItem[];
} {
  const q = query.trim().toLowerCase();

  // Filter based on active chip value if selected
  let candidates = ALL_SEARCH_RECORDS;
  if (activeFilterKey && activeFilterValue && activeFilterValue !== "all") {
    const filterVal = activeFilterValue.toLowerCase();
    candidates = candidates.filter(item => {
      const fullText = `${item.title} ${item.subtitle} ${item.metaRight || ""} ${(item.tags || []).join(" ")}`.toLowerCase();
      return fullText.includes(filterVal);
    });
  }

  if (!q) {
    // If no text query, prioritize current module records
    const currentModuleItems = candidates.filter(item => item.moduleKey === currentModuleKey);
    const otherModuleItems = candidates.filter(item => item.moduleKey !== currentModuleKey);
    const combined = [...currentModuleItems, ...otherModuleItems].slice(0, limit);
    return {
      items: combined,
      currentModuleItems,
      otherModuleItems,
    };
  }

  // Calculate search rank per item
  // 1. Exact match in current module (score 1000+)
  // 2. Partial match in current module (score 700+)
  // 3. Recently accessed in current module / exact match in other module (score 500+)
  // 4. Related module partial matches (score 300+)
  // 5. Global BEZENT matches (score 100+)
  const scoredItems = candidates
    .map(item => {
      const titleLower = item.title.toLowerCase();
      const subtitleLower = item.subtitle.toLowerCase();
      const tags = (item.tags || []).map(t => t.toLowerCase());
      const isCurrentMod = item.moduleKey === currentModuleKey;

      let score = 0;

      // Exact title match
      if (titleLower === q) {
        score += isCurrentMod ? 1200 : 600;
      }
      // Starts with title
      else if (titleLower.startsWith(q)) {
        score += isCurrentMod ? 1000 : 500;
      }
      // Contains full query in title
      else if (titleLower.includes(q)) {
        score += isCurrentMod ? 800 : 400;
      }
      // Contains in subtitle
      else if (subtitleLower.includes(q)) {
        score += isCurrentMod ? 600 : 300;
      }
      // Contains in tags
      else if (tags.some(t => t.includes(q))) {
        score += isCurrentMod ? 500 : 250;
      } else {
        // Check if all words match somewhere
        const words = q.split(/\s+/);
        const fullString = `${titleLower} ${subtitleLower} ${tags.join(" ")}`;
        const allWordsMatch = words.every(w => fullString.includes(w));
        if (allWordsMatch) {
          score += isCurrentMod ? 400 : 150;
        }
      }

      if (score > 0 && item.isRecent) {
        score += 80;
      }

      return { item, score };
    })
    .filter(res => res.score > 0)
    .sort((a, b) => b.score - a.score);

  const rankedItems = scoredItems.map(s => s.item);
  const currentModuleItems = rankedItems.filter(item => item.moduleKey === currentModuleKey);
  const otherModuleItems = rankedItems.filter(item => item.moduleKey !== currentModuleKey);

  return {
    items: rankedItems.slice(0, limit),
    currentModuleItems,
    otherModuleItems,
  };
}
