'use server';
import { revalidatePath } from 'next/cache';
import { authActionClient } from 'shared/lib/safe-action';
import { upsertBlogSchema } from 'domain/blog/blog.schema';
import { getInjection } from 'di/container';

export const getBlogs = async () => {
  const blogRepository = getInjection('IBlogRepository');
  return await blogRepository.getAll();
};

export const getLatest = async () => {
  const blogRepository = getInjection('IBlogRepository');
  return await blogRepository.getLatest();
};

export const upsertBlog = authActionClient
  .schema(upsertBlogSchema)
  .action(async ({ parsedInput: { id, ...rest } }) => {
    const blogRepository = getInjection('IBlogRepository');

    if (id) {
      await blogRepository.update(id, { ...rest });
    } else {
      await blogRepository.insert({ ...rest });
    }
    revalidatePath('/');
  });

export const deleteBlog = async (id: string) => {
  const blogRepository = getInjection('IBlogRepository');

  await blogRepository.delete(id);

  revalidatePath('/');
};
