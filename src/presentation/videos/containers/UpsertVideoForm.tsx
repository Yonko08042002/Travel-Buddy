import { Input } from 'shared/components/atoms/input';
import { Label } from 'shared/components/atoms/label';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { Modal } from 'shared/components/molecules/Modal';
import { DialogFooter } from 'shared/components/atoms/dialog';
import { type AddVideoInputs, AddVideoSchema } from 'domain/video/video.schema';
import { LoadingButton } from 'shared/components/molecules/LoadingButton';

interface UpsertVideoFormProps {
  title: string;
  isOpen: boolean;
  onSubmit: (data: AddVideoInputs) => void;
  loading: boolean;
  onClose: () => void;
  defaultValues?: AddVideoInputs;
}

export default function UpsertVideoForm({
  title,
  isOpen,
  onSubmit,
  loading,
  onClose,
  defaultValues
}: UpsertVideoFormProps) {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors }
  } = useForm<AddVideoInputs>({
    mode: 'onBlur',
    resolver: zodResolver(AddVideoSchema),
    defaultValues: defaultValues
  });

  const handleClose = () => {
    reset();
    onClose();
  };

  return (
    <Modal title={title} isOpen={isOpen} onClose={handleClose}>
      <form className='grid gap-4 py-4' onSubmit={handleSubmit(onSubmit)}>
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
          <Label htmlFor='link' className='text-right'>
            Link
          </Label>
          <div className='col-span-3'>
            <Input {...register('link')} id='link' />
            {errors.link && (
              <p className='text-sm mt-2 text-red-500'>{errors.link.message}</p>
            )}
          </div>
        </div>
        <DialogFooter>
          <LoadingButton type='submit' loading={loading}>
            Save{' '}
          </LoadingButton>
        </DialogFooter>
      </form>
    </Modal>
  );
}
