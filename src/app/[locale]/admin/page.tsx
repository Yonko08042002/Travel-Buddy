import { getAllPurchases } from "application/use-cases/purchase";
import { getTourById } from "application/use-cases/tour";
import { getUser, getUserById } from "application/use-cases/user";
import DashboardBreadcrumb from "presentation/dashboard/components/DashboardBreadcrumb";
import DashboardListLabel from "presentation/dashboard/components/DashboardListLabel";
import DashboardTab from "presentation/dashboard/container/DashboardTab";

export const metadata = {
  title: "Admin",
};
async function fetchSales() {
  const sales = await getAllPurchases();

  if (!sales) {
    throw new Error("No sales found");
  }

  const listSale = await Promise.all(
    sales.map(async (sale) => {
      const user = await getUserById(sale.userId);
      const tour = await getTourById(sale.tourId);
      if (!tour) {
        throw new Error("No tour found");
      }
      return {
        title: tour?.title,
        avatar: user?.avatar,
        email: user?.email,
        price: tour.price,
        ...sale,
      };
    })
  );

  return listSale;
}

export default async function AdminPage() {
  const users = await getUser();
  const listSale = await fetchSales();

  return (
    <section>
      <DashboardBreadcrumb />

      <DashboardListLabel sales={listSale} users={users} />
      <DashboardTab sales={listSale} />
    </section>
  );
}
