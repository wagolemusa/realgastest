import { createRouter } from 'next-connect';
import dbConnect from "../../../../backend/config/dbConnect";
import onError from "../../../../backend/middlewares/errors"
import { isAuthenticatedUser } from '../../../../backend/middlewares/auth';
import { myOrders } from '../../../../backend/controllers/orderController';
// /backend/controllers/productController";


const router = createRouter({ 
    onError,
 });

dbConnect();

router.use(isAuthenticatedUser).get(myOrders);

export default router.handler();