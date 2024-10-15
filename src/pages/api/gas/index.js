import { createRouter } from 'next-connect';
import dbConnect from "../../../backend/config/dbConnect";
import onError from "../../../backend/middlewares/errors"
import { query6kgs, query12kgs } from '../../../backend/controllers/productController';

const router = createRouter( { onError });

dbConnect();

router.get(query6kgs);
router.get(query12kgs)


export default router.handler();