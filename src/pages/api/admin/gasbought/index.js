import { createRouter } from 'next-connect';
import dbConnect from "../../../../backend/config/dbConnect";
import onError from "../../../../backend/middlewares/errors";

import {
  
  isAuthenticatedUser,
} from "../../../../backend/middlewares/auth";

import { getGasBought, newGassBought } from '../../../../backend/controllers/gasBoughtController';



const router = createRouter({ 
    onError,
 });

dbConnect();


router.use(isAuthenticatedUser).post(newGassBought);
router.use(isAuthenticatedUser).get(getGasBought)

export default router.handler();