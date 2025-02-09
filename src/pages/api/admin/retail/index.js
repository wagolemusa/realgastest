import { createRouter } from 'next-connect';
import dbConnect from "../../../../backend/config/dbConnect";
import onError from "../../../../backend/middlewares/errors";

import {
  
  isAuthenticatedUser,
} from "../../../../backend/middlewares/auth";
import {  newRetail } from '../../../../backend/controllers/retailController';


const router = createRouter({ 
    onError,
 });
 
dbConnect();


router.use(isAuthenticatedUser).post(newRetail);



export default router.handler();