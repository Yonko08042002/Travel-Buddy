import type { IUserRepository } from "domain/user/user.repository.interface";
import type {
  CreateUserSchema,
  UpdateUserSchema,
  User,
} from "domain/user/user.schema";
import { prisma } from "infrastructure/database/prisma";
import { injectable } from "inversify";

@injectable()
export class UserRepository implements IUserRepository {
  async getUserByEmail(email: string) {
    return await prisma.user.findFirst({
      where: {
        email,
      },
      include: {
        userRoles: {
          include: {
            role: {
              include: {
                rolePermissions: {
                  include: {
                    permission: true,
                  },
                },
              },
            },
          },
        },
      },
    });
  }

  async getUserById(id: string) {
    return await prisma.user.findFirst({
      where: {
        id,
      },
      include: {
        userRoles: {
          include: {
            role: {
              include: {
                rolePermissions: {
                  include: {
                    permission: true,
                  },
                },
              },
            },
          },
        },
      },
    });
  }

  getAll = () => {
    return prisma.user.findMany({
      include: {
        userRoles: {
          include: {
            role: {
              include: {
                rolePermissions: {
                  include: {
                    permission: true,
                  },
                },
              },
            },
          },
        },
      },
    });
  };

  getUserByStripeCustomerId(stripeCustomerId: string): Promise<User | null> {
    return prisma.user.findFirst({
      where: {
        stripeCustomerId,
      },
      include: {
        userRoles: {
          include: {
            role: {
              include: {
                rolePermissions: {
                  include: {
                    permission: true,
                  },
                },
              },
            },
          },
        },
      },
    });
  }

  insert(userDto: CreateUserSchema) {
    return prisma.$transaction(async (tx) => {
      const user = await tx.user.create({
        data: userDto,
      });

      await tx.cart.create({
        data: {
          userId: user.id, // Liên kết giỏ hàng với người dùng vừa tạo
        },
      });
      return user;
    });
  }
  update(userId: string, { roleIds, email }: UpdateUserSchema) {
    return prisma.user.update({
      where: { id: userId },
      data: {
        email,
        userRoles: {
          deleteMany: {
            roleId: {
              notIn: roleIds,
            },
          },
          upsert: roleIds.map((roleId) => ({
            where: { userId_roleId: { roleId: roleId, userId } },
            update: {
              role: {
                connect: { id: roleId },
              },
            },
            create: {
              role: {
                connect: { id: roleId },
              },
            },
          })),
        },
      },
    });
  }

  delete(id: string) {
    return prisma.user.delete({ where: { id } });
  }
}
