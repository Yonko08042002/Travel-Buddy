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
import UpsertRoleForm from './UpsertRoleForm';
import {
  upsertRole,
  type RoleWithPermissions,
  deleteRole
} from 'application/use-cases/role';
import type { InsertRole } from 'domain/role/role.schema';
import { useTranslations } from 'next-intl';

interface RolesTableProps {
  data: RoleWithPermissions[];
}

export const RolesTable = ({ data }: RolesTableProps) => {
  const [selectedColumn, setSelectedColumn] = useState<
    RoleWithPermissions | null | undefined
  >(undefined);
  const [loading, setLoading] = useState(false);
  const t = useTranslations();
  const onSubmit = async (data: InsertRole) => {
    try {
      setLoading(true);

      await upsertRole({
        id: selectedColumn?.id,
        ...data
      });

      toast.success(
        selectedColumn ? 'Role updated successfully' : 'Role added successfully'
      );
    } catch (_error) {
      toast.error('Failed to add role');
    } finally {
      setLoading(false);
      setSelectedColumn(undefined);
    }
  };

  const columns: ColumnDef<RoleWithPermissions>[] = [
    {
      accessorKey: 'name',
      header: 'NAME',
      meta: {
        headerClassName: 'w-40'
      }
    },
    {
      accessorKey: 'permissions',
      header: 'PERMISSIONS',
      cell: ({ row }) => (
        <div className='flex flex-wrap gap-2'>
          {row.original.rolePermissions.map((rolePermission) => (
            <span
              key={rolePermission.permission.id}
              className='bg-gray-200 px-2 py-1 rounded-full text-xs mr-1'
            >
              {rolePermission.permission.name}
            </span>
          ))}
        </div>
      )
    },
    {
      id: 'actions',
      cell: ({ row }) => (
        <CellAction
          onEdit={() => setSelectedColumn(row.original)}
          onDelete={() => deleteRole(row.original.id)}
        />
      )
    }
  ];

  return (
    <div>
      <div className='flex items-start justify-between'>
        <Heading title={`Roles (${data.length})`} description='Manage roles' />
        <Button onClick={() => setSelectedColumn(null)}>
          <Plus className='mr-2 h-4 w-4' /> {t('buttonWeb.Add_new')}
        </Button>
      </div>
      <Separator />
      {selectedColumn !== undefined && (
        <UpsertRoleForm
          defaultValues={{
            name: selectedColumn?.name ?? '',
            permissionIds:
              selectedColumn?.rolePermissions.map(
                (rolePermission) => rolePermission.permission.id
              ) ?? []
          }}
          title={selectedColumn ? 'Edit Role' : 'Add Role'}
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
