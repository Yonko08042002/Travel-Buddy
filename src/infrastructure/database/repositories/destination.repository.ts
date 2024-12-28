import type { IDestinationRepository } from 'domain/destination/destination.repository.interface';
import type { AddDestinationInputs } from 'domain/destination/destination.schema';
import { prisma } from 'infrastructure/database/prisma';
import { injectable } from 'inversify';

@injectable()
export class DestinationRepository implements IDestinationRepository {
  getAll() {
    return prisma.destination.findMany();
  }

  insert(addDestinationInputs: AddDestinationInputs) {
    return prisma.destination.create({
      data: addDestinationInputs
    });
  }

  update(id: string, addDestinationInputs: AddDestinationInputs) {
    return prisma.destination.update({
      where: { id },
      data: addDestinationInputs
    });
  }

  delete(id: string) {
    return prisma.destination.delete({ where: { id } });
  }
}
