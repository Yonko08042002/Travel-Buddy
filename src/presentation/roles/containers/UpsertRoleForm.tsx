import { Input } from 'shared/components/atoms/input';
import { Label } from 'shared/components/atoms/label';
import { zodResolver } from '@hookform/resolvers/zod';
import { Controller, useForm } from 'react-hook-form';
import { Modal } from 'shared/components/molecules/Modal';
import { DialogFooter } from 'shared/components/atoms/dialog';
import PermissionSelector from '../components/PermissionSelector';
import type { UpsertRole } from 'application/use-cases/role';
import { LoadingButton } from 'shared/components/molecules/LoadingButton';
import {
  type InsertRole,
  UpdateRoleWithPermissionsSchema
} from 'domain/role/role.schema';

interface UpsertRoleFormProps {
  title: string;
  isOpen: boolean;
  onSubmit: (data: UpsertRole) => void;
  loading: boolean;
  onClose: () => void;
  defaultValues?: UpsertRole;
}

export default function UpsertRoleForm({
  title,
  isOpen,
  onSubmit,
  loading,
  onClose,
  defaultValues
}: UpsertRoleFormProps) {
  const {
    register,
    handleSubmit,
    reset,
    control,
    formState: { errors }
  } = useForm<InsertRole>({
    mode: 'onBlur',
    resolver: zodResolver(UpdateRoleWithPermissionsSchema),
    defaultValues: defaultValues
  });

  const handleClose = () => {
    reset();
    onClose();
  };

  const submit = (data: UpsertRole) => {
    onSubmit(data);
  };

  return (
    <Modal title={title} isOpen={isOpen} onClose={handleClose}>
      <form className='grid gap-4 py-4' onSubmit={handleSubmit(submit)}>
        <div className='grid grid-cols-4 items-center gap-4'>
          <Label htmlFor='name' className='text-right'>
            Name
          </Label>
          <div className='col-span-3'>
            <Input id='name' {...register('name')} />
            {errors.name && (
              <p className='text-sm mt-2 text-red-500'>{errors.name.message}</p>
            )}
          </div>
        </div>
        <div className='grid grid-cols-4 items-center gap-4'>
          <Label htmlFor='permissionIds' className='text-right'>
            Permissions
          </Label>
          <div className='col-span-3'>
            <Controller
              control={control}
              name='permissionIds'
              render={({ field: { onChange, value } }) => (
                <PermissionSelector values={value} onValuesChange={onChange} />
              )}
            />
            {errors.permissionIds && (
              <p className='text-sm mt-2 text-red-500'>
                {errors.permissionIds.message}
              </p>
            )}
          </div>
        </div>
        <DialogFooter>
          <LoadingButton type='submit' loading={loading}>
            Save
          </LoadingButton>
        </DialogFooter>
      </form>
    </Modal>
  );
}
