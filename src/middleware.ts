import { NextResponse } from 'next/server';
import { getToken } from 'next-auth/jwt';
import { type NextRequestWithAuth, withAuth } from 'next-auth/middleware';
import {
  checkPermission,
  Permission,
  PermissionMapper
} from 'shared/helpers/permission';
import createMiddleware from 'next-intl/middleware';
import { routing } from 'i18n/routing';

const GET_PATH_NAME_REGEX = /^\/[a-z]{2}(\/.*)$/;

const intlMiddleware = createMiddleware(routing);

async function middleware(req: NextRequestWithAuth) {
  const isPrivatePage = ['/admin', '/cart'].some((path) =>
    req.nextUrl.pathname.includes(path)
  );

  const isAuthPage = ['/login', '/register'].some((path) =>
    req.nextUrl.pathname.includes(path)
  );

  const isAdminPage = req.nextUrl.pathname.includes('/admin');

  const token = await getToken({ req });

  const isAuthenticated = !!token;

  if (!(isPrivatePage || isAuthPage)) return intlMiddleware(req);

  if (isAuthenticated) {
    const hasAdminAccess = checkPermission(token.userRoles, [
      Permission.AccessAdmin
    ]);

    const shouldRedirectToHome = isAdminPage ? !hasAdminAccess : isAuthPage;

    if (shouldRedirectToHome) {
      return NextResponse.redirect(new URL('/', req.url));
    }

    if (isAdminPage) {
      const pathName = req.nextUrl.pathname.replace(GET_PATH_NAME_REGEX, '$1');

      const hasPageAccess = checkPermission(
        token.userRoles,
        PermissionMapper[pathName]
      );

      if (!hasPageAccess) {
        return NextResponse.redirect(new URL('/admin', req.url));
      }
    }

    return intlMiddleware(req);
  }

  if (isAuthPage) return intlMiddleware(req);

  const redirectTo = req.nextUrl.search
    ? `${req.nextUrl.pathname}${req.nextUrl.search}`
    : req.nextUrl.pathname;
  return NextResponse.redirect(
    new URL(`/login?from=${encodeURIComponent(redirectTo)}`, req.url)
  );
}

export default withAuth(middleware, {
  callbacks: {
    authorized() {
      return true;
    }
  }
});

export const config = {
  matcher: ['/((?!api|_next|.*\\..*).*)']
};
