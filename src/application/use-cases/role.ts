'use server';
import { getInjection } from 'di/container';
import type { AddRoleInputs, InsertRole } from 'domain/role/role.schema';
import { prisma } from 'infrastructure/database/prisma';
import { revalidatePath } from 'next/cache';

export const getRoles = async () => {
  const roleRepository = getInjection('IRoleRepository');
  return await roleRepository.getAll();
};

export type RoleWithPermissions = Awaited<ReturnType<typeof getRoles>>[0];

export const createRole = async (insertRoleDto: InsertRole) => {
  const roleRepository = getInjection('IRoleRepository');

  return await roleRepository.insert(insertRoleDto);
};

export interface UpdateRole extends AddRoleInputs {
  id: string;
  permissionIds: string[];
}

export const updateRole = async (id: string, updateRoleDto: InsertRole) => {
  const roleRepository = getInjection('IRoleRepository');

  return await roleRepository.update(id, updateRoleDto);
};

export type UpsertRole = InsertRole & {
  id?: string;
};

export const upsertRole = async ({ id, ...rest }: UpsertRole) => {
  if (id) {
    await updateRole(id, rest);
  } else {
    await createRole(rest);
  }

  revalidatePath('/');
};

export const deleteRole = async (id: string) => {
  const roleRepository = getInjection('IRoleRepository');
  const rolePermissionRepository = getInjection('IRolePermissionRepository');

  return await prisma.$transaction(async (db) => {
    await rolePermissionRepository.deleteByRoleId(id, db);
    await roleRepository.delete(id, db);

    revalidatePath('/');
  });
};
