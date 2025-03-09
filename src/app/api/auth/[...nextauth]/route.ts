import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import { PrismaAdapter } from "@auth/prisma-adapter";
import prisma from "@/lib/prisma";

export const authOptions = {
	providers: [
		GoogleProvider({
			clientId: process.env.GOOGLE_CLIENT_ID!,
			clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
		}),
	],
	session: { strategy: 'jwt' as const },
	callbacks: {
		async signIn({ user }: { user: { email: string; name: string; image: string } }) {
			try {
				await prisma.user.upsert({
					where: {email: user.email},
					update: {name: user.name, image: user.image},
					create: {email: user.email, name: user.name, image: user.image},
				});
				return true;
			} catch (error) {
				console.error("Error inserting/updating user in database", error);
				return false;
			}
		},
		async session({ session, token }: { session: any; token: any }) {
			console.log("Testing session:", session);
			if (session.user) session.user.id = token.sub;
			console.log("Session:", session);
			return session;
		},
		async jwt({ token, user }: { token: any; user: any }) {
			console.log("Testing token:", token);
			if (user) token.id = user.id;
			console.log("Token:", token);
			return token;
		}
	},
	secret: process.env.NEXTAUTH_SECRET,
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
