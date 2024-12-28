import { Card, CardContent, CardHeader } from 'shared/components/atoms/card';

import type { Blog } from '@prisma/client';
import dayjs from 'dayjs';

interface LatestPostCardProps {
  blog: Blog;
}
export default function LatestPostCard({ blog }: LatestPostCardProps) {
  return (
    <Card className=' flex group rounded-none overflow-hidden border-none '>
      <CardHeader className='p-2'>
        {' '}
        <div className=' size-24 overflow-hidden'>
          <img
            src={blog.image}
            alt=''
            className=' w-full h-full object-cover transition-transform duration-300 group-hover:scale-105'
          />
        </div>
      </CardHeader>
      <CardContent className='p-0'>
        <div className='p-2'>
          <time className='text-sm text-gray-500'>
            {dayjs(Number(blog.createdAt)).format('MMM DD, YYYY')}
          </time>
          <h3 className='font-semibold text-lg mt-2 mb-1 line-clamp-2'>
            {blog.name}
          </h3>
          <p className='text-gray-600 text-sm line-clamp-2  h-10'>
            {blog.description}
          </p>
        </div>
      </CardContent>
    </Card>
  );
}
