import Sell from '../model/sell';
import { startOfDay, endOfDay } from 'date-fns';
import Sockcylinder from '../model/sockcylinder';
import Updateseal from '../model/updateseal';
import APIFilters from "../utils/APIFilters"
import Retail from '../model/retail';

// create sell gas
export const newSell = async(req, res) => {

    try{
        const {
            branch,
            cylinderSize,
            cylinderType,
            category,
            amount,
            numberOfDays,
            paidamount,
            balance,
            paymantstatus,
            paymentmethod,
            datedata,
            time,
            customerName,
            phone,
            condition,
            sealTaken,
            sealReplaced,
        } = req.body;
        
            let seal = await Sell.findOne({ sealTaken: sealTaken }).select("sealTaken")

            console.log("sealToken", seal)
            
            let sealed = new Sell({
               branch,
               cylinderSize,
               cylinderType,
               category,
               amount,
               numberOfDays,
               paidamount,
               balance,
               paymantstatus,
               paymentmethod,
               datedata,
               time,
               customerName,
               phone,
               condition,
               sealTaken,
               sealReplaced
            })
            await sealed.save()
            
            let takenSeal = await Sockcylinder.findOne().select("sealnumber");
            console.log("takenSeal", takenSeal);

            if (seal?.sealTaken === takenSeal?.sealnumber) {
                // Seal taken, update stock as "Out-of-stock"
                let stockCylinder = new Updateseal({
                    cylinderSize,
                    cylinderType,
                    branch,
                    condition,
                    customerName,
                    phone,
                    sealnumber: sealTaken,
                    statusStock: "Out-of-stock",
                });
                await stockCylinder.save();
            
            } else if (sealReplaced === takenSeal?.sealnumber) {
                // Seal replaced, stock is back
                let stockCylinder = new Updateseal({
                    cylinderSize,
                    cylinderType,
                    branch,
                    condition,
                    customerName,
                    phone,
                    sealnumber: sealReplaced,
                    statusStock: "Back"
                });
                await stockCylinder.save();
            }
            return res.status(201).json({
                sealed
            })

    } catch(error){
        console.log(error)
    }
}

