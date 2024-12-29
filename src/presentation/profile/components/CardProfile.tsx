import type { UserWithRoles } from 'application/use-cases/user';
import { Mail, User } from 'lucide-react';
import { useTranslations } from 'next-intl';
import {
  Avatar,
  AvatarFallback,
  AvatarImage
} from 'shared/components/atoms/avatar';
import { Badge } from 'shared/components/atoms/badge';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle
} from 'shared/components/atoms/card';

interface UserProps {
  user: UserWithRoles | null;
}
export default function CardProfile({ user }: UserProps) {
  if (!user) {
    return null;
  }
  const t = useTranslations();
  const getRoleBadgeColor = (role: string) => {
    switch (role) {
      case 'admin':
        return 'bg-red-500';
      case 'staff':
        return 'bg-blue-500';
      default:
        return 'bg-green-500';
    }
  };
  return (
    <Card className='w-full max-w-md mx-auto'>
      <CardHeader className='text-center'>
        <CardTitle>{t('Profile.title')}</CardTitle>
      </CardHeader>
      <CardContent className='space-y-6'>
        <div className='flex flex-col items-center'>
          <Avatar className='w-24 h-24'>
            <AvatarImage src={user.avatar || ''} alt={user.name || ''} />
            <AvatarFallback>
              <User className='w-12 h-12 text-gray-400' />
            </AvatarFallback>
          </Avatar>
          <Badge
            className={`mt-2 ${getRoleBadgeColor(
              user?.userRoles.map((role) => role.role.name).join(', ')
            )}`}
          >
            <p>
              {user?.userRoles && user.userRoles.length > 0
                ? user.userRoles.map((role) => role.role.name).join(', ')
                : 'khách hàng'}
            </p>
          </Badge>
        </div>

        <div className='space-y-4'>
          <div className='space-y-2'>
            <p className='text-sm font-medium text-gray-500'>
              {t('Profile.name')}
            </p>
            <div className='flex items-center space-x-2 p-2 bg-gray-50 rounded-md'>
              <User className='w-5 h-5 text-gray-400' />
              <span className='text-gray-900'>{user.name}</span>
            </div>
          </div>

          <div className='space-y-2'>
            <p className='text-sm font-medium text-gray-500'>
              {t('Profile.email')}
            </p>
            <div className='flex items-center space-x-2 p-2 bg-gray-50 rounded-md'>
              <Mail className='w-5 h-5 text-gray-400' />
              <span className='text-gray-900'>{user.email}</span>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
