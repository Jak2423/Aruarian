import { NextRequest, NextResponse } from 'next/server';

export const middleware = async (request) => {
	if (request.nextUrl.pathname.startsWith('/upload')) {
		const authCookie = request.cookies.get('supabase-auth-token');
		if (!authCookie) return NextResponse.redirect(new URL('/login', request.url));
	}
};
