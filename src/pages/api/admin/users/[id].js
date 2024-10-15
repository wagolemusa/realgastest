import { createRouter } from 'next-connect';
import dbConnect from "../../../../backend/config/dbConnect";
import onError from "../../../../backend/middlewares/errors";

import {
  
  isAuthenticatedUser,
} from "../../../../backend/middlewares/auth";
import { deleteUsers, getUser, updateUser } from '../../../../backend/controllers/authControllers';



const router = createRouter({ 
    onError,
 });

dbConnect();


router.use(isAuthenticatedUser).get(getUser);
router.use(isAuthenticatedUser).put(updateUser);
router.use(isAuthenticatedUser).delete(deleteUsers);


export default router.handler();