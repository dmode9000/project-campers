"use client";

import Image from 'next/image';
import Link from 'next/link';
import { useTranslations } from 'next-intl';
import { useState } from 'react';
import css from './Hero.module.css';
import ContentLoader from '../ContentLoader/ContentLoader';


const Hero = () => {
  const t = useTranslations('HeroSection');
  const [imageLoaded, setImageLoaded] = useState(false);

  return (
    <section className={css.hero}>
      <div className={`container ${css.container}`}>
        {!imageLoaded && (
          <div className={css.loaderWrapper}>
            <ContentLoader />
          </div>
        )}
        <Image
          src="/img/hero/hero-image.jpg"
          alt="Hero Image"
          fill
          sizes="(min-width: 1440px) 1440px, (min-width: 768px) 768px, 320px"
          className={css.hero_bg_image}
          onLoad={() => setImageLoaded(true)}
        />
        <div className={css.hero_content}>
          <div className={css.text_wrapper}>
            <h1 className={css.hero_title}>
              {t("title")}
            </h1>
            <p className={css.hero_text}>
              {t("text")}
            </p>
          </div>
          <Link href="/catalog" className={`btn-primary ${css.button}`}>
            {t('buttonToCampers')}
          </Link>
        </div>
      </div>
    </section>
  );
};

export default Hero;
