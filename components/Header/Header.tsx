'use client';

// === Imports ===
// React
import { useState, useEffect } from 'react';
// Next.js
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import Image from 'next/image';
// Types
// Libraries
import { useTranslations } from 'next-intl';
// Store
import { useFavoritesStore } from '@/lib/store/favoritesStore';
// Styles
import css from './Header.module.css';
import LanguageSwitcher from '../LanguageSwitcher/LanguageSwitcher';

export default function Header() {
  const t = useTranslations('Header');
  const pathname = usePathname();

  // === Store ===
  const favoritesCount = useFavoritesStore(state => state.favorites.length);

  // === State ===
  const [menuOpen, setMenuOpen] = useState(false);

  // === Helpers ===
  const isActive = (href: string) => {
    if (href === '/') {
      return pathname === '/' || pathname === '/en' || pathname === '/uk';
    }
    return pathname.includes(href);
  };

  // === Effects ===

  // Disable body scroll when mobile menu is open
  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : 'auto';
    document.documentElement.style.overflow = menuOpen ? 'hidden' : 'auto';
  }, [menuOpen]);

  // === Render ===
  return (
    <header className={css.section}>
      <div className="container">
        <div className={css.header}>
          {/* Logo */}
          <Link href="/" aria-label={t('home')} className={css.logoLink}>
            <Image
              src="/logo.svg"
              alt="TravelTracks Logo"
              width={136}
              height={16}
              priority
            />
          </Link>

          {/* Mobile Navigation (hidden on desktop via CSS) */}
          <div className={css.mobileOnly}>
            {/* Burger button */}
            <div className={css.mobileButtons}>
              <button
                type="button"
                aria-label={menuOpen ? t('closeMenu') : t('openMenu')}
                onClick={() => setMenuOpen(!menuOpen)}
                className={css.burgerButton}
              >
                <svg width="19" height="13" className={css.buttonSvg}>
                  <use
                    href={
                      menuOpen
                        ? '/symbol-defs.svg#icon-close'
                        : '/symbol-defs.svg#icon-burger-menu'
                    }
                  ></use>
                </svg>
              </button>
            </div>

            {/* Mobile menu dropdown */}
            {menuOpen && (
              <div className={css.mobileMenu}>
                <nav aria-label="Mobile Navigation">
                  <ul className={css.navigationMobile}>
                    <li>
                      <Link
                        href="/"
                        className={`${css.navigationItemMobile} ${isActive('/') ? css.active : ''}`}
                        onClick={() => setMenuOpen(false)}
                      >
                        {t('home')}
                      </Link>
                    </li>
                    <li>
                      <Link
                        href="/catalog"
                        className={`${css.navigationItemMobile} ${isActive('/catalog') ? css.active : ''}`}
                        onClick={() => setMenuOpen(false)}
                      >
                        {t('catalog')}
                      </Link>
                    </li>
                    <li>
                      <Link
                        href="/favorites"
                        className={`${css.navigationItemMobile} ${isActive('/favorites') ? css.active : ''}`}
                        onClick={() => setMenuOpen(false)}
                      >
                        {t('favorites')}{favoritesCount > 0 && ` (${favoritesCount})`}
                      </Link>
                    </li>
                    <li>
                      <div className={css.navigationItemMobile}><LanguageSwitcher /></div>
                    </li>
                  </ul>
                </nav>
              </div>
            )}
          </div>

          {/* Desktop Navigation (hidden on mobile via CSS) */}
          <div className={css.desktopOnly}>
            <nav aria-label="Main Navigation" className={css.navigationList}>
              <ul className={css.navigation}>
                <li className={`${css.navigationItem} ${isActive('/') ? css.active : ''}`}>
                  <Link href="/" className={css.navigationLink}>
                    {t('home')}
                  </Link>
                </li>
                <li className={`${css.navigationItem} ${isActive('/catalog') ? css.active : ''}`}>
                  <Link href="/catalog" className={css.navigationLink}>
                    {t('catalog')}
                  </Link>
                </li>
                <li className={`${css.navigationItem} ${isActive('/favorites') ? css.active : ''}`}>
                  <Link href="/favorites" className={css.navigationLink}>
                    {t('favorites')}{favoritesCount > 0 && ` (${favoritesCount})`}
                  </Link>
                </li>
                <li>
                  <LanguageSwitcher />
                </li>
              </ul>
            </nav>
          </div>
        </div>
      </div>
    </header>
  );
}
