import axios from 'axios';
import { Camper } from '@/types/camper';
import { AllFiltersState } from '@/types/filters';

const BASE_URL =
  process.env.NEXT_PUBLIC_CAMPERS_API ??
  'https://66b1f8e71ca8ad33d4f5f63e.mockapi.io/campers';

const campersApi = axios.create({
  baseURL: BASE_URL,
});

export interface FetchCampersParams {
  page?: number;
  limit?: number;
  filters?: AllFiltersState;
}

export interface FetchCampersResponse {
  items: Camper[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

const buildParams = (filters?: AllFiltersState) => {
  if (!filters) return {} as Record<string, string>;
  const params: Record<string, string> = {};
  if (filters.location.trim().length > 0) {
    params.location = filters.location.trim();
  }
  if (filters.form) {
    params.form = filters.form;
  }
  if (filters.equipment.length > 0) {
    filters.equipment.forEach(key => {
      params[key] = 'true';
    });
  }
  return params;
};

export const fetchCampers = async ({
  page = 1,
  limit = 4,
  filters,
}: FetchCampersParams): Promise<FetchCampersResponse> => {
  const params = {
    page: String(page),
    limit: String(limit),
    ...buildParams(filters),
  };

  try {
    const { data } = await campersApi.get('/', { params });

    // Handle "Not found" response from MockAPI
    if (typeof data === 'string' && data === 'Not found') {
      return {
        items: [],
        total: 0,
        page,
        limit,
        totalPages: 0,
      };
    }

    const totalPages = Math.ceil(data.total / limit);
    return {
      items: data.items,
      total: data.total,
      page,
      limit,
      totalPages,
    };
  } catch (error) {
    // Handle 404 or other errors as empty result
    if (
      error instanceof Error &&
      'response' in error &&
      (error as { response?: { status?: number } }).response?.status === 404
    ) {
      return {
        items: [],
        total: 0,
        page,
        limit,
        totalPages: 0,
      };
    }
    throw error;
  }
};

export const fetchCamperById = async (id: string): Promise<Camper> => {
  const { data } = await campersApi.get(`/${id}`);
  return data;
};

// Fetch all unique locations for autocomplete
export const fetchLocations = async (): Promise<string[]> => {
  const { data } = await campersApi.get('/', { params: { limit: '100' } });
  const locations = data.items.map((camper: Camper) => camper.location);
  // Return unique sorted locations
  return [...new Set<string>(locations)].sort();
};
