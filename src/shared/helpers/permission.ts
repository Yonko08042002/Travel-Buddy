import type { UserWithRoles } from 'application/use-cases/user';

export enum Permission {
  ManageUser = 'manage-user',
  ManageRole = 'manage-role',
  ManageTour = 'manage-tour',
  ManagePermission = 'manage-permission',
  ManageBlog = 'manage-blog',
  ManagePromotion = 'manage-promotion',
  ManageTourStyle = 'manage-tour-style',
  AccessAdmin = 'access-admin'
}

export const PermissionMapper: Record<string, Permission[]> = {
  '/admin/users': [Permission.ManageUser],
  '/admin/tours': [Permission.ManageTour],
  '/admin/roles': [Permission.ManageRole],
  '/admin/permissions': [Permission.ManagePermission],
  '/admin/blogs': [Permission.ManageBlog],
  '/admin/promotions': [Permission.ManagePromotion],
  '/admin/tour-styles': [Permission.ManageTourStyle]
};

export const checkPermission = (
  userRoles: UserWithRoles['userRoles'],
  requiredPermissions: Permission[] = []
) => {
  const permissions = [
    ...new Set(
      userRoles.flatMap((userRole) => {
        return userRole.role.rolePermissions.map(
          (rolePermission) => rolePermission.permission.slug
        );
      })
    )
  ];

  return requiredPermissions.every((permission) =>
    permissions.includes(permission)
  );
};
