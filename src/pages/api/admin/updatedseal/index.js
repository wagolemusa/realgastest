import { createRouter } from 'next-connect';
import dbConnect from "../../../../backend/config/dbConnect";
import onError from "../../../../backend/middlewares/errors";

import {
  
  isAuthenticatedUser,
} from "../../../../backend/middlewares/auth";
import { getupdatedSeal, newupdatedSeal } from '../../../../backend/controllers/updatedsealController';


const router = createRouter({ 
    onError,
 });
 
dbConnect();


router.use(isAuthenticatedUser).post(newupdatedSeal);
router.use(isAuthenticatedUser).get(getupdatedSeal)


export default router.handler();