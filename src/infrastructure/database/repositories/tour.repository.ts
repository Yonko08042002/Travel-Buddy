import type { ITourRepository } from 'domain/tour/tour.repository.interface';
import type { AddTourInputs } from 'domain/tour/tour.schema';
import { prisma } from 'infrastructure/database/prisma';
import { injectable } from 'inversify';

@injectable()
export class TourRepository implements ITourRepository {
  getAll() {
    return prisma.tour.findMany({
      include: {
        tourStyle: true
      }
    });
  }

  getById(id: string) {
    return prisma.tour.findUnique({
      where: { id },
      include: {
        tourStyle: true
      }
    });
  }

  insert(values: AddTourInputs) {
    return prisma.tour.create({
      data: values,
      include: {
        tourStyle: true
      }
    });
  }

  update(id: string, values: AddTourInputs) {
    return prisma.tour.update({
      where: { id },
      data: values,
      include: {
        tourStyle: true
      }
    });
  }

  delete(id: string) {
    return prisma.tour.delete({
      where: { id },
      include: {
        tourStyle: true
      }
    });
  }
}
