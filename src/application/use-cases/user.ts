'use server';

import { authOptions } from 'shared/helpers/auth';
import { getInjection } from 'di/container';
import type {
  CreateUserSchema,
  UpdateUserSchema
} from 'domain/user/user.schema';
import { getServerSession } from 'next-auth';
import { revalidatePath } from 'next/cache';

export const getUser = async () => {
  const userRepository = getInjection('IUserRepository');
  return await userRepository.getAll();
};

export const insertUser = async (user: CreateUserSchema) => {
  const userRepository = getInjection('IUserRepository');
  return await userRepository.insert(user);
};

export const getUserByEmail = async (email: string) => {
  const userRepository = getInjection('IUserRepository');

  return await userRepository.getUserByEmail(email);
};

export const getMe = async () => {
  const session = await getServerSession(authOptions);

  if (!session) return null;
  return await getUserByEmail(session.user.email);
};

export type UserWithRoles = Awaited<ReturnType<typeof getUser>>[0];

export const updateUser = async (
  id: string,
  updateUserDto: UpdateUserSchema
) => {
  const userRepository = getInjection('IUserRepository');

  await userRepository.update(id, updateUserDto);
  revalidatePath('/');
};

export const deleteUser = async (id: string) => {
  const userRepository = getInjection('IUserRepository');

  await userRepository.delete(id);

  revalidatePath('/');
};
