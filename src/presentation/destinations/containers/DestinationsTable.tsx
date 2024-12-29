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
import {
  deleteDestination,
  upsertDestination
} from 'application/use-cases/destination';
import UpsertDestinationForm from './UpsertDestinationForm';
import type { Destination } from '@prisma/client';
import type { AddDestinationInputs } from 'domain/destination/destination.schema';
import { useTranslations } from 'next-intl';

interface ProductsClientProps {
  data: Destination[];
}

export const DestinationsTable = ({ data }: ProductsClientProps) => {
  const [selectedColumn, setSelectedColumn] = useState<
    Destination | null | undefined
  >(undefined);
  const [loading, setLoading] = useState(false);
  const t = useTranslations();
  const onSubmit = async (data: AddDestinationInputs) => {
    try {
      setLoading(true);
      await upsertDestination({
        id: selectedColumn?.id,
        ...data
      });

      toast.success(
        selectedColumn
          ? 'Destination updated successfully'
          : 'Destination added successfully'
      );
    } catch (_error) {
      toast.error('Failed to add destination');
    } finally {
      setLoading(false);
      setSelectedColumn(undefined);
    }
  };

  const columns: ColumnDef<Destination>[] = [
    {
      accessorKey: 'title',
      header: 'TITLE'
    },
    {
      accessorKey: 'description',
      header: 'DESCRIPTION'
    },
    {
      accessorKey: 'image',
      header: 'IMAGE',
      cell: ({ row }) => (
        <img
          src={row.original.image}
          alt='destination'
          className='w-24 h-24 object-cover'
        />
      )
    },
    {
      id: 'actions',
      cell: ({ row }) => (
        <CellAction
          onEdit={() => setSelectedColumn(row.original)}
          onDelete={() => deleteDestination(row.original.id)}
        />
      )
    }
  ];

  return (
    <div>
      <div className='flex items-start justify-between'>
        <Heading
          title={`Destination (${data.length})`}
          description='Manage destinations'
        />
        <Button onClick={() => setSelectedColumn(null)}>
          <Plus className='mr-2 h-4 w-4' /> {t('buttonWeb.Add_new')}
        </Button>
      </div>
      <Separator />
      {selectedColumn !== undefined && (
        <UpsertDestinationForm
          defaultValues={{
            title: selectedColumn?.title ?? '',
            description: selectedColumn?.description ?? '',
            image: selectedColumn?.image ?? ''
          }}
          title={selectedColumn ? 'Edit Destination' : 'Add Destination'}
          loading={loading}
          isOpen
          onSubmit={onSubmit}
          onClose={() => setSelectedColumn(undefined)}
        />
      )}
      <DataTable searchKey='title' columns={columns} data={data} />
    </div>
  );
};
