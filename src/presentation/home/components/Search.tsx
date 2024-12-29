'use client';
import { Input } from 'shared/components/atoms/input';
import { SearchIcon } from 'lucide-react';
import { Typewriter } from 'react-simple-typewriter';
import { useState } from 'react';
import { useTranslations } from 'next-intl';

export default function Search() {
  const [isFocused, setIsFocused] = useState(false);
  const [text, setText] = useState('');
  const t = useTranslations();
  return (
    <div className='relative rounded-full shadow-sm'>
      <div className=' absolute inset-y-0 left-0 flex items-center pl-3 cursor-pointer z-10'>
        <SearchIcon className='h-5 w-5 text-primary cursor-pointer' />
      </div>
      <Input
        placeholder={isFocused ? '' : text}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        onChange={() => setText('')}
        className='pl-10 rounded-full'
      />
      {!isFocused && (
        <div className='absolute inset-y-0 text-gray-500 left-0 flex items-center pl-10 pointer-events-none'>
          <Typewriter
            words={[`${t('buttonWeb.search')}`]}
            loop={0}
            cursor
            cursorStyle='_'
            typeSpeed={70}
            deleteSpeed={50}
            delaySpeed={1000}
            onType={(count) => {
              setText('Search'.slice(0, count));
            }}
            onDelete={() => setText('')}
          />
        </div>
      )}
    </div>
  );
}
