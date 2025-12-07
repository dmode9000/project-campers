'use client';

// #region === Imports ===
// React core
import { useState } from 'react';
// Third-party libraries
import { useTranslations } from 'next-intl';
// Types
import { FilterContainerProps } from '@/types/filters';
// Components
import FiltersContent from '../FilterContent/FilterContent';
// Styles
import css from './MobileFilters.module.css';
// #endregion

// #region === Component ===
export default function MobileFilters({
  currentFilters,
  onFilterChange,
  onClearAll,
  shown,
  total,
  isLoading,
}: FilterContainerProps) {
  // --- State ---
  const [isOpen, setIsOpen] = useState<boolean>(false);

  // --- Translations ---
  const t = useTranslations('Filters');

  // --- Check if any filter is active ---
  const hasActiveFilters =
    currentFilters.location !== '' ||
    currentFilters.form !== null ||
    currentFilters.equipment.length > 0;

  // --- Handlers ---
  const handleToggleDropdown = () => setIsOpen(!isOpen);

  // --- Render ---
  return (
    <div>
      {/* Header with title and clear button */}
      <div className={css.filters}>
        <h3 className={css.filter}>{t('title')}</h3>
        {hasActiveFilters && (
          <button type="button" className={css.button} onClick={onClearAll}>
            {t('clearAll')}
          </button>
        )}
      </div>

      {/* Results counter */}
      <p className={css.shown}>
        {isLoading ? t('loading') : `${t('shown')} ${shown} ${t('of')} ${total}`}
      </p>

      {/* Collapsible filter dropdown */}
      <div className={css.filterWrapper}>
        <div className={css.filterDropdownContainer}>
          {/* Dropdown header (clickable to toggle) */}
          <div
            className={css.filterDropdownHeader}
            onClick={handleToggleDropdown}
          >
            <h4 className={css.filterDropdownTitle}>{t('title')}</h4>
            <button
              type="button"
              className={css.arrow}
              style={{ transform: isOpen ? 'rotate(180deg)' : 'rotate(0deg)' }}
              aria-label="Open"
            >
              <svg width="24" height="24" aria-hidden="true">
                <use href="/symbol-defs.svg#icon-down"></use>
              </svg>
            </button>
          </div>

          {/* Dropdown content (filters) */}
          {isOpen && (
            <FiltersContent
              currentFilters={currentFilters}
              onFilterChange={onFilterChange}
            />
          )}
        </div>
      </div>
    </div>
  );
}
// #endregion
