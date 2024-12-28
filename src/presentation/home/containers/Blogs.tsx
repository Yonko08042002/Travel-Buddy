import { ArrowRight } from 'lucide-react';
import { Button } from 'shared/components/atoms/button';

import { getBlogs } from 'application/use-cases/blog';
import BlogsCard from '../../../shared/components/molecules/BlogCard';
import Link from 'next/link';

export default async function Blogs() {
  const blogs = await getBlogs();
  return (
    <section className='py-8'>
      <div className='container mx-auto px-4'>
        <div className='flex justify-between items-center mb-8'>
          <h2 className='text-3xl font-primary text-primary'>From our blogs</h2>
          <Link href='/blogs'>
            {' '}
            <Button className='rounded-none group'>
              See more
              <ArrowRight className='ml-2 h-4 w-4 transition-transform group-hover:translate-x-1' />
            </Button>
          </Link>
        </div>

        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6'>
          {blogs.slice(0, 4).map((blog) => {
            return (
              <div className='' key={blog.id}>
                <BlogsCard blog={blog} />
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
