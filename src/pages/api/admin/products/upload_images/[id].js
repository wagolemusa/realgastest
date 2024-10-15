import { createRouter } from 'next-connect';
import dbConnect from "../../../../../backend/config/dbConnect";
import onError from "../../../../../backend/middlewares/errors"
import { updateProfile } from '../../../../../backend/controllers/authControllers';
import upload from '../../../../../backend/utils/multer';
// import { isAuthenticatedUser } from '../../../../../backend/middlewares/auth';
import { uploadProductImages } from '../../../../../backend/controllers/productController';
// /backend/controllers/productController";


const router = createRouter({ 
    onError,
 });

dbConnect();

export const config = {
    api: {
        bodyParser: false
    },
};


const uploadMeddleware = upload.array("image")

router.use( uploadMeddleware).post(uploadProductImages)

export default router.handler();