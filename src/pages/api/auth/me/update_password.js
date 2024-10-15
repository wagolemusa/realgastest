import { createRouter } from 'next-connect';
import dbConnect from "../../../../backend/config/dbConnect";
import onError from "../../../../backend/middlewares/errors"
import { updatePassword} from '../../../../backend/controllers/authControllers';
import { isAuthenticatedUser } from '../../../../backend/middlewares/auth';
// /backend/controllers/productController";


const router = createRouter({ 
    onError,
 });

dbConnect();


router.use(isAuthenticatedUser).put(updatePassword);

export default router.handler();