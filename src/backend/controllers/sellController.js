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
      const summary = await Retail.aggregate([
        {
          $match: {
            createdAt: { $gte: startOfToday, $lte: endOfToday }
          },
        },
        {
          $group: {
            _id: null, // Group all matching documents
            totalRevenue: { $sum: '$price' }, // Sum the totalPrice field
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
      const apiFilters = new APIFilters(Retail.find({
        createdAt: { $gte: startOfToday, $lte: endOfToday }
      }), req.query).pagination(resPerPage);
  
      const orders = await apiFilters.query.find()
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