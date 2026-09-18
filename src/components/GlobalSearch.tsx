import { useState, useRef, useEffect, useMemo, useCallback } from "react";
import * as L from "lucide-react";
import { BezentIcon } from "../design-system/icons";
import { SearchModuleKey, SearchResultItem, ContextSuggestion } from "./search/searchTypes";
import {
  getSearchModuleKey,
  MODULE_FILTER_CONFIGS,
  MODULE_SUGGESTIONS,
  searchBEZENTRecords,
} from "./search/searchData";
import { SearchFilters } from "./search/SearchFilters";
import { SearchResults } from "./search/SearchResults";
import { SearchEmptyState } from "./search/SearchEmptyState";

interface GlobalSearchProps {
  maxWidth?: number;
  activeModule?: string;
  searchQuery?: string;
  isSearchActive?: boolean;
  onSearchQueryChange?: (q: string) => void;
  onExecuteSearch?: (q: string) => void;
  onClearSearch?: () => void;
  onNavigate?: (moduleName: string, childId?: string) => void;
}

export function GlobalSearch({
  maxWidth = 440,
  activeModule,
  searchQuery,
  isSearchActive,
  onSearchQueryChange,
  onExecuteSearch,
  onClearSearch,
  onNavigate,
}: GlobalSearchProps) {
  const [internalQuery, setInternalQuery] = useState("");
  const query = searchQuery !== undefined ? searchQuery : internalQuery;

  const [isDiscoveryOpen, setIsDiscoveryOpen] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [activeFilterKey, setActiveFilterKey] = useState<string | null>(null);
  const [activeFilterValue, setActiveFilterValue] = useState<string | null>(null);
  const [selectedIndex, setSelectedIndex] = useState(0);

  const containerRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleQueryChange = (val: string) => {
    if (searchQuery === undefined) {
      setInternalQuery(val);
    }
    if (onSearchQueryChange) {
      onSearchQueryChange(val);
    }
    setIsDiscoveryOpen(true);
  };

  // Derive current module key from props or window route
  const currentModuleKey: SearchModuleKey = useMemo(() => {
    if (activeModule) {
      return getSearchModuleKey(activeModule);
    }
    if (typeof window !== "undefined" && window.location.hash) {
      return getSearchModuleKey(window.location.hash);
    }
    return "dashboard";
  }, [activeModule]);

  // Contextual filter chips for the current module
  const filterConfigs = useMemo(() => {
    return MODULE_FILTER_CONFIGS[currentModuleKey] || MODULE_FILTER_CONFIGS.dashboard;
  }, [currentModuleKey]);

  // Contextual suggestions for the current module
  const suggestions: ContextSuggestion[] = useMemo(() => {
    return MODULE_SUGGESTIONS[currentModuleKey] || MODULE_SUGGESTIONS.dashboard;
  }, [currentModuleKey]);

  // Ranked search results
  const searchResults = useMemo(() => {
    return searchBEZENTRecords({
      query,
      currentModuleKey,
      activeFilterKey,
      activeFilterValue,
      limit: 15,
    });
  }, [query, currentModuleKey, activeFilterKey, activeFilterValue]);

  // Total selectable items count for keyboard navigation
  const totalItemsCount = query.trim()
    ? searchResults.items.length
    : suggestions.length;

  // Reset selected index when query or filters change
  useEffect(() => {
    setSelectedIndex(0);
  }, [query, activeFilterKey, activeFilterValue]);

  // Close discovery popup when clicking outside or pressing Escape
  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setIsDiscoveryOpen(false);
        setActiveFilterKey(null);
        setActiveFilterValue(null);
      }
    }

    function handleGlobalKeyDown(e: KeyboardEvent) {
      if (!isDiscoveryOpen) {
        // Cmd+K or Ctrl+K shortcut to focus search
        if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
          e.preventDefault();
          setIsDiscoveryOpen(true);
          inputRef.current?.focus();
        }
        return;
      }

      if (e.key === "Escape") {
        setIsDiscoveryOpen(false);
        setActiveFilterKey(null);
        setActiveFilterValue(null);
        inputRef.current?.blur();
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("keydown", handleGlobalKeyDown);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleGlobalKeyDown);
    };
  }, [isDiscoveryOpen]);

  // Execute search into main workspace (State B)
  const executeSearch = useCallback(
    (targetQuery: string) => {
      setIsDiscoveryOpen(false);
      setActiveFilterKey(null);
      setActiveFilterValue(null);

      if (onExecuteSearch) {
        onExecuteSearch(targetQuery);
      }
    },
    [onExecuteSearch]
  );

  // Handle record selection: closes discovery and either opens record or executes search
  const handleSelectResult = useCallback(
    (item: SearchResultItem) => {
      setIsDiscoveryOpen(false);
      setActiveFilterKey(null);
      setActiveFilterValue(null);

      if (onExecuteSearch) {
        onExecuteSearch(item.title);
      }

      if (onNavigate) {
        onNavigate(item.module, item.childId);
      } else if (typeof window !== "undefined") {
        const targetRoute = item.targetRoute || item.moduleKey;
        window.location.hash = `#/${targetRoute}`;
      }
    },
    [onExecuteSearch, onNavigate]
  );

  // Handle suggestion selection
  const handleSelectSuggestion = useCallback(
    (sug: ContextSuggestion) => {
      const q = sug.actionQuery || sug.label;
      handleQueryChange(q);
      executeSearch(q);
    },
    [executeSearch]
  );

  // Keyboard navigation handler
  const handleInputKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setSelectedIndex((prev) => (totalItemsCount > 0 ? (prev + 1) % totalItemsCount : 0));
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setSelectedIndex((prev) => (totalItemsCount > 0 ? (prev - 1 + totalItemsCount) % totalItemsCount : 0));
    } else if (e.key === "Enter") {
      e.preventDefault();
      if (query.trim()) {
        const selected = searchResults.items[selectedIndex];
        if (selected && isDiscoveryOpen && selectedIndex > 0) {
          handleSelectResult(selected);
        } else {
          executeSearch(query.trim());
        }
      } else {
        const selectedSug = suggestions[selectedIndex];
        if (selectedSug) {
          handleSelectSuggestion(selectedSug);
        }
      }
    }
  };

  // Clear query button
  const handleClear = (e: React.MouseEvent) => {
    e.stopPropagation();
    handleQueryChange("");
    setIsDiscoveryOpen(false);
    setActiveFilterKey(null);
    setActiveFilterValue(null);
    if (onClearSearch) {
      onClearSearch();
    }
    inputRef.current?.focus();
  };

  // Clear all filters and query to search across all BEZENT
  const handleClearFiltersAndSearchAll = () => {
    setActiveFilterKey(null);
    setActiveFilterValue(null);
    handleQueryChange("");
    inputRef.current?.focus();
  };

  // Shared width token: both search trigger and expanded panel strictly share this width
  const SEARCH_WIDTH = maxWidth;

  return (
    <div
      ref={containerRef}
      style={{
        flex: `0 1 ${SEARCH_WIDTH}px`,
        display: "flex",
        justifyContent: "center",
        position: "relative",
        height: 40,
        maxWidth: SEARCH_WIDTH,
        width: "100%",
        margin: "0 auto",
      }}
    >
      {/* Top Search Bar (Follows Theme) */}
      <div
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        onClick={() => {
          setIsDiscoveryOpen(true);
          inputRef.current?.focus();
        }}
        style={{
          width: "100%",
          height: 40,
          background: isDiscoveryOpen
            ? "#FFFFFF"
            : isHovered
            ? "var(--search-hover)"
            : "var(--search-bg)",
          border: isDiscoveryOpen
            ? "1px solid #DED7E3"
            : isHovered
            ? "1px solid var(--search-border-hover)"
            : "1px solid var(--search-border)",
          borderBottom: isDiscoveryOpen ? "1px solid #E8E3EB" : undefined,
          borderRadius: isDiscoveryOpen ? "12px 12px 0 0" : 20,
          boxShadow: isDiscoveryOpen
            ? "0 4px 16px rgba(23, 17, 29, 0.08)"
            : "none",
          display: "flex",
          alignItems: "center",
          paddingLeft: 14,
          paddingRight: 10,
          cursor: "text",
          boxSizing: "border-box",
          zIndex: isDiscoveryOpen ? 260 : 10,
          transition: "background-color 140ms ease, border-color 140ms ease",
        }}
      >
        {/* Left search icon */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            flexShrink: 0,
            color: isDiscoveryOpen ? "#5F5865" : "var(--search-icon)",
          }}
        >
          <L.Search
            size={16}
            color={isDiscoveryOpen ? "#5F5865" : "var(--search-icon)"}
            strokeWidth={1.8}
          />
        </div>

        {/* Spacing */}
        <div style={{ width: 10, flexShrink: 0 }} />

        {/* Search input field */}
        <input
          ref={inputRef}
          type="text"
          className={`bezent-search-input ${isDiscoveryOpen ? "expanded" : ""}`}
          value={query}
          onChange={(e) => handleQueryChange(e.target.value)}
          onFocus={() => setIsDiscoveryOpen(true)}
          onKeyDown={handleInputKeyDown}
          placeholder="Search across BEZENT..."
          style={{
            flex: 1,
            background: "transparent",
            border: "none",
            outline: "none",
            fontSize: 13,
            fontWeight: 450,
            color: isDiscoveryOpen ? "#17111D" : "var(--search-text)",
            caretColor: "#931CF5",
            fontFamily: "inherit",
            lineHeight: 1.4,
            padding: 0,
            minWidth: 0,
          }}
        />

        {/* Clear X button (shown if query exists or if search is active) */}
        {(query || isSearchActive) && (
          <button
            type="button"
            onClick={handleClear}
            title="Clear search"
            style={{
              background: "none",
              border: "none",
              cursor: "pointer",
              padding: "3px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              color: isDiscoveryOpen ? "#5F5865" : "var(--text-secondary, #756B7D)",
              marginRight: 4,
              borderRadius: "50%",
              outline: "none",
            }}
          >
            <L.X size={15} strokeWidth={2.2} />
          </button>
        )}

        {/* Vertical separator */}
        <div
          style={{
            width: 1,
            height: 18,
            background: isDiscoveryOpen ? "#E8E3EB" : "var(--search-divider)",
            margin: "0 6px 0 4px",
            flexShrink: 0,
          }}
        />

        {/* Right Filter button indicator */}
        <div
          onClick={(e) => {
            e.stopPropagation();
            setIsDiscoveryOpen((v) => !v);
            inputRef.current?.focus();
          }}
          style={{
            display: "inline-flex",
            alignItems: "center",
            justifyContent: "center",
            gap: 4,
            padding: "2px 6px",
            cursor: "pointer",
            userSelect: "none",
            flexShrink: 0,
          }}
        >
          <BezentIcon
            name="filter"
            size={13}
            color={isDiscoveryOpen ? "#5F5865" : "var(--search-filter-icon)"}
            strokeWidth={1.8}
          />
          <span
            style={{
              fontSize: 11,
              color: isDiscoveryOpen ? "#5F5865" : "var(--search-filter-text)",
              fontWeight: 500,
              letterSpacing: "0.1px",
            }}
          >
            Filter
          </span>
        </div>
      </div>

      {/* STATE A: FLOATING SEARCH DISCOVERY PANEL (EXACT SAME WIDTH, LEFT, RIGHT) */}
      {isDiscoveryOpen && (
        <div
          style={{
            position: "absolute",
            top: 39,
            left: 0,
            right: 0,
            width: "100%",
            background: "#FFFFFF",
            border: "1px solid #DED7E3",
            borderTop: "none",
            borderRadius: "0 0 12px 12px",
            boxShadow: "0 18px 42px rgba(23, 17, 29, 0.16), 0 4px 12px rgba(23, 17, 29, 0.08)",
            zIndex: 250,
            overflow: "hidden",
            boxSizing: "border-box",
            display: "flex",
            flexDirection: "column",
            color: "#17111D",
          }}
        >
          {/* Contextual Filter Chips */}
          <SearchFilters
            configs={filterConfigs}
            activeFilterKey={activeFilterKey}
            activeFilterValue={activeFilterValue}
            onSelectFilter={(key, value) => {
              setActiveFilterKey(key);
              setActiveFilterValue(value);
            }}
            onClearFilter={() => {
              setActiveFilterKey(null);
              setActiveFilterValue(null);
            }}
          />

          {/* Results or Empty / Context Suggestions */}
          {query.trim() ? (
            searchResults.items.length > 0 ? (
              <SearchResults
                currentModuleKey={currentModuleKey}
                currentModuleItems={searchResults.currentModuleItems}
                otherModuleItems={searchResults.otherModuleItems}
                allRankedItems={searchResults.items}
                selectedIndex={selectedIndex}
                onSelect={handleSelectResult}
                onHoverIndex={(idx) => setSelectedIndex(idx)}
              />
            ) : (
              <SearchEmptyState
                type="no-results"
                currentModuleKey={currentModuleKey}
                suggestions={suggestions}
                onSelectSuggestion={handleSelectSuggestion}
                onClearFiltersAndSearchAll={handleClearFiltersAndSearchAll}
              />
            )
          ) : (
            <SearchEmptyState
              type="suggestions"
              currentModuleKey={currentModuleKey}
              suggestions={suggestions}
              onSelectSuggestion={handleSelectSuggestion}
              onClearFiltersAndSearchAll={handleClearFiltersAndSearchAll}
            />
          )}
        </div>
      )}
    </div>
  );
}

export default GlobalSearch;
