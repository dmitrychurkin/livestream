import NextAuth from "next-auth";
import Providers from "next-auth/providers";

const {
  GOOGLE_CLIENT_ID = "",
  GOOGLE_CLIENT_SECRET = "",
  SECRET,
  DATABASE_NAME,
  NODE_ENV,
} = process.env;

export default NextAuth({
  providers: [
    Providers.Google({
      clientId: GOOGLE_CLIENT_ID,
      clientSecret: GOOGLE_CLIENT_SECRET,
    }),
    Providers.Credentials({
      name: "Log in with credentials",
      credentials: {
        email: { label: "Email", type: "email", placeholder: "Email" },
        password: {
          label: "Password",
          type: "password",
          placeholder: "Password",
        },
      },
      async authorize(/*...args*/) {
        // console.log('args => ', args);
        return null;
      },
    }),
  ],
  secret: SECRET,
  database: {
    type: "mongodb",
    host: "localhost",
    port: 27017,
    database: DATABASE_NAME,
  },
  session: {
    jwt: true,
  },
  debug: NODE_ENV !== "production",
  pages: {
    signIn: "/login",
  },
});
