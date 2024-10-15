import { createRouter } from 'next-connect';
import dbConnect from "../../../backend/config/dbConnect";
import { getProducts, newProduct, querybanners, queryfullSet12kgs, queryGasCooker, querythreeProduct } from "../../../backend/controllers/productController"
// /backend/controllers/productController";
import onError from "../../../backend/middlewares/errors"

const router = createRouter( { onError });

dbConnect();

router.post(newProduct);
router.get(getProducts);
router.get(querythreeProduct);
router.get(querybanners);
router.get(queryGasCooker);
router.get(querybanners);


export default router.handler();