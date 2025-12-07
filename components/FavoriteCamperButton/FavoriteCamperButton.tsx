'use client';

// Libraries
import { LuHeart } from 'react-icons/lu';
// Store
import { useFavoritesStore } from '@/lib/store/favoritesStore';
// Styles
import css from './FavoriteCamperButton.module.css';

// === Types ===
interface FavoriteCamperButtonProps {
  id: string;
}

// === Component ===
export default function FavoriteCamperButton({ id }: FavoriteCamperButtonProps) {
  // Get favorites state and toggle function from store
  const { favorites, toggleFavorite } = useFavoritesStore();

  // Check if current camper is in favorites
  const isFavorite = favorites.includes(id);

  // === Render ===
  return (
    <button
      type="button"
      className={`${css.button} ${isFavorite ? css.buttonActive : ''}`}
      aria-pressed={isFavorite}
      aria-label={isFavorite ? 'Remove from favorites' : 'Add to favorites'}
      onClick={() => toggleFavorite(id)}
    >
      {/* <LuHeart size={22} /> */}
      <svg width="26" height="24" aria-hidden="true">
        <use href="/symbol-defs.svg#icon-heart"></use>
      </svg>

    </button>
  );
}
