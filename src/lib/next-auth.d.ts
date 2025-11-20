import {NextAuthConfig} from 'next-auth'

const config = NextAuthConfig;
declare module '@auth/core/jwt' {
    interface JWT {
        userId: string;
    }
}