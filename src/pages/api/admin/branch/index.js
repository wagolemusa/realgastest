import { createRouter } from 'next-connect';
import dbConnect from "../../../../backend/config/dbConnect";
import onError from "../../../../backend/middlewares/errors";

import {
  
  isAuthenticatedUser,
} from "../../../../backend/middlewares/auth";

import { newBranch, getBranches} from '../../../../backend/controllers/mainController'; 



const router = createRouter({ 
    onError,
 });

dbConnect();


router.use(isAuthenticatedUser).post(newBranch);
router.use(isAuthenticatedUser).get(getBranches)

export default router.handler();