import { createRouter } from 'next-connect';
import dbConnect from "../../../../backend/config/dbConnect";
import onError from "../../../../backend/middlewares/errors";

import {
  
  isAuthenticatedUser,
} from "../../../../backend/middlewares/auth";


import { updateBranches, getBranchById, deleteBranch } from '../../../../backend/controllers/mainController'; 

const router = createRouter({ 
    onError,
 });

dbConnect();

router.use(isAuthenticatedUser).put(updateBranches);
router.use(isAuthenticatedUser).get(getBranchById);
router.use(isAuthenticatedUser).delete(deleteBranch)

export default router.handler();