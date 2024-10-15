import { getServerSession } from "next-auth";
import { authOptions } from "../../lib/authOptions";
import ErrorHandler from "../utils/errorHandler";

const isAuthenticatedUser = async (req, res, next) => {
  const session = await getServerSession(req, res, authOptions);

  console.log("Session Info:", session); // Log session info for debugging

  if (!session) {
    return next(new ErrorHandler("Login first to access this route", 401));
  }

  req.user = session.user;
  next();
};


const authorizeRoles = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return next(
        new ErrorHandler(
          `Role (${req.user.role}) is not allowed to access this resource.`
        ),
        console.log("xxx", req.user.role)

      );
    }

    next();
  };
};

export {isAuthenticatedUser,  authorizeRoles };



