import { Button } from 'shared/components/atoms/button';
import { LoadingButton } from './LoadingButton';

export interface AlertModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  loading: boolean;
}

export const AlertModalActions = ({
  loading,
  onClose,
  onConfirm
}: Pick<AlertModalProps, 'loading' | 'onClose' | 'onConfirm'>) => (
  <div className='flex w-full items-center justify-end space-x-2 pt-6'>
    <Button disabled={loading} variant='ghost' onClick={onClose}>
      Cancel
    </Button>
    <LoadingButton
      disabled={loading}
      loading={loading}
      variant='destructive'
      onClick={onConfirm}
    >
      Continue
    </LoadingButton>
  </div>
);
