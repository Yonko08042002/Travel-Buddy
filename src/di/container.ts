import { Container } from 'inversify';
import 'reflect-metadata';

import { BlogModule } from './modules/blog.module';
import { UserModule } from './modules/user.module';

import { type DI_RETURN_TYPES, DI_SYMBOLS } from './types';
import { TourModule } from './modules/tour.module';
import { RoleModule } from './modules/role.module';
import { PermissionModule } from './modules/permission.module';
import { DestinationModule } from './modules/destination.module';
import { RolePermissionModule } from './modules/role-permission.module';
import { VideoModule } from './modules/video.module';
import { ReviewModule } from './modules/review.module';
import { PurchaseModule } from './modules/purchase.module';
import { TourStyleModule } from './modules/tour-style.module';
import { PromotionModule } from './modules/promotion.module';
import { CartModule } from './modules/cart.module';
import { CartTourModule } from './modules/cart-tour.module';

const ApplicationContainer = new Container({
  defaultScope: 'Singleton'
});

export const initializeContainer = () => {
  ApplicationContainer.load(BlogModule);
  ApplicationContainer.load(UserModule);
  ApplicationContainer.load(TourModule);
  ApplicationContainer.load(RoleModule);
  ApplicationContainer.load(PermissionModule);
  ApplicationContainer.load(DestinationModule);
  ApplicationContainer.load(RolePermissionModule);
  ApplicationContainer.load(VideoModule);
  ApplicationContainer.load(ReviewModule);
  ApplicationContainer.load(PurchaseModule);
  ApplicationContainer.load(TourStyleModule);
  ApplicationContainer.load(PromotionModule);
  ApplicationContainer.load(CartModule);
  ApplicationContainer.load(CartTourModule);
};

export const destroyContainer = () => {
  ApplicationContainer.unload(BlogModule);
  ApplicationContainer.unload(UserModule);
  ApplicationContainer.unload(TourModule);
  ApplicationContainer.unload(RoleModule);
  ApplicationContainer.unload(PermissionModule);
  ApplicationContainer.unload(DestinationModule);
  ApplicationContainer.unload(RolePermissionModule);
  ApplicationContainer.unload(VideoModule);
  ApplicationContainer.unload(ReviewModule);
  ApplicationContainer.unload(PurchaseModule);
  ApplicationContainer.unload(TourStyleModule);
  ApplicationContainer.unload(PromotionModule);
  ApplicationContainer.unload(CartModule);
  ApplicationContainer.unload(CartTourModule);
};

initializeContainer();

export function getInjection<K extends keyof typeof DI_SYMBOLS>(
  symbol: K
): DI_RETURN_TYPES[K] {
  return ApplicationContainer.get(DI_SYMBOLS[symbol]);
}

export { ApplicationContainer };
