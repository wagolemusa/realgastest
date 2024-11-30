import { createRouter } from 'next-connect';
import dbConnect from "../../../../backend/config/dbConnect";
import onError from "../../../../backend/middlewares/errors";

import {
  
  isAuthenticatedUser,
} from "../../../../backend/middlewares/auth";
import { getCountSales, getSell, newSell } from '../../../../backend/controllers/sellController';


const router = createRouter({ 
    onError,
 });
 
dbConnect();


router.use(isAuthenticatedUser).post(newSell);
router.use(isAuthenticatedUser).get(getSell)


export default router.handler();