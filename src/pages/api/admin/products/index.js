import { createRouter } from 'next-connect';
import dbConnect from "../../../../backend/config/dbConnect";
import onError from "../../../../backend/middlewares/errors";

import {
  
  isAuthenticatedUser,
} from "../../../../backend/middlewares/auth";

import { newProduct } from "../../../../backend/controllers/productController";

const router = createRouter({ 
    onError,
 });

dbConnect();


router.use(isAuthenticatedUser).post(newProduct);

export default router.handler();