import { getRoles } from 'application/use-cases/role';
import { RolesTable } from 'presentation/roles/containers/RolesTable';
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator
} from 'shared/components/atoms/breadcrumb';

export const metadata = {
  title: 'Role'
};

export default async function Role() {
  const roles = await getRoles();
  return (
    <section className='w-full'>
      <Breadcrumb className='mb-4'>
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink href='/admin'>Dashboard</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbLink href='/admin/roles'>Roles</BreadcrumbLink>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>
      <RolesTable data={roles} />
    </section>
  );
}
