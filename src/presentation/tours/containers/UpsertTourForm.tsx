import { Input } from 'shared/components/atoms/input';
import { Label } from 'shared/components/atoms/label';
import { zodResolver } from '@hookform/resolvers/zod';
import { Controller, useForm } from 'react-hook-form';
import { Modal } from 'shared/components/molecules/Modal';
import { DialogFooter } from 'shared/components/atoms/dialog';
import {
  FileInput,
  FileUploader,
  FileUploaderContent,
  FileUploaderItem
} from 'shared/components/molecules/FileUploader';
import { useEffect, useState } from 'react';
import Image from 'next/image';
import { UploadIcon } from 'lucide-react';
import { uploadImage } from 'shared/helpers/upload-image';
import { convertFileFromUrl } from 'shared/helpers/create-file-from-url';
import { Textarea } from 'shared/components/atoms/textarea';
import { LoadingButton } from 'shared/components/molecules/LoadingButton';
import { AddTourSchema, type AddTourInputs } from 'domain/tour/tour.schema';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from 'shared/components/atoms/select';
import { TourType } from 'infrastructure/database/prisma/kysely';
import TourStyleSelector from '../components/TourStyleSelector';

interface UpsertTourFormProps {
  title: string;
  isOpen: boolean;
  onSubmit: (data: AddTourInputs) => void;
  loading: boolean;
  onClose: () => void;
  defaultValues?: AddTourInputs;
}

const tourTypes = Object.values(TourType);
export default function UpsertTourForm({
  title,
  isOpen,
  onSubmit,
  loading,
  onClose,
  defaultValues
}: UpsertTourFormProps) {
  const [files, setFiles] = useState<File[]>([]);

  const [isUploadLoading, setIsUploadLoading] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
    setValue,
    setError,
    watch,
    control
  } = useForm<AddTourInputs>({
    mode: 'onBlur',
    resolver: zodResolver(AddTourSchema),
    defaultValues: defaultValues
  });

  const tourTypeValue = watch('tourType');
  const handleClose = () => {
    reset();
    onClose();
  };

  const onValueChange = (files: File[]) => {
    setFiles(files);
    if (files.length > 0) {
      setValue('image', files[0]!.name);
      setError('image', {
        type: 'manual',
        message: ''
      });
    } else {
      setValue('image', '');
    }
  };

  const submit = async (data: AddTourInputs) => {
    setIsUploadLoading(true);

    const image = await uploadImage(files[0]!);
    setIsUploadLoading(false);
    onSubmit({ ...data, image });
  };

  useEffect(() => {
    const convertDefaultValues = async () => {
      if (defaultValues?.image) {
        const file = await convertFileFromUrl(defaultValues.image);
        setFiles([file]);
      }
      if (defaultValues?.timeStart) {
        const formattedTime = new Date(defaultValues.timeStart);

        setValue('timeStart', formattedTime);
      }
    };
    convertDefaultValues();
  }, [defaultValues, setValue]);

  return (
    <Modal title={title} isOpen={isOpen} onClose={handleClose}>
      <form className='grid gap-4 py-4' onSubmit={handleSubmit(submit)}>
        <div className='grid grid-cols-4 items-center gap-4'>
          <Label htmlFor='title' className='text-right'>
            Title
          </Label>
          <div className='col-span-3'>
            <Input id='title' {...register('title')} />
            {errors.title && (
              <p className='text-sm mt-2 text-red-500'>
                {errors.title.message}
              </p>
            )}
          </div>
        </div>

        <div className='grid grid-cols-4 items-center gap-4'>
          <Label htmlFor='description' className='text-right'>
            Description
          </Label>
          <div className='col-span-3'>
            <Textarea id='description' {...register('description')} />
            {errors.description && (
              <p className='text-sm mt-2 text-red-500'>
                {errors.description.message}
              </p>
            )}
          </div>
        </div>
        <div className='grid grid-cols-4 items-center gap-4'>
          <Label htmlFor='startTime' className='text-right'>
            Start Time
          </Label>
          <div className='col-span-3'>
            <Input
              id='startTime'
              {...register('timeStart')}
              type='datetime-local'
            />
            {errors.timeStart && (
              <p className='text-sm mt-2 text-red-500'>
                {errors.timeStart.message}
              </p>
            )}
          </div>
        </div>
        <div className='grid grid-cols-4 items-center gap-4'>
          <Label htmlFor='image' className='text-right'>
            Image
          </Label>
          <div className='col-span-3'>
            <Input id='image' {...register('image')} className='hidden' />
            <FileUploader
              value={files}
              onValueChange={onValueChange}
              dropzoneOptions={{
                accept: {
                  'image/*': ['.jpg', '.jpeg', '.png']
                }
              }}
            >
              {files.length ? (
                <FileUploaderContent className='flex items-center flex-row gap-2'>
                  {files?.map((file, i) => (
                    <FileUploaderItem
                      key={String(i)}
                      index={i}
                      className='size-20 p-0 rounded-md overflow-hidden'
                      aria-roledescription={`file ${i + 1} containing ${
                        file.name
                      }`}
                    >
                      <Image
                        src={URL.createObjectURL(file)}
                        alt={file.name}
                        height={80}
                        width={80}
                        className='size-20 p-0'
                      />
                    </FileUploaderItem>
                  ))}
                </FileUploaderContent>
              ) : (
                <FileInput>
                  <div className='flex items-center justify-center h-10 w-full border bg-background rounded-md'>
                    <p className='text-gray-400 flex gap-4'>
                      <UploadIcon /> Drop files here
                    </p>
                  </div>
                </FileInput>
              )}
            </FileUploader>
            {errors.image && (
              <p className='text-sm mt-2 text-red-500'>
                {errors.image.message}
              </p>
            )}
          </div>
        </div>
        <div className='grid grid-cols-4 items-center gap-4'>
          <Label htmlFor='price' className='text-right'>
            Price
          </Label>
          <div className='col-span-3'>
            <Input
              id='price'
              {...register('price', {
                valueAsNumber: true
              })}
              type='number'
            />
            {errors.price && (
              <p className='text-sm mt-2 text-red-500'>
                {errors.price.message}
              </p>
            )}
          </div>
        </div>
        <div className='grid grid-cols-4 items-center gap-4'>
          <Label htmlFor='price' className='text-right'>
            Tour Type
          </Label>
          <div className='col-span-3'>
            <Select
              onValueChange={(
                value: 'PackageTour' | 'DailyTour' | 'TailorMadeTour'
              ) => setValue('tourType', value)}
              value={tourTypeValue}
            >
              <SelectTrigger>
                <SelectValue placeholder='Select Tour Type' />
              </SelectTrigger>
              <SelectContent>
                {tourTypes.map((tourType) => (
                  <SelectItem key={tourType} value={tourType}>
                    {tourType}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>
        <div className='grid grid-cols-4 items-center gap-4'>
          <Label htmlFor='duration' className='text-right'>
            Duration
          </Label>
          <div className='col-span-3'>
            <Input
              id='duration'
              {...register('duration', {
                valueAsNumber: true
              })}
              type='number'
            />
            {errors.duration && (
              <p className='text-sm mt-2 text-red-500'>
                {errors.duration.message}
              </p>
            )}
          </div>
        </div>
        <div className='grid grid-cols-4 items-center gap-4'>
          <Label htmlFor='tourStyleId' className='text-right'>
            Tour Style
          </Label>
          <div className='col-span-3'>
            <Controller
              control={control}
              name='tourStyleId'
              render={({ field: { onChange, value } }) => (
                <TourStyleSelector value={value} onValueChange={onChange} />
              )}
            />
            {errors.tourStyleId && (
              <p className='text-sm mt-2 text-red-500'>
                {errors.tourStyleId.message}
              </p>
            )}
          </div>
        </div>
        <DialogFooter>
          <LoadingButton type='submit' loading={loading || isUploadLoading}>
            Save{' '}
          </LoadingButton>
        </DialogFooter>
      </form>
    </Modal>
  );
}
