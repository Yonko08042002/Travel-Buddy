import { Input } from 'shared/components/atoms/input';
import { Label } from 'shared/components/atoms/label';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { Modal } from 'shared/components/molecules/Modal';
import { DialogFooter } from 'shared/components/atoms/dialog';
import { LoadingButton } from 'shared/components/molecules/LoadingButton';
import {
  AddPromotionSchema,
  type AddPromotionInputs
} from 'domain/promotion/promotion.schema';

interface UpsertPromotionFormProps {
  title: string;
  isOpen: boolean;
  onSubmit: (data: AddPromotionInputs) => void;
  loading: boolean;
  onClose: () => void;
  defaultValues?: AddPromotionInputs;
}

export default function UpsertPromotionForm({
  title,
  isOpen,
  onSubmit,
  loading,
  onClose,
  defaultValues
}: UpsertPromotionFormProps) {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors }
  } = useForm<AddPromotionInputs>({
    mode: 'onBlur',
    resolver: zodResolver(AddPromotionSchema),
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
          <Label htmlFor='startDate' className='text-right'>
            Start Date
          </Label>
          <div className='col-span-3'>
            <Input id='startDate' {...register('startDate')} />
            {errors.startDate && (
              <p className='text-sm mt-2 text-red-500'>
                {errors.startDate.message}
              </p>
            )}
          </div>
        </div>
        <div className='grid grid-cols-4 items-center gap-4'>
          <Label htmlFor='endDate' className='text-right'>
            End Date
          </Label>
          <div className='col-span-3'>
            <Input id='endDate' {...register('endDate')} />
            {errors.endDate && (
              <p className='text-sm mt-2 text-red-500'>
                {errors.endDate.message}
              </p>
            )}
          </div>
        </div>
        <div className='grid grid-cols-4 items-center gap-4'>
          <Label htmlFor='discountPercentage' className='text-right'>
            Discount Percentage
          </Label>
          <div className='col-span-3'>
            <Input
              id='discountPercentage'
              {...register('discountPercentage')}
            />
            {errors.discountPercentage && (
              <p className='text-sm mt-2 text-red-500'>
                {errors.discountPercentage.message}
              </p>
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
