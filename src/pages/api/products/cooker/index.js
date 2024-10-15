import { createRouter } from 'next-connect';
import dbConnect from "../../../../backend/config/dbConnect";
import {  queryGasCooker } from "../../../../backend/controllers/productController"
// /backend/controllers/productController";
import onError from "../../../../backend/middlewares/errors"

const router = createRouter( { onError });

dbConnect();


router.get(queryGasCooker);


export default router.handler();