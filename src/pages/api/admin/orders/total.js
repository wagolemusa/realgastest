import { createRouter } from 'next-connect';
import dbConnect from "../../../../backend/config/dbConnect";
import onError from "../../../../backend/middlewares/errors";

import {
  
  isAuthenticatedUser,
} from "../../../../backend/middlewares/auth";
import {   getsumTodaySales } from '../../../../backend/controllers/orderController';


const router = createRouter({ 
        onError,
    });

dbConnect();


router.get(getsumTodaySales)

export default router.handler();