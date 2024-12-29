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
import { deleteTour } from 'application/use-cases/tour';
import { upsertPermission } from 'application/use-cases/permission';
import UpsertPermissionForm from './UpsertPermissionForm';
import type { Permission } from '@prisma/client';
import type { AddPermissionInputs } from 'domain/permission/permission.schema';
import { useTranslations } from 'next-intl';

interface PermissionsTableProps {
  data: Permission[];
}

export const PermissionsTable = ({ data }: PermissionsTableProps) => {
  const [selectedColumn, setSelectedColumn] = useState<
    Permission | null | undefined
  >(undefined);
  const [loading, setLoading] = useState(false);
  const t = useTranslations();
  const onSubmit = async (data: AddPermissionInputs) => {
    try {
      setLoading(true);
      await upsertPermission({
        id: selectedColumn?.id,
        ...data
      });

      toast.success(
        selectedColumn
          ? 'Permission updated successfully'
          : 'Permission added successfully'
      );
    } catch (_error) {
      toast.error('Failed to add permission');
    } finally {
      setLoading(false);
      setSelectedColumn(undefined);
    }
  };

  const columns: ColumnDef<Permission>[] = [
    {
      accessorKey: 'name',
      header: 'NAME'
    },
    {
      accessorKey: 'slug',
      header: 'SLUG'
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
        <Heading
          title={`Permissions (${data.length})`}
          description='Manage permissions'
        />
        <Button onClick={() => setSelectedColumn(null)}>
          <Plus className='mr-2 h-4 w-4' /> {t('buttonWeb.Add_new')}
        </Button>
      </div>
      <Separator />
      {selectedColumn !== undefined && (
        <UpsertPermissionForm
          defaultValues={{
            name: selectedColumn?.name ?? '',
            slug: selectedColumn?.slug ?? ''
          }}
          title={selectedColumn ? 'Edit Permission' : 'Add Permission'}
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
