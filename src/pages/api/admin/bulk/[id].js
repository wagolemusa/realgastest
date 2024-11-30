import { createRouter } from 'next-connect';
import dbConnect from "../../../../backend/config/dbConnect";
import onError from "../../../../backend/middlewares/errors";

import {

  isAuthenticatedUser,
} from "../../../../backend/middlewares/auth";

import { getBulkById, updateBulk } from '../../../../backend/controllers/bulkController';


const router = createRouter({ 
    onError,
 });

dbConnect();

router.use(isAuthenticatedUser).put(updateBulk);
router.use(isAuthenticatedUser).get(getBulkById);


export default router.handler();