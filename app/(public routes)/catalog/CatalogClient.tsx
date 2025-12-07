'use client';

// React
import { useMemo, useRef, useEffect, useCallback, useState } from 'react';
// Next.js
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
// Libraries
import { useInfiniteQuery } from '@tanstack/react-query';
import { useDebounce } from 'use-debounce';
import { useTranslations } from 'next-intl';
// Components
import ContentLoader from '@/components/ContentLoader/ContentLoader';
import CampersList from '@/components/CampersList/CampersList';
import MobileFilters from '@/components/MobileFilters/MobileFilters';
import SidebarFilters from '@/components/SidebarFilter/SidebarFilter';
// API
import { fetchCampers } from '@/lib/api/campers';
// Store
import {
  CAMPERS_DEFAULT_FILTERS,
  useCampersStore,
} from '@/lib/store/campersStore';
// Types
import { AllFiltersState } from '@/types/filters';
import { CamperEquipment, CamperForm } from '@/types/camper';
// Styles
import css from './Catalog.module.css';

// === Constants ===
const LIMIT = 4;

// === Helpers ===

// Parse URL search params into filter state
const getFiltersFromParams = (params: URLSearchParams): AllFiltersState => {
  const location = params.get('location') ?? '';
  const form = (params.get('form') as CamperForm | null) ?? null;
  const equipmentParam = params.get('equipment');
  const equipment = equipmentParam
    ? (equipmentParam.split(',').filter(Boolean) as CamperEquipment[])
    : [];
  return {
    location,
    form,
    equipment,
  };
};

// Create URL search params string from filter state
const createSearchParams = (filters: AllFiltersState) => {
  const params = new URLSearchParams();
  if (filters.location.trim()) {
    params.set('location', filters.location.trim());
  }
  if (filters.form) {
    params.set('form', filters.form);
  }
  if (filters.equipment.length > 0) {
    params.set('equipment', filters.equipment.join(','));
  }
  return params.toString();
};

// === Component ===
export default function CatalogClient() {
  const t = useTranslations('CatalogPage');

  // --- Initial Mount State ---
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  // --- Store ---
  const {
    campers,
    filters,
    setFilters,
    resetFilters,
    resetCampers,
    setCampers,
    setMeta,
  } = useCampersStore();

  // --- Router ---
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const initializedFromParams = useRef(false);

  // --- Filter State Proxy ---
  // Wraps setFilters to match React.Dispatch signature
  const proxySetFilters: React.Dispatch<
    React.SetStateAction<AllFiltersState>
  > = updater => {
    setFilters(prev =>
      typeof updater === 'function'
        ? (updater as (prev: AllFiltersState) => AllFiltersState)(prev)
        : updater
    );
  };

  // --- Effects ---

  // Initialize filters from URL params on mount
  useEffect(() => {
    if (initializedFromParams.current) return;
    const paramsFilters = getFiltersFromParams(searchParams);
    setFilters({ ...CAMPERS_DEFAULT_FILTERS, ...paramsFilters });
    initializedFromParams.current = true;
  }, [searchParams, setFilters]);

  // Sync filters to URL when they change
  useEffect(() => {
    if (!initializedFromParams.current) return;
    const queryString = createSearchParams(filters);
    router.replace(queryString ? `${pathname}?${queryString}` : pathname, {
      scroll: false,
    });
  }, [filters, pathname, router]);

  // --- API Filters with Debounce ---
  const [debouncedLocation] = useDebounce(filters.location, 400);
  const apiFilters = useMemo(
    () => ({
      ...filters,
      location: debouncedLocation,
    }),
    [filters, debouncedLocation]
  );

  // Reset campers when filters change
  const filtersKey = JSON.stringify(apiFilters);
  const lastFiltersKey = useRef(filtersKey);

  useEffect(() => {
    if (lastFiltersKey.current === filtersKey) return;
    resetCampers();
    lastFiltersKey.current = filtersKey;
  }, [filtersKey, resetCampers]);

  // --- Data Fetching ---
  const {
    data,
    isLoading,
    isError,
    isFetched,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useInfiniteQuery({
    queryKey: ['campers', apiFilters],
    queryFn: ({ pageParam = 1 }) =>
      fetchCampers({
        page: Number(pageParam),
        limit: LIMIT,
        filters: apiFilters,
      }),
    initialPageParam: 1,
    getNextPageParam: (lastPage, pages) => {
      if (pages.length >= lastPage.totalPages) {
        return undefined;
      }
      return pages.length + 1;
    },
    refetchOnWindowFocus: false,
  });

  // Sync fetched data to store
  useEffect(() => {
    if (!data) return;
    const flattened = data.pages.flatMap(page => page.items);
    setCampers(flattened);
    const firstPage = data.pages[0];
    if (firstPage) {
      setMeta({
        total: firstPage.total,
        limit: firstPage.limit,
        totalPages: firstPage.totalPages,
        page: data.pages.length,
      });
    }
  }, [data, setCampers, setMeta]);

  // --- Derived State ---
  const total = data?.pages[0]?.total ?? 0;
  const shown = campers.length;
  const isEmpty = isMounted && isFetched && !isLoading && !isError && campers.length === 0;
  const showLoader = !isMounted || isLoading || (!isFetched && campers.length === 0);

  // --- Handlers ---

  // Clear all filters and reset campers list
  const handleClearAll = useCallback(() => {
    resetFilters();
    resetCampers();
  }, [resetFilters, resetCampers]);

  // Load next page of campers
  const handleLoadMore = async () => {
    if (!hasNextPage) return;
    await fetchNextPage();
    requestAnimationFrame(() => {
      window.scrollBy({ top: 600, behavior: 'smooth' });
    });
  };

  // --- Render ---
  return (
    <div>
      <h1 className={css.pageTitle}>{t('pageTitle')}</h1>
      {/* Mobile Filters */}
      <div className={css.mobileFilters}>
        <MobileFilters
          currentFilters={filters}
          onFilterChange={proxySetFilters}
          onClearAll={handleClearAll}
          shown={shown}
          total={total}
          isLoading={isLoading}
        />
      </div>

      <div className={css.main}>
        {/* Sidebar Filters (Desktop) */}
        <aside className={css.sidebar}>
          <SidebarFilters
            currentFilters={filters}
            onFilterChange={proxySetFilters}
            onClearAll={handleClearAll}
            shown={shown}
            total={total}
            isLoading={isLoading}
          />
        </aside>

        {/* Content Area */}
        <div className={css.contentArea}>
          {/* Loading State */}
          {showLoader ? (
            <ContentLoader />
          ) : /* Error State */
            isError ? (
              <div className={css.emptyState}>
                <p>{t('loadError')}</p>
                <button className={`btn-secondary ${css.button}`} onClick={handleClearAll}>
                  {t('resetFilters')}
                </button>
              </div>
            ) : /* Empty State */
              isEmpty ? (
                <div className={css.emptyState}>
                  <p>{t('emptyState')}</p>
                  <button className={`btn-secondary ${css.button}`} onClick={handleClearAll}>
                    {t('resetFilters')}
                  </button>
                </div>
              ) : (
                /* Campers List */
                <>
                  <CampersList campers={campers} />
                  {/* Load More Button */}
                  {hasNextPage && (
                    <div className={css.buttonContainer}>
                      <button
                        onClick={handleLoadMore}
                        disabled={isFetchingNextPage}
                        className={`btn-secondary ${css.button}`}
                      >
                        {isFetchingNextPage ? t('loadingMore') : t('loadMore')}
                      </button>
                    </div>
                  )}
                </>
              )}
        </div>
      </div>
    </div>
  );
}
