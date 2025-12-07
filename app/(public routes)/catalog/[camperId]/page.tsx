import CamperDetails from '@/components/CamperDetails/CamperDetails';
import { fetchCamperById } from '@/lib/api/campers';
import css from './CamperPage.module.css';

interface CamperPageProps {
  params: { camperId: string };
}

export default async function CamperPage({ params }: CamperPageProps) {
  const camper = await fetchCamperById(params.camperId);

  return (
    <section className={css.section}>
      <div className="container">
        <CamperDetails camper={camper} />
      </div>
    </section>
  );
}
