import { createRouter } from 'next-connect';
import dbConnect from "../../../../backend/config/dbConnect";
import onError from "../../../../backend/middlewares/errors";

import {
  
  isAuthenticatedUser,
} from "../../../../backend/middlewares/auth";

import { getCustomers, newCustomer,getCustomerById, updateCustomer, deleteCustomer } from '../../../../backend/controllers/customerController';

// import { getOrders } from '../../../../backend/controllers/orderController';


const router = createRouter({ 
    onError,
 });

dbConnect();

router.use(isAuthenticatedUser).put(updateCustomer);
router.use(isAuthenticatedUser).get(getCustomerById);
router.use(isAuthenticatedUser).post(newCustomer);
router.use(isAuthenticatedUser).get(getCustomers)
router.use(isAuthenticatedUser).delete(deleteCustomer)


export default router.handler();