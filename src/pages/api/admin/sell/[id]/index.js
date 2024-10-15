import { createRouter } from 'next-connect';

import dbConnect from '../../../../../backend/config/dbConnect';
import onError from "../../../../../backend/middlewares/errors";

import { isAuthenticatedUser } from '../../../../../backend/middlewares/auth';


import { getsalesById, updateSell, deleteSell } from '../../../../../backend/controllers/sellController';



const router = createRouter({ 
    onError,
 });

dbConnect();

router.use(isAuthenticatedUser).delete(deleteSell);
router.use(isAuthenticatedUser).get(getsalesById)
router.use(isAuthenticatedUser).put(updateSell)

export default router.handler();