import getRawBody from "raw-body";
import Stripe from "stripe";
import Order from '../model/order'
import APIFilters from "../utils/APIFilters"
import ErrorHandler from "../utils/errorHandler";
import moment from 'moment'; // Import moment for date handling
const stripe = new Stripe(process.env.STRIPE_PRIVATE_KEY);
import { endOfDay, startOfDay } from 'date-fns';


  export const getOrders = async (req, res) => {
    const resPerPage = 100;
    const ordersCount = await Order.countDocuments();

    const apiFilters = new APIFilters(Order.find(), req.query).pagination(
      resPerPage
    );
  const orders = await apiFilters.query.find()
    .populate("shippingInfo user")
    .sort({createdAt: -1})

  res.status(200).json({
    ordersCount,
    resPerPage,
    orders,
  });
};


export const getOrdersPX = async (req, res) => {
  const resPerPage = 100;
  const ordersCount = await Order.countDocuments();

  const apiFilters = new APIFilters(Order.find(), req.query).pagination(
    resPerPage
  );
const orders = await apiFilters.query.find()
  .populate("shippingInfo user")
  .sort({createdAt: -1})

res.status(200).json({
  ordersCount,
  resPerPage,
  orders,
});
};



export const getOrdersSearch = async (req, res, next) => {
  try {
    const resPerPage = 100;
    const ordersCount = await Order.countDocuments();

    const apiFilters = new APIFilters(Order.find(), req.query).pagination(resPerPage);
    const orders = await apiFilters.query.find().sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      ordersCount,
      resPerPage,
      orders,
    });
  } catch (error) {
    console.error("Error fetching orders:", error);
    res.status(500).json({ success: false, error: "Server Error" });
  }
};


// export const getOrdersSearch = async (req, res) => {
//   const resPerPage = 100;
//   const ordersCount = await Order.countDocuments();
//   const apiFilters = new APIFilters(Order.find(), req.query).pagination(
//     resPerPage
//   );
// const orders = await apiFilters.query.find()
//   .sort({createdAt: -1})

// res.status(200).json({
//   ordersCount,
//   resPerPage,
//   orders,
// });
// };


