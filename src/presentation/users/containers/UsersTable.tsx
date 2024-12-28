'use client';
import { DataTable } from 'shared/components/molecules/DataTable';
import { Heading } from 'shared/components/atoms/heading';
import { Separator } from 'shared/components/atoms/separator';
import type { ColumnDef } from '@tanstack/react-table';
import { CellAction } from 'shared/components/molecules/CellAction';
import { toast } from 'sonner';
import { useState } from 'react';
import {
  deleteUser,
  updateUser,
  type UserWithRoles
} from 'application/use-cases/user';
import UpsertUserForm from './UpsertUserForm';
import type { UpdateUserSchema } from 'domain/user/user.schema';

interface UserTableProps {
  data: UserWithRoles[];
}

export const UsersTable = ({ data }: UserTableProps) => {
  const [selectedColumn, setSelectedColumn] = useState<
    UserWithRoles | null | undefined
  >(undefined);
  const [loading, setLoading] = useState(false);

  const onSubmit = async (data: UpdateUserSchema) => {
    try {
      setLoading(true);

      await updateUser(selectedColumn!.id, data);

      toast.success(
        selectedColumn ? 'User updated successfully' : 'User added successfully'
      );
    } catch (_error) {
      toast.error('Failed to add User');
    } finally {
      setLoading(false);
      setSelectedColumn(undefined);
    }
  };

  const columns: ColumnDef<UserWithRoles>[] = [
    {
      accessorKey: 'email',
      header: 'Email'
    },
    {
      accessorKey: 'roles',
      header: 'ROLES',
      cell: ({ row }) => (
        <div className='flex flex-wrap'>
          {row.original.userRoles?.map((userRole) => (
            <span
              key={userRole.role.id}
              className='bg-gray-200 px-2 py-1 rounded-full text-xs mr-1'
            >
              {userRole.role.name}
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
          onDelete={() => deleteUser(row.original.id)}
        />
      )
    }
  ];

  return (
    <div>
      <div className='flex items-start justify-between'>
        <Heading
          title={`Users (${data.length})`}
          description='Manage permissions'
        />
      </div>
      <Separator />
      {selectedColumn !== undefined && (
        <UpsertUserForm
          defaultValues={{
            email: selectedColumn?.email ?? '',
            roleIds:
              selectedColumn?.userRoles?.map((role) => role.role.id) ?? []
          }}
          title={'Edit user'}
          loading={loading}
          isOpen
          onSubmit={onSubmit}
          onClose={() => setSelectedColumn(undefined)}
        />
      )}
      <DataTable searchKey='email' columns={columns} data={data} />
    </div>
  );
};
