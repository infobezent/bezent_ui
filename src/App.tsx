import { useState, useEffect, useRef } from "react";
import type { LucideIcon, LucideProps } from "lucide-react";
import * as L from "lucide-react";
import { Folders, Plus, Settings, Wrench } from "lucide-react";
import { RightRailThemeControl, useTheme } from "./theme";
import { GlobalSearch } from "./components/GlobalSearch";
import { SearchResultsView } from "./components/search";
import {
  BezentEmptyState,
  EmptyState,
  MoreLauncher,
  BEZENT_TOOL_REGISTRY,
  type EmptyStateVariant,
  type EmptyStateSize,
} from "./components";
import {
  BezentIcon,
  BezentNavIcon,
  NavIcon,
  FIXED_PRIMARY_ITEMS,
  MODULE_CATALOG,
  getMoreNavigationGroups,
  isModulePermitted,
  HRMS_PRIMARY_RAIL,
  HRMS_MORE_GROUPS,
  BEZENT_ICON_SIZES,
  SIDEBAR_NAV_TOKENS,
  getParentModuleForChild,
  isParentModuleActive,
} from "./design-system/icons";
import type { NavigationModuleItem, NavigationChildItem, NavigationCatalogItem } from "./design-system/icons";

// ─── Design tokens ──────────────────────────────────────────────────────────

const C = {
  navSurface:    "var(--bg-header)",
  headerBorderBottom: "var(--header-border-bottom, var(--border-default))",
  sidebarBg:     "var(--bg-sidebar, var(--bg-header))",
  footerBg:      "var(--bg-footer, var(--bg-header))",
  workspace:     "var(--bg-app)",
  drawerBg:      "var(--bg-drawer, #FEFBFF)",
  overlay:       "var(--bg-overlay, rgba(45,6,77,0.14))",
  hoverBg:       "var(--bg-hover)",       // Hover background
  selectedBg:    "var(--bg-selected)",    // Selected icon background
  secondary:     "var(--accent-primary)",
  primary:       "var(--accent-primary)", // Primary brand accent (#931CF5)
  accent:        "var(--accent-primary)",
  buttonHover:   "var(--btn-create-hover, var(--accent-hover))",   // Button hover
  activePressed: "var(--accent-pressed)", // Active/pressed
  purpleHeading: "var(--text-primary)", // Headings use theme primary (#17111D Light, #FFFFFF Dark), NOT purple
  deep:          "var(--icon-default)",   // Navigation default icon
  text:          "var(--text-primary)",   // #17111D in Light, #FFFFFF in Dark
  textSecondary: "var(--text-secondary)", // #756B7D in Light, #CFC5D6 in Dark
  brand:         "var(--text-brand)",     // #17111D in Light, #FFFFFF in Dark
  muted:         "var(--text-muted)",     // #968D9D in Light, #A99CAF in Dark
  disabled:      "var(--text-disabled)",  // #B8B0BC in Light, #766B7D in Dark
  inverse:       "var(--text-inverse)",   // #FFFFFF in Light, #17111D in Dark
  border:        "var(--border-default)", // Subtle border
  borderFaint:   "var(--border-subtle)",  // Very subtle border
  borderDivider: "var(--border-divider)", // Inner divider
  searchBg:      "var(--bg-search)",      // Search input surface
  popupBg:       "var(--bg-popup)",       // Popup / flyout surface
  popupHeader:   "var(--bg-popup-header)",// Popup sticky header surface
  floatingBg:        "var(--floating-surface-bg, #FFFFFF)",
  floatingHeaderBg:  "var(--floating-surface-header-bg, #FDF7FF)",
  floatingBorder:    "var(--floating-surface-border, #EEE5F2)",
  floatingDivider:   "var(--floating-surface-divider, #F0E8F3)",
  floatingShadow:    "var(--floating-surface-shadow, 0 4px 16px rgba(45, 6, 77, 0.06), 0 1px 3px rgba(45, 6, 77, 0.04))",
  floatingRowHover:   "var(--floating-row-hover, #F7EEFC)",
  floatingRowSelected:"var(--floating-row-selected, #EAD7FD)",
};

// ─── BEZENT STANDARDIZED LUCIDE ICON SYSTEM ──────────────────────────────────

export type IconSize = "compact" | "nav" | "action" | "module" | number;
export type IconState = "default" | "hover" | "selected" | "pressed" | "disabled";

export const ICON_SIZES: Record<string, number> = {
  compact: 18,
  nav: 20,
  action: 20,
  module: 22,
};

export const ICON_COLORS: Record<IconState, string> = {
  default:  "var(--icon-default, #B8A7C7)",   // Normal navigation icon
  hover:    "var(--icon-hover, #B56CFF)",     // Hover icon
  selected: "var(--icon-active, #A020F0)",    // Selected icon
  pressed:  "var(--accent-pressed, #7114BD)", // Pressed/active
  disabled: "var(--icon-muted, #8E7E9E)",
};

export interface AppIconProps extends Omit<LucideProps, "size" | "color"> {
  icon: LucideIcon;
  size?: IconSize;
  state?: IconState;
  color?: string;
  strokeWidth?: number;
}

export function AppIcon({
  icon: IconComponent,
  size = "nav",
  state = "default",
  color,
  strokeWidth = 1.8,
  className,
  style,
  ...rest
}: AppIconProps) {
  const pixelSize = typeof size === "number" ? size : (ICON_SIZES[size] ?? 20);
  const iconColor = color ?? ICON_COLORS[state] ?? ICON_COLORS.default;

  return (
    <span
      style={{
        width: pixelSize,
        height: pixelSize,
        display: "inline-flex",
        alignItems: "center",
        justifyContent: "center",
        flexShrink: 0,
      }}
    >
      <IconComponent
        size={pixelSize}
        color={iconColor}
        strokeWidth={strokeWidth}
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
        className={className}
        style={{ display: "block", ...style }}
        {...rest}
      />
    </span>
  );
}

// Compatibility adapter for MatIcon — seamlessly delegates to centralized BezentIcon
export function MatIcon({
  name,
  size = 20,
  filled = false,
  color,
}: {
  name: string;
  size?: number;
  filled?: boolean;
  color?: string;
}) {
  const iconColor = color ?? (filled ? C.primary : C.deep);
  return (
    <BezentIcon
      name={name}
      variant={filled ? "solid" : "outline"}
      size={size}
      color={iconColor}
    />
  );
}

// Compatibility adapter for legacy Ico calls
export function Ico({
  d,
  size = 18,
  color = C.muted,
  sw = 1.8,
}: {
  d?: any;
  size?: number;
  color?: string;
  sw?: number;
}) {
  return (
    <span
      style={{
        width: size,
        height: size,
        display: "inline-flex",
        alignItems: "center",
        justifyContent: "center",
        flexShrink: 0,
      }}
    >
      <L.Sparkles
        size={size}
        color={color}
        strokeWidth={sw}
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
      />
    </span>
  );
}

// ─── Shared: Tooltip ─────────────────────────────────────────────────────────

function Tooltip({ label, direction = "left" }: { label: string; direction?: "left" | "right" | "up" | "down" }) {
  return (
    <div style={{
      position: "absolute",
      ...(direction === "left"
        ? { right: "calc(100% + 8px)", top: "50%", transform: "translateY(-50%)" }
        : direction === "right"
        ? { left: "calc(100% + 8px)", top: "50%", transform: "translateY(-50%)" }
        : direction === "down"
        ? { top: "calc(100% + 8px)", left: "50%", transform: "translateX(-50%)" }
        : { bottom: "calc(100% + 6px)", left: "50%", transform: "translateX(-50%)" }),
      background: "var(--bg-popup)",
      color: "var(--text-primary)",
      border: `1px solid ${C.border}`,
      fontSize: 11, fontWeight: 500, lineHeight: 1,
      padding: "5px 8px", borderRadius: 6,
      whiteSpace: "nowrap", pointerEvents: "none", zIndex: 300,
      boxShadow: "var(--shadow-dropdown)",
    }}>
      {label}
    </div>
  );
}

// ─── TOP NAV ─────────────────────────────────────────────────────────────────

function TopNav({
  activeModule,
  onNavigate,
  searchQuery,
  isSearchActive,
  onSearchQueryChange,
  onExecuteSearch,
  onClearSearch,
  onToggleAI,
  aiOpen,
  notifs,
  notifOpen,
  onToggleNotifs,
  onCloseNotifs,
  onMarkRead,
  onMarkAllRead,
  onViewAllNotifs,
  onOpenSettings,
  settingsOpen,
}: {
  activeModule?: string;
  onNavigate?: (moduleName: string, childId?: string) => void;
  searchQuery?: string;
  isSearchActive?: boolean;
  onSearchQueryChange?: (q: string) => void;
  onExecuteSearch?: (q: string) => void;
  onClearSearch?: () => void;
  onToggleAI: () => void;
  aiOpen: boolean;
  notifs: Notif[];
  notifOpen: boolean;
  onToggleNotifs: () => void;
  onCloseNotifs: () => void;
  onMarkRead: (id: string) => void;
  onMarkAllRead: () => void;
  onViewAllNotifs: () => void;
  onOpenSettings?: () => void;
  settingsOpen?: boolean;
}) {
  const [qaOpen, setQaOpen]             = useState(false);
  const [createHov, setCreateHov]       = useState(false);
  const [createPressed, setCreatePressed] = useState(false);
  const [bellHov, setBellHov]           = useState(false);
  const [aiHov, setAiHov]               = useState(false);
  const [profHov, setProfHov]           = useState(false);
  const bellRef = useRef<HTMLDivElement>(null);

  const unreadCount = notifs.filter(n => !n.read).length;

  return (
    <header style={{
      position: "fixed", inset: "0 0 auto 0", zIndex: 100,
      height: 60, display: "flex", alignItems: "center", gap: 10, padding: "0 18px",
      background: C.navSurface,
      borderBottom: `1px solid ${C.headerBorderBottom}`,
    }}>

      {/* Left branding */}
      <div style={{ display: "flex", alignItems: "center", gap: 8, flexShrink: 0 }}>
        <div style={{
          width: 30, height: 30, borderRadius: 8,
          background: C.primary,
          display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0,
          boxShadow: "0 1px 3px rgba(147, 28, 245, 0.25)",
        }}>
          <span style={{ color: "#fff", fontSize: 12, fontWeight: 700, letterSpacing: "-0.2px", lineHeight: 1 }}>BZ</span>
        </div>

        <span style={{
          fontSize: 15,
          fontWeight: 700,
          color: C.brand,
          letterSpacing: "-0.3px",
          userSelect: "none",
          lineHeight: 1,
        }}>
          BEZENT
        </span>
      </div>

      {/* Center search — BEZENT context-aware continuous floating search */}
      <GlobalSearch
        maxWidth={460}
        activeModule={activeModule}
        searchQuery={searchQuery}
        isSearchActive={isSearchActive}
        onSearchQueryChange={onSearchQueryChange}
        onExecuteSearch={onExecuteSearch}
        onClearSearch={onClearSearch}
        onNavigate={onNavigate}
      />

      {/* Right action controls: utility icons → primary create action → BEZENT AI → app launcher → profile */}
      <div style={{ display: "flex", alignItems: "center", gap: 8, flexShrink: 0 }}>

        {/* 1. Notification Bell — clean standalone line icon */}
        <div style={{ position: "relative", display: "inline-flex", alignItems: "center", justifyContent: "center" }} ref={bellRef}>
          <button
            type="button"
            onClick={onToggleNotifs}
            aria-label="Notifications"
            onMouseEnter={() => setBellHov(true)}
            onMouseLeave={() => setBellHov(false)}
            style={{
              width: 36, height: 36,
              display: "flex", alignItems: "center", justifyContent: "center",
              position: "relative",
              background: notifOpen ? "var(--nav-selected)" : bellHov ? "var(--top-utility-hover, var(--nav-hover))" : "transparent",
              border: "none",
              borderRadius: notifOpen ? "10px 10px 0 0" : 10,
              cursor: "pointer",
              transition: "background-color 0.14s ease, border-radius 0.14s ease",
              outline: "none",
              padding: 0,
            }}
          >
            <BezentIcon
              name="notifications"
              size={19}
              color={notifOpen ? "var(--icon-active)" : "var(--top-utility-icon, var(--icon-default))"}
              strokeWidth={1.8}
            />

            {/* Notification Badge: smaller, cleaner, partially overlapping bell's top-right corner */}
            {unreadCount > 0 && (
              <span style={{
                position: "absolute",
                top: 4, right: 4,
                minWidth: 14, height: 14,
                padding: "0 3.5px",
                borderRadius: 99,
                background: "#931CF5",
                color: "#FFFFFF",
                fontSize: 9, fontWeight: 700,
                lineHeight: "14px", textAlign: "center",
                border: "1.5px solid var(--bg-header)",
                boxShadow: "0 1px 2px rgba(147, 28, 245, 0.25)",
                pointerEvents: "none",
                display: "flex", alignItems: "center", justifyContent: "center",
                boxSizing: "border-box",
              }}>
                {unreadCount}
              </span>
            )}
          </button>

          {/* Active visual connection from Bell to opened panel below 60px line */}
          {notifOpen && (
            <div style={{
              position: "absolute",
              bottom: -13,
              left: 0,
              right: 0,
              height: 14,
              background: "var(--nav-selected)",
              zIndex: 101,
            }} />
          )}

          {bellHov && !notifOpen && (
            <Tooltip label="Notifications" direction="down" />
          )}
        </div>

        {/* 2. Settings — clean standalone line icon */}
        <NavIconBtn label="Settings" active={settingsOpen} onClick={onOpenSettings}>
          <Settings
            size={19}
            color={settingsOpen ? "var(--icon-active)" : "var(--top-utility-icon, var(--icon-default))"}
            strokeWidth={1.8}
          />
        </NavIconBtn>

        {/* 3. Quick Create (+) — compact solid primary action */}
        <div
          style={{ position: "relative", display: "inline-flex", alignItems: "center", justifyContent: "center" }}
          onMouseEnter={() => setCreateHov(true)}
          onMouseLeave={() => { setCreateHov(false); setCreatePressed(false); }}
        >
          <button
            type="button"
            aria-label="Quick Create"
            onMouseDown={() => setCreatePressed(true)}
            onMouseUp={() => setCreatePressed(false)}
            style={{
              width: 34, height: 34,
              display: "flex", alignItems: "center", justifyContent: "center",
              background: createPressed ? "#7114BD" : createHov ? "var(--btn-create-hover, #8418DC)" : "#931CF5",
              border: "none",
              borderRadius: 10,
              cursor: "pointer",
              boxShadow: "0 1px 2px rgba(0, 0, 0, 0.08)",
              transition: "background-color 0.14s ease, transform 0.08s ease",
              outline: "none",
              padding: 0,
            }}
          >
            <Plus size={20} strokeWidth={2} color="var(--icon-on-solid, #FFFFFF)" />
          </button>
          {createHov && (
            <Tooltip label="Quick Create" direction="down" />
          )}
        </div>

        {/* 4. BEZENT AI — distinctive premium secondary action */}
        <button
          type="button"
          onClick={onToggleAI}
          aria-label="BEZENT AI"
          onMouseEnter={() => setAiHov(true)}
          onMouseLeave={() => setAiHov(false)}
          style={{
            display: "flex", alignItems: "center", gap: 6,
            height: 34, padding: "0 13px",
            background: aiOpen ? "var(--btn-ai-active-bg)" : aiHov ? "var(--btn-ai-hover-bg)" : "var(--btn-ai-bg)",
            color: aiOpen ? "var(--btn-ai-active-text)" : "var(--btn-ai-text)",
            border: `1px solid ${aiOpen ? "var(--btn-ai-active-border)" : aiHov ? "var(--btn-ai-hover-border)" : "var(--btn-ai-border)"}`,
            borderRadius: 10,
            cursor: "pointer",
            fontSize: 12, fontWeight: 600, fontFamily: "inherit",
            letterSpacing: "-0.1px",
            transition: "background-color 0.14s ease, border-color 0.14s ease, color 0.14s ease",
            outline: "none",
            userSelect: "none",
          }}
        >
          <BezentIcon
            name="sparkles"
            size={15}
            color={aiOpen ? "var(--btn-ai-active-text)" : "var(--btn-ai-icon)"}
          />
          <span>BEZENT AI</span>
        </button>

        {/* 5. App Launcher — standalone grid icon */}
        <NavIconBtn label="App Launcher" active={qaOpen} onClick={() => setQaOpen(v => !v)}>
          <BezentIcon
            name="apps"
            size={19}
            color={qaOpen ? "var(--icon-active)" : "var(--top-utility-icon, var(--icon-default))"}
            strokeWidth={1.8}
          />
        </NavIconBtn>
        {qaOpen && <QuickActionsPopover onClose={() => setQaOpen(false)} />}

        {/* 6. Profile Avatar — circular 34px solid #7114BD */}
        <div
          title="Profile (SD)"
          aria-label="Profile"
          role="button"
          tabIndex={0}
          onMouseEnter={() => setProfHov(true)}
          onMouseLeave={() => setProfHov(false)}
          style={{
            width: 34, height: 34,
            borderRadius: "50%",
            background: "#7114BD",
            display: "flex", alignItems: "center", justifyContent: "center",
            color: "#FFFFFF",
            fontSize: 11.5,
            fontWeight: 600,
            letterSpacing: "0.2px",
            cursor: "pointer",
            flexShrink: 0,
            userSelect: "none",
            transition: "opacity 0.14s ease",
            opacity: profHov ? 0.92 : 1,
            outline: "none",
          }}
        >
          SD
        </div>
      </div>

      {/* Floating Notification Dropdown Panel */}
      {notifOpen && (
        <NotificationDropdown
          notifs={notifs}
          onClose={onCloseNotifs}
          onMarkAllRead={onMarkAllRead}
          onMarkRead={onMarkRead}
          onViewAll={onViewAllNotifs}
          bellRef={bellRef}
        />
      )}
    </header>
  );
}

function NavIconBtn({
  children, onClick, label, active,
}: {
  children: React.ReactNode; onClick?: () => void; label?: string; active?: boolean;
}) {
  const [hov, setHov] = useState(false);
  return (
    <div style={{ position: "relative", display: "inline-flex", alignItems: "center", justifyContent: "center" }}>
      <button
        type="button"
        onClick={onClick}
        aria-label={label}
        onMouseEnter={() => setHov(true)}
        onMouseLeave={() => setHov(false)}
        style={{
          width: 36, height: 36,
          display: "flex", alignItems: "center", justifyContent: "center",
          background: active ? "var(--nav-selected)" : hov ? "var(--top-utility-hover, var(--nav-hover))" : "transparent",
          border: "none", borderRadius: 10, cursor: "pointer",
          transition: "background-color 0.14s ease",
          outline: "none",
          padding: 0,
        }}
      >
        {children}
      </button>
      {hov && label && !active && (
        <Tooltip label={label} direction="down" />
      )}
    </div>
  );
}

const QA_ITEMS = [
  { icon: "onboarding",   label: "Add Employee" },
  { icon: "recruitment",  label: "Post Job"      },
  { icon: "calendar",     label: "Schedule"      },
  { icon: "requests",     label: "New Request"   },
  { icon: "performance",  label: "Review"        },
  { icon: "assets",       label: "Assign Asset"  },
  { icon: "learning",     label: "Add Course"    },
  { icon: "reports",      label: "Report"        },
  { icon: "documents",    label: "Document"      },
];

function QuickActionsPopover({ onClose }: { onClose: () => void }) {
  return (
    <>
      <div onClick={onClose} style={{ position: "fixed", inset: 0, zIndex: 90 }} />
      <div style={{
        position: "absolute", top: 42, right: 0, zIndex: 100,
        width: 210, padding: 8,
        display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 3,
        background: C.popupBg,
        border: `1px solid ${C.border}`, borderRadius: 12,
        boxShadow: "var(--shadow-dropdown)",
      }}>
        {QA_ITEMS.map(item => <QACell key={item.label} icon={item.icon} label={item.label} />)}
      </div>
    </>
  );
}

function QACell({ icon, label }: { icon: string; label: string }) {
  const [hov, setHov] = useState(false);
  return (
    <button
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      style={{
        display: "flex", flexDirection: "column", alignItems: "center", gap: 5,
        padding: "9px 4px", borderRadius: 8, border: "none", cursor: "pointer",
        background: hov ? C.hoverBg : "transparent",
        transition: "background 0.12s", fontFamily: "inherit",
      }}
    >
      <BezentIcon name={icon} size={BEZENT_ICON_SIZES.quickAction} color={hov ? "var(--icon-hover)" : "var(--icon-default)"} strokeWidth={1.8} />
      <span style={{ fontSize: 10, fontWeight: 500, color: C.text, lineHeight: 1.3, textAlign: "center" }}>
        {label}
      </span>
    </button>
  );
}

// ─── ZOHO-STYLE LEFT RAIL NAVIGATION ──────────────────────────────────────────

interface RailItem {
  id: string;
  icon: string;
  label: string;
}

const DYNAMIC_SLOT_STORAGE_KEY = "bezent.dynamicSidebarModule";
const DEFAULT_DYNAMIC_MODULE_ID = "Assets";

function getInitialDynamicModule(): string {
  if (typeof window === "undefined") return DEFAULT_DYNAMIC_MODULE_ID;
  try {
    const saved = localStorage.getItem(DYNAMIC_SLOT_STORAGE_KEY);
    if (saved && MODULE_CATALOG[saved] && isModulePermitted(saved)) {
      return saved;
    }
  } catch {}
  return DEFAULT_DYNAMIC_MODULE_ID;
}

function ZohoRailBtn({
  item,
  active,
  isHoveredForSubNav,
  onClick,
  onHoverStart,
  onHoverEnd,
}: {
  item: NavigationModuleItem;
  active: boolean;
  isHoveredForSubNav?: boolean;
  onClick: () => void;
  onHoverStart?: (el: HTMLElement) => void;
  onHoverEnd?: () => void;
}) {
  const { mode } = useTheme();
  const isDark = mode === "dark";
  const [hov, setHov] = useState(false);
  const btnRef = useRef<HTMLButtonElement>(null);
  const effectiveHov = hov || Boolean(isHoveredForSubNav);

  return (
    <div style={{ position: "relative", width: "100%", display: "flex", justifyContent: "center", flexShrink: 0 }}>
      <button
        ref={btnRef}
        onClick={onClick}
        onMouseEnter={() => {
          setHov(true);
          if (btnRef.current) {
            onHoverStart?.(btnRef.current);
          }
        }}
        onMouseLeave={() => {
          setHov(false);
          onHoverEnd?.();
        }}
        style={{
          width: SIDEBAR_NAV_TOKENS.itemWidth,
          height: SIDEBAR_NAV_TOKENS.itemHeight,
          paddingTop: SIDEBAR_NAV_TOKENS.paddingTop,
          paddingBottom: 0,
          paddingLeft: 2,
          paddingRight: 2,
          boxSizing: "border-box",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "flex-start",
          gap: SIDEBAR_NAV_TOKENS.iconToLabelGap,
          borderRadius: 10,
          border: "none",
          background: "transparent",
          cursor: "pointer",
          fontFamily: "inherit",
          outline: "none",
          flexShrink: 0,
        }}
      >
        {/* Standardized Reusable BezentNavIcon Container */}
        <BezentNavIcon
          name={item.icon}
          active={active}
          hovered={effectiveHov}
          size={SIDEBAR_NAV_TOKENS.iconSize}
        />

        {/* Dedicated fixed 2-line reserved label area */}
        <div
          style={{
            width: "100%",
            maxWidth: SIDEBAR_NAV_TOKENS.labelMaxWidth,
            height: SIDEBAR_NAV_TOKENS.labelAreaHeight,
            flexShrink: 0,
            display: "flex",
            alignItems: "flex-start",
            justifyContent: "center",
            overflow: "hidden",
          }}
        >
          <span
            style={{
              fontSize: SIDEBAR_NAV_TOKENS.labelFontSize,
              fontWeight: active ? 600 : 500,
              color: "var(--nav-label-default, var(--text-primary))",
              lineHeight: SIDEBAR_NAV_TOKENS.labelLineHeight,
              textAlign: "center",
              width: "100%",
              maxWidth: SIDEBAR_NAV_TOKENS.labelMaxWidth,
              display: "-webkit-box",
              WebkitLineClamp: SIDEBAR_NAV_TOKENS.labelMaxLines,
              WebkitBoxOrient: "vertical",
              overflow: "hidden",
              textOverflow: "ellipsis",
              wordBreak: "normal",
              overflowWrap: "normal",
              hyphens: "none",
              transition: "color 160ms ease",
            }}
          >
            {item.label}
          </span>
        </div>
      </button>
    </div>
  );
}

function LeftNav({
  activeItem,
  activeChildId,
  onSelectItem,
  onSelectChild,
}: {
  activeItem: string;
  activeChildId?: string | null;
  onSelectItem: (id: string) => void;
  onSelectChild?: (parentId: string, childId: string, route: string) => void;
}) {
  const { mode } = useTheme();
  const isDark = mode === "dark";
  const [dynamicModuleId, setDynamicModuleId] = useState<string>(getInitialDynamicModule);
  const [moreOpen, setMoreOpen] = useState(false);
  const [moreHov, setMoreHov] = useState(false);
  const moreBtnRef = useRef<HTMLDivElement>(null);

  // Sub-Navigation hover state
  const [hoveredSubNav, setHoveredSubNav] = useState<{
    item: NavigationModuleItem;
    triggerCenterY: number;
  } | null>(null);
  const subNavTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const cancelSubNavTimer = () => {
    if (subNavTimerRef.current) {
      clearTimeout(subNavTimerRef.current);
      subNavTimerRef.current = null;
    }
  };

  const scheduleSubNavClose = (delay = 200) => {
    cancelSubNavTimer();
    subNavTimerRef.current = setTimeout(() => {
      setHoveredSubNav(null);
    }, delay);
  };

  const handleHoverStart = (item: NavigationModuleItem, el: HTMLElement) => {
    cancelSubNavTimer();
    if (moreOpen) return; // More launcher takes precedence
    const rect = el.getBoundingClientRect();
    const triggerCenterY = rect.top + (rect.height / 2);
    setHoveredSubNav({
      item,
      triggerCenterY,
    });
  };

  const handleHoverEnd = () => {
    scheduleSubNavClose(200);
  };

  useEffect(() => {
    return () => cancelSubNavTimer();
  }, []);

  // Active state in More is true if activeItem is currently in More (and not in dynamic slot)
  const isMoreActive = BEZENT_TOOL_REGISTRY.some(
    tool => tool.id === activeItem && activeItem !== dynamicModuleId
  );

  // Resolved dynamic quick-access module from the canonical catalog
  const dynamicItem = MODULE_CATALOG[dynamicModuleId] ?? MODULE_CATALOG[DEFAULT_DYNAMIC_MODULE_ID];

  // Reusable swap function to promote any module from More to the dynamic quick-access sidebar slot
  const promoteModule = (moduleId: string) => {
    if (!isModulePermitted(moduleId)) return;
    setDynamicModuleId(moduleId);
    try {
      localStorage.setItem(DYNAMIC_SLOT_STORAGE_KEY, moduleId);
    } catch {}
    onSelectItem(moduleId);
    setMoreOpen(false);
  };

  // Close flyout on Escape key
  useEffect(() => {
    function handleKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape") {
        setMoreOpen(false);
        setHoveredSubNav(null);
      }
    }
    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [moreOpen]);


  return (
    <>
      <aside
        id="left-sidebar"
        style={{
          position: "fixed",
          top: 60,
          bottom: 36,
          left: 0,
          width: 90,
          background: C.sidebarBg,
          borderRight: `1px solid ${C.border}`,
          zIndex: 90,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          padding: "8px 0 6px",
        }}
      >
        {/* Continuous navigation list showing 6 fixed primary items + 1 dynamic slot + More */}
        <div
          style={{
            flex: 1,
            width: "100%",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: SIDEBAR_NAV_TOKENS.railItemGap,
            overflowY: "auto",
            overflowX: "hidden",
            scrollbarWidth: "none",
            paddingBottom: 8,
          }}
        >
          {/* Slots 1 to 6: Fixed Primary Navigation Slots */}
          {FIXED_PRIMARY_ITEMS.map(item => {
            const isItemActive = isParentModuleActive(item.id, activeItem, activeChildId);
            return (
              <ZohoRailBtn
                key={item.id}
                item={item}
                active={isItemActive}
                isHoveredForSubNav={hoveredSubNav?.item.id === item.id}
                onHoverStart={el => handleHoverStart(item, el)}
                onHoverEnd={handleHoverEnd}
                onClick={() => {
                  cancelSubNavTimer();
                  setHoveredSubNav(null);
                  onSelectItem(item.id);
                  setMoreOpen(false);
                }}
              />
            );
          })}

          {/* Slot 7: Dynamic Quick-Access Module Slot (immediately above More) */}
          <ZohoRailBtn
            key={dynamicItem.id}
            item={dynamicItem}
            active={isParentModuleActive(dynamicItem.id, activeItem, activeChildId)}
            isHoveredForSubNav={hoveredSubNav?.item.id === dynamicItem.id}
            onHoverStart={el => handleHoverStart(dynamicItem, el)}
            onHoverEnd={handleHoverEnd}
            onClick={() => {
              cancelSubNavTimer();
              setHoveredSubNav(null);
              onSelectItem(dynamicItem.id);
              setMoreOpen(false);
            }}
          />

          {/* More button */}
          <div ref={moreBtnRef} style={{ position: "relative", width: "100%", display: "flex", justifyContent: "center", flexShrink: 0 }}>
            <button
              onClick={() => {
                cancelSubNavTimer();
                setHoveredSubNav(null);
                setMoreOpen(v => !v);
              }}
              onMouseEnter={() => {
                setMoreHov(true);
                setHoveredSubNav(null);
              }}
              onMouseLeave={() => setMoreHov(false)}
              title={isMoreActive ? `More (${activeItem})` : "More Modules"}
              style={{
                width: SIDEBAR_NAV_TOKENS.itemWidth,
                height: SIDEBAR_NAV_TOKENS.itemHeight,
                paddingTop: SIDEBAR_NAV_TOKENS.paddingTop,
                paddingBottom: 0,
                paddingLeft: 2,
                paddingRight: 2,
                boxSizing: "border-box",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "flex-start",
                gap: SIDEBAR_NAV_TOKENS.iconToLabelGap,
                borderRadius: 10,
                border: "none",
                background: "transparent",
                cursor: "pointer",
                fontFamily: "inherit",
                outline: "none",
                flexShrink: 0,
              }}
            >
              <BezentNavIcon
                name="more"
                active={isMoreActive || moreOpen}
                hovered={moreHov}
                size={SIDEBAR_NAV_TOKENS.iconSize}
              >
                {/* Subtle active indicator dot on More when child item is active and menu is closed */}
                {isMoreActive && !moreOpen && (
                  <span
                    style={{
                      position: "absolute",
                      top: 4,
                      right: 4,
                      width: 5,
                      height: 5,
                      borderRadius: "50%",
                      background: "var(--accent-primary, #931CF5)",
                      pointerEvents: "none",
                    }}
                  />
                )}
              </BezentNavIcon>

              {/* Dedicated fixed 2-line reserved label area */}
              <div
                style={{
                  width: "100%",
                  maxWidth: SIDEBAR_NAV_TOKENS.labelMaxWidth,
                  height: SIDEBAR_NAV_TOKENS.labelAreaHeight,
                  flexShrink: 0,
                  display: "flex",
                  alignItems: "flex-start",
                  justifyContent: "center",
                  overflow: "hidden",
                }}
              >
                <span
                  style={{
                    fontSize: SIDEBAR_NAV_TOKENS.labelFontSize,
                    fontWeight: (isMoreActive || moreOpen) ? 600 : 500,
                    color: "var(--nav-label-default, var(--text-primary))",
                    lineHeight: SIDEBAR_NAV_TOKENS.labelLineHeight,
                    textAlign: "center",
                    width: "100%",
                    maxWidth: SIDEBAR_NAV_TOKENS.labelMaxWidth,
                    display: "-webkit-box",
                    WebkitLineClamp: SIDEBAR_NAV_TOKENS.labelMaxLines,
                    WebkitBoxOrient: "vertical",
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                    wordBreak: "normal",
                    overflowWrap: "normal",
                    hyphens: "none",
                    transition: "color 160ms ease",
                  }}
                >
                  More
                </span>
              </div>
            </button>
            {moreHov && !moreOpen && (
              <Tooltip label={isMoreActive ? `More (${activeItem})` : "More"} direction="right" />
            )}
          </div>
        </div>
      </aside>

      {/* BEZENT HR Workspace / Tool Launcher */}
      <MoreLauncher
        isOpen={moreOpen}
        onClose={() => setMoreOpen(false)}
        activeItem={activeItem}
        onSelectModule={onSelectItem}
        onPromoteModule={promoteModule}
      />

      {/* Sub-Navigation Prototype Hover Flyout Shell */}
      {hoveredSubNav && !moreOpen && (
        <SubNavFlyout
          item={hoveredSubNav.item}
          triggerCenterY={hoveredSubNav.triggerCenterY}
          onMouseEnter={cancelSubNavTimer}
          onMouseLeave={() => scheduleSubNavClose(200)}
        />
      )}
    </>
  );
}

/**
 * Premium Gmail-style Left-Facing Triangular Pointer / Notch
 * Sits on the left edge of the stationary flyout surface and dynamically
 * aligns with the vertical center of whichever navigation item is hovered.
 */
