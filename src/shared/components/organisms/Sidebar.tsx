'use client';

import { type JSX, useMemo } from 'react';
import { cn } from 'shared/utils/cn';
import {
  Book,
  CircleDollarSign,
  Compass,
  Contact,
  LayoutDashboard,
  MapPin,
  ShieldCheck,
  TramFront,
  User,
  Video
} from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import type { UserWithRoles } from 'application/use-cases/user';
import { checkPermission, Permission } from 'shared/helpers/permission';
import { useTranslations } from 'next-intl';

type SidebarItem = {
  icon: JSX.Element;
  title: string;
  ref: string;
  permissions: Permission[];
};

type SidebarProps = {
  className?: string;
  user: UserWithRoles;
};

export default function Sidebar({ className, user }: SidebarProps) {
  const t = useTranslations('admin');
  const pathname = usePathname();

  const DEFAULT_SIDEBARS: SidebarItem[] = [
    {
      icon: <LayoutDashboard />,
      title: t('dashboard'),
      ref: '',
      permissions: []
    },
    { icon: <Video />, title: 'video', ref: '/videos', permissions: [] },
    {
      icon: <TramFront />,
      title: t('tours'),
      ref: '/tours',
      permissions: [Permission.ManageTour]
    },
    {
      icon: <MapPin />,
      title: t('destinations'),
      ref: '/destinations',
      permissions: []
    },
    {
      icon: <Contact />,
      title: t('roles'),
      ref: '/roles',
      permissions: [Permission.ManageRole]
    },
    {
      icon: <ShieldCheck />,
      title: t('permission'),
      ref: '/permissions',
      permissions: [Permission.ManagePermission]
    },
    {
      icon: <User />,
      title: t('users'),
      ref: '/users',
      permissions: [Permission.ManageUser]
    },
    {
      icon: <Book />,
      title: t('blogs'),
      ref: '/blogs',
      permissions: [Permission.ManageBlog]
    },
    {
      icon: <CircleDollarSign />,
      title: t('promotion'),
      ref: '/promotions',
      permissions: [Permission.ManagePromotion]
    },
    {
      icon: <Compass />,
      title: t('tour-style'),
      ref: '/tour-style',
      permissions: [Permission.ManageTourStyle]
    }
  ];

  // biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
  const sidebars = useMemo(() => {
    return DEFAULT_SIDEBARS.filter((sidebar) =>
      checkPermission(user.userRoles, sidebar.permissions)
    );
  }, [user]);

  return (
    <nav
      className={cn(
        'space-y-2 px-3 py-4 border-r border-gray-100 shadow-sm w-72',
        className
      )}
    >
      {sidebars.map((sidebar) => (
        <Link
          key={sidebar.title}
          href={`/admin${sidebar.ref}`}
          className={cn(
            'flex rounded items-center gap-2 py-2 px-4 hover:bg-primary hover:text-white text-gray-500',
            {
              'bg-primary text-white': pathname.endsWith(`/admin${sidebar.ref}`)
            }
          )}
        >
          {sidebar.icon}
          <span>{sidebar.title}</span>
        </Link>
      ))}
    </nav>
  );
}
