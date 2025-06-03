import { createRouter } from 'next-connect';
import dbConnect from "../../../../backend/config/dbConnect";
import onError from "../../../../backend/middlewares/errors";

import {
  
  authorizeRoles,
  isAuthenticatedUser,
} from "../../../../backend/middlewares/auth";
import { updateOrder, deleteOrder, getOrderByID } from '../../../../backend/controllers/orderController';



const router = createRouter({ 
    onError,
 });

dbConnect();


router.use(isAuthenticatedUser)
.use(authorizeRoles('admin')) 
.get(getOrderByID);
router.use(isAuthenticatedUser).put(updateOrder);
router.use(isAuthenticatedUser).delete(deleteOrder);


export default router.handler();