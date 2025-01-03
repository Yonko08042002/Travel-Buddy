import { getPermissions } from "application/use-cases/permission";
import PermissionsBreadcrumb from "presentation/permissions/components/PermissionsBreadcrumb";
import { PermissionsTable } from "presentation/permissions/containers/PermissionsTable";

export const metadata = {
  title: "Permission",
};

export default async function Permission() {
  const permissions = await getPermissions();
  return (
    <section className="w-full">
      <PermissionsBreadcrumb />
      <PermissionsTable data={permissions} />
    </section>
  );
}
