import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

const handler = NextAuth({
    providers: [
        CredentialsProvider({
            name: "Credentials",
            credentials: {
                email: { label: "Email", type: "text" },
                password: { label: "Password", type: "password" },
            },
            async authorize(credentials) {
                // Temporary demo user
                if (
                    credentials?.email === "seller@example.com" &&
                    credentials?.password === "password123"
                ) {
                    return {
                        id: "1",
                        name: "Demo Seller",
                        email: "seller@example.com",
                        role: "seller",
                    };
                }

                return null;
            },
        }),
    ],

    session: {
        strategy: "jwt",
    },

    pages: {
        signIn: "/login", // 🔥 THIS is what replaces the ugly default page
    },

    secret: process.env.NEXTAUTH_SECRET,
});

export { handler as GET, handler as POST };