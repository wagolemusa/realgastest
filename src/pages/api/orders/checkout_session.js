import { createRouter } from 'next-connect';
import dbConnect from "../../../backend/config/dbConnect";
import onError from "../../../backend/middlewares/errors"
// import { checkoutSession } from '../../../backend/controllers/orderControllers';
import { checkoutSession } from '../../../backend/controllers/orderPayController';

import { isAuthenticatedUser } from '../../../backend/middlewares/auth';
// /backend/controllers/productController";


const router = createRouter({ 
    onError,
 });

dbConnect();

router.use(isAuthenticatedUser).post(checkoutSession);

export default router.handler();