import type { AddPermissionInputs, Permission } from './permission.schema';

export interface IPermissionRepository {
  getAll(): Promise<Permission[]>;
  insert(createPermissionSchema: AddPermissionInputs): Promise<Permission>;
  update(
    id: string,
    updatePermission: AddPermissionInputs
  ): Promise<Permission>;
  delete(id: string): Promise<Permission>;
}
