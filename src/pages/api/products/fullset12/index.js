import { createRouter } from 'next-connect';
import dbConnect from "../../../../backend/config/dbConnect";
// /backend/controllers/productController";
import onError from "../../../../backend/middlewares/errors"
import { queryfullSet12kgs } from '../../../../backend/controllers/productController';

const router = createRouter( { onError });

dbConnect();


router.get(queryfullSet12kgs);


export default router.handler();