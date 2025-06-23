import { createRouter } from 'next-connect';
import dbConnect from "../../../../backend/config/dbConnect";
import onError from "../../../../backend/middlewares/errors";

import {
  
  isAuthenticatedUser,
} from "../../../../backend/middlewares/auth";

import { getEmployeeById, updateEmployee } from '../../../../backend/controllers/employeeController';

const router = createRouter({ 
    onError,
 });

dbConnect();

router.use(isAuthenticatedUser).get(getEmployeeById);
router.use(isAuthenticatedUser).put(updateEmployee);

// router.use(isAuthenticatedUser).delete(deleteCustomer)


export default router.handler();