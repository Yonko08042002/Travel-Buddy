'use client';
import type { ColumnDef } from '@tanstack/react-table';
import { ArrowUpDown } from 'lucide-react';
import { Button } from 'shared/components/atoms/button';
import { DataTable } from 'shared/components/molecules/DataTable';

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

type PurchaseProg = {
  data: PurchaseWithTour[];
};
export default function PurchaseTable({ data }: PurchaseProg) {
  const columns: ColumnDef<PurchaseWithTour>[] = [
    {
      accessorKey: 'title',
      header: 'Tên tour'
    },

    {
      accessorKey: 'timeStart',
      header: ({ column }) => (
        <Button
          variant='ghost'
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
        >
          Ngày đi
          <ArrowUpDown />
        </Button>
      ),
      cell: ({ getValue }) => {
        const date = getValue() as Date | null;
        return date
          ? new Intl.DateTimeFormat('vi-VN', {
              dateStyle: 'short',
              timeStyle: 'short'
            }).format(new Date(date))
          : '-';
      }
    },
    {
      accessorKey: 'amount',
      header: 'Số lượng'
    },
    {
      accessorKey: 'price',
      header: 'Giá'
    },
    {
      accessorKey: 'createdAt',
      header: 'Ngày thanh toán',
      cell: ({ getValue }) => {
        const date = getValue() as Date;
        return new Intl.DateTimeFormat('vi-VN', {
          dateStyle: 'short',
          timeStyle: 'medium'
        }).format(new Date(date));
      }
    }
  ];
  return <DataTable columns={columns} data={data} searchKey='title' />;
}
