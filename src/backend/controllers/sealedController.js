import Stockcylinder from "../model/sockcylinder";
import APIFilters from "../utils/APIFilters";

export const newSealedCylinder = async(req, res, next) => {
    try{
        // const { brand, date, distributor, cyliders, finaltotal} = req.body
        let gas  = new Stockcylinder({
            ...req.body
        })
        await gas.save()
        return res.status(201).json({
            gas
        });
    }catch(error){
        console.log(error)
    }    
};


// Query sealed cylinders
export const getSealedCylinder = async(req, res) => {
    const cylinder = await Stockcylinder.find();
    if(!cylinder){
        return res.status(400).json({
            message: "There is No Gas Records"
        })
    }
    return res.status(201).json({
        cylinder
    })
}


// Query only sealed cylinders where sealnumber and status are "back-instock" and "instock"
export const getOnlySealnumber = async (req, res) => {
    try {
        // Querying for cylinders where status is either "back-instock" or "instock"
        const sealedNumbers = await Stockcylinder.find({
            statusStock: { $in: ["back-instock", "instock"] }
        }).select("sealnumber cylinderSize cylinderType branch"); // Ensure you are selecting the fields you need

        if (sealedNumbers.length === 0) {
            return res.status(404).json({
                message: "No data found"
            });
        }

        return res.status(200).json({
            sealedNumbers
        });

    } catch (error) {
        console.error("Error fetching sealed numbers:", error);
        return res.status(500).json({
            message: "Internal Server Error",
            error: error.message
        });
    }
}


// Delete Company data
export const deleteSealedCylinder = async(req, res, next) => {
    let cylinder = await Stockcylinder.findById(req.query.id);
    if(!cylinder){
        res.status(404).json({
            error: "Product not found"
        })
    }  
    await cylinder.deleteOne();
    res.status(200).json({
        success: true,
    })
};

export const getInStockProductsByDateAndStatus = async (req, res) => {
    try {
    //   const resPerPage = parseInt(req.query.resPerPage, 10) || 100; // Pagination size, default to 100
      const { statusStock } = req.query;

      console.log("DDDD",req.body)
  
      // Validate and parse the provided date
    //   if (!createdAt) {
    //     return res.status(400).json({ error: 'Date query parameter is required' });
    //   }
    //   const queryDate = new Date(date);
    //   if (isNaN(queryDate)) {
    //     return res.status(400).json({ error: 'Invalid date format' });
    //   }
  
      // Validate the status input
    //   if (!statusStock) {
    //     return res.status(400).json({ error: 'Status query parameter is required' });
    //   }
  
      // Get start and end of the provided date
    //   const startOfQueryDate = startOfDay(queryDate);
    //   const endOfQueryDate = endOfDay(queryDate);
  
      // Count documents with the specified date and status
    //   const productsCount = await Stockcylinder.countDocuments({
    //     // createdAt: { $gte: startOfQueryDate, $lte: endOfQueryDate },
    //     statusStock: statusStock, // Use the provided status
    //   });
  
      // Apply filters and execute the query
    //   const apiFilters = new APIFilters(
    //     Stockcylinder.find({
    //     //   createdAt: { $gte: startOfQueryDate, $lte: endOfQueryDate },
    //       statusStock: statusStock,
    //     }),
     
  
      const products = await Stockcylinder.find(statusStock)
  
      // Return the response
      res.status(200).json({
        // success: true,
        // productsCount,
        // resPerPage,
        products,
      });
    } catch (err) {
      console.error('Error fetching products:', err);
      res.status(500).json({ error: err.message || 'Internal Server Error' });
    }
  };
  