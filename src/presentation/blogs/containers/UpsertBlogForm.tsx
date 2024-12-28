import { Input } from 'shared/components/atoms/input';
import { Label } from 'shared/components/atoms/label';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { Modal } from 'shared/components/molecules/Modal';
import { DialogFooter } from 'shared/components/atoms/dialog';
import { LoadingButton } from 'shared/components/molecules/LoadingButton';
import { addBlogSchema, type AddBlogSchema } from 'domain/blog/blog.schema';
import {
  FileInput,
  FileUploader,
  FileUploaderContent,
  FileUploaderItem
} from 'shared/components/molecules/FileUploader';
import { useEffect, useState } from 'react';
import { convertFileFromUrl } from 'shared/helpers/create-file-from-url';
import { uploadImage } from 'shared/helpers/upload-image';
import Image from 'next/image';
import { UploadIcon } from 'lucide-react';
import { Textarea } from 'shared/components/atoms/textarea';

interface UpsertBlogFormProps {
  title: string;
  isOpen: boolean;
  onSubmit: (data: AddBlogSchema) => void;
  loading: boolean;
  onClose: () => void;
  defaultValues?: AddBlogSchema;
}

export default function UpsertBlogForm({
  title,
  isOpen,
  onSubmit,
  loading,
  onClose,
  defaultValues
}: UpsertBlogFormProps) {
  const [files, setFiles] = useState<File[]>([]);
  const [isUploadLoading, setIsUploadLoading] = useState(false);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
    setValue,
    setError
  } = useForm<AddBlogSchema>({
    mode: 'onBlur',
    resolver: zodResolver(addBlogSchema),
    defaultValues: defaultValues
  });

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

  const submit = async (data: AddBlogSchema) => {
    setIsUploadLoading(true);
    const image = await uploadImage(files[0]!);
    setIsUploadLoading(false);
    onSubmit({ ...data, image });
  };

  useEffect(() => {
    const convertFile = async () => {
      if (defaultValues?.image) {
        const file = await convertFileFromUrl(defaultValues.image);
        setFiles([file]);
      }
    };
    convertFile();
  }, [defaultValues?.image]);

  return (
    <Modal title={title} isOpen={isOpen} onClose={handleClose}>
      <form className='grid gap-4 py-4' onSubmit={handleSubmit(submit)}>
        <div className='grid grid-cols-4 items-center gap-4'>
          <Label htmlFor='name' className='text-right'>
            Title
          </Label>
          <div className='col-span-3'>
            <Input id='name' {...register('name')} />
            {errors.name && (
              <p className='text-sm mt-2 text-red-500'>{errors.name.message}</p>
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
        <div className='grid w-full'>
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
            <p className='text-sm mt-2 text-red-500'>{errors.image.message}</p>
          )}
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
