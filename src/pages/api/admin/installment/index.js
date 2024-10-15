import { createRouter } from 'next-connect';
import dbConnect from "../../../../backend/config/dbConnect";
import onError from "../../../../backend/middlewares/errors";

import {
  
  isAuthenticatedUser,
} from "../../../../backend/middlewares/auth";

import { getInstallment, newInstallment, secandeInstallment } from '../../../../backend/controllers/installmentController';



const router = createRouter({ 
    onError,
 });

dbConnect();


router.use(isAuthenticatedUser).post(newInstallment);
router.use(isAuthenticatedUser).post(secandeInstallment);
router.use(isAuthenticatedUser).get(getInstallment)

export default router.handler();