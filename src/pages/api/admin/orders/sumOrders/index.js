import { createRouter } from 'next-connect';
import dbConnect from "../../../../../backend/config/dbConnect";
import onError from "../../../../../backend/middlewares/errors";

import {
  
  isAuthenticatedUser,
} from "../../../../../backend/middlewares/auth";
import {  getCountOrdersAndSum } from '../../../../../backend/controllers/orderController';


const router = createRouter({ 
    onError,
 });

dbConnect();


router.use(isAuthenticatedUser).get(getCountOrdersAndSum);

export default router.handler();