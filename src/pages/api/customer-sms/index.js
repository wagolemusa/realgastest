import { createRouter } from 'next-connect';
import dbConnect from "../../../backend/config/dbConnect";
import onError from "../../../backend/middlewares/errors"
// import { getAddresses, newAddress } from '../../../backend/controllers/addressControllers';
// import { isAuthenticatedUser } from '../../../backend/middlewares/auth';
import { sendSms } from '../../../backend/controllers/customerController';


const router = createRouter({ onError });

dbConnect();


router

  .post(sendSms);


export default router.handler();