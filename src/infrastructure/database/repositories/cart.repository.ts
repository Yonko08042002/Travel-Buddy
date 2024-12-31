import type { Cart, CartTour } from "@prisma/client";
import type { ICartRepository } from "domain/cart/cart.repository.interface";
import { prisma } from "infrastructure/database/prisma";
import { injectable } from "inversify";

@injectable()
export class CartRepository implements ICartRepository {
  async getAll(): Promise<Cart[]> {
    return await prisma.cart.findMany();
  }

  getCartById(id: string): Promise<Cart | null> {
    return prisma.cart.findFirst({
      where: { userId: id },
      include: {
        cartTours: {
          include: {
            tour: true,
          },
        },
      },
    });
  }

  getCartToursByUserId(userId: string) {
    return prisma.cartTour.findMany({
      where: { cart: { userId } },
      include: {
        tour: true,
      },
    });
  }

  async addTourToCart(
    userId: string,
    tourId: string,
    amount: number
  ): Promise<CartTour> {
    let cart = await prisma.cart.findFirst({
      where: { userId },
    });

    if (!cart) {
      cart = await prisma.cart.create({
        data: { userId },
      });
    }

    const existingCartTour = await prisma.cartTour.findFirst({
      where: {
        cartId: cart.id,
        tourId,
      },
    });

    if (existingCartTour) {
      return prisma.cartTour.update({
        where: {
          cartId_tourId: {
            cartId: cart.id,
            tourId,
          },
        },
        data: {
          amount: (existingCartTour.amount ?? 0) + amount,
        },
      });
    }

    return prisma.cartTour.create({
      data: {
        cartId: cart.id,
        tourId,
        amount,
      },
    });
  }
  async updateTourToCart(
    userId: string,
    tourId: string,
    amount: number
  ): Promise<CartTour> {
    let cart = await prisma.cart.findFirst({
      where: { userId },
    });

    if (!cart) {
      cart = await prisma.cart.create({
        data: { userId },
      });
    }

    const existingCartTour = await prisma.cartTour.findFirst({
      where: {
        cartId: cart.id,
        tourId,
      },
    });

    if (existingCartTour) {
      return prisma.cartTour.update({
        where: {
          cartId_tourId: {
            cartId: cart.id,
            tourId,
          },
        },
        data: {
          amount: 0 + amount,
        },
      });
    }

    return prisma.cartTour.create({
      data: {
        cartId: cart.id,
        tourId,
        amount,
      },
    });
  }

  async removeTourFromCart(userId: string, tourId: string): Promise<void> {
    // Tìm cart của user
    const cart = await prisma.cart.findFirst({
      where: { userId },
    });
    if (!cart) {
      throw new Error("Cart not found");
    }
    await prisma.cartTour.delete({
      where: {
        cartId_tourId: {
          cartId: cart.id,
          tourId,
        },
      },
    });
  }

  async updateTourAmount(
    userId: string,
    tourId: string,
    amount: number
  ): Promise<CartTour> {
    // Tìm giỏ hàng của user
    const cart = await prisma.cart.findFirst({
      where: { userId },
    });

    if (!cart) {
      throw new Error("Cart not found");
    }

    // Tìm tour trong giỏ hàng
    const existingCartTour = await prisma.cartTour.findFirst({
      where: {
        cartId: cart.id,
        tourId,
      },
    });

    if (!existingCartTour) {
      throw new Error("Tour not found in cart");
    }

    // Cập nhật số lượng (cộng hoặc trừ số lượng tour)
    const newAmount = existingCartTour.amount || 1 + amount;

    // Nếu số lượng không hợp lệ (<= 0), xóa tour khỏi giỏ hàng
    if (newAmount <= 0) {
      await this.removeTourFromCart(userId, tourId);
      throw new Error("Tour removed from cart");
    }

    // Cập nhật lại số lượng tour trong giỏ hàng
    return prisma.cartTour.update({
      where: {
        cartId_tourId: {
          cartId: cart.id,
          tourId,
        },
      },
      data: {
        amount: newAmount,
      },
    });
  }
}
