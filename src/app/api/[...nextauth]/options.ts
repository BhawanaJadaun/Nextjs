import NextAuth from "next-auth";
import { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";
import dbConnect from "@/lib/dbConnect";
import UserModel from "@/model/User";
export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      id: "Credentials",
      name: "Credentials",
     credentials: {
      email:{label:"Email",type:"text"},
      username: { label: "Username", type: "text", placeholder: "jsmith" },
      password: { label: "Password", type: "password" }
    },
    async authorize(credentials: any): Promise<any> {
      await dbConnect();
      try {
        const user = await UserModel.findOne({
          $or: [
            { email: credentials.identifier },
            { username: credentials.identifier },
          ],
        });
    
        if (!user) {
          console.error("No user found");
          return null;
        }
    
        if (!user.isVerified) {
          console.error("Account not verified");
          return null;
        }
    
        const isPasswordCorrect = await bcrypt.compare(
          credentials.password,
          user.password
        );
    
        if (!isPasswordCorrect) {
          console.error("Incorrect password");
          return null;
        }
    
        return user;
      } catch (err: any) {
        console.error("Authorize error:", err.message);
        return null; // <-- Important to return null here
      }
    }
    
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token._id = user._id;
        token.isVerified = user.isVerified;
      }
      return token;
    },
    session: async ({ session, token }) => {
      if (token) {
        session.user._id = token._id;
        session.user.isVerified = token.isVerified;
      }
      return session;
    },
  },
  
  pages:{
    signIn:'/sign-in'
  },
  session:{
    strategy:"jwt",
  },
  secret:process.env.NEXTAUTH_SECRET,
};
