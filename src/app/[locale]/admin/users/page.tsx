import { getUser } from "application/use-cases/user";
import UserBreadcrumb from "presentation/users/components/UserBreadcrumb";
import { UsersTable } from "presentation/users/containers/UsersTable";

export const metadata = {
  title: "User",
};

export default async function User() {
  const users = await getUser();
  return (
    <section className="w-full">
      <UserBreadcrumb />
      <UsersTable data={users} />
    </section>
  );
}
