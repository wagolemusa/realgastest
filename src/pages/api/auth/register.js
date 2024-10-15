import { createRouter } from 'next-connect';
import dbConnect from "../../../backend/config/dbConnect";
import { registerUser } from "../../../backend/controllers/authControllers"
import onError from "../../../backend/middlewares/errors"
// /backend/controllers/productController";


const router = createRouter({ 
    onError,
 });

dbConnect();

router.post(registerUser);

export default router.handler();