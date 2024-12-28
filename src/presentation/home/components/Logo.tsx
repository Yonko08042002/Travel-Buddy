import { configs } from 'shared/lib/constant';
import Image from 'next/image';

export default function Logo() {
  return (
    <Image
      className='w-20 lg:w-28 max-w-full '
      src={configs.logo}
      alt='logo Travel Buddy'
    />
  );
}
