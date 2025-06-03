import { createRouter } from 'next-connect';
import dbConnect from "../../../../backend/config/dbConnect";
import onError from "../../../../backend/middlewares/errors";

import {
  
  authorizeRoles,
  isAuthenticatedUser,
} from "../../../../backend/middlewares/auth";
import {   getOrdersSearch  } from '../../../../backend/controllers/orderController';


const router = createRouter({ 
    onError,
 });

dbConnect();


// router.use(isAuthenticatedUser).get(getOrders);
router.use(isAuthenticatedUser)
      .use(authorizeRoles('admin'))      
      .get(getOrdersSearch)

export default router.handler();