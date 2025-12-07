'use client';

// Libraries
import { useTranslations } from 'next-intl';
// Constants
import { FORM_CONFIG } from '@/constants/campers';
// Types
import { FilterContentProps } from '@/types/filters';
import { CamperForm } from '@/types/camper';
// Styles
import css from './FilterVehicleType.module.css';

// === Component ===
export default function FilterVehicleType({
  currentFilters,
  onFilterChange,
}: FilterContentProps) {
  const t = useTranslations('FilterContent');

  // --- Handlers ---

  // Handle vehicle form selection (single select)
  const handleFormChange = (form: CamperForm | null) => {
    onFilterChange(prev => ({ ...prev, form }));
  };

  // --- Render ---
  return (
    <div className={css.group}>
      {/* Header */}
      <div className={css.filterHeader}>
        <h3>{t('formTitle')}</h3>
        {currentFilters.form && (
          <button
            type="button"
            className={css.clearButton}
            onClick={() => handleFormChange(null)}
          >
            {t('clear')}
          </button>
        )}
      </div>

      <hr className={css.divider} />

      {/* Vehicle Type List */}
      <ul className={css.formList}>
        {FORM_CONFIG.map(({ key, icon: Icon }) => {
          const isSelected = currentFilters.form === key;
          return (
            <li
              key={key}
              className={`${css.formItem} ${isSelected ? css.formItemActive : ''}`}
              onClick={() => handleFormChange(isSelected ? null : key)}
            >
              <Icon size={32} className={css.formIcon} />
              <span className={css.formLabel}>{t(`forms.${key}`)}</span>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
