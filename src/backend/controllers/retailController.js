import Retail from '../model/retail';
import { startOfDay, endOfDay } from 'date-fns';
import Stockcylinder from '../model/sockcylinder'
import Updateseal from '../model/updateseal';
import Point from '../model/point';
import APIFilters from "../utils/APIFilters"
import phoneSms from '../../lib/sms';
import { startOfWeek, endOfWeek } from 'date-fns';

// create sell gas
export const newRetail = async (req, res) => {

  try {
    const {
      sealtaken,
      sealreplaced,  // Corrected to match destructuring
      cylinderType,
      cylinderSize,
      category,
      price,
      phone,
      customername,
      paymentmethod,
      condition,
      branch,
    } = req.body;

    let retailed = new Retail({
      sealtaken,
      sealreplaced,
      cylinderType,
      cylinderSize,
      category,
      price,
      phone,
      customername,
      paymentmethod,
      condition,
      branch,
      user: req.user.id,
    });

    console.log("seeee", retailed)
    await retailed.save();

    let seal = await Stockcylinder.findOne({ sealnumber: sealreplaced }).select("sealnumber  statusStock");
    console.log("sealToken vvvv", seal);

    let takenSeal = await Stockcylinder.findOne({ sealnumber: sealtaken }).select("sealnumber statusStock");  // Fetch sealnumber and statusStock
    console.log("takenSeal", takenSeal);

    // Query phone from points DB and compare
    let pointPhone = await Point.findOne({ phone });

    console.log("Phooone", pointPhone)

    // Ensure takenSeal is found before proceeding
    if (!takenSeal) {
      return res.status(404).json({ message: "Seal not found in stock." });
    }

    // If sealtaken is equal to takenSeal.sealnumber and the status is "instock", update it to "out-of-stock"
    if (sealtaken === takenSeal?.sealnumber && takenSeal?.statusStock === "instock") {
      await Stockcylinder.findOneAndUpdate(
        { sealnumber: sealtaken, statusStock: "instock" },
        { $set: { statusStock: "out-of-stock" } }
      );
      console.log(`Seal ${sealtaken} status updated to out-of-stock.`);
    }

    // If sealreplaced is equal to sealnumber in stock, update it back to "back-instock" if status is "out-of-stock"
    if (sealreplaced === seal?.sealnumber && seal?.statusStock === 'out-of-stock') {
      await Stockcylinder.findOneAndUpdate(
        { sealnumber: sealreplaced, statusStock: "out-of-stock" },
        { $set: { statusStock: "back-instock" } }
      );
      console.log(`Seal ${sealreplaced} status updated to back-instock.`);
    }

    // If sealtaken is equal to takenSeal.sealnumber and the status is "instock", update it to "out-of-stock"
    if (sealtaken === takenSeal?.sealnumber && takenSeal?.statusStock === "back-instock") {
      await Stockcylinder.findOneAndUpdate(
        { sealnumber: sealtaken, statusStock: "back-instock" },
        { $set: { statusStock: "out-of-stock" } }
      );
      console.log(`seal-back ${sealtaken} status updated to out-of-stock.`);
    }

    // Save if seal number Replaced is not equal to sealnumber
    if (!seal) {
      let stockCylinder = new Stockcylinder({
        cylinderSize,
        cylinderType,
        branch,
        condition,
        customerName: customername, // Fixed to match the variable name
        phone,
        sealnumber: sealreplaced, // Updated to sealreplaced
      });
      await stockCylinder.save();
    }

    // Additional logic to handle seal taken or replaced
    if (seal?.sealtaken === takenSeal?.sealnumber) {
      // Seal taken, update stock as "Out-of-stock"
      let stockCylinder = new Updateseal({
        cylinderSize,
        cylinderType,
        branch,
        condition,
        customerName: customername, // Fixed to match the variable name
        phone,
        sealnumber: sealtaken,  // Updated to match the variable
        statusStock: "Out-of-stock",
      });
      await stockCylinder.save();

    } else if (sealreplaced === takenSeal?.sealnumber) {
      // Seal replaced, stock is back
      let stockCylinder = new Updateseal({
        cylinderSize,
        cylinderType,
        branch,
        condition,
        customerName: customername, // Fixed to match the variable name
        phone,
        sealnumber: sealreplaced,  // Updated to sealreplaced
        statusStock: "Back-instock"
      });
      await stockCylinder.save();
    }

    if (pointPhone) {
      let incrementValue = 0;

      // Determine points increment based on cylinder size
      if (cylinderSize === "6") {
        incrementValue = 1000;
      } else if (["12", "12.5", "13"].includes(cylinderSize)) {
        incrementValue = 2000;
      }

      // Increment points if a matching cylinder size is found
      if (incrementValue > 0) {
        await Point.findByIdAndUpdate(
          pointPhone._id,
          { $inc: { points: incrementValue } }
        );
        console.log(`Points for phone ${phone} incremented by ${incrementValue}.`);
      }
    } else {
      let points = 0;

      // Determine initial points for a new record based on cylinder size
      if (cylinderSize === "6") {
        points = 1000;
      } else if (["12", "12.5", "13"].includes(cylinderSize)) {
        points = 2000;
      }

      // Create a new point record with calculated points
      if (points > 0) {
        await Point.create({
          customerName: customername,
          phone,
          cylinderSize,
          cylinderType,
          points
        });
        console.log(`New points record created for phone ${phone} with ${points} points.`);
      } else {
        console.log(`No points awarded for cylinder size: ${cylinderSize}.`);
      }
    }

    let getPoints = await Point.findOne({phone}).select("points")
    
    let to = "+" + 256 + phone;
    await phoneSms(to, `Thanks Customer For Promoting bestpricegas solution Now you have ${getPoints.points} Points`)

    return res.status(201).json({
      seal
    });

  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "An error occurred while processing the sale." });
  }
}


