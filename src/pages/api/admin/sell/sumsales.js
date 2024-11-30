import { createRouter } from 'next-connect';
import dbConnect from "../../../../backend/config/dbConnect";
import onError from "../../../../backend/middlewares/errors";

import {
  
  isAuthenticatedUser,
} from "../../../../backend/middlewares/auth";
import {  getsumTodaySalesOnShop } from '../../../../backend/controllers/sellController';


const router = createRouter({ 
    onError,
 });
 
dbConnect();


router.get(getsumTodaySalesOnShop)


export default router.handler();