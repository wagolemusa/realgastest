import { createRouter } from 'next-connect';
import dbConnect from '../../../../../backend/config/dbConnect';
import onError from "../../../../../backend/middlewares/errors";

import {
    
  isAuthenticatedUser,
} from "../../../../../backend/middlewares/auth";

import { deleteBought } from '../../../../../backend/controllers/gasBoughtController';

const router = createRouter({ 
    onError,
 });

dbConnect();

router.use(isAuthenticatedUser).delete(deleteBought)

export default router.handler();





