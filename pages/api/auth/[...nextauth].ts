import NextAuth, { User } from 'next-auth';
import GoogleProvider from 'next-auth/providers/google';

type ExtendedUserType = User & { username?: string; uid?: string };

export default NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
  ],

  pages: {
    signIn: '/auth/signin',
  },

  callbacks: {
    async session({ session, token, user }) {
      (session.user as ExtendedUserType).username = session.user?.name
        ?.split(' ')
        .join('')
        .toLowerCase();
      (session.user as ExtendedUserType).uid = token.sub;
      return session;
    },
  },
});
