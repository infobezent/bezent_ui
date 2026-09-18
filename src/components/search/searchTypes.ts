export type SearchModuleKey =
  | "employees"
  | "attendance"
  | "leave-tracker"
  | "time-tracker"
  | "performance"
  | "benefits"
  | "assets"
  | "onboarding"
  | "workforce"
  | "payroll"
  | "recruitment"
  | "dashboard"
  | "general";

export interface FilterChipOption {
  label: string;
  value: string;
}

export interface FilterChipConfig {
  id: string;
  label: string;
  options: FilterChipOption[];
}

export interface SearchResultItem {
  id: string;
  title: string;
  subtitle: string;
  module: string;
  moduleKey: SearchModuleKey;
  targetRoute?: string;
  childId?: string;
  icon: string;
  badge?: {
    text: string;
    color?: string;
    bg?: string;
  };
  metaRight?: string;
  tags?: string[];
  isRecent?: boolean;
}

export interface ContextSuggestion {
  id: string;
  label: string;
  icon: string;
  moduleKey: SearchModuleKey;
  sourceModuleLabel?: string;
  actionQuery?: string;
  filterKey?: string;
  filterValue?: string;
}

export interface SearchState {
  isFocused: boolean;
  query: string;
  activeFilterKey: string | null;
  activeFilterValue: string | null;
  selectedIndex: number;
}
