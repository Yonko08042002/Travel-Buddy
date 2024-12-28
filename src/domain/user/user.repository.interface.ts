import type { CreateUserSchema, UpdateUserSchema, User } from './user.schema';

export interface IUserRepository {
  getUserByEmail(email: string): Promise<User | null>;
  getUserByStripeCustomerId(stripeCustomerId: string): Promise<User | null>;
  getAll(): Promise<User[]>;
  insert(createUserSchema: CreateUserSchema): Promise<unknown>;
  update(id: string, updateUser: UpdateUserSchema): Promise<unknown>;
  delete(id: string): Promise<unknown>;
}