// query sales for specific shopkeeper
// export const getShopkeeperSales = async(req, res) =>{
//   try{
//     const retailer = await Retail.find({user: req.user.id});
//     return res.status(200).json({
//       retailer
//     })
//   } catch(err){
//     res.status(500).json({ error: 'Error creating address' });
//   }
// }



// Query Sales Data
export const getSell = async (req, res) => {
  const sell = await Sell.find();
  return res.status(200).json({
    sell
  })
}


//  count today's Sales
export const getCountSales = async (req, res) => {
  const startOfToday = startOfDay(new Date());
  const endOfToday = endOfDay(new Date());

  const countSales = await Sell.countDocuments({
    createdAt: { $gte: startOfToday, $lte: endOfToday }
  })
  res.status(200).json({
    countSales
  })
}



// Get-Count-Orders-and-Sum Revenue for a specific user
export const getShopkeeperSales = async (req, res) => {
  try {
    const resPerPage = 100; // This could be used for pagination if needed

    // Get today's date range using date-fns
    const startOfToday = startOfDay(new Date());
    const endOfToday = endOfDay(new Date());

    // Perform aggregation to calculate total revenue and count orders for a specific user
    const summary = await Retail.aggregate([
      {
        $match: {
          user: req.user.id, // Filter orders for the specific user
          createdAt: { $gte: startOfToday, $lte: endOfToday },
        },
      },
      {
        $group: {
          _id: null, // Group all matching documents
          totalRevenue: { $sum: '$price' }, // Sum the amount field
          totalOrders: { $sum: 1 }, // Count the number of orders
        },
      },
    ]);

    // Debugging logs
    console.log('Summary:', summary);

    // Extract revenue and orders count from aggregation result
    const totalRevenue = summary.length > 0 ? summary[0].totalRevenue : 0;
    const totalOrders = summary.length > 0 ? summary[0].totalOrders : 0;

    // Optionally, fetch the individual orders if needed
    const orders = await Retail.find({
      user: req.user.id, // Filter for the specific user
      createdAt: { $gte: startOfToday, $lte: endOfToday },
    })
      .populate('user')
      .sort({ createdAt: -1 });

    // Debugging logs
    console.log('Orders:', orders);

    // Return the response with total revenue, order count, and orders
    res.status(200).json({
      ordersCount: totalOrders,
      totalRevenue,
      orders, // Optionally include orders in the response
    });
  } catch (err) {
    console.error('Error fetching orders:', err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};


export const getsumTodaySalesRetail = async (req, res) => {
  try {
    // Get the start and end of the day
    const startOfToday = startOfDay(new Date());
    const endOfToday = endOfDay(new Date());

    // Query for today's transactions
    const todaySales = await Retail.find({
      user: req.user.id, // Filter by user
      createdAt: { $gte: startOfToday, $lte: endOfToday }, // Filter by today's date range
    }).select('price'); // Select only the price field

    // Calculate the total cash
    const totalCash = todaySales.reduce((sum, order) => sum + order.price, 0);

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


// get Sales by ID
export const getsalesById = async (req, res) => {
  const sell = await Sell.findById(req.query.id);
  if (!sell) {
    return res.status(401).json({
      message: "sales not fund"
    })
  }
  return res.status(201).json({
    sell
  })
}


// update Sales
export const updateSell = async (req, res, next) => {
  let sell = await Sell.findById(req.query.id);

  if (!sell) {
    res.status(404).json({
      error: "Sell not found"
    })
  }
  sell = await Sell.findByIdAndUpdate(req.query.id, req.body)
  res.status(200).json({
    sell
  })
};


// Delete Data associated with the Sales
export const deleteSell = async (req, res, next) => {
  let sell = await Sell.findById(req.query.id);

  if (!sell) {
    res.status(404).json({
      error: "Product not found"
    })
  }

  await sell.deleteOne();
  res.status(200).json({
    success: true,
  })
}; 


// query weekly data

export const getWeeklyOrdersGraphData = async (req, res) => {
  try {
    const startOfCurrentWeek = startOfWeek(new Date(), { weekStartsOn: 1 }); // Week starts on Monday
    const endOfCurrentWeek = endOfWeek(new Date(), { weekStartsOn: 1 }); // Week ends on Sunday

    const data = await Retail.aggregate([
      {
        $match: {
          createdAt: { $gte: startOfCurrentWeek, $lte: endOfCurrentWeek }
        },
      },
      {
        $group: {
          _id: { $dayOfWeek: '$createdAt' }, // Group by day of the week (1 = Sunday, 2 = Monday, ...)
          totalRevenue: { $sum: '$price' },
          totalOrders: { $sum: 1 },
        },
      },
      {
        $sort: { _id: 1 }, // Sort by day of the week
      },
    ]);

    // Map the MongoDB dayOfWeek to more readable day names
    const weekDays = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    const formattedData = data.map((item) => ({
      day: weekDays[item._id - 1],
      totalRevenue: item.totalRevenue,
      totalOrders: item.totalOrders,
    }));

    res.status(200).json(formattedData);
  } catch (err) {
    console.error('Error fetching weekly graph data:', err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};
