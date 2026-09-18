import React, { useState, useRef, useEffect, useMemo } from "react";
import * as L from "lucide-react";
import { BezentIcon } from "../design-system/icons/BezentIcon";
import { BezentEnterpriseIcon } from "../design-system/icons/BezentEnterpriseIcon";
import { isModulePermitted } from "../design-system/icons/iconRegistry";

// ─── Tool Registry Definition ────────────────────────────────────────────────

export interface BezentToolItem {
  id: string;
  label: string;
  category: "people" | "work_time" | "growth" | "pay_benefits" | "workplace" | "hr_operations";
  categoryLabel: string;
  icon: string;
  route: string;
  description: string;
  keywords: string[];
  permission?: string;
}

export const BEZENT_TOOL_REGISTRY: BezentToolItem[] = [
  // ── 1. People (7 tools) ──
  {
    id: "Employees",
    label: "Employees",
    category: "people",
    categoryLabel: "People",
    icon: "Users",
    route: "/employees",
    description: "Manage employee profiles, roles, and employment records",
    keywords: ["employee", "staff", "directory", "people", "team", "profiles", "headcount", "roster"],
  },
  {
    id: "Organization",
    label: "Organization",
    category: "people",
    categoryLabel: "People",
    icon: "Network",
    route: "/organization",
    description: "Company structure, departments, and reporting hierarchy",
    keywords: ["org", "hierarchy", "departments", "teams", "company", "chart", "structure", "divisions"],
  },
  {
    id: "Recruitment",
    label: "Recruitment",
    category: "people",
    categoryLabel: "People",
    icon: "UserSearch",
    route: "/recruitment",
    description: "Manage hiring workflows and candidate pipelines",
    keywords: ["hire", "talent", "recruiting", "pipeline", "sourcing", "jobs", "applicants", "openings"],
  },
  {
    id: "Job Openings",
    label: "Job Openings",
    category: "people",
    categoryLabel: "People",
    icon: "Briefcase",
    route: "/job-openings",
    description: "Track open requisitions, job posts, and vacancy statuses",
    keywords: ["jobs", "openings", "vacancies", "requisitions", "roles", "postings", "hiring requests"],
  },
  {
    id: "Candidates",
    label: "Candidates",
    category: "people",
    categoryLabel: "People",
    icon: "ContactRound",
    route: "/candidates",
    description: "Review applicants, talent pools, and candidate resumes",
    keywords: ["candidate", "applicant", "resumes", "profiles", "talent", "interviewee", "cv"],
  },
  {
    id: "Interviews",
    label: "Interviews",
    category: "people",
    categoryLabel: "People",
    icon: "MessagesSquare",
    route: "/interviews",
    description: "Schedule, conduct, and evaluate candidate interviews",
    keywords: ["interview", "scheduling", "scorecard", "evaluation", "meeting", "hiring panel", "assessment"],
  },
  {
    id: "Offers",
    label: "Offers",
    category: "people",
    categoryLabel: "People",
    icon: "FileCheck2",
    route: "/offers",
    description: "Manage offer letters, approvals, and candidate decisions",
    keywords: ["offer", "letters", "salary offer", "contracts", "negotiation", "package", "hired"],
  },

  // ── 2. Work & Time (5 tools) ──
  {
    id: "Attendance",
    label: "Attendance",
    category: "work_time",
    categoryLabel: "Work & Time",
    icon: "UserCheck",
    route: "/attendance",
    description: "Track employee attendance and regularization",
    keywords: ["clock in", "punch", "regularization", "present", "absent", "work hours", "biometric", "check in"],
  },
  {
    id: "Leave Tracker",
    label: "Leave",
    category: "work_time",
    categoryLabel: "Work & Time",
    icon: "CalendarX",
    route: "/leave-tracker",
    description: "Manage time-off requests, balances, and holidays",
    keywords: ["leave", "time off", "vacation", "holiday", "sick leave", "pto", "balances", "absences", "casual leave"],
  },
  {
    id: "Shifts",
    label: "Shifts",
    category: "work_time",
    categoryLabel: "Work & Time",
    icon: "Clock3",
    route: "/shifts",
    description: "Schedule work shifts, rotations, and rosters",
    keywords: ["shift", "roster", "schedule", "rotation", "night shift", "timings", "shift swap", "calendar"],
  },
  {
    id: "Timesheets",
    label: "Timesheets",
    category: "work_time",
    categoryLabel: "Work & Time",
    icon: "ClipboardClock",
    route: "/timesheets",
    description: "Review weekly project logs and time cards",
    keywords: ["timesheet", "weekly hours", "time cards", "billable", "client hours", "approval", "log"],
  },
  {
    id: "Time Tracker",
    label: "Time Tracker",
    category: "work_time",
    categoryLabel: "Work & Time",
    icon: "Timer",
    route: "/time-tracker",
    description: "Live timer and project hours tracking",
    keywords: ["timer", "clock", "stopwatch", "hours", "tracking", "active task", "duration"],
  },

  // ── 3. Growth (4 tools) ──
  {
    id: "Performance",
    label: "Performance",
    category: "growth",
    categoryLabel: "Growth",
    icon: "Activity",
    route: "/performance",
    description: "Appraisals, reviews, and 360 feedback cycles",
    keywords: ["appraisal", "rating", "evaluation", "feedback", "review", "growth", "performance review", "score"],
  },
  {
    id: "Goals",
    label: "Goals & OKRs",
    category: "growth",
    categoryLabel: "Growth",
    icon: "Target",
    route: "/goals",
    description: "Track organizational, team, and personal objectives",
    keywords: ["goals", "okr", "targets", "objectives", "kpi", "milestones", "progress", "alignment"],
  },
  {
    id: "Learning",
    label: "Learning",
    category: "growth",
    categoryLabel: "Growth",
    icon: "GraduationCap",
    route: "/learning",
    description: "Courses, training programs, and skill development",
    keywords: ["lms", "training", "courses", "skills", "certifications", "education", "development", "workshops"],
  },
  {
    id: "Career",
    label: "Career Paths",
    category: "growth",
    categoryLabel: "Growth",
    icon: "Route",
    route: "/career",
    description: "Career progression, competencies, and promotion tracks",
    keywords: ["career", "progression", "ladder", "promotion", "competency", "pathway", "growth track"],
  },

  // ── 4. Pay & Benefits (3 tools) ──
  {
    id: "Payroll",
    label: "Payroll",
    category: "pay_benefits",
    categoryLabel: "Pay & Benefits",
    icon: "CreditCard",
    route: "/payroll",
    description: "Manage payroll processing and employee pay",
    keywords: ["salary", "pay", "payslip", "wages", "direct deposit", "tax", "payroll run", "deductions"],
  },
  {
    id: "Compensation",
    label: "Compensation",
    category: "pay_benefits",
    categoryLabel: "Pay & Benefits",
    icon: "HandCoins",
    route: "/compensation",
    description: "Salary structures, bonuses, and compensation bands",
    keywords: ["comp", "bonus", "bands", "equity", "salary structure", "raise", "increment", "remuneration"],
  },
  {
    id: "Benefits",
    label: "Benefits",
    category: "pay_benefits",
    categoryLabel: "Pay & Benefits",
    icon: "HeartHandshake",
    route: "/benefits",
    description: "Health insurance, employee perks, and allowances",
    keywords: ["insurance", "perks", "medical", "health", "allowance", "wellness", "coverage", "pension"],
  },

  // ── 5. Workplace (3 tools) ──
  {
    id: "Documents",
    label: "Documents",
    category: "workplace",
    categoryLabel: "Workplace",
    icon: "Folders",
    route: "/documents",
    description: "Store and manage HR documents, letters, and policies",
    keywords: ["docs", "contracts", "files", "handbook", "policies", "letters", "agreements", "storage"],
  },
  {
    id: "Assets",
    label: "Assets",
    category: "workplace",
    categoryLabel: "Workplace",
    icon: "Package",
    route: "/assets",
    description: "Track company equipment, laptops, and hardware licenses",
    keywords: ["laptops", "equipment", "hardware", "monitors", "devices", "inventory", "license", "allocation"],
  },
  {
    id: "Employee Requests",
    label: "Employee Requests",
    category: "workplace",
    categoryLabel: "Workplace",
    icon: "MessageSquareMore",
    route: "/employee-requests",
    description: "Helpdesk, letter requests, and workplace services",
    keywords: ["tickets", "helpdesk", "requests", "service desk", "support", "letter request", "queries"],
  },

  // ── 6. HR Operations (2 tools) ──
  {
    id: "SOP",
    label: "Standard Operations",
    category: "hr_operations",
    categoryLabel: "HR Operations",
    icon: "ListChecks",
    route: "/sop",
    description: "Standard operating procedures, policies, and operational workflows",
    keywords: ["sop", "procedures", "operations", "workflows", "guidelines", "checklists", "compliance"],
  },
  {
    id: "Settings",
    label: "HR Settings",
    category: "hr_operations",
    categoryLabel: "HR Operations",
    icon: "Wrench",
    route: "/settings",
    description: "Configure HR processes, policies, and operational standards",
    keywords: ["settings", "config", "preferences", "admin", "policies", "setup", "rules", "configuration"],
  },
];

