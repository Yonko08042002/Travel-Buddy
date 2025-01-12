import { getMe } from 'application/use-cases/user';
import CardProfile from '../components/CardProfile';
import PurchaseUser from './PurchaseUser';

export default async function ProfileUser() {
  const me = await getMe();
  return (
    <div className='flex gap-2 p-4'>
      <CardProfile user={me} />
      <PurchaseUser user={me} />
    </div>
  );
}
