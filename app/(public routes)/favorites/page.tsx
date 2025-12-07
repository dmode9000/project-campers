'use client';

import { useQuery } from '@tanstack/react-query';
import css from './favorites.module.css';
import { useFavoritesStore } from '@/lib/store/favoritesStore';
import Loading from '@/app/loading';
import MessageNoInfo from '@/components/MessageNoInfo/MessageNoInfo';
import { useRouter } from 'next/navigation';
import { fetchCamperById } from '@/lib/api/campers';
import CampersList from '@/components/CampersList/CampersList';
import { useTranslations } from 'next-intl';

export default function FavoritesPage() {
  const t = useTranslations('FavoritesPage');
  const router = useRouter();
  const favorites = useFavoritesStore(state => state.favorites);

  const { data, isLoading, isError } = useQuery({
    queryKey: ['favorites', favorites],
    queryFn: async () => {
      const campers = await Promise.all(favorites.map(id => fetchCamperById(id)));
      return campers;
    },
    enabled: favorites.length > 0,
  });

  if (isLoading) {
    return <Loading />;
  }

  if (isError) {
    return <p className={css.emptyMessage}>{t('loadError')}</p>;
  }

  if (!data || data.length === 0) {
    return (
      <div className={css.favoritesContainer}>
        <div className={css.messageContainer}>
          <MessageNoInfo
            text={t('emptyText')}
            buttonText={t('shopButton')}
            route="/catalog"
            onClick={() => router.push('/catalog')}
          />
        </div>
      </div>
    );
  }

  return (
    <main className={css.favoritesContainer}>
      <div className="container">
        <h1 className={css.pageTitle}>{t('pageTitle')}</h1>
        <CampersList campers={data} />
      </div>
    </main>
  );
}
