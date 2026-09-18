import React from "react";
import * as L from "lucide-react";
import { SearchResultItem } from "./searchTypes";

interface SearchResultRowProps {
  item: SearchResultItem;
  isHighlighted: boolean;
  onSelect: (item: SearchResultItem) => void;
  onMouseEnter: () => void;
}

function renderItemIcon(iconName: string) {
  const size = 15;
  const strokeWidth = 1.8;
  const color = "#5F5865";

  switch (iconName) {
    case "user":
    case "user-check":
    case "user-plus":
    case "users":
      return <L.User size={size} strokeWidth={strokeWidth} color={color} />;
    case "clock":
      return <L.Clock size={size} strokeWidth={strokeWidth} color={color} />;
    case "calendar":
    case "calendar-days":
    case "calendar-check":
      return <L.Calendar size={size} strokeWidth={strokeWidth} color={color} />;
    case "laptop":
    case "monitor":
      return <L.Laptop size={size} strokeWidth={strokeWidth} color={color} />;
    case "shield":
      return <L.Shield size={size} strokeWidth={strokeWidth} color={color} />;
    case "file-text":
    case "file-spreadsheet":
    case "file-check":
      return <L.FileText size={size} strokeWidth={strokeWidth} color={color} />;
    case "award":
      return <L.Award size={size} strokeWidth={strokeWidth} color={color} />;
    case "target":
      return <L.Target size={size} strokeWidth={strokeWidth} color={color} />;
    case "play-circle":
      return <L.PlayCircle size={size} strokeWidth={strokeWidth} color={color} />;
    case "check-square":
      return <L.CheckSquare size={size} strokeWidth={strokeWidth} color={color} />;
    case "box":
    case "inbox":
      return <L.Box size={size} strokeWidth={strokeWidth} color={color} />;
    case "heart":
      return <L.Heart size={size} strokeWidth={strokeWidth} color={color} />;
    case "dollar-sign":
      return <L.DollarSign size={size} strokeWidth={strokeWidth} color={color} />;
    case "bar-chart-2":
      return <L.BarChart2 size={size} strokeWidth={strokeWidth} color={color} />;
    case "alert-circle":
    case "alert-triangle":
      return <L.AlertCircle size={size} strokeWidth={strokeWidth} color={color} />;
    default:
      return <L.Search size={size} strokeWidth={strokeWidth} color={color} />;
  }
}

export function SearchResultRow({
  item,
  isHighlighted,
  onSelect,
  onMouseEnter,
}: SearchResultRowProps) {
  return (
    <div
      onClick={() => onSelect(item)}
      onMouseEnter={onMouseEnter}
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        padding: "8px 14px",
        cursor: "pointer",
        background: isHighlighted ? "#F5EEFD" : "transparent",
        borderLeft: isHighlighted ? "3px solid #931CF5" : "3px solid transparent",
        transition: "background-color 100ms ease, border-left-color 100ms ease",
        userSelect: "none",
      }}
    >
      {/* Left content: Icon + Title & Subtitle */}
      <div style={{ display: "flex", alignItems: "center", gap: 11, minWidth: 0, flex: 1 }}>
        <div
          style={{
            width: 28,
            height: 28,
            borderRadius: 6,
            background: isHighlighted ? "#EAD7FD" : "#F4EFF7",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            flexShrink: 0,
            transition: "background-color 100ms ease",
          }}
        >
          {renderItemIcon(item.icon)}
        </div>

        <div style={{ minWidth: 0, flex: 1 }}>
          <div
            style={{
              fontSize: 12.5,
              fontWeight: 600,
              color: "#17111D",
              lineHeight: 1.3,
              whiteSpace: "nowrap",
              overflow: "hidden",
              textOverflow: "ellipsis",
            }}
          >
            {item.title}
          </div>
          <div
            style={{
              fontSize: 11,
              fontWeight: 400,
              color: "#625A68",
              lineHeight: 1.3,
              whiteSpace: "nowrap",
              overflow: "hidden",
              textOverflow: "ellipsis",
              marginTop: 1,
            }}
          >
            {item.subtitle}
          </div>
        </div>
      </div>

      {/* Right Content: Badge / MetaRight / Module */}
      <div style={{ display: "flex", alignItems: "center", gap: 8, flexShrink: 0, marginLeft: 12 }}>
        {item.badge && (
          <span
            style={{
              fontSize: 10,
              fontWeight: 600,
              color: item.badge.color || "#17111D",
              background: item.badge.bg || "#F4EFF7",
              padding: "2px 7px",
              borderRadius: 99,
              letterSpacing: "0.02em",
              whiteSpace: "nowrap",
            }}
          >
            {item.badge.text}
          </span>
        )}

        {item.metaRight && (
          <span
            style={{
              fontSize: 11,
              fontWeight: 450,
              color: "#8A828F",
              whiteSpace: "nowrap",
            }}
          >
            {item.metaRight}
          </span>
        )}

        <span
          style={{
            fontSize: 9.5,
            fontWeight: 700,
            color: "#8A828F",
            background: "#F5EEFD",
            padding: "1px 6px",
            borderRadius: 4,
            textTransform: "uppercase",
            letterSpacing: "0.05em",
          }}
        >
          {item.module}
        </span>
      </div>
    </div>
  );
}
