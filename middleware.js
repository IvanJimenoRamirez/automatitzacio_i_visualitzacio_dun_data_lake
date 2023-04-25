import { NextResponse } from 'next/server'
import {NextRequest} from 'next/server'
import { getToken } from 'next-auth/jwt'

export async function middleware(req) {
    const session = await getToken({ req , secret: process.env.JWT_SECRET })
    console.log("This is the session: ", session)
    if (!session) {
        const requestedPage = (req.nextUrl.pathname === '' || req.nextUrl.pathname === '/') ? '/home' : req.nextUrl.pathname;
        const url = req.nextUrl.clone();
        url.pathname = "/auth/login";
        url.search = `p=${requestedPage}`;

        return NextResponse.redirect( url );
    }

    //return NextResponse.redirect()
    if (req.nextUrl.pathname === '' || req.nextUrl.pathname === '/') {
        let url = req.nextUrl.clone();
        url.pathname = '/home';
        return NextResponse.redirect(url);
    }
    return NextResponse.next()
}

export const config = {
    matcher: ['/', '/home/:path*' ]
}

/* 

import { NextResponse } from 'next/server'
import { getToken } from 'next-auth/jwt'

export async function middleware(req) {
    const session = await getToken({ req , secret: process.env.JWT_SECRET })
    console.log("This is the session: ", session)

    if (!session) {
        const url = req.nextUrl.clone();
        url.pathname = "/auth/login";

        return NextResponse.redirect( url );
    }

    //return NextResponse.redirect()
    return NextResponse.next()
}

export const config = {
    matcher: ['/home', '/home/temporalLandingZone']
} */