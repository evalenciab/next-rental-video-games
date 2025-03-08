import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import { PrismaAdapter } from "@auth/prisma-adapter";
import prisma from "@/lib/prisma";

export const authOptions = {
	adapter: PrismaAdapter(prisma),
	providers: [
		GoogleProvider({
			clientId: process.env.GOOGLE_CLIENT_ID!,
			clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
		}),
	],
	session: { strategy: "jwt" as "jwt" },
	callbacks: {
		async session({ session, user }: { session: any; user: any }) {
			if (session.user) session.user.id = user.id;
			return session;
		},
	},
	cookies: {
		sessionToken: {
			name: `__Secure-next-auth.session-token`,
			options: {
				httpOnly: true,
				sameSite: "lax" as "lax",
				path: "/",
				secure: process.env.NODE_ENV === "production",
			},
		},
	},
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
