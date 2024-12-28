'use client';
import { useMemo } from 'react';
import { cn } from 'shared/utils/cn';
import {
  Book,
  CircleDollarSign,
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

type SidebarProps = {
  className?: string;
  user: UserWithRoles;
};

const DEFAULT_SIDEBARS = [
  {
    icon: <LayoutDashboard />,
    title: 'Dashboard',
    ref: '',
    permissions: []
  },
  {
    icon: <Video />,
    title: 'Video',
    ref: '/videos',
    permissions: []
  },
  {
    icon: <TramFront />,
    title: 'Tour',
    ref: '/tours',
    permissions: [Permission.ManageTour]
  },
  {
    icon: <MapPin />,
    title: 'Destination',
    ref: '/destinations',
    permissions: []
  },
  {
    icon: <Contact />,
    title: 'Role',
    ref: '/roles',
    permissions: [Permission.ManageRole]
  },
  {
    icon: <ShieldCheck />,
    title: 'Permission',
    ref: '/permissions',
    permissions: [Permission.ManagePermission]
  },
  {
    icon: <User />,
    title: 'User',
    ref: '/users',
    permissions: [Permission.ManageUser]
  },
  {
    icon: <Book />,
    title: 'Blog',
    ref: '/blogs',
    permissions: [Permission.ManageBlog]
  },
  {
    icon: <CircleDollarSign />,
    title: 'Promotion',
    ref: '/promotions',
    permissions: [Permission.ManagePromotion]
  },
  {
    icon: <CircleDollarSign />,
    title: 'TourStyle',
    ref: '/tour-style',
    permissions: [Permission.ManageTourStyle]
  }
];

export default function Sidebar({ className, user }: SidebarProps) {
  const pathname = usePathname();

  const sidebars = useMemo(() => {
    const filteredSidebars = DEFAULT_SIDEBARS.filter((sidebar) =>
      checkPermission(user.userRoles, sidebar.permissions)
    );

    return filteredSidebars;
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
