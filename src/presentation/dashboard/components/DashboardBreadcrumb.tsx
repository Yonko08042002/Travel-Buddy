import { useTranslations } from 'next-intl';
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList
} from 'shared/components/atoms/breadcrumb';
export default function DashboardBreadcrumb() {
  const t = useTranslations('admin');
  return (
    <Breadcrumb className='mb-4'>
      <BreadcrumbList>
        <BreadcrumbItem>
          <BreadcrumbLink href='/admin'> {t('dashboard')}</BreadcrumbLink>
        </BreadcrumbItem>
      </BreadcrumbList>
    </Breadcrumb>
  );
}
