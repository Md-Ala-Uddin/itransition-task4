import type { NextAuthConfig } from "next-auth";

export const authConfig = {
    providers: [],
    pages: {
        signIn: "/login",
    },
    callbacks: {
        authorized({ auth, request }: { auth: any; request: { nextUrl: URL } }) {
            const isLoggedIn = !!auth?.user;
            const isOnAdminPanel = request.nextUrl.pathname.startsWith("/users");
            const isOnAuthPage = request.nextUrl.pathname === "/login" || request.nextUrl.pathname === "/register";

            // Redirect to login if trying to access admin panel without authentication
            if (isOnAdminPanel && !isLoggedIn) {
                return false;
            }

            // Redirect to admin panel if logged in user tries to access auth pages
            if (isOnAuthPage && isLoggedIn) {
                return Response.redirect(new URL("/users", request.nextUrl));
            }

            return true;
        },
    },
} satisfies NextAuthConfig;
