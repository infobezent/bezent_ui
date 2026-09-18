import { useState, useRef, useEffect } from "react";
import { useTheme, ThemeMode } from "./ThemeContext";
import { Sun, Moon, Monitor, Check } from "lucide-react";

export interface ThemeToggleProps {
  variant?: "icon-dropdown" | "segmented" | "button";
  className?: string;
  style?: React.CSSProperties;
}

export function ThemeToggle({ variant = "icon-dropdown", className, style }: ThemeToggleProps) {
  const { mode, resolvedTheme, setMode } = useTheme();
  const [open, setOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const [hoveredOption, setHoveredOption] = useState<string | null>(null);

  // Close dropdown on click outside or escape key
  useEffect(() => {
    if (!open) return;

    function handleClickOutside(e: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }

    function handleKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape") {
        setOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [open]);

  const options: { id: ThemeMode; label: string; icon: typeof Sun; description: string }[] = [
    { id: "light", label: "Light", icon: Sun, description: "Classic light workspace" },
    { id: "dark", label: "Dark", icon: Moon, description: "Modern dark enterprise theme" },
    { id: "system", label: "System", icon: Monitor, description: "Sync with OS preference" },
  ];

  if (variant === "segmented") {
    return (
      <div
        role="radiogroup"
        aria-label="Theme selection"
        className={className}
        style={{
          display: "inline-flex",
          alignItems: "center",
          padding: 3,
          borderRadius: 10,
          background: "var(--bg-search)",
          border: "1px solid var(--border-default)",
          gap: 2,
          ...style,
        }}
      >
        {options.map((opt) => {
          const isSelected = mode === opt.id;
          const Icon = opt.icon;
          return (
            <button
              key={opt.id}
              type="button"
              role="radio"
              aria-checked={isSelected}
              onClick={() => setMode(opt.id)}
              title={`${opt.label} Mode`}
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: 6,
                padding: "4px 10px",
                borderRadius: 7,
                fontSize: 12,
                fontWeight: isSelected ? 600 : 500,
                color: isSelected ? "var(--text-primary)" : "var(--text-secondary)",
                background: isSelected ? "var(--bg-surface)" : "transparent",
                border: "none",
                boxShadow: isSelected ? "0 1px 3px rgba(0,0,0,0.08)" : "none",
                cursor: "pointer",
                transition: "all 0.15s ease",
              }}
            >
              <Icon size={14} strokeWidth={isSelected ? 2.2 : 1.8} />
              <span>{opt.label}</span>
            </button>
          );
        })}
      </div>
    );
  }

  // Default: icon button with modern flyout menu
  const ActiveIcon = mode === "dark" ? Moon : mode === "light" ? Sun : Monitor;

  return (
    <div ref={dropdownRef} style={{ position: "relative", display: "inline-block", ...style }} className={className}>
      <button
        type="button"
        aria-label={`Theme: ${mode} mode (click to change)`}
        aria-expanded={open}
        aria-haspopup="menu"
        onClick={() => setOpen((prev) => !prev)}
        style={{
          width: 34,
          height: 34,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          borderRadius: 8,
          border: open ? "1px solid var(--accent-primary)" : "1px solid transparent",
          background: open ? "var(--bg-selected)" : "transparent",
          color: open ? "var(--accent-primary)" : "var(--icon-default)",
          cursor: "pointer",
          transition: "background 0.15s ease, border-color 0.15s ease, color 0.15s ease",
        }}
        onMouseEnter={(e) => {
          if (!open) {
            e.currentTarget.style.background = "var(--bg-hover)";
            e.currentTarget.style.color = "var(--accent-heading)";
          }
        }}
        onMouseLeave={(e) => {
          if (!open) {
            e.currentTarget.style.background = "transparent";
            e.currentTarget.style.color = "var(--icon-default)";
          }
        }}
      >
        <ActiveIcon size={17} strokeWidth={1.9} />
      </button>

      {open && (
        <div
          role="menu"
          aria-orientation="vertical"
          style={{
            position: "absolute",
            top: "calc(100% + 8px)",
            right: 0,
            width: 210,
            padding: "6px",
            borderRadius: 12,
            background: "var(--bg-popup)",
            border: "1px solid var(--border-default)",
            boxShadow: "var(--shadow-dropdown)",
            zIndex: 400,
            display: "flex",
            flexDirection: "column",
            gap: 3,
            animation: "drawerContentIn 0.15s ease forwards",
          }}
        >
          <div
            style={{
              padding: "6px 10px 4px",
              fontSize: 10,
              fontWeight: 700,
              textTransform: "uppercase",
              letterSpacing: "0.5px",
              color: "var(--text-muted)",
              userSelect: "none",
            }}
          >
            Appearance
          </div>

          {options.map((opt) => {
            const isSelected = mode === opt.id;
            const isHovered = hoveredOption === opt.id;
            const Icon = opt.icon;

            return (
              <button
                key={opt.id}
                type="button"
                role="menuitemradio"
                aria-checked={isSelected}
                onClick={() => {
                  setMode(opt.id);
                  setOpen(false);
                }}
                onMouseEnter={() => setHoveredOption(opt.id)}
                onMouseLeave={() => setHoveredOption(null)}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 10,
                  width: "100%",
                  padding: "7px 10px",
                  borderRadius: 8,
                  border: "none",
                  background: isSelected
                    ? "var(--nav-selected)"
                    : isHovered
                    ? "var(--bg-hover)"
                    : "transparent",
                  color: isSelected || isHovered
                    ? "var(--text-primary)"
                    : "var(--text-secondary)",
                  cursor: "pointer",
                  textAlign: "left",
                  fontFamily: "inherit",
                  transition: "all 0.12s ease",
                }}
              >
                <span
                  style={{
                    width: 26,
                    height: 26,
                    borderRadius: 6,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    background: isSelected ? "var(--bg-surface)" : "var(--bg-search)",
                    color: isSelected ? "var(--accent-primary)" : "var(--icon-default)",
                    flexShrink: 0,
                  }}
                >
                  <Icon size={14} strokeWidth={isSelected ? 2.2 : 1.8} />
                </span>

                <div style={{ flex: 1, minWidth: 0 }}>
                  <div
                    style={{
                      fontSize: 12.5,
                      fontWeight: isSelected ? 600 : 500,
                      lineHeight: 1.2,
                    }}
                  >
                    {opt.label}
                  </div>
                  <div
                    style={{
                      fontSize: 10.5,
                      color: "var(--text-muted)",
                      lineHeight: 1.2,
                      marginTop: 1,
                    }}
                  >
                    {opt.description}
                  </div>
                </div>

                {isSelected && (
                  <Check size={14} color="var(--accent-primary)" strokeWidth={2.5} />
                )}
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}

export default ThemeToggle;
