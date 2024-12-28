import { Input } from 'shared/components/atoms/input';
import { Label } from 'shared/components/atoms/label';
import { zodResolver } from '@hookform/resolvers/zod';
import { Controller, useForm } from 'react-hook-form';
import { Modal } from 'shared/components/molecules/Modal';
import { DialogFooter } from 'shared/components/atoms/dialog';
import RoleSelector from '../components/RoleSelector';
import { LoadingButton } from 'shared/components/molecules/LoadingButton';
import {
  UpdateUserWithRolesSchema,
  type UpdateUserSchema
} from 'domain/user/user.schema';

interface UpsertUserFormProps {
  title: string;
  isOpen: boolean;
  onSubmit: (data: UpdateUserSchema) => void;
  loading: boolean;
  onClose: () => void;
  defaultValues?: Partial<UpdateUserSchema>;
}

export default function UpsertUserForm({
  title,
  isOpen,
  onSubmit,
  loading,
  onClose,
  defaultValues
}: UpsertUserFormProps) {
  const {
    register,
    handleSubmit,
    reset,
    control,
    formState: { errors }
  } = useForm<UpdateUserSchema>({
    mode: 'onBlur',
    resolver: zodResolver(UpdateUserWithRolesSchema),
    defaultValues: defaultValues
  });

  const handleClose = () => {
    reset();
    onClose();
  };

  const submit = (data: UpdateUserSchema) => {
    onSubmit(data);
  };

  return (
    <Modal title={title} isOpen={isOpen} onClose={handleClose}>
      <form className='grid gap-4 py-4' onSubmit={handleSubmit(submit)}>
        <div className='grid grid-cols-4 items-center gap-4'>
          <Label htmlFor='name' className='text-right'>
            Email
          </Label>
          <div className='col-span-3'>
            <Input id='name' {...register('email')} />
            {errors.email && (
              <p className='text-sm mt-2 text-red-500'>
                {errors.email.message}
              </p>
            )}
          </div>
        </div>
        <div className='grid grid-cols-4 items-center gap-4'>
          <Label htmlFor='roleIds' className='text-right'>
            Roles
          </Label>
          <div className='col-span-3'>
            <Controller
              control={control}
              name='roleIds'
              render={({ field: { onChange, value } }) => (
                <RoleSelector values={value} onValuesChange={onChange} />
              )}
            />
            {errors.roleIds && (
              <p className='text-sm mt-2 text-red-500'>
                {errors.roleIds.message}
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
