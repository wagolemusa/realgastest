import { createRouter } from 'next-connect';

import dbConnect from '../../../../../backend/config/dbConnect';
import onError from "../../../../../backend/middlewares/errors";

import { isAuthenticatedUser } from '../../../../../backend/middlewares/auth';

import { getSearchExpenseDate } from '../../../../../backend/controllers/expense';

const router = createRouter({ 
    onError,
 });

dbConnect();

router.use(isAuthenticatedUser).post(getSearchExpenseDate)




export default router.handler();