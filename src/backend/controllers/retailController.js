import Retail from '../model/retail';
import { startOfDay, endOfDay } from 'date-fns';
import Stockcylinder from '../model/sockcylinder'
import Updateseal from '../model/updateseal';
import APIFilters from "../utils/APIFilters"


// create sell gas
export const newRetail = async(req, res) => {

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
          branch
      } = req.body;
      
      let seal = await Retail.findOne({ sealtaken: sealtaken }).select("sealtaken");
      console.log("sealToken", seal);
      
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
          branch
      });
      await retailed.save();
      
      let takenSeal = await Stockcylinder.findOne({sealnumber: sealtaken }).select("sealnumber statusStock");  // Fetch sealnumber and statusStock
      console.log("takenSeal", takenSeal);

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
      if (sealreplaced === takenSeal?.sealnumber && takenSeal?.statusStock === "out-of-stock") {
          await Stockcylinder.findOneAndUpdate(
              { sealnumber: sealtaken, statusStock: "out-of-stock" },
              { $set: { statusStock: "back-instock" } }
          );
          console.log(`Seal ${sealreplaced} status updated to back-instock.`);
      }

      // Save if seal number Replaced is not equal to sealnumber
      if (sealreplaced !== takenSeal?.sealnumber) {
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
      
      return res.status(201).json({
          seal
      });

  } catch (error) {
      console.log(error);
      return res.status(500).json({ message: "An error occurred while processing the sale." });
  }
}


// Query Sales Data
export const getSell = async(req, res)=>{
    const sell = await Sell.find();
    return res.status(200).json({
        sell
    })
}


//  count today's Sales
export const getCountSales = async(req, res) =>{
    const startOfToday = startOfDay(new Date());
    const endOfToday = endOfDay(new Date());

    const countSales = await Sell.countDocuments({
        createdAt: { $gte: startOfToday, $lte: endOfToday }
    })
    res.status(200).json({
      countSales
    })
  }
  


// Get-Count-Orders-and-Sum Revenue
export const getCountSalesAndSumRevenue = async (req, res) => {
    try {
      const resPerPage = 100;
      // Get today's date range using date-fns
      const startOfToday = startOfDay(new Date());
      const endOfToday = endOfDay(new Date());
  
      // Perform aggregation to calculate total revenue and count orders
      const summary = await Sell.aggregate([
        {
          $match: {
            createdAt: { $gte: startOfToday, $lte: endOfToday }
          },
        },
        {
          $group: {
            _id: null, // Group all matching documents
            totalRevenue: { $sum: '$amount' }, // Sum the totalPrice field
            totalOrders: { $sum: 1 }, // Count the number of orders
          },
        },
      ]);
      // Debugging logs
      console.log('Summary:', summary);
      // Extract revenue and orders count from aggregation result
      const totalRevenue = summary.length > 0 ? summary[0].totalRevenue : 0;
      const totalOrders = summary.length > 0 ? summary[0].totalOrders : 0;
  
      // Fetch paginated orders for detailed view
      const apiFilters = new APIFilters(Sell.find({
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
  


// Sum all today's sales
export const getsumTodaySalesOnShop = async (req, res) => {
    try {
      // const now = new Date();
  
      // Get the start and end of the day
      const startOfToday = startOfDay(new Date());
      const endOfToday = endOfDay(new Date());
  
      // Query for today's transactions
      const todaySales = await Sell.find({
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
  

// get Sales by ID
export const getsalesById = async(req, res) =>{
    const sell = await Sell.findById(req.query.id);
    if(!sell){
        return res.status(401).json({
            message: "sales not fund"
        })
    }
    return res.status(201).json({
        sell
    })
}


// update Sales
export const updateSell = async(req, res, next) => {
    let sell = await Sell.findById(req.query.id);

    if(!sell){
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
export const deleteSell = async(req, res, next) => {
    let sell = await Sell.findById(req.query.id);

    if(!sell){
        res.status(404).json({
            error: "Product not found"
        })
    }  

    await sell.deleteOne();
    res.status(200).json({
        success: true,
    })
};