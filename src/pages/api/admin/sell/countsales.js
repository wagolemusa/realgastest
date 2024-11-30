import { createRouter } from 'next-connect';
import dbConnect from "../../../../backend/config/dbConnect";
import onError from "../../../../backend/middlewares/errors";

import {
  
  isAuthenticatedUser,
} from "../../../../backend/middlewares/auth";
import { getCountSales } from '../../../../backend/controllers/sellController';


const router = createRouter({ 
    onError,
 });
 
dbConnect();


router.get(getCountSales)


export default router.handler();