import { fetchCampers } from '@/lib/api/campers';
import { CAMPERS_DEFAULT_FILTERS } from '@/lib/store/campersStore';
import {
  HydrationBoundary,
  QueryClient,
  dehydrate,
} from '@tanstack/react-query';
import CatalogClient from './CatalogClient';
import css from './Catalog.module.css';

export default async function CatalogPage() {
  const queryClient = new QueryClient();

  await queryClient.prefetchInfiniteQuery({
    queryKey: ['campers', CAMPERS_DEFAULT_FILTERS],
    queryFn: ({ pageParam = 1 }) =>
      fetchCampers({
        page: Number(pageParam),
        limit: 4,
        filters: CAMPERS_DEFAULT_FILTERS,
      }),
    initialPageParam: 1,
  });

  return (
    <section className={css.section}>
      <div className="container">
        <HydrationBoundary state={dehydrate(queryClient)}>
          <CatalogClient />
        </HydrationBoundary>
      </div>
    </section>
  );
}
