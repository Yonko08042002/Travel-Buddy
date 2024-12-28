import type { ITourStyleRepository } from 'domain/tour-style/tour-style.repository.interface';
import type {
  AddTourStyleInputs,
  TourStyle
} from 'domain/tour-style/tour-style.schema';
import { prisma } from 'infrastructure/database/prisma';
import { injectable } from 'inversify';

@injectable()
export class TourStyleRepository implements ITourStyleRepository {
  async getAll(): Promise<TourStyle[]> {
    return await prisma.tourStyle.findMany();
  }

  async getById(id: string): Promise<TourStyle | null> {
    return await prisma.tourStyle.findUnique({
      where: { id }
    });
  }

  async getByName(name: string): Promise<TourStyle | null> {
    return await prisma.tourStyle.findFirst({
      where: { name }
    });
  }

  async insert(createTourStyleSchema: AddTourStyleInputs): Promise<TourStyle> {
    return await prisma.tourStyle.create({
      data: createTourStyleSchema
    });
  }

  async update(
    id: string,
    updateTourStyle: AddTourStyleInputs
  ): Promise<TourStyle> {
    return await prisma.tourStyle.update({
      where: { id },
      data: updateTourStyle
    });
  }

  async delete(id: string): Promise<TourStyle> {
    return await prisma.tourStyle.delete({
      where: { id }
    });
  }
}
