import { createRouter } from 'next-connect';
import dbConnect from "../../../../backend/config/dbConnect";
import onError from "../../../../backend/middlewares/errors";

import {
  
  isAuthenticatedUser,
} from "../../../../backend/middlewares/auth";


import { deleteAccessory } from '../../../../backend/controllers/accessoryController';

const router = createRouter({ 
    onError,
 });

dbConnect();

router.use(isAuthenticatedUser).delete(deleteAccessory)

export default router.handler();