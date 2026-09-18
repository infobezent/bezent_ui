import { useState, useMemo } from "react";
import * as L from "lucide-react";
import { SearchResultItem, SearchModuleKey } from "./searchTypes";
import { searchBEZENTRecords, getSearchModuleKey } from "./searchData";

interface SearchResultsViewProps {
  query: string;
  currentModule: string;
  onSelectRecord: (item: SearchResultItem) => void;
  onClearSearch: () => void;
}

function renderWorkspaceIcon(iconName: string, color: string) {
  const size = 16;
  const strokeWidth = 1.8;

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

export function SearchResultsView({
  query,
  currentModule,
  onSelectRecord,
  onClearSearch,
}: SearchResultsViewProps) {
  const [selectedModuleFilter, setSelectedModuleFilter] = useState<string>("all");
  const [hoveredRowId, setHoveredRowId] = useState<string | null>(null);

  const currentModuleKey: SearchModuleKey = useMemo(
    () => getSearchModuleKey(currentModule),
    [currentModule]
  );

  // Search results scored and prioritized
  const searchResults = useMemo(() => {
    return searchBEZENTRecords({
      query,
      currentModuleKey,
      limit: 50,
    });
  }, [query, currentModuleKey]);

  // Distinct modules present in results for filter tabs
  const availableModules = useMemo(() => {
    const map = new Map<string, number>();
    searchResults.items.forEach((item) => {
      map.set(item.module, (map.get(item.module) || 0) + 1);
    });
    return Array.from(map.entries()).map(([name, count]) => ({ name, count }));
  }, [searchResults]);

  // Filter items if a specific module filter is selected
  const filteredItems = useMemo(() => {
    if (selectedModuleFilter === "all") return searchResults.items;
    return searchResults.items.filter((item) => item.module === selectedModuleFilter);
  }, [searchResults, selectedModuleFilter]);

  // Group items by module, keeping current module at top
  const groupedSections = useMemo(() => {
    const groups: { module: string; moduleKey: SearchModuleKey; items: SearchResultItem[] }[] = [];
    const seenModules = new Set<string>();

    // First: current module items if any match
    const currentModItems = filteredItems.filter((i) => i.moduleKey === currentModuleKey);
    if (currentModItems.length > 0) {
      groups.push({
        module: currentModItems[0].module,
        moduleKey: currentModuleKey,
        items: currentModItems,
      });
      seenModules.add(currentModItems[0].module);
    }

    // Second: other module items grouped in priority order
    filteredItems.forEach((item) => {
      if (!seenModules.has(item.module)) {
        seenModules.add(item.module);
        groups.push({
          module: item.module,
          moduleKey: item.moduleKey,
          items: filteredItems.filter((i) => i.module === item.module),
        });
      }
    });

    return groups;
  }, [filteredItems, currentModuleKey]);

  return (
    <div
      style={{
        flex: 1,
        height: "100%",
        overflowY: "auto",
        background: "var(--bg-workspace, #FAF8FB)",
        color: "var(--text-primary, #17111D)",
        padding: "24px 32px 48px",
        boxSizing: "border-box",
        fontFamily: "inherit",
      }}
    >
      <div style={{ maxWidth: 880, margin: "0 auto" }}>
        {/* Header Row: Breadcrumb & Title */}
        <div style={{ marginBottom: 18 }}>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 8,
              fontSize: 12,
              color: "var(--text-muted, #968D9D)",
              marginBottom: 6,
            }}
          >
            <span
              onClick={onClearSearch}
              style={{ cursor: "pointer", color: "var(--accent-primary, #931CF5)", fontWeight: 500 }}
            >
              BEZENT
            </span>
            <span>/</span>
            <span>Global Search</span>
            <span>/</span>
            <span style={{ color: "var(--text-primary, #17111D)", fontWeight: 600 }}>Results</span>
          </div>

          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: 12 }}>
            <div style={{ display: "flex", alignItems: "baseline", gap: 10 }}>
              <h1
                style={{
                  fontSize: 22,
                  fontWeight: 700,
                  color: "var(--text-primary, #17111D)",
                  margin: 0,
                  letterSpacing: "-0.3px",
                }}
              >
                Search results for &ldquo;{query}&rdquo;
              </h1>
              <span
                style={{
                  fontSize: 12,
                  fontWeight: 600,
                  color: "var(--text-secondary, #756B7D)",
                  background: "var(--bg-surface-secondary, rgba(147, 28, 245, 0.08))",
                  padding: "2px 9px",
                  borderRadius: 99,
                }}
              >
                {filteredItems.length} {filteredItems.length === 1 ? "match" : "matches"}
              </span>
            </div>

            <button
              type="button"
              onClick={onClearSearch}
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: 5,
                background: "var(--bg-surface, #FFFFFF)",
                border: "1px solid var(--border-base, #EEE5F2)",
                color: "var(--text-secondary, #756B7D)",
                fontSize: 12,
                fontWeight: 500,
                padding: "6px 12px",
                borderRadius: 8,
                cursor: "pointer",
                transition: "all 120ms ease",
                outline: "none",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.color = "var(--text-primary, #17111D)";
                e.currentTarget.style.borderColor = "var(--accent-primary, #931CF5)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.color = "var(--text-secondary, #756B7D)";
                e.currentTarget.style.borderColor = "var(--border-base, #EEE5F2)";
              }}
            >
              <L.X size={13} strokeWidth={2} />
              <span>Clear Search</span>
            </button>
          </div>
        </div>

        {/* Filter Tabs: [ All ] [ Attendance ] [ Employees ] [ Time Tracker ] ... */}
        {availableModules.length > 1 && (
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 8,
              paddingBottom: 16,
              borderBottom: "1px solid var(--border-base, #EEE5F2)",
              marginBottom: 20,
              flexWrap: "wrap",
            }}
          >
            <button
              type="button"
              onClick={() => setSelectedModuleFilter("all")}
              style={{
                height: 30,
                padding: "0 12px",
                borderRadius: 99,
                fontSize: 12,
                fontWeight: selectedModuleFilter === "all" ? 600 : 500,
                cursor: "pointer",
                border:
                  selectedModuleFilter === "all"
                    ? "1px solid var(--accent-primary, #931CF5)"
                    : "1px solid var(--border-base, #EEE5F2)",
                background:
                  selectedModuleFilter === "all"
                    ? "var(--nav-selected, #F5EEFD)"
                    : "var(--bg-surface, #FFFFFF)",
                color: "var(--text-primary, #17111D)",
                transition: "all 120ms ease",
                outline: "none",
              }}
            >
              All ({searchResults.items.length})
            </button>

            {availableModules.map((m) => {
              const isSelected = selectedModuleFilter === m.name;
              return (
                <button
                  key={m.name}
                  type="button"
                  onClick={() => setSelectedModuleFilter(m.name)}
                  style={{
                    height: 30,
                    padding: "0 12px",
                    borderRadius: 99,
                    fontSize: 12,
                    fontWeight: isSelected ? 600 : 500,
                    cursor: "pointer",
                    border: isSelected
                      ? "1px solid var(--accent-primary, #931CF5)"
                      : "1px solid var(--border-base, #EEE5F2)",
                    background: isSelected
                      ? "var(--nav-selected, #F5EEFD)"
                      : "var(--bg-surface, #FFFFFF)",
                    color: "var(--text-primary, #17111D)",
                    transition: "all 120ms ease",
                    outline: "none",
                  }}
                >
                  {m.name} ({m.count})
                </button>
              );
            })}
          </div>
        )}

        {/* Results List grouped by module */}
        {filteredItems.length === 0 ? (
          <div
            style={{
              padding: "48px 24px",
              textAlign: "center",
              background: "var(--bg-surface, #FFFFFF)",
              borderRadius: 12,
              border: "1px solid var(--border-base, #EEE5F2)",
            }}
          >
            <div
              style={{
                width: 44,
                height: 44,
                borderRadius: "50%",
                background: "var(--nav-selected, #F5EEFD)",
                color: "var(--accent-primary, #931CF5)",
                display: "inline-flex",
                alignItems: "center",
                justifyContent: "center",
                marginBottom: 12,
              }}
            >
              <L.Search size={20} strokeWidth={2} />
            </div>
            <div
              style={{
                fontSize: 15,
                fontWeight: 600,
                color: "var(--text-primary, #17111D)",
                marginBottom: 4,
              }}
            >
              No results found for &ldquo;{query}&rdquo;
            </div>
            <div
              style={{
                fontSize: 13,
                color: "var(--text-secondary, #756B7D)",
                maxWidth: 340,
                margin: "0 auto 16px",
                lineHeight: 1.4,
              }}
            >
              Try adjusting your keywords or clearing active filters to search across all BEZENT modules.
            </div>
            <button
              type="button"
              onClick={onClearSearch}
              style={{
                background: "var(--accent-primary, #931CF5)",
                color: "#FFFFFF",
                border: "none",
                fontSize: 12.5,
                fontWeight: 600,
                padding: "7px 16px",
                borderRadius: 8,
                cursor: "pointer",
              }}
            >
              Back to {currentModule}
            </button>
          </div>
        ) : (
          <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
            {groupedSections.map((section) => (
              <div
                key={section.module}
                style={{
                  background: "var(--bg-surface, #FFFFFF)",
                  borderRadius: 12,
                  border: "1px solid var(--border-base, #EEE5F2)",
                  overflow: "hidden",
                  boxShadow: "0 1px 3px rgba(0,0,0,0.02)",
                }}
              >
                {/* Module Section Header */}
                <div
                  style={{
                    padding: "10px 18px",
                    background: "var(--bg-surface-secondary, rgba(147, 28, 245, 0.03))",
                    borderBottom: "1px solid var(--border-base, #EEE5F2)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                  }}
                >
                  <span
                    style={{
                      fontSize: 11,
                      fontWeight: 700,
                      color: "var(--text-secondary, #756B7D)",
                      textTransform: "uppercase",
                      letterSpacing: "0.06em",
                    }}
                  >
                    {section.module}
                  </span>
                  <span
                    style={{
                      fontSize: 10.5,
                      fontWeight: 500,
                      color: "var(--text-muted, #968D9D)",
                    }}
                  >
                    {section.items.length} {section.items.length === 1 ? "record" : "records"}
                  </span>
                </div>

                {/* Rows within module */}
                <div style={{ display: "flex", flexDirection: "column" }}>
                  {section.items.map((item, idx) => {
                    const isHovered = hoveredRowId === item.id;
                    const isLast = idx === section.items.length - 1;

                    return (
                      <div
                        key={item.id}
                        onClick={() => onSelectRecord(item)}
                        onMouseEnter={() => setHoveredRowId(item.id)}
                        onMouseLeave={() => setHoveredRowId(null)}
                        style={{
                          height: 48,
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "space-between",
                          padding: "0 18px",
                          cursor: "pointer",
                          background: isHovered
                            ? "var(--nav-hover, rgba(147, 28, 245, 0.05))"
                            : "transparent",
                          borderBottom: isLast ? "none" : "1px solid var(--border-base, #EEE5F2)",
                          borderLeft: isHovered
                            ? "3px solid var(--accent-primary, #931CF5)"
                            : "3px solid transparent",
                          transition: "background-color 100ms ease, border-left-color 100ms ease",
                          userSelect: "none",
                          boxSizing: "border-box",
                        }}
                      >
                        {/* Left: Icon + Title & Subtitle */}
                        <div
                          style={{
                            display: "flex",
                            alignItems: "center",
                            gap: 12,
                            minWidth: 0,
                            flex: 1,
                          }}
                        >
                          <div
                            style={{
                              width: 28,
                              height: 28,
                              borderRadius: 6,
                              background: isHovered
                                ? "var(--nav-selected, #EAD7FD)"
                                : "var(--bg-surface-secondary, rgba(147, 28, 245, 0.06))",
                              display: "flex",
                              alignItems: "center",
                              justifyContent: "center",
                              flexShrink: 0,
                              transition: "background-color 100ms ease",
                            }}
                          >
                            {renderWorkspaceIcon(
                              item.icon,
                              isHovered ? "var(--accent-primary, #931CF5)" : "var(--text-secondary, #756B7D)"
                            )}
                          </div>

                          <div style={{ minWidth: 0, flex: 1 }}>
                            <div
                              style={{
                                fontSize: 13,
                                fontWeight: 600,
                                color: "var(--text-primary, #17111D)",
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
                                fontSize: 11.5,
                                color: "var(--text-secondary, #756B7D)",
                                lineHeight: 1.3,
                                whiteSpace: "nowrap",
                                overflow: "hidden",
                                textOverflow: "ellipsis",
                              }}
                            >
                              {item.subtitle}
                            </div>
                          </div>
                        </div>

                        {/* Right: Badge / MetaRight / Open Arrow */}
                        <div
                          style={{
                            display: "flex",
                            alignItems: "center",
                            gap: 10,
                            flexShrink: 0,
                            marginLeft: 16,
                          }}
                        >
                          {item.badge && (
                            <span
                              style={{
                                fontSize: 10,
                                fontWeight: 600,
                                color: item.badge.color || "var(--text-primary, #17111D)",
                                background: item.badge.bg || "var(--bg-surface-secondary, #F4EFF7)",
                                padding: "2px 8px",
                                borderRadius: 99,
                                whiteSpace: "nowrap",
                              }}
                            >
                              {item.badge.text}
                            </span>
                          )}

                          {item.metaRight && (
                            <span
                              style={{
                                fontSize: 11.5,
                                color: "var(--text-muted, #968D9D)",
                                whiteSpace: "nowrap",
                              }}
                            >
                              {item.metaRight}
                            </span>
                          )}

                          <L.ChevronRight
                            size={14}
                            color={
                              isHovered
                                ? "var(--accent-primary, #931CF5)"
                                : "var(--text-muted, #968D9D)"
                            }
                            style={{
                              transition: "transform 120ms ease, color 120ms ease",
                              transform: isHovered ? "translateX(2px)" : "none",
                            }}
                          />
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
