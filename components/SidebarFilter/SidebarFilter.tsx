'use client';

// Libraries
import { useTranslations } from 'next-intl';
// Components
import FilterLocation from '@/components/FilterLocation/FilterLocation';
import FilterVehicleEquipment from '@/components/FilterVehicleEquipment/FilterVehicleEquipment';
import FilterVehicleType from '@/components/FilterVehicleType/FilterVehicleType';
// Types
import { FilterContainerProps } from '@/types/filters';
// Styles
import css from './SidebarFilter.module.css';

// === Component ===
export default function SidebarFilters({
  currentFilters,
  onFilterChange,
  onClearAll,
  shown,
  total,
  isLoading,
}: FilterContainerProps) {
  const t = useTranslations('Filters');

  // --- Check if any filter is active ---
  const hasActiveFilters =
    currentFilters.location !== '' ||
    currentFilters.form !== null ||
    currentFilters.equipment.length > 0;

  // --- Render ---
  return (
    <div className={css.sidebarContainer}>
      {/* Location Filter */}
      <FilterLocation
        value={currentFilters.location}
        onChange={value => onFilterChange(prev => ({ ...prev, location: value }))}
      />

      {/* Header with title and clear button */}
      <div className={css.filters}>
        <h3 className={css.filter}>{t('title')}</h3>
        {hasActiveFilters && (
          <button type="button" className={css.clearButton} onClick={onClearAll}>
            {t('clearAll')}
          </button>
        )}
      </div>

      {/* Results counter */}
      <p className={css.shown}>
        {isLoading ? t('loading') : `${t('shown')} ${shown} ${t('of')} ${total}`}
      </p>

      {/* Vehicle Equipment Filter */}
      <FilterVehicleEquipment
        currentFilters={currentFilters}
        onFilterChange={onFilterChange}
      />

      {/* Vehicle Type Filter */}
      <FilterVehicleType
        currentFilters={currentFilters}
        onFilterChange={onFilterChange}
      />
    </div>
  );
}
