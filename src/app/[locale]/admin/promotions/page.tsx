import { getPromotions } from 'application/use-cases/promotion';
import PromotionsBreadcrumb from 'presentation/promotions/components/PromotionsBreadcrumb';
import { PromotionsTable } from 'presentation/promotions/containers/PromotionsTable';

export const metadata = {
  title: 'Promotion'
};

export default async function Promotion() {
  const promotions = await getPromotions();
  return (
    <section className='w-full'>
      <PromotionsBreadcrumb />
      <PromotionsTable data={promotions} />
    </section>
  );
}
