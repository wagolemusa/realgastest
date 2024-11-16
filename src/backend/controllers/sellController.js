import Sell from '../model/sell';
import { startOfDay, endOfDay } from 'date-fns';

// create sell gas
export const newSell = async(req, res) => {
    const sell_gas = await Sell.create(req.body);
    res.status(201).json({
        sell_gas
    })
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