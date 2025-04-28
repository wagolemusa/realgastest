// import CredentialsProvider from "next-auth/providers/credentials";
// import User from '../backend/model/user';
// import bcrypt from "bcryptjs";
// import dbConnect from "../backend/config/dbConnect";

// export const authOptions = {
//   secret: process.env.NEXTAUTH_SECRET, // Secret for JWT encryption
//   session: {
//     strategy: 'jwt', // Use JWT for session management
//     maxAge: 30 * 24 * 60 * 60, // JWT session expires in 30 days
//   },
//   pages: {
//     signIn: "/login", // Custom sign-in page
//   },
//   providers: [
//     CredentialsProvider({
//       id: "credentials",
//       name: "Credentials",
//       credentials: {
//         username: { label: "Username", type: "text" },
//         password: { label: "Password", type: "password" },
//       },
//       async authorize(credentials) {
//         // Database connection and user validation
//         await dbConnect();
//         const foundUser = await User.findOne({ username: credentials.username });
//         if (!foundUser) {
//           return null;
//         }
//         const isPasswordCorrect = await bcrypt.compare(credentials.password, foundUser.password);
//         if (!isPasswordCorrect) {
//           return null;
//         }
//         return {
//           id: foundUser._id.toString(),
//           name: foundUser.name,
//           username: foundUser.username,
//           phone: foundUser.phone,
//           referalCode: foundUser.referalCode,
//           role: foundUser.role,
//         };
//       },
//     }),
//   ],
//   callbacks: {
//     async session({ session, token }) {
//       // Add additional user info to the session object
//       if (token) {
//         session.user.id = token.id;
//         session.user.name = token.name;
//         session.user.username = token.username,
//         session.user.phone = token.phone,
//         session.user.referalCode = token.referalCode,
//         session.user.role = token.role;
//       }
//       return session;
//     },
//     async jwt({ token, user }) {
//       // Add additional user info to the JWT token
//       if (user) {
//         token.id = user.id;
//         token.name = user.name;
//         token.username = user.username,
//         token.phone = user.phone,
//         token.referalCode = user.referalCode;
//         token.role = user.role;
//       }
//       return token;
//     },
//   },
//   cookies: {
//     sessionToken: {
//       name: 'next-auth.session-token',
//       options: {
//         httpOnly: true,
//         sameSite: 'lax',
//         path: '/',
//         secure: process.env.NODE_ENV === 'production', // Secure cookie in production
//       },
//     },
//     callbackUrlToken: {
//       name: 'next-auth.callback-url',
//       options: {
//         sameSite: 'lax',
//         path: '/',
//         secure: process.env.NODE_ENV === 'production', // Secure cookie in production
//       },
//     },
//   },
// };


import CredentialsProvider from "next-auth/providers/credentials";
import User from '../backend/model/user';
import bcrypt from "bcryptjs";
import dbConnect from "../backend/config/dbConnect";

export const authOptions = {
  secret: process.env.NEXTAUTH_SECRET, // Secret for JWT encryption
  session: {
    strategy: 'jwt', // Use JWT for session management
    maxAge: 30 * 24 * 60 * 60, // JWT session expires in 30 days
  },
  pages: {
    signIn: "/login", // Custom sign-in page
  },
  providers: [
    CredentialsProvider({
      id: "credentials",
      name: "Credentials",
      credentials: {
        username: { label: "Username", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        // Database connection and user validation
        await dbConnect();
        const foundUser = await User.findOne({ username: credentials.username });
        if (!foundUser) {
          return null;
        }
        const isPasswordCorrect = await bcrypt.compare(credentials.password, foundUser.password);
        if (!isPasswordCorrect) {
          return null;
        }
        return {
          id: foundUser._id.toString(),
          name: foundUser.name,
          username: foundUser.username,
          phone: foundUser.phone,
          referalCode: foundUser.referalCode,
          role: foundUser.role,
        };
      },
    }),
  ],
  callbacks: {
    async session({ session, token }) {
      // Add additional user info to the session object
      if (token) {
        session.user.id = token.id;
        session.user.name = token.name;
        session.user.username = token.username;
        session.user.phone = token.phone;
        session.user.referalCode = token.referalCode;
        session.user.role = token.role;
      }
      return session;
    },
    async jwt({ token, user }) {
      // Add additional user info to the JWT token
      if (user) {
        token.id = user.id;
        token.name = user.name;
        token.username = user.username;
        token.phone = user.phone;
        token.referalCode = user.referalCode;
        token.role = user.role;
      }
      return token;
    },
  },
  cookies: {
    sessionToken: {
      name: 'next-auth.session-token',
      options: {
        httpOnly: true,
        sameSite: 'lax',
        path: '/',
        secure: process.env.NODE_ENV === 'production', // Secure cookie in production
      },
    },
    callbackUrlToken: {
      name: 'next-auth.callback-url',
      options: {
        sameSite: 'lax',
        path: '/',
        secure: process.env.NODE_ENV === 'production', // Secure cookie in production
      },
    },
  },
};