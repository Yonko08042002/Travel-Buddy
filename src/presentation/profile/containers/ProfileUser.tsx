import { getMe } from 'application/use-cases/user';
import CardProfile from '../components/CardProfile';
import PurchaseTable from './PurchaseTable';

export default async function ProfileUser() {
  const me = await getMe();
  return (
    <div className='flex gap-2 p-4'>
      <CardProfile user={me} />
      <PurchaseTable user={me} />
    </div>
  );
}
