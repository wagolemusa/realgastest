import { createRouter } from 'next-connect';
import dbConnect from "../../../../backend/config/dbConnect";
import onError from "../../../../backend/middlewares/errors";

import {
  
  isAuthenticatedUser,
} from "../../../../backend/middlewares/auth";


import { getExpenseById, updateExpense } from '../../../../backend/controllers/expense';

const router = createRouter({ 
    onError,
 });

dbConnect();

router.use(isAuthenticatedUser).put(updateExpense);
router.use(isAuthenticatedUser).get(getExpenseById);


export default router.handler();