import { createRouter } from 'next-connect';
import dbConnect from '../../../../../backend/config/dbConnect';
import onError from "../../../../../backend/middlewares/errors";

import {
    
  isAuthenticatedUser,
} from "../../../../../backend/middlewares/auth";

import { getinstallmentById, updateinstall } from '../../../../../backend/controllers/installmentController';

const router = createRouter({ 
    onError,
 });

dbConnect();

router.use(isAuthenticatedUser).get(getinstallmentById)
router.use(isAuthenticatedUser).put(updateinstall)

export default router.handler();





