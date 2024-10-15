import { createRouter } from 'next-connect';
import dbConnect from "../../../../../backend/config/dbConnect";
import onError from "../../../../../backend/middlewares/errors";

import {
  
  isAuthenticatedUser,
} from "../../../../../backend/middlewares/auth";
import {  getOrderAllProcessing } from '../../../../../backend/controllers/orderController';


const router = createRouter({ 
    onError,
 });

dbConnect();


router.use(isAuthenticatedUser).get(getOrderAllProcessing);

export default router.handler();