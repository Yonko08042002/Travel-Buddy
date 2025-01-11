import Header from 'shared/components/organisms/Header';
import Sidebar from 'shared/components/organisms/Sidebar';
import { getMe } from 'application/use-cases/user';
import type { ReactNode } from 'react';

export default async function Layout({ children }: { children: ReactNode }) {
  const me = await getMe();

  if (!me) return null;

  return (
    <>
      <Header user={me} />
      <div className='flex  overflow-hidden'>
        <Sidebar user={me} />
        <main className='py-4 px-8 w-full'>{children}</main>
      </div>
    </>
  );
}
