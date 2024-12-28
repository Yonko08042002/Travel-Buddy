import { Input } from 'shared/components/atoms/input';
import { Label } from 'shared/components/atoms/label';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { Modal } from 'shared/components/molecules/Modal';
import { DialogFooter } from 'shared/components/atoms/dialog';
import { LoadingButton } from 'shared/components/molecules/LoadingButton';
import {
  AddPermissionSchema,
  type AddPermissionInputs
} from 'domain/permission/permission.schema';

interface UpsertPermissionFormProps {
  title: string;
  isOpen: boolean;
  onSubmit: (data: AddPermissionInputs) => void;
  loading: boolean;
  onClose: () => void;
  defaultValues?: AddPermissionInputs;
}

export default function UpsertPermissionForm({
  title,
  isOpen,
  onSubmit,
  loading,
  onClose,
  defaultValues
}: UpsertPermissionFormProps) {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors }
  } = useForm<AddPermissionInputs>({
    mode: 'onBlur',
    resolver: zodResolver(AddPermissionSchema),
    defaultValues: defaultValues
  });

  const handleClose = () => {
    reset();
    onClose();
  };

  const submit = (data: AddPermissionInputs) => {
    onSubmit({ ...data });
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
          <Label htmlFor='slug' className='text-right'>
            Slug
          </Label>
          <div className='col-span-3'>
            <Input id='slug' {...register('slug')} />
            {errors.slug && (
              <p className='text-sm mt-2 text-red-500'>{errors.slug.message}</p>
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
