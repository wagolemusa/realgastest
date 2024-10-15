import { createRouter } from 'next-connect';
import dbConnect from "../../../../backend/config/dbConnect";
import onError from "../../../../backend/middlewares/errors";

import {
  
  isAuthenticatedUser,
} from "../../../../backend/middlewares/auth";

import { getSockedCylinder, newStockCylinder } from '../../../../backend/controllers/stockCylinder';



const router = createRouter({ 
    onError,
 });

dbConnect();


router.use(isAuthenticatedUser).post(newStockCylinder);
router.use(isAuthenticatedUser).get(getSockedCylinder);

export default router.handler();