import { createRouter } from 'next-connect';
import dbConnect from "../../../../backend/config/dbConnect";
import onError from "../../../../backend/middlewares/errors";

import {
  
  isAuthenticatedUser,
} from "../../../../backend/middlewares/auth";
import { getInventoryInStock, newInventoryAccessory } from '../../../../backend/controllers/invetoryController';


const router = createRouter({ 
    onError,
 });

dbConnect();


router.use(isAuthenticatedUser).post(newInventoryAccessory);
router.use(isAuthenticatedUser).get(getInventoryInStock);

export default router.handler();