'use client';

import { useEffect } from 'react';
import Image from 'next/image';
import { IoClose } from 'react-icons/io5';
import css from './ImageLightbox.module.css';

interface ImageLightboxProps {
  src: string;
  alt: string;
  isLoading: boolean;
  onLoad: () => void;
  onClose: () => void;
}

export default function ImageLightbox({
  src,
  alt,
  isLoading,
  onLoad,
  onClose,
}: ImageLightboxProps) {
  // Close on Escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    // Prevent body scroll when lightbox is open
    document.body.style.overflow = 'hidden';

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = '';
    };
  }, [onClose]);

  return (
    <div
      className={css.overlay}
      onClick={onClose}
      role="dialog"
      aria-modal="true"
    >
      {/* Close button */}
      <button
        type="button"
        className={css.closeButton}
        onClick={onClose}
        aria-label="Close lightbox"
      >
        <IoClose size={32} />
      </button>

      {/* Image container */}
      <div className={css.content} onClick={(e) => e.stopPropagation()}>
        {/* Loader */}
        {isLoading && (
          <div className={css.loader}>
            <div className={css.spinner}></div>
          </div>
        )}

        {/* Image */}
        <Image
          src={src}
          alt={alt}
          fill
          className={css.image}
          sizes="90vw"
          onLoad={onLoad}
        />
      </div>
    </div>
  );
}
