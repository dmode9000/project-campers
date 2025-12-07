import { CamperEquipment, CamperForm } from './camper';

export interface AllFiltersState {
  location: string;
  form: CamperForm | null;
  equipment: CamperEquipment[];
}

export interface FilterContentProps {
  currentFilters: AllFiltersState;
  onFilterChange: React.Dispatch<React.SetStateAction<AllFiltersState>>;
}

export interface FilterContainerProps extends FilterContentProps {
  onClearAll: () => void;
  total: number;
  shown: number;
  isLoading?: boolean;
}