// ─── Categories Configuration ────────────────────────────────────────────────

export interface MoreCategoryDef {
  id: "all" | "people" | "work_time" | "growth" | "pay_benefits" | "workplace" | "hr_operations";
  label: string;
  subtitle?: string;
  iconName?: string;
  icon?: React.ReactNode;
}

export const MORE_CATEGORIES: MoreCategoryDef[] = [
  {
    id: "all",
    label: "All Tools",
    iconName: "LayoutGrid",
  },
  {
    id: "people",
    label: "People",
    subtitle: "Manage your workforce from hiring to employee records.",
    iconName: "UsersRound",
  },
  {
    id: "work_time",
    label: "Work & Time",
    subtitle: "Manage attendance, leave, schedules and working time.",
    iconName: "Clock3",
  },
  {
    id: "growth",
    label: "Growth",
    subtitle: "Support employee performance, learning and career development.",
    iconName: "TrendingUp",
  },
  {
    id: "pay_benefits",
    label: "Pay & Benefits",
    subtitle: "Manage employee pay, compensation and benefits.",
    iconName: "WalletCards",
  },
  {
    id: "workplace",
    label: "Workplace",
    subtitle: "Access employee documents, assets and workplace services.",
    iconName: "Folder",
  },
  {
    id: "hr_operations",
    label: "HR Operations",
    subtitle: "Configure HR processes, policies and operational standards.",
    iconName: "Wrench",
  },
];

// Default 4 Quick Access Tools per specification
const DEFAULT_QUICK_ACCESS_IDS = ["Employees", "Leave Tracker", "Attendance", "Payroll"];

// ─── Props Interface ──────────────────────────────────────────────────────────

export interface MoreLauncherProps {
  isOpen: boolean;
  onClose: () => void;
  activeItem: string;
  onSelectModule: (moduleId: string) => void;
  onPromoteModule: (moduleId: string) => void;
  userRole?: string;
}

// ─── Main MoreLauncher Component ──────────────────────────────────────────────

