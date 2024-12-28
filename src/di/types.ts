import type { IBlogRepository } from 'domain/blog/blog.repository.interface';
import type { ICartTourRepository } from 'domain/cart-tour/cart-tour.repository.interface';
import type { ICartRepository } from 'domain/cart/cart.repository.interface';
import type { IDestinationRepository } from 'domain/destination/destination.repository.interface';
import type { IPermissionRepository } from 'domain/permission/permission.repository.interface';
import type { IPromotionRepository } from 'domain/promotion/promotion.repository.interface';
import type { IPurchaseRepository } from 'domain/purchase/purchase.repository.interface';
import type { IReviewRepository } from 'domain/review/review.repository.interface';
import type { IRolePermissionRepository } from 'domain/role-permission/role-permission.repository.interface';
import type { IRoleRepository } from 'domain/role/role.repository.interface';
import type { ITourStyleRepository } from 'domain/tour-style/tour-style.repository.interface';
import type { ITourRepository } from 'domain/tour/tour.repository.interface';
import type { IUserRepository } from 'domain/user/user.repository.interface';
import type { IVideoRepository } from 'domain/video/video.repository.interface';

export const DI_SYMBOLS = {
  IBlogRepository: Symbol.for('IBlogRepository'),
  IUserRepository: Symbol.for('IUserRepository'),
  ITourRepository: Symbol.for('ITourRepository'),
  IRoleRepository: Symbol.for('IRoleRepository'),
  IPermissionRepository: Symbol.for('IPermissionRepository'),
  IDestinationRepository: Symbol.for('IDestinationRepository'),
  IPromotionRepository: Symbol.for('IPromotionRepository'),
  IReviewRepository: Symbol.for('IReviewRepository'),
  IRolePermissionRepository: Symbol.for('IRolePermissionRepository'),
  IVideoRepository: Symbol.for('IVideoRepository'),
  IPurchaseRepository: Symbol.for('IPurchaseRepository'),
  ITourStyleRepository: Symbol.for('ITourStyleRepository'),
  ICartRepository: Symbol.for('ICartRepository'),
  ICartTourRepository: Symbol.for('ICartTourRepository')
};

export interface DI_RETURN_TYPES {
  IBlogRepository: IBlogRepository;
  IUserRepository: IUserRepository;
  ITourRepository: ITourRepository;
  IRoleRepository: IRoleRepository;
  IPermissionRepository: IPermissionRepository;
  IDestinationRepository: IDestinationRepository;
  IPromotionRepository: IPromotionRepository;
  IReviewRepository: IReviewRepository;
  IRolePermissionRepository: IRolePermissionRepository;
  IVideoRepository: IVideoRepository;
  IPurchaseRepository: IPurchaseRepository;
  ITourStyleRepository: ITourStyleRepository;
  ICartRepository: ICartRepository;
  ICartTourRepository: ICartTourRepository;
}
