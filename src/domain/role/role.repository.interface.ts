import type { AddRoleInputs, Role } from './role.schema';

export interface IRoleRepository {
  getAll(): Promise<Role[]>;
  insert(addRoleSchema: AddRoleInputs): Promise<unknown>;
  update(id: string, updateRoleSchema: AddRoleInputs): Promise<unknown>;
  delete(id: string, tx?: unknown): Promise<unknown>;
}
