'use server';
import { getInjection } from 'di/container';
import type { AddPermissionInputs } from 'domain/permission/permission.schema';
import { revalidatePath } from 'next/cache';

export const getPermissions = async () => {
  const permissionRepository = getInjection('IPermissionRepository');

  return await permissionRepository.getAll();
};

interface UpsertPermission extends AddPermissionInputs {
  id?: string;
}

export const upsertPermission = async ({ id, ...rest }: UpsertPermission) => {
  const permissionRepository = getInjection('IPermissionRepository');
  if (id) {
    await permissionRepository.update(id, { ...rest });
  } else {
    await permissionRepository.insert({ ...rest });
  }
  revalidatePath('/');
};

export const deletePermission = async (id: string) => {
  const permissionRepository = getInjection('IPermissionRepository');

  await permissionRepository.delete(id);

  revalidatePath('/');
};
