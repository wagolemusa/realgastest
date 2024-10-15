import { createRouter } from 'next-connect';
import dbConnect from "../../../../backend/config/dbConnect";
import onError from "../../../../backend/middlewares/errors";

import {
  
  isAuthenticatedUser,
} from "../../../../backend/middlewares/auth";

import { getCompanyData, newCompany } from '../../../../backend/controllers/companyController'

// import { getOrders } from '../../../../backend/controllers/orderController';


const router = createRouter({ 
    onError,
 });

dbConnect();


router.use(isAuthenticatedUser).post(newCompany);
router.use(isAuthenticatedUser).get(getCompanyData);

export default router.handler();