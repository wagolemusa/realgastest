import { createRouter } from 'next-connect';
import dbConnect from "../../../../../backend/config/dbConnect";
import onError from "../../../../../backend/middlewares/errors";

import {
  
  isAuthenticatedUser,
} from "../../../../../backend/middlewares/auth";
import { getInStockProductsByDate } from '../../../../../backend/controllers/sealedController';


const router = createRouter({ 
    onError,
 });
 
dbConnect();



router.use(isAuthenticatedUser).get(getInStockProductsByDate)


export default router.handler();