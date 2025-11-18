import NextAuth, {NextAuthConfig} from "next-auth";
import {prisma} from "@/lib/db";
import Credentials from "@auth/core/providers/credentials";
import bcrypt from "bcryptjs";

const config = {
    pages: {
        signIn: '/login',
    },
    providers: [
        Credentials({
            async authorize(credentials) {
                const {email, password} = credentials;

                const user = await prisma.user.findUnique({
                    where: {
                        email
                    }
                })
                if (!user) {
                    console.log('No user found');
                    return null;
                }
                const passwordsMatch = await bcrypt.compare(password, user.hashedPassword);
                if(!passwordsMatch){
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
            const isTryingToAccessApp = request.nextUrl.pathname.includes('app');

            if (isTryingToAccessApp && !isAuth) {
                return false;
            } else {
                return true
            }
        }
    }
} satisfies NextAuthConfig;

export const {auth, signIn} = NextAuth(config);