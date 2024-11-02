
import Order from '../model/order'
import APIFilters from "../utils/APIFilters"
import Referal from "../model/referal"



export const myOrders = async (req, res) => {
  const resPerPage = 2;
  const ordersCount = await Order.countDocuments();

  const apiFilters = new APIFilters(Order.find(), req.query).pagination(
    resPerPage
  );

  const orders = await apiFilters.query
    .find({ user: req.user._id })
    .populate("shippingInfo user");

  res.status(200).json({
    ordersCount,
    resPerPage,
    orders,
  });
};

export const getAdminOrders = async (req, res) => {
  const ordersCount = await Order.countDocuments();
  const apiFilters = new APIFilters(Order.find(), req.query).pagination(
    resPerPage,
  );

  const orders = await apiFilters.query
    .populate("shippingInfo user");

  res.status(200).json({
    ordersCount,
    resPerPage,
    orders,
  });
};


export const getOrder = async (req, res) => {
  const order = await Order.findById().populate(
    "shippingInfo user"
  );
  res.status(200).json({
    order,
  });
};


export const canReview = async (req, res) => {
  const productId = req.query.productId;

  const orders = await Order.find({
    user: req?.user?._id,
    "orderItems.product": productId,
  });

  let canReview = orders?.length >= 1 ? true : false;

  res.status(200).json({
    canReview,
  });
};



export const checkoutSession = async (req, res) => {
  const body = req.body;
  try {  
   const { tax, amount, totalAmount, referralcode, points} = req.body;

    const order = await Order.create({
      tax,
      amount,
      totalAmount,
      ...req.body,
    })

    let refCode = await Referal.findOne({referralcode});

    console.log("xxxxxxx", refCode)
   
    if(refCode){
      await Referal.findOneAndUpdate(
        { referralcode },
        { $inc: { points: 2000 } }
      )
      
    }else{
      await Referal.create({
        referralcode,
        points: 2000
      })
  
    }

    res.status(201).json({ 
        success: true,
        order
    });
    
  } catch (error) {
    console.log(error);
  }
};







