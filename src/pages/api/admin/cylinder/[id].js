import { createRouter } from 'next-connect';
import dbConnect from "../../../../backend/config/dbConnect";
import onError from "../../../../backend/middlewares/errors";

import {
  
  isAuthenticatedUser,
} from "../../../../backend/middlewares/auth";

import { deleteSockedCylinder } from '../../../../backend/controllers/stockCylinder';



const router = createRouter({ 
    onError,
 });

dbConnect();


router.use(isAuthenticatedUser).delete(deleteSockedCylinder)

export default router.handler();