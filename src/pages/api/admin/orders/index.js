import { createRouter } from 'next-connect';
import dbConnect from "../../../../backend/config/dbConnect";
import onError from "../../../../backend/middlewares/errors";

import {
  
  isAuthenticatedUser,
} from "../../../../backend/middlewares/auth";
import {  getCountOrders, getOrderProcessing, getsumTodaySales } from '../../../../backend/controllers/orderController';


const router = createRouter({ 
    onError,
 });

dbConnect();


router.use(isAuthenticatedUser).get(getOrderProcessing);
// router.use(isAuthenticatedUser).get(getCountOrders)

export default router.handler();