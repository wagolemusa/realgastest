import NextAuth from "next-auth";
import { authOptions } from '../../../lib/authOptions'; // Adjust the path if necessary

export default (req, res) => NextAuth(req, res, authOptions);