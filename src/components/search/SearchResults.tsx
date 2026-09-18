import React, { useEffect, useRef } from "react";
import { SearchResultItem, SearchModuleKey } from "./searchTypes";
import { SearchResultRow } from "./SearchResultRow";
import { getModuleDisplayName } from "./searchData";

interface SearchResultsProps {
  currentModuleKey: SearchModuleKey;
  currentModuleItems: SearchResultItem[];
  otherModuleItems: SearchResultItem[];
  allRankedItems: SearchResultItem[];
  selectedIndex: number;
  onSelect: (item: SearchResultItem) => void;
  onHoverIndex: (index: number) => void;
}

export function SearchResults({
  currentModuleKey,
  currentModuleItems,
  otherModuleItems,
  allRankedItems,
  selectedIndex,
  onSelect,
  onHoverIndex,
}: SearchResultsProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const currentModuleName = getModuleDisplayName(currentModuleKey);

  // Auto-scroll highlighted item into view if navigating with keyboard
  useEffect(() => {
    if (containerRef.current) {
      const activeEl = containerRef.current.querySelector<HTMLElement>(`[data-highlighted="true"]`);
      if (activeEl) {
        activeEl.scrollIntoView({ block: "nearest" });
      }
    }
  }, [selectedIndex]);

  let globalCounter = 0;

  return (
    <div
      ref={containerRef}
      style={{
        maxHeight: 330,
        overflowY: "auto",
        display: "flex",
        flexDirection: "column",
        background: "#FFFFFF",
      }}
    >
      {/* Current Module Section if there are matches in current module */}
      {currentModuleItems.length > 0 && (
        <div>
          <div
            style={{
              padding: "7px 16px 5px",
              fontSize: 10,
              fontWeight: 700,
              color: "#8A828F",
              textTransform: "uppercase",
              letterSpacing: "0.06em",
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              background: "#FAF7FC",
              borderBottom: "1px solid #F0EBF3",
            }}
          >
            <span>In {currentModuleName}</span>
            <span style={{ fontSize: 9.5, fontWeight: 500, color: "#8A828F" }}>
              {currentModuleItems.length} {currentModuleItems.length === 1 ? "match" : "matches"}
            </span>
          </div>
          {currentModuleItems.map((item) => {
            const index = globalCounter++;
            return (
              <div key={item.id} data-highlighted={selectedIndex === index}>
                <SearchResultRow
                  item={item}
                  isHighlighted={selectedIndex === index}
                  onSelect={onSelect}
                  onMouseEnter={() => onHoverIndex(index)}
                />
              </div>
            );
          })}
        </div>
      )}

      {/* Other BEZENT Modules Section */}
      {otherModuleItems.length > 0 && (
        <div style={{ borderTop: currentModuleItems.length > 0 ? "1px solid #E8E3EB" : "none" }}>
          <div
            style={{
              padding: "7px 16px 5px",
              fontSize: 10,
              fontWeight: 700,
              color: "#8A828F",
              textTransform: "uppercase",
              letterSpacing: "0.06em",
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              background: "#FAF7FC",
              borderBottom: "1px solid #F0EBF3",
            }}
          >
            <span>Other Results across BEZENT</span>
            <span style={{ fontSize: 9.5, fontWeight: 500, color: "#8A828F" }}>
              {otherModuleItems.length} {otherModuleItems.length === 1 ? "result" : "results"}
            </span>
          </div>
          {otherModuleItems.map((item) => {
            const index = globalCounter++;
            return (
              <div key={item.id} data-highlighted={selectedIndex === index}>
                <SearchResultRow
                  item={item}
                  isHighlighted={selectedIndex === index}
                  onSelect={onSelect}
                  onMouseEnter={() => onHoverIndex(index)}
                />
              </div>
            );
          })}
        </div>
      )}

      {/* Enter hint footer row */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "7px 16px",
          borderTop: "1px solid #E8E3EB",
          background: "#FAF7FC",
          fontSize: 11,
          color: "#8A828F",
        }}
      >
        <span>
          Use <strong style={{ color: "#17111D", fontWeight: 600 }}>↑</strong>{" "}
          <strong style={{ color: "#17111D", fontWeight: 600 }}>↓</strong> to navigate
        </span>
        <span>
          Press <strong style={{ color: "#17111D", fontWeight: 600 }}>Enter ↵</strong> to select
        </span>
      </div>
    </div>
  );
}
