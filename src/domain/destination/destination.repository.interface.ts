import type { AddDestinationInputs, Destination } from './destination.schema';

export interface IDestinationRepository {
  getAll(): Promise<Destination[]>;
  insert(
    addDestinationSchema: AddDestinationInputs
  ): Promise<Destination | undefined>;
  update(
    id: string,
    updateBlogSchema: AddDestinationInputs
  ): Promise<Destination>;
  delete(id: string): Promise<Destination>;
}
