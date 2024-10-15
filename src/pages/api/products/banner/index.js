import { createRouter } from 'next-connect';
import dbConnect from "../../../../backend/config/dbConnect";
import { querybanners } from "../../../../backend/controllers/productController"
// /backend/controllers/productController";
import onError from "../../../../backend/middlewares/errors"

const router = createRouter( { onError });

dbConnect();

router.get(querybanners);

export default router.handler();