function DynamicFlyoutPointer({
  pointerTop,
  headerHeight = 46,
}: {
  pointerTop: number;
  headerHeight?: number;
}) {
  const isHeaderRegion = pointerTop <= headerHeight;
  const bg = isHeaderRegion
    ? "var(--floating-surface-header-bg, " + C.floatingHeaderBg + ")"
    : "var(--floating-surface-bg, " + C.floatingBg + ")";

  return (
    <div
      aria-hidden="true"
      style={{
        position: "absolute",
        left: -6,
        top: pointerTop,
        width: 10,
        height: 10,
        background: bg,
        borderLeft: `1px solid var(--floating-surface-border, ${C.floatingBorder})`,
        borderBottom: `1px solid var(--floating-surface-border, ${C.floatingBorder})`,
        borderTop: "none",
        borderRight: "none",
        transform: "translateY(-50%) rotate(45deg)",
        transition: "top 160ms cubic-bezier(0.16, 1, 0.3, 1), background-color 160ms ease",
        zIndex: 40,
        pointerEvents: "none",
      }}
    />
  );
}

const MODULE_SUBNAV_MAP: Record<string, { label: string; icon: string }[]> = {
  "Dashboard": [
    { label: "Overview", icon: "dashboard" },
    { label: "Analytics", icon: "analytics" },
    { label: "Activity Feed", icon: "history" },
    { label: "Reports", icon: "assessment" },
  ],
  "Onboarding": [
    { label: "New Hires", icon: "person_add" },
    { label: "Task Checklists", icon: "checklist" },
    { label: "Document Collection", icon: "description" },
    { label: "Workflow Settings", icon: "settings" },
  ],
  "Leave Tracker": [
    { label: "Leave Summary", icon: "event_available" },
    { label: "Apply Leave", icon: "edit_calendar" },
    { label: "Leave Approvals", icon: "verified" },
    { label: "Holiday Calendar", icon: "calendar_month" },
  ],
  "Attendance": [
    { label: "Today's Log", icon: "schedule" },
    { label: "Shift Schedule", icon: "access_time" },
    { label: "Monthly Summary", icon: "date_range" },
    { label: "Attendance Policy", icon: "rule" },
  ],
  "Time Tracker": [
    { label: "Timer & Log", icon: "timer" },
    { label: "Timesheets", icon: "table_chart" },
    { label: "Project Hours", icon: "work" },
    { label: "Approvals", icon: "done_all" },
  ],
  "Performance": [
    { label: "Appraisal Cycle", icon: "trending_up" },
    { label: "Goals & OKRs", icon: "track_changes" },
    { label: "360 Feedback", icon: "forum" },
    { label: "Review Summaries", icon: "bar_chart" },
  ],
  "Timesheets": [
    { label: "Weekly Timesheet", icon: "calendar_view_week" },
    { label: "Approval Queue", icon: "pending_actions" },
    { label: "Project Allocation", icon: "pie_chart" },
    { label: "Export Hours", icon: "download" },
  ],
  "Employees": [
    { label: "Directory", icon: "badge" },
    { label: "Departments", icon: "corporate_fare" },
    { label: "Org Chart", icon: "account_tree" },
    { label: "Documents", icon: "documents" },
  ],
};

const DEFAULT_SUBNAV_ITEMS: { label: string; icon: string }[] = [
  { label: "Overview", icon: "dashboard" },
  { label: "Recent Records", icon: "history" },
  { label: "Reports & Insights", icon: "assessment" },
  { label: "Preferences", icon: "settings" },
];

interface SubNavFlyoutProps {
  item: NavigationModuleItem;
  triggerCenterY: number;
  onMouseEnter: () => void;
  onMouseLeave: () => void;
}

function SubNavFlyout({
  item,
  triggerCenterY,
  onMouseEnter,
  onMouseLeave,
}: SubNavFlyoutProps) {
  const flyoutRef = useRef<HTMLDivElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const [selectedIdx, setSelectedIdx] = useState<number>(0);
  const [headerHeight, setHeaderHeight] = useState(46);
  const [popupHeight, setPopupHeight] = useState(230);

  // Measure actual DOM height of flyout and header
  useEffect(() => {
    if (flyoutRef.current) {
      setPopupHeight(flyoutRef.current.offsetHeight || 230);
    }
    if (headerRef.current) {
      setHeaderHeight(headerRef.current.offsetHeight || 46);
    }
  }, [item]);

  // Contextual Positioning & Viewport Clamping:
  const windowHeight = typeof window !== "undefined" ? window.innerHeight : 800;
  const minPopupTop = 66; // 60px header + 6px safe gap
  const maxPopupTop = Math.max(minPopupTop, windowHeight - 44 - popupHeight);

  // Approximate vertical span of the sidebar items (Dashboard center ~103px to bottom items ~540px)
  const minTriggerY = 100;
  const maxTriggerY = 540;
  const progress = Math.min(Math.max((triggerCenterY - minTriggerY) / (maxTriggerY - minTriggerY), 0), 1);

  // Target pointer offset inside popup smoothly transitions from ~30px (for top items like Dashboard)
  // to ~115px (centered in body for lower items like Assets)
  const preferredPointerOffset = 30 + progress * 85;

  const desiredPopupTop = triggerCenterY - preferredPointerOffset;
  const computedPopupTop = Math.min(Math.max(desiredPopupTop, minPopupTop), maxPopupTop);

  const rawPointerTop = triggerCenterY - computedPopupTop;
  const minPointerTop = 16;
  const maxPointerTop = Math.max(minPointerTop, popupHeight - 16);
  const clampedPointerTop = Math.min(Math.max(rawPointerTop, minPointerTop), maxPointerTop);

  const subNavItems = MODULE_SUBNAV_MAP[item.id] || MODULE_SUBNAV_MAP[item.label] || DEFAULT_SUBNAV_ITEMS;

  return (
    <div
      ref={flyoutRef}
      className="subnav-flyout-enter"
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      style={{
        position: "fixed",
        left: 94,
        top: computedPopupTop,
        width: 250, // Compact desktop width
        height: "auto",
        minHeight: 220,
        maxHeight: 360,
        background: "var(--floating-surface-bg, " + C.floatingBg + ")",
        border: `1px solid var(--floating-surface-border, ${C.floatingBorder})`,
        borderRadius: 14,
        boxShadow: "var(--floating-surface-shadow, " + C.floatingShadow + ")",
        zIndex: 340,
        display: "flex",
        flexDirection: "column",
        overflow: "visible", // Allows dynamic pointer notch to seamlessly extend toward the sidebar
        transition: "top 160ms cubic-bezier(0.16, 1, 0.3, 1)",
      }}
    >
      {/* Invisible hover bridge between sidebar rail and flyout */}
      <div
        style={{
          position: "absolute",
          left: -18,
          top: 0,
          width: 18,
          height: "100%",
          pointerEvents: "auto",
        }}
      />

      {/* Dynamic left-edge triangular pointer / notch (always attached to popup edge) */}
      <DynamicFlyoutPointer pointerTop={clampedPointerTop} headerHeight={headerHeight} />

      {/* Header: Module name + optional descriptive subtitle */}
      <div
        ref={headerRef}
        style={{
          padding: "12px 16px 10px",
          background: "var(--floating-surface-header-bg, " + C.floatingHeaderBg + ")",
          borderBottom: `1px solid var(--floating-surface-divider, ${C.floatingDivider})`,
          borderTopLeftRadius: 13,
          borderTopRightRadius: 13,
          flexShrink: 0,
        }}
      >
        <div
          style={{
            fontSize: 11,
            fontWeight: 600,
            textTransform: "uppercase",
            letterSpacing: "0.6px",
            color: "var(--popup-header-title, " + C.purpleHeading + ")",
            lineHeight: 1.2,
          }}
        >
          {item.label}
        </div>
        {item.subtitle && (
          <div
            style={{
              fontSize: 11.5,
              color: "var(--popup-header-subtitle, " + C.muted + ")",
              marginTop: 2,
              lineHeight: 1.2,
            }}
          >
            {item.subtitle}
          </div>
        )}
      </div>

      {/* Body: Clean popup surface with module interaction rows */}
      <div
        style={{
          padding: "8px 8px",
          display: "flex",
          flexDirection: "column",
          gap: 3,
          background: "var(--floating-surface-bg, " + C.floatingBg + ")",
          borderBottomLeftRadius: 13,
          borderBottomRightRadius: 13,
          boxSizing: "border-box",
          overflowY: "auto",
        }}
      >
        {subNavItems.map((sub, idx) => (
          <SubNavPrototypeRow
            key={idx}
            label={sub.label}
            icon={sub.icon}
            selected={selectedIdx === idx}
            onClick={() => setSelectedIdx(idx)}
          />
        ))}
      </div>
    </div>
  );
}

function SubNavPrototypeRow({
  label,
  icon,
  selected,
  onClick,
}: {
  label: string;
  icon: string;
  selected: boolean;
  onClick: () => void;
}) {
  const [hov, setHov] = useState(false);

  return (
    <div
      role="button"
      tabIndex={0}
      onClick={onClick}
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      style={{
        width: "100%",
        minHeight: 34,
        padding: "6px 9px",
        borderRadius: 8,
        display: "flex",
        alignItems: "center",
        gap: 9,
        background: selected
          ? "var(--popup-row-selected, " + C.floatingRowSelected + ")"
          : hov
          ? "var(--popup-row-hover, " + C.floatingRowHover + ")"
          : "transparent",
        cursor: "pointer",
        transition: "background-color 150ms ease, color 150ms ease",
        boxSizing: "border-box",
        border: "none",
        outline: "none",
      }}
    >
      <div
        style={{
          width: 20,
          height: 20,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          flexShrink: 0,
        }}
      >
        <MatIcon
          name={icon}
          size={15}
          color={
            selected
              ? "var(--popup-selected-icon, " + C.accent + ")"
              : hov
              ? "var(--popup-hover-icon, " + C.accent + ")"
              : "var(--popup-item-icon, " + C.muted + ")"
          }
          filled={selected}
        />
      </div>
      <span
        style={{
          flex: 1,
          fontSize: 12,
          fontWeight: selected ? 600 : 500,
          color: "var(--popup-item-text, var(--text-primary))",
          lineHeight: 1.2,
          whiteSpace: "nowrap",
          overflow: "hidden",
          textOverflow: "ellipsis",
        }}
      >
        {label}
      </span>
      {selected && (
        <span
          style={{
            width: 4,
            height: 4,
            borderRadius: "50%",
            background: "var(--popup-selected-icon, " + C.accent + ")",
            flexShrink: 0,
          }}
        />
      )}
    </div>
  );
}



// ─── CANDIDATE TABLE VIEW (ZOHO-STYLE WORKSPACE) ──────────────────────────────

interface CandidateRow {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  officialEmail: string;
  onboardingStatus: "Not Triggered" | "In Progress" | "Completed";
  department: string;
  sourceOfHire: string;
  pan: string;
  aadhaar: string;
  uan: string;
}

const CANDIDATE_SAMPLE_DATA: CandidateRow[] = [
  { id: "c1", firstName: "",        lastName: "",        email: "afdfgbfgb@gmail.com",     officialEmail: "", onboardingStatus: "Not Triggered", department: "Engineering",    sourceOfHire: "LinkedIn",   pan: "••••••••••", aadhaar: "••••••••••", uan: "••••••••••" },
  { id: "c2", firstName: "Sarah",   lastName: "Sanders", email: "sarahsanders@zylker.com", officialEmail: "sarah@bezent.io", onboardingStatus: "In Progress",   department: "Product Design", sourceOfHire: "Referral",   pan: "••••••••••", aadhaar: "••••••••••", uan: "••••••••••" },
  { id: "c3", firstName: "Rose",    lastName: "Stacy",   email: "rosestacy@zylker.com",   officialEmail: "rose@bezent.io",  onboardingStatus: "Completed",     department: "HR Operations",  sourceOfHire: "Direct",     pan: "••••••••••", aadhaar: "••••••••••", uan: "••••••••••" },
  { id: "c4", firstName: "Mathew",  lastName: "Morales", email: "mathewmorales@zylker.com",officialEmail: "mathew@bezent.io",onboardingStatus: "Completed",     department: "Finance",        sourceOfHire: "Campus",     pan: "••••••••••", aadhaar: "••••••••••", uan: "••••••••••" },
  { id: "c5", firstName: "Kevin",   lastName: "Parker",  email: "kevinparker@zylker.com", officialEmail: "kevin@bezent.io", onboardingStatus: "In Progress",   department: "Sales",          sourceOfHire: "Agency",     pan: "••••••••••", aadhaar: "••••••••••", uan: "••••••••••" },
  { id: "c6", firstName: "David",   lastName: "Rickman", email: "davidrickman@zylker.com", officialEmail: "david@bezent.io", onboardingStatus: "Not Triggered", department: "Legal",          sourceOfHire: "Job Board",  pan: "••••••••••", aadhaar: "••••••••••", uan: "••••••••••" },
];

