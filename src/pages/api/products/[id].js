import { createRouter } from 'next-connect';
import dbConnect from "../../../backend/config/dbConnect";
import {getProduct } from "../../../backend/controllers/productController"
import onError from "../../../backend/middlewares/errors"


const router = createRouter({ onError });

dbConnect();


router.get(getProduct);


export default router.handler();