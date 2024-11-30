import { createRouter } from 'next-connect';
import dbConnect from "../../../../backend/config/dbConnect";
import onError from "../../../../backend/middlewares/errors";

import {
  
  isAuthenticatedUser,
} from "../../../../backend/middlewares/auth";

import { getBulkgas, newGasBulk } from '../../../../backend/controllers/bulkController';
  


const router = createRouter({ 
    onError,
 });

dbConnect();


router.use(isAuthenticatedUser).post(newGasBulk);
router.use(isAuthenticatedUser).get(getBulkgas)

export default router.handler();