export function MoreLauncher({
  isOpen,
  onClose,
  activeItem,
  onSelectModule,
  onPromoteModule,
  userRole = "admin",
}: MoreLauncherProps) {
  const [selectedCategory, setSelectedCategory] = useState<MoreCategoryDef["id"]>("all");
  const [transitionDir, setTransitionDir] = useState<"in" | "out">("in");
  const [hoveredCatId, setHoveredCatId] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [closeHov, setCloseHov] = useState(false);
  const [isCustomizingQA, setIsCustomizingQA] = useState(false);

  const handleCategorySelect = (catId: MoreCategoryDef["id"]) => {
    if (catId === selectedCategory) return;
    if (catId === "all") {
      setTransitionDir("out");
    } else {
      setTransitionDir("in");
    }
    setSelectedCategory(catId);
    if (searchQuery) setSearchQuery("");
  };

  const popoverRef = useRef<HTMLDivElement>(null);
  const searchInputRef = useRef<HTMLInputElement>(null);

  // ── Quick Access Customization State ──
  const [quickAccessIds, setQuickAccessIds] = useState<string[]>(() => {
    try {
      const stored = localStorage.getItem("bezent_quick_access_items");
      if (stored) {
        const parsed = JSON.parse(stored);
        if (Array.isArray(parsed) && parsed.length > 0) return parsed;
      }
    } catch {}
    return DEFAULT_QUICK_ACCESS_IDS;
  });

  // ── Recently Used Tools (Actual User Navigation History) ──
  const [recentToolIds, setRecentToolIds] = useState<string[]>(() => {
    try {
      const stored = localStorage.getItem("bezent_recent_tools");
      if (stored) {
        const parsed = JSON.parse(stored);
        if (Array.isArray(parsed)) return parsed;
      }
    } catch {}
    return [];
  });

  const saveRecentTool = (toolId: string) => {
    try {
      const updated = [toolId, ...recentToolIds.filter(id => id !== toolId)].slice(0, 3);
      setRecentToolIds(updated);
      localStorage.setItem("bezent_recent_tools", JSON.stringify(updated));
    } catch {}
  };

  const togglePinQuickAccess = (toolId: string) => {
    setQuickAccessIds(prev => {
      let next: string[];
      if (prev.includes(toolId)) {
        next = prev.filter(id => id !== toolId);
      } else {
        next = [toolId, ...prev.slice(0, 3)];
      }
      try {
        localStorage.setItem("bezent_quick_access_items", JSON.stringify(next));
      } catch {}
      return next;
    });
  };

  // Filter permitted tools based on role
  const permittedTools = useMemo(() => {
    return BEZENT_TOOL_REGISTRY.filter(t => isModulePermitted(t.id, userRole));
  }, [userRole]);

  // Clean Search Query
  const cleanQuery = searchQuery.trim().toLowerCase();

  // Dynamic Category Counts
  const categoryCounts = useMemo(() => {
    const counts: Record<string, number> = {
      all: permittedTools.length,
      people: permittedTools.filter(t => t.category === "people").length,
      work_time: permittedTools.filter(t => t.category === "work_time").length,
      growth: permittedTools.filter(t => t.category === "growth").length,
      pay_benefits: permittedTools.filter(t => t.category === "pay_benefits").length,
      workplace: permittedTools.filter(t => t.category === "workplace").length,
      hr_operations: permittedTools.filter(t => t.category === "hr_operations").length,
    };
    return counts;
  }, [permittedTools]);

  // Filtered Search Results
  const searchResults = useMemo(() => {
    if (!cleanQuery) return [];
    return permittedTools.filter(t => {
      const nameMatch = t.label.toLowerCase().includes(cleanQuery);
      const catMatch = t.categoryLabel.toLowerCase().includes(cleanQuery);
      const descMatch = t.description.toLowerCase().includes(cleanQuery);
      const kwMatch = t.keywords.some(kw => kw.toLowerCase().includes(cleanQuery));
      return nameMatch || catMatch || descMatch || kwMatch;
    });
  }, [cleanQuery, permittedTools]);

  // Quick Access items resolved
  const quickAccessTools = useMemo(() => {
    return quickAccessIds
      .map(id => permittedTools.find(t => t.id === id || t.label.toLowerCase() === id.toLowerCase()))
      .filter((t): t is BezentToolItem => Boolean(t));
  }, [quickAccessIds, permittedTools]);

  // Recently used tools resolved
  const recentTools = useMemo(() => {
    return recentToolIds
      .map(id => permittedTools.find(t => t.id === id || t.label.toLowerCase() === id.toLowerCase()))
      .filter((t): t is BezentToolItem => Boolean(t));
  }, [recentToolIds, permittedTools]);

  // Keyboard Shortcuts (Esc & ⌘K)
  useEffect(() => {
    function handleKeyDown(e: KeyboardEvent) {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        if (isOpen) {
          e.preventDefault();
          searchInputRef.current?.focus();
        }
      }
      if (e.key === "Escape") {
        onClose();
        setSearchQuery("");
      }
    }
    if (isOpen) {
      document.addEventListener("keydown", handleKeyDown);
    }
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen, onClose]);

  // Safe Click Outside Handling
  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (popoverRef.current && !popoverRef.current.contains(e.target as Node)) {
        onClose();
        setSearchQuery("");
      }
    }
    if (isOpen) {
      const timer = setTimeout(() => {
        document.addEventListener("click", handleClickOutside);
      }, 50);
      return () => {
        clearTimeout(timer);
        document.removeEventListener("click", handleClickOutside);
      };
    }
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const handleToolClick = (tool: BezentToolItem) => {
    saveRecentTool(tool.id);
    onPromoteModule(tool.id);
    onClose();
    setSearchQuery("");
  };

  const currentCategoryDef = MORE_CATEGORIES.find(c => c.id === selectedCategory);

  return (
    <div
      ref={popoverRef}
      className="more-flyout-enter"
      role="dialog"
      aria-label="BEZENT HR Tool Launcher"
      style={{
        position: "fixed",
        left: 96,
        bottom: 48,
        width: 710,
        maxWidth: "calc(100vw - 140px)",
        height: "calc(100vh - 120px)",
        minHeight: "calc(100vh - 120px)",
        maxHeight: "calc(100vh - 120px)",
        background: "var(--more-panel-bg, #FFFFFF)",
        border: "1px solid var(--more-panel-border, #E9D0FD)",
        borderRadius: 16,
        boxShadow: "var(--more-panel-shadow, 0 16px 40px rgba(45, 6, 77, 0.16))",
        zIndex: 350,
        display: "flex",
        flexDirection: "column",
        overflow: "hidden",
        userSelect: "none",
      }}
    >
      {/* ── 1. Top Section / Header ── */}
      <div
        style={{
          display: "flex",
          alignItems: "flex-start",
          justifyContent: "space-between",
          padding: "16px 20px 12px",
          flexShrink: 0,
          background: "var(--more-panel-header-bg, #FEFBFF)",
          borderBottom: "1px solid var(--more-panel-divider, #F4E7FE)",
        }}
      >
        <div>
          <div
            style={{
              fontSize: 18,
              fontWeight: 600,
              lineHeight: "24px",
              letterSpacing: "-0.2px",
              color: "var(--text-brand, var(--text-primary, #111827))",
            }}
          >
            More
          </div>
          <div
            style={{
              fontSize: 12,
              fontWeight: 400,
              lineHeight: "18px",
              color: "var(--text-muted, #6B7280)",
              marginTop: 2,
              letterSpacing: "-0.1px",
            }}
          >
            Explore tools and services beyond your everyday workspace
          </div>
        </div>

        {/* Close Button */}
        <button
          type="button"
          onClick={() => {
            onClose();
            setSearchQuery("");
          }}
          onMouseEnter={() => setCloseHov(true)}
          onMouseLeave={() => setCloseHov(false)}
          aria-label="Close panel"
          style={{
            width: 28,
            height: 28,
            borderRadius: 7,
            border: "none",
            background: closeHov ? "var(--bg-hover, #F4E7FE)" : "transparent",
            color: "var(--text-muted, #6B7280)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            cursor: "pointer",
            padding: 0,
            transition: "background-color 150ms ease, color 150ms ease",
          }}
        >
          <L.X size={16} />
        </button>
      </div>

      {/* ── 2. Full-Width Search Bar ── */}
      <div
        style={{
          padding: "12px 20px",
          borderBottom: "1px solid var(--more-panel-divider, #F4E7FE)",
          flexShrink: 0,
          background: "var(--more-panel-header-bg, #FEFBFF)",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 9,
            height: 38,
            padding: "0 12px",
            borderRadius: 8,
            background: "var(--search-bg, #F8F5FB)",
            border: "1px solid var(--search-border, #E9D0FD)",
            transition: "border-color 0.15s ease, box-shadow 0.15s ease",
          }}
        >
          <L.Search size={15} style={{ color: "var(--search-icon, #931CF5)", flexShrink: 0 }} />
          <input
            ref={searchInputRef}
            type="text"
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
            placeholder="Search tools, services or actions..."
            className="bezent-search-input"
            autoFocus
            style={{
              flex: 1,
              background: "transparent",
              border: "none",
              outline: "none",
              fontSize: 13,
              fontWeight: 400,
              color: "var(--search-text, var(--text-primary, #111827))",
              fontFamily: "inherit",
            }}
          />
          {searchQuery ? (
            <button
              type="button"
              onClick={() => setSearchQuery("")}
              style={{
                border: "none",
                background: "transparent",
                color: "var(--search-icon, #931CF5)",
                cursor: "pointer",
                padding: 0,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
              aria-label="Clear search"
            >
              <L.X size={14} />
            </button>
          ) : (
            <kbd
              style={{
                fontSize: 10.5,
                fontWeight: 600,
                padding: "2px 6px",
                borderRadius: 4,
                background: "var(--search-kbd-bg, #F4E7FE)",
                border: "1px solid var(--search-kbd-border, #D3A2FB)",
                color: "var(--accent-primary, #931CF5)",
                fontFamily: "inherit",
                letterSpacing: "0.02em",
              }}
            >
              ⌘ K
            </kbd>
          )}
        </div>
      </div>

      {/* ── 3. Internal Two-Column Launcher Layout ── */}
      <div
        style={{
          display: "flex",
          flex: "1 1 auto",
          minHeight: 0,
          overflow: "hidden",
        }}
      >
        {/* ── Left Category Navigation (200px fixed) ── */}
        <div
          style={{
            width: 200,
            minWidth: 200,
            maxWidth: 200,
            flexShrink: 0,
            background: "var(--more-rail-bg, #FAF6FD)",
            borderRight: "1px solid var(--more-panel-divider, #F4E7FE)",
            display: "flex",
            flexDirection: "column",
            padding: "12px 8px",
            overflowY: "auto",
          }}
        >
          <div style={{ display: "flex", flexDirection: "column", gap: 3 }}>
            {MORE_CATEGORIES.map(cat => {
              const isSelected = selectedCategory === cat.id && !cleanQuery;
              const isHov = hoveredCatId === cat.id && !isSelected;
              const count = categoryCounts[cat.id] ?? 0;
              return (
                <button
                  key={cat.id}
                  type="button"
                  onClick={() => handleCategorySelect(cat.id)}
                  onMouseEnter={() => setHoveredCatId(cat.id)}
                  onMouseLeave={() => setHoveredCatId(null)}
                  style={{
                    position: "relative",
                    width: "100%",
                    height: 38,
                    display: "flex",
                    alignItems: "center",
                    gap: 9,
                    padding: "0 10px",
                    borderRadius: 8,
                    border: "none",
                    background: isSelected
                      ? "var(--icon-surface-active)"
                      : isHov
                      ? "var(--icon-surface)"
                      : "transparent",
                    cursor: "pointer",
                    fontFamily: "inherit",
                    textAlign: "left",
                    transition: "background-color 0.14s ease",
                    outline: "none",
                    boxSizing: "border-box",
                  }}
                  aria-label={cat.label}
                >
                  {/* Active Indicator bar - ONLY on selected category */}
                  {isSelected && (
                    <div
                      style={{
                        position: "absolute",
                        left: 0,
                        top: 7,
                        bottom: 7,
                        width: 3,
                        borderRadius: "0 2px 2px 0",
                        background: "var(--icon-active)",
                      }}
                    />
                  )}
                  <div
                    style={{
                      width: 22,
                      height: 22,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      flexShrink: 0,
                    }}
                  >
                    <BezentEnterpriseIcon
                      name={cat.iconName || "LayoutGrid"}
                      active={isSelected}
                      hovered={isHov}
                      size={20}
                    />
                  </div>
                  <span
                    style={{
                      flex: 1,
                      fontSize: 13,
                      fontWeight: isSelected ? 600 : 500,
                      lineHeight: "18px",
                      color: "var(--text-primary)",
                      whiteSpace: "nowrap",
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                    }}
                  >
                    {cat.label}
                  </span>
                  <span
                    style={{
                      fontSize: 11,
                      fontWeight: 500,
                      padding: "1px 6px",
                      borderRadius: 10,
                      background: isSelected
                        ? "var(--icon-surface-active)"
                        : "var(--more-badge-bg, rgba(160, 32, 240, 0.08))",
                      color: isSelected
                        ? "var(--text-primary)"
                        : "var(--text-muted)",
                      flexShrink: 0,
                    }}
                  >
                    {count}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* ── Right Module Content Area (Scrollable) ── */}
        <div
          className="more-flyout-scroll"
          style={{
            flex: 1,
            minWidth: 0,
            minHeight: 0,
            overflowY: "auto",
            scrollbarGutter: "stable",
            padding: "16px 20px 24px",
            display: "flex",
            flexDirection: "column",
          }}
        >
          {/* Transition wrapper for smooth drill-in and back effect (140ms fade & 4px slide) */}
          <div
            key={cleanQuery ? `search-${cleanQuery}` : `mode-${selectedCategory}`}
            className={transitionDir === "in" ? "bezent-mode-transition-in" : "bezent-mode-transition-out"}
            style={{
              display: "flex",
              flexDirection: "column",
              gap: 20,
            }}
          >
            {/* ────────────────────────────────────────────────────────── */}
            {/* SEARCH RESULTS VIEW                                        */}
            {/* ────────────────────────────────────────────────────────── */}
            {cleanQuery ? (
              <div>
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    marginBottom: 10,
                  }}
                >
                  <span
                    style={{
                      fontSize: 11,
                      fontWeight: 600,
                      textTransform: "uppercase",
                      letterSpacing: "0.04em",
                      color: "var(--accent-primary, #931CF5)",
                    }}
                  >
                    Search Results ({searchResults.length})
                  </span>
                  <span style={{ fontSize: 11, color: "var(--text-muted, #6B7280)" }}>
                    matching "{searchQuery}"
                  </span>
                </div>

                {searchResults.length > 0 ? (
                  <div style={{ display: "flex", flexDirection: "column", gap: 3 }}>
                    {searchResults.map(tool => (
                      <ToolRow
                        key={tool.id}
                        tool={tool}
                        active={activeItem === tool.id}
                        isPinned={quickAccessIds.includes(tool.id)}
                        showDescription={true}
                        showCategoryBadge={true}
                        onTogglePin={() => togglePinQuickAccess(tool.id)}
                        onClick={() => handleToolClick(tool)}
                      />
                    ))}
                  </div>
                ) : (
                  <div style={{ padding: "36px 16px", textAlign: "center", color: "var(--text-muted, #6B7280)" }}>
                    <L.Search size={28} style={{ margin: "0 auto 10px", opacity: 0.35 }} />
                    <div style={{ fontSize: 13.5, fontWeight: 600, color: "var(--text-primary, #111827)", marginBottom: 4 }}>
                      No matching tools found
                    </div>
                    <div style={{ fontSize: 12 }}>
                      Try searching by name, action (e.g. salary, leave, candidate) or category
                    </div>
                    <button
                      type="button"
                      onClick={() => setSearchQuery("")}
                      style={{
                        marginTop: 12,
                        padding: "5px 12px",
                        borderRadius: 6,
                        border: "1px solid var(--border-default, #E9D0FD)",
                        background: "var(--bg-hover, #F4E7FE)",
                        color: "var(--accent-primary, #931CF5)",
                        fontSize: 12,
                        fontWeight: 600,
                        cursor: "pointer",
                      }}
                    >
                      Clear search
                    </button>
                  </div>
                )}
              </div>
            ) : selectedCategory === "all" ? (
              /* ────────────────────────────────────────────────────────── */
              /* MODE 1 — ALL TOOLS / DISCOVERY VIEW                        */
              /* ────────────────────────────────────────────────────────── */
              <>
                {/* 1. QUICK ACCESS TILES (4 compact tiles + Customize) */}
                <div>
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                      marginBottom: 10,
                    }}
                  >
                    <span
                      style={{
                        fontSize: 11,
                        fontWeight: 600,
                        textTransform: "uppercase",
                        letterSpacing: "0.04em",
                        color: "var(--text-muted, #7A6A8A)",
                      }}
                    >
                      Quick Access
                    </span>

                    <button
                      type="button"
                      onClick={() => setIsCustomizingQA(v => !v)}
                      style={{
                        background: "transparent",
                        border: "none",
                        padding: 0,
                        cursor: "pointer",
                        fontSize: 12,
                        fontWeight: 500,
                        color: "var(--accent-primary, #931CF5)",
                        fontFamily: "inherit",
                        display: "inline-flex",
                        alignItems: "center",
                        gap: 4,
                      }}
                    >
                      <L.SlidersHorizontal size={12} />
                      <span>{isCustomizingQA ? "Done" : "Customize"}</span>
                    </button>
                  </div>

                  <div
                    style={{
                      display: "grid",
                      gridTemplateColumns: "repeat(4, 1fr)",
                      gap: 8,
                    }}
                  >
                    {quickAccessTools.map(tool => (
                      <QuickAccessTile
                        key={tool.id}
                        tool={tool}
                        active={activeItem === tool.id}
                        onClick={() => handleToolClick(tool)}
                      />
                    ))}
                  </div>
                </div>

                {/* 2. RECENTLY USED (Shown when available) */}
                {recentTools.length > 0 && (
                  <div>
                    <div style={{ marginBottom: 8 }}>
                      <span
                        style={{
                          fontSize: 11,
                          fontWeight: 600,
                          textTransform: "uppercase",
                          letterSpacing: "0.04em",
                          color: "var(--text-muted, #7A6A8A)",
                        }}
                      >
                        Recently Used
                      </span>
                    </div>
                    <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
                      {recentTools.map(tool => {
                        const isRecentActive = activeItem === tool.id;
                        return (
                          <button
                            key={tool.id}
                            type="button"
                            onClick={() => handleToolClick(tool)}
                            style={{
                              height: 38,
                              padding: "0 12px 0 6px",
                              borderRadius: 8,
                              border: "1px solid var(--more-card-border, #E9D0FD)",
                              background: isRecentActive ? "var(--icon-surface-active)" : "var(--more-card-bg, #FFFFFF)",
                              display: "inline-flex",
                              alignItems: "center",
                              gap: 8,
                              fontSize: 12,
                              fontWeight: 500,
                              color: "var(--text-primary)",
                              cursor: "pointer",
                              fontFamily: "inherit",
                              transition: "background-color 140ms ease, border-color 140ms ease",
                            }}
                            onMouseEnter={e => {
                              e.currentTarget.style.background = "var(--bg-hover, #F4E7FE)";
                              e.currentTarget.style.borderColor = "var(--accent-primary, #931CF5)";
                            }}
                            onMouseLeave={e => {
                              e.currentTarget.style.background = isRecentActive ? "var(--icon-surface-active)" : "var(--more-card-bg, #FFFFFF)";
                              e.currentTarget.style.borderColor = "var(--more-card-border, #E9D0FD)";
                            }}
                          >
                            <div
                              style={{
                                width: 32,
                                height: 32,
                                borderRadius: 8,
                                background: isRecentActive
                                  ? "var(--icon-surface-active)"
                                  : "var(--icon-surface)",
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center",
                                flexShrink: 0,
                              }}
                            >
                              <BezentEnterpriseIcon
                                name={tool.icon}
                                size={19}
                                active={isRecentActive}
                                color={isRecentActive ? "var(--icon-active)" : "var(--icon-container-color, var(--icon-default))"}
                              />
                            </div>
                            <span>{tool.label}</span>
                          </button>
                        );
                      })}
                    </div>
                  </div>
                )}

                {/* 3. MODULE GROUPS — Browsing across all categories */}
                {MORE_CATEGORIES.filter(c => c.id !== "all").map(cat => {
                  const toolsInCat = permittedTools.filter(t => t.category === cat.id);
                  if (toolsInCat.length === 0) return null;

                  return (
                    <div key={cat.id} style={{ display: "flex", flexDirection: "column", gap: 6 }}>
                      {/* Section Header with Category Title & "View all →" Drill-in */}
                      <div
                        style={{
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "space-between",
                          paddingBottom: 4,
                          borderBottom: "1px solid var(--more-panel-divider, #F4E7FE)",
                        }}
                      >
                        <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
                          <span
                            style={{
                              fontSize: 11,
                              fontWeight: 600,
                              textTransform: "uppercase",
                              letterSpacing: "0.04em",
                              color: "var(--text-primary, #111827)",
                            }}
                          >
                            {cat.label}
                          </span>
                          <span
                            style={{
                              fontSize: 11,
                              fontWeight: 500,
                              color: "var(--text-muted, #7A6A8A)",
                            }}
                          >
                            ({toolsInCat.length})
                          </span>
                        </div>

                        <button
                          type="button"
                          onClick={() => handleCategorySelect(cat.id)}
                          style={{
                            background: "transparent",
                            border: "none",
                            padding: 0,
                            cursor: "pointer",
                            fontSize: 12,
                            fontWeight: 500,
                            color: "var(--accent-primary, #931CF5)",
                            fontFamily: "inherit",
                            display: "inline-flex",
                            alignItems: "center",
                            gap: 3,
                          }}
                        >
                          View all →
                        </button>
                      </div>

                      {/* Compact Tool Rows (no descriptions) */}
                      <div style={{ display: "flex", flexDirection: "column", gap: 2 }}>
                        {toolsInCat.map(tool => (
                          <ToolRow
                            key={tool.id}
                            tool={tool}
                            active={activeItem === tool.id}
                            isPinned={quickAccessIds.includes(tool.id)}
                            showDescription={false}
                            onTogglePin={() => togglePinQuickAccess(tool.id)}
                            onClick={() => handleToolClick(tool)}
                          />
                        ))}
                      </div>
                    </div>
                  );
                })}
              </>
            ) : (
              /* ────────────────────────────────────────────────────────── */
              /* MODE 2 — CATEGORY / FOCUS VIEW                             */
              /* ────────────────────────────────────────────────────────── */
              <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
                {/* Category Header with Back Breadcrumb, Title, Count & Description */}
                <div
                  style={{
                    paddingBottom: 16,
                    borderBottom: "1px solid var(--more-panel-divider, #F4E7FE)",
                    display: "flex",
                    flexDirection: "column",
                    gap: 12,
                  }}
                >
                  {/* Subtle Drill-out Breadcrumb */}
                  <button
                    type="button"
                    onClick={() => handleCategorySelect("all")}
                    style={{
                      display: "inline-flex",
                      alignItems: "center",
                      gap: 5,
                      background: "transparent",
                      border: "none",
                      padding: 0,
                      color: "var(--accent-primary, #931CF5)",
                      fontSize: 12,
                      fontWeight: 500,
                      cursor: "pointer",
                      fontFamily: "inherit",
                      width: "fit-content",
                      transition: "opacity 120ms ease",
                    }}
                    onMouseEnter={e => { e.currentTarget.style.opacity = "0.75"; }}
                    onMouseLeave={e => { e.currentTarget.style.opacity = "1"; }}
                  >
                    <L.ArrowLeft size={13} strokeWidth={2.2} />
                    <span>All Tools</span>
                  </button>

                  {/* Title & Count Row */}
                  <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                    {/* Category icon container: 32×32px, subtle #F3E8FF */}
                    <div
                      style={{
                        width: 32,
                        height: 32,
                        borderRadius: 8,
                        background: "var(--icon-surface-active)",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        flexShrink: 0,
                      }}
                    >
                      <BezentEnterpriseIcon
                        name={currentCategoryDef?.iconName || "LayoutGrid"}
                        active={true}
                        size={20}
                        color="var(--icon-active)"
                      />
                    </div>
                    <div style={{ display: "flex", alignItems: "center", gap: 10, flexWrap: "wrap" }}>
                      <h3
                        style={{
                          margin: 0,
                          fontSize: 18,
                          fontWeight: 600,
                          color: "var(--text-primary, #111827)",
                          letterSpacing: "-0.2px",
                          lineHeight: "24px",
                        }}
                      >
                        {currentCategoryDef?.label}
                      </h3>
                      {/* Module count: compact purple-tinted pill */}
                      <span
                        style={{
                          fontSize: 11,
                          fontWeight: 500,
                          padding: "2px 8px",
                          borderRadius: 12,
                          background: "rgba(147, 28, 245, 0.12)",
                          color: "var(--text-primary)",
                          letterSpacing: "-0.1px",
                        }}
                      >
                        {categoryCounts[selectedCategory] ?? 0} {categoryCounts[selectedCategory] === 1 ? "module" : "modules"}
                      </span>
                    </div>
                  </div>

                  {/* One Short Category Description */}
                  {currentCategoryDef?.subtitle && (
                    <p
                      style={{
                        margin: 0,
                        fontSize: 12,
                        fontWeight: 400,
                        color: "var(--text-muted, #6B7280)",
                        lineHeight: "17px",
                      }}
                    >
                      {currentCategoryDef.subtitle}
                    </p>
                  )}
                </div>

                {/* Only Modules Belonging to this Category — Clean, lightweight list */}
                <div style={{ display: "flex", flexDirection: "column", gap: 2 }}>
                  {permittedTools
                    .filter(t => t.category === selectedCategory)
                    .map(tool => (
                      <ToolRow
                        key={tool.id}
                        tool={tool}
                        active={activeItem === tool.id}
                        isPinned={quickAccessIds.includes(tool.id)}
                        showDescription={true}
                        onTogglePin={() => togglePinQuickAccess(tool.id)}
                        onClick={() => handleToolClick(tool)}
                      />
                    ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── Compact Tool Row Component ───────────────────────────────────────────────

interface ToolRowProps {
  tool: BezentToolItem;
  active: boolean;
  isPinned: boolean;
  showDescription?: boolean;
  showCategoryBadge?: boolean;
  onTogglePin: () => void;
  onClick: () => void;
}

function ToolRow({
  tool,
  active,
  isPinned,
  showDescription = false,
  showCategoryBadge = false,
  onTogglePin,
  onClick,
}: ToolRowProps) {
  const [hov, setHov] = useState(false);

  return (
    <div
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      onClick={onClick}
      role="button"
      tabIndex={0}
      style={{
        display: "flex",
        alignItems: "center",
        gap: 12,
        minHeight: showDescription ? 50 : 44,
        padding: showDescription ? "6px 10px" : "0 10px",
        borderRadius: 8,
        border: "none",
        background: active
          ? "var(--icon-row-selected)"
          : hov
          ? "var(--icon-row-hover)"
          : "transparent",
        cursor: "pointer",
        textAlign: "left",
        fontFamily: "inherit",
        outline: "none",
        boxSizing: "border-box",
        transition: "background-color 0.12s ease",
        position: "relative",
      }}
      aria-label={tool.label}
    >
      {/* Standardized 32×32px Icon Container (8px radius) */}
      <div
        style={{
          width: 32,
          height: 32,
          borderRadius: 8,
          background: active
            ? "var(--icon-surface-active)"
            : hov
            ? "var(--icon-surface-hover)"
            : "var(--icon-surface)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          flexShrink: 0,
          transition: "background-color 0.14s ease",
        }}
      >
        <BezentEnterpriseIcon
          name={tool.icon}
          active={active}
          hovered={hov}
          size={19}
          color={
            active
              ? "var(--icon-active)"
              : hov
              ? "var(--icon-hover)"
              : "var(--icon-container-color, var(--icon-default))"
          }
        />
      </div>

      {/* Center Details */}
      <div style={{ flex: 1, minWidth: 0, display: "flex", flexDirection: "column", justifyContent: "center" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
          <span
            style={{
              fontSize: 13,
              fontWeight: active ? 600 : 500,
              lineHeight: "18px",
              color: "var(--text-primary)",
              letterSpacing: "-0.1px",
              whiteSpace: "nowrap",
              overflow: "hidden",
              textOverflow: "ellipsis",
            }}
          >
            {tool.label}
          </span>

          {showCategoryBadge && (
            <span
              style={{
                fontSize: 10.5,
                fontWeight: 500,
                color: "var(--text-muted, #7A6A8A)",
                background: "var(--more-badge-bg, rgba(147, 28, 245, 0.08))",
                padding: "1px 6px",
                borderRadius: 4,
              }}
            >
              {tool.categoryLabel}
            </span>
          )}
        </div>

        {/* Short Description (12px, 400, 17px line-height, muted) */}
        {showDescription && (
          <span
            style={{
              fontSize: 12,
              fontWeight: 400,
              lineHeight: "17px",
              color: "var(--text-muted, #6B7280)",
              whiteSpace: "nowrap",
              overflow: "hidden",
              textOverflow: "ellipsis",
              marginTop: 1,
            }}
          >
            {tool.description}
          </span>
        )}
      </div>

      {/* Right Actions: Favorite Pin + Subtle Neutral Chevron */}
      <div style={{ display: "flex", alignItems: "center", gap: 6, flexShrink: 0 }}>
        {(hov || isPinned) && (
          <button
            type="button"
            title={isPinned ? "Pinned to Quick Access" : "Pin to Quick Access"}
            onClick={e => {
              e.stopPropagation();
              onTogglePin();
            }}
            style={{
              background: "transparent",
              border: "none",
              padding: 4,
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              borderRadius: 4,
              color: isPinned ? "#F59E0B" : "#8A7B91",
              transition: "color 120ms ease, transform 120ms ease",
            }}
            onMouseEnter={e => {
              e.currentTarget.style.color = "#F59E0B";
              e.currentTarget.style.transform = "scale(1.15)";
            }}
            onMouseLeave={e => {
              e.currentTarget.style.color = isPinned ? "#F59E0B" : "#8A7B91";
              e.currentTarget.style.transform = "scale(1)";
            }}
          >
            <L.Star
              size={13}
              fill={isPinned ? "#F59E0B" : "none"}
              stroke={isPinned ? "#F59E0B" : "#8A7B91"}
              strokeWidth={1.75}
            />
          </button>
        )}

        <L.ChevronRight
          size={14}
          style={{
            color: active
              ? "var(--icon-active)"
              : hov
              ? "var(--icon-hover)"
              : "var(--icon-muted)",
            transition: "transform 140ms ease, color 140ms ease",
            transform: hov ? "translateX(2px)" : "translateX(0)",
            opacity: active ? 1 : hov ? 0.9 : 0.6,
          }}
        />
      </div>
    </div>
  );
}

// ─── Quick Access Tile Component ──────────────────────────────────────────────

interface QuickAccessTileProps {
  tool: BezentToolItem;
  active: boolean;
  onClick: () => void;
}

function QuickAccessTile({ tool, active, onClick }: QuickAccessTileProps) {
  const [hov, setHov] = useState(false);

  return (
    <button
      type="button"
      onClick={onClick}
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "flex-start",
        gap: 6,
        padding: "8px 10px",
        borderRadius: 10,
        border: "1px solid var(--more-card-border, #E9D0FD)",
        background: active
          ? "var(--icon-surface-active)"
          : hov
          ? "var(--more-card-hover-bg, #F4E7FE)"
          : "var(--more-card-bg, #FFFFFF)",
        cursor: "pointer",
        textAlign: "left",
        fontFamily: "inherit",
        outline: "none",
        boxSizing: "border-box",
        width: "100%",
        transition: "transform 140ms ease, background-color 140ms ease, border-color 140ms ease",
        transform: hov ? "translateY(-1px)" : "none",
      }}
      aria-label={tool.label}
    >
      {/* Shortcut Icon Container (32×32px, radius 8px) */}
      <div
        style={{
          width: 32,
          height: 32,
          borderRadius: 8,
          background: active
            ? "var(--icon-surface-active)"
            : hov
            ? "var(--icon-surface-hover)"
            : "var(--icon-surface)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          flexShrink: 0,
          transition: "background-color 0.14s ease",
        }}
      >
        <BezentEnterpriseIcon
          name={tool.icon}
          active={active}
          hovered={hov}
          size={19}
          color={
            active
              ? "var(--icon-active)"
              : hov
              ? "var(--icon-hover)"
              : "var(--icon-container-color, var(--icon-default))"
          }
        />
      </div>

      <span
        style={{
          fontSize: 12,
          fontWeight: active ? 600 : 500,
          lineHeight: "16px",
          color: "var(--text-primary)",
          whiteSpace: "nowrap",
          overflow: "hidden",
          textOverflow: "ellipsis",
          width: "100%",
          letterSpacing: "-0.1px",
        }}
      >
        {tool.label}
      </span>
    </button>
  );
}

export default MoreLauncher;
