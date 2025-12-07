'use client';

import Image from 'next/image';
import { useState } from 'react';
import css from './CamperDetails.module.css';
import { Camper } from '@/types/camper';
import { AiFillStar } from 'react-icons/ai';
import { LuMapPin } from 'react-icons/lu';
import CamperBookingForm from '@/components/CamperBookingForm/CamperBookingForm';
import FavoriteCamperButton from '@/components/FavoriteCamperButton/FavoriteCamperButton';
import ImageLightbox from '@/components/ImageLightbox/ImageLightbox';
import { EQUIPMENT_CONFIG, CAMPER_PRIMARY_FEATURES } from '@/constants/campers';
import { useTranslations } from 'next-intl';

interface CamperDetailsProps {
  camper: Camper;
}

type TabId = 'features' | 'reviews';

export default function CamperDetails({ camper }: CamperDetailsProps) {
  const t = useTranslations('CamperDetails');
  const tFeatures = useTranslations('CamperFeatures');
  const [tab, setTab] = useState<TabId>('features');
  const [lightboxImage, setLightboxImage] = useState<string | null>(null);
  const [isImageLoading, setIsImageLoading] = useState(true);

  const equipment = EQUIPMENT_CONFIG.filter(({ key }) => camper[key]);

  // Format location: "Country, City" -> "City, Country"
  const formatLocation = (location: string) => {
    const parts = location.split(', ');
    if (parts.length === 2) {
      return `${parts[1]}, ${parts[0]}`;
    }
    return location;
  };

  // Open lightbox with image
  const openLightbox = (imageUrl: string) => {
    setLightboxImage(imageUrl);
    setIsImageLoading(true);
  };

  return (
    <div className={css.wrapper}>
      {/* Header Section */}
      <header className={css.header}>

        <h1 className={css.title}>{camper.name}</h1>

        <div className={css.metaRow}>
          <span className={css.rating}>
            <AiFillStar className={css.starIcon} />
            {camper.rating.toFixed(1)}({camper.reviews.length} {t('reviews')})
          </span>
          <span className={css.location}>
            <LuMapPin className={css.locationIcon} />
            {formatLocation(camper.location)}
          </span>
        </div>

        <div className={css.priceWrapper}>
          <p className={css.price}>€{camper.price.toLocaleString('en-US')}</p>
          <FavoriteCamperButton id={camper.id} />
        </div>

      </header>

      {/* Gallery Section */}
      <div className={css.gallery}>
        {camper.gallery.slice(0, 4).map((image, index) => (
          <button
            key={image.original}
            type="button"
            className={css.galleryItem}
            onClick={() => openLightbox(image.original)}
            aria-label={`View ${camper.name} image ${index + 1}`}
          >
            <Image
              src={image.original}
              alt={`${camper.name} ${index + 1}`}
              fill
              className={css.galleryImage}
            />
          </button>
        ))}
      </div>

      {/* Lightbox */}
      {lightboxImage && (
        <ImageLightbox
          src={lightboxImage}
          alt={camper.name}
          isLoading={isImageLoading}
          onLoad={() => setIsImageLoading(false)}
          onClose={() => setLightboxImage(null)}
        />
      )}

      {/* Description */}
      <p className={css.description}>{camper.description}</p>

      {/* Tabs */}
      <div className={css.tabs}>
        <button
          type="button"
          className={`${css.tabButton} ${tab === 'features' ? css.tabActive : ''}`}
          onClick={() => setTab('features')}
        >
          {t('tabs.features')}
        </button>
        <button
          type="button"
          className={`${css.tabButton} ${tab === 'reviews' ? css.tabActive : ''}`}
          onClick={() => setTab('reviews')}
        >
          {t('tabs.reviews')}
        </button>

      </div>
      <hr className={css.divider} />

      {/* Content Area - Two Column Layout */}
      <div className={css.contentArea}>
        {/* Left Column - Tab Content */}
        <div className={css.tabContent}>
          {tab === 'features' ? (
            <div className={css.featuresSection}>
              {/* Equipment Badges */}
              {equipment.length > 0 && (
                <ul className={css.equipmentList}>
                  {equipment.map(({ key, icon: Icon }) => (
                    <li key={key} className={css.equipmentBadge}>
                      <Icon size={18} className={css.equipmentIcon} />
                      {tFeatures(key)}
                    </li>
                  ))}
                </ul>
              )}

              {/* Vehicle Details */}
              <div className={css.vehicleDetails}>
                <h3 className={css.vehicleDetailsTitle}>{t('vehicleDetails')}</h3>
                <div className={css.specTable}>
                  {CAMPER_PRIMARY_FEATURES.map(spec => (
                    <div key={spec} className={css.specRow}>
                      <span className={css.specLabel}>{t(`specs.${spec}`)}</span>
                      <span className={css.specValue}>{camper[spec]}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ) : (
            <div className={css.reviewsSection}>
              {camper.reviews.length === 0 ? (
                <p className={css.empty}>{t('noReviews')}</p>
              ) : (
                camper.reviews.map((review, index) => (
                  <div key={index} className={css.reviewCard}>
                    <div className={css.reviewHeader}>
                      <div className={css.reviewerAvatar}>
                        {review.reviewer_name.charAt(0).toUpperCase()}
                      </div>
                      <div className={css.reviewerInfo}>
                        <span className={css.reviewName}>{review.reviewer_name}</span>
                        <span className={css.reviewRating}>
                          {[...Array(5)].map((_, i) => (
                            <AiFillStar
                              key={i}
                              className={i < review.reviewer_rating ? css.starFilled : css.starEmpty}
                            />
                          ))}
                        </span>
                      </div>
                    </div>
                    <p className={css.reviewComment}>{review.comment}</p>
                  </div>
                ))
              )}
            </div>
          )}
        </div>

        {/* Right Column - Booking Form */}
        <aside className={css.bookingContainer}>
          <CamperBookingForm camperId={camper.id} camperName={camper.name} />
        </aside>
      </div>
    </div>
  );
}