function CandidateTableView({ moduleName = "Candidate" }: { moduleName?: string }) {
  const [selectedRows, setSelectedRows] = useState<string[]>([]);
  const [viewFilter, setViewFilter] = useState("Reportees + My Data");

  const toggleSelectAll = () => {
    if (selectedRows.length === CANDIDATE_SAMPLE_DATA.length) {
      setSelectedRows([]);
    } else {
      setSelectedRows(CANDIDATE_SAMPLE_DATA.map(c => c.id));
    }
  };

  const toggleSelect = (id: string) => {
    setSelectedRows(prev =>
      prev.includes(id) ? prev.filter(item => item !== id) : [...prev, id]
    );
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", height: "100%", background: "var(--bg-surface, #FFFFFF)" }}>
      {/* Subheader bar matching Zoho People layout */}
      <div style={{
        padding: "10px 18px",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        borderBottom: `1px solid ${C.border}`,
        background: "var(--bg-surface, #FFFFFF)",
        flexWrap: "wrap",
        gap: 12,
      }}>
        {/* Left side: View switcher */}
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <div style={{
            display: "flex",
            alignItems: "center",
            gap: 6,
            background: "var(--bg-surface, #FFFFFF)",
            border: `1px solid ${C.border}`,
            padding: "5px 12px",
            borderRadius: 6,
            cursor: "pointer",
          }}>
            <span style={{ fontSize: 13, fontWeight: 600, color: C.text }}>
              {moduleName} View
            </span>
            <MatIcon name="expand_more" size={18} color={C.muted} />
          </div>
          <button style={{
            border: "none",
            background: "none",
            fontSize: 12,
            fontWeight: 600,
            color: C.primary,
            cursor: "pointer",
            padding: "4px 6px",
          }}>
            Edit
          </button>
        </div>

        {/* Right side: Action controls */}
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <button style={{
            border: "none",
            background: "none",
            fontSize: 12,
            fontWeight: 600,
            color: C.primary,
            cursor: "pointer",
          }}>
            View All Data
          </button>

          {/* Reportees filter */}
          <div style={{
            display: "flex",
            alignItems: "center",
            gap: 4,
            background: "var(--bg-surface, #FFFFFF)",
            border: `1px solid ${C.border}`,
            padding: "5px 10px",
            borderRadius: 6,
            cursor: "pointer",
            fontSize: 12,
            color: C.text,
            fontWeight: 500,
          }}>
            <span>{viewFilter}</span>
            <MatIcon name="expand_more" size={16} color={C.muted} />
          </div>

          {/* Add Candidate Button */}
          <button
            className="btn-primary"
            style={{
              display: "flex",
              alignItems: "center",
              gap: 6,
              background: C.primary,
              color: "#FFFFFF",
              border: "none",
              padding: "6px 14px",
              borderRadius: 6,
              fontSize: 12,
              fontWeight: 600,
              cursor: "pointer",
              boxShadow: "0 1px 4px rgba(147, 28, 245, 0.25)",
              transition: "all 0.15s ease",
            }}
          >
            <MatIcon name="add" size={16} color="#FFFFFF" />
            <span>Add {moduleName}</span>
          </button>

          {/* Utility icons */}
          <div style={{ display: "flex", alignItems: "center", gap: 4, marginLeft: 4 }}>
            <button style={{
              width: 32, height: 32, borderRadius: 6,
              border: `1px solid ${C.border}`,
              background: "var(--bg-surface, #FFFFFF)", cursor: "pointer",
              display: "flex", alignItems: "center", justifyContent: "center",
            }}>
              <MatIcon name="fullscreen" size={18} color={C.muted} />
            </button>
            <button style={{
              width: 32, height: 32, borderRadius: 6,
              border: `1px solid ${C.border}`,
              background: "var(--bg-surface, #FFFFFF)", cursor: "pointer",
              display: "flex", alignItems: "center", justifyContent: "center",
            }}>
              <MatIcon name="filter_list" size={18} color={C.muted} />
            </button>
            <button style={{
              width: 32, height: 32, borderRadius: 6,
              border: `1px solid ${C.border}`,
              background: "var(--bg-surface, #FFFFFF)", cursor: "pointer",
              display: "flex", alignItems: "center", justifyContent: "center",
            }}>
              <MatIcon name="more_horiz" size={18} color={C.muted} />
            </button>
          </div>
        </div>
      </div>

      {/* Main Table view */}
      <div style={{ flex: 1, overflow: "auto" }}>
        <table style={{ width: "100%", borderCollapse: "collapse", textAlign: "left", fontSize: 12 }}>
          <thead>
            <tr style={{ background: C.hoverBg, borderBottom: `1px solid ${C.border}` }}>
              <th style={{ padding: "10px 14px", width: 36 }}>
                <input
                  type="checkbox"
                  checked={selectedRows.length === CANDIDATE_SAMPLE_DATA.length}
                  onChange={toggleSelectAll}
                  style={{ cursor: "pointer", accentColor: C.primary }}
                />
              </th>
              {[
                "First name",
                "Last name",
                "Email ID",
                "Official Email",
                "Onboarding Status",
                "Department",
                "Source of Hire",
                "PAN card number",
                "Aadhaar card number",
                "UAN number",
              ].map(header => (
                <th
                  key={header}
                  style={{
                    padding: "10px 14px",
                    fontWeight: 600,
                    color: C.textSecondary,
                    whiteSpace: "nowrap",
                    userSelect: "none",
                  }}
                >
                  <div style={{ display: "flex", alignItems: "center", gap: 4 }}>
                    <span>{header}</span>
                    <MatIcon name="swap_vert" size={14} color={C.muted} />
                  </div>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {CANDIDATE_SAMPLE_DATA.map((row, idx) => {
              const isSelected = selectedRows.includes(row.id);
              const statusColors = {
                "Completed": { bg: "#ECFDF5", text: "#059669", border: "#A7F3D0" },
                "In Progress": { bg: C.hoverBg, text: C.primary, border: C.selectedBg },
                "Not Triggered": { bg: "#F3F4F6", text: "#6B7280", border: "#E5E7EB" },
              }[row.onboardingStatus];

              return (
                <tr
                  key={row.id}
                  style={{
                    borderBottom: `1px solid ${C.borderFaint}`,
                    background: isSelected ? C.hoverBg : idx % 2 === 0 ? "var(--bg-surface, #FFFFFF)" : "var(--bg-surface-secondary, #FCFAFF)",
                    transition: "background 0.1s",
                  }}
                >
                  <td style={{ padding: "10px 14px" }}>
                    <input
                      type="checkbox"
                      checked={isSelected}
                      onChange={() => toggleSelect(row.id)}
                      style={{ cursor: "pointer", accentColor: C.primary }}
                    />
                  </td>
                  <td style={{ padding: "10px 14px", fontWeight: 500, color: C.text }}>
                    {row.firstName || "—"}
                  </td>
                  <td style={{ padding: "10px 14px", fontWeight: 500, color: C.text }}>
                    {row.lastName || "—"}
                  </td>
                  <td style={{ padding: "10px 14px", color: C.muted }}>
                    {row.email}
                  </td>
                  <td style={{ padding: "10px 14px", color: C.muted }}>
                    {row.officialEmail || "—"}
                  </td>
                  <td style={{ padding: "10px 14px" }}>
                    <span style={{
                      display: "inline-block",
                      padding: "2px 8px",
                      borderRadius: 12,
                      fontSize: 11,
                      fontWeight: 600,
                      background: statusColors.bg,
                      color: statusColors.text,
                      border: `1px solid ${statusColors.border}`,
                    }}>
                      {row.onboardingStatus}
                    </span>
                  </td>
                  <td style={{ padding: "10px 14px", color: C.text }}>
                    {row.department}
                  </td>
                  <td style={{ padding: "10px 14px", color: C.muted }}>
                    {row.sourceOfHire}
                  </td>
                  <td style={{ padding: "10px 14px", letterSpacing: 2, color: C.muted }}>
                    {row.pan}
                  </td>
                  <td style={{ padding: "10px 14px", letterSpacing: 2, color: C.muted }}>
                    {row.aadhaar}
                  </td>
                  <td style={{ padding: "10px 14px", letterSpacing: 2, color: C.muted }}>
                    {row.uan}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* Footer bar of table */}
      <div style={{
        padding: "8px 18px",
        borderTop: `1px solid ${C.border}`,
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        fontSize: 12,
        color: C.muted,
        background: "#FFFFFF",
      }}>
        <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
          <span>Total Record Count :</span>
          <span style={{ fontWeight: 700, color: C.primary }}>
            {CANDIDATE_SAMPLE_DATA.length}
          </span>
        </div>

        <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
          <div style={{
            display: "flex",
            alignItems: "center",
            gap: 4,
            border: `1px solid ${C.border}`,
            padding: "3px 8px",
            borderRadius: 5,
            cursor: "pointer",
          }}>
            <span>10</span>
            <MatIcon name="expand_more" size={14} color={C.muted} />
          </div>

          <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
            <button style={{ border: "none", background: "none", cursor: "pointer", padding: 0 }}>
              <MatIcon name="chevron_left" size={18} color={C.muted} />
            </button>
            <span style={{ fontWeight: 500 }}>1 - 6</span>
            <button style={{ border: "none", background: "none", cursor: "pointer", padding: 0 }}>
              <MatIcon name="chevron_right" size={18} color={C.muted} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── RIGHT RAIL ───────────────────────────────────────────────────────────────

export interface RightUtilityConfig {
  id: string;
  title: string;
  label: string;
  icon: string;
}

export const RIGHT_UTILITIES: Record<string, RightUtilityConfig> = {
  tasks: {
    id: "tasks",
    title: "My Tasks",
    label: "My Tasks",
    icon: "tasks",
  },
  approvals: {
    id: "approvals",
    title: "Approvals",
    label: "Approvals",
    icon: "approvals",
  },
  calendar: {
    id: "calendar",
    title: "Calendar",
    label: "Calendar",
    icon: "calendar",
  },
  documents: {
    id: "documents",
    title: "Documents",
    label: "Documents",
    icon: "documents",
  },
  settings: {
    id: "settings",
    title: "Settings",
    label: "Settings",
    icon: "settings",
  },
};

export function getRightUtilityConfig(key: string | null): RightUtilityConfig | null {
  if (!key) return null;
  const normalized = key.toLowerCase().trim();
  if (normalized === "tasks" || normalized === "my tasks") return RIGHT_UTILITIES.tasks;
  if (normalized === "approvals" || normalized === "approval") return RIGHT_UTILITIES.approvals;
  if (normalized === "calendar" || normalized === "schedule") return RIGHT_UTILITIES.calendar;
  if (normalized === "documents" || normalized === "document" || normalized === "notes") return RIGHT_UTILITIES.documents;
  if (normalized === "settings" || normalized === "customize") return RIGHT_UTILITIES.settings;
  return null;
}

const RIGHT_ITEMS = [
  { id: "tasks",      label: "My Tasks",   icon: "tasks",      drawerKey: "tasks"     },
  { id: "approvals",  label: "Approvals",  icon: "approvals",  drawerKey: "approvals" },
  { id: "calendar",   label: "Calendar",   icon: "calendar",   drawerKey: "calendar"  },
  { id: "documents",  label: "Documents",  icon: "documents",  drawerKey: "documents" },
];

// Per-utility color identity — used in rail icons, hover/active states, and drawer accent systems
export interface UtilTheme {
  color: string;
  grad: string;
  hoverBg: string;
  activeBg: string;
  revealColor: string;
  primary: string;
  secondary?: string;
  soft: string;
  iconBg: string;
  border: string;
}

const UTIL_COLORS: Record<string, UtilTheme> = {
  "Notifications": {
    color: "#931CF5",
    grad: "linear-gradient(135deg,#931CF5 0%,#7114BD 100%)",
    hoverBg: "#F7F0FE",
    activeBg: "#EAD7FD",
    revealColor: "#EAD7FD",
    primary: "#931CF5",
    soft: "#F7F0FE",
    iconBg: "#EAD7FD",
    border: "#EAD7FD",
  },
  "Dashboard": {
    color: "#931CF5",
    grad: "linear-gradient(135deg,#931CF5 0%,#7114BD 100%)",
    hoverBg: "#F7F0FE",
    activeBg: "#EAD7FD",
    revealColor: "#EAD7FD",
    primary: "#931CF5",
    soft: "#F7F0FE",
    iconBg: "#EAD7FD",
    border: "#EAD7FD",
  },
  "My Tasks": {
    color: "#931CF5",
    grad: "linear-gradient(135deg,#931CF5 0%,#7114BD 100%)",
    hoverBg: "#F7F0FE",
    activeBg: "#EAD7FD",
    revealColor: "#EAD7FD",
    primary: "#931CF5",
    soft: "#F7F0FE",
    iconBg: "#EAD7FD",
    border: "#EAD7FD",
  },
  "Workforce": {
    color: "#931CF5",
    grad: "linear-gradient(135deg,#931CF5 0%,#7114BD 100%)",
    hoverBg: "#F7F0FE",
    activeBg: "#EAD7FD",
    revealColor: "#EAD7FD",
    primary: "#931CF5",
    soft: "#F7F0FE",
    iconBg: "#EAD7FD",
    border: "#EAD7FD",
  },
  "Approvals": {
    color: "#931CF5",
    grad: "linear-gradient(135deg,#931CF5 0%,#7114BD 100%)",
    hoverBg: "#F7F0FE",
    activeBg: "#EAD7FD",
    revealColor: "#EAD7FD",
    primary: "#931CF5",
    soft: "#F7F0FE",
    iconBg: "#EAD7FD",
    border: "#EAD7FD",
  },
  "Payroll": {
    color: "#931CF5",
    grad: "linear-gradient(135deg,#931CF5 0%,#7114BD 100%)",
    hoverBg: "#F7F0FE",
    activeBg: "#EAD7FD",
    revealColor: "#EAD7FD",
    primary: "#931CF5",
    soft: "#F7F0FE",
    iconBg: "#EAD7FD",
    border: "#EAD7FD",
  },
  "Schedule": {
    color: "#931CF5",
    grad: "linear-gradient(135deg,#931CF5 0%,#7114BD 100%)",
    hoverBg: "#F7F0FE",
    activeBg: "#EAD7FD",
    revealColor: "#EAD7FD",
    primary: "#931CF5",
    soft: "#F7F0FE",
    iconBg: "#EAD7FD",
    border: "#EAD7FD",
  },
  "Operations": {
    color: "#931CF5",
    grad: "linear-gradient(135deg,#931CF5 0%,#7114BD 100%)",
    hoverBg: "#F7F0FE",
    activeBg: "#EAD7FD",
    revealColor: "#EAD7FD",
    primary: "#931CF5",
    soft: "#F7F0FE",
    iconBg: "#EAD7FD",
    border: "#EAD7FD",
  },
  "Notes": {
    color: "#931CF5",
    grad: "linear-gradient(135deg,#931CF5 0%,#7114BD 100%)",
    hoverBg: "#F7F0FE",
    activeBg: "#EAD7FD",
    revealColor: "#EAD7FD",
    primary: "#931CF5",
    soft: "#F7F0FE",
    iconBg: "#EAD7FD",
    border: "#EAD7FD",
  },
  "SOP": {
    color: "#931CF5",
    grad: "linear-gradient(135deg,#931CF5 0%,#7114BD 100%)",
    hoverBg: "#F7F0FE",
    activeBg: "#EAD7FD",
    revealColor: "#EAD7FD",
    primary: "#931CF5",
    soft: "#F7F0FE",
    iconBg: "#EAD7FD",
    border: "#EAD7FD",
  },
  "Customize": {
    color: "#931CF5",
    grad: "linear-gradient(135deg,#931CF5 0%,#7114BD 100%)",
    hoverBg: "#F7F0FE",
    activeBg: "#EAD7FD",
    revealColor: "#EAD7FD",
    primary: "#931CF5",
    soft: "#F7F0FE",
    iconBg: "#EAD7FD",
    border: "#EAD7FD",
  },
};

function RightNav({ railOpen, setRailOpen, aiOpen, activeDrawer, onDrawerToggle }: {
  railOpen: boolean;
  setRailOpen: (v: boolean) => void;
  aiOpen: boolean;
  activeDrawer: string | null;
  onDrawerToggle: (name: string) => void;
}) {
  const effectivelyOpen = railOpen && !aiOpen;
  const railW = 48;

  return (
    <>
      {/* Collapsed state: minimal edge tab at bottom-right */}
      {!effectivelyOpen && (
        <button
          onClick={() => setRailOpen(true)}
          aria-label="Expand utility panel"
          style={{
            position: "fixed",
            bottom: 36 + 10,
            right: 0,
            zIndex: 60,
            width: 18, height: 40,
            display: "flex", alignItems: "center", justifyContent: "center",
            background: C.sidebarBg,
            border: `1px solid ${C.border}`,
            borderRight: "none",
            borderRadius: "6px 0 0 6px",
            cursor: "pointer",
            boxShadow: "-1px 0 4px rgba(147,28,245,0.06)",
            padding: 0,
            transition: "opacity 0.2s",
          }}
        >
          <AppIcon icon={L.ChevronLeft} size={14} color={C.primary} strokeWidth={2.4} />
        </button>
      )}

      {/* The rail — contains icons + collapse chevron at the bottom */}
      <aside style={{
        position: "fixed", top: 60, bottom: 36, right: 0,
        width: effectivelyOpen ? railW : 0,
        zIndex: 50,
        overflow: "hidden",
        display: "flex", flexDirection: "column", alignItems: "center",
        background: C.sidebarBg,
        borderLeft: effectivelyOpen ? `1px solid ${C.border}` : "none",
        transition: "width 0.2s cubic-bezier(0.4,0,0.2,1), border 0.2s",
      }}>
        {effectivelyOpen && (
          <>
            {/* Icon items */}
            <div style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center", padding: "12px 0", gap: 6 }}>
              {RIGHT_ITEMS.map(item => {
                const isSelected =
                  activeDrawer === item.id ||
                  activeDrawer === item.drawerKey ||
                  activeDrawer === item.label ||
                  getRightUtilityConfig(activeDrawer)?.id === item.id;
                return (
                  <RailBtn
                    key={item.id}
                    item={item}
                    active={Boolean(isSelected)}
                    onToggle={() => onDrawerToggle(item.id)}
                  />
                );
              })}
            </div>

            {/* Bottom utility section: Appearance control + Collapse chevron */}
            <div style={{
              width: "100%",
              borderTop: `1px solid ${C.borderFaint}`,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              gap: 4,
              paddingBottom: 10,
              paddingTop: 8,
              flexShrink: 0,
            }}>
              {/* Appearance / Theme control */}
              <RightRailThemeControl />

              {/* Collapse control — attached at bottom inside rail */}
              <button
                onClick={() => setRailOpen(false)}
                aria-label="Collapse utility panel"
                style={{
                  width: 32, height: 32,
                  display: "flex", alignItems: "center", justifyContent: "center",
                  background: "transparent", border: "none", borderRadius: 8,
                  cursor: "pointer",
                  transition: "background 0.13s",
                }}
                onMouseEnter={e => (e.currentTarget.style.background = "var(--top-utility-hover, " + C.hoverBg + ")")}
                onMouseLeave={e => (e.currentTarget.style.background = "transparent")}
              >
                <AppIcon icon={L.ChevronRight} size={18} color={C.primary} strokeWidth={2.4} />
              </button>
            </div>
          </>
        )}
      </aside>
    </>
  );
}

function RailBtn({ item, active, onToggle }: {
  item: typeof RIGHT_ITEMS[0]; active: boolean; onToggle: () => void;
}) {
  const [hov, setHov] = useState(false);
  return (
    <div style={{ position: "relative" }}>
      <button
        onClick={onToggle}
        aria-label={item.label}
        onMouseEnter={() => setHov(true)}
        onMouseLeave={() => setHov(false)}
        className={`bezent-right-rail-btn ${active ? "is-active" : ""}`}
      >
        {item.id === "documents" || item.icon === "documents" ? (
          <Folders
            size={BEZENT_ICON_SIZES.rightRail}
            strokeWidth={1.8}
            color="currentColor"
          />
        ) : (
          <BezentIcon
            name={item.icon}
            size={BEZENT_ICON_SIZES.rightRail}
            variant={active ? "solid" : "outline"}
            active={active}
            color="currentColor"
            strokeWidth={1.75}
          />
        )}
      </button>
      {hov && <Tooltip label={item.label} direction="left" />}
    </div>
  );
}

// ─── BOTTOM BAR ───────────────────────────────────────────────────────────────

const BOTTOM_ITEMS = [
  { icon: "calendar",      label: "Calendar"      },
  { icon: "whatsNew",      label: "What's New"    },
  { icon: "explore",       label: "Explore"       },
  { icon: "announcements", label: "Announcements" },
  { icon: "help",          label: "Help"          },
];

function BottomBar() {
  return (
    <footer style={{
      position: "fixed", bottom: 0, left: 0, right: 0, zIndex: 100,
      height: 36, display: "flex", alignItems: "center", padding: "0 14px",
      background: C.footerBg,
      borderTop: `1px solid ${C.border}`,
    }}>
      <div style={{ display: "flex", alignItems: "center", gap: 10, flexShrink: 0 }}>
        <span style={{ fontSize: 11, color: "var(--footer-text, var(--text-muted))" }}>© 2026 BEZENT</span>
        <span style={{ width: 1, height: 11, background: C.borderFaint }} />
        <div style={{ display: "flex", alignItems: "center", gap: 5 }}>
          <span style={{ width: 6, height: 6, borderRadius: "50%", background: "#22C55E", flexShrink: 0 }} />
          <span style={{ fontSize: 11, color: "var(--footer-text, var(--text-muted))" }}>All Systems Operational</span>
        </div>
      </div>

      <div style={{ display: "flex", alignItems: "center", gap: 4, marginLeft: "auto" }}>
        {BOTTOM_ITEMS.map(item => <FooterBtn key={item.label} icon={item.icon} label={item.label} />)}
      </div>
    </footer>
  );
}

function FooterBtn({ icon, label }: { icon: string; label: string }) {
  const [hov,     setHov]     = useState(false);
  const [pressed, setPressed] = useState(false);

  const bg = pressed ? C.selectedBg : hov ? C.hoverBg : "transparent";

  return (
    <div style={{ position: "relative" }}>
      <button
        aria-label={label}
        onMouseEnter={() => setHov(true)}
        onMouseLeave={() => { setHov(false); setPressed(false); }}
        onMouseDown={() => setPressed(true)}
        onMouseUp={() => setPressed(false)}
        style={{
          height: 28,
          display: "flex", alignItems: "center", gap: 5,
          padding: "0 8px",
          borderRadius: 6, border: "none", cursor: "pointer",
          background: bg,
          transition: "background 0.1s",
          fontFamily: "inherit",
        }}
      >
        <BezentIcon
          name={icon}
          size={BEZENT_ICON_SIZES.footer}
          color={hov || pressed ? "var(--footer-hover-icon, " + C.primary + ")" : "var(--footer-icon, " + C.deep + ")"}
          strokeWidth={1.75}
        />
        <span style={{ fontSize: 11, fontWeight: 500, color: hov || pressed ? "var(--footer-hover-text, " + C.text + ")" : "var(--footer-text, " + C.textSecondary + ")" }}>
          {label}
        </span>
      </button>
      {hov && <Tooltip label={label} direction="up" />}
    </div>
  );
}

// ─── BEZENT AI PANEL ──────────────────────────────────────────────────────────

const AI_SUGGESTIONS = [
  "Summarise pending leave requests for this week",
  "Show upcoming interview schedule for today",
  "Which employees have incomplete onboarding?",
  "Generate a headcount report by department",
];

function AIPanel({ onClose }: { onClose: () => void }) {
  const [input,       setInput]       = useState("");
  const [loading,     setLoading]     = useState(true);
  const [sendHov,     setSendHov]     = useState(false);
  const [sendPressed, setSendPressed] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setLoading(false), 720);
    return () => clearTimeout(t);
  }, []);

  if (loading) {
    return (
      <div style={{ position:"absolute", inset:0, background: C.popupBg, display:"flex", flexDirection:"column" }}>
        {/* AI panel header */}
        <div style={{ display:"flex", alignItems:"center", gap:10, padding:"0 18px", height:54, flexShrink:0, borderBottom:`1px solid ${C.border}`, background:C.navSurface }}>
          <div style={{ width:26, height:26, borderRadius:6, background:C.primary, display:"flex", alignItems:"center", justifyContent:"center", flexShrink:0 }}>
            <AppIcon icon={L.Sparkles} size={14} color="#fff" />
          </div>
          <div>
            <div style={{ fontSize:13, fontWeight:700, color:C.purpleHeading, letterSpacing:"-0.2px" }}>BEZENT AI</div>
            <div style={{ fontSize:10, color:C.muted, marginTop:1 }}>HR Intelligence Assistant</div>
          </div>
          <button onClick={onClose} style={{ marginLeft:"auto", width:28, height:28, display:"flex", alignItems:"center", justifyContent:"center", background:"transparent", border:"none", borderRadius:6, cursor:"pointer" }}>
            <AppIcon icon={L.X} size="compact" color={C.muted} />
          </button>
        </div>
        {/* Circular reveal — BEZENT purple identity */}
        <div style={{ flex:1, position:"relative", overflow:"hidden", background: C.popupHeader, display:"flex", alignItems:"center", justifyContent:"center" }}>
          <div className="drawer-circle" style={{ background: C.selectedBg }} />
          <div className="drawer-loader-icon" style={{ position:"relative", zIndex:1 }}>
            <div style={{ width:40, height:40, borderRadius:10, background:"linear-gradient(135deg,#931CF5 0%,#7114BD 100%)", display:"flex", alignItems:"center", justifyContent:"center" }}>
              <AppIcon icon={L.Sparkles} size={20} color="#fff" />
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div style={{
      position: "absolute", inset: 0,
      display: "flex", flexDirection: "column",
      background: C.popupBg,
      animation: "drawerContentIn 0.18s ease forwards",
    }}>
      <style>{`
        @keyframes slideInPanel {
          from { transform: translateX(32px); opacity: 0; }
          to   { transform: translateX(0);   opacity: 1; }
        }
      `}</style>

      {/* Panel header */}
      <div style={{
        display: "flex", alignItems: "center", gap: 10,
        padding: "0 18px", height: 54, flexShrink: 0,
        borderBottom: `1px solid ${C.border}`,
        background: C.navSurface,
      }}>
        <div style={{
          width: 26, height: 26, borderRadius: 6,
          background: C.primary,
          display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0,
        }}>
          <AppIcon icon={L.Sparkles} size={14} color="#fff" />
        </div>
        <div>
          <div style={{ fontSize: 13, fontWeight: 700, color: C.purpleHeading, letterSpacing: "-0.2px" }}>BEZENT AI</div>
          <div style={{ fontSize: 10, color: C.muted, marginTop: 1 }}>HR Intelligence Assistant</div>
        </div>
        <button
          onClick={onClose}
          style={{
            marginLeft: "auto", width: 28, height: 28,
            display: "flex", alignItems: "center", justifyContent: "center",
            background: "transparent", border: "none", borderRadius: 6, cursor: "pointer",
          }}
        >
          <AppIcon icon={L.X} size="compact" color={C.muted} />
        </button>
      </div>

      {/* Conversation area — empty welcome state */}
      <div style={{
        flex: 1, overflowY: "auto",
        display: "flex", flexDirection: "column",
        alignItems: "center", justifyContent: "center",
        padding: "32px 24px",
        gap: 0,
      }}>
        {/* Welcome mark */}
        <div style={{
          width: 52, height: 52, borderRadius: 14,
          background: `linear-gradient(135deg, ${C.hoverBg} 0%, ${C.selectedBg} 100%)`,
          display: "flex", alignItems: "center", justifyContent: "center",
          marginBottom: 16,
          boxShadow: "0 2px 12px rgba(147,28,245,0.10)",
        }}>
          <AppIcon icon={L.Sparkles} size={24} color={C.primary} />
        </div>

        <div style={{ fontSize: 16, fontWeight: 700, color: C.purpleHeading, marginBottom: 6, letterSpacing: "-0.3px" }}>
          Hello, Anika
        </div>
        <div style={{ fontSize: 13, color: C.muted, textAlign: "center", maxWidth: 240, lineHeight: 1.5, marginBottom: 28 }}>
          Ask me anything about your HR data, reports, or team.
        </div>

        {/* Suggestion chips */}
        <div style={{ display: "flex", flexDirection: "column", gap: 6, width: "100%", maxWidth: 320 }}>
          {AI_SUGGESTIONS.map(s => <SuggestionChip key={s} text={s} />)}
        </div>
      </div>

      {/* Prompt composer */}
      <div style={{
        flexShrink: 0, padding: "12px 16px 14px",
        borderTop: `1px solid ${C.borderFaint}`,
        background: C.popupHeader,
      }}>
        <div style={{
          display: "flex", alignItems: "flex-end", gap: 6,
          background: C.workspace,
          border: `1.5px solid ${C.border}`,
          borderRadius: 12, padding: "8px 10px",
          boxShadow: "0 1px 4px rgba(147,28,245,0.05)",
          transition: "border-color 0.15s",
        }}>
          {/* Attach / action */}
          <button style={{
            width: 28, height: 28, flexShrink: 0,
            display: "flex", alignItems: "center", justifyContent: "center",
            background: "transparent", border: "none", borderRadius: 6, cursor: "pointer",
          }}>
            <AppIcon icon={L.Paperclip} size="compact" color={C.muted} />
          </button>

          <textarea
            value={input}
            onChange={e => setInput(e.target.value)}
            placeholder="Ask BEZENT AI..."
            rows={1}
            style={{
              flex: 1, border: "none", outline: "none", resize: "none",
              fontSize: 13, color: C.text, fontFamily: "inherit",
              background: "transparent", lineHeight: 1.5,
              maxHeight: 120, overflowY: "auto",
            }}
            onInput={e => {
              const t = e.currentTarget;
              t.style.height = "auto";
              t.style.height = t.scrollHeight + "px";
            }}
          />

          {/* Options */}
          <button style={{
            width: 28, height: 28, flexShrink: 0,
            display: "flex", alignItems: "center", justifyContent: "center",
            background: "transparent", border: "none", borderRadius: 6, cursor: "pointer",
          }}>
            <AppIcon icon={L.MoreHorizontal} size="compact" color={C.muted} />
          </button>

          {/* Send */}
          <button
            className="btn-primary"
            onMouseEnter={() => setSendHov(true)}
            onMouseLeave={() => { setSendHov(false); setSendPressed(false); }}
            onMouseDown={() => setSendPressed(true)}
            onMouseUp={() => setSendPressed(false)}
            style={{
              width: 30, height: 30, flexShrink: 0,
              display: "flex", alignItems: "center", justifyContent: "center",
              background: input.trim()
                ? (sendPressed ? C.activePressed : sendHov ? C.buttonHover : C.primary)
                : C.borderFaint,
              border: "none", borderRadius: 8, cursor: input.trim() ? "pointer" : "default",
              transition: "background 0.15s, transform 0.08s",
            }}
          >
            <AppIcon icon={L.Send} size={14} color={input.trim() ? "#fff" : C.muted} />
          </button>
        </div>

        <div style={{ fontSize: 10, color: C.muted, textAlign: "center", marginTop: 8, lineHeight: 1.4 }}>
          BEZENT AI can make mistakes. Review important HR information carefully.
        </div>
      </div>
    </div>
  );
}

function SuggestionChip({ text }: { text: string }) {
  const [hov, setHov] = useState(false);
  return (
    <button
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      style={{
        padding: "8px 12px", borderRadius: 8, textAlign: "left",
        background: hov ? C.hoverBg : C.searchBg,
        border: `1px solid ${hov ? C.primary : C.borderFaint}`,
        cursor: "pointer", transition: "all 0.13s",
        fontSize: 12, color: C.text,
        fontFamily: "inherit", lineHeight: 1.4,
      }}
    >
      {text}
    </button>
  );
}


// ─── NOTIFICATION SYSTEM ─────────────────────────────────────────────────────

const DRAWER_W = 370;

type Notif = {
  id:          string;
  title:       string;
  desc:        string;
  module:      string;
  moduleIcon:  string;
  time:        string;
  read:        boolean;
  group:       "today" | "earlier";
  tabs:        Array<"all" | "action" | "mention">;
  actionLabel: string;
};

const INIT_NOTIFS: Notif[] = [
  { id:"n1", title:"Leave requests need approval",           desc:"8 employees submitted leave requests.",   module:"Leave",            moduleIcon:"event_busy",  time:"5 min ago",  read:false, group:"today",   tabs:["all","action"],          actionLabel:"Review Requests"  },
  { id:"n2", title:"Interview feedback pending",             desc:"Naveen Kumar – Backend Developer",        module:"Recruitment",      moduleIcon:"work",         time:"18 min ago", read:false, group:"today",   tabs:["all","action"],          actionLabel:"Review Interview" },
  { id:"n3", title:"Onboarding tasks incomplete",            desc:"Arun Kumar completed 8/10 activities.",  module:"Onboarding",       moduleIcon:"person_add",   time:"32 min ago", read:false, group:"today",   tabs:["all"],                   actionLabel:"View Onboarding"  },
  { id:"n4", title:"5 attendance regularization requests",   desc:"",                                       module:"Attendance",       moduleIcon:"schedule",     time:"1 hr ago",   read:false, group:"today",   tabs:["all","action"],          actionLabel:"Review Requests"  },
  { id:"n5", title:"3 employee documents need verification", desc:"",                                       module:"Documents",        moduleIcon:"documents",    time:"4 hrs ago",  read:true,  group:"earlier", tabs:["all"],                   actionLabel:"Verify Documents" },
  { id:"n6", title:"Anitha mentioned you in Employee Request #ER-1024", desc:"",                           module:"Employee Requests", moduleIcon:"assignment",  time:"5 hrs ago",  read:false, group:"earlier", tabs:["all","mention"],         actionLabel:"View Request"     },
];

// ── Small icon button inside the drawer header ────────────────────────────────

function DrawerIconBtn({
  icon, label, onClick, active = false,
  hoverBg = C.hoverBg, activeBg = C.selectedBg, activeColor = C.primary,
}: {
  icon: string; label: string; onClick?: () => void; active?: boolean;
  hoverBg?: string; activeBg?: string; activeColor?: string;
}) {
  const [hov, setHov] = useState(false);
  return (
    <button
      onClick={onClick}
      aria-label={label}
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      style={{
        width: 30, height: 30,
        display: "flex", alignItems: "center", justifyContent: "center",
        borderRadius: 7, border: "none", cursor: "pointer",
        background: active ? `var(--drawer-badge-bg, ${activeBg})` : hov ? `var(--drawer-header-hover, ${hoverBg})` : "transparent",
        transition: "background 0.12s",
      }}
    >
      <MatIcon name={icon} size={18} filled={active} color={active ? `var(--drawer-tab-active-text, ${activeColor})` : `var(--drawer-header-icon, ${C.text})`} />
    </button>
  );
}

// ── Group label (TODAY / EARLIER) ─────────────────────────────────────────────

function NotifGroupLabel({ label }: { label: string }) {
  return (
    <div style={{
      padding: "10px 16px 4px",
      fontSize: 10, fontWeight: 700,
      textTransform: "uppercase", letterSpacing: "0.08em",
      color: C.purpleHeading,
    }}>
      {label}
    </div>
  );
}

// ── Single notification row in the drawer ─────────────────────────────────────

function NotifRow({ notif, onRead }: { notif: Notif; onRead: () => void }) {
  const [hov, setHov] = useState(false);
  return (
    <div
      onClick={onRead}
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      style={{
        display: "flex", alignItems: "flex-start", gap: 10,
        padding: "10px 16px",
        background: hov ? C.hoverBg : "transparent",
        cursor: "pointer",
        transition: "background 0.12s",
        borderBottom: `1px solid ${C.borderFaint}`,
      }}
    >
      <div style={{
        width: 32, height: 32, borderRadius: 8, flexShrink: 0,
        background: notif.read ? "#F5EEF9" : C.selectedBg,
        display: "flex", alignItems: "center", justifyContent: "center",
        marginTop: 1,
      }}>
        <MatIcon name={notif.moduleIcon} size={16} filled={false} color={notif.read ? C.muted : C.primary} />
      </div>

      <div style={{ flex: 1, minWidth: 0 }}>
        <div style={{
          fontSize: 12, fontWeight: notif.read ? 450 : 600,
          color: C.text, lineHeight: 1.4, marginBottom: 2,
        }}>
          {notif.title}
        </div>
        {notif.desc && (
          <div style={{ fontSize: 11, color: C.muted, marginBottom: 3, lineHeight: 1.4 }}>
            {notif.desc}
          </div>
        )}
        <div style={{ display: "flex", alignItems: "center", gap: 6, marginBottom: 5 }}>
          <span style={{ fontSize: 10, color: C.muted }}>{notif.module}</span>
          <span style={{ width: 2, height: 2, borderRadius: "50%", background: "#C5B0D0" }} />
          <span style={{ fontSize: 10, color: C.muted }}>{notif.time}</span>
        </div>
        <button
          onClick={e => { e.stopPropagation(); onRead(); }}
          style={{
            background: "none", border: "none", cursor: "pointer",
            fontSize: 11, fontWeight: 600, color: C.purpleHeading,
            fontFamily: "inherit", padding: 0,
          }}
        >
          {notif.actionLabel} →
        </button>
      </div>

      {!notif.read && (
        <div style={{
          width: 7, height: 7, borderRadius: "50%",
          background: C.primary, flexShrink: 0, marginTop: 5,
        }} />
      )}
    </div>
  );
}

// ── Filter chip row inside the filter panel ───────────────────────────────────

function FilterRow({
  label, options, activeBg = C.primary, activeColor = "#fff", inactiveBg = C.hoverBg, inactiveColor = C.text,
}: {
  label: string; options: string[]; activeBg?: string; activeColor?: string; inactiveBg?: string; inactiveColor?: string;
}) {
  const [sel, setSel] = useState(options[0]);
  return (
    <div style={{ display: "flex", alignItems: "flex-start", gap: 8 }}>
      <span style={{
        fontSize: 10, fontWeight: 700, color: C.muted,
        width: 54, flexShrink: 0, paddingTop: 3,
        textTransform: "uppercase", letterSpacing: "0.05em",
      }}>
        {label}
      </span>
      <div style={{ display: "flex", flexWrap: "wrap", gap: 4 }}>
        {options.map(opt => (
          <button
            key={opt}
            onClick={() => setSel(opt)}
            style={{
              padding: "2px 8px", borderRadius: 99, border: "none", cursor: "pointer",
              fontSize: 10, fontWeight: 500, fontFamily: "inherit",
              background: sel === opt ? activeBg : inactiveBg,
              color: sel === opt ? activeColor : inactiveColor,
              transition: "all 0.12s",
            }}
          >
            {opt}
          </button>
        ))}
      </div>
    </div>
  );
}

// ── Expandable filter panel ───────────────────────────────────────────────────

function NotifFilterPanel() {
  return (
    <div style={{
      padding: "12px 16px",
      borderBottom: `1px solid ${C.border}`,
      background: "var(--bg-surface-secondary, #F8F3FC)",
      display: "flex", flexDirection: "column", gap: 10,
    }}>
      <FilterRow label="Status"   options={["All", "Unread", "Read"]} />
      <FilterRow label="Priority" options={["Critical", "Action", "Info"]} />
      <FilterRow label="Module"   options={["Leave", "Recruitment", "Onboarding", "Attendance", "Documents", "Requests"]} />
      <FilterRow label="Date"     options={["Today", "7 Days", "30 Days"]} />
    </div>
  );
}

// ── Top Notification Floating Dropdown Panel ──────────────────────────────────

function NotificationDropdown({
  notifs,
  onClose,
  onMarkAllRead,
  onMarkRead,
  onViewAll,
  bellRef,
}: {
  notifs: Notif[];
  onClose: () => void;
  onMarkAllRead: () => void;
  onMarkRead: (id: string) => void;
  onViewAll: () => void;
  bellRef: React.RefObject<HTMLDivElement | null>;
}) {
  const [tab, setTab]         = useState<"all" | "action" | "mention">("all");
  const [filterOpen, setFilterOpen] = useState(false);
  const [isClosing, setIsClosing]   = useState(false);
  const panelRef = useRef<HTMLDivElement>(null);

  const handleClose = () => {
    if (isClosing) return;
    setIsClosing(true);
    setTimeout(() => {
      onClose();
    }, 180);
  };

  useEffect(() => {
    function handleKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape") {
        handleClose();
      }
    }
    function handleClickOutside(e: MouseEvent) {
      const target = e.target as Node;
      if (
        panelRef.current &&
        !panelRef.current.contains(target) &&
        bellRef.current &&
        !bellRef.current.contains(target)
      ) {
        handleClose();
      }
    }

    document.addEventListener("keydown", handleKeyDown);
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isClosing]);

  const visible = notifs.filter(n => tab === "all" || n.tabs.includes(tab));
  const today   = visible.filter(n => n.group === "today");
  const earlier = visible.filter(n => n.group === "earlier");
  const unread  = notifs.filter(n => !n.read).length;

  return (
    <div
      ref={panelRef}
      className={isClosing ? "notif-dropdown-leave" : "notif-dropdown-enter"}
      style={{
        position: "fixed",
        top: 60,
        right: 14,
        width: 460,
        maxHeight: 620,
        zIndex: 150,
        display: "flex",
        flexDirection: "column",
        background: C.popupBg,
        border: `1px solid ${C.border}`,
        borderTop: "none",
        borderRadius: "0 0 16px 16px",
        boxShadow: "var(--shadow-dropdown)",
        overflow: "hidden",
      }}
    >
      {/* Subtle top indicator/glow line */}
      <div style={{
        position: "absolute",
        top: 0,
        left: 0,
        right: 0,
        height: 2,
        background: `linear-gradient(90deg, transparent 0%, rgba(234,215,253,0.6) 30%, ${C.primary} 48%, rgba(234,215,253,0.6) 66%, transparent 100%)`,
        zIndex: 2,
      }} />

      {/* Header */}
      <div style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        padding: "0 14px 0 18px",
        height: 48,
        flexShrink: 0,
        borderBottom: `1px solid ${C.border}`,
        background: C.popupHeader,
      }}>
        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
          <span style={{ fontSize: 14, fontWeight: 700, color: C.purpleHeading, letterSpacing: "-0.2px" }}>
            Notifications
          </span>
          {unread > 0 && (
            <span style={{
              fontSize: 10,
              fontWeight: 700,
              color: C.purpleHeading,
              background: C.selectedBg,
              padding: "1px 7px",
              borderRadius: 99,
              lineHeight: "15px",
            }}>
              {unread}
            </span>
          )}
        </div>

        <div style={{ display: "flex", alignItems: "center", gap: 4 }}>
          <button
            onClick={onMarkAllRead}
            style={{
              display: "flex", alignItems: "center", gap: 4,
              background: "none", border: "none", cursor: "pointer",
              fontSize: 11, fontWeight: 600, color: C.purpleHeading,
              fontFamily: "inherit", padding: "4px 8px", borderRadius: 6,
              transition: "background 0.12s",
            }}
            onMouseEnter={e => (e.currentTarget.style.background = C.hoverBg)}
            onMouseLeave={e => (e.currentTarget.style.background = "none")}
            title="Mark all as read"
          >
            <MatIcon name="done_all" size={15} color={C.primary} />
            <span>Mark all read</span>
          </button>

          <button
            onClick={() => setFilterOpen(v => !v)}
            style={{
              display: "flex", alignItems: "center", gap: 4,
              background: filterOpen ? C.selectedBg : "none",
              border: "none", cursor: "pointer",
              fontSize: 11, fontWeight: 600,
              color: filterOpen ? C.text : C.muted,
              fontFamily: "inherit", padding: "4px 8px", borderRadius: 6,
              transition: "background 0.12s, color 0.12s",
            }}
            onMouseEnter={e => { if (!filterOpen) e.currentTarget.style.background = C.hoverBg; }}
            onMouseLeave={e => { if (!filterOpen) e.currentTarget.style.background = "none"; }}
          >
            <MatIcon name="filter_list" size={15} color={filterOpen ? C.primary : C.muted} />
            <span>Filter</span>
          </button>

          <button
            onClick={handleClose}
            aria-label="Close notifications"
            style={{
              width: 28, height: 28,
              display: "flex", alignItems: "center", justifyContent: "center",
              borderRadius: 6, border: "none", cursor: "pointer",
              background: "none", color: C.muted,
              transition: "background 0.12s, color 0.12s",
              marginLeft: 2,
            }}
            onMouseEnter={e => { e.currentTarget.style.background = C.hoverBg; e.currentTarget.style.color = C.text; }}
            onMouseLeave={e => { e.currentTarget.style.background = "none"; e.currentTarget.style.color = C.muted; }}
          >
            <MatIcon name="close" size={16} color="currentColor" />
          </button>
        </div>
      </div>

      {/* Tabs */}
      <div style={{
        display: "flex",
        padding: "0 16px",
        borderBottom: `1px solid ${C.border}`,
        flexShrink: 0,
        background: C.popupHeader,
      }}>
        {(["all", "action", "mention"] as const).map(t => (
          <button
            key={t}
            onClick={() => setTab(t)}
            style={{
              padding: "9px 12px",
              border: "none",
              background: "transparent",
              cursor: "pointer",
              fontFamily: "inherit",
              fontSize: 12,
              fontWeight: tab === t ? 600 : 500,
              color: tab === t ? C.text : C.muted,
              borderBottom: tab === t ? `2px solid ${C.primary}` : "2px solid transparent",
              marginBottom: -1,
              transition: "color 0.15s, border-bottom 0.15s",
            }}
          >
            {{ all: "All", action: "Action Required", mention: "Mentions" }[t]}
          </button>
        ))}
      </div>

      {/* Expandable filter panel */}
      {filterOpen && <NotifFilterPanel />}

      {/* Notification list — only this scrolls */}
      <div
        className="notif-content-in"
        style={{
          flex: 1,
          overflowY: "auto",
          background: C.popupBg,
        }}
      >
        {today.length > 0 && (
          <>
            <NotifGroupLabel label="Today" />
            {today.map(n => <NotifRow key={n.id} notif={n} onRead={() => onMarkRead(n.id)} />)}
          </>
        )}
        {earlier.length > 0 && (
          <>
            <NotifGroupLabel label="Earlier" />
            {earlier.map(n => <NotifRow key={n.id} notif={n} onRead={() => onMarkRead(n.id)} />)}
          </>
        )}
        {visible.length === 0 && (
          <div style={{ padding: "48px 16px", textAlign: "center", color: C.muted, fontSize: 13 }}>
            No notifications
          </div>
        )}
      </div>

      {/* Fixed bottom action */}
      <div style={{
        flexShrink: 0,
        borderTop: `1px solid ${C.border}`,
        padding: "10px 16px",
        display: "flex",
        justifyContent: "center",
        background: C.popupHeader,
      }}>
        <button
          onClick={() => { handleClose(); onViewAll(); }}
          style={{
            background: "none", border: "none", cursor: "pointer",
            fontSize: 12, fontWeight: 600, color: C.purpleHeading, fontFamily: "inherit",
            display: "flex", alignItems: "center", gap: 4,
            transition: "opacity 0.12s",
          }}
          onMouseEnter={e => (e.currentTarget.style.opacity = "0.75")}
          onMouseLeave={e => (e.currentTarget.style.opacity = "1")}
        >
          View all notifications →
        </button>
      </div>
    </div>
  );
}

// ── Full Notifications page (replaces blank workspace) ────────────────────────

function PageHeaderBtn({ icon, label, onClick }: { icon: string; label: string; onClick?: () => void }) {
  const [hov, setHov] = useState(false);
  return (
    <button
      onClick={onClick}
      aria-label={label}
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      style={{
        display: "flex", alignItems: "center", gap: 5,
        height: 30, padding: "0 10px",
        background: hov ? C.hoverBg : "transparent",
        border: `1px solid ${C.border}`, borderRadius: 7, cursor: "pointer",
        fontSize: 11, fontWeight: 500, color: C.text, fontFamily: "inherit",
        transition: "background 0.12s",
      }}
    >
      <MatIcon name={icon} size={14} color={hov ? C.primary : C.text} />
      {label}
    </button>
  );
}

function BulkBtn({ label }: { label: string }) {
  const [hov, setHov] = useState(false);
  return (
    <button
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      style={{
        padding: "3px 10px", border: `1px solid ${C.border}`,
        borderRadius: 6, background: hov ? "#fff" : "transparent",
        cursor: "pointer", fontSize: 11, fontWeight: 500,
        color: C.text, fontFamily: "inherit", transition: "background 0.12s",
      }}
    >
      {label}
    </button>
  );
}

function NotifPageRow({ notif, selected, onToggle, onRead }: {
  notif: Notif; selected: boolean; onToggle: () => void; onRead: () => void;
}) {
  const [hov, setHov] = useState(false);
  return (
    <div
      onClick={onRead}
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      style={{
        display: "flex", alignItems: "flex-start", gap: 10,
        padding: "11px 4px 11px 0",
        borderBottom: `1px solid ${C.borderFaint}`,
        background: selected ? C.selectedBg : hov ? C.hoverBg : "transparent",
        cursor: "pointer", transition: "background 0.12s",
        borderRadius: 6, marginLeft: -4, paddingLeft: 4,
      }}
    >
      {/* Checkbox */}
      <div
        onClick={e => { e.stopPropagation(); onToggle(); }}
        style={{
          width: 16, height: 16, marginTop: 3, flexShrink: 0,
          border: `1.5px solid ${selected ? C.primary : "#C5B0D0"}`,
          borderRadius: 4, cursor: "pointer",
          background: selected ? C.primary : "transparent",
          display: "flex", alignItems: "center", justifyContent: "center",
          transition: "all 0.12s",
        }}
      >
        {selected && <MatIcon name="check" size={11} color="#fff" />}
      </div>

      {/* Module icon */}
      <div style={{
        width: 34, height: 34, borderRadius: 9, flexShrink: 0,
        background: notif.read ? "#F5EEF9" : C.selectedBg,
        display: "flex", alignItems: "center", justifyContent: "center",
      }}>
        <MatIcon name={notif.moduleIcon} size={17} color={notif.read ? C.muted : C.primary} />
      </div>

      {/* Content */}
      <div style={{ flex: 1 }}>
        <div style={{ fontSize: 13, fontWeight: notif.read ? 450 : 600, color: C.text, lineHeight: 1.4, marginBottom: 2 }}>
          {notif.title}
        </div>
        {notif.desc && (
          <div style={{ fontSize: 12, color: C.muted, marginBottom: 4, lineHeight: 1.4 }}>{notif.desc}</div>
        )}
        <div style={{ display: "flex", alignItems: "center", gap: 8, flexWrap: "wrap" }}>
          <span style={{ fontSize: 11, color: C.muted }}>{notif.module}</span>
          <span style={{ width: 2, height: 2, borderRadius: "50%", background: "#C5B0D0" }} />
          <span style={{ fontSize: 11, color: C.muted }}>{notif.time}</span>
          <button
            onClick={e => { e.stopPropagation(); onRead(); }}
            style={{ background: "none", border: "none", cursor: "pointer", fontSize: 11, fontWeight: 600, color: C.purpleHeading, fontFamily: "inherit", padding: 0 }}
          >
            {notif.actionLabel} →
          </button>
        </div>
      </div>

      {!notif.read && (
        <div style={{ width: 7, height: 7, borderRadius: "50%", background: C.primary, flexShrink: 0, marginTop: 6 }} />
      )}
    </div>
  );
}

function NotificationsPage({ notifs, onBack, onMarkRead, onMarkAllRead }: {
  notifs: Notif[];
  onBack: () => void;
  onMarkRead: (id: string) => void;
  onMarkAllRead: () => void;
}) {
  const [tab,      setTab]      = useState<"all" | "unread" | "action" | "mention">("all");
  const [search,   setSearch]   = useState("");
  const [selected, setSelected] = useState<Set<string>>(new Set());

  const filtered = notifs.filter(n => {
    const matchSearch = !search || n.title.toLowerCase().includes(search.toLowerCase());
    const matchTab    = tab === "all" ? true
      : tab === "unread"  ? !n.read
      : n.tabs.includes(tab as "action" | "mention");
    return matchSearch && matchTab;
  });

  const today   = filtered.filter(n => n.group === "today");
  const earlier = filtered.filter(n => n.group === "earlier");

  const toggleSelect = (id: string) => setSelected(prev => {
    const next = new Set(prev);
    if (next.has(id)) next.delete(id); else next.add(id);
    return next;
  });

  return (
    <div style={{
      display: "flex", flexDirection: "column", height: "100%",
      background: "#FEFBFF",
    }}>
      {/* Page header */}
      <div style={{
        padding: "18px 28px 0",
        borderBottom: `1px solid ${C.border}`,
        flexShrink: 0,
      }}>
        <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 14 }}>
          <button
            onClick={onBack}
            style={{
              background: "none", border: "none", cursor: "pointer",
              display: "flex", alignItems: "center", gap: 4,
              color: C.primary, fontSize: 12, fontWeight: 600, fontFamily: "inherit",
            }}
          >
            <MatIcon name="arrow_back" size={16} color={C.primary} />
            Back
          </button>
          <span style={{ fontSize: 17, fontWeight: 700, color: C.purpleHeading, letterSpacing: "-0.3px" }}>
            All Notifications
          </span>
          <div style={{ marginLeft: "auto", display: "flex", gap: 6 }}>
            <PageHeaderBtn icon="done_all" label="Mark all read" onClick={onMarkAllRead} />
            <PageHeaderBtn icon="tune"     label="Preferences"   />
          </div>
        </div>

        {/* Search */}
        <div style={{
          display: "flex", alignItems: "center", gap: 8,
          height: 34, padding: "0 12px", marginBottom: 12,
          background: C.searchBg, border: `1px solid ${C.borderFaint}`,
          borderRadius: 8, maxWidth: 420,
        }}>
          <MatIcon name="search" size={16} color="#9580A8" />
          <input
            value={search}
            onChange={e => setSearch(e.target.value)}
            placeholder="Search notifications..."
            style={{
              flex: 1, background: "none", border: "none", outline: "none",
              fontSize: 12, color: C.text, fontFamily: "inherit",
            }}
          />
          {search && (
            <button onClick={() => setSearch("")} style={{ background: "none", border: "none", cursor: "pointer", padding: 0, display: "flex" }}>
              <MatIcon name="close" size={14} color={C.muted} />
            </button>
          )}
        </div>

        {/* Tabs */}
        <div style={{ display: "flex" }}>
          {(["all", "unread", "action", "mention"] as const).map(t => (
            <button
              key={t}
              onClick={() => setTab(t)}
              style={{
                padding: "8px 14px", border: "none", background: "transparent",
                cursor: "pointer", fontFamily: "inherit",
                fontSize: 12, fontWeight: tab === t ? 600 : 450,
                color: tab === t ? C.text : C.muted,
                borderBottom: tab === t ? `2px solid ${C.primary}` : "2px solid transparent",
                marginBottom: -1, transition: "color 0.15s",
              }}
            >
              {{ all:"All", unread:"Unread", action:"Action Required", mention:"Mentions" }[t]}
            </button>
          ))}
        </div>
      </div>

      {/* Bulk action bar */}
      {selected.size > 0 && (
        <div style={{
          display: "flex", alignItems: "center", gap: 8,
          padding: "7px 28px",
          background: C.selectedBg, borderBottom: `1px solid ${C.border}`,
          flexShrink: 0,
        }}>
          <span style={{ fontSize: 12, color: C.text, fontWeight: 600 }}>
            {selected.size} selected
          </span>
          <BulkBtn label="Mark Read" />
          <BulkBtn label="Mark Unread" />
          <BulkBtn label="Archive" />
          <button
            onClick={() => setSelected(new Set())}
            style={{ marginLeft: "auto", background: "none", border: "none", cursor: "pointer", fontSize: 11, color: C.muted, fontFamily: "inherit" }}
          >
            Clear selection
          </button>
        </div>
      )}

      {/* List */}
      <div style={{ flex: 1, overflowY: "auto", padding: "4px 28px" }}>
        {today.length > 0 && (
          <>
            <div style={{ fontSize: 11, fontWeight: 700, color: C.textSecondary, textTransform: "uppercase", letterSpacing: "0.07em", padding: "14px 0 6px" }}>Today</div>
            {today.map(n => <NotifPageRow key={n.id} notif={n} selected={selected.has(n.id)} onToggle={() => toggleSelect(n.id)} onRead={() => onMarkRead(n.id)} />)}
          </>
        )}
        {earlier.length > 0 && (
          <>
            <div style={{ fontSize: 11, fontWeight: 700, color: C.textSecondary, textTransform: "uppercase", letterSpacing: "0.07em", padding: "14px 0 6px" }}>Earlier</div>
            {earlier.map(n => <NotifPageRow key={n.id} notif={n} selected={selected.has(n.id)} onToggle={() => toggleSelect(n.id)} onRead={() => onMarkRead(n.id)} />)}
          </>
        )}
        {filtered.length === 0 && (
          <div style={{ padding: "60px 0", textAlign: "center", color: C.muted, fontSize: 13 }}>
            No notifications found
          </div>
        )}
      </div>

      {/* Preferences footer */}
      <div style={{
        flexShrink: 0, borderTop: `1px solid ${C.border}`,
        padding: "9px 28px", display: "flex", alignItems: "center", gap: 6,
      }}>
        <MatIcon name="tune" size={14} color={C.muted} />
        <button style={{ background: "none", border: "none", cursor: "pointer", fontSize: 11, color: C.muted, fontFamily: "inherit", fontWeight: 500 }}>
          Notification Preferences
        </button>
      </div>
    </div>
  );
}

// ─── MY TASKS SYSTEM ─────────────────────────────────────────────────────────

type Task = {
  id:               string;
  title:            string;
  relatedTo:        string;
  module:           string;
  moduleIcon:       string;
  priority:         "High" | "Medium" | "Low";
  due:              string;
  dueTime?:         string;
  status:           "Open" | "In Progress" | "Completed";
  overdue?:         boolean;
  requiresWorkflow?: boolean;
  assignedBy?:      string;
  description?:     string;
  checklist?:       Array<{ label: string; done: boolean }>;
  history:          Array<{ label: string; time: string }>;
};

const INIT_TASKS: Task[] = [
  {
    id:"tk1", title:"Verify employee documents",
    relatedTo:"Arun Kumar • Onboarding", module:"Onboarding", moduleIcon:"person_add",
    priority:"High", due:"Today", dueTime:"5:00 PM", status:"In Progress",
    requiresWorkflow:true, assignedBy:"HR Manager",
    description:"Verify the employee's submitted onboarding documents before completing onboarding.",
    checklist:[
      { label:"Aadhaar received",                done:true  },
      { label:"PAN received",                    done:true  },
      { label:"Address proof verification",      done:false },
      { label:"Education certificate verification", done:false },
    ],
    history:[
      { label:"Task created",                    time:"Yesterday"      },
      { label:"Assigned to HR",                  time:"Yesterday"      },
      { label:"Status changed to In Progress",   time:"Today, 9:00 AM" },
    ],
  },
  {
    id:"tk2", title:"Prepare onboarding for new joiner",
    relatedTo:"Priya S • Joining 10 Sep", module:"Onboarding", moduleIcon:"person_add",
    priority:"Medium", due:"Today", status:"Open", assignedBy:"HR Manager",
    history:[{ label:"Task created", time:"Today" }],
  },
  {
    id:"tk3", title:"Review attendance exceptions",
    relatedTo:"Engineering Department • 5 employees", module:"Attendance", moduleIcon:"schedule",
    priority:"Medium", due:"Today", dueTime:"3:00 PM", status:"Open", assignedBy:"HR Manager",
    history:[{ label:"Task created", time:"Today" }],
  },
  {
    id:"tk4", title:"Schedule candidate interview",
    relatedTo:"Naveen Kumar • Backend Developer", module:"Recruitment", moduleIcon:"work",
    priority:"Medium", due:"Today", status:"Open", assignedBy:"Team Lead",
    history:[{ label:"Task created", time:"Today" }],
  },
  {
    id:"tk5", title:"Follow up missing employee documents",
    relatedTo:"Karthik R • Employee Records", module:"Documents", moduleIcon:"documents",
    priority:"Medium", due:"Today", status:"Open",
    history:[{ label:"Task created", time:"Today" }],
  },
  {
    id:"tk6", title:"Probation review preparation",
    relatedTo:"Divya M", module:"Employees", moduleIcon:"groups",
    priority:"Medium", due:"12 Sep", status:"Open",
    history:[{ label:"Task created", time:"2 days ago" }],
  },
  {
    id:"tk7", title:"Training enrollment follow-up",
    relatedTo:"Karthik R", module:"Learning", moduleIcon:"school",
    priority:"Low", due:"15 Sep", status:"Open",
    history:[{ label:"Task created", time:"3 days ago" }],
  },
];

// ── Priority badge ─────────────────────────────────────────────────────────────

function PriorityBadge({ priority }: { priority: "High" | "Medium" | "Low" }) {
  const s = priority === "High"   ? { color:"var(--drawer-badge-high-color, #B03B2E)", bg:"var(--drawer-badge-high-bg, #FDECEA)" }
          : priority === "Medium" ? { color:"var(--drawer-badge-med-color, #7A5A00)", bg:"var(--drawer-badge-med-bg, #FFF8E0)" }
          :                         { color:"var(--drawer-badge-low-color, " + C.muted + ")", bg:"var(--drawer-badge-low-bg, #F0E8F8)" };
  return (
    <span style={{
      fontSize:9, fontWeight:700, color:s.color, background:s.bg,
      padding:"1px 6px", borderRadius:99, textTransform:"uppercase", letterSpacing:"0.06em",
    }}>
      {priority}
    </span>
  );
}

// ── Status chip ────────────────────────────────────────────────────────────────

function StatusChip({ status }: { status: string }) {
  const s = status === "Completed"   ? { color:"#1B7F4F", bg:"#EAFAF2" }
          : status === "In Progress" ? { color:"#7A5A00", bg:"#FFF8E0" }
          :                            { color:C.muted,   bg:"#F0E8F8" };
  return (
    <span style={{ fontSize:10, fontWeight:600, color:s.color, background:s.bg, padding:"2px 8px", borderRadius:99 }}>
      {status}
    </span>
  );
}

// ── Compact task row (drawer) ──────────────────────────────────────────────────

function TaskRow({ task, onComplete, onOpen }: {
  task: Task; onComplete: () => void; onOpen: () => void;
}) {
  const [hov,          setHov]          = useState(false);
  const [completing,   setCompleting]   = useState(false);
  const [warnWorkflow, setWarnWorkflow] = useState(false);
  const isDone = task.status === "Completed";

  function handleCheck() {
    if (isDone) return;
    if (task.requiresWorkflow) {
      setWarnWorkflow(true);
      setTimeout(() => setWarnWorkflow(false), 2500);
      return;
    }
    setCompleting(true);
    setTimeout(onComplete, 300);
  }

  return (
    <div
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      style={{
        display:"flex", alignItems:"flex-start", gap:10,
        padding:"10px 16px",
        background: hov ? "var(--drawer-row-hover, #EFF6FF)" : "transparent",
        borderBottom:`1px solid var(--drawer-border-divider, ${C.borderFaint})`,
        transition:"background 0.12s, opacity 0.3s",
        opacity: completing ? 0 : 1,
      }}
    >
      {/* Checkbox — Blue identity in Light, Purple in Dark */}
      <button
        onClick={handleCheck}
        style={{
          width:18, height:18, borderRadius:5, flexShrink:0, marginTop:3,
          border:`1.5px solid ${isDone ? "var(--drawer-checkbox-checked-border, #2563EB)" : "var(--drawer-checkbox-border, #BFDBFE)"}`,
          background: isDone ? "var(--drawer-checkbox-checked-bg, #2563EB)" : "transparent",
          cursor: isDone ? "default" : "pointer",
          display:"flex", alignItems:"center", justifyContent:"center",
          transition:"all 0.2s",
        }}
      >
        {isDone && <MatIcon name="check" size={11} color="#fff" />}
      </button>

      {/* Module icon — Blue icon tile & color in Light, Purple in Dark */}
      <div style={{
        width:30, height:30, borderRadius:7, flexShrink:0,
        background: task.overdue ? "var(--drawer-badge-high-bg, #FDECEA)" : "var(--drawer-icon-container-bg, #DBEAFE)",
        border: task.overdue ? "1px solid var(--drawer-badge-high-bg, transparent)" : "1px solid var(--drawer-icon-container-border, transparent)",
        display:"flex", alignItems:"center", justifyContent:"center",
      }}>
        <MatIcon name={task.moduleIcon} size={15} color={task.overdue ? "var(--drawer-badge-high-color, #B03B2E)" : "var(--drawer-icon-container-color, #2563EB)"} />
      </div>

      {/* Content */}
      <div style={{ flex:1, minWidth:0 }}>
        <div style={{ display:"flex", alignItems:"center", gap:6, marginBottom:2, flexWrap:"wrap" }}>
          <span style={{
            fontSize:12, fontWeight:600,
            color: isDone ? "var(--drawer-desc, " + C.muted + ")" : "var(--drawer-row-title, " + C.text + ")",
            textDecoration: isDone ? "line-through" : "none",
          }}>
            {task.title}
          </span>
          {task.priority === "High" && !isDone && <PriorityBadge priority="High" />}
        </div>
        <div style={{ fontSize:11, color:"var(--drawer-row-secondary, " + C.muted + ")", marginBottom:4 }}>{task.relatedTo}</div>

        {warnWorkflow ? (
          <div style={{ fontSize:11, color:"var(--drawer-row-action, #1E40AF)", background:"var(--drawer-card-bg, #EFF6FF)", border:`1px solid var(--drawer-border-divider, #BFDBFE)`, padding:"2px 8px", borderRadius:5, display:"inline-block" }}>
            Requires workflow action — Open →
          </div>
        ) : (
          <div style={{ display:"flex", alignItems:"center", gap:6, flexWrap:"wrap" }}>
            {task.overdue && (
              <>
                <MatIcon name="warning" size={11} color="var(--drawer-badge-high-color, #B03B2E)" />
                <span style={{ fontSize:10, color:"var(--drawer-badge-high-color, #B03B2E)", fontWeight:600 }}>Overdue</span>
                <span style={{ width:2, height:2, borderRadius:"50%", background:"var(--drawer-border-divider, #BFDBFE)" }} />
              </>
            )}
            <span style={{ fontSize:10, color:"var(--drawer-row-due, #94A3B8)" }}>
              Due {task.dueTime ? `${task.due} • ${task.dueTime}` : task.due}
            </span>
            {!isDone && (
              <>
                <span style={{ width:2, height:2, borderRadius:"50%", background:"var(--drawer-border-divider, #BFDBFE)" }} />
                <button onClick={onOpen} style={{ background:"none", border:"none", cursor:"pointer", fontSize:11, fontWeight:600, color:"var(--drawer-row-action, #2563EB)", fontFamily:"inherit", padding:0 }}>
                  Open →
                </button>
              </>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

// ── Task filter panel ──────────────────────────────────────────────────────────

function TaskFilterPanel() {
  return (
    <div style={{
      padding:"12px 16px", borderBottom:`1px solid var(--drawer-border-divider, #BFDBFE)`,
      background:"var(--drawer-filter-panel-bg, #EFF6FF)", display:"flex", flexDirection:"column", gap:10,
    }}>
      <FilterRow label="Status"   options={["All","Open","In Progress","Completed"]} activeBg="#2563EB" inactiveBg="#DBEAFE" inactiveColor="#1E40AF" />
      <FilterRow label="Due"      options={["Overdue","Today","Tomorrow","This Week"]} activeBg="#2563EB" inactiveBg="#DBEAFE" inactiveColor="#1E40AF" />
      <FilterRow label="Priority" options={["High","Medium","Low"]} activeBg="#2563EB" inactiveBg="#DBEAFE" inactiveColor="#1E40AF" />
      <FilterRow label="Module"   options={["Onboarding","Recruitment","Attendance","Leave","Documents","Performance"]} activeBg="#2563EB" inactiveBg="#DBEAFE" inactiveColor="#1E40AF" />
    </div>
  );
}

// ── My Tasks Drawer ────────────────────────────────────────────────────────────

function TaskDrawer({ tasks, onClose, onViewAll, onOpen, onComplete, onAddTask }: {
  tasks: Task[];
  onClose: () => void;
  onViewAll: () => void;
  onOpen: (id: string) => void;
  onComplete: (id: string) => void;
  onAddTask: () => void;
}) {
  const [tab,        setTab]        = useState<"today"|"upcoming"|"completed">("today");
  const [filterOpen, setFilterOpen] = useState(false);

  const visible = tasks.filter(t =>
    tab === "today"    ? t.status !== "Completed" && (t.due === "Today" || !!t.overdue) :
    tab === "upcoming" ? t.status !== "Completed" && t.due !== "Today" && !t.overdue :
                         t.status === "Completed"
  );
  const openCount = tasks.filter(t => t.status !== "Completed").length;

  return (
    <div style={{ position:"absolute", inset:0, display:"flex", flexDirection:"column", background:"var(--drawer-bg, #FEFBFF)" }}>

      {/* Header — Blue identity in Light, BEZENT Dark in Dark */}
      <div style={{
        display:"flex", alignItems:"flex-start",
        padding:"12px 12px 12px 16px", flexShrink:0,
        background:"var(--drawer-header-bg, transparent)",
        borderBottom:`1px solid var(--drawer-border-divider, #BFDBFE)`, gap:8,
      }}>
        <div style={{ flex:1 }}>
          <div style={{
            fontSize:14, fontWeight:700, color:"var(--drawer-title, " + C.text + ")", letterSpacing:"-0.2px",
            display:"flex", alignItems:"center", gap:7, marginBottom:3,
          }}>
            <div style={{
              width:22, height:22, borderRadius:6,
              background:"var(--drawer-icon-container-bg, #DBEAFE)",
              border:"1px solid var(--drawer-icon-container-border, transparent)",
              display:"flex", alignItems:"center", justifyContent:"center",
              flexShrink:0,
            }}>
              <MatIcon name="task_alt" size={14} color="var(--drawer-icon-container-color, #2563EB)" filled />
            </div>
            My Tasks
            {openCount > 0 && (
              <span style={{
                fontSize:10, fontWeight:700, color:"var(--drawer-badge-text, #2563EB)",
                background:"var(--drawer-badge-bg, #DBEAFE)", padding:"1px 6px", borderRadius:99,
              }}>
                {openCount}
              </span>
            )}
          </div>
          <div style={{ fontSize:11, color:"var(--drawer-desc, " + C.muted + ")" }}>Your assigned HR work and follow-ups</div>
        </div>
        <div style={{ display:"flex", gap:1 }}>
          <DrawerIconBtn icon="add"         label="Add Task" onClick={onAddTask} hoverBg="#EFF6FF" activeBg="#DBEAFE" activeColor="#2563EB" />
          <DrawerIconBtn icon="filter_list" label="Filter"   onClick={() => setFilterOpen(v => !v)} active={filterOpen} hoverBg="#EFF6FF" activeBg="#DBEAFE" activeColor="#2563EB" />
          <DrawerIconBtn icon="close"       label="Close"    onClick={onClose} hoverBg="#EFF6FF" activeBg="#DBEAFE" activeColor="#2563EB" />
        </div>
      </div>

      {/* Tabs — Blue active in Light, Purple in Dark */}
      <div style={{ display:"flex", padding:"0 16px", borderBottom:`1px solid var(--drawer-border-divider, #BFDBFE)`, background:"var(--drawer-header-bg, transparent)", flexShrink:0 }}>
        {(["today","upcoming","completed"] as const).map(t => (
          <button
            key={t}
            onClick={() => setTab(t)}
            onMouseEnter={e => { if (tab !== t) e.currentTarget.style.background = "var(--drawer-tab-hover, rgba(147,28,245,0.08))"; }}
            onMouseLeave={e => { if (tab !== t) e.currentTarget.style.background = "transparent"; }}
            style={{
              padding:"9px 12px", border:"none", background:"transparent",
              cursor:"pointer", fontFamily:"inherit",
              fontSize:12, fontWeight:tab === t ? 600 : 450,
              color:tab === t ? "var(--drawer-tab-active-text, " + C.text + ")" : "var(--drawer-tab-inactive, " + C.textSecondary + ")",
              borderBottom:tab === t ? `2px solid var(--drawer-tab-active-indicator, #2563EB)` : "2px solid transparent",
              borderRadius: "6px 6px 0 0",
              marginBottom:-1, transition:"color 0.15s, background-color 0.15s",
            }}
          >
            {{ today:"Today", upcoming:"Upcoming", completed:"Completed" }[t]}
          </button>
        ))}
      </div>

      {filterOpen && <TaskFilterPanel />}

      {/* List */}
      <div style={{ flex:1, overflowY:"auto" }}>
        {visible.map(t => (
          <TaskRow
            key={t.id} task={t}
            onComplete={() => onComplete(t.id)}
            onOpen={() => onOpen(t.id)}
          />
        ))}
        {visible.length === 0 && (
          <EmptyState
            type="tasks"
            size="compact"
            title={tab === "completed" ? "No completed tasks" : "No tasks assigned"}
            description={tab === "completed" ? "Completed tasks will appear here." : "You're all caught up."}
            actionLabel={tab !== "completed" ? "Create Task" : undefined}
            onAction={onAddTask}
          />
        )}
      </div>

      {/* Footer — Blue view all tasks link in Light, #C875FF in Dark */}
      <div style={{
        flexShrink:0, borderTop:`1px solid var(--drawer-footer-border, #BFDBFE)`,
        padding:"10px 16px", display:"flex", justifyContent:"center",
        background:"var(--drawer-footer-bg, transparent)",
      }}>
        <button
          onClick={onViewAll}
          onMouseEnter={e => (e.currentTarget.style.background = "var(--drawer-footer-action-hover, #EFF6FF)")}
          onMouseLeave={e => (e.currentTarget.style.background = "transparent")}
          style={{
            background:"transparent", border:"none", cursor:"pointer",
            fontSize:12, fontWeight:600, color:"var(--drawer-footer-action-text, #2563EB)", fontFamily:"inherit",
            padding:"4px 12px", borderRadius:6, transition:"background-color 0.12s",
          }}
        >
          View all tasks →
        </button>
      </div>
    </div>
  );
}

// ── Summary tile for task page header ─────────────────────────────────────────

function SummaryTile({ label, count, color, bg }: { label: string; count: number; color: string; bg: string }) {
  return (
    <div style={{
      flex:1, padding:"12px 14px", borderRadius:10,
      background:bg, border:`1px solid ${C.borderFaint}`,
      display:"flex", alignItems:"center", gap:10,
    }}>
      <div style={{ fontSize:22, fontWeight:700, color, lineHeight:1 }}>{count}</div>
      <div style={{ fontSize:11, color:C.muted, fontWeight:500, lineHeight:1.3 }}>{label}</div>
    </div>
  );
}

// ── Tasks page table row ───────────────────────────────────────────────────────

function TaskTableRow({ task, selected, onToggle, onOpen }: {
  task: Task; selected: boolean; onToggle: () => void; onOpen: () => void;
}) {
  const colW = ["40px","34%","18%","14%","16%","80px"];
  return (
    <div style={{
      display:"flex", alignItems:"center", padding:"10px 28px",
      borderBottom:`1px solid ${C.borderFaint}`,
      background: selected ? C.hoverBg : "transparent",
      fontSize:12,
    }}>
      <div style={{ width:colW[0], flexShrink:0 }}>
        <input type="checkbox" checked={selected} onChange={onToggle} style={{ cursor:"pointer", accentColor:C.primary }} />
      </div>
      <div style={{ width:colW[1], flexShrink:0, display:"flex", alignItems:"center", gap:8 }}>
        <span style={{ fontWeight:500, color:C.text }}>{task.title}</span>
      </div>
      <div style={{ width:colW[2], fontSize:12, color:C.muted, flexShrink:0 }}>{task.module}</div>
      <div style={{ width:colW[3], flexShrink:0 }}><PriorityBadge priority={task.priority} /></div>
      <div style={{ width:colW[4], fontSize:12, color: task.overdue ? "#B03B2E" : C.muted, flexShrink:0, fontWeight: task.overdue ? 600 : 400 }}>
        {task.overdue ? "Overdue" : task.due}
      </div>
      <div style={{ width:colW[5], flexShrink:0 }}>
        <button onClick={onOpen} style={{ background:"none", border:"none", cursor:"pointer", fontSize:11, fontWeight:600, color:C.primary, fontFamily:"inherit", padding:0 }}>
          Open →
        </button>
      </div>
    </div>
  );
}

// ── My Tasks full page ─────────────────────────────────────────────────────────

function TasksPage({ tasks, onBack, onOpen, onAddTask }: {
  tasks: Task[];
  onBack: () => void;
  onOpen: (id: string) => void;
  onAddTask: () => void;
}) {
  const [tab,    setTab]    = useState<"all"|"today"|"upcoming"|"completed">("all");
  const [search, setSearch] = useState("");
  const [selected, setSelected] = useState<Set<string>>(new Set());

  const counts = {
    total:     tasks.length,
    overdue:   tasks.filter(t => t.overdue && t.status !== "Completed").length,
    today:     tasks.filter(t => t.due === "Today" && t.status !== "Completed" && !t.overdue).length,
    completed: tasks.filter(t => t.status === "Completed").length,
  };

  const filtered = tasks.filter(t => {
    const ms = !search || t.title.toLowerCase().includes(search.toLowerCase()) || t.relatedTo.toLowerCase().includes(search.toLowerCase());
    const mt =
      tab === "all"      ? true :
      tab === "today"    ? t.status !== "Completed" && (t.due === "Today" || !!t.overdue) :
      tab === "upcoming" ? t.status !== "Completed" && t.due !== "Today" && !t.overdue :
                           t.status === "Completed";
    return ms && mt;
  });

  const allSelected = filtered.length > 0 && filtered.every(t => selected.has(t.id));
  function toggleAll() {
    if (allSelected) setSelected(new Set());
    else setSelected(new Set(filtered.map(t => t.id)));
  }
  function toggle(id: string) {
    setSelected(prev => { const next = new Set(prev); if (next.has(id)) next.delete(id); else next.add(id); return next; });
  }

  const colW = ["40px","34%","18%","14%","16%","80px"];

  return (
    <div style={{ display:"flex", flexDirection:"column", height:"100%", background:C.workspace }}>

      {/* Header */}
      <div style={{ padding:"16px 28px 0", flexShrink:0, borderBottom:`1px solid ${C.border}`, background:C.popupBg }}>
        <div style={{ display:"flex", alignItems:"center", gap:10, marginBottom:14 }}>
          <button
            onClick={onBack}
            style={{
              display:"flex", alignItems:"center", gap:4,
              background:"none", border:"none", cursor:"pointer",
              fontSize:12, fontWeight:600, color:C.primary, fontFamily:"inherit", padding:0,
            }}
          >
            <MatIcon name="arrow_back" size={16} color={C.primary} />
            Back
          </button>
          <span style={{ fontSize:17, fontWeight:700, color:C.purpleHeading, letterSpacing:"-0.3px" }}>My Tasks</span>
          <div style={{ marginLeft:"auto" }}>
            <button
              onClick={onAddTask}
              style={{
                display:"flex", alignItems:"center", gap:6,
                height:32, padding:"0 14px",
                background:C.primary, border:"none", borderRadius:8, cursor:"pointer",
                fontSize:12, fontWeight:600, color:"#fff", fontFamily:"inherit",
              }}
            >
              <MatIcon name="add" size={16} color="#fff" />
              Add Task
            </button>
          </div>
        </div>

        {/* Summary tiles */}
        <div style={{ display:"flex", gap:8, marginBottom:14 }}>
          <SummaryTile label="Overdue"   count={overdue}   color="#B03B2E" />
          <SummaryTile label="Due Today" count={dueToday}  color={C.primary} />
          <SummaryTile label="Upcoming"  count={upcoming}  color="#7A5A00" />
          <SummaryTile label="Completed" count={completed} color="#1B7F4F" />
        </div>

        {/* Search */}
        <div style={{
          display:"flex", alignItems:"center", gap:8,
          height:34, padding:"0 12px", marginBottom:12,
          background:C.searchBg, border:`1px solid ${C.borderFaint}`,
          borderRadius:8, maxWidth:380,
        }}>
          <MatIcon name="search" size={16} color="#9580A8" />
          <input
            value={search}
            onChange={e => setSearch(e.target.value)}
            placeholder="Search tasks..."
            style={{ flex:1, background:"none", border:"none", outline:"none", fontSize:12, color:C.text, fontFamily:"inherit" }}
          />
          {search && (
            <button onClick={() => setSearch("")} style={{ background:"none", border:"none", cursor:"pointer", padding:0, display:"flex" }}>
              <MatIcon name="close" size={14} color={C.muted} />
            </button>
          )}
        </div>

        {/* Tabs */}
        <div style={{ display:"flex" }}>
          {(["all","today","upcoming","completed"] as const).map(t => (
            <button
              key={t}
              onClick={() => setTab(t)}
              style={{
                padding:"8px 14px", border:"none", background:"transparent",
                cursor:"pointer", fontFamily:"inherit",
                fontSize:12, fontWeight:tab === t ? 600 : 450,
                color:tab === t ? C.text : C.muted,
                borderBottom:tab === t ? `2px solid ${C.primary}` : "2px solid transparent",
                marginBottom:-1, transition:"color 0.15s",
              }}
            >
              {{ all:"All", today:"Today", upcoming:"Upcoming", completed:"Completed" }[t]}
            </button>
          ))}
        </div>
      </div>

      {/* Table */}
      <div style={{ flex:1, overflowY:"auto" }}>
        <div style={{
          display:"flex", padding:"9px 28px",
          borderBottom:`1px solid ${C.border}`,
          background:"var(--bg-surface-secondary, #F8F3FC)", position:"sticky", top:0, zIndex:2,
        }}>
          {cols.map((col, i) => (
            <div key={col} style={{ width:colW[i], fontSize:10, fontWeight:700, color:C.textSecondary, textTransform:"uppercase", letterSpacing:"0.07em", flexShrink:0 }}>
              {col}
            </div>
          ))}
        </div>

        {filtered.map(t => (
          <TaskTableRow key={t.id} task={t} colW={colW} onOpen={() => onOpen(t.id)} />
        ))}
        {filtered.length === 0 && (
          <div style={{ padding:"60px 28px", textAlign:"center", color:C.muted, fontSize:13 }}>
            No tasks found
          </div>
        )}
      </div>
    </div>
  );
}

// ── Shared form helpers ────────────────────────────────────────────────────────

const taskInputStyle = {
  width:"100%", padding:"7px 10px", borderRadius:8,
  border:`1px solid ${C.border}`, outline:"none",
  fontSize:12, color:C.text, fontFamily:"inherit",
  background:"#FAFAFA", boxSizing:"border-box" as const,
};

const taskPrimaryBtn = {
  height:32, padding:"0 16px", background:C.primary, border:"none",
  borderRadius:8, cursor:"pointer", fontSize:12, fontWeight:600,
  color:"#fff", fontFamily:"inherit",
};

const taskSecondaryBtn = {
  height:32, padding:"0 14px", background:"transparent",
  border:`1px solid ${C.border}`, borderRadius:8, cursor:"pointer",
  fontSize:12, fontWeight:500, color:C.text, fontFamily:"inherit",
};

function TaskFormField({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div>
      <label style={{ fontSize:10, fontWeight:700, color:C.muted, textTransform:"uppercase", letterSpacing:"0.06em", display:"block", marginBottom:4 }}>
        {label}
      </label>
      {children}
    </div>
  );
}

// ── Add Task Panel (floating overlay) ─────────────────────────────────────────

const TASK_MODULES = ["Employees","Recruitment","Onboarding","Attendance","Leave","Documents","Performance","Learning"];

function AddTaskPanel({ onClose, onCreate }: {
  onClose: () => void;
  onCreate: (data: { title:string; relatedTo:string; module:string; priority:"High"|"Medium"|"Low"; due:string; dueTime:string }) => void;
}) {
  const [title,     setTitle]     = useState("");
  const [desc,      setDesc]      = useState("");
  const [relatedTo, setRelatedTo] = useState("");
  const [module,    setModule]    = useState("Onboarding");
  const [priority,  setPriority]  = useState<"High"|"Medium"|"Low">("Medium");
  const [due,       setDue]       = useState("");
  const [dueTime,   setDueTime]   = useState("");

  function handleCreate() {
    if (!title.trim()) return;
    onCreate({ title:title.trim(), relatedTo:relatedTo.trim(), module, priority, due:due||"Today", dueTime });
    onClose();
  }

  return (
    <div style={{
      width:440, background:"#fff", borderRadius:14,
      border:`1px solid ${C.border}`,
      boxShadow:"0 8px 40px rgba(45,6,77,0.16)",
      overflow:"hidden",
    }}>
      <div style={{ display:"flex", alignItems:"center", padding:"14px 18px", borderBottom:`1px solid ${C.border}` }}>
        <span style={{ flex:1, fontSize:14, fontWeight:700, color:C.text }}>Add Task</span>
        <button onClick={onClose} style={{ background:"none", border:"none", cursor:"pointer", display:"flex" }}>
          <MatIcon name="close" size={18} color={C.muted} />
        </button>
      </div>

      <div style={{ padding:"16px 18px", display:"flex", flexDirection:"column", gap:12, maxHeight:440, overflowY:"auto" }}>
        <TaskFormField label="Task Title *">
          <input value={title} onChange={e => setTitle(e.target.value)} placeholder="Enter task title" style={taskInputStyle} />
        </TaskFormField>

        <TaskFormField label="Description">
          <textarea value={desc} onChange={e => setDesc(e.target.value)} placeholder="Add description..." rows={2} style={{ ...taskInputStyle, resize:"none" }} />
        </TaskFormField>

        <TaskFormField label="Related Employee / Candidate">
          <input value={relatedTo} onChange={e => setRelatedTo(e.target.value)} placeholder="e.g. Arun Kumar" style={taskInputStyle} />
        </TaskFormField>

        <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:10 }}>
          <TaskFormField label="Module">
            <select value={module} onChange={e => setModule(e.target.value)} style={taskInputStyle}>
              {TASK_MODULES.map(m => <option key={m} value={m}>{m}</option>)}
            </select>
          </TaskFormField>
          <TaskFormField label="Priority">
            <select value={priority} onChange={e => setPriority(e.target.value as "High"|"Medium"|"Low")} style={taskInputStyle}>
              <option value="High">High</option>
              <option value="Medium">Medium</option>
              <option value="Low">Low</option>
            </select>
          </TaskFormField>
        </div>

        <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:10 }}>
          <TaskFormField label="Due Date">
            <input type="date" value={due} onChange={e => setDue(e.target.value)} style={taskInputStyle} />
          </TaskFormField>
          <TaskFormField label="Due Time">
            <input type="time" value={dueTime} onChange={e => setDueTime(e.target.value)} style={taskInputStyle} />
          </TaskFormField>
        </div>
      </div>

      <div style={{ display:"flex", justifyContent:"flex-end", gap:8, padding:"12px 18px", borderTop:`1px solid ${C.border}` }}>
        <button onClick={onClose} style={taskSecondaryBtn}>Cancel</button>
        <button
          onClick={handleCreate}
          disabled={!title.trim()}
          style={{ ...taskPrimaryBtn, opacity:title.trim() ? 1 : 0.45, cursor:title.trim() ? "pointer" : "not-allowed" }}
        >
          Create Task
        </button>
      </div>
    </div>
  );
}

// ── Task Detail (full review page) ────────────────────────────────────────────

function TaskDetail({ task, onBack, onComplete, onToggleChecklist }: {
  task: Task;
  onBack: () => void;
  onComplete: (id: string) => void;
  onToggleChecklist: (taskId: string, idx: number) => void;
}) {
  const [comment,    setComment]    = useState("");
  const [localHistory, setLocalHistory] = useState(task.history);
  const isDone = task.status === "Completed";

  function handleMarkComplete() {
    if (task.requiresWorkflow || isDone) return;
    onComplete(task.id);
    setLocalHistory(prev => [{ label:"Marked complete by HR", time:"Just now" }, ...prev]);
  }

  function handleAddComment() {
    if (!comment.trim()) return;
    setLocalHistory(prev => [{ label:`Comment: "${comment.trim()}"`, time:"Just now" }, ...prev]);
    setComment("");
  }

  const cl = task.checklist || [];
  const clDone = cl.filter(c => c.done).length;

  return (
    <div style={{ display:"flex", flexDirection:"column", height:"100%", background:"#FEFBFF", overflowY:"auto" }}>

      {/* Breadcrumb */}
      <div style={{
        padding:"13px 28px", borderBottom:`1px solid ${C.border}`,
        display:"flex", alignItems:"center", gap:10, flexShrink:0,
      }}>
        <button onClick={onBack} style={{ background:"none", border:"none", cursor:"pointer", display:"flex", alignItems:"center", gap:4, color:C.primary, fontSize:12, fontWeight:600, fontFamily:"inherit" }}>
          <MatIcon name="arrow_back" size={16} color={C.primary} />
          Back
        </button>
        <span style={{ width:1, height:14, background:C.borderFaint }} />
        <span style={{ fontSize:12, color:C.muted }}>My Tasks</span>
        <MatIcon name="chevron_right" size={14} color={C.muted} />
        <span style={{ fontSize:12, color:C.text, fontWeight:500, overflow:"hidden", textOverflow:"ellipsis", whiteSpace:"nowrap", maxWidth:240 }}>
          {task.title}
        </span>
        <div style={{ marginLeft:"auto", display:"flex", gap:6, alignItems:"center" }}>
          <PriorityBadge priority={task.priority} />
          <StatusChip status={task.status} />
        </div>
      </div>

      {/* Body */}
      <div style={{ flex:1, padding:"24px 28px", display:"flex", gap:22, minHeight:0 }}>

        {/* Left: main content */}
        <div style={{ flex:1, display:"flex", flexDirection:"column", gap:14, minWidth:0 }}>

          {/* Task summary */}
          <div style={{ background:"#fff", border:`1px solid ${C.border}`, borderRadius:12, padding:"18px 20px" }}>
            <div style={{ fontSize:16, fontWeight:700, color:C.text, letterSpacing:"-0.2px", marginBottom:14 }}>
              {task.title}
            </div>
            <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:"12px 24px" }}>
              <DetailField label="Related To"  value={task.relatedTo} />
              <DetailField label="Module"      value={task.module}    />
              <DetailField label="Due"         value={task.dueTime ? `${task.due} • ${task.dueTime}` : task.due} />
              {task.assignedBy && <DetailField label="Assigned By" value={task.assignedBy} />}
            </div>
            {task.description && (
              <div style={{ paddingTop:12, marginTop:12, borderTop:`1px solid ${C.borderFaint}` }}>
                <div style={{ fontSize:10, fontWeight:600, color:C.muted, textTransform:"uppercase", letterSpacing:"0.06em", marginBottom:5 }}>Description</div>
                <div style={{ fontSize:13, color:C.text, lineHeight:1.6 }}>{task.description}</div>
              </div>
            )}
          </div>

          {/* Checklist */}
          {cl.length > 0 && (
            <div style={{ background:"#fff", border:`1px solid ${C.border}`, borderRadius:12, padding:"16px 20px" }}>
              <div style={{ display:"flex", alignItems:"center", gap:10, marginBottom:14 }}>
                <span style={{ fontSize:10, fontWeight:700, color:C.muted, textTransform:"uppercase", letterSpacing:"0.07em" }}>Checklist</span>
                <span style={{ fontSize:10, color:C.muted }}>{clDone}/{cl.length}</span>
                <div style={{ flex:1, height:3, background:C.borderFaint, borderRadius:2, overflow:"hidden" }}>
                  <div style={{ height:"100%", width:`${cl.length ? (clDone/cl.length)*100 : 0}%`, background:C.primary, borderRadius:2, transition:"width 0.3s" }} />
                </div>
              </div>
              <div style={{ display:"flex", flexDirection:"column", gap:10 }}>
                {cl.map((item, i) => (
                  <div
                    key={i}
                    onClick={() => onToggleChecklist(task.id, i)}
                    style={{ display:"flex", alignItems:"center", gap:10, cursor:"pointer" }}
                  >
                    <div style={{
                      width:18, height:18, borderRadius:4, flexShrink:0,
                      border:`1.5px solid ${item.done ? C.primary : "#C5B0D0"}`,
                      background: item.done ? C.primary : "transparent",
                      display:"flex", alignItems:"center", justifyContent:"center",
                      transition:"all 0.2s",
                    }}>
                      {item.done && <MatIcon name="check" size={11} color="#fff" />}
                    </div>
                    <span style={{
                      fontSize:13, color: item.done ? C.muted : C.text,
                      textDecoration: item.done ? "line-through" : "none", transition:"all 0.2s",
                    }}>
                      {item.label}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Activity + comment */}
          <div style={{ background:"#fff", border:`1px solid ${C.border}`, borderRadius:12, padding:"16px 20px" }}>
            <div style={{ fontSize:10, fontWeight:700, color:C.muted, textTransform:"uppercase", letterSpacing:"0.07em", marginBottom:12 }}>Activity</div>
            <div style={{ display:"flex", flexDirection:"column", gap:10, marginBottom:14 }}>
              {localHistory.map((h, i) => (
                <div key={i} style={{ display:"flex", gap:10, alignItems:"flex-start" }}>
                  <div style={{ width:7, height:7, borderRadius:"50%", background: i === 0 ? C.primary : C.borderFaint, marginTop:4, flexShrink:0 }} />
                  <div>
                    <span style={{ fontSize:12, color:C.text }}>{h.label}</span>
                    <div style={{ fontSize:10, color:"#B09DC0", marginTop:1 }}>{h.time}</div>
                  </div>
                </div>
              ))}
            </div>
            <div style={{ display:"flex", gap:8, borderTop:`1px solid ${C.borderFaint}`, paddingTop:12 }}>
              <input
                value={comment}
                onChange={e => setComment(e.target.value)}
                onKeyDown={e => e.key === "Enter" && handleAddComment()}
                placeholder="Add a comment..."
                style={{ ...taskInputStyle, flex:1 }}
              />
              <button
                onClick={handleAddComment}
                disabled={!comment.trim()}
                style={{ ...taskPrimaryBtn, opacity:comment.trim() ? 1 : 0.45, cursor:comment.trim() ? "pointer" : "not-allowed" }}
              >
                Add
              </button>
            </div>
          </div>
        </div>

        {/* Right: action panel */}
        <div style={{ width:210, flexShrink:0, display:"flex", flexDirection:"column", gap:12 }}>
          <div style={{ background:"#fff", border:`1px solid ${C.border}`, borderRadius:12, padding:"16px" }}>
            <div style={{ fontSize:10, fontWeight:700, color:C.muted, textTransform:"uppercase", letterSpacing:"0.06em", marginBottom:12 }}>Actions</div>
            <div style={{ display:"flex", flexDirection:"column", gap:8 }}>
              <button style={{ ...taskPrimaryBtn, width:"100%", display:"flex", alignItems:"center", justifyContent:"center", gap:6 }}>
                <MatIcon name="open_in_new" size={15} color="#fff" />
                Open Related Record
              </button>
              {!isDone && !task.requiresWorkflow && (
                <button
                  onClick={handleMarkComplete}
                  style={{
                    width:"100%", height:32, display:"flex", alignItems:"center", justifyContent:"center", gap:6,
                    background:"#1B7F4F", border:"none", borderRadius:8, cursor:"pointer",
                    fontSize:12, fontWeight:600, color:"#fff", fontFamily:"inherit",
                  }}
                >
                  <MatIcon name="check_circle" size={15} color="#fff" />
                  Mark Complete
                </button>
              )}
              {task.requiresWorkflow && !isDone && (
                <div style={{ fontSize:11, color:"#7A5A00", background:"#FFF8E0", padding:"8px 10px", borderRadius:7, textAlign:"center", lineHeight:1.45 }}>
                  Complete this via the workflow in the related record.
                </div>
              )}
            </div>
          </div>

          <div style={{ background:"#fff", border:`1px solid ${C.border}`, borderRadius:12, padding:"14px 16px" }}>
            <div style={{ fontSize:10, fontWeight:700, color:C.muted, textTransform:"uppercase", letterSpacing:"0.06em", marginBottom:10 }}>Task Info</div>
            <div style={{ display:"flex", flexDirection:"column", gap:7 }}>
              <MiniField label="Priority"    value={task.priority}  />
              <MiniField label="Status"      value={task.status}    />
              <MiniField label="Due"         value={task.due}       />
              {task.assignedBy && <MiniField label="Assigned By" value={task.assignedBy} />}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── APPROVAL SYSTEM ─────────────────────────────────────────────────────────

type Approval = {
  id:           string;
  employee:     string;
  role:         string;
  department:   string;
  type:         string;
  typeIcon:     string;
  summary:      string;
  dates?:       string;
  duration?:    string;
  submitted:    string;
  priority:     "Urgent" | "Normal";
  status:       "Pending" | "Approved" | "Rejected";
  reason?:      string;
  leaveBalance?: string;
  teamAvail?:   string;
  prevLeave?:   string;
  flow:         Array<{ label: string; done: boolean; pending?: boolean }>;
  history:      Array<{ label: string; time: string; actor?: string }>;
};

const INIT_APPROVALS: Approval[] = [
  {
    id:"ap1", employee:"Priya S", role:"UI Designer", department:"Design",
    type:"Casual Leave", typeIcon:"event_busy", summary:"10 Sep – 11 Sep • 2 Days",
    dates:"10 Sep – 11 Sep 2026", duration:"2 Days", submitted:"20 min ago",
    priority:"Normal", status:"Pending", reason:"Personal work",
    leaveBalance:"8 Days", teamAvail:"6 of 8 employees available", prevLeave:"18 Aug 2026",
    flow:[
      { label:"Employee Submitted", done:true },
      { label:"Team Lead Approved", done:true },
      { label:"HR Review",          done:false, pending:true },
    ],
    history:[
      { label:"Request submitted",  time:"20 min ago", actor:"Priya S" },
      { label:"Forwarded to HR",    time:"15 min ago", actor:"System"  },
      { label:"Team Lead approved", time:"10 min ago", actor:"Rahul T" },
    ],
  },
  {
    id:"ap2", employee:"Arun Kumar", role:"Backend Engineer", department:"Engineering",
    type:"Attendance Regularization", typeIcon:"schedule", summary:"Missing Check-out • 8 Sep",
    submitted:"45 min ago", priority:"Normal", status:"Pending",
    flow:[
      { label:"Employee Submitted", done:true },
      { label:"HR Review",          done:false, pending:true },
    ],
    history:[{ label:"Request submitted", time:"45 min ago", actor:"Arun Kumar" }],
  },
  {
    id:"ap3", employee:"Karthik R", role:"Senior Engineer", department:"Engineering",
    type:"Employee Information Change", typeIcon:"manage_accounts", summary:"Bank Account Details",
    submitted:"1 hr ago", priority:"Normal", status:"Pending",
    flow:[
      { label:"Employee Submitted", done:true },
      { label:"HR Review",          done:false, pending:true },
    ],
    history:[{ label:"Request submitted", time:"1 hr ago", actor:"Karthik R" }],
  },
  {
    id:"ap4", employee:"Divya M", role:"Operations Lead", department:"Operations",
    type:"Shift Change Request", typeIcon:"date_range", summary:"Morning → Evening Shift",
    submitted:"2 hrs ago", priority:"Urgent", status:"Pending",
    flow:[
      { label:"Employee Submitted", done:true },
      { label:"Team Lead Approved", done:true },
      { label:"HR Review",          done:false, pending:true },
    ],
    history:[
      { label:"Request submitted",  time:"2 hrs ago",   actor:"Divya M"  },
      { label:"Team Lead approved", time:"1.5 hrs ago", actor:"Vivek P"  },
    ],
  },
  {
    id:"ap5", employee:"Naveen K", role:"Product Designer", department:"Design",
    type:"Document Verification", typeIcon:"folder", summary:"Address Proof",
    submitted:"Yesterday", priority:"Normal", status:"Pending",
    flow:[
      { label:"Employee Submitted", done:true },
      { label:"HR Review",          done:false, pending:true },
    ],
    history:[{ label:"Request submitted", time:"Yesterday", actor:"Naveen K" }],
  },
];

// ── Compact approval row (drawer) ─────────────────────────────────────────────

function ApprovalRow({ approval, onReview }: { approval: Approval; onReview: () => void }) {
  const [hov, setHov] = useState(false);
  const urgent = approval.priority === "Urgent";
  return (
    <div
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      style={{
        display:"flex", alignItems:"flex-start", gap:10,
        padding:"10px 16px",
        background: hov ? "var(--drawer-row-hover, #ECFDF5)" : "transparent",
        borderBottom:`1px solid var(--drawer-border-divider, ${C.borderFaint})`,
        transition:"background 0.12s",
      }}
    >
      <div style={{
        width:32, height:32, borderRadius:8, flexShrink:0, marginTop:1,
        background: urgent ? "var(--drawer-badge-high-bg, #FDECEA)" : "var(--drawer-icon-container-bg, #D1FAE5)",
        border: urgent ? "1px solid var(--drawer-badge-high-bg, transparent)" : "1px solid var(--drawer-icon-container-border, transparent)",
        display:"flex", alignItems:"center", justifyContent:"center",
      }}>
        <MatIcon name={approval.typeIcon} size={16} color={urgent ? "var(--drawer-badge-high-color, #B03B2E)" : "var(--drawer-icon-container-color, #059669)"} />
      </div>

      <div style={{ flex:1, minWidth:0 }}>
        <div style={{ display:"flex", alignItems:"center", gap:6, marginBottom:2 }}>
          <span style={{ fontSize:12, fontWeight:600, color:"var(--drawer-row-title, " + C.text + ")" }}>{approval.employee}</span>
          {urgent && (
            <span style={{
              fontSize:9, fontWeight:700, color:"var(--drawer-badge-high-color, #B03B2E)",
              background:"var(--drawer-badge-high-bg, #FDECEA)", padding:"1px 5px", borderRadius:99,
              textTransform:"uppercase", letterSpacing:"0.06em",
            }}>
              Urgent
            </span>
          )}
        </div>
        <div style={{ fontSize:11, color:"var(--drawer-row-title, " + C.text + ")", fontWeight:450, marginBottom:2 }}>{approval.type}</div>
        <div style={{ fontSize:11, color:"var(--drawer-row-secondary, " + C.muted + ")", marginBottom:5 }}>{approval.summary}</div>
        <div style={{ display:"flex", alignItems:"center", gap:6 }}>
          <span style={{ fontSize:10, color:"var(--drawer-row-due, #94A3B8)" }}>Submitted {approval.submitted}</span>
          <span style={{ width:2, height:2, borderRadius:"50%", background:"var(--drawer-border-divider, #A7F3D0)" }} />
          <button
            onClick={onReview}
            style={{
              background:"none", border:"none", cursor:"pointer",
              fontSize:11, fontWeight:600, color:"var(--drawer-row-action, #059669)", fontFamily:"inherit", padding:0,
            }}
          >
            Review →
          </button>
        </div>
      </div>
    </div>
  );
}

// ── Approval filter panel ─────────────────────────────────────────────────────

function ApprovalFilterPanel() {
  return (
    <div style={{
      padding:"12px 16px",
      borderBottom:`1px solid var(--drawer-border-divider, #A7F3D0)`,
      background:"var(--drawer-filter-panel-bg, #ECFDF5)",
      display:"flex", flexDirection:"column", gap:10,
    }}>
      <FilterRow label="Type"      options={["Leave","Attendance","Timesheet","Shift","Emp. Info","Documents"]} activeBg="#059669" inactiveBg="#D1FAE5" inactiveColor="#065F46" />
      <FilterRow label="Priority"  options={["Urgent","Normal"]} activeBg="#059669" inactiveBg="#D1FAE5" inactiveColor="#065F46" />
      <FilterRow label="Submitted" options={["Today","Last 7 Days","Last 30 Days"]} activeBg="#059669" inactiveBg="#D1FAE5" inactiveColor="#065F46" />
    </div>
  );
}

// ── Approval Drawer ───────────────────────────────────────────────────────────

function ApprovalDrawer({ approvals, onClose, onViewAll, onReview }: {
  approvals: Approval[];
  onClose: () => void;
  onViewAll: () => void;
  onReview: (id: string) => void;
}) {
  const [tab,        setTab]        = useState<"pending"|"urgent"|"actioned">("pending");
  const [filterOpen, setFilterOpen] = useState(false);

  const visible = approvals.filter(a =>
    tab === "pending"  ? a.status === "Pending" :
    tab === "urgent"   ? a.status === "Pending" && a.priority === "Urgent" :
                         a.status !== "Pending"
  );
  const pendingCount = approvals.filter(a => a.status === "Pending").length;

  return (
    <div style={{ position:"absolute", inset:0, display:"flex", flexDirection:"column", background:"var(--drawer-bg, #FEFBFF)" }}>

      {/* Header — Green identity in Light, BEZENT Dark in Dark */}
      <div style={{
        display:"flex", alignItems:"flex-start",
        padding:"12px 12px 12px 16px", flexShrink:0,
        background:"var(--drawer-header-bg, transparent)",
        borderBottom:`1px solid var(--drawer-border-divider, #A7F3D0)`, gap:8,
      }}>
        <div style={{ flex:1 }}>
          <div style={{
            fontSize:14, fontWeight:700, color:"var(--drawer-title, " + C.text + ")", letterSpacing:"-0.2px",
            display:"flex", alignItems:"center", gap:7, marginBottom:3,
          }}>
            <div style={{
              width:22, height:22, borderRadius:6,
              background:"var(--drawer-icon-container-bg, #D1FAE5)",
              border:"1px solid var(--drawer-icon-container-border, transparent)",
              display:"flex", alignItems:"center", justifyContent:"center",
              flexShrink:0,
            }}>
              <MatIcon name="verified" size={14} color="var(--drawer-icon-container-color, #059669)" filled />
            </div>
            Approvals
            {pendingCount > 0 && (
              <span style={{
                fontSize:10, fontWeight:700, color:"var(--drawer-badge-text, #059669)",
                background:"var(--drawer-badge-bg, #D1FAE5)", padding:"1px 6px", borderRadius:99,
              }}>
                {pendingCount}
              </span>
            )}
          </div>
          <div style={{ fontSize:11, color:"var(--drawer-desc, " + C.muted + ")" }}>Requests waiting for your review</div>
        </div>
        <div style={{ display:"flex", gap:1 }}>
          <DrawerIconBtn icon="filter_list" label="Filter" onClick={() => setFilterOpen(v => !v)} active={filterOpen} hoverBg="#ECFDF5" activeBg="#D1FAE5" activeColor="#059669" />
          <DrawerIconBtn icon="close"       label="Close"  onClick={onClose} hoverBg="#ECFDF5" activeBg="#D1FAE5" activeColor="#059669" />
        </div>
      </div>

      {/* Tabs — Green active state in Light, Purple in Dark */}
      <div style={{ display:"flex", padding:"0 16px", borderBottom:`1px solid var(--drawer-border-divider, #A7F3D0)`, background:"var(--drawer-header-bg, transparent)", flexShrink:0 }}>
        {(["pending","urgent","actioned"] as const).map(t => (
          <button
            key={t}
            onClick={() => setTab(t)}
            onMouseEnter={e => { if (tab !== t) e.currentTarget.style.background = "var(--drawer-tab-hover, rgba(147,28,245,0.08))"; }}
            onMouseLeave={e => { if (tab !== t) e.currentTarget.style.background = "transparent"; }}
            style={{
              padding:"9px 10px", border:"none", background:"transparent",
              cursor:"pointer", fontFamily:"inherit",
              fontSize:12, fontWeight:tab === t ? 600 : 450,
              color:tab === t ? "var(--drawer-tab-active-text, " + C.text + ")" : "var(--drawer-tab-inactive, " + C.textSecondary + ")",
              borderBottom:tab === t ? `2px solid var(--drawer-tab-active-indicator, #059669)` : "2px solid transparent",
              borderRadius: "6px 6px 0 0",
              marginBottom:-1, transition:"color 0.15s, background-color 0.15s",
            }}
          >
            {{ pending:"Pending", urgent:"Urgent", actioned:"Recently Actioned" }[t]}
          </button>
        ))}
      </div>

      {filterOpen && <ApprovalFilterPanel />}

      {/* List */}
      <div style={{ flex:1, overflowY:"auto" }}>
        {visible.map(a => (
          <ApprovalRow key={a.id} approval={a} onReview={() => onReview(a.id)} />
        ))}
        {visible.length === 0 && (
          <EmptyState
            type="approvals"
            size="compact"
            title={tab === "actioned" ? "No recently actioned requests" : "No pending approvals"}
            description={tab === "actioned" ? "Requests you approve or reject will appear here." : "All pending requests have been reviewed."}
          />
        )}
      </div>

      {/* Footer — Green review link in Light, #C875FF in Dark */}
      <div style={{
        flexShrink:0, borderTop:`1px solid var(--drawer-footer-border, #A7F3D0)`,
        padding:"10px 16px", display:"flex", justifyContent:"center",
        background:"var(--drawer-footer-bg, transparent)",
      }}>
        <button
          onClick={onViewAll}
          onMouseEnter={e => (e.currentTarget.style.background = "var(--drawer-footer-action-hover, #ECFDF5)")}
          onMouseLeave={e => (e.currentTarget.style.background = "transparent")}
          style={{
            background:"transparent", border:"none", cursor:"pointer",
            fontSize:12, fontWeight:600, color:"var(--drawer-footer-action-text, #059669)", fontFamily:"inherit",
            padding:"4px 12px", borderRadius:6, transition:"background-color 0.12s",
          }}
        >
          View all approvals →
        </button>
      </div>
    </div>
  );
}

// ── Approval Center table row ─────────────────────────────────────────────────

function ApprovalTableRow({ approval, colW, onReview }: {
  approval: Approval; colW: string[]; onReview: () => void;
}) {
  const [hov, setHov] = useState(false);
  const urgent = approval.priority === "Urgent";
  const sc = approval.status === "Approved" ? "#1B7F4F" : approval.status === "Rejected" ? "#B03B2E" : C.muted;
  const sb = approval.status === "Approved" ? "#EAFAF2" : approval.status === "Rejected" ? "#FDECEA" : "#F0E8F8";

  return (
    <div
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      style={{
        display:"flex", alignItems:"center", padding:"11px 28px",
        borderBottom:`1px solid ${C.borderFaint}`,
        background: hov ? C.hoverBg : "transparent",
        transition:"background 0.12s",
      }}
    >
      <div style={{ width:colW[0], display:"flex", alignItems:"center", gap:8, flexShrink:0, minWidth:0, paddingRight:8 }}>
        <div style={{
          width:26, height:26, borderRadius:7, flexShrink:0,
          background: urgent ? "#FDECEA" : C.selectedBg,
          display:"flex", alignItems:"center", justifyContent:"center",
        }}>
          <MatIcon name={approval.typeIcon} size={14} color={urgent ? "#B03B2E" : C.primary} />
        </div>
        <span style={{ fontSize:12, fontWeight:500, color:C.text, overflow:"hidden", textOverflow:"ellipsis", whiteSpace:"nowrap" }}>
          {approval.type}
        </span>
      </div>
      <div style={{ width:colW[1], fontSize:12, fontWeight:600, color:C.text, flexShrink:0 }}>{approval.employee}</div>
      <div style={{ width:colW[2], fontSize:12, color:C.muted, flexShrink:0 }}>{approval.department}</div>
      <div style={{ width:colW[3], fontSize:12, color:C.muted, flexShrink:0 }}>{approval.submitted}</div>
      <div style={{ width:colW[4], flexShrink:0 }}>
        {urgent
          ? <span style={{ fontSize:9, fontWeight:700, color:"#B03B2E", background:"#FDECEA", padding:"2px 7px", borderRadius:99, textTransform:"uppercase", letterSpacing:"0.06em" }}>Urgent</span>
          : <span style={{ fontSize:11, color:C.muted }}>Normal</span>}
      </div>
      <div style={{ width:colW[5], flexShrink:0 }}>
        <span style={{ fontSize:10, fontWeight:600, color:sc, background:sb, padding:"2px 8px", borderRadius:99 }}>
          {approval.status}
        </span>
      </div>
      <div style={{ width:colW[6], flexShrink:0 }}>
        {approval.status === "Pending"
          ? <button onClick={onReview} style={{ background:"none", border:"none", cursor:"pointer", fontSize:11, fontWeight:600, color:C.primary, fontFamily:"inherit", padding:0 }}>Review →</button>
          : <span style={{ fontSize:11, color:C.muted }}>—</span>}
      </div>
    </div>
  );
}

// ── Approval Center (full workspace page) ─────────────────────────────────────

function ApprovalCenter({ approvals, onBack, onReview }: {
  approvals: Approval[];
  onBack: () => void;
  onReview: (id: string) => void;
}) {
  const [tab,    setTab]    = useState<"pending"|"urgent"|"approved"|"rejected">("pending");
  const [search, setSearch] = useState("");

  const filtered = approvals.filter(a => {
    const ms = !search || a.employee.toLowerCase().includes(search.toLowerCase()) || a.type.toLowerCase().includes(search.toLowerCase());
    const mt = tab === "pending" ? a.status === "Pending"
      : tab === "urgent"   ? a.status === "Pending" && a.priority === "Urgent"
      : tab === "approved" ? a.status === "Approved"
                           : a.status === "Rejected";
    return ms && mt;
  });

  const colW = ["22%","15%","13%","12%","11%","13%","14%"];
  const cols = ["Request","Employee","Department","Submitted","Priority","Status","Action"];

  return (
    <div style={{ display:"flex", flexDirection:"column", height:"100%", background:"#FEFBFF" }}>

      {/* Header */}
      <div style={{ padding:"18px 28px 0", borderBottom:`1px solid ${C.border}`, flexShrink:0 }}>
        <div style={{ display:"flex", alignItems:"flex-start", gap:10, marginBottom:14 }}>
          <button
            onClick={onBack}
            style={{
              background:"none", border:"none", cursor:"pointer",
              display:"flex", alignItems:"center", gap:4,
              color:C.primary, fontSize:12, fontWeight:600, fontFamily:"inherit", marginTop:3,
            }}
          >
            <MatIcon name="arrow_back" size={16} color={C.primary} />
            Back
          </button>
          <div>
            <div style={{ fontSize:17, fontWeight:700, color:C.text, letterSpacing:"-0.3px" }}>Approvals</div>
            <div style={{ fontSize:12, color:C.muted, marginTop:2 }}>Review and manage requests requiring your decision.</div>
          </div>
          <div style={{ marginLeft:"auto", display:"flex", gap:6, alignItems:"center" }}>
            <PageHeaderBtn icon="filter_list" label="Filter" />
            <PageHeaderBtn icon="download"    label="Export" />
          </div>
        </div>

        {/* Search */}
        <div style={{
          display:"flex", alignItems:"center", gap:8,
          height:34, padding:"0 12px", marginBottom:12,
          background:"#F5EEF9", border:`1px solid ${C.borderFaint}`,
          borderRadius:8, maxWidth:380,
        }}>
          <MatIcon name="search" size={16} color="#9580A8" />
          <input
            value={search}
            onChange={e => setSearch(e.target.value)}
            placeholder="Search approvals..."
            style={{ flex:1, background:"none", border:"none", outline:"none", fontSize:12, color:C.text, fontFamily:"inherit" }}
          />
          {search && (
            <button onClick={() => setSearch("")} style={{ background:"none", border:"none", cursor:"pointer", padding:0, display:"flex" }}>
              <MatIcon name="close" size={14} color={C.muted} />
            </button>
          )}
        </div>

        {/* Tabs */}
        <div style={{ display:"flex" }}>
          {(["pending","urgent","approved","rejected"] as const).map(t => (
            <button
              key={t}
              onClick={() => setTab(t)}
              style={{
                padding:"8px 14px", border:"none", background:"transparent",
                cursor:"pointer", fontFamily:"inherit",
                fontSize:12, fontWeight:tab === t ? 600 : 450,
                color:tab === t ? C.text : C.muted,
                borderBottom:tab === t ? `2px solid ${C.primary}` : "2px solid transparent",
                marginBottom:-1, transition:"color 0.15s",
              }}
            >
              {{ pending:"Pending", urgent:"Urgent", approved:"Approved", rejected:"Rejected" }[t]}
            </button>
          ))}
        </div>
      </div>

      {/* Table */}
      <div style={{ flex:1, overflowY:"auto" }}>
        <div style={{
          display:"flex", padding:"9px 28px",
          borderBottom:`1px solid ${C.border}`,
          background:"var(--bg-surface-secondary, #F8F3FC)", position:"sticky", top:0, zIndex:2,
        }}>
          {cols.map((col, i) => (
            <div key={col} style={{ width:colW[i], fontSize:10, fontWeight:700, color:C.textSecondary, textTransform:"uppercase", letterSpacing:"0.07em", flexShrink:0 }}>
              {col}
            </div>
          ))}
        </div>

        {filtered.map(a => (
          <ApprovalTableRow key={a.id} approval={a} colW={colW} onReview={() => onReview(a.id)} />
        ))}
        {filtered.length === 0 && (
          <div style={{ padding:"60px 28px", textAlign:"center", color:C.muted, fontSize:13 }}>
            No approvals found
          </div>
        )}
      </div>
    </div>
  );
}

// ── Approval Detail helpers ───────────────────────────────────────────────────

function DetailField({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <div style={{ fontSize:10, fontWeight:600, color:C.muted, textTransform:"uppercase", letterSpacing:"0.06em", marginBottom:3 }}>
        {label}
      </div>
      <div style={{ fontSize:13, color:C.text, fontWeight:500 }}>{value}</div>
    </div>
  );
}

function MiniField({ label, value }: { label: string; value: string }) {
  return (
    <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center" }}>
      <span style={{ fontSize:11, color:C.muted }}>{label}</span>
      <span style={{ fontSize:11, fontWeight:600, color:C.text }}>{value}</span>
    </div>
  );
}

// ── Approval Detail (review page) ─────────────────────────────────────────────

function ApprovalDetail({ approval, onBack, onAction }: {
  approval: Approval;
  onBack: () => void;
  onAction: (id: string, action: "approve" | "reject" | "more-info") => void;
}) {
  const [confirmAction, setConfirmAction] = useState<"approve"|"reject"|null>(null);
  const [done,          setDone]          = useState<"approve"|"reject"|null>(null);

  function handleConfirm() {
    if (!confirmAction) return;
    onAction(approval.id, confirmAction);
    setDone(confirmAction);
    setConfirmAction(null);
  }

  function handleMoreInfo() {
    onAction(approval.id, "more-info");
  }

  return (
    <div style={{ display:"flex", flexDirection:"column", height:"100%", background:"#FEFBFF", overflowY:"auto" }}>

      {/* Breadcrumb nav */}
      <div style={{
        padding:"13px 28px", borderBottom:`1px solid ${C.border}`,
        display:"flex", alignItems:"center", gap:10, flexShrink:0,
      }}>
        <button
          onClick={onBack}
          style={{
            background:"none", border:"none", cursor:"pointer",
            display:"flex", alignItems:"center", gap:4,
            color:C.primary, fontSize:12, fontWeight:600, fontFamily:"inherit",
          }}
        >
          <MatIcon name="arrow_back" size={16} color={C.primary} />
          Back
        </button>
        <span style={{ width:1, height:14, background:C.borderFaint }} />
        <span style={{ fontSize:12, color:C.muted }}>Approvals</span>
        <MatIcon name="chevron_right" size={14} color={C.muted} />
        <span style={{ fontSize:12, color:C.text, fontWeight:500 }}>{approval.type}</span>
        {approval.priority === "Urgent" && (
          <span style={{
            fontSize:9, fontWeight:700, color:"#B03B2E",
            background:"#FDECEA", padding:"2px 7px", borderRadius:99,
            textTransform:"uppercase", letterSpacing:"0.06em",
          }}>
            Urgent
          </span>
        )}
      </div>

      {/* Body */}
      <div style={{ flex:1, padding:"24px 28px", display:"flex", gap:22, minHeight:0 }}>

        {/* Left: main content */}
        <div style={{ flex:1, display:"flex", flexDirection:"column", gap:14, minWidth:0 }}>

          {/* Employee + request summary */}
          <div style={{ background:"#fff", border:`1px solid ${C.border}`, borderRadius:12, padding:"18px 20px" }}>
            <div style={{ display:"flex", alignItems:"center", gap:12, marginBottom:18 }}>
              <div style={{
                width:44, height:44, borderRadius:"50%",
                background:C.primary, flexShrink:0,
                display:"flex", alignItems:"center", justifyContent:"center",
                color:"#fff", fontSize:14, fontWeight:700,
              }}>
                {approval.employee.split(" ").map(w => w[0]).join("").slice(0,2)}
              </div>
              <div>
                <div style={{ fontSize:15, fontWeight:700, color:C.text, letterSpacing:"-0.2px" }}>{approval.employee}</div>
                <div style={{ fontSize:12, color:C.muted, marginTop:1 }}>{approval.role} • {approval.department}</div>
              </div>
            </div>
            <div style={{ fontSize:13, fontWeight:700, color:C.text, marginBottom:14 }}>{approval.type}</div>
            <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:"12px 24px" }}>
              {approval.dates        && <DetailField label="Dates"             value={approval.dates}        />}
              {approval.duration     && <DetailField label="Duration"          value={approval.duration}     />}
              {approval.reason       && <DetailField label="Reason"            value={approval.reason}       />}
              {approval.leaveBalance && <DetailField label="Available Balance" value={approval.leaveBalance} />}
              {approval.teamAvail    && <DetailField label="Team Availability" value={approval.teamAvail}    />}
              {approval.prevLeave    && <DetailField label="Previous Leave"    value={approval.prevLeave}    />}
              {!approval.dates && !approval.reason && <DetailField label="Summary" value={approval.summary} />}
            </div>
          </div>

          {/* Approval flow */}
          <div style={{ background:"#fff", border:`1px solid ${C.border}`, borderRadius:12, padding:"16px 20px" }}>
            <div style={{ fontSize:10, fontWeight:700, color:C.muted, textTransform:"uppercase", letterSpacing:"0.07em", marginBottom:14 }}>
              Approval Flow
            </div>
            <div style={{ display:"flex", flexDirection:"column" }}>
              {approval.flow.map((step, i) => (
                <div key={i} style={{ display:"flex", gap:12, position:"relative" }}>
                  {i < approval.flow.length - 1 && (
                    <div style={{
                      position:"absolute", left:9, top:22, width:1, height:"calc(100% - 10px)",
                      background: step.done ? C.primary : C.borderFaint,
                    }} />
                  )}
                  <div style={{
                    width:20, height:20, borderRadius:"50%", flexShrink:0, marginTop:1, zIndex:1,
                    background: step.done ? C.primary : step.pending ? C.selectedBg : "#F0E8F8",
                    border: step.pending ? `2px solid ${C.primary}` : step.done ? "none" : `2px solid ${C.borderFaint}`,
                    display:"flex", alignItems:"center", justifyContent:"center",
                  }}>
                    {step.done    && <MatIcon name="check" size={12} color="#fff" />}
                    {step.pending && <div style={{ width:6, height:6, borderRadius:"50%", background:C.primary }} />}
                  </div>
                  <div style={{ paddingBottom: i < approval.flow.length - 1 ? 16 : 0 }}>
                    <div style={{
                      fontSize:12,
                      fontWeight: step.pending ? 600 : 450,
                      color: step.pending ? C.primary : step.done ? C.text : C.muted,
                    }}>
                      {step.label}
                    </div>
                    {step.pending && <div style={{ fontSize:11, color:C.muted, marginTop:2 }}>Awaiting your review</div>}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Activity history */}
          <div style={{ background:"#fff", border:`1px solid ${C.border}`, borderRadius:12, padding:"16px 20px" }}>
            <div style={{ fontSize:10, fontWeight:700, color:C.muted, textTransform:"uppercase", letterSpacing:"0.07em", marginBottom:12 }}>
              Activity
            </div>
            <div style={{ display:"flex", flexDirection:"column", gap:12 }}>
              {approval.history.map((h, i) => (
                <div key={i} style={{ display:"flex", gap:10, alignItems:"flex-start" }}>
                  <div style={{
                    width:7, height:7, borderRadius:"50%", marginTop:4, flexShrink:0,
                    background: i === 0 ? C.primary : C.borderFaint,
                  }} />
                  <div>
                    <span style={{ fontSize:12, color:C.text }}>{h.label}</span>
                    {h.actor && <span style={{ fontSize:11, color:C.muted }}> by {h.actor}</span>}
                    <div style={{ fontSize:10, color:"#B09DC0", marginTop:1 }}>{h.time}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right: decision panel */}
        <div style={{ width:220, flexShrink:0, display:"flex", flexDirection:"column", gap:12 }}>

          {done ? (
            // ── Success state ──────────────────────────────────────────────────
            <div style={{
              background: done === "approve" ? "#EAFAF2" : "#FDECEA",
              border:`1px solid ${done === "approve" ? "#8BDDB8" : "#F5B7B1"}`,
              borderRadius:12, padding:"20px 16px",
              display:"flex", flexDirection:"column", alignItems:"center", gap:8, textAlign:"center",
            }}>
              <div style={{
                width:40, height:40, borderRadius:"50%",
                background: done === "approve" ? "#1B7F4F" : "#B03B2E",
                display:"flex", alignItems:"center", justifyContent:"center",
              }}>
                <MatIcon name={done === "approve" ? "check" : "close"} size={20} color="#fff" />
              </div>
              <div style={{ fontSize:13, fontWeight:700, color: done === "approve" ? "#1B7F4F" : "#B03B2E" }}>
                {done === "approve" ? "Request Approved" : "Request Rejected"}
              </div>
              <div style={{ fontSize:11, color:C.muted }}>
                Decision recorded · {new Date().toLocaleTimeString([], { hour:"2-digit", minute:"2-digit" })}
              </div>
              <button
                onClick={onBack}
                style={{
                  marginTop:4, background:"none", border:`1px solid ${C.border}`,
                  borderRadius:8, padding:"7px 16px", cursor:"pointer",
                  fontSize:12, fontWeight:500, color:C.text, fontFamily:"inherit",
                }}
              >
                Back to list
              </button>
            </div>

          ) : confirmAction ? (
            // ── Confirmation state ─────────────────────────────────────────────
            <div style={{ background:"#fff", border:`1px solid ${C.border}`, borderRadius:12, padding:"18px 16px" }}>
              <div style={{ fontSize:13, fontWeight:700, color:C.text, marginBottom:6 }}>
                Confirm {confirmAction === "approve" ? "Approval" : "Rejection"}
              </div>
              <div style={{ fontSize:12, color:C.muted, marginBottom:16, lineHeight:1.55 }}>
                {confirmAction === "approve"
                  ? `Approve ${approval.type} for ${approval.employee}?`
                  : `Reject ${approval.type} for ${approval.employee}? This action will be recorded.`}
              </div>
              <div style={{ display:"flex", flexDirection:"column", gap:8 }}>
                <button
                  onClick={handleConfirm}
                  style={{
                    width:"100%", padding:"9px 0", border:"none", borderRadius:8, cursor:"pointer",
                    background: confirmAction === "approve" ? "#1B7F4F" : "#B03B2E",
                    color:"#fff", fontSize:13, fontWeight:600, fontFamily:"inherit",
                  }}
                >
                  {confirmAction === "approve" ? "Yes, Approve" : "Yes, Reject"}
                </button>
                <button
                  onClick={() => setConfirmAction(null)}
                  style={{
                    width:"100%", padding:"9px 0", border:`1px solid ${C.border}`, borderRadius:8, cursor:"pointer",
                    background:"transparent", color:C.text, fontSize:12, fontWeight:500, fontFamily:"inherit",
                  }}
                >
                  Cancel
                </button>
              </div>
            </div>

          ) : (
            // ── Decision actions ───────────────────────────────────────────────
            <>
              <div style={{ background:"#fff", border:`1px solid ${C.border}`, borderRadius:12, padding:"16px" }}>
                <div style={{ fontSize:10, fontWeight:700, color:C.muted, textTransform:"uppercase", letterSpacing:"0.06em", marginBottom:12 }}>
                  Your Decision
                </div>
                <div style={{ display:"flex", flexDirection:"column", gap:8 }}>
                  <button
                    onClick={() => setConfirmAction("approve")}
                    style={{
                      width:"100%", padding:"9px 0",
                      background:"#1B7F4F", border:"none", borderRadius:8, cursor:"pointer",
                      color:"#fff", fontSize:13, fontWeight:600, fontFamily:"inherit",
                      display:"flex", alignItems:"center", justifyContent:"center", gap:6,
                    }}
                  >
                    <MatIcon name="check_circle" size={16} color="#fff" />
                    Approve
                  </button>
                  <button
                    onClick={handleMoreInfo}
                    style={{
                      width:"100%", padding:"9px 0",
                      background:"transparent", border:`1px solid ${C.border}`, borderRadius:8, cursor:"pointer",
                      color:C.text, fontSize:12, fontWeight:500, fontFamily:"inherit",
                      display:"flex", alignItems:"center", justifyContent:"center", gap:6,
                    }}
                  >
                    <MatIcon name="help_outline" size={15} color={C.muted} />
                    Request More Info
                  </button>
                  <button
                    onClick={() => setConfirmAction("reject")}
                    style={{
                      width:"100%", padding:"9px 0",
                      background:"transparent", border:`1px solid #F5B7B1`, borderRadius:8, cursor:"pointer",
                      color:"#B03B2E", fontSize:12, fontWeight:500, fontFamily:"inherit",
                      display:"flex", alignItems:"center", justifyContent:"center", gap:6,
                    }}
                  >
                    <MatIcon name="cancel" size={15} color="#B03B2E" />
                    Reject
                  </button>
                </div>
              </div>

              <div style={{ background:"#fff", border:`1px solid ${C.border}`, borderRadius:12, padding:"14px 16px" }}>
                <div style={{ fontSize:10, fontWeight:700, color:C.muted, textTransform:"uppercase", letterSpacing:"0.06em", marginBottom:10 }}>
                  Request Info
                </div>
                <div style={{ display:"flex", flexDirection:"column", gap:7 }}>
                  <MiniField label="Submitted" value={approval.submitted} />
                  <MiniField label="Priority"  value={approval.priority}  />
                  <MiniField label="Status"    value={approval.status}    />
                  <MiniField label="Dept."     value={approval.department} />
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

// ─── CALENDAR SYSTEM ─────────────────────────────────────────────────────────

type CalEvent = {
  id:           string;
  title:        string;
  time:         string;
  endTime?:     string;
  person?:      string;
  location?:    string;
  module:       string;
  moduleIcon:   string;
  category:     string;
  date:         string;   // calendar day number as string, e.g. "9"
  description?: string;
  participants?: string[];
};

const CAT_COLORS: Record<string, string> = {
  "Interview":         C.primary,
  "Onboarding":        "#1B7F4F",
  "HR Meeting":        "#7A6A8A",
  "Probation Review":  "#7A5A00",
  "Performance Review":"#7A5A00",
  "Training":          "#1B6B7F",
};

// Sep 2026 week: Mon 7 – Sun 13
const WEEK_DAYS = [
  { day:"Mon", date:7  }, { day:"Tue", date:8  }, { day:"Wed", date:9  },
  { day:"Thu", date:10 }, { day:"Fri", date:11 }, { day:"Sat", date:12 }, { day:"Sun", date:13 },
];

const INIT_EVENTS: CalEvent[] = [
  { id:"ce1", title:"Candidate Interview",    time:"09:30 AM", endTime:"10:30 AM", person:"Naveen Kumar • Backend Developer", module:"Recruitment", moduleIcon:"work",         category:"Interview",         date:"9",  description:"Technical screening for Backend Developer position.", participants:["HR Manager","Tech Lead"] },
  { id:"ce2", title:"New Joiner Onboarding",  time:"11:00 AM", endTime:"12:00 PM", person:"Priya S • Design",                 module:"Onboarding",  moduleIcon:"person_add",   category:"Onboarding",        date:"9",  description:"Orientation and documentation for new joiner." },
  { id:"ce3", title:"HR Review Meeting",      time:"02:00 PM", endTime:"03:00 PM", location:"Meeting Room 2",                 module:"HR Meetings", moduleIcon:"groups",       category:"HR Meeting",        date:"9",  participants:["HR Team","Department Heads"] },
  { id:"ce4", title:"Probation Review",       time:"04:30 PM", endTime:"05:00 PM", person:"Arun Kumar • Engineering",         module:"Employees",   moduleIcon:"groups",       category:"Probation Review",  date:"9",  description:"6-month probation review discussion." },
  { id:"ce5", title:"Performance Review",     time:"10:00 AM", endTime:"11:00 AM", person:"Divya M • Operations",             module:"Performance", moduleIcon:"trending_up",  category:"Performance Review",date:"10" },
  { id:"ce6", title:"Interview Feedback",     time:"03:00 PM", endTime:"03:30 PM", person:"Karthik R",                        module:"Recruitment", moduleIcon:"work",         category:"Interview",         date:"11" },
  { id:"ce7", title:"Training Session",       time:"10:00 AM", endTime:"12:00 PM", location:"Training Room",                  module:"Learning",    moduleIcon:"school",       category:"Training",          date:"12" },
];

// ── Compact event block in timeline ───────────────────────────────────────────

function CalEventBlock({ event, onClick }: { event: CalEvent; onClick: () => void }) {
  const [hov, setHov] = useState(false);
  const accent = CAT_COLORS[event.category] || C.muted;
  return (
    <div style={{ marginBottom:10 }}>
      <div style={{ fontSize:10, color:"var(--drawer-row-due, #94A3B8)", fontWeight:500, marginBottom:5, paddingLeft:2 }}>{event.time}</div>
      <div
        onClick={onClick}
        onMouseEnter={() => setHov(true)}
        onMouseLeave={() => setHov(false)}
        style={{
          display:"flex", alignItems:"flex-start", gap:10,
          padding:"10px 12px",
          background: hov ? "var(--drawer-row-hover, #FFF7ED)" : "var(--drawer-card-bg, #fff)",
          border:`1px solid var(--drawer-border-divider, ${C.borderFaint})`,
          borderLeft:`3px solid ${accent}`,
          borderRadius:"0 8px 8px 0",
          cursor:"pointer", transition:"background 0.12s",
        }}
      >
        <div style={{ flex:1 }}>
          <div style={{ fontSize:12, fontWeight:600, color:"var(--drawer-row-title, " + C.text + ")", marginBottom:2 }}>{event.title}</div>
          {event.person   && <div style={{ fontSize:11, color:"var(--drawer-row-secondary, " + C.muted + ")", marginBottom:1 }}>{event.person}</div>}
          {event.location && <div style={{ fontSize:11, color:"var(--drawer-row-secondary, " + C.muted + ")", marginBottom:1 }}>{event.location}</div>}
          <div style={{ fontSize:10, color:"var(--drawer-row-due, #94A3B8)", marginTop:3 }}>{event.endTime ? `${event.time} – ${event.endTime}` : event.time} · {event.module}</div>
        </div>
        <MatIcon name={event.moduleIcon} size={15} color={accent} />
      </div>
    </div>
  );
}

// ── Event detail view (replaces timeline within drawer) ────────────────────────

function EventDetailView({ event, onBack }: { event: CalEvent; onBack: () => void }) {
  const accent = CAT_COLORS[event.category] || C.muted;
  return (
    <div style={{ display:"flex", flexDirection:"column", height:"100%" }}>
      <div style={{ padding:"12px 16px", borderBottom:`1px solid #FED7AA`, display:"flex", alignItems:"center", gap:8, flexShrink:0 }}>
        <button onClick={onBack} style={{ background:"none", border:"none", cursor:"pointer", display:"flex", alignItems:"center", gap:4, color:"#F97316", fontSize:12, fontWeight:600, fontFamily:"inherit" }}>
          <MatIcon name="arrow_back" size={16} color="#F97316" />
          Back
        </button>
      </div>
      <div style={{ flex:1, overflowY:"auto", padding:"16px" }}>
        <div style={{ display:"flex", alignItems:"center", gap:10, marginBottom:16 }}>
          <div style={{
            width:36, height:36, borderRadius:10, flexShrink:0,
            background: "#FFEDD5", display:"flex", alignItems:"center", justifyContent:"center",
          }}>
            <MatIcon name={event.moduleIcon} size={18} color={accent} />
          </div>
          <div>
            <div style={{ fontSize:14, fontWeight:700, color:C.text, letterSpacing:"-0.2px" }}>{event.title}</div>
            <div style={{ fontSize:11, color:accent, fontWeight:600, marginTop:1 }}>{event.category}</div>
          </div>
        </div>

        <div style={{ display:"flex", flexDirection:"column", gap:10 }}>
          <EventDetailRow icon="calendar_today" label="Date"   value="Wed, 9 Sep 2026" />
          <EventDetailRow icon="schedule"       label="Time"   value={event.endTime ? `${event.time} – ${event.endTime}` : event.time} />
          {event.person   && <EventDetailRow icon="person"   label="Employee"  value={event.person}   />}
          {event.location && <EventDetailRow icon="location_on" label="Location" value={event.location} />}
          <EventDetailRow icon="category" label="Module" value={event.module} />
          {event.participants && event.participants.length > 0 && (
            <EventDetailRow icon="group" label="Participants" value={event.participants.join(", ")} />
          )}
          {event.description && (
            <div style={{ paddingTop:10, borderTop:`1px solid ${C.borderFaint}` }}>
              <div style={{ fontSize:10, fontWeight:600, color:C.muted, textTransform:"uppercase", letterSpacing:"0.06em", marginBottom:5 }}>Description</div>
              <div style={{ fontSize:12, color:C.text, lineHeight:1.6 }}>{event.description}</div>
            </div>
          )}
        </div>
      </div>

      <div style={{ flexShrink:0, borderTop:`1px solid #FED7AA`, padding:"12px 16px", display:"flex", gap:8 }}>
        <button style={{ ...taskSecondaryBtn, flex:1, display:"flex", alignItems:"center", justifyContent:"center", gap:5, borderColor:"#FED7AA", color:"#F97316" }}>
          <MatIcon name="edit" size={14} color="#F97316" />
          Edit
        </button>
        <button style={{ ...taskSecondaryBtn, flex:1, display:"flex", alignItems:"center", justifyContent:"center", gap:5, borderColor:"#FED7AA", color:"#F97316" }}>
          <MatIcon name="open_in_new" size={14} color="#F97316" />
          Open Record
        </button>
      </div>
    </div>
  );
}

function EventDetailRow({ icon, label, value }: { icon:string; label:string; value:string }) {
  return (
    <div style={{ display:"flex", alignItems:"flex-start", gap:10 }}>
      <MatIcon name={icon} size={15} color={C.muted} />
      <div>
        <div style={{ fontSize:10, fontWeight:600, color:C.muted, textTransform:"uppercase", letterSpacing:"0.06em" }}>{label}</div>
        <div style={{ fontSize:12, color:C.text, marginTop:1 }}>{value}</div>
      </div>
    </div>
  );
}

// ── Schedule Drawer ───────────────────────────────────────────────────────────

function ScheduleDrawer({ events, onClose, onViewAll, onCreateEvent }: {
  events: CalEvent[];
  onClose: () => void;
  onViewAll: () => void;
  onCreateEvent: () => void;
}) {
  const [selectedDate, setSelectedDate] = useState(9);
  const [weekOffset,   setWeekOffset]   = useState(0);
  const [viewEventId,  setViewEventId]  = useState<string | null>(null);

  const shiftedDays = WEEK_DAYS.map(d => ({ ...d, date: d.date + weekOffset * 7 }));
  const dayEvents   = weekOffset === 0 ? events.filter(e => e.date === String(selectedDate)) : [];
  const selEvent    = viewEventId ? events.find(e => e.id === viewEventId) : null;

  // Display label for header
  const selDay = shiftedDays.find(d => d.date === selectedDate + weekOffset * 7) || shiftedDays[2];
  const headerDate = weekOffset === 0
    ? `${selDay.day}, ${selectedDate} Sep`
    : weekOffset < 0 ? "Week of Aug 31" : "Week of Sep 14";

  if (selEvent) {
    return (
      <div style={{ position:"absolute", inset:0, background:"#FEFBFF" }}>
        <EventDetailView event={selEvent} onBack={() => setViewEventId(null)} />
      </div>
    );
  }

  return (
    <div style={{ position:"absolute", inset:0, display:"flex", flexDirection:"column", background:"var(--drawer-bg, #FEFBFF)" }}>

      {/* Header — Orange identity in Light, BEZENT Dark in Dark */}
      <div style={{ padding:"12px 16px", borderBottom:`1px solid var(--drawer-border-divider, #FED7AA)`, background:"var(--drawer-header-bg, transparent)", flexShrink:0 }}>
        <div style={{ display:"flex", alignItems:"center", gap:4, marginBottom:8 }}>
          <div style={{
            width:22, height:22, borderRadius:6,
            background:"var(--drawer-icon-container-bg, #FFEDD5)",
            border:"1px solid var(--drawer-icon-container-border, transparent)",
            display:"flex", alignItems:"center", justifyContent:"center",
            marginRight:4, flexShrink:0,
          }}>
            <MatIcon name="calendar_month" size={14} color="var(--drawer-icon-container-color, #F97316)" filled />
          </div>
          <span style={{ flex:1, fontSize:14, fontWeight:700, color:"var(--drawer-title, " + C.text + ")", letterSpacing:"-0.2px" }}>Schedule</span>
          <button
            onClick={() => { setWeekOffset(0); setSelectedDate(9); }}
            style={{
              height:26, padding:"0 9px", fontSize:11, fontWeight:600,
              color:"var(--drawer-tab-active-text, #F97316)", background:"var(--drawer-card-bg, #FFF7ED)", border:`1px solid var(--drawer-border, #FED7AA)`,
              borderRadius:6, cursor:"pointer", fontFamily:"inherit",
              transition:"background 0.12s",
            }}
          >
            Today
          </button>
          <button
            onClick={() => setWeekOffset(v => v - 1)}
            style={{ width:26, height:26, border:`1px solid var(--drawer-border, #FED7AA)`, borderRadius:6, background:"transparent", cursor:"pointer", display:"flex", alignItems:"center", justifyContent:"center" }}
            onMouseEnter={e => (e.currentTarget.style.background = "var(--drawer-header-hover, #FFF7ED)")}
            onMouseLeave={e => (e.currentTarget.style.background = "transparent")}
          >
            <MatIcon name="chevron_left" size={16} color="var(--drawer-header-icon, #F97316)" />
          </button>
          <button
            onClick={() => setWeekOffset(v => v + 1)}
            style={{ width:26, height:26, border:`1px solid var(--drawer-border, #FED7AA)`, borderRadius:6, background:"transparent", cursor:"pointer", display:"flex", alignItems:"center", justifyContent:"center" }}
            onMouseEnter={e => (e.currentTarget.style.background = "var(--drawer-header-hover, #FFF7ED)")}
            onMouseLeave={e => (e.currentTarget.style.background = "transparent")}
          >
            <MatIcon name="chevron_right" size={16} color="var(--drawer-header-icon, #F97316)" />
          </button>
          <DrawerIconBtn icon="close" label="Close" onClick={onClose} hoverBg="#FFF7ED" activeBg="#FFEDD5" activeColor="#F97316" />
        </div>
        <div style={{ fontSize:12, color:"var(--drawer-desc, " + C.muted + ")" }}>{headerDate}</div>
      </div>

      {/* Week strip — Orange active state in Light, Purple in Dark */}
      <div style={{
        display:"flex", padding:"10px 12px", gap:4,
        borderBottom:`1px solid var(--drawer-border-divider, #FED7AA)`,
        background:"var(--drawer-header-bg, transparent)",
        flexShrink:0,
      }}>
        {shiftedDays.map(d => {
          const isSelected = d.date === (weekOffset === 0 ? selectedDate : -999);
          return (
            <button
              key={d.day}
              onClick={() => { setSelectedDate(d.date); }}
              style={{
                flex:1, display:"flex", flexDirection:"column", alignItems:"center", gap:2,
                padding:"6px 0", borderRadius:8,
                border: isSelected ? `1px solid var(--drawer-tab-active-indicator, #FED7AA)` : "1px solid transparent",
                cursor:"pointer",
                background: isSelected ? "var(--drawer-badge-bg, #FFEDD5)" : "transparent",
                transition:"background 0.12s",
              }}
              onMouseEnter={e => { if (!isSelected) e.currentTarget.style.background = "var(--drawer-tab-hover, #FFF7ED)"; }}
              onMouseLeave={e => { if (!isSelected) e.currentTarget.style.background = "transparent"; }}
            >
              <span style={{ fontSize:9, fontWeight:600, color: isSelected ? C.text : "var(--drawer-desc, " + C.muted + ")", textTransform:"uppercase", letterSpacing:"0.04em" }}>
                {d.day}
              </span>
              <span style={{ fontSize:14, fontWeight: isSelected ? 700 : 450, color: "var(--drawer-row-title, " + C.text + ")" }}>
                {Math.abs(d.date) <= 30 && d.date > 0 ? d.date : "—"}
              </span>
            </button>
          );
        })}
      </div>

      {/* Summary + list */}
      <div style={{ flex:1, overflowY:"auto", padding:"12px 16px" }}>
        {dayEvents.length > 0 ? (
          <>
            <div style={{ fontSize:11, color:"var(--drawer-desc, " + C.muted + ")", marginBottom:12 }}>
              {dayEvents.length} event{dayEvents.length > 1 ? "s" : ""} scheduled
            </div>
            {dayEvents.map(e => (
              <CalEventBlock key={e.id} event={e} onClick={() => setViewEventId(e.id)} />
            ))}
          </>
        ) : (
          <EmptyState
            type="calendar"
            size="compact"
            title="No upcoming events"
            description="Your schedule is clear for this date."
            actionLabel="Schedule Event"
            onAction={onCreateEvent}
          />
        )}
      </div>

      {/* Footer — Orange controls in Light, #C875FF in Dark */}
      <div style={{ flexShrink:0, borderTop:`1px solid var(--drawer-footer-border, #FED7AA)`, background:"var(--drawer-footer-bg, transparent)", padding:"10px 16px", display:"flex", alignItems:"center", justifyContent:"space-between" }}>
        <button
          onClick={onCreateEvent}
          style={{
            background:"var(--drawer-card-bg, #FFF7ED)", border:`1px solid var(--drawer-border, #FED7AA)`, borderRadius:7, padding:"5px 10px",
            cursor:"pointer", fontSize:11, fontWeight:600, color:"var(--drawer-tab-active-text, #F97316)", fontFamily:"inherit",
            display:"flex", alignItems:"center", gap:5,
          }}
        >
          <MatIcon name="add" size={14} color="var(--drawer-tab-active-text, #F97316)" />
          Event
        </button>
        <button onClick={onViewAll} style={{ background:"none", border:"none", cursor:"pointer", fontSize:12, fontWeight:600, color:"var(--drawer-footer-action-text, #F97316)", fontFamily:"inherit" }}>
          Open Full Calendar →
        </button>
      </div>
    </div>
  );
}

// ── Create Event overlay ──────────────────────────────────────────────────────

const EVENT_TYPES = ["Interview","Employee Joining","Onboarding","Training","HR Meeting","Probation Review","Performance Review","Employee Exit","HR Deadline","Company Event"];

function CreateEventPanel({ onClose, onCreate }: {
  onClose: () => void;
  onCreate: (e: CalEvent) => void;
}) {
  const [title,        setTitle]        = useState("");
  const [type,         setType]         = useState("HR Meeting");
  const [date,         setDate]         = useState("");
  const [startTime,    setStartTime]    = useState("");
  const [endTime,      setEndTime]      = useState("");
  const [person,       setPerson]       = useState("");
  const [location,     setLocation]     = useState("");
  const [description,  setDescription]  = useState("");

  function handleCreate() {
    if (!title.trim()) return;
    onCreate({
      id:`ev${Date.now()}`, title:title.trim(), time:startTime||"09:00 AM",
      endTime:endTime||undefined, person:person||undefined, location:location||undefined,
      module:type, moduleIcon:"event", category:type,
      date: date ? new Date(date).getDate().toString() : "9",
      description:description||undefined,
    });
    onClose();
  }

  return (
    <div style={{ width:440, background:"#fff", borderRadius:14, border:`1px solid ${C.border}`, boxShadow:"0 8px 40px rgba(45,6,77,0.16)", overflow:"hidden" }}>
      <div style={{ display:"flex", alignItems:"center", padding:"14px 18px", borderBottom:`1px solid ${C.border}` }}>
        <span style={{ flex:1, fontSize:14, fontWeight:700, color:C.text }}>Create Event</span>
        <button onClick={onClose} style={{ background:"none", border:"none", cursor:"pointer", display:"flex" }}>
          <MatIcon name="close" size={18} color={C.muted} />
        </button>
      </div>

      <div style={{ padding:"16px 18px", display:"flex", flexDirection:"column", gap:12, maxHeight:440, overflowY:"auto" }}>
        <TaskFormField label="Event Title *">
          <input value={title} onChange={e => setTitle(e.target.value)} placeholder="Enter event title" style={taskInputStyle} />
        </TaskFormField>

        <TaskFormField label="Event Type">
          <select value={type} onChange={e => setType(e.target.value)} style={taskInputStyle}>
            {EVENT_TYPES.map(t => <option key={t} value={t}>{t}</option>)}
          </select>
        </TaskFormField>

        <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr 1fr", gap:10 }}>
          <TaskFormField label="Date">
            <input type="date" value={date} onChange={e => setDate(e.target.value)} style={taskInputStyle} />
          </TaskFormField>
          <TaskFormField label="Start Time">
            <input type="time" value={startTime} onChange={e => setStartTime(e.target.value)} style={taskInputStyle} />
          </TaskFormField>
          <TaskFormField label="End Time">
            <input type="time" value={endTime} onChange={e => setEndTime(e.target.value)} style={taskInputStyle} />
          </TaskFormField>
        </div>

        <TaskFormField label="Employee / Candidate">
          <input value={person} onChange={e => setPerson(e.target.value)} placeholder="e.g. Naveen Kumar" style={taskInputStyle} />
        </TaskFormField>

        <TaskFormField label="Location / Meeting Link">
          <input value={location} onChange={e => setLocation(e.target.value)} placeholder="Meeting Room or URL" style={taskInputStyle} />
        </TaskFormField>

        <TaskFormField label="Description">
          <textarea value={description} onChange={e => setDescription(e.target.value)} placeholder="Add details..." rows={2} style={{ ...taskInputStyle, resize:"none" }} />
        </TaskFormField>
      </div>

      <div style={{ display:"flex", justifyContent:"flex-end", gap:8, padding:"12px 18px", borderTop:`1px solid ${C.border}` }}>
        <button onClick={onClose} style={taskSecondaryBtn}>Cancel</button>
        <button onClick={handleCreate} disabled={!title.trim()} style={{ ...taskPrimaryBtn, opacity:title.trim()?1:0.45, cursor:title.trim()?"pointer":"not-allowed" }}>
          Create Event
        </button>
      </div>
    </div>
  );
}

// ── Mini calendar (September 2026) ────────────────────────────────────────────
// Sep 1 = Tuesday → Mon-start: 1 leading empty cell

const SEP_GRID = [null,1,2,3,4,5,6, 7,8,9,10,11,12,13, 14,15,16,17,18,19,20, 21,22,23,24,25,26,27, 28,29,30];

function MiniCalendar({ selectedDate, onSelect }: { selectedDate: number; onSelect: (d: number) => void }) {
  return (
    <div style={{ background:"#fff", border:`1px solid ${C.border}`, borderRadius:10, padding:"12px", userSelect:"none" }}>
      <div style={{ fontSize:11, fontWeight:700, color:C.text, textAlign:"center", marginBottom:8 }}>September 2026</div>
      <div style={{ display:"grid", gridTemplateColumns:"repeat(7,1fr)", gap:2, marginBottom:4 }}>
        {["M","T","W","T","F","S","S"].map((d, i) => (
          <div key={i} style={{ fontSize:9, fontWeight:600, color:C.muted, textAlign:"center", padding:"2px 0" }}>{d}</div>
        ))}
      </div>
      <div style={{ display:"grid", gridTemplateColumns:"repeat(7,1fr)", gap:2 }}>
        {SEP_GRID.map((d, i) => (
          <button
            key={i}
            disabled={!d}
            onClick={() => d && onSelect(d)}
            style={{
              width:"100%", aspectRatio:"1", border:"none", borderRadius:6, cursor: d ? "pointer" : "default",
              background: d === selectedDate ? C.primary : d === 9 && selectedDate !== 9 ? C.selectedBg : "transparent",
              color: d === selectedDate ? "#fff" : d ? C.text : "transparent",
              fontSize:11, fontWeight: d === selectedDate ? 700 : 400,
              transition:"background 0.12s",
            }}
          >
            {d || ""}
          </button>
        ))}
      </div>
    </div>
  );
}

// ── Full Schedule Page ─────────────────────────────────────────────────────────

function SchedulePage({ events, onBack, onCreateEvent }: {
  events: CalEvent[];
  onBack: () => void;
  onCreateEvent: () => void;
}) {
  const [selectedDate, setSelectedDate] = useState(9);
  const [viewMode,     setViewMode]     = useState<"day"|"week"|"month">("week");

  const weekDays  = WEEK_DAYS;
  const dayEvents = events.filter(e => e.date === String(selectedDate));

  return (
    <div style={{ display:"flex", flexDirection:"column", height:"100%", background:"#FEFBFF" }}>

      {/* Header */}
      <div style={{ padding:"18px 28px 14px", borderBottom:`1px solid ${C.border}`, flexShrink:0 }}>
        <div style={{ display:"flex", alignItems:"flex-start", gap:10, marginBottom:12 }}>
          <button onClick={onBack} style={{ background:"none", border:"none", cursor:"pointer", display:"flex", alignItems:"center", gap:4, color:C.primary, fontSize:12, fontWeight:600, fontFamily:"inherit", marginTop:3 }}>
            <MatIcon name="arrow_back" size={16} color={C.primary} />
            Back
          </button>
          <div>
            <div style={{ fontSize:17, fontWeight:700, color:C.text, letterSpacing:"-0.3px" }}>Schedule</div>
            <div style={{ fontSize:12, color:C.muted, marginTop:2 }}>Manage HR events, interviews, meetings and important dates.</div>
          </div>
          <div style={{ marginLeft:"auto", display:"flex", gap:6, alignItems:"center" }}>
            <button onClick={onCreateEvent} style={{ ...taskPrimaryBtn, display:"flex", alignItems:"center", gap:5 }}>
              <MatIcon name="add" size={15} color="#fff" />
              Create Event
            </button>
          </div>
        </div>

        <div style={{ display:"flex", alignItems:"center", gap:8 }}>
          <button style={{ ...taskSecondaryBtn, height:28, padding:"0 10px", fontSize:11 }} onClick={() => setSelectedDate(9)}>Today</button>
          <button style={{ width:28, height:28, border:`1px solid ${C.border}`, borderRadius:6, background:"transparent", cursor:"pointer", display:"flex", alignItems:"center", justifyContent:"center" }}>
            <MatIcon name="chevron_left" size={16} color={C.text} />
          </button>
          <button style={{ width:28, height:28, border:`1px solid ${C.border}`, borderRadius:6, background:"transparent", cursor:"pointer", display:"flex", alignItems:"center", justifyContent:"center" }}>
            <MatIcon name="chevron_right" size={16} color={C.text} />
          </button>
          <span style={{ fontSize:13, fontWeight:600, color:C.text }}>Sep 7 – Sep 13, 2026</span>
          <div style={{ marginLeft:"auto", display:"flex", border:`1px solid ${C.border}`, borderRadius:7, overflow:"hidden" }}>
            {(["day","week","month"] as const).map(v => (
              <button
                key={v}
                onClick={() => setViewMode(v)}
                style={{
                  padding:"5px 12px", border:"none", cursor:"pointer", fontFamily:"inherit",
                  fontSize:11, fontWeight:500,
                  background: viewMode === v ? C.primary : "transparent",
                  color: viewMode === v ? "#fff" : C.text,
                  textTransform:"capitalize",
                  transition:"background 0.12s",
                }}
              >
                {v}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Body: mini cal sidebar + main area */}
      <div style={{ flex:1, display:"flex", overflow:"hidden" }}>

        {/* Sidebar */}
        <div style={{ width:220, flexShrink:0, padding:"16px 16px", borderRight:`1px solid ${C.border}`, overflowY:"auto", display:"flex", flexDirection:"column", gap:14 }}>
          <MiniCalendar selectedDate={selectedDate} onSelect={setSelectedDate} />

          {/* Event type filter */}
          <div>
            <div style={{ fontSize:10, fontWeight:700, color:C.muted, textTransform:"uppercase", letterSpacing:"0.07em", marginBottom:8 }}>Event Types</div>
            <div style={{ display:"flex", flexDirection:"column", gap:4 }}>
              {["Interviews","Onboarding","HR Meetings","Probation Reviews","Performance Reviews","Training"].map(t => (
                <label key={t} style={{ display:"flex", alignItems:"center", gap:7, cursor:"pointer", fontSize:12, color:C.text }}>
                  <input type="checkbox" defaultChecked style={{ accentColor:C.primary }} />
                  <span style={{ fontSize:11 }}>{t}</span>
                </label>
              ))}
            </div>
          </div>
        </div>

        {/* Weekly grid */}
        <div style={{ flex:1, overflowX:"auto", overflowY:"auto" }}>
          <div style={{ minWidth:600 }}>
            {/* Day headers */}
            <div style={{ display:"flex", borderBottom:`1px solid ${C.border}`, position:"sticky", top:0, background:"#F9F3FF", zIndex:2 }}>
              {weekDays.map(d => (
                <div
                  key={d.day}
                  onClick={() => setSelectedDate(d.date)}
                  style={{
                    flex:1, padding:"10px 12px", borderRight:`1px solid ${C.borderFaint}`,
                    cursor:"pointer",
                    background: d.date === selectedDate ? C.selectedBg : "transparent",
                    transition:"background 0.12s",
                  }}
                >
                  <div style={{ fontSize:10, fontWeight:600, color: d.date === selectedDate ? C.text : C.muted, textTransform:"uppercase", letterSpacing:"0.06em" }}>{d.day}</div>
                  <div style={{ fontSize:15, fontWeight: d.date === selectedDate ? 700 : 400, color: C.text }}>{d.date}</div>
                </div>
              ))}
            </div>

            {/* Events per day */}
            <div style={{ display:"flex", alignItems:"flex-start", minHeight:400, padding:"10px 0" }}>
              {weekDays.map(d => {
                const dEvents = events.filter(e => e.date === String(d.date));
                return (
                  <div key={d.day} style={{ flex:1, padding:"0 8px", borderRight:`1px solid ${C.borderFaint}` }}>
                    {dEvents.map(ev => {
                      const accent = CAT_COLORS[ev.category] || C.muted;
                      return (
                        <div key={ev.id} style={{
                          marginBottom:6, padding:"8px 10px",
                          background: "var(--bg-surface, #fff)", border:`1px solid ${C.borderFaint}`, borderLeft:`3px solid ${accent}`,
                          borderRadius:"0 7px 7px 0", cursor:"pointer",
                        }}>
                          <div style={{ fontSize:11, fontWeight:600, color:C.text, lineHeight:1.3 }}>{ev.title}</div>
                          <div style={{ fontSize:10, color:C.muted, marginTop:2 }}>{ev.time}</div>
                          {ev.person && <div style={{ fontSize:10, color:C.muted, marginTop:1, overflow:"hidden", textOverflow:"ellipsis", whiteSpace:"nowrap" }}>{ev.person}</div>}
                        </div>
                      );
                    })}
                    {dEvents.length === 0 && (
                      <div style={{ height:40 }} />
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── NOTES SYSTEM ─────────────────────────────────────────────────────────────

type Note = {
  id:         string;
  title:      string;
  content:    string;
  updatedAt:  string;
  pinned:     boolean;
  relatedTo?: string;
};

const INIT_NOTES: Note[] = [
  { id:"nt1", title:"Candidate Interview Notes", content:"Strong React knowledge. Need to verify system design experience. Follow up on previous role at TCS.", updatedAt:"Today • 10:45 AM", pinned:true,  relatedTo:"Naveen Kumar"  },
  { id:"nt2", title:"Onboarding Follow-up",      content:"Ask Priya to submit address proof. Documents due by 12 Sep.",                                          updatedAt:"Today • 9:30 AM",  pinned:false                   },
  { id:"nt3", title:"Training Ideas",             content:"Plan advanced Excel training for HR team. Consider external facilitator for better impact.",           updatedAt:"Yesterday",        pinned:false                   },
  { id:"nt4", title:"Probation Discussion",       content:"Follow up with Arun's reporting manager. Check KPI progress and confirm review timeline.",             updatedAt:"8 Sep",            pinned:false, relatedTo:"Arun Kumar" },
];

// ── Note card in list ─────────────────────────────────────────────────────────

function NoteCard({ note, onClick, onPin, onDelete }: {
  note: Note; onClick: () => void; onPin: () => void; onDelete: () => void;
}) {
  const [hov,      setHov]      = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  return (
    <div
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => { setHov(false); setMenuOpen(false); }}
      style={{
        padding:"10px 12px",
        background: hov ? "var(--drawer-row-hover, #EEF2FF)" : "var(--drawer-card-bg, #fff)",
        border: hov ? `1px solid var(--drawer-border, #C7D2FE)` : `1px solid var(--drawer-border-divider, ${C.borderFaint})`,
        borderRadius:10,
        cursor:"pointer", transition:"background 0.12s, border-color 0.12s",
        position:"relative",
      }}
      onClick={onClick}
    >
      <div style={{ display:"flex", alignItems:"flex-start", gap:6, marginBottom:4 }}>
        <span style={{ flex:1, fontSize:12, fontWeight:600, color:"var(--drawer-row-title, " + C.text + ")", lineHeight:1.3 }}>{note.title}</span>
        <div style={{ display:"flex", gap:2 }} onClick={e => e.stopPropagation()}>
          {note.pinned && <MatIcon name="push_pin" size={14} color="var(--drawer-tab-active-text, #4F46E5)" filled />}
          <button
            onClick={e => { e.stopPropagation(); setMenuOpen(v => !v); }}
            style={{ background:"none", border:"none", cursor:"pointer", display:"flex", borderRadius:4, padding:2 }}
          >
            <MatIcon name="more_horiz" size={14} color={"var(--drawer-desc, " + C.muted + ")"} />
          </button>
        </div>
      </div>
      <div style={{ fontSize:11, color:"var(--drawer-row-secondary, " + C.muted + ")", lineHeight:1.5, marginBottom:5, display:"-webkit-box", WebkitLineClamp:2, WebkitBoxOrient:"vertical", overflow:"hidden" }}>
        {note.content}
      </div>
      <div style={{ display:"flex", alignItems:"center", gap:6 }}>
        <span style={{ fontSize:10, color:"var(--drawer-row-due, #94A3B8)" }}>{note.updatedAt}</span>
        {note.relatedTo && (
          <>
            <span style={{ width:2, height:2, borderRadius:"50%", background:"#C7D2FE" }} />
            <span style={{ fontSize:10, color:C.muted }}>{note.relatedTo}</span>
          </>
        )}
      </div>

      {menuOpen && (
        <div style={{
          position:"absolute", top:36, right:8, zIndex:50,
          background:"#fff", border:`1px solid ${C.border}`, borderRadius:8,
          boxShadow:"0 4px 16px rgba(45,6,77,0.12)", padding:"4px 0", minWidth:160,
        }}>
          {[
            { label: note.pinned ? "Unpin" : "Pin", icon:"push_pin",     action: onPin   },
            { label: "Delete",                       icon:"delete_outline", action: onDelete},
          ].map(item => (
            <button
              key={item.label}
              onClick={e => { e.stopPropagation(); item.action(); setMenuOpen(false); }}
              style={{ width:"100%", display:"flex", alignItems:"center", gap:8, padding:"7px 12px", background:"none", border:"none", cursor:"pointer", fontSize:12, color: item.label === "Delete" ? "#B03B2E" : C.text, fontFamily:"inherit", textAlign:"left" }}
            >
              <MatIcon name={item.icon} size={14} color={item.label === "Delete" ? "#B03B2E" : C.muted} />
              {item.label}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

// ── Convert to Task inline form ───────────────────────────────────────────────

function ConvertToTaskForm({ note, onConvert, onCancel }: {
  note: Note;
  onConvert: (data: { title:string; relatedTo:string; module:string; priority:"High"|"Medium"|"Low"; due:string; dueTime:string }) => void;
  onCancel: () => void;
}) {
  const [title,    setTitle]    = useState(note.title);
  const [priority, setPriority] = useState<"High"|"Medium"|"Low">("Medium");
  const [due,      setDue]      = useState("");

  return (
    <div style={{ background:"#EEF2FF", border:`1px solid #C7D2FE`, borderRadius:10, padding:"12px", display:"flex", flexDirection:"column", gap:10 }}>
      <div style={{ fontSize:11, fontWeight:700, color:C.text }}>Convert to Task</div>
      <input
        value={title}
        onChange={e => setTitle(e.target.value)}
        placeholder="Task title"
        style={taskInputStyle}
      />
      <div style={{ display:"flex", gap:8 }}>
        <div style={{ flex:1 }}>
          <div style={{ fontSize:10, fontWeight:600, color:C.muted, marginBottom:3 }}>Priority</div>
          <select
            value={priority}
            onChange={e => setPriority(e.target.value as "High"|"Medium"|"Low")}
            style={{ ...taskInputStyle, padding:"5px 8px" }}
          >
            <option value="High">High</option>
            <option value="Medium">Medium</option>
            <option value="Low">Low</option>
          </select>
        </div>
        <div style={{ flex:1 }}>
          <div style={{ fontSize:10, fontWeight:600, color:C.muted, marginBottom:3 }}>Due</div>
          <input
            value={due}
            onChange={e => setDue(e.target.value)}
            placeholder="e.g. Today, Tomorrow"
            style={taskInputStyle}
          />
        </div>
      </div>
      <div style={{ display:"flex", gap:6, justifyContent:"flex-end" }}>
        <button onClick={onCancel} style={{ ...taskSecondaryBtn, padding:"4px 10px", fontSize:11 }}>Cancel</button>
        <button
          onClick={() => onConvert({ title: title || note.title, relatedTo: note.relatedTo || "General", module:"Documents", priority, due: due || "Today", dueTime:"" })}
          style={{ ...taskPrimaryBtn, background:"#4F46E5", padding:"4px 12px", fontSize:11 }}
        >
          Create Task
        </button>
      </div>
    </div>
  );
}

// ── Note Editor view (within drawer) ──────────────────────────────────────────

function NoteEditor({ note, onBack, onSave, onDelete, onConvertToTask }: {
  note: Note | null;
  onBack: () => void;
  onSave: (id: string | null, data: { title:string; content:string; relatedTo?:string }) => void;
  onDelete: (id: string) => void;
  onConvertToTask: (data: { title:string; relatedTo:string; module:string; priority:"High"|"Medium"|"Low"; due:string; dueTime:string }) => void;
}) {
  const [title,     setTitle]     = useState(note?.title || "");
  const [content,   setContent]   = useState(note?.content || "");
  const [relatedTo, setRelatedTo] = useState(note?.relatedTo || "");
  const [menuOpen,  setMenuOpen]  = useState(false);
  const [converting,setConverting]= useState(false);

  function handleSave() {
    onSave(note?.id || null, { title: title || "Untitled", content, relatedTo: relatedTo || undefined });
    onBack();
  }

  return (
    <div style={{ display:"flex", flexDirection:"column", height:"100%" }}>
      {/* Header */}
      <div style={{ display:"flex", alignItems:"center", padding:"10px 12px", borderBottom:`1px solid #C7D2FE`, gap:6, flexShrink:0 }}>
        <button onClick={() => { handleSave(); }} style={{ background:"none", border:"none", cursor:"pointer", display:"flex", alignItems:"center", gap:4, color:"#4F46E5", fontSize:12, fontWeight:600, fontFamily:"inherit" }}>
          <MatIcon name="arrow_back" size={16} color="#4F46E5" />
          Back
        </button>
        <div style={{ flex:1 }} />
        <div style={{ fontSize:10, color:C.muted }}>Auto-saved</div>
        {note && (
          <div style={{ position:"relative" }}>
            <button onClick={() => setMenuOpen(v => !v)} style={{ background:"none", border:"none", cursor:"pointer", display:"flex", borderRadius:6, padding:4 }}>
              <MatIcon name="more_horiz" size={16} color={C.muted} />
            </button>
            {menuOpen && (
              <div style={{ position:"absolute", top:32, right:0, zIndex:50, background:"var(--bg-surface, #fff)", border:`1px solid ${C.border}`, borderRadius:8, boxShadow:"0 4px 16px rgba(45,6,77,0.12)", padding:"4px 0", minWidth:170 }}>
                {[
                  { label:"Convert to Task", icon:"task_alt",     action:() => { setMenuOpen(false); setConverting(true); } },
                  { label:"Delete Note",     icon:"delete_outline",action:() => { onDelete(note.id); onBack(); }             },
                ].map(item => (
                  <button key={item.label} onClick={item.action} style={{ width:"100%", display:"flex", alignItems:"center", gap:8, padding:"7px 12px", background:"none", border:"none", cursor:"pointer", fontSize:12, color: item.label.includes("Delete") ? "#B03B2E" : C.text, fontFamily:"inherit", textAlign:"left" }}>
                    <MatIcon name={item.icon} size={14} color={item.label.includes("Delete") ? "#B03B2E" : C.muted} />
                    {item.label}
                  </button>
                ))}
              </div>
            )}
          </div>
        )}
      </div>

      {/* Content */}
      <div style={{ flex:1, overflowY:"auto", padding:"14px 16px", display:"flex", flexDirection:"column", gap:10 }}>
        <input
          value={title}
          onChange={e => setTitle(e.target.value)}
          placeholder="Note title"
          style={{
            width:"100%", border:"none", outline:"none", fontSize:15, fontWeight:700,
            color:C.text, fontFamily:"inherit", background:"transparent",
            padding:0, boxSizing:"border-box" as const,
          }}
        />

        <textarea
          value={content}
          onChange={e => setContent(e.target.value)}
          placeholder="Write a note..."
          style={{
            width:"100%", border:"none", outline:"none", fontSize:13,
            color:C.text, fontFamily:"inherit", background:"transparent",
            padding:0, resize:"none", lineHeight:1.6, minHeight:160,
            boxSizing:"border-box" as const,
          }}
        />

        <div style={{ paddingTop:10, borderTop:`1px solid #C7D2FE` }}>
          <div style={{ fontSize:10, fontWeight:600, color:"#4F46E5", textTransform:"uppercase", letterSpacing:"0.06em", marginBottom:6 }}>Related To</div>
          <input
            value={relatedTo}
            onChange={e => setRelatedTo(e.target.value)}
            placeholder="Employee, Candidate or HR Record"
            style={{ ...taskInputStyle, fontSize:12, borderColor:"#C7D2FE" }}
          />
        </div>

        {/* Privacy note */}
        <div style={{ display:"flex", alignItems:"center", gap:6, padding:"7px 10px", background:"#F0E8F8", borderRadius:7 }}>
          <MatIcon name="lock" size={13} color={C.muted} />
          <span style={{ fontSize:11, color:C.muted }}>Private to you</span>
        </div>

        {converting && (
          <ConvertToTaskForm
            note={{ ...INIT_NOTES[0], title, content, relatedTo }}
            onConvert={data => { onConvertToTask(data); setConverting(false); }}
            onCancel={() => setConverting(false)}
          />
        )}
      </div>
    </div>
  );
}

// ── Notes Drawer ──────────────────────────────────────────────────────────────

function NotesDrawer({ notes, onClose, onViewAll, onSave, onDelete, onPin, onConvertToTask }: {
  notes: Note[];
  onClose: () => void;
  onViewAll: () => void;
  onSave: (id: string | null, data: { title:string; content:string; relatedTo?:string }) => void;
  onDelete: (id: string) => void;
  onPin: (id: string) => void;
  onConvertToTask: (data: { title:string; relatedTo:string; module:string; priority:"High"|"Medium"|"Low"; due:string; dueTime:string }) => void;
}) {
  const [editingId, setEditingId] = useState<string | "new" | null>(null);

  const editingNote = editingId && editingId !== "new"
    ? notes.find(n => n.id === editingId) || null
    : null;

  if (editingId !== null) {
    return (
      <div style={{ position:"absolute", inset:0, background:"#FEFBFF" }}>
        <NoteEditor
          note={editingNote}
          onBack={() => setEditingId(null)}
          onSave={onSave}
          onDelete={onDelete}
          onConvertToTask={data => { onConvertToTask(data); setEditingId(null); }}
        />
      </div>
    );
  }

  const pinned  = notes.filter(n => n.pinned);
  const today   = notes.filter(n => !n.pinned && n.updatedAt.startsWith("Today"));
  const earlier = notes.filter(n => !n.pinned && !n.updatedAt.startsWith("Today"));

  return (
    <div style={{ position:"absolute", inset:0, display:"flex", flexDirection:"column", background:"var(--drawer-bg, #FEFBFF)" }}>

      {/* Header */}
      <div style={{ display:"flex", alignItems:"flex-start", padding:"12px 12px 12px 16px", borderBottom:`1px solid var(--drawer-border-divider, ${C.border})`, background:"var(--drawer-header-bg, transparent)", gap:8, flexShrink:0 }}>
        <div style={{ flex:1 }}>
          <div style={{ fontSize:14, fontWeight:700, color:"var(--drawer-title, " + C.text + ")", letterSpacing:"-0.2px", marginBottom:3 }}>Notes</div>
          <div style={{ fontSize:11, color:"var(--drawer-desc, " + C.muted + ")" }}>Quick personal notes</div>
        </div>
        <div style={{ display:"flex", gap:1 }}>
          <DrawerIconBtn icon="add"   label="New Note" onClick={() => setEditingId("new")} />
          <DrawerIconBtn icon="close" label="Close"    onClick={onClose} />
        </div>
      </div>

      {/* List */}
      <div style={{ flex:1, overflowY:"auto", padding:"10px 12px" }}>
        {pinned.length > 0 && (
          <>
            <div style={{ fontSize:10, fontWeight:700, color:"var(--drawer-desc, " + C.muted + ")", textTransform:"uppercase", letterSpacing:"0.07em", marginBottom:6, display:"flex", alignItems:"center", gap:5 }}>
              <MatIcon name="push_pin" size={11} color={"var(--drawer-tab-active-text, " + C.muted + ")"} />
              Pinned
            </div>
            <div style={{ display:"flex", flexDirection:"column", gap:6, marginBottom:14 }}>
              {pinned.map(n => <NoteCard key={n.id} note={n} onClick={() => setEditingId(n.id)} onPin={() => onPin(n.id)} onDelete={() => onDelete(n.id)} />)}
            </div>
          </>
        )}
        {today.length > 0 && (
          <>
            <div style={{ fontSize:10, fontWeight:700, color:"var(--drawer-desc, " + C.muted + ")", textTransform:"uppercase", letterSpacing:"0.07em", marginBottom:6 }}>Today</div>
            <div style={{ display:"flex", flexDirection:"column", gap:6, marginBottom:14 }}>
              {today.map(n => <NoteCard key={n.id} note={n} onClick={() => setEditingId(n.id)} onPin={() => onPin(n.id)} onDelete={() => onDelete(n.id)} />)}
            </div>
          </>
        )}
        {earlier.length > 0 && (
          <>
            <div style={{ fontSize:10, fontWeight:700, color:"var(--drawer-desc, " + C.muted + ")", textTransform:"uppercase", letterSpacing:"0.07em", marginBottom:6 }}>Earlier</div>
            <div style={{ display:"flex", flexDirection:"column", gap:6 }}>
              {earlier.map(n => <NoteCard key={n.id} note={n} onClick={() => setEditingId(n.id)} onPin={() => onPin(n.id)} onDelete={() => onDelete(n.id)} />)}
            </div>
          </>
        )}
        {notes.length === 0 && (
          <EmptyState
            type="documents"
            size="compact"
            title="No notes yet"
            description="Created notes and personal documents will appear here."
            actionLabel="New Note"
            onAction={() => setEditingId("new")}
          />
        )}
      </div>

      {/* Footer */}
      <div style={{ flexShrink:0, borderTop:`1px solid var(--drawer-footer-border, ${C.border})`, background:"var(--drawer-footer-bg, transparent)", padding:"10px 16px", display:"flex", justifyContent:"center" }}>
        <button
          onClick={onViewAll}
          onMouseEnter={e => (e.currentTarget.style.background = "var(--drawer-footer-action-hover, transparent)")}
          onMouseLeave={e => (e.currentTarget.style.background = "transparent")}
          style={{
            background:"none", border:"none", cursor:"pointer",
            fontSize:12, fontWeight:600, color:"var(--drawer-footer-action-text, " + C.primary + ")", fontFamily:"inherit",
            padding:"4px 12px", borderRadius:6, transition:"background-color 0.12s",
          }}
        >
          View all notes →
        </button>
      </div>
    </div>
  );
}

// ── Full Notes Page ───────────────────────────────────────────────────────────

function NotesPage({ notes, onBack, onSave, onDelete, onPin, onConvertToTask }: {
  notes: Note[];
  onBack: () => void;
  onSave: (id: string | null, data: { title:string; content:string; relatedTo?:string }) => void;
  onDelete: (id: string) => void;
  onPin: (id: string) => void;
  onConvertToTask: (data: { title:string; relatedTo:string; module:string; priority:"High"|"Medium"|"Low"; due:string; dueTime:string }) => void;
}) {
  const [tab,      setTab]      = useState<"all"|"pinned"|"recent">("all");
  const [search,   setSearch]   = useState("");
  const [editingId,setEditingId]= useState<string | "new" | null>(null);

  const editingNote = editingId && editingId !== "new"
    ? notes.find(n => n.id === editingId) || null
    : null;

  if (editingId !== null) {
    return (
      <div style={{ height:"100%", background:"#FEFBFF" }}>
        <NoteEditor
          note={editingNote}
          onBack={() => setEditingId(null)}
          onSave={onSave}
          onDelete={onDelete}
          onConvertToTask={data => { onConvertToTask(data); setEditingId(null); }}
        />
      </div>
    );
  }

  const filtered = notes.filter(n => {
    const ms = !search || n.title.toLowerCase().includes(search.toLowerCase()) || n.content.toLowerCase().includes(search.toLowerCase());
    const mt = tab === "all" ? true : tab === "pinned" ? n.pinned : true;
    return ms && mt;
  });

  return (
    <div style={{ display:"flex", flexDirection:"column", height:"100%", background:"#FEFBFF" }}>
      <div style={{ padding:"18px 28px 0", borderBottom:`1px solid ${C.border}`, flexShrink:0 }}>
        <div style={{ display:"flex", alignItems:"flex-start", gap:10, marginBottom:14 }}>
          <button onClick={onBack} style={{ background:"none", border:"none", cursor:"pointer", display:"flex", alignItems:"center", gap:4, color:C.primary, fontSize:12, fontWeight:600, fontFamily:"inherit", marginTop:3 }}>
            <MatIcon name="arrow_back" size={16} color={C.primary} />
            Back
          </button>
          <div>
            <div style={{ fontSize:17, fontWeight:700, color:C.text, letterSpacing:"-0.3px" }}>Notes</div>
            <div style={{ fontSize:12, color:C.muted, marginTop:2 }}>Capture and organize your personal HR notes.</div>
          </div>
          <div style={{ marginLeft:"auto" }}>
            <button onClick={() => setEditingId("new")} style={{ ...taskPrimaryBtn, display:"flex", alignItems:"center", gap:5 }}>
              <MatIcon name="add" size={15} color="#fff" />
              New Note
            </button>
          </div>
        </div>

        <div style={{ display:"flex", alignItems:"center", gap:10, marginBottom:12 }}>
          <div style={{ display:"flex", alignItems:"center", gap:8, height:34, padding:"0 12px", background:C.searchBg, border:`1px solid ${C.borderFaint}`, borderRadius:8, maxWidth:340, flex:1 }}>
            <MatIcon name="search" size={16} color="#9580A8" />
            <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search notes..." style={{ flex:1, background:"none", border:"none", outline:"none", fontSize:12, color:C.text, fontFamily:"inherit" }} />
          </div>
        </div>

        <div style={{ display:"flex" }}>
          {(["all","pinned","recent"] as const).map(t => (
            <button key={t} onClick={() => setTab(t)} style={{ padding:"8px 14px", border:"none", background:"transparent", cursor:"pointer", fontFamily:"inherit", fontSize:12, fontWeight:tab===t?600:450, color:tab===t?C.text:C.muted, borderBottom:tab===t?`2px solid ${C.primary}`:"2px solid transparent", marginBottom:-1, transition:"color 0.15s", textTransform:"capitalize" }}>
              {t === "recent" ? "Recent" : t === "pinned" ? "Pinned" : "All Notes"}
            </button>
          ))}
        </div>
      </div>

      <div style={{ flex:1, overflowY:"auto", padding:"20px 28px" }}>
        {filtered.length === 0 ? (
          <div style={{ textAlign:"center", color:C.muted, fontSize:13, paddingTop:60 }}>No notes found</div>
        ) : (
          <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fill, minmax(240px, 1fr))", gap:12 }}>
            {filtered.map(n => (
              <div
                key={n.id}
                onClick={() => setEditingId(n.id)}
                style={{ padding:"14px 16px", background:"var(--bg-surface, #fff)", border:`1px solid ${C.border}`, borderRadius:12, cursor:"pointer" }}
              >
                <div style={{ display:"flex", alignItems:"flex-start", gap:6, marginBottom:6 }}>
                  <span style={{ flex:1, fontSize:13, fontWeight:700, color:C.text, lineHeight:1.3 }}>{n.title}</span>
                  {n.pinned && <MatIcon name="push_pin" size={14} color={C.primary} filled />}
                </div>
                <div style={{ fontSize:12, color:C.muted, lineHeight:1.5, marginBottom:10, display:"-webkit-box", WebkitLineClamp:3, WebkitBoxOrient:"vertical", overflow:"hidden" }}>
                  {n.content}
                </div>
                <div style={{ display:"flex", alignItems:"center", gap:6 }}>
                  <span style={{ fontSize:10, color:C.muted }}>{n.updatedAt}</span>
                  {n.relatedTo && <><span style={{ width:2, height:2, borderRadius:"50%", background:"#C5B0D0" }} /><span style={{ fontSize:10, color:C.muted }}>{n.relatedTo}</span></>}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

// ─── DRAWER LOADING ───────────────────────────────────────────────────────────

// ─── CUSTOMIZE DRAWER ─────────────────────────────────────────────────────────

function CustomizeDrawer({ onClose }: { onClose: () => void }) {
  const [railUtilities, setRailUtilities] = useState({
    tasks: true,
    approvals: true,
    schedule: true,
    notes: true,
  });
  const [density, setDensity] = useState<"standard" | "compact">("standard");
  const [aiPrompts, setAiPrompts] = useState(true);
  const [soundEffects, setSoundEffects] = useState(false);
  const [themeMode, setThemeMode] = useState<"light" | "tinted" | "system">("light");

  const magenta = "#C026D3";
  const soft = "#FDF4FF";
  const iconBg = "#FAE8FF";
  const border = "#F5D0FE";

  return (
    <div style={{ position:"absolute", inset:0, display:"flex", flexDirection:"column", background:"var(--drawer-bg, #FEFBFF)" }}>
      {/* Header — Magenta identity */}
      <div style={{
        display:"flex", alignItems:"flex-start",
        padding:"12px 12px 12px 16px", flexShrink:0,
        background:"var(--drawer-header-bg, transparent)",
        borderBottom:`1px solid var(--drawer-border-divider, ${border})`, gap:8,
      }}>
        <div style={{ flex:1 }}>
          <div style={{
            fontSize:14, fontWeight:700, color:"var(--drawer-title, " + C.text + ")", letterSpacing:"-0.2px",
            display:"flex", alignItems:"center", gap:7, marginBottom:3,
          }}>
            <div style={{
              width:22, height:22, borderRadius:6,
              background:"var(--drawer-icon-container-bg, " + iconBg + ")",
              border:"1px solid var(--drawer-icon-container-border, transparent)",
              display:"flex", alignItems:"center", justifyContent:"center",
              flexShrink:0,
            }}>
              <MatIcon name="tune" size={14} color={"var(--drawer-icon-container-color, " + magenta + ")"} filled />
            </div>
            Customize
          </div>
          <div style={{ fontSize:11, color:"var(--drawer-row-secondary, " + C.muted + ")" }}>Workspace & utility preferences</div>
        </div>
        <DrawerIconBtn icon="close" label="Close" onClick={onClose} hoverBg={"var(--drawer-header-hover, " + soft + ")"} activeBg={"var(--drawer-icon-container-bg, " + iconBg + ")"} activeColor={"var(--drawer-icon-container-color, " + magenta + ")"} />
      </div>

      {/* Content */}
      <div style={{ flex:1, overflowY:"auto", padding:"14px 16px", display:"flex", flexDirection:"column", gap:18 }}>
        {/* Right Rail Utilities */}
        <div>
          <div style={{ fontSize:10, fontWeight:700, color:"var(--drawer-tab-active-text, " + magenta + ")", textTransform:"uppercase", letterSpacing:"0.06em", marginBottom:8 }}>
            Right Rail Utilities
          </div>
          <div style={{ display:"flex", flexDirection:"column", gap:8 }}>
            {[
              { id:"tasks", label:"My Tasks", icon:"task_alt", color:"#2563EB", bg:"#DBEAFE", val: railUtilities.tasks, toggle: () => setRailUtilities(s => ({ ...s, tasks: !s.tasks })) },
              { id:"approvals", label:"Approvals", icon:"verified", color:"#059669", bg:"#D1FAE5", val: railUtilities.approvals, toggle: () => setRailUtilities(s => ({ ...s, approvals: !s.approvals })) },
              { id:"schedule", label:"Schedule", icon:"calendar_month", color:"#F97316", bg:"#FFEDD5", val: railUtilities.schedule, toggle: () => setRailUtilities(s => ({ ...s, schedule: !s.schedule })) },
              { id:"notes", label:"Notes", icon:"description", color:"#4F46E5", bg:"#E0E7FF", val: railUtilities.notes, toggle: () => setRailUtilities(s => ({ ...s, notes: !s.notes })) },
            ].map(item => (
              <div
                key={item.id}
                style={{
                  display:"flex", alignItems:"center", justifyContent:"space-between",
                  padding:"9px 12px", background:"var(--drawer-card-bg, #fff)", border:`1px solid var(--drawer-border-divider, ${C.borderFaint})`,
                  borderRadius:9,
                }}
              >
                <div style={{ display:"flex", alignItems:"center", gap:8 }}>
                  <div style={{
                    width:26, height:26, borderRadius:6,
                    background:"var(--drawer-icon-container-bg, " + item.bg + ")",
                    border:"1px solid var(--drawer-icon-container-border, transparent)",
                    display:"flex", alignItems:"center", justifyContent:"center"
                  }}>
                    <MatIcon name={item.icon} size={15} color={"var(--drawer-icon-container-color, " + item.color + ")"} filled />
                  </div>
                  <span style={{ fontSize:12, fontWeight:500, color:"var(--drawer-row-title, " + C.text + ")" }}>{item.label}</span>
                </div>
                <button
                  onClick={item.toggle}
                  style={{
                    width:36, height:20, borderRadius:10, border:"none", cursor:"pointer",
                    background: item.val ? "var(--drawer-tab-active-indicator, " + magenta + ")" : "rgba(255,255,255,0.12)",
                    position:"relative", transition:"background 0.15s",
                  }}
                >
                  <div style={{
                    width:16, height:16, borderRadius:"50%", background:"#fff",
                    position:"absolute", top:2,
                    left: item.val ? 18 : 2,
                    transition:"left 0.15s",
                    boxShadow:"0 1px 3px rgba(0,0,0,0.15)",
                  }} />
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Display Preferences */}
        <div>
          <div style={{ fontSize:10, fontWeight:700, color:"var(--drawer-tab-active-text, " + magenta + ")", textTransform:"uppercase", letterSpacing:"0.06em", marginBottom:8 }}>
            Workspace Display
          </div>
          <div style={{ display:"flex", flexDirection:"column", gap:8 }}>
            <div style={{
              display:"flex", alignItems:"center", justifyContent:"space-between",
              padding:"9px 12px", background:"var(--drawer-card-bg, #fff)", border:`1px solid var(--drawer-border-divider, ${C.borderFaint})`,
              borderRadius:9,
            }}>
              <div>
                <div style={{ fontSize:12, fontWeight:500, color:"var(--drawer-row-title, " + C.text + ")" }}>Dense Layout</div>
                <div style={{ fontSize:10, color:"var(--drawer-row-secondary, " + C.muted + ")" }}>Compact padding across tables and rows</div>
              </div>
              <button
                onClick={() => setDensity(d => d === "standard" ? "compact" : "standard")}
                style={{
                  width:36, height:20, borderRadius:10, border:"none", cursor:"pointer",
                  background: density === "compact" ? "var(--drawer-tab-active-indicator, " + magenta + ")" : "rgba(255,255,255,0.12)",
                  position:"relative", transition:"background 0.15s",
                }}
              >
                <div style={{
                  width:16, height:16, borderRadius:"50%", background:"#fff",
                  position:"absolute", top:2,
                  left: density === "compact" ? 18 : 2,
                  transition:"left 0.15s",
                  boxShadow:"0 1px 3px rgba(0,0,0,0.15)",
                }} />
              </button>
            </div>

            <div style={{
              display:"flex", alignItems:"center", justifyContent:"space-between",
              padding:"9px 12px", background:"var(--drawer-card-bg, #fff)", border:`1px solid var(--drawer-border-divider, ${C.borderFaint})`,
              borderRadius:9,
            }}>
              <div>
                <div style={{ fontSize:12, fontWeight:500, color:"var(--drawer-row-title, " + C.text + ")" }}>AI Suggestion Prompts</div>
                <div style={{ fontSize:10, color:"var(--drawer-row-secondary, " + C.muted + ")" }}>Show contextual hints in AI panel</div>
              </div>
              <button
                onClick={() => setAiPrompts(v => !v)}
                style={{
                  width:36, height:20, borderRadius:10, border:"none", cursor:"pointer",
                  background: aiPrompts ? "var(--drawer-tab-active-indicator, " + magenta + ")" : "rgba(255,255,255,0.12)",
                  position:"relative", transition:"background 0.15s",
                }}
              >
                <div style={{
                  width:16, height:16, borderRadius:"50%", background:"#fff",
                  position:"absolute", top:2,
                  left: aiPrompts ? 18 : 2,
                  transition:"left 0.15s",
                  boxShadow:"0 1px 3px rgba(0,0,0,0.15)",
                }} />
              </button>
            </div>

            <div style={{
              display:"flex", alignItems:"center", justifyContent:"space-between",
              padding:"9px 12px", background:"var(--drawer-card-bg, #fff)", border:`1px solid var(--drawer-border-divider, ${C.borderFaint})`,
              borderRadius:9,
            }}>
              <div>
                <div style={{ fontSize:12, fontWeight:500, color:"var(--drawer-row-title, " + C.text + ")" }}>Sound Notifications</div>
                <div style={{ fontSize:10, color:"var(--drawer-row-secondary, " + C.muted + ")" }}>Audible alerts on new urgent items</div>
              </div>
              <button
                onClick={() => setSoundEffects(v => !v)}
                style={{
                  width:36, height:20, borderRadius:10, border:"none", cursor:"pointer",
                  background: soundEffects ? "var(--drawer-tab-active-indicator, " + magenta + ")" : "rgba(255,255,255,0.12)",
                  position:"relative", transition:"background 0.15s",
                }}
              >
                <div style={{
                  width:16, height:16, borderRadius:"50%", background:"#fff",
                  position:"absolute", top:2,
                  left: soundEffects ? 18 : 2,
                  transition:"left 0.15s",
                  boxShadow:"0 1px 3px rgba(0,0,0,0.15)",
                }} />
              </button>
            </div>
          </div>
        </div>

        {/* Theme Accent Selection */}
        <div>
          <div style={{ fontSize:10, fontWeight:700, color:"var(--drawer-tab-active-text, " + magenta + ")", textTransform:"uppercase", letterSpacing:"0.06em", marginBottom:8 }}>
            Drawer Theme Accents
          </div>
          <div style={{ display:"flex", gap:6 }}>
            {(["light", "tinted", "system"] as const).map(mode => (
              <button
                key={mode}
                onClick={() => setThemeMode(mode)}
                style={{
                  flex:1, padding:"7px 0", borderRadius:8,
                  fontSize:11, fontWeight:600, fontFamily:"inherit", cursor:"pointer",
                  background: themeMode === mode ? "var(--drawer-tab-active-indicator, " + magenta + ")" : "var(--drawer-card-bg, " + iconBg + ")",
                  color: themeMode === mode ? "#fff" : C.text,
                  border: `1px solid ${themeMode === mode ? "var(--drawer-tab-active-indicator, " + magenta + ")" : "var(--drawer-border-divider, " + border + ")"}`,
                  transition:"all 0.12s", textTransform:"capitalize",
                }}
              >
                {mode}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Footer */}
      <div style={{
        flexShrink:0, borderTop:`1px solid var(--drawer-footer-border, ${border})`,
        background:"var(--drawer-footer-bg, transparent)",
        padding:"10px 16px", display:"flex", alignItems:"center", justifyContent:"space-between",
      }}>
        <button
          onClick={() => {
            setRailUtilities({ tasks:true, approvals:true, schedule:true, notes:true });
            setDensity("standard");
            setAiPrompts(true);
            setSoundEffects(false);
            setThemeMode("light");
          }}
          style={{
            background:"none", border:"none", cursor:"pointer",
            fontSize:11, fontWeight:600, color:"var(--drawer-row-action, " + magenta + ")", fontFamily:"inherit", padding:0,
          }}
        >
          Reset to default
        </button>
        <button
          onClick={onClose}
          style={{
            background:"var(--drawer-tab-active-indicator, " + magenta + ")", border:"none", borderRadius:7,
            padding:"6px 14px", cursor:"pointer",
            fontSize:11, fontWeight:600, color:"#fff", fontFamily:"inherit",
            boxShadow:"0 1px 4px rgba(147,28,245,0.25)",
          }}
        >
          Save Preferences
        </button>
      </div>
    </div>
  );
}

// ─── DRAWER LOADING ───────────────────────────────────────────────────────────

// ─── DRAWER LOADING & CIRCULAR REVEAL ─────────────────────────────────────────

function DrawerLoader({ config, onClose }: {
  config: RightUtilityConfig; onClose: () => void;
}) {
  return (
    <div style={{ position:"absolute", inset:0, display:"flex", flexDirection:"column", background:"var(--drawer-bg, #151020)" }}>
      {/* Header always visible above the animation with matching utility identity */}
      <div style={{
        display:"flex", alignItems:"center", padding:"0 12px 0 16px",
        height:50, flexShrink:0, borderBottom:"1px solid var(--drawer-border-divider, rgba(255,255,255,0.06))",
        background:"var(--drawer-header-bg, #181126)", position:"relative", zIndex:2,
      }}>
        <div style={{
          width:26, height:26, borderRadius:7,
          background:"var(--drawer-icon-container-bg, rgba(147,28,245,0.14))",
          border:"1px solid var(--drawer-icon-container-border, rgba(147,28,245,0.22))",
          display:"flex", alignItems:"center", justifyContent:"center",
          marginRight:8, flexShrink:0,
        }}>
          <BezentIcon name={config.icon} size={15} color="var(--drawer-icon-container-color, #B65CFF)" active={true} />
        </div>
        <span style={{ flex:1, fontSize:14, fontWeight:700, color:"var(--drawer-title, #F7F5FA)", letterSpacing:"-0.2px" }}>
          {config.title}
        </span>
        <button
          onClick={onClose}
          aria-label="Close drawer"
          style={{ width:30, height:30, display:"flex", alignItems:"center", justifyContent:"center", background:"transparent", border:"none", borderRadius:7, cursor:"pointer" }}
        >
          <MatIcon name="close" size={18} color="var(--drawer-header-icon, var(--text-muted))" />
        </button>
      </div>

      {/* Content area: circular reveal */}
      <div style={{
        flex:1, position:"relative", overflow:"hidden",
        background:"var(--drawer-bg, #151020)",
        display:"flex", alignItems:"center", justifyContent:"center",
      }}>
        {/* Single expanding circle — dark mode aware */}
        <div className="drawer-circle" style={{ background: "var(--drawer-reveal-surface, #211534)" }} />

        {/* Icon above the circle, dynamically representing clicked right utility */}
        <div className="drawer-loader-icon" style={{ display: "flex", alignItems: "center", justifyContent: "center" }}>
          <div style={{
            width: 64, height: 64, borderRadius: 16,
            background: "var(--drawer-reveal-icon-bg, rgba(147, 28, 245, 0.14))",
            display: "flex", alignItems: "center", justifyContent: "center",
            border: "1px solid var(--drawer-reveal-icon-border, rgba(147, 28, 245, 0.22))",
            boxShadow: "0 8px 24px rgba(0,0,0,0.24)",
          }}>
            <BezentIcon
              name={config.icon}
              size={32}
              color="var(--drawer-reveal-icon, #B65CFF)"
              active={true}
              strokeWidth={1.8}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

// Wraps revealed drawer content with a fade-in
function DrawerContentReady({ children }: { children: React.ReactNode }) {
  return (
    <div className="drawer-content-in" style={{ position:"absolute", inset:0 }}>
      {children}
    </div>
  );
}

// Shared drawer shell — handles the fixed container + loader/content switch
function UtilityDrawerShell({ config, railW, loading, onClose, children }: {
  config: RightUtilityConfig; railW: number; loading: boolean;
  onClose: () => void; children: React.ReactNode;
}) {
  return (
    <div style={{
      position:"fixed", top:60, bottom:36, right:railW,
      width:DRAWER_W, zIndex:45,
      background:"var(--drawer-bg, #151020)",
      borderLeft:"1px solid var(--drawer-border, rgba(255,255,255,0.07))",
      boxShadow:"-4px 0 20px rgba(0,0,0,0.25)",
      overflow:"hidden",
    }}>
      {loading
        ? <DrawerLoader config={config} onClose={onClose} />
        : <DrawerContentReady>{children}</DrawerContentReady>
      }
    </div>
  );
}

// ─── ROUTE & PERSISTENCE HELPERS FOR NAVIGATION SHELL ───────────────────────

const MODULE_TO_SLUG: Record<string, string> = {
  "Dashboard": "dashboard",
  "Workforce": "workforce",
  "Payroll": "payroll",
  "Operations": "operations",
  "SOP": "sop",
  "Home": "home",
  "Onboarding": "onboarding",
  "Leave Tracker": "leave-tracker",
  "Attendance": "attendance",
  "Time Tracker": "time-tracker",
  "Performance": "performance",
  "Employees": "employees",
  "Reports": "reports",
  "Settings": "settings",
  "Organization": "organization",
  "Recruitment": "recruitment",
  "Candidates": "candidates",
  "Interviews": "interviews",
  "Shifts": "shifts",
  "Learning": "learning",
  "Career": "career",
  "Documents": "documents",
  "Assets": "assets",
  "Employee Requests": "requests",
  "Job Openings": "job-openings",
  "Offers": "offers",
  "Compensation": "compensation",
  "Benefits": "benefits",
};

const SLUG_TO_MODULE: Record<string, string> = Object.entries(MODULE_TO_SLUG).reduce(
  (acc, [mod, slug]) => {
    acc[slug.toLowerCase()] = mod;
    acc[mod.toLowerCase()] = mod;
    return acc;
  },
  {} as Record<string, string>
);

function getChildFromRoute(): string | null {
  if (typeof window === "undefined") return null;
  const hash = window.location.hash.replace(/^#\/?/, "").toLowerCase().trim();
  if (hash) {
    const parent = getParentModuleForChild(hash);
    if (parent && parent.children) {
      const match = parent.children.find(
        c => c.id.toLowerCase() === hash || c.route.toLowerCase().replace(/^\//, "") === hash
      );
      if (match) return match.id;
    }
  }
  try {
    return localStorage.getItem("bezent_active_child");
  } catch {}
  return null;
}

function getModuleFromRoute(): string {
  if (typeof window === "undefined") return "Dashboard";
  // 1. Hash route: #/dashboard, #/performance/appraisals, etc.
  const hash = window.location.hash.replace(/^#\/?/, "").toLowerCase().trim();
  if (hash) {
    const parent = getParentModuleForChild(hash);
    if (parent) return parent.id;
    if (SLUG_TO_MODULE[hash]) {
      return SLUG_TO_MODULE[hash];
    }
  }
  // 2. Path route: /dashboard
  const path = window.location.pathname.replace(/^\//, "").toLowerCase().trim();
  if (path) {
    const parent = getParentModuleForChild(path);
    if (parent) return parent.id;
    if (SLUG_TO_MODULE[path]) {
      return SLUG_TO_MODULE[path];
    }
  }
  // 3. Query string: ?module=dashboard
  try {
    const params = new URLSearchParams(window.location.search);
    const mod = params.get("module")?.toLowerCase().trim();
    if (mod) {
      const parent = getParentModuleForChild(mod);
      if (parent) return parent.id;
      if (SLUG_TO_MODULE[mod]) return SLUG_TO_MODULE[mod];
    }
  } catch {}
  // 4. LocalStorage persistence across reloads
  try {
    const saved = localStorage.getItem("bezent_active_module");
    if (saved && (MODULE_TO_SLUG[saved] || SLUG_TO_MODULE[saved.toLowerCase()])) {
      return MODULE_TO_SLUG[saved] ? saved : SLUG_TO_MODULE[saved.toLowerCase()];
    }
  } catch {}
  return "Dashboard";
}

function updateModuleRoute(moduleName: string) {
  const slug = MODULE_TO_SLUG[moduleName] || moduleName.toLowerCase().replace(/\s+/g, "-");
  try {
    localStorage.setItem("bezent_active_module", moduleName);
  } catch {}
  if (typeof window !== "undefined") {
    const targetHash = `#/${slug}`;
    if (window.location.hash !== targetHash) {
      window.location.hash = targetHash;
    }
  }
}

// ─── APP SHELL ────────────────────────────────────────────────────────────────

function getEmptyStateTypeForModule(moduleId: string): EmptyStateVariant {
  const m = (moduleId || "").toLowerCase();
  if (m.includes("leave") || m.includes("holiday") || m.includes("timeoff")) return "leave";
  if (m.includes("attendance")) return "attendance";
  if (m.includes("shift")) return "shifts";
  if (m.includes("timesheet")) return "timesheets";
  if (m.includes("payroll") || m.includes("compensation") || m.includes("benefit")) return "payroll";
  if (m.includes("candidate") || m.includes("recruitment") || m.includes("applicant") || m.includes("hire") || m.includes("job") || m.includes("interview") || m.includes("offer")) return "candidates";
  if (m.includes("employee") || m.includes("people") || m.includes("organization") || m.includes("onboarding") || m.includes("directory")) return "employees";
  if (m.includes("lead") || m.includes("crm") || m.includes("deal") || m.includes("pipeline") || m.includes("contact") || m.includes("account")) return "leads";
  if (m.includes("project")) return "projects";
  if (m.includes("task") || m.includes("time tracker") || m.includes("checklist")) return "tasks";
  if (m.includes("performance") || m.includes("goal") || m.includes("okr") || m.includes("review") || m.includes("appraisal") || m.includes("career")) return "performance";
  if (m.includes("report") || m.includes("analytic")) return "reports";
  if (m.includes("file") || m.includes("document") || m.includes("letter") || m.includes("note") || m.includes("sop")) return "documents";
  if (m.includes("asset") || m.includes("inventory")) return "assets";
  if (m.includes("approval")) return "approvals";
  if (m.includes("calendar") || m.includes("schedule")) return "calendar";
  return "employees";
}

const AI_PANEL_W = 340;

export default function App() {
  const [activeModule,    setActiveModule]    = useState<string>(getModuleFromRoute);
  const [activeChildId,   setActiveChildId]   = useState<string | null>(getChildFromRoute);
  const [searchQuery,     setSearchQuery]     = useState<string>("");
  const [searchExecuted,  setSearchExecuted]  = useState<boolean>(false);

  // Synchronize route changes (Back/Forward, hashchange, page load)
  useEffect(() => {
    function syncRoute() {
      const hash = window.location.hash.replace(/^#\/?/, "").toLowerCase().trim();
      const parent = getParentModuleForChild(hash);
      if (parent) {
        setActiveModule(parent.id);
        const match = parent.children?.find(
          c => c.id.toLowerCase() === hash || c.route.toLowerCase().replace(/^\//, "") === hash
        );
        setActiveChildId(match ? match.id : null);
      } else {
        const mod = getModuleFromRoute();
        setActiveModule(mod);
        setActiveChildId(null);
      }
    }
    const currentHash = window.location.hash.replace(/^#\/?/, "").toLowerCase().trim();
    if (!currentHash) {
      updateModuleRoute(activeModule);
    }
    window.addEventListener("hashchange", syncRoute);
    window.addEventListener("popstate", syncRoute);
    return () => {
      window.removeEventListener("hashchange", syncRoute);
      window.removeEventListener("popstate", syncRoute);
    };
  }, []);

  const handleSelectModule = (id: string) => {
    setActiveModule(id);
    setActiveChildId(null);
    setSearchExecuted(false);
    setSearchQuery("");
    try {
      localStorage.removeItem("bezent_active_child");
    } catch {}
    updateModuleRoute(id);
  };

  const handleSelectChild = (parentId: string, childId: string, route: string) => {
    setActiveModule(parentId);
    setActiveChildId(childId);
    try {
      localStorage.setItem("bezent_active_module", parentId);
      localStorage.setItem("bezent_active_child", childId);
    } catch {}
    if (typeof window !== "undefined") {
      const slug = route.replace(/^\//, "");
      const targetHash = `#/${slug}`;
      if (window.location.hash !== targetHash) {
        window.location.hash = targetHash;
      }
    }
  };
  const [aiOpen,          setAiOpen]          = useState(false);
  const [railOpen,        setRailOpen]        = useState(true);
  const [activeDrawer,    setActiveDrawer]    = useState<string | null>(null);
  const [drawerLoading,   setDrawerLoading]   = useState(false);
  const [revealConfig,    setRevealConfig]    = useState<RightUtilityConfig | null>(null);
  const [notifPage,       setNotifPage]       = useState(false);
  const [notifOpen,       setNotifOpen]       = useState(false);
  const [notifs,          setNotifs]          = useState<Notif[]>(INIT_NOTIFS);
  const [approvals,       setApprovals]       = useState<Approval[]>(INIT_APPROVALS);
  const [approvalsCenter, setApprovalsCenter] = useState(false);
  const [reviewingId,     setReviewingId]     = useState<string | null>(null);
  const [tasks,           setTasks]           = useState<Task[]>(INIT_TASKS);
  const [tasksPage,       setTasksPage]       = useState(false);
  const [viewingTaskId,   setViewingTaskId]   = useState<string | null>(null);
  const [addTaskOpen,     setAddTaskOpen]     = useState(false);
  const [events,          setEvents]          = useState<CalEvent[]>(INIT_EVENTS);
  const [calPage,         setCalPage]         = useState(false);
  const [createEventOpen, setCreateEventOpen] = useState(false);
  const [notes,           setNotes]           = useState<Note[]>(INIT_NOTES);
  const [notesPage,       setNotesPage]       = useState(false);

  const leftW             = 90;
  const effectiveRailOpen = railOpen && !aiOpen;
  const railW             = effectiveRailOpen ? 48 : 0;
  const drawerW           = activeDrawer ? DRAWER_W : 0;

  function handleDrawerToggle(name: string) {
    if (notifOpen) setNotifOpen(false);
    const targetConfig = getRightUtilityConfig(name);
    const currentConfig = getRightUtilityConfig(activeDrawer);
    if (currentConfig && targetConfig && currentConfig.id === targetConfig.id) {
      setActiveDrawer(null);
      setDrawerLoading(false);
      setRevealConfig(null);
    } else {
      // Capture target FIRST so DrawerLoader always shows the clicked item
      setRevealConfig(targetConfig);
      setActiveDrawer(targetConfig ? targetConfig.id : name);
      setDrawerLoading(true);
      setTimeout(() => setDrawerLoading(false), 360);
    }
  }

  function handleMarkRead(id: string) {
    setNotifs(prev => prev.map(n => n.id === id ? { ...n, read: true } : n));
  }

  function handleMarkAllRead() {
    setNotifs(prev => prev.map(n => ({ ...n, read: true })));
  }

  function handleTaskComplete(id: string) {
    setTasks(prev => prev.map(t => t.id === id ? { ...t, status: "Completed" } : t));
  }

  function handleToggleChecklist(taskId: string, idx: number) {
    setTasks(prev => prev.map(t =>
      t.id === taskId && t.checklist
        ? { ...t, checklist: t.checklist.map((item, i) => i === idx ? { ...item, done: !item.done } : item) }
        : t
    ));
  }

  function handleCreateTask(data: { title:string; relatedTo:string; module:string; priority:"High"|"Medium"|"Low"; due:string; dueTime:string }) {
    const iconMap: Record<string, string> = {
      Onboarding:"person_add", Recruitment:"work", Attendance:"schedule",
      Leave:"event_busy", Documents:"documents", Performance:"trending_up",
      Learning:"school", Employees:"groups",
    };
    setTasks(prev => [{
      id: `tk${Date.now()}`,
      title: data.title, relatedTo: data.relatedTo,
      module: data.module, moduleIcon: iconMap[data.module] || "assignment",
      priority: data.priority, due: data.due, dueTime: data.dueTime || undefined,
      status: "Open",
      history: [{ label: "Task created", time: "Just now" }],
    }, ...prev]);
  }

  function handleCreateEvent(e: CalEvent) {
    setEvents(prev => [e, ...prev]);
  }

  function handleSaveNote(id: string | null, data: { title:string; content:string; relatedTo?:string }) {
    if (id) {
      setNotes(prev => prev.map(n => n.id === id ? { ...n, ...data, updatedAt:"Just now" } : n));
    } else {
      setNotes(prev => [{ id:`nt${Date.now()}`, ...data, updatedAt:"Just now", pinned:false }, ...prev]);
    }
  }

  function handleDeleteNote(id: string) {
    setNotes(prev => prev.filter(n => n.id !== id));
  }

  function handlePinNote(id: string) {
    setNotes(prev => prev.map(n => n.id === id ? { ...n, pinned: !n.pinned } : n));
  }

  function handleApprovalAction(id: string, action: "approve" | "reject" | "more-info") {
    setApprovals(prev => prev.map(a => {
      if (a.id !== id) return a;
      const newStatus: Approval["status"] =
        action === "approve" ? "Approved" :
        action === "reject"  ? "Rejected" : a.status;
      const histEntry = {
        approve:    { label: "Request approved by HR",          time: "Just now", actor: "You" },
        reject:     { label: "Request rejected by HR",          time: "Just now", actor: "You" },
        "more-info":{ label: "More information requested",      time: "Just now", actor: "You" },
      }[action];
      return { ...a, status: newStatus, history: [histEntry, ...a.history] };
    }));
  }

  const handleSearchNavigate = (moduleName: string, childId?: string) => {
    setTasksPage(false);
    setApprovalsCenter(false);
    setCalPage(false);
    setNotesPage(false);
    setNotifPage(false);
    setActiveDrawer(null);

    const canon = SLUG_TO_MODULE[moduleName.toLowerCase()] || moduleName;
    if (childId) {
      const parent = getParentModuleForChild(childId);
      if (parent) {
        handleSelectChild(parent.id, childId, childId);
        return;
      }
    }
    handleSelectModule(canon);
  };

  return (
    <div style={{ height: "100%", background: C.workspace, fontFamily: "'Inter', system-ui, sans-serif" }}>
      <TopNav
        activeModule={activeModule}
        onNavigate={handleSearchNavigate}
        searchQuery={searchQuery}
        isSearchActive={searchExecuted}
        onSearchQueryChange={setSearchQuery}
        onExecuteSearch={(q) => {
          setSearchQuery(q);
          setSearchExecuted(true);
          setTasksPage(false);
          setApprovalsCenter(false);
          setCalPage(false);
          setNotesPage(false);
          setNotifPage(false);
          setActiveDrawer(null);
        }}
        onClearSearch={() => {
          setSearchQuery("");
          setSearchExecuted(false);
        }}
        onToggleAI={() => { setAiOpen(v => !v); setNotifOpen(false); }}
        aiOpen={aiOpen}
        notifs={notifs}
        notifOpen={notifOpen}
        onToggleNotifs={() => {
          if (!notifOpen && activeDrawer) setActiveDrawer(null);
          setNotifOpen(v => !v);
        }}
        onCloseNotifs={() => setNotifOpen(false)}
        onMarkRead={handleMarkRead}
        onMarkAllRead={handleMarkAllRead}
        onViewAllNotifs={() => {
          setNotifOpen(false);
          setActiveDrawer(null);
          setTasksPage(false);
          setViewingTaskId(null);
          setApprovalsCenter(false);
          setReviewingId(null);
          setCalPage(false);
          setNotesPage(false);
          setNotifPage(true);
        }}
        onOpenSettings={() => handleDrawerToggle("settings")}
        settingsOpen={activeDrawer === "settings"}
      />
      <LeftNav
        activeItem={activeModule}
        activeChildId={activeChildId}
        onSelectItem={handleSelectModule}
        onSelectChild={handleSelectChild}
      />
      <RightNav
        railOpen={railOpen}
        setRailOpen={setRailOpen}
        aiOpen={aiOpen}
        activeDrawer={activeDrawer}
        onDrawerToggle={handleDrawerToggle}
      />
      <BottomBar />

      {(() => {
        // While loading: use revealConfig (the clicked target) so the circular
        // reveal always shows the item the user just clicked — not the old drawer.
        const utilCfg = drawerLoading && revealConfig
          ? revealConfig
          : getRightUtilityConfig(activeDrawer);
        if (!utilCfg) return null;

        if (utilCfg.id === "tasks") {
          return (
            <UtilityDrawerShell config={utilCfg} railW={railW} loading={drawerLoading} onClose={() => setActiveDrawer(null)}>
              <TaskDrawer
                tasks={tasks}
                onClose={() => setActiveDrawer(null)}
                onViewAll={() => { setActiveDrawer(null); setTasksPage(true); setViewingTaskId(null); }}
                onOpen={id => { setActiveDrawer(null); setTasksPage(false); setViewingTaskId(id); }}
                onComplete={handleTaskComplete}
                onAddTask={() => setAddTaskOpen(true)}
              />
            </UtilityDrawerShell>
          );
        }

        if (utilCfg.id === "approvals") {
          return (
            <UtilityDrawerShell config={utilCfg} railW={railW} loading={drawerLoading} onClose={() => setActiveDrawer(null)}>
              <ApprovalDrawer
                approvals={approvals}
                onClose={() => setActiveDrawer(null)}
                onViewAll={() => { setActiveDrawer(null); setApprovalsCenter(true); setReviewingId(null); }}
                onReview={id => { setActiveDrawer(null); setApprovalsCenter(false); setReviewingId(id); }}
              />
            </UtilityDrawerShell>
          );
        }

        if (utilCfg.id === "calendar") {
          return (
            <UtilityDrawerShell config={utilCfg} railW={railW} loading={drawerLoading} onClose={() => setActiveDrawer(null)}>
              <ScheduleDrawer
                events={events}
                onClose={() => setActiveDrawer(null)}
                onViewAll={() => { setActiveDrawer(null); setCalPage(true); }}
                onCreateEvent={() => setCreateEventOpen(true)}
              />
            </UtilityDrawerShell>
          );
        }

        if (utilCfg.id === "documents") {
          return (
            <UtilityDrawerShell config={utilCfg} railW={railW} loading={drawerLoading} onClose={() => setActiveDrawer(null)}>
              <NotesDrawer
                notes={notes}
                onClose={() => setActiveDrawer(null)}
                onViewAll={() => { setActiveDrawer(null); setNotesPage(true); }}
                onSave={handleSaveNote}
                onDelete={handleDeleteNote}
                onPin={handlePinNote}
                onConvertToTask={handleCreateTask}
              />
            </UtilityDrawerShell>
          );
        }

        if (utilCfg.id === "settings") {
          return (
            <UtilityDrawerShell config={utilCfg} railW={railW} loading={drawerLoading} onClose={() => setActiveDrawer(null)}>
              <CustomizeDrawer onClose={() => setActiveDrawer(null)} />
            </UtilityDrawerShell>
          );
        }

        return null;
      })()}

      {/* ── Create Event overlay ── */}
      {createEventOpen && (
        <div style={{
          position:"fixed", top:60, bottom:36,
          left:leftW, right:railW + drawerW,
          zIndex:200,
          display:"flex", alignItems:"center", justifyContent:"center",
          background: C.overlay,
          backdropFilter:"blur(2px)",
        }}>
          <CreateEventPanel onClose={() => setCreateEventOpen(false)} onCreate={handleCreateEvent} />
        </div>
      )}

      {/* ── Add Task overlay ── */}
      {addTaskOpen && (
        <div style={{
          position:"fixed", top:60, bottom:36,
          left:leftW, right:railW + drawerW,
          zIndex:200,
          display:"flex", alignItems:"center", justifyContent:"center",
          background: C.overlay,
          backdropFilter:"blur(2px)",
        }}>
          <AddTaskPanel onClose={() => setAddTaskOpen(false)} onCreate={handleCreateTask} />
        </div>
      )}

      {/* ── Workspace + AI panel ── */}
      <div style={{
        position: "fixed",
        top: 60, bottom: 36,
        left: leftW,
        right: railW + drawerW,
        display: "flex",
        transition: "right 0.2s cubic-bezier(0.4,0,0.2,1)",
        overflow: "hidden",
      }}>
        {/* Main Workspace */}
        <div style={{
          flex: 1,
          background: C.workspace,
          borderLeft: `1px solid ${C.border}`,
          minWidth: 0,
          overflow: "auto",
          display: "flex",
          alignItems: searchExecuted && searchQuery.trim() ? "stretch" : "center",
          justifyContent: searchExecuted && searchQuery.trim() ? "stretch" : "center",
          padding: searchExecuted && searchQuery.trim() ? 0 : "24px",
          boxSizing: "border-box",
        }}>
          {searchExecuted && searchQuery.trim() ? (
            <SearchResultsView
              query={searchQuery}
              currentModule={activeModule}
              onSelectRecord={(item) => {
                handleSearchNavigate(item.module, item.childId);
              }}
              onClearSearch={() => {
                setSearchQuery("");
                setSearchExecuted(false);
              }}
            />
          ) : (
            <BezentEmptyState
              variant={getEmptyStateTypeForModule(activeModule)}
              onPrimaryAction={() => {
                const currentType = getEmptyStateTypeForModule(activeModule);
                if (currentType === "tasks") {
                  setAddTaskOpen(true);
                } else if (currentType === "calendar") {
                  setCreateEventOpen(true);
                }
              }}
            />
          )}
        </div>

        {/* AI panel */}
        <div style={{
          width: aiOpen ? AI_PANEL_W : 0,
          overflow: "hidden",
          borderLeft: aiOpen ? `1px solid ${C.border}` : "none",
          transition: "width 0.22s cubic-bezier(0.4,0,0.2,1)",
          flexShrink: 0,
          position: "relative",
        }}>
          {aiOpen && <AIPanel onClose={() => setAiOpen(false)} />}
        </div>
      </div>
    </div>
  );
}
