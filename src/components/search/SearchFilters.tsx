import { useState, useRef, useEffect } from "react";
import * as L from "lucide-react";
import { FilterChipConfig, FilterChipOption } from "./searchTypes";

interface SearchFiltersProps {
  configs: FilterChipConfig[];
  activeFilterKey: string | null;
  activeFilterValue: string | null;
  onSelectFilter: (key: string, value: string) => void;
  onClearFilter: (key: string) => void;
}

export function SearchFilters({
  configs,
  activeFilterKey,
  activeFilterValue,
  onSelectFilter,
  onClearFilter,
}: SearchFiltersProps) {
  const [openDropdownId, setOpenDropdownId] = useState<string | null>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Close dropdown on click outside
  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setOpenDropdownId(null);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  if (!configs || configs.length === 0) return null;

  return (
    <div
      ref={dropdownRef}
      style={{
        display: "flex",
        alignItems: "center",
        gap: 8,
        padding: "8px 16px 10px",
        borderBottom: "1px solid #E8E3EB",
        flexWrap: "wrap",
        position: "relative",
        background: "#FFFFFF",
      }}
    >
      {configs.map((config) => {
        const isFilterActive = activeFilterKey === config.id && activeFilterValue && activeFilterValue !== "all";
        const isOpen = openDropdownId === config.id;
        const displayLabel = isFilterActive
          ? `${config.label}: ${activeFilterValue}`
          : config.label;

        return (
          <div key={config.id} style={{ position: "relative" }}>
            <button
              type="button"
              onClick={() => setOpenDropdownId(isOpen ? null : config.id)}
              style={{
                height: 28,
                padding: "0 10px",
                borderRadius: 8,
                border: isFilterActive
                  ? "1px solid #931CF5"
                  : isOpen
                  ? "1px solid #B09DC0"
                  : "1px solid #DED7E3",
                background: isFilterActive
                  ? "#F5EEFD"
                  : "#FFFFFF",
                color: "#17111D",
                fontSize: 11.5,
                fontWeight: isFilterActive ? 600 : 500,
                fontFamily: "inherit",
                cursor: "pointer",
                display: "inline-flex",
                alignItems: "center",
                gap: 5,
                transition: "all 140ms ease",
                userSelect: "none",
                outline: "none",
              }}
              onMouseEnter={(e) => {
                if (!isFilterActive) {
                  e.currentTarget.style.background = "#F9F6FC";
                  e.currentTarget.style.borderColor = "#C8BFD0";
                }
              }}
              onMouseLeave={(e) => {
                if (!isFilterActive) {
                  e.currentTarget.style.background = "#FFFFFF";
                  e.currentTarget.style.borderColor = isOpen ? "#B09DC0" : "#DED7E3";
                }
              }}
            >
              <span>{displayLabel}</span>
              {isFilterActive ? (
                <span
                  onClick={(e) => {
                    e.stopPropagation();
                    onClearFilter(config.id);
                  }}
                  title="Clear filter"
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                    justifyContent: "center",
                    width: 14,
                    height: 14,
                    borderRadius: "50%",
                    color: "#5F5865",
                    marginLeft: 2,
                  }}
                >
                  <L.X size={11} strokeWidth={2.2} />
                </span>
              ) : (
                <L.ChevronDown
                  size={12}
                  color="#5F5865"
                  style={{
                    transform: isOpen ? "rotate(180deg)" : "none",
                    transition: "transform 140ms ease",
                  }}
                />
              )}
            </button>

            {/* Dropdown menu */}
            {isOpen && (
              <div
                style={{
                  position: "absolute",
                  top: 34,
                  left: 0,
                  zIndex: 300,
                  background: "#FFFFFF",
                  border: "1px solid #DED7E3",
                  borderRadius: 8,
                  boxShadow: "0 10px 24px rgba(23, 17, 29, 0.12), 0 2px 6px rgba(23, 17, 29, 0.04)",
                  padding: "4px 0",
                  minWidth: 160,
                  maxWidth: 240,
                }}
              >
                <div
                  style={{
                    padding: "5px 12px 4px",
                    fontSize: 10,
                    fontWeight: 700,
                    color: "#8A828F",
                    textTransform: "uppercase",
                    letterSpacing: "0.06em",
                    borderBottom: "1px solid #F0EBF3",
                  }}
                >
                  Filter by {config.label}
                </div>
                {config.options.map((opt: FilterChipOption) => {
                  const isSelected =
                    (opt.value === "all" && !isFilterActive) ||
                    (isFilterActive && activeFilterValue === opt.value);

                  return (
                    <div
                      key={opt.value}
                      onClick={() => {
                        if (opt.value === "all") {
                          onClearFilter(config.id);
                        } else {
                          onSelectFilter(config.id, opt.value);
                        }
                        setOpenDropdownId(null);
                      }}
                      style={{
                        padding: "7px 12px",
                        fontSize: 12,
                        color: "#17111D",
                        fontWeight: isSelected ? 600 : 450,
                        cursor: "pointer",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "space-between",
                        background: isSelected ? "#F5EEFD" : "transparent",
                        transition: "background-color 100ms ease",
                      }}
                      onMouseEnter={(e) => {
                        if (!isSelected) e.currentTarget.style.background = "#F9F6FC";
                      }}
                      onMouseLeave={(e) => {
                        if (!isSelected) e.currentTarget.style.background = "transparent";
                      }}
                    >
                      <span>{opt.label}</span>
                      {isSelected && <L.Check size={13} color="#931CF5" strokeWidth={2.2} />}
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}
