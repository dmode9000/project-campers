'use client';

// Libraries
import { useTranslations } from 'next-intl';
// Constants
import { EQUIPMENT_CONFIG } from '@/constants/campers';
// Types
import { FilterContentProps } from '@/types/filters';
import { CamperEquipment } from '@/types/camper';
// Styles
import css from './FilterVehicleEquipment.module.css';

// === Component ===
export default function FilterVehicleEquipment({
  currentFilters,
  onFilterChange,
}: FilterContentProps) {
  const t = useTranslations('FilterContent');
  const tFeatures = useTranslations('CamperFeatures');

  // --- Handlers ---

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
    <div className={css.group}>
      {/* Header */}
      <div className={css.filterHeader}>
        <h3>{t('equipmentTitle')}</h3>
        {currentFilters.equipment.length > 0 && (
          <button
            type="button"
            className={css.clearButton}
            onClick={() => onFilterChange(prev => ({ ...prev, equipment: [] }))}
          >
            {t('clear')}
          </button>
        )}
      </div>

      <hr className={css.divider} />

      {/* Equipment List */}
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
  );
}
