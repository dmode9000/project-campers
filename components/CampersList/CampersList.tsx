'use client';

// Next.js
import Image from 'next/image';
import Link from 'next/link';
// React
import { useState } from 'react';
// Libraries
import { useTranslations } from 'next-intl';
import { AiFillStar } from 'react-icons/ai';
import { LuMap } from 'react-icons/lu';
// Components
import FavoriteCamperButton from '@/components/FavoriteCamperButton/FavoriteCamperButton';
import ImageLightbox from '@/components/ImageLightbox/ImageLightbox';
// Constants
import { EQUIPMENT_CONFIG } from '@/constants/campers';
// Types
import { Camper } from '@/types/camper';
// Styles
import css from './CampersList.module.css';

// === Types ===
interface CampersListProps {
  campers: Camper[];
}

// === Helpers ===
// Format price with 2 decimal places
const formatPrice = (price: number) =>
  price.toLocaleString('en-US', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });

// === Component ===
export default function CampersList({ campers }: CampersListProps) {
  const t = useTranslations('CampersList');
  const tFeatures = useTranslations('CamperFeatures');

  // Lightbox state
  const [lightboxImage, setLightboxImage] = useState<string | null>(null);
  const [lightboxAlt, setLightboxAlt] = useState<string>('');
  const [isImageLoading, setIsImageLoading] = useState(true);

  // Open lightbox with image
  const openLightbox = (imageUrl: string, alt: string) => {
    setLightboxImage(imageUrl);
    setLightboxAlt(alt);
    setIsImageLoading(true);
  };

  return (
    <>
      <ul className={css.list}>
        {campers.map(camper => {
          // Get cover image (original for lightbox)
          const coverThumb = camper.gallery[0]?.thumb ?? camper.gallery[0]?.original;
          const coverOriginal = camper.gallery[0]?.original;
          // Filter available equipment based on camper data
          const equipment = EQUIPMENT_CONFIG.filter(({ key }) => camper[key]);

          return (
            <li key={camper.id} className={css.card}>
              {/* Camper image wrapper */}
              {coverThumb && (
                <button
                  type="button"
                  className={css.mediaWrapper}
                  onClick={() => openLightbox(coverOriginal, camper.name)}
                  aria-label={`View ${camper.name} image`}
                >
                  <Image
                    src={coverThumb}
                    alt={camper.name}
                    fill
                    sizes="(max-width: 768px) 100vw, 298px"
                    className={css.media}
                  />
                </button>
              )}

              <div className={css.content}>
                {/* Header: title and price */}
                <div className={css.header}>
                  <h3 className={css.title}>{camper.name}</h3>
                  <div className={css.priceRow}>
                    € {formatPrice(camper.price)}
                    <FavoriteCamperButton id={camper.id} />
                  </div>
                </div>

                {/* Meta: rating and location */}
                <div className={css.meta}>
                  <div className={css.metaItem}>
                    <AiFillStar className={css.starIcon} />
                    <span>
                      {camper.rating.toFixed(1)} · {camper.reviews.length}{' '}
                      {t('reviews')}
                    </span>
                  </div>
                  <div className={css.metaItem}>
                    <LuMap />
                    <span>{camper.location}</span>
                  </div>
                </div>

                {/* Description */}
                <p className={css.description}>{camper.description}</p>

                {/* Equipment features list */}
                {equipment.length > 0 && (
                  <ul className={css.features}>
                    {equipment.map(({ key, icon: Icon }) => (
                      <li key={key} className={css.feature}>
                        <Icon size={20} className={css.featureIcon} />
                        {tFeatures(key)}
                      </li>
                    ))}
                  </ul>
                )}

                {/* Action buttons */}
                <div className={css.actions}>
                  <Link href={`/catalog/${camper.id}`} className={`btn-primary ${css.showMoreButton}`}>
                    {t('details')}
                  </Link>
                </div>
              </div>
            </li>
          );
        })}
      </ul>

      {/* Lightbox */}
      {lightboxImage && (
        <ImageLightbox
          src={lightboxImage}
          alt={lightboxAlt}
          isLoading={isImageLoading}
          onLoad={() => setIsImageLoading(false)}
          onClose={() => setLightboxImage(null)}
        />
      )}
    </>
  );
}
