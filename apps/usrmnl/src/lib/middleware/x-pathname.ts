import { NextResponse, type NextRequest } from "next/server";

// eslint-disable-next-line @typescript-eslint/require-await -- we need an async function in middleware
export async function xPathname(request: NextRequest): Promise<NextResponse> {
	// Add a new header x-pathname which passes the path to downstream components
	const headers = new Headers(request.headers);
	headers.set("x-pathname", request.nextUrl.pathname);

	return NextResponse.next({ headers });
}
