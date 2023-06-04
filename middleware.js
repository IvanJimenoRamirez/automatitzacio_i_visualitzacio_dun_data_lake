import { NextResponse } from 'next/server';
import { getToken } from 'next-auth/jwt';

let locales = ['en-US', 'es-ES', 'cat-ES'];

function getLocale(request) {
  return 'en-US';
}

function isSessionExpired(session) {
  const currentTime = Math.floor(Date.now() / 1000);
  const tokenExpirationTime = session.exp;

  return currentTime > tokenExpirationTime;
}

export async function middleware(req) {
  let pathname = req.nextUrl.pathname;
  const pathnameIsMissingLocale = locales.every(
    (locale) => !pathname.startsWith(`/${locale}/`) && pathname !== `/${locale}`
  );

  const session = await getToken({ req: req, secret: process.env.JWT_SECRET });

  // Redirects if the pathname is missing a locale
  if (pathnameIsMissingLocale) {
    const locale = getLocale(req);
    if (pathname === '' || pathname === '/') pathname = `/home`;
    const urlWithLocale = new URL(`/${locale}${pathname}`, req.url);


    // If the user is not authenticated, redirect to login page
    if (!session || isSessionExpired(session)) {
      const url = urlWithLocale;
      url.pathname = `/${locale}/auth/login`;
      url.search = `p=${pathname}`;

      return NextResponse.redirect(url);
    }

    return NextResponse.redirect(urlWithLocale);
  }

  const currentLocale = pathname.split('/')[1];

  if ((!session || isSessionExpired(session)) && pathname !== `/${currentLocale}/auth/login`) {
    const requestedPage = (pathname === '' || pathname === '/') ? `/${currentLocale}/home` : pathname;
    const url = req.nextUrl.clone();
    url.pathname = `/${currentLocale}/auth/login`;
    url.search = `p=${requestedPage}`;

    return NextResponse.redirect(url);
  }

  const adminRouteMatch = adminRoutes.find((route) => pathname.startsWith(route));

  if ((adminRouteMatch && session.role !== 1) || pathname === `/${currentLocale}`) {
    let url = req.nextUrl.clone();
    url.pathname = `/${currentLocale}/home`;
    return NextResponse.redirect(url);
  }
  
  return NextResponse.next();
}

const adminRoutes = [
  '/en-US/home/admin',
  '/es-ES/home/admin',
  '/cat-ES/home/admin',
];

export const config = {
  matcher: ['/', '/:locale(en-US|es-ES|cat-ES)', '/:locale/home:path*', '/auth/login' ,'/home/:path*', '/:locale(en-US|es-ES|cat-ES)/home/:path*' ]
};
