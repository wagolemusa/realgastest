import { createRouter } from 'next-connect';
import dbConnect from "../../../../backend/config/dbConnect";
import onError from "../../../../backend/middlewares/errors";

import {
  
  isAuthenticatedUser,
} from "../../../../backend/middlewares/auth";
import { getSealedCylinder, newSealedCylinder } from '../../../../backend/controllers/sealedController';


const router = createRouter({ 
    onError,
 });
 
dbConnect();


router.use(isAuthenticatedUser).post(newSealedCylinder);
router.use(isAuthenticatedUser).get(getSealedCylinder)


export default router.handler();