// Query Sales Data
export const getSell = async(req, res)=>{
    const sell = await Retail.find().sort({ createdAt: -1 });
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
  

// Weekluy Chats 
export const getCountSalesAndSumRevenueWeekly = async (req, res) => {
    try {
      const { startDate, endDate } = req.query; // Get dates from query params
  
      if (!startDate || !endDate) {
        return res.status(400).json({ error: "Please provide both startDate and endDate." });
      }
  
      const start = new Date(startDate);
      const end = new Date(endDate);
  
      // Perform aggregation to calculate total revenue and count orders by date
      const summary = await Retail.aggregate([
        {
          $match: {
            createdAt: { $gte: start, $lte: end }, // Filter by date range
          },
        },
        {
          $group: {
            _id: { $dateToString: { format: "%Y-%m-%d", date: "$createdAt" } }, // Group by date
            dailyRevenue: { $sum: "$price" }, // Sum the revenue for the day
            dailyOrders: { $sum: 1 }, // Count the orders for the day
          },
        },
        {
          $sort: { _id: 1 }, // Sort by date ascending
        },
      ]);
  
      // Extract the data into arrays for the response
      const dates = summary.map((item) => item._id); // Extract dates
      const revenue = summary.map((item) => item.dailyRevenue); // Extract daily revenue
      const orders = summary.map((item) => item.dailyOrders); // Extract daily orders
  
      // Calculate totals
      const totalRevenue = revenue.reduce((acc, val) => acc + val, 0);
      const totalOrders = orders.reduce((acc, val) => acc + val, 0);
  
      // Return the response
      res.status(200).json({
        ordersCount: totalOrders,
        totalRevenue,
        dates,
        revenue,
        orders,
      });
    } catch (err) {
      console.error("Error fetching orders:", err);
      res.status(500).json({ error: "Internal Server Error" });
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
        createdAt: {
           $gte: startOfToday, $lte: endOfToday },
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
  

// // get Sales by ID
// export const getsalesById = async(req, res) =>{
//     const sell = await Sell.findById(req.query.id);
//     console.log(sell)
//     if(!sell){
//         return res.status(401).json({
//             message: "sales not fund"
//         })
//     }
//     return res.status(201).json({
//         sell
//     })
// }



// get Sales by ID
export const getsalesById = async(req, res) => {
  try {
      const sell = await Sell.findById(req.params.id); // Changed from req.query.id
      if(!sell){
          return res.status(404).json({ // Changed from 401 to 404
              message: "Sales not found" // Fixed typo
          });
      }
      return res.status(200).json({ // Changed from 201 to 200 (201 is for creation)
          sell
      });
  } catch (error) {
      return res.status(500).json({
          message: "Internal server error",
          error: error.message
      });
  }
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


// // Search by Date, Branch, Sum Price, and Count Documents
// export const getInStockProductsByDateAndBranch = async (req, res) => {
//   try {
//     const resPerPage = parseInt(req.query.resPerPage, 10) || 100; // Pagination size, default to 100
//     const { createdAt, branch } = req.body; // Extract data from req.body

//     console.log('Request Body:', req.body);

//     // Validate and parse the provided date
//     if (!createdAt) {
//       return res.status(400).json({ error: 'Date query parameter is required' });
//     }
//     const queryDate = new Date(createdAt);
//     if (isNaN(queryDate)) {
//       return res.status(400).json({ error: 'Invalid date format' });
//     }

//     // Validate the branch input
//     if (!branch) {
//       return res.status(400).json({ error: 'Branch query parameter is required' });
//     }

//     // Get start and end of the provided date
//     const startOfQueryDate = startOfDay(queryDate);
//     const endOfQueryDate = endOfDay(queryDate);

//     // Perform aggregation to count documents and sum the price
//     const aggregationResults = await Retail.aggregate([
//       {
//         $match: {
//           createdAt: { $gte: startOfQueryDate, $lte: endOfQueryDate },
//           branch: branch,
//         },
//       },
//       {
//         $group: {
//           _id: null, // Group all matching documents together
//           totalPrice: { $sum: '$price' }, // Sum the price field
//           productsCount: { $sum: 1 }, // Count the documents
//         },
//       },
//     ]);

//     // Set default values if no results are found
//     const { totalPrice = 0, productsCount = 0 } = aggregationResults[0] || {};

//     // Apply filters for pagination and get the matching products
//     const products = await Retail.find({
//       createdAt: { $gte: startOfQueryDate, $lte: endOfQueryDate },
//       branch: branch,
//     })
//       .limit(resPerPage)
//       .skip(resPerPage * ((req.query.page || 1) - 1))
//       .sort({ createdAt: -1 });

//     // Return the response
//     res.status(200).json({
//       success: true,
//       productsCount,
//       totalPrice,
//       resPerPage,
//       products,
//     });
//   } catch (err) {
//     console.error('Error fetching products:', err);
//     res.status(500).json({ error: err.message || 'Internal Server Error' });
//   }
// };


export const getInStockProductsByDateAndBranch = async (req, res) => {
  try {
    const resPerPage = parseInt(req.query.resPerPage, 10) || 100;
    const { createdAt, branch } = req.body;

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
    if (branch) {
      query.branch = branch;
    }

    // If neither date nor branch is provided, return an error
    if (!createdAt && !branch) {
      return res.status(400).json({ error: 'At least one of Date or Branch is required' });
    }

    // Perform aggregation to count documents and sum the price
    const aggregationResults = await Retail.aggregate([
      { $match: query },
      {
        $group: {
          _id: null,
          totalPrice: { $sum: '$price' },
          productsCount: { $sum: 1 },
        },
      },
    ]);

    const { totalPrice = 0, productsCount = 0 } = aggregationResults[0] || {};

    // Apply filters for pagination and get the matching products
    const sell = await Retail.find(query)
      .limit(resPerPage)
      .skip(resPerPage * ((req.query.page || 1) - 1))
      .sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      productsCount,
      totalPrice,
      resPerPage,
      sell,
    });
  } catch (err) {
    console.error('Error fetching products:', err);
    res.status(500).json({ error: err.message || 'Internal Server Error' });
  }
};

