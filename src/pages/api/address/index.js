import { createRouter } from 'next-connect';
import dbConnect from "../../../backend/config/dbConnect";
import onError from "../../../backend/middlewares/errors"
import { getAddresses, newAddress } from '../../../backend/controllers/addressControllers';
import { isAuthenticatedUser } from '../../../backend/middlewares/auth';


const router = createRouter({ onError });

dbConnect();


router
  .use(isAuthenticatedUser)
  .get(getAddresses)
  .post(newAddress);


export default router.handler();