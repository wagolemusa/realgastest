import { createRouter } from 'next-connect';
import dbConnect from "../../../../backend/config/dbConnect";
import onError from "../../../../backend/middlewares/errors";

import {
  
  isAuthenticatedUser,
} from "../../../../backend/middlewares/auth";
import { getShopkeeperSales} from '../../../../backend/controllers/retailController';


const router = createRouter({ 
    onError,
 });
 
dbConnect();


router.use(isAuthenticatedUser).get(getShopkeeperSales);


export default router.handler();