//  query today's  shipped orders 
export const getOrdersToday = async (req, res) => {
  try {
    const resPerPage = 100;

    // Get today's date range using date-fns
    const startOfToday = startOfDay(new Date());
    const endOfToday = endOfDay(new Date());

    // Debugging logs
    console.log('Start of Today:', startOfToday);
    console.log('End of Today:', endOfToday);

    // Count documents with today's date and status 'Processing'
    const ordersCount = await Order.countDocuments({
      createdAt: { $gte: startOfToday, $lte: endOfToday },
      orderStatus: 'Shipped'
    });

    // Debugging logs
    console.log('Orders Count:', ordersCount);

    // Create the API filters with pagination
    const apiFilters = new APIFilters(Order.find({
      createdAt: { $gte: startOfToday, $lte: endOfToday },
      orderStatus: 'Shipped'
    }), req.query).pagination(resPerPage);

    // Execute the query with populated fields
    const orders = await apiFilters.query.find()
      .populate('shippingInfo user')
      .sort({ createdAt: -1 });

    // Debugging logs
    console.log('Orders:', orders);

    // Return the response
    res.status(200).json({
      ordersCount,
      resPerPage,
      orders,
    });
    
  } catch (err) {
    console.error('Error fetching orders:', err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};


//  count today's orders
export const getCountOrders = async(req, res) =>{
   // Get today's date range using date-fns
   const startOfToday = startOfDay(new Date());
   const endOfToday = endOfDay(new Date());
   const countOrders = await Order.countDocuments({
       createdAt: { $gte: startOfToday, $lte: endOfToday }
   })

  console.log("CCCCCCC", countOrders)
  res.status(200).json({
    countOrders
  })
}



// Sum all today's sales
export const getsumTodaySales = async (req, res) => {
  try {

    // Get the start and end of the day
     const startOfToday = startOfDay(new Date());
    const endOfToday = endOfDay(new Date());

    // Query for today's transactions
    const todaySales = await Order.find({
      createdAt: { $gte: startOfToday, $lte: endOfToday },
    }).select('amount'); // Select only the totalAmount field

    // Calculate the total cash
    const totalCash = todaySales.reduce((sum, order) => sum + order.amount, 0);

    console.log(`Total cash for today: ${totalCash}`);

    // Respond with the total
    res.status(200).json({
      totalCash,
    });
  } catch (err) {
    console.error('Error in getsumTodaySales:', err);
    res.status(500).json({ error: 'An error occurred while calculating total sales.' });
  }
};




// today proccing orders for today
export const getOrderProcessing = async (req, res) => {
  try {
    const resPerPage = 100;

    // Get today's date range using date-fns
    const startOfToday = startOfDay(new Date());
    const endOfToday = endOfDay(new Date());

    // Debugging logs
    console.log('Start of Today:', startOfToday);
    console.log('End of Today:', endOfToday);

    // Count documents with today's date and status 'Processing'
    const ordersCount = await Order.countDocuments({
      createdAt: { $gte: startOfToday, $lte: endOfToday },
      orderStatus: 'Processing'
    });

    // Debugging logs
    console.log('Orders Count:', ordersCount);

    // Create the API filters with pagination
    const apiFilters = new APIFilters(Order.find({
      createdAt: { $gte: startOfToday, $lte: endOfToday },
      orderStatus: 'Processing'
    }), req.query).pagination(resPerPage);

    // Execute the query with populated fields
    const orders = await apiFilters.query.find()
      .populate('shippingInfo user')
      .sort({ createdAt: -1 });

    // Debugging logs
    console.log('Orders:', orders);

    // Return the response
    res.status(200).json({
      ordersCount,
      resPerPage,
      orders,
    });
    
  } catch (err) {
    console.error('Error fetching orders:', err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};


//  query all today's shipped  orders 
export const getOrderAllShipped = async (req, res) => {
  try {
    const resPerPage = 100;

    // Get today's date range using date-fns
    const startOfToday = startOfDay(new Date());
    const endOfToday = endOfDay(new Date());

    // Debugging logs
    console.log('Start of Today:', startOfToday);
    console.log('End of Today:', endOfToday);

    // Count documents with today's date and status 'Processing'
    const ordersCount = await Order.countDocuments({
      createdAt: { $gte: startOfToday, $lte: endOfToday },
      orderStatus: 'Shipped'
    });

    // Debugging logs
    console.log('Orders Count:', ordersCount);

    // Create the API filters with pagination
    const apiFilters = new APIFilters(Order.find({
      createdAt: { $gte: startOfToday, $lte: endOfToday },
      orderStatus: 'Shipped'
    }), req.query).pagination(resPerPage);

    // Execute the query with populated fields
    const orders = await apiFilters.query.find()
      .populate('shippingInfo user')
      .sort({ createdAt: -1 });

    // Debugging logs
    console.log('Orders:', orders);

    // Return the response
    res.status(200).json({
      ordersCount,
      resPerPage,
      orders,
    });
    
  } catch (err) {
    console.error('Error fetching orders:', err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};


//  query all  Processing  orders 
export const getOrderAllProcessing = async (req, res) => {
  try {
    const resPerPage = 100;

    // Count documents with today's date and status 'shipped'
    const ordersCount = await Order.countDocuments({
      orderStatus: 'Processing'
    });

    // Create the API filters with pagination
    const apiFilters = new APIFilters(Order.find({
      orderStatus: 'Processing'
    }), req.query).pagination(resPerPage);

    // Execute the query with populated fields
    const orders = await apiFilters.query.find()
      .populate('shippingInfo user')
      .sort({createdAt: -1});

    // Return the response
    res.status(200).json({
      ordersCount,
      resPerPage,
      orders,
    });
    
  } catch (err) {
    console.error('Error fetching orders:', err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};



//  query all shipped  orders 
export const getOrderAllShippedData = async (req, res) => {
  try {
    const resPerPage = 100;

    // Count documents with today's date and status 'shipped'
    const ordersCount = await Order.countDocuments({
      orderStatus: 'Shipped'
    });

    // Create the API filters with pagination
    const apiFilters = new APIFilters(Order.find({
      orderStatus: 'Shipped'
    }), req.query).pagination(resPerPage);

    // Execute the query with populated fields
    const orders = await apiFilters.query.find()
      .populate('shippingInfo user')
      .sort({createdAt: -1});

    // Return the response
    res.status(200).json({
      ordersCount,
      resPerPage,
      orders,
    });
    
  } catch (err) {
    console.error('Error fetching orders:', err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
}

export const getOrderByID = async (req, res, next) => {
  try {
    // Additional admin check (redundant but secure)
    if (req.user.role !== 'admin') {
      return next(new ErrorHandler('Unauthorized access', 403));
    }

    const order = await Order.findById(req.query.id)
      .populate('shippingInfo')
      .populate('user', 'name email phoneNo');

    if (!order) {
      return next(new ErrorHandler("Order not found", 404));
    }

    res.status(200).json({
      success: true,
      order
    });
  } catch (error) {
    next(error);
  }
};

// // Get orders by ID
// export const getOrderByID = async (req, res, next) => {
//   const order = await Order.findById(req.query.id)
//   // .populate(
//   //   "shippingInfo user"
//   // )
//   .populate({
//     path: "user",
//     select: 'street city state zipCode country phoneNo name',
//   });
//   if (!order) {
//     return next(new ErrorHandler("No Order found with this ID", 404));
//   }
//   res.status(200).json({
//     order,
//   });
// };

// export const getOrderByID = async (req, res, next) => {
//   try {
//     const order = await Order.findById(req.query.id)
//       .populate({
//         path: 'shippingInfo',
//         select: 'street city state zipCode country phoneNo' // Explicitly select fields
//       })
//       .populate({
//         path: 'user',
//         model: 'User',
//         select: 'name email phoneNo' // only get these fields
//       });

//     if (!order) {
//       return next(new ErrorHandler("No Order found with this ID", 404));
//     }

//     console.log("Orrrrr", order)
//     res.status(200).json({
//       success: true,
//       order,
//     });
//   } catch (error) {
//     next(error);
//   }
// };



export const getUserOrders = async (req, res) => {
  try {
    // Ensure the user is authenticated
    console.log('Authenticated User:', req.user);
    if (!req.user || !req.user.id) {
      return res.status(401).json({ error: 'Unauthorized' });
    }

    // Find orders associated with the authenticated user
    const order = await Order.find({ user: req.user.id })
                              .sort({ createdAt: -1 })
                              .exec(); // Execute the query

    console.log("ordersxxx", order)
                              

    // Return the orders
    res.status(200).json({
      order // Renamed to 'orders' for clarity
    });
  } catch (err) {
    console.error('Error fetching orders:', err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};



// update user Order
export const updateOrder = async (req, res) => {
  let order = await Order.findById(req.query.id)

  if (!order) {
    return next(new ErrorHandler("No Order found with this ID", 404));
  }

  order = await Order.findByIdAndUpdate(req.query.id, {
    orderStatus: req.body.orderStatus
  })
  res.status(200).json({
    success: true,
    order,
  });
};


// Delete Order
export const deleteOrder = async (req, res) => {
  const order = await Order.findById(req.query.id)

  if (!order) {
    return next(new ErrorHandler("No Order found with this ID", 404));
  }
   await order.deleteOne();
  res.status(200).json({
    success: true
  });
};



export const myOrders = async (req, res, next) => {
  try {
        const orders = await Order.find({ user: req.user.id })
                                  .sort({ createdAt: -1 })
                                  .exec(); // Execute the query;

        console.log("ordersyes", orders)
        
        res.status(200).json({
          success: true,
          orders
        });
      } catch (error) {
        res.status(500).json({
          success: false,
          message: "Failed to fetch orders"
        });
      }
};


export const checkoutSession = async (req, res) => {
  const body = req.body;

  const line_items = body?.items?.map((item) => {
    return {
      price_data: {
        currency: "usd",
        product_data: {
          name: item.name,
          images: [item.image],
          metadata: { productId: item.product },
        },
        unit_amount: item.price * 100,
      },
    //   tax_rates: ["txr_1MUVJSAlHMiRMt8E2khIxJEi"],m 
      quantity: item.quantity,
    };
  });

  const shippingInfo = body?.shippingInfo;

  const session = await stripe.checkout.sessions.create({
    payment_method_types: ["card"],
    success_url: `${process.env.ENVIRONMENT_URL}/me/orders?order_success=true`,
    cancel_url: `${process.env.ENVIRONMENT_URL}`,
    customer_email: req?.user?.email,
    client_reference_id: req?.user?._id,
    mode: "payment",
    metadata: { shippingInfo },
    shipping_options: [
      {
        shipping_rate: "shr_1OL5hKDtSmo7ipf1JaKgrE7N",
      },
    ],
    line_items,
  });

  res.status(200).json({
    url: session.url,
  });
};



async function getCartItems(line_items) {
  return new Promise((resolve, reject) => {
    let cartItems = [];

    line_items?.data?.forEach(async (item) => {
      const product = await stripe.products.retrieve(item.price.product);
      const productId = product.metadata.productId;

      cartItems.push({
        product: productId,
        name: product.name,
        price: item.price.unit_amount_decimal / 100,
        quantity: item.quantity,
        image: product.images[0],
      });

      if (cartItems.length === line_items?.data.length) {
        resolve(cartItems);
      }
    });
  });
}



// Get-Count-Orders-and-Sum Revenue
export const getCountOrdersAndSum = async (req, res) => {
  try {
    const resPerPage = 100;

    // Get today's date range using date-fns
    const startOfToday = startOfDay(new Date());
    const endOfToday = endOfDay(new Date());

    // Debugging logs
    console.log('Start of Today:', startOfToday);
    console.log('End of Today:', endOfToday);

    // Perform aggregation to calculate total revenue and count orders
    const summary = await Order.aggregate([
      {
        $match: {
          createdAt: { $gte: startOfToday, $lte: endOfToday },
          orderStatus: 'Shipped',
        },
      },
      {
        $group: {
          _id: null, // Group all matching documents
          totalRevenue: { $sum: '$totalAmount' }, // Sum the totalPrice field
          totalOrders: { $sum: 1 }, // Count the number of orders
        },
      },
    ]);

    // Extract revenue and orders count from aggregation result
    const totalRevenue = summary.length > 0 ? summary[0].totalRevenue : 0;
    const totalOrders = summary.length > 0 ? summary[0].totalOrders : 0;

    // Fetch paginated orders for detailed view
    const apiFilters = new APIFilters(Order.find({
      createdAt: { $gte: startOfToday, $lte: endOfToday },
      orderStatus: 'Shipped',
    }), req.query).pagination(resPerPage);

    const orders = await apiFilters.query.find()
      .populate('shippingInfo user')
      .sort({ createdAt: -1 });

    // Debugging logs
    console.log('Orders:', orders);

    // Return the response
    res.status(200).json({
      ordersCount: totalOrders,
      totalRevenue,
    });
  } catch (err) {
    console.error('Error fetching orders:', err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};



export const webhook = async (req, res) => {
  try {
    const rawBody = await getRawBody(req);
    const signature = req.headers["stripe-signature"];

    const event = stripe.webhooks.constructEvent(
      rawBody,
      signature,
      // process.env.STRIPE_WEBHOOK_SECRET
    );

    if (event.type === "checkout.session.completed") {
      const session = event.data.object;

      const line_items = await stripe.checkout.sessions.listLineItems(
        event.data.object.id
      );

      const orderItems = await getCartItems(line_items);
      const userId = session.client_reference_id;
      const amountPaid = session.amount_total / 100;

      const paymentInfo = {
        id: session.payment_intent,
        status: session.payment_status,
        amountPaid,
        taxPaid: session.total_details.amount_tax / 100,
      };

      const orderData = {
        user: userId,
        shippingInfo: session.metadata.shippingInfo,
        paymentInfo,
        orderItems,
      };

      const order = await Order.create(orderData);
      res.status(201).json({ success: true });
    }
  } catch (error) {
    console.log(error);
  }
};




// Search for shipping and procecing
export const getSearchOrders = async (req, res) => {
  try {
    const resPerPage = parseInt(req.query.resPerPage, 10) || 100;
    const { createdAt, orderStatus } = req.body;

    console.log('Request Body:', req.body);

    // Initialize query object
    let query = {};

    // Validate and parse date if provided
    if (createdAt) {
      const queryDate = new Date(createdAt);
      if (isNaN(queryDate)) {
        return res.status(400).json({ error: 'Invalid date format' });
      }
      query.createdAt = { $gte: startOfDay(queryDate), $lte: endOfDay(queryDate) };
    }

    // Validate and add branch if provided
    if (orderStatus) {
      query.orderStatus = orderStatus;
    }

    // If neither date nor branch is provided, return an error
    if (!createdAt && !orderStatus) {
      return res.status(400).json({ error: 'At least one of Date or Branch is required' });
    }

    // Perform aggregation to count documents and sum the price
    const aggregationResults = await Order.aggregate([
      { $match: query },
      {
        $group: {
          _id: null,
          totalAmount: { $sum: '$price' },
          productsCount: { $sum: 1 },
        },
      },
    ]);

    const { totalAmount = 0, productsCount = 0 } = aggregationResults[0] || {};

    // Apply filters for pagination and get the matching products
    const orders = await Order.find(query)
      .limit(resPerPage)
      .skip(resPerPage * ((req.query.page || 1) - 1))
      .sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      productsCount,
      totalAmount,
      resPerPage,
      orders,
    });
  } catch (err) {
    console.error('Error fetching products:', err);
    res.status(500).json({ error: err.message || 'Internal Server Error' });
  }
};
