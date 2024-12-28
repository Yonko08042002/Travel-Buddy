import type { AddTourInputs, Tour } from './tour.schema';

export interface ITourRepository {
  getAll(): Promise<Tour[]>;
  insert(addTourSchema: AddTourInputs): Promise<Tour | undefined>;
  getById(id: string): Promise<Tour | null>;
  update(id: string, updateTourSchema: AddTourInputs): Promise<Tour>;
  delete(id: string): Promise<Tour>;
}
