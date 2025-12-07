import { Camper } from '@/types/camper';
import { AllFiltersState } from '@/types/filters';
import { create } from 'zustand';

export const CAMPERS_DEFAULT_FILTERS: AllFiltersState = {
  location: '',
  form: null,
  equipment: [],
};

interface CampersMeta {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
}

type FiltersUpdater =
  | AllFiltersState
  | ((prev: AllFiltersState) => AllFiltersState);

interface CampersStore {
  campers: Camper[];
  meta: CampersMeta;
  filters: AllFiltersState;
  setFilters: (updater: FiltersUpdater) => void;
  setCampers: (camperList: Camper[]) => void;
  appendCampers: (camperList: Camper[]) => void;
  resetCampers: () => void;
  setMeta: (meta: Partial<CampersMeta>) => void;
  resetFilters: () => void;
}

export const useCampersStore = create<CampersStore>(set => ({
  campers: [],
  meta: {
    page: 1,
    limit: 4,
    total: 0,
    totalPages: 0,
  },
  filters: { ...CAMPERS_DEFAULT_FILTERS },
  setFilters: updater =>
    set(state => ({
      filters:
        typeof updater === 'function'
          ? (updater as (prev: AllFiltersState) => AllFiltersState)(
              state.filters
            )
          : updater,
    })),
  setCampers: camperList =>
    set(() => ({
      campers: camperList,
    })),
  appendCampers: camperList =>
    set(state => ({
      campers: [...state.campers, ...camperList],
      meta: { ...state.meta, page: state.meta.page + 1 },
    })),
  resetCampers: () =>
    set({
      campers: [],
      meta: { page: 1, limit: 4, total: 0, totalPages: 0 },
    }),
  setMeta: meta =>
    set(state => ({
      meta: { ...state.meta, ...meta },
    })),
  resetFilters: () =>
    set(() => ({
      filters: { ...CAMPERS_DEFAULT_FILTERS },
    })),
}));
