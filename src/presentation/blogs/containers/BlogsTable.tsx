'use client';
import { DataTable } from 'shared/components/molecules/DataTable';
import { Heading } from 'shared/components/atoms/heading';
import { Separator } from 'shared/components/atoms/separator';
import type { ColumnDef } from '@tanstack/react-table';
import { CellAction } from 'shared/components/molecules/CellAction';
import { deleteBlog, upsertBlog } from 'application/use-cases/blog';
import { Button } from 'shared/components/atoms/button';
import { Plus } from 'lucide-react';
import { toast } from 'sonner';
import UpsertBlogForm from './UpsertBlogForm';
import { useState } from 'react';
import type { Blog } from '@prisma/client';
import type { AddBlogSchema } from 'domain/blog/blog.schema';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import { useTranslations } from 'next-intl';

dayjs.extend(relativeTime);

interface BlogsClientProps {
  data: Blog[];
}

export const BlogsTable = ({ data }: BlogsClientProps) => {
  const [selectedColumn, setSelectedColumn] = useState<Blog | null | undefined>(
    undefined
  );
  const [loading, setLoading] = useState(false);
  const t = useTranslations();
  const onSubmit = async (data: AddBlogSchema) => {
    try {
      setLoading(true);
      await upsertBlog({
        id: selectedColumn?.id,
        ...data
      });

      toast.success(
        selectedColumn ? 'Blog updated successfully' : 'Blog added successfully'
      );
    } catch (_error) {
      toast.error('Failed to add blog');
    } finally {
      setLoading(false);
      setSelectedColumn(undefined);
    }
  };

  const columns: ColumnDef<Blog>[] = [
    {
      accessorKey: 'name',
      header: 'NAME'
    },
    {
      accessorKey: 'createdAt',
      header: 'CREATED AT',
      cell: ({ row }) => (
        <div>
          {dayjs(Number(row.original.createdAt)).format('DD/MM/YYYY :HH:mm')}
        </div>
      )
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
      accessorKey: 'description',
      header: 'DESCRIPTION'
    },

    {
      id: 'actions',
      cell: ({ row }) => (
        <CellAction
          onEdit={() => setSelectedColumn(row.original)}
          onDelete={() => deleteBlog(row.original.id)}
        />
      )
    }
  ];

  return (
    <div>
      <div className='flex items-start justify-between'>
        <Heading title={`Blogs (${data.length})`} description='Manage blogs' />
        <Button onClick={() => setSelectedColumn(null)}>
          <Plus className='mr-2 h-4 w-4' /> {t('buttonWeb.Add_new')}
        </Button>
      </div>
      <Separator />
      {selectedColumn !== undefined && (
        <UpsertBlogForm
          defaultValues={{
            name: selectedColumn?.name ?? '',
            description: selectedColumn?.description ?? '',
            image: selectedColumn?.image ?? ''
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
