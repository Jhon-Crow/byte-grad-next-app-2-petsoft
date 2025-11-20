import NextAuth, {NextAuthConfig} from "next-auth";
import Credentials from "@auth/core/providers/credentials";
import bcrypt from "bcryptjs";
import {getUserByEmail} from "@/lib/server-utils";
import {authSchema} from "@/lib/validations";

const config = {
    pages: {
        signIn: '/login',
    },
    providers: [
        Credentials({
            async authorize(credentials) {
                const validatedFormData = authSchema.safeParse(credentials);
                if (!validatedFormData.success) return null;

                const {email, password} = validatedFormData.data;

                const user = await getUserByEmail(email);
                if (!user) {
                    console.log('No user found');
                    return null;
                }
                const passwordsMatch = await bcrypt.compare(password, user.hashedPassword);
                if (!passwordsMatch) {
                    console.log('Invalid credentials');
                    return null;
                }

                return user;
            }
        }),
    ],
    callbacks: {
        authorized: ({auth, request}) => {
            const isAuth = auth?.user;
            const isTryingToAccessApp = request.nextUrl.pathname.includes('/app');

            if (isTryingToAccessApp && !isAuth) {
                return false;
            }

            if (!isAuth && request.nextUrl.pathname.includes('/payment')) {
                return false;
            }

            if (isAuth && isTryingToAccessApp && !auth?.user.hasAccess) {
                return Response.redirect(new URL('/payment', request.nextUrl));
            }

            if (isAuth && isTryingToAccessApp && auth?.user.hasAccess) {
                return true;
            }

            if (isAuth && !isTryingToAccessApp) {
                if (
                    (request.nextUrl.pathname.includes('/login') ||
                        request.nextUrl.pathname.includes('/signup')) &&
                    !auth?.user.hasAccess
                ) {
                    return Response.redirect(new URL('/payment', request.nextUrl));
                }
                return true;
            }

            if (!isAuth && !isTryingToAccessApp) {
                return true;
            }
            return false;
        },
        jwt: ({token, user}) => {
            if (user) {
                token.userId = user.id;
                token.hasAccess = user.hasAccess;
            }
            return token;
        },
        session: ({session, token}) => {
            if (session.user) {
                session.user.id = token.userId;
                session.user.hasAccess = token.hasAccess;
            }
            return session;
        }
    },
} satisfies NextAuthConfig;

export const {
    auth,
    signIn,
    signOut,
    handlers: {GET, POST}
} = NextAuth(config);