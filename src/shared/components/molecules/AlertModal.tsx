'use client';
import { Modal } from 'shared/components/molecules/Modal';
import useIsMounted from 'shared/hooks/useIsMounted';
import { AlertModalActions, type AlertModalProps } from './AlertModalActions';

export const AlertModal = ({
  isOpen,
  onClose,
  onConfirm,
  loading
}: AlertModalProps) => {
  const isMounted = useIsMounted();

  if (!isMounted) {
    return null;
  }

  return (
    <Modal
      title='Are you sure?'
      description='This action cannot be undone.'
      isOpen={isOpen}
      onClose={onClose}
    >
      <AlertModalActions
        loading={loading}
        onClose={onClose}
        onConfirm={onConfirm}
      />
    </Modal>
  );
};
