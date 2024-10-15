import { createRouter } from 'next-connect';
import dbConnect from "../../../../backend/config/dbConnect";
import onError from "../../../../backend/middlewares/errors";

import {
  
  isAuthenticatedUser,
} from "../../../../backend/middlewares/auth";

import { getAccessory, newAccessory } from '../../../../backend/controllers/accessoryController';



const router = createRouter({ 
    onError,
 });

dbConnect();


router.use(isAuthenticatedUser).post(newAccessory);
router.use(isAuthenticatedUser).get(getAccessory);

export default router.handler();