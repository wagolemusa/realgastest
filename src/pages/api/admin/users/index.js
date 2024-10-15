import { createRouter } from 'next-connect';
import dbConnect from "../../../../backend/config/dbConnect";
import onError from "../../../../backend/middlewares/errors";

import {
  
  isAuthenticatedUser,
} from "../../../../backend/middlewares/auth";
import { getUsers } from '../../../../backend/controllers/authControllers';


const router = createRouter({ 
    onError,
 });

dbConnect();


router.use(isAuthenticatedUser).get(getUsers);

export default router.handler();