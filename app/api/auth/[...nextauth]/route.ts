import { PrismaAdapter } from "@auth/prisma-adapter";
import { PrismaClient } from '@prisma/client';
import brcyrpt from 'bcrypt';
import NextAuth from 'next-auth';
import CredentialsProvider from "next-auth/providers/credentials";

const prisma = new PrismaClient();

export const authOptions = {
    adapter: PrismaAdapter(prisma), 
    providers: [
        CredentialsProvider({
            name: 'Credentials',
            credentials: {
                username: { label: "Username", type: "text", placeholder: "jsmith" },
                password: { label: "Password", type: "password" }
            }, 
            async authorize(credentials) {
                
            }
        })
    ], 
    session: {
        strategy: 'jwt',
    }, 
    secret: process.env.NEXTAUTH_SECRET,
    debug: process.env.NODE_ENV === 'development',

}

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };

