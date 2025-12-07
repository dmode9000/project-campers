'use client';

// Libraries
import { useTranslations } from 'next-intl';
// Constants
import { EQUIPMENT_CONFIG, FORM_CONFIG } from '@/constants/campers';
// Types
import { FilterContentProps } from '@/types/filters';
import { CamperEquipment, CamperForm } from '@/types/camper';
// Styles
import css from './FilterContent.module.css';

// === Component ===
export default function FilterContent({
  currentFilters,
  onFilterChange,
}: FilterContentProps) {
  const t = useTranslations('FilterContent');
  const tFeatures = useTranslations('CamperFeatures');

  // --- Handlers ---

  // Handle vehicle form selection (single select)
  const handleFormChange = (form: CamperForm | null) => {
    onFilterChange(prev => ({ ...prev, form }));
  };

  // Toggle equipment filter (multi select)
  const toggleEquipment = (key: CamperEquipment) => {
    onFilterChange(prev => {
      const exists = prev.equipment.includes(key);
      return {
        ...prev,
        equipment: exists
          ? prev.equipment.filter(item => item !== key)
          : [...prev.equipment, key],
      };
    });
  };

  // --- Render ---
  return (
    <div className={css.filterContentContainer}>
      {/* Equipment Filter Group */}
      <div className={css.group}>
        <div className={css.filterHeader}>
          <h3>{t('equipmentTitle')}</h3>
          {currentFilters.equipment.length > 0 && (
            <button
              type="button"
              className={css.clearButtonInternal}
              onClick={() => onFilterChange(prev => ({ ...prev, equipment: [] }))}
            >
              {t('clear')}
            </button>
          )}
        </div>
        <hr className={css.divider} />
        <ul className={css.equipmentList}>
          {EQUIPMENT_CONFIG.map(({ key, icon: Icon }) => {
            const isSelected = currentFilters.equipment.includes(key);
            return (
              <li
                key={key}
                className={`${css.equipmentItem} ${isSelected ? css.equipmentItemActive : ''}`}
                onClick={() => toggleEquipment(key)}
              >
                <Icon size={32} className={css.equipmentIcon} />
                <span className={css.equipmentLabel}>{tFeatures(key)}</span>
              </li>
            );
          })}
        </ul>
      </div>

      {/* Vehicle Form Filter Group */}
      <div className={css.group}>
        <div className={css.filterHeader}>
          <h3>{t('formTitle')}</h3>
          {currentFilters.form && (
            <button
              type="button"
              className={css.clearButtonInternal}
              onClick={() => handleFormChange(null)}
            >
              {t('clear')}
            </button>
          )}
        </div>
        <hr className={css.divider} />
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
    </div>
  );
}

