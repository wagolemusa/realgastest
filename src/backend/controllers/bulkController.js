import Bulk from '../model/bulk';
import APIFilters from "../utils/APIFilters"
import { endOfDay, startOfDay } from 'date-fns';
export const newGasBulk = async(req, res, next) => {
    try{
        let bulkgas  = new Bulk({
            ...req.body
        })
        await bulkgas.save();
        return res.status(201).json({
            bulkgas
        });
    }catch(error){
        console.log(error)
    }    
};


// Query Gas bought
export const getBulkgas = async(req, res) => {
    const bulkgas = await Bulk.find();
    if(!bulkgas){
        return res.status(400).json({
            message: "There is No Gas Records"
        })
    }
    return res.status(201).json({
        bulkgas
    })
}


// get bulk Gas by ID
export const getBulkById = async(req, res) => {
    const bulk = await Bulk.findById(req.query.id);
    if(!bulk){
        return res.status(401).json({
            message: "No Data Find"
        })
    }
    return res.status(200).json({
        bulk
    })
}


// update Bulk
export const updateBulk = async(req, res) => {
    let bulk = await Bulk.findById(req.query.id);
    if(!bulk){
        res.status(401).json({
            message: "Data not find"
        })
    }
    bulk = await Bulk.findByIdAndUpdate(req.query.id, req.body)
    res.status(200).json({
        bulk
    })
}


// Get-Count-Orders-and-Sum Revenue
export const getCountBulkAndSumRevenue = async (req, res) => {
    try {
      const resPerPage = 100;
  
      // Get today's date range using date-fns
      const startOfToday = startOfDay(new Date());
      const endOfToday = endOfDay(new Date());
  
      // Perform aggregation to calculate total revenue and count orders
      const summary = await Bulk.aggregate([
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
  
      // Extract revenue and orders count from aggregation result
      const totalRevenue = summary.length > 0 ? summary[0].totalRevenue : 0;
      const totalOrders = summary.length > 0 ? summary[0].totalOrders : 0;
  
      // Fetch paginated orders for detailed view
      const apiFilters = new APIFilters(Bulk.find({
        createdAt: { $gte: startOfToday, $lte: endOfToday },
      }), req.query).pagination(resPerPage);
  

  
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
  



  export const getBulkSearchByDateAndResaler = async (req, res) => {
    try {
      const resPerPage = parseInt(req.query.resPerPage, 10) || 100;
      const { createdAt, resaler } = req.body;
  
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
      if (resaler) {
        query.resaler = resaler;
      }
  
      // If neither date nor branch is provided, return an error
      if (!createdAt && !resaler) {
        return res.status(400).json({ error: 'At least one of Date or Branch is required' });
      }
  
      const bulkgas = await Bulk.find(query)
        .limit(resPerPage)
        .skip(resPerPage * ((req.query.page || 1) - 1))
        .sort({ createdAt: -1 });
  
      res.status(200).json({
        success: true,
      //   productsCount,
      //   totalPrice,
        resPerPage,
        bulkgas,
      });

      console.log(bulkgas)
    } catch (err) {
      console.error('Error fetching products:', err);
      res.status(500).json({ error: err.message || 'Internal Server Error' });
    }
  };
  


