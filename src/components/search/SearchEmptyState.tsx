import React from "react";
import * as L from "lucide-react";
import { ContextSuggestion, SearchModuleKey } from "./searchTypes";
import { getModuleDisplayName } from "./searchData";

interface SearchEmptyStateProps {
  type: "suggestions" | "no-results" | "loading";
  currentModuleKey: SearchModuleKey;
  suggestions: ContextSuggestion[];
  onSelectSuggestion: (sug: ContextSuggestion) => void;
  onClearFiltersAndSearchAll: () => void;
}

export function SearchEmptyState({
  type,
  currentModuleKey,
  suggestions,
  onSelectSuggestion,
  onClearFiltersAndSearchAll,
}: SearchEmptyStateProps) {
  if (type === "loading") {
    return (
      <div style={{ padding: "12px 16px", display: "flex", flexDirection: "column", gap: 8 }}>
        {[1, 2, 3].map((n) => (
          <div
            key={n}
            style={{
              display: "flex",
              alignItems: "center",
              gap: 12,
              padding: "8px 0",
              animation: "pulse 1.4s ease-in-out infinite",
            }}
          >
            <div style={{ width: 28, height: 28, borderRadius: 6, background: "#F0EBF3" }} />
            <div style={{ flex: 1, display: "flex", flexDirection: "column", gap: 5 }}>
              <div style={{ width: "45%", height: 12, borderRadius: 4, background: "#F0EBF3" }} />
              <div style={{ width: "70%", height: 10, borderRadius: 4, background: "#F5F0F8" }} />
            </div>
          </div>
        ))}
      </div>
    );
  }

  if (type === "no-results") {
    return (
      <div
        style={{
          padding: "28px 20px",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          textAlign: "center",
          background: "#FFFFFF",
        }}
      >
        <div
          style={{
            width: 38,
            height: 38,
            borderRadius: "50%",
            background: "#F5EEFD",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            marginBottom: 10,
            color: "#931CF5",
          }}
        >
          <L.Search size={18} strokeWidth={2} />
        </div>
        <div style={{ fontSize: 13.5, fontWeight: 600, color: "#17111D", marginBottom: 3 }}>
          No results found
        </div>
        <div style={{ fontSize: 12, color: "#625A68", maxWidth: 300, lineHeight: 1.4, marginBottom: 14 }}>
          Try another keyword or adjust your filters.
        </div>
        <button
          type="button"
          onClick={onClearFiltersAndSearchAll}
          style={{
            background: "none",
            border: "none",
            color: "#931CF5",
            fontSize: 12.5,
            fontWeight: 600,
            cursor: "pointer",
            display: "inline-flex",
            alignItems: "center",
            gap: 4,
            padding: "4px 8px",
            borderRadius: 6,
            outline: "none",
            transition: "opacity 120ms ease",
          }}
          onMouseEnter={(e) => (e.currentTarget.style.textDecoration = "underline")}
          onMouseLeave={(e) => (e.currentTarget.style.textDecoration = "none")}
        >
          <span>Search all BEZENT</span>
          <L.ArrowRight size={13} strokeWidth={2.2} />
        </button>
      </div>
    );
  }

  // "suggestions" state
  const moduleName = getModuleDisplayName(currentModuleKey);
  const isDashboard = currentModuleKey === "dashboard";
  const headingText = isDashboard
    ? "RECENT & RELEVANT"
    : `SUGGESTIONS FOR ${moduleName.toUpperCase()}`;

  return (
    <div style={{ padding: "6px 0", background: "#FFFFFF" }}>
      <div
        style={{
          padding: "6px 16px 4px",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <span
          style={{
            fontSize: 10,
            fontWeight: 700,
            color: "#8A828F",
            textTransform: "uppercase",
            letterSpacing: "0.06em",
          }}
        >
          {headingText}
        </span>
        <span style={{ fontSize: 10, color: "#8A828F" }}>
          {isDashboard ? "Cross-module search" : "Based on current view"}
        </span>
      </div>

      <div style={{ display: "flex", flexDirection: "column" }}>
        {suggestions.map((sug) => {
          const itemTag = sug.sourceModuleLabel || getModuleDisplayName(sug.moduleKey);
          return (
            <div
              key={sug.id}
              onClick={() => onSelectSuggestion(sug)}
              style={{
                display: "flex",
                alignItems: "center",
                gap: 12,
                padding: "8px 16px",
                cursor: "pointer",
                userSelect: "none",
                transition: "background-color 100ms ease",
              }}
              onMouseEnter={(e) => (e.currentTarget.style.background = "#F9F6FC")}
              onMouseLeave={(e) => (e.currentTarget.style.background = "transparent")}
            >
              <div
                style={{
                  width: 24,
                  height: 24,
                  borderRadius: 6,
                  background: "#F4EFF7",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  color: "#5F5865",
                  flexShrink: 0,
                }}
              >
                <L.Clock size={13} strokeWidth={2} />
              </div>

              <span
                style={{
                  fontSize: 12.5,
                  color: "#17111D",
                  fontWeight: 500,
                  flex: 1,
                  whiteSpace: "nowrap",
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                }}
              >
                {sug.label}
              </span>

              <span
                style={{
                  fontSize: 10,
                  color: "#8A828F",
                  background: "#F5EEFD",
                  padding: "2px 7px",
                  borderRadius: 4,
                  fontWeight: 600,
                }}
              >
                {itemTag}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
