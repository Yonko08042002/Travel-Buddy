import { getRoles } from "application/use-cases/role";
import RolesBreadcrumb from "presentation/roles/components/RolesBreadcrumb";
import { RolesTable } from "presentation/roles/containers/RolesTable";

export const metadata = {
  title: "Role",
};

export default async function Role() {
  const roles = await getRoles();
  return (
    <section className="w-full">
      <RolesBreadcrumb />
      <RolesTable data={roles} />
    </section>
  );
}
