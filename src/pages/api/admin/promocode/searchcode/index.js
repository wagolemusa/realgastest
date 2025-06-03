import { createRouter } from 'next-connect';

import dbConnect from '../../../../../backend/config/dbConnect';
import onError from "../../../../../backend/middlewares/errors";

import { isAuthenticatedUser } from '../../../../../backend/middlewares/auth';

import { getSearchCode } from '../../../../../backend/controllers/promoController';

const router = createRouter({ 
    onError,
 });

dbConnect();

router.use(isAuthenticatedUser).post(getSearchCode)




export default router.handler();