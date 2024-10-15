import { createRouter } from 'next-connect';

import dbConnect from '../../../../../backend/config/dbConnect';
import onError from "../../../../../backend/middlewares/errors";

import { isAuthenticatedUser } from '../../../../../backend/middlewares/auth';

import { deletePoint, getPointById, updatepoints } from '../../../../../backend/controllers/pointsController';

const router = createRouter({ 
    onError,
 });

dbConnect();

router.use(isAuthenticatedUser).delete(deletePoint);
router.use(isAuthenticatedUser).get(getPointById);
router.use(isAuthenticatedUser).put(updatepoints)



export default router.handler();