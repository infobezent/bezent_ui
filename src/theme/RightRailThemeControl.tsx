import { useState } from "react";
import { useTheme } from "./ThemeContext";
import { Moon, Sun } from "lucide-react";

export function RightRailThemeControl() {
  const { mode, toggleTheme } = useTheme();
  const [hov, setHov] = useState(false);

  const isDark = mode === "dark";
  const tooltipLabel = isDark ? "Switch to light mode" : "Switch to dark mode";
  const Icon = isDark ? Sun : Moon;

  return (
    <div style={{ position: "relative", display: "flex", justifyContent: "center" }}>
      <button
        type="button"
        aria-label={tooltipLabel}
        onClick={toggleTheme}
        onMouseEnter={() => setHov(true)}
        onMouseLeave={() => setHov(false)}
        style={{
          width: 38,
          height: 38,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          borderRadius: 10,
          border: "none",
          cursor: "pointer",
          background: hov
            ? isDark
              ? "rgba(147, 28, 245, 0.10)"
              : "#FBE8FF"
            : "transparent",
          transition: "background-color 180ms ease, color 180ms ease, border-color 180ms ease",
          outline: "none",
          padding: 0,
        }}
      >
        <Icon
          size={19}
          strokeWidth={1.8}
          color={isDark ? (hov ? "var(--icon-hover)" : "var(--icon-default)") : "#2D064D"}
          style={{
            transition: "color 180ms ease, opacity 180ms ease",
          }}
        />
      </button>

      {/* Tooltip on hover */}
      {hov && (
        <div
          role="tooltip"
          style={{
            position: "absolute",
            right: "calc(100% + 8px)",
            top: "50%",
            transform: "translateY(-50%)",
            background: "var(--bg-popup)",
            color: "var(--text-primary)",
            border: "1px solid var(--border-default)",
            fontSize: 11,
            fontWeight: 500,
            lineHeight: 1,
            padding: "5px 8px",
            borderRadius: 6,
            whiteSpace: "nowrap",
            pointerEvents: "none",
            zIndex: 300,
            boxShadow: "var(--shadow-dropdown)",
          }}
        >
          {tooltipLabel}
        </div>
      )}
    </div>
  );
}

export default RightRailThemeControl;
