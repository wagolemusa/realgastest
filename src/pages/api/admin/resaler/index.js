import { createRouter } from 'next-connect';
import dbConnect from "../../../../backend/config/dbConnect";
import onError from "../../../../backend/middlewares/errors";

import {
  
  isAuthenticatedUser,
} from "../../../../backend/middlewares/auth";

import { getResaler, NewResaler } from '../../../../backend/controllers/resalerContraller';



const router = createRouter({ 
    onError,
 });

dbConnect();


router.use(isAuthenticatedUser).post(NewResaler);
router.use(isAuthenticatedUser).get(getResaler)

export default router.handler();