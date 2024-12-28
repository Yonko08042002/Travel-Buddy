import { tourSchema } from 'domain/tour/tour.schema';
import { z } from 'zod';

// Schema chính cho Cart
export const cartSchema = z.object({
  id: z.string().uuid(), // ID của Cart
  userId: z.string().uuid(), // Tham chiếu User
  cartTours: z.array(
    z.object({
      id: z.string().uuid(), // ID của CartTour
      cartId: z.string().uuid(), // Tham chiếu Cart ID
      tourId: z.string().uuid(), // Tham chiếu Tour ID
      amount: z.number().int().positive(), // Số lượng Tour
      tour: tourSchema // Thông tin chi tiết Tour
    })
  )
});

// Schema để thêm Cart
export const AddCartSchema = z.object({
  userId: z.string().uuid().min(1, { message: 'User ID is required' })
});

// Schema để thêm CartTours vào Cart
export const AddCartToursSchema = z.object({
  cartId: z.string().uuid().min(1, { message: 'Cart ID is required' }),
  cartTours: z.array(
    z.object({
      tourId: z.string().uuid().min(1, { message: 'Tour ID is required' }),
      amount: z
        .number()
        .int()
        .positive()
        .min(1, { message: 'Amount must be at least 1' })
    })
  )
});

// Schema để cập nhật Cart và CartTours
export const UpdateCartWithToursSchema = z.object({
  cartId: z.string().uuid().min(1, { message: 'Cart ID is required' }),
  cartTours: z.array(
    z.object({
      id: z.string().uuid().optional(), // ID của CartTour, optional khi cập nhật
      tourId: z.string().uuid().min(1, { message: 'Tour ID is required' }),
      amount: z.number().int().positive()
    })
  )
});

// TypeScript Types từ các schema trên
export type AddCartInputs = z.infer<typeof AddCartSchema>;
export type AddCartToursInputs = z.infer<typeof AddCartToursSchema>;
export type UpdateCartInputs = z.infer<typeof UpdateCartWithToursSchema>;
export type Cart = z.infer<typeof cartSchema>;

export interface InsertCart extends AddCartInputs {
  cartTours: {
    tourId: string;
    amount: number;
  }[];
}
