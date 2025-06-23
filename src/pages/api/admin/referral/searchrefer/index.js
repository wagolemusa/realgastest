import { createRouter } from 'next-connect';

import dbConnect from '../../../../../backend/config/dbConnect';
import onError from "../../../../../backend/middlewares/errors";

import { isAuthenticatedUser } from '../../../../../backend/middlewares/auth';

import { getSearchRefer } from '../../../../../backend/controllers/referralController';

const router = createRouter({ 
    onError,
 });

dbConnect();

router.use(isAuthenticatedUser).post(getSearchRefer)




export default router.handler();