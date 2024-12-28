import type { TourStyle } from "@prisma/client";
import type { ColumnDef } from "@tanstack/react-table";
import { getPurchaseByIdUser } from "application/use-cases/purchase";
import { getTourById } from "application/use-cases/tour";
import type { UserWithRoles } from "application/use-cases/user";
import { DataTable } from "shared/components/molecules/DataTable";

interface UserProps {
  user: UserWithRoles | null;
}

interface PurchaseWithTour {
  id?: string;
  image?: string;
  title?: string;
  description?: string;
  price?: number;
  duration?: number;
  tourStyleId?: string;
  timeStart?: Date | null;
  amount: number;
  createdAt: Date;
}

export default async function PurchaseTable({ user }: UserProps) {
  if (!user) {
    return null;
  }

  const purchases = await getPurchaseByIdUser(user.id);
  if (!purchases || purchases.length === 0) {
    return <div>No purchases found.</div>;
  }

  const listPurchase: PurchaseWithTour[] = await Promise.all(
    purchases.map(async (purchase) => {
      const tour = await getTourById(purchase.tourId);
      return {
        ...tour,
        amount: purchase.amount,
        createdAt: purchase.createdAt,
      };
    })
  );

  const columns: ColumnDef<PurchaseWithTour>[] = [
    {
      accessorKey: "title",
      header: "Tên tour",
    },
    // {
    //   accessorKey: "image",
    //   header: "Anh",
    // },
    {
      accessorKey: "timeStart",
      header: "Ngày đi",
    },
    {
      accessorKey: "amount",
      header: "Số lượng",
    },
    {
      accessorKey: "price",
      header: "Giá",
    },
    {
      accessorKey: "createdAt",
      header: "Ngày thanh toán",
    },
  ];

  return (
    <div className="w-full ">
      <DataTable columns={columns} data={listPurchase} searchKey="title" />
    </div>
  );
}
