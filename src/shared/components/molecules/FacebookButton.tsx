import * as React from 'react';

import { Button, type ButtonProps } from 'shared/components/atoms/button';
import { cn } from 'shared/utils/cn';

export interface FacebookButtonProps extends ButtonProps {
  loading?: boolean;
  children: React.ReactNode;
}

const FacebookButton = React.forwardRef<HTMLButtonElement, FacebookButtonProps>(
  ({ children, loading, ...props }, ref) => {
    return (
      <Button
        ref={ref}
        {...props}
        className={cn(
          'group bg-blue-600 flex h-10 w-full items-center justify-center space-x-2 rounded-none border border-blue-700 transition-colors duration-75 focus:outline-none hover:bg-blue-700 active:bg-blue-800',
          {
            'cursor-not-allowed': loading
          }
        )}
      >
        <svg
          className='h-4 w-4 text-white'
          aria-hidden='true'
          fill='currentColor'
          viewBox='0 0 24 24'
        >
          <path d='M22.675 0h-21.35c-.733 0-1.325.592-1.325 1.325v21.351c0 .733.592 1.324 1.325 1.324h11.495v-9.294h-3.128v-3.622h3.128v-2.671c0-3.1 1.894-4.788 4.659-4.788 1.325 0 2.463.099 2.795.143v3.24l-1.918.001c-1.504 0-1.794.715-1.794 1.763v2.312h3.587l-.467 3.622h-3.12v9.293h6.116c.733 0 1.325-.591 1.325-1.324v-21.35c0-.733-.592-1.325-1.325-1.325z' />
        </svg>
        <p className='text-sm font-medium text-white'>{children}</p>
      </Button>
    );
  }
);

FacebookButton.displayName = 'FacebookButton';

export { FacebookButton };
