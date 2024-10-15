import { createRouter } from 'next-connect';
import dbConnect from "../../../backend/config/dbConnect";
import onError from "../../../backend/middlewares/errors"
import { isAuthenticatedUser } from '../../../backend/middlewares/auth';
import { canReview } from '../../../backend/controllers/orderPayController';
// /backend/controllers/productController";


const router = createRouter({ 
    onError,
 });

dbConnect();

router.use(isAuthenticatedUser).get(canReview);

export default router.handler();