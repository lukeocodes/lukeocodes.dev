import createMiddleware, { type MiddlewareFunction } from "@/lib/middleware/create-middleware";
import { updateSession } from "@/lib/supabase/middleware";

const middlewares: Record<string, MiddlewareFunction[]> = {
	/*
	 * Match all paths except for:
	 * 1. /api/ routes
	 * 2. /_next/ (Next.js internals)
	 * 3. /_static (inside /public)
	 * 4. /_vercel (Vercel internals)
	 * 5. Static files (e.g. /favicon.ico, /sitemap.xml, /robots.txt, etc.)
	 */
	"/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)": [
		updateSession,
	],
};

// Create middlewares helper
export const middleware = createMiddleware(middlewares);

export const config = {
	/*
	 * Match all paths by default. Use the above middleware Record<string, MiddlewareFunction[]> object keys to
	 * define a granular match path for each middleware.
	 */
	matcher: ["/(.*)"],
};
