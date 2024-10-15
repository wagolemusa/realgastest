import { createRouter } from 'next-connect';
import dbConnect from "../../../backend/config/dbConnect";
import onError from "../../../backend/middlewares/errors"
import { getAddress, updateAddress } from '../../../backend/controllers/addressControllers';


const router = createRouter({ onError });

dbConnect();


router.get(getAddress);
router.put(updateAddress)


export default router.handler();