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
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        // Database connection and user validation
        await dbConnect();
        const foundUser = await User.findOne({ email: credentials.email });
        if (!foundUser) {
          return null;
        }
        const isPasswordCorrect = await bcrypt.compare(credentials.password, foundUser.password);
        if (!isPasswordCorrect) {
          return null;
        }
        return {
          id: foundUser._id.toString(),
          email: foundUser.email,
          name: foundUser.name,
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
        session.user.email = token.email;
        session.user.name = token.name;
        session.user.role = token.role;
      }
      return session;
    },
    async jwt({ token, user }) {
      // Add additional user info to the JWT token
      if (user) {
        token.id = user.id;
        token.email = user.email;
        token.name = user.name;
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



// import CredentialsProvider from "next-auth/providers/credentials";
// import User from '../backend/model/user';
// import bcrypt from "bcryptjs";
// import dbConnect from "../backend/config/dbConnect";

// export const authOptions = {
//   secret: process.env.NEXTAUTH_SECRET, // Provide a secret key for JWT
//   session: {
//     strategy: 'jwt', // Use JSON Web Tokens for session management
//   },
//   pages: {
//     signIn: "/login", // Custom sign-in page
//   },
//   providers: [
//     CredentialsProvider({
//       id: "credentials",
//       name: "Credentials",
//       credentials: {
//         email: { label: "Email", type: "text" },
//         password: { label: "Password", type: "password" },
//       },
//       async authorize(credentials) {
//         try {
//           await dbConnect();
//           console.log("DB Connection successful");
//           const foundUser = await User.findOne({ email: credentials.email });
//           if (!foundUser) {
//             console.log("User not found");
//             return null;
//           }
      
//           const isPasswordCorrect = await bcrypt.compare(credentials.password, foundUser.password);
//           if (!isPasswordCorrect) {
//             console.log("Invalid password");
//             return null;
//           }
      
//           return {
//             id: foundUser._id.toString(),
//             email: foundUser.email,
//             name: foundUser.name,
//             role: foundUser.role,
//           };
//         } catch (error) {
//           console.error("Error during authorization:", error);
//           throw new Error("Authorization error");
//         }
//       }
      
//     }),
//   ],
//   callbacks: {
//     async session({ session, token }) {
//       if (token) {
//         session.user.id = token.id; // Access token.id instead of token._id
//         session.user.email = token.email;
//         session.user.name = token.name;
//         session.user.role = token.role;
//       }
//       return session;
//     },

//     async jwt({ token, user }) {
//       if (user) {
//         token.id = user.id; // Use user.id to match session callback
//         token.email = user.email;
//         token.name = user.name;
//         token.role = user.role;
//       }
//       return token;
//     },
//   },
// };


// import NextAuth from "next-auth";
// import CredentialsProvider from "next-auth/providers/credentials";
// import User from '../../../backend/model/user';
// import bcrypt from "bcryptjs";
// import dbConnect from "../../../backend/config/dbConnect"
// // import { Account, User as AuthUser } from "next-auth";
// import GitHubProvider from "next-auth/providers/github";



// export default NextAuth({
//   session: {
//     strategy: 'jwt',
//   },
//   providers: [
//     CredentialsProvider({
//       id: "credentials",
//       name: "Credentials",
//       credentials: {
//         email: { label: "Email", type: "text" },
//         password: { label: "Password", type: "password" },
//       },
//       async authorize(credentials) {
//         await dbConnect();

//         try {
//           const user = await User.findOne({ email: credentials.email });
//           if (user) {
//             const isPasswordCorrect = await bcrypt.compare(
//               credentials.password,
//               user.password
//             );
//             if (isPasswordCorrect) {
//               // Return the complete user object
//               return {
//                 id: user._id,
//                 email: user.email,
//                 name: user.name,
//                 role: user.role,
//                 username: user.username,
//                 referalCode: user.referalCode
//                 // Assuming 'name' field exists in the User model
//                 // Add other fields as needed
//               };
//             }
//           }
//           // Return null if user not found or password is incorrect
//           return null;
//         } catch (err) {
//           console.error("Error during authorization:", err);
//           throw new Error("Authorization error");
//         }
//       },
//     }),
//     GitHubProvider({
//       clientId: process.env.GITHUB_ID || "",
//       clientSecret: process.env.GITHUB_SECRET || "",
//     }),
//   ],
//   callbacks: {
//     async jwt({ token, user }) {
//       if (user) {
//         token.user = user;
//       }
//       return token;
//     },
//     async session({ session, token }) {
//       session.user = token.user;
//       delete session?.user?.password;
//       return session;
//     },
//   },

//   session: {
//     jwt: true, // Use JSON Web Tokens for session
//   },
//   jwt: {
//     secret: process.env.NEXTAUTH_SECRET, // Provide a secret key for JWT
//   },
// })



// import NextAuth from 'next-auth';
// import CredentialsProvider from 'next-auth/providers/credentials';
// import GitHubProvider from 'next-auth/providers/github';
// import User from '../../../backend/model/user';
// import bcrypt from 'bcryptjs';
// import dbConnect from '../../../backend/config/dbConnect';

// export default NextAuth({
//   session: {
//     strategy: 'jwt',
//   },
//   providers: [
//     CredentialsProvider({
//       id: 'credentials',
//       name: 'Credentials',
//       credentials: {
//         email: { label: 'Email', type: 'text' },
//         password: { label: 'Password', type: 'password' },
//       },
//       async authorize(credentials) {
//         await dbConnect();

//         try {
//           const user = await User.findOne({ email: credentials.email });
//           if (user && await bcrypt.compare(credentials.password, user.password)) {
//             return {
//               id: user._id.toString(),
//               email: user.email,
//               name: user.name,
//               role: user.role,
//               username: user.username,
//               referalCode: user.referalCode,
//             };
//           }
//         } catch (err) {
//           console.error('Error during authorization:', err);
//         }
//         return null;
//       },
//     }),
//     GitHubProvider({
//       clientId: process.env.GITHUB_ID || '',
//       clientSecret: process.env.GITHUB_SECRET || '',
//     }),
//   ],
//   callbacks: {
//     async jwt({ token, user }) {
//       if (user) {
//         token.user = user;
//       }
//       return token;
//     },
//     async session({ session, token }) {
//       session.user = token.user;
//       return session;
//     },
//   },
//   jwt: {
//     secret: process.env.NEXTAUTH_SECRET,
//   },
//   debug: true, // Enable debug mode for more detailed logging
// });
