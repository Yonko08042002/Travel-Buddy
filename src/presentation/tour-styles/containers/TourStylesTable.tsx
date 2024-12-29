'use client';
import { DataTable } from 'shared/components/molecules/DataTable';
import { Heading } from 'shared/components/atoms/heading';
import { Separator } from 'shared/components/atoms/separator';
import type { ColumnDef } from '@tanstack/react-table';
import { CellAction } from 'shared/components/molecules/CellAction';
import { Button } from 'shared/components/atoms/button';
import { Plus } from 'lucide-react';
import { toast } from 'sonner';
import { useState } from 'react';
import type { TourStyle } from '@prisma/client';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import type { AddTourStyleInputs } from 'domain/tour-style/tour-style.schema';
import {
  deleteTourStyle,
  upsertTourStyle
} from 'application/use-cases/tour-style';
import UpsertTourStyleForm from '../components/UpsertTourStyleForm';
import { useTranslations } from 'next-intl';

dayjs.extend(relativeTime);

interface TourStylesClientProps {
  data: TourStyle[];
}

export const TourStylesTable = ({ data }: TourStylesClientProps) => {
  const [selectedColumn, setSelectedColumn] = useState<
    TourStyle | null | undefined
  >(undefined);
  const [loading, setLoading] = useState(false);
  const t = useTranslations();
  const onSubmit = async (data: AddTourStyleInputs) => {
    try {
      setLoading(true);
      await upsertTourStyle({
        id: selectedColumn?.id,
        ...data
      });

      toast.success(
        selectedColumn
          ? 'Tour Style updated successfully'
          : 'Tour Style added successfully'
      );
    } catch (_error) {
      toast.error('Failed to add blog');
    } finally {
      setLoading(false);
      setSelectedColumn(undefined);
    }
  };

  const columns: ColumnDef<TourStyle>[] = [
    {
      accessorKey: 'name',
      header: 'NAME'
    },
    {
      id: 'actions',
      cell: ({ row }) => (
        <CellAction
          onEdit={() => setSelectedColumn(row.original)}
          onDelete={() => deleteTourStyle(row.original.id)}
        />
      )
    }
  ];

  return (
    <div>
      <div className='flex items-start justify-between'>
        <Heading
          title={`Tour Styles (${data.length})`}
          description='Manage tour styles'
        />
        <Button onClick={() => setSelectedColumn(null)}>
          <Plus className='mr-2 h-4 w-4' />
          {t('buttonWeb.Add_new')}
        </Button>
      </div>
      <Separator />
      {selectedColumn !== undefined && (
        <UpsertTourStyleForm
          defaultValues={{
            name: selectedColumn?.name ?? ''
          }}
          title={selectedColumn ? 'Edit Blog' : 'Add Blog'}
          loading={loading}
          isOpen
          onSubmit={onSubmit}
          onClose={() => setSelectedColumn(undefined)}
        />
      )}
      <DataTable searchKey='name' columns={columns} data={data} />
    </div>
  );
};
