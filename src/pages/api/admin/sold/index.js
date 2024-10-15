import { createRouter } from 'next-connect';
import dbConnect from "../../../../backend/config/dbConnect";
import onError from "../../../../backend/middlewares/errors";

import {
  
  isAuthenticatedUser,
} from "../../../../backend/middlewares/auth";
import { getSoldAccessory, newSoldAccessory } from '../../../../backend/controllers/soldController';


const router = createRouter({ 
    onError,
 });

dbConnect();


router.use(isAuthenticatedUser).post(newSoldAccessory);
router.use(isAuthenticatedUser).get(getSoldAccessory);

export default router.handler();