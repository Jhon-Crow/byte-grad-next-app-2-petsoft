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
            const hasAccess = auth?.user?.hasAccess;

           if (isTryingToAccessApp){
               if (isAuth && hasAccess) return true;
               if (isAuth && !hasAccess) return Response.redirect(new URL('/payment', request.nextUrl));
               if (!isAuth) return Response.redirect(new URL('/login', request.nextUrl));
           }

           if (!isAuth && !isTryingToAccessApp && !request.nextUrl.pathname.includes('payment')) {
               return true;
           }

           if (isAuth && request.nextUrl.pathname.includes('login') || request.nextUrl.pathname.includes('signup')) {
               if (!hasAccess) return Response.redirect(new URL('/payment', request.nextUrl));
               if (hasAccess) return Response.redirect(new URL('/app/dashboard', request.nextUrl));
           }

           if (isAuth && request.nextUrl.pathname.includes('payment') && !hasAccess) {
              return true;
           }
        },
        jwt: async ({token, user, trigger}) => {
            if (user) {
                token.userId = user.id;
                token.email = user.email!;
                token.hasAccess = user.hasAccess;
            }

            if (trigger === 'update') {
                const userFromDb = await getUserByEmail(token.email);
                if (userFromDb) {
                    token.hasAccess = userFromDb.hasAccess;
                }
            }

            return token;
        },
        session: ({session, token}) => {
            session.user.id = token.userId;
            session.user.hasAccess = token.hasAccess;

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