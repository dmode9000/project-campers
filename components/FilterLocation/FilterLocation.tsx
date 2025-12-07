'use client';

// React
import { useState, useEffect, useRef } from 'react';
// Libraries
import { useTranslations } from 'next-intl';
import { LuMap } from 'react-icons/lu';
// API
import { fetchLocations } from '@/lib/api/campers';
// Styles
import css from './FilterLocation.module.css';

// === Types ===
interface FilterLocationProps {
  value: string;
  onChange: (value: string) => void;
}

// === Component ===
export default function FilterLocation({ value, onChange }: FilterLocationProps) {
  const t = useTranslations('FilterContent');

  // --- Autocomplete State ---
  const [locations, setLocations] = useState<string[]>([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [filteredLocations, setFilteredLocations] = useState<string[]>([]);
  const inputRef = useRef<HTMLInputElement>(null);
  const suggestionsRef = useRef<HTMLUListElement>(null);

  // --- Effects ---

  // Fetch all locations on component mount
  useEffect(() => {
    fetchLocations()
      .then(setLocations)
      .catch(() => setLocations([]));
  }, []);

  // Filter locations based on user input
  useEffect(() => {
    if (value.trim().length > 0) {
      const query = value.toLowerCase();
      const filtered = locations.filter(loc =>
        loc.toLowerCase().includes(query)
      );
      setFilteredLocations(filtered);
    } else {
      setFilteredLocations([]);
    }
  }, [value, locations]);

  // Close suggestions dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        inputRef.current &&
        !inputRef.current.contains(event.target as Node) &&
        suggestionsRef.current &&
        !suggestionsRef.current.contains(event.target as Node)
      ) {
        setShowSuggestions(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // --- Handlers ---

  // Handle input change
  const handleInputChange = (newValue: string) => {
    onChange(newValue);
    setShowSuggestions(true);
  };

  // Handle location selection from suggestions
  const handleSelect = (location: string) => {
    onChange(location);
    setShowSuggestions(false);
  };

  // --- Render ---
  return (
    <div className={css.group}>
      {/* Header */}
      <div className={css.filterHeader}>
        <h3>{t('locationTitle')}</h3>
        {value && (
          <button
            type="button"
            className={css.clearButton}
            onClick={() => handleInputChange('')}
          >
            {t('clear')}
          </button>
        )}
      </div>

      {/* Input with Autocomplete */}
      <div className={css.inputWrapper}>
        <LuMap className={css.icon} />
        <input
          ref={inputRef}
          type="text"
          className={css.input}
          placeholder={t('locationPlaceholder')}
          value={value}
          onChange={event => handleInputChange(event.target.value)}
          onFocus={() => setShowSuggestions(true)}
        />

        {/* Suggestions Dropdown */}
        {showSuggestions && filteredLocations.length > 0 && (
          <ul ref={suggestionsRef} className={css.suggestions}>
            {filteredLocations.map(location => (
              <li
                key={location}
                className={css.suggestionItem}
                onClick={() => handleSelect(location)}
              >
                {location}
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
