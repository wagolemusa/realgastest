import { createRouter } from 'next-connect';
import dbConnect from "../../../../../backend/config/dbConnect";
import onError from "../../../../../backend/middlewares/errors";

import {
  
  isAuthenticatedUser,
} from "../../../../../backend/middlewares/auth";
import { getInventoryOutOfStock, newInventoryAccessory } from '../../../../../backend/controllers/invetoryController';


const router = createRouter({ 
    onError,
 });

dbConnect();


router.use(isAuthenticatedUser).post(newInventoryAccessory);
router.use(isAuthenticatedUser).get(getInventoryOutOfStock);

export default router.handler();