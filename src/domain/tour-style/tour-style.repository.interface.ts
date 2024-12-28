import type { AddTourStyleInputs, TourStyle } from './tour-style.schema';

export interface ITourStyleRepository {
  getAll(): Promise<TourStyle[]>;
  getById(id: string): Promise<TourStyle | null>;
  getByName(name: string): Promise<TourStyle | null>;
  insert(createTourStyleSchema: AddTourStyleInputs): Promise<TourStyle>;
  update(id: string, updateTourStyle: AddTourStyleInputs): Promise<TourStyle>;
  delete(id: string): Promise<TourStyle>;
}
