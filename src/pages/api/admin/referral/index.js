import { createRouter } from 'next-connect';
import dbConnect from "../../../../backend/config/dbConnect";
import onError from "../../../../backend/middlewares/errors";

import {
  
  isAuthenticatedUser,
} from "../../../../backend/middlewares/auth";

import { getReferral } from '../../../../backend/controllers/referralController';


const router = createRouter({ 
    onError,
 });

dbConnect();


router.use(isAuthenticatedUser).get(getReferral);

export default router.handler();