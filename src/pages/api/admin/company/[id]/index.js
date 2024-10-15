import { createRouter } from 'next-connect';

import dbConnect from '../../../../../backend/config/dbConnect';
import onError from "../../../../../backend/middlewares/errors";

import { isAuthenticatedUser } from '../../../../../backend/middlewares/auth';


import { deleteCompany } from '../../../../../backend/controllers/companyController';

// import { getOrders } from '../../../../backend/controllers/orderController';


const router = createRouter({ 
    onError,
 });

dbConnect();

router.use(isAuthenticatedUser).delete(deleteCompany);



export default router.handler();