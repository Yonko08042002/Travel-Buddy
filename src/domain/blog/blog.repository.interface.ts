import type { AddBlogSchema, Blog } from './blog.schema';

export interface IBlogRepository {
  getAll(): Promise<Blog[]>;
  getLatest(): Promise<Blog[]>;
  insert(addBlogSchema: AddBlogSchema): Promise<Blog | undefined>;
  update(id: string, updateBlogSchema: AddBlogSchema): Promise<Blog>;
  delete(id: string): Promise<Blog>;
}
