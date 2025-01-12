import { injectable } from 'inversify';

import type { IBlogRepository } from 'domain/blog/blog.repository.interface';
import type { AddBlogSchema } from 'domain/blog/blog.schema';
import { prisma } from 'infrastructure/database/prisma';

@injectable()
export class BlogRepository implements IBlogRepository {
  getAll() {
    return prisma.blog.findMany({ orderBy: { createdAt: 'desc' } });
  }

  getLatest() {
    return prisma.blog.findMany({
      orderBy: { createdAt: 'desc' },
      take: 5
    });
  }

  getById(id: string) {
    return prisma.blog.findFirst({ where: { id } });
  }

  insert(addBlogInputs: AddBlogSchema) {
    return prisma.blog.create({
      data: addBlogInputs
    });
  }

  update(id: string, addBlogInputs: AddBlogSchema) {
    return prisma.blog.update({
      where: { id },
      data: addBlogInputs
    });
  }

  delete(id: string) {
    return prisma.blog.delete({ where: { id } });
  }
}
