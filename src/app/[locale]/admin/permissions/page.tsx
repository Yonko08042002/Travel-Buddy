import { getPermissions } from 'application/use-cases/permission';
import { PermissionsTable } from 'presentation/permissions/containers/PermissionsTable';
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator
} from 'shared/components/atoms/breadcrumb';

export const metadata = {
  title: 'Permission'
};

export default async function Permission() {
  const permissions = await getPermissions();
  return (
    <section className='w-full'>
      <Breadcrumb className='mb-4'>
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink href='/admin'>Dashboard</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbLink href='/admin/permissions'>
              Permissions
            </BreadcrumbLink>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>
      <PermissionsTable data={permissions} />
    </section>
  );
}
