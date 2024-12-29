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
import UpsertTourForm from './UpsertTourForm';
import { deleteTour, upsertTour } from 'application/use-cases/tour';
import { TourType } from '@prisma/client';
import type { AddTourInputs, Tour } from 'domain/tour/tour.schema';
import dayjs from 'dayjs';
import { useTranslations } from 'next-intl';

interface ToursTableProps {
  data: Tour[];
}

export const ToursTable = ({ data }: ToursTableProps) => {
  const [selectedColumn, setSelectedColumn] = useState<Tour | null | undefined>(
    undefined
  );
  const [loading, setLoading] = useState(false);
  const t = useTranslations();
  const onSubmit = async (data: AddTourInputs) => {
    try {
      setLoading(true);
      await upsertTour({
        id: selectedColumn?.id,
        ...data
      });

      toast.success(
        selectedColumn ? 'Tour updated successfully' : 'Tour added successfully'
      );
    } catch (_error) {
      toast.error('Failed to add tour');
    } finally {
      setLoading(false);
      setSelectedColumn(undefined);
    }
  };

  const columns: ColumnDef<Tour>[] = [
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
          alt='tour'
          className='w-24 h-24 object-cover'
        />
      )
    },
    {
      accessorKey: 'price',
      header: 'PRICE'
    },
    {
      accessorKey: 'timeStart',
      header: 'TIME START',
      cell: ({ row }) => (
        <div>
          {dayjs(Number(row.original.timeStart)).format('DD/MM/YYYY :HH:mm')}
        </div>
      )
    },
    {
      accessorKey: 'duration',
      header: 'DURATION'
    },
    {
      id: 'actions',
      cell: ({ row }) => (
        <CellAction
          onEdit={() => setSelectedColumn(row.original)}
          onDelete={() => deleteTour(row.original.id)}
        />
      )
    }
  ];

  return (
    <div>
      <div className='flex items-start justify-between'>
        <Heading title={`Tours (${data.length})`} description='Manage tours' />
        <Button onClick={() => setSelectedColumn(null)}>
          <Plus className='mr-2 h-4 w-4' /> {t('buttonWeb.Add_new')}
        </Button>
      </div>
      <Separator />
      {selectedColumn !== undefined && (
        <UpsertTourForm
          defaultValues={{
            title: selectedColumn?.title ?? '',
            description: selectedColumn?.description ?? '',
            price: selectedColumn?.price ?? 0,
            timeStart: selectedColumn?.timeStart ?? new Date(),
            duration: selectedColumn?.duration ?? 0,
            image: selectedColumn?.image ?? '',
            tourType: selectedColumn?.tourType ?? TourType.DailyTour,
            tourStyleId: selectedColumn?.tourStyleId ?? ''
          }}
          title={selectedColumn ? 'Edit Tour' : 'Add Tour'}
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
