import { createRouter } from 'next-connect';
import dbConnect from "../../../../backend/config/dbConnect";
import onError from "../../../../backend/middlewares/errors";

import {
  
  isAuthenticatedUser,
} from "../../../../backend/middlewares/auth";

import { getEmployee, newEmployee } from '../../../../backend/controllers/employeeController';



const router = createRouter({ 
    onError,
 });

dbConnect();


router.use(isAuthenticatedUser).post(newEmployee);
router.use(isAuthenticatedUser).get(getEmployee);

export default router.handler();