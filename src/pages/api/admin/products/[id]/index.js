import { createRouter } from 'next-connect';
import dbConnect from "../../../../../backend/config/dbConnect"
import onError from "../../../../../backend/middlewares/errors";

import {
  
  isAuthenticatedUser,
} from "../../../../../backend/middlewares/auth";

import { deleteProduct, updateProduct } from '../../../../../backend/controllers/productController';

const router = createRouter({ 
    onError,
 });

dbConnect();


router.use(isAuthenticatedUser).put(updateProduct);
router.use(isAuthenticatedUser).delete(deleteProduct);


export default router.handler();





