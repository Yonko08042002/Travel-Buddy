'use client';

import {
  forwardRef,
  type InputHTMLAttributes,
  type LegacyRef,
  useState
} from 'react';
import { Input } from 'shared/components/atoms/input';
import { Eye, EyeOff } from 'lucide-react';

interface InputPasswordProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  placeholder?: string;
  className?: string;
}

const InputPassword = forwardRef(
  (
    {
      label = 'Password',
      placeholder = 'Enter your password',
      className = '',
      ...props
    }: InputPasswordProps,
    ref: LegacyRef<HTMLInputElement> | undefined
  ) => {
    const [showPassword, setShowPassword] = useState<boolean>(false);

    return (
      <div className={`flex flex-col gap-1 relative ${className}`}>
        {label && <p className='text-black text-sm font-semibold'>{label}</p>}
        <Input
          ref={ref}
          type={showPassword ? 'text' : 'password'}
          placeholder={placeholder}
          {...props}
        />
        <button
          type='button'
          onClick={() => setShowPassword(!showPassword)}
          className='absolute inset-y-0 top-6 right-0 pr-3 flex items-center text-secondary cursor-pointer'
        >
          {showPassword ? <Eye size={20} /> : <EyeOff size={20} />}
        </button>
      </div>
    );
  }
);

export default InputPassword;
