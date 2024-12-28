import * as React from 'react';

import { Button, type ButtonProps } from 'shared/components/atoms/button';
import { cn } from 'shared/utils/cn';

export interface GoogleButtonProps extends ButtonProps {
  loading?: boolean;
  children: React.ReactNode;
}

const GoogleButton = React.forwardRef<HTMLButtonElement, GoogleButtonProps>(
  ({ children, loading, ...props }, ref) => {
    return (
      <Button
        ref={ref}
        {...props}
        className={cn(
          ' group bg-white flex h-10 w-full items-center justify-center space-x-2 rounded-none border border-gray-300 transition-colors duration-75 focus:outline-none hover:bg-gray-100 active:bg-gray-200',
          {
            'cursor-not-allowed': loading
          }
        )}
      >
        <svg
          className='h-4 w-4'
          aria-hidden='true'
          fill='currentColor'
          viewBox='0 0 24 24'
        >
          <path
            d='M21.35 11.1h-9.15v2.8h5.25c-.25 1.3-1 2.4-2.1 3.1v2.6h3.4c2-1.8 3.2-4.4 3.2-7.5 0-.5 0-1-.1-1.5z'
            fill='#4285F4'
          />
          <path
            d='M12.2 21.5c2.8 0 5.1-1 6.8-2.6l-3.4-2.6c-1 .7-2.2 1.1-3.4 1.1-2.6 0-4.8-1.7-5.6-4.1H3.1v2.6c1.7 3.4 5.2 5.6 9.1 5.6z'
            fill='#34A853'
          />
          <path
            d='M6.6 13.3c-.2-.7-.4-1.4-.4-2.1s.1-1.4.4-2.1V6.5H3.1C2.4 7.9 2 9.4 2 11s.4 3.1 1.1 4.5l3.5-2.2z'
            fill='#FBBC05'
          />
          <path
            d='M12.2 4.8c1.5 0 2.8.5 3.8 1.4l2.8-2.8C16.9 1.7 14.6.7 12.2.7 8.3.7 4.8 2.9 3.1 6.5l3.5 2.6c.8-2.4 3-4.3 5.6-4.3z'
            fill='#EA4335'
          />
        </svg>
        <p className='text-sm font-medium text-gray-700'>{children}</p>
      </Button>
    );
  }
);

GoogleButton.displayName = 'GoogleButton';

export { GoogleButton };
