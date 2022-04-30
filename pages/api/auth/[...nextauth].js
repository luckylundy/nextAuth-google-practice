import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default NextAuth({
  adapter: PrismaAdapter(prisma),
  providers: [
    //複数のプロバイダをここに追加していく
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
  ],
  secret: "secret",
  //callbacksで追加の処理を行う時はここ以下に記述
  callbacks: {
    async session({ session, user, token }) {
      session.user.mobile = user.mobile;
      return session;
    },
  },
  events: {
    //callbacks.eventsでprismaがユーザーのアップデートを指示されたらcreateUserイベントが発火
    createUser: async ({ user }) => {
      await prisma.user.update({
        where: {
          id: user.id,
        },
        data: {
          mobile: "090-1111-1111",
        },
      });
    },
  },
});
