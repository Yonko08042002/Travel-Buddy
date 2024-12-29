import type { ColumnType } from 'kysely';
export type Generated<T> = T extends ColumnType<infer S, infer I, infer U>
  ? ColumnType<S, I | undefined, U>
  : ColumnType<T, T | undefined, T>;
export type Timestamp = ColumnType<Date, Date | string, Date | string>;

export const TourType = {
  PackageTour: 'PackageTour',
  DailyTour: 'DailyTour',
  TailorMadeTour: 'TailorMadeTour'
} as const;
export type TourType = (typeof TourType)[keyof typeof TourType];
export type Blog = {
  id: Generated<string>;
  TenBaiViet: string;
  HinhAnh: string;
  NgayTao: Generated<Timestamp>;
  MoTa: string;
};
export type BlogCategory = {
  IdBaiViet: string;
  IdDanhMuc: string;
};
export type Cart = {
  id: Generated<string>;
  IdNguoiDung: string;
};
export type CartTour = {
  id: string;
  IdTour: string;
  amount: number | null;
};
export type Category = {
  id: Generated<string>;
  TenDanhMuc: string;
};
export type Destination = {
  id: Generated<string>;
  HinhAnh: string;
  TenDiaDiem: string;
  MoTa: string;
};
export type Permission = {
  id: Generated<string>;
  TenQuyen: string;
  SlugQuyen: string;
};
export type Promotion = {
  id: Generated<string>;
  TenKhuyenMai: string;
  MoTaKhuyenMai: string | null;
  NgayBatDau: Timestamp;
  NgayKetThuc: Timestamp;
  discountPercentage: string;
};
export type Purchase = {
  id: Generated<string>;
  IdNguoiDung: string;
  IdTour: string;
  SoLuong: number;
  NgayTao: Generated<Timestamp>;
  stripePurchaseId: string;
};
export type Review = {
  id: Generated<string>;
  NoiDung: string;
  DanhGia: Generated<number>;
  NgayTao: Generated<Timestamp>;
  NguoiDungId: string;
  IdTour: string;
};
export type Role = {
  id: Generated<string>;
  TenVaiTro: string;
};
export type RolePermission = {
  IdVaitro: string;
  IdQuyen: string;
};
export type Tour = {
  id: Generated<string>;
  HinhAnh: string;
  TenTour: string;
  MoTa: string;
  ThoiGian: number;
  GiaTour: number;
  NgayBatDau: Timestamp | null;
  LoaiTour: Generated<TourType>;
  KieuTourId: string;
};
export type TourDestination = {
  tourId: string;
  DiaDiemId: string;
};
export type TourPromotion = {
  tourId: string;
  KhuyenMaiId: string;
};
export type TourStyle = {
  id: Generated<string>;
  TenKieuDuLich: string;
};
export type User = {
  id: Generated<string>;
  Email: string;
  MatKhau: string;
  TenNguoiDung: string | null;
  AnhDaiDien: string | null;
  stripeKhachHangId: string | null;
};
export type UserRole = {
  IdNguoiDung: string;
  IdVaiTro: string;
};
export type Video = {
  id: Generated<string>;
  TenVideo: string;
  LinkVideo: string;
};
export type DB = {
  BaiVietTb: Blog;
  ChiTietDonDatTourTb: CartTour;
  ChiTietVaiTro: RolePermission;
  DanhGia: Review;
  DanhMuc: Category;
  DanhMucBaiViet: BlogCategory;
  DiaDiem: Destination;
  DonDatTourTb: Cart;
  DonThanhToan: Purchase;
  KhuyenMai: Promotion;
  KieuTour: TourStyle;
  NguoiDungVaiTro: UserRole;
  NguoiDungTb: User;
  QuyenTb: Permission;
  tourDiaDiem: TourDestination;
  tourKhuyenMai: TourPromotion;
  TourTb: Tour;
  VaiTroTb: Role;
  video: Video;
};
