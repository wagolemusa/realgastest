import { createRouter } from 'next-connect';
import dbConnect from "../../../backend/config/dbConnect";
import onError from "../../../backend/middlewares/errors"
import { webhook } from '../../../backend/controllers/orderController';
// /backend/controllers/productController";


const router = createRouter({ 
    onError,
 });

dbConnect();

export const config = {
    api: {
        bodyParser: false,
    }
}


router.post(webhook);

export default router.handler();