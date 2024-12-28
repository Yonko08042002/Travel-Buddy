import { Card, CardContent, CardFooter } from 'shared/components/atoms/card';

import { Button } from 'shared/components/atoms/button';
import { ArrowRight } from 'lucide-react';
import type { Blog } from '@prisma/client';
import dayjs from 'dayjs';

interface BlogCardProps {
  blog: Blog;
}
export default function BlogsCard({ blog }: BlogCardProps) {
  return (
    <Card className='group rounded-none overflow-hidden border-none shadow-lg'>
      <CardContent className='p-0'>
        <div className='relative aspect-[4/3] overflow-hidden'>
          <img
            src={blog.image}
            alt=''
            className='absolute inset-0 w-full h-full object-cover transition-transform duration-300 group-hover:scale-105'
          />
        </div>
        <div className='p-4'>
          <time className='text-sm text-gray-500'>
            {dayjs(Number(blog.createdAt)).format('MMM DD, YYYY')}
          </time>
          <h3 className='font-semibold text-lg mt-2 mb-2 line-clamp-2'>
            {blog.name}
          </h3>
          <p className='text-gray-600 text-sm line-clamp-2  h-10'>
            {blog.description}
          </p>
        </div>
      </CardContent>
      <CardFooter className='px-4 pb-4'>
        <Button
          variant='link'
          className=' p-0 h-auto font-semibold text-primary group-hover:text-primary/80'
        >
          Read post
          <ArrowRight className='ml-2 h-4 w-4 ' />
        </Button>
      </CardFooter>
    </Card>
  );
}
