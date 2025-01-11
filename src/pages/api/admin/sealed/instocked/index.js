import { createRouter } from 'next-connect';
import dbConnect from "../../../../../backend/config/dbConnect";
import onError from "../../../../../backend/middlewares/errors";

import {
  
  isAuthenticatedUser,
} from "../../../../../backend/middlewares/auth";
import { getInStockProductsByDateAndStatus } from '../../../../../backend/controllers/sealedController';


const router = createRouter({ 
    onError,
 });
 
dbConnect();



router.use(isAuthenticatedUser).post(getInStockProductsByDateAndStatus)


export default router.handler();