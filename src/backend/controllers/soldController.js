import Soldaccessories from "../model/soldaccessory";
import Invetoryaccessory from "../model/invetoryaccessory";
import { startOfDay, endOfDay } from 'date-fns';

export const newSoldAccessory = async(req, res) => {
    try{
        const { nameaccessory, quantity, amount, date} = req.body;
        let initQnt = await Invetoryaccessory.findOne({ nameaccessory: nameaccessory }).select("stock_quantity").sort({ _id: -1});

        let soldacce = new Soldaccessories({

            nameaccessory,
            amount,
            quantity,
            date
        })
        await soldacce.save()
        let quant = Number(initQnt.stock_quantity) - Number(quantity)
        await Invetoryaccessory.findOneAndUpdate(
            { nameaccessory: nameaccessory, stock: "Instock" },
            { $set: {  stock_quantity:  quant } }, // Update operation
            { sort: { _id: -1 },  } // Sort by _id in descending order and return the updated document
        );

    }catch(error){
        console.log(error)
       
    }
}


// Query Solod Accessories
export const getSoldAccessory = async(req, res) => {
    const sold = await Soldaccessories.find();
    return res.status(200).json({
        sold
    })

}


// Search by Date and  productName 
export const getSoldInvetorySearch = async (req, res) => {
  try {
    const resPerPage = parseInt(req.query.resPerPage, 10) || 100;
    const { createdAt, nameaccessory } = req.body;

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
    if (nameaccessory) {
      query.nameaccessory = nameaccessory;
    }

    // If neither date nor branch is provided, return an error
    if (!createdAt && !nameaccessory) {
      return res.status(400).json({ error: 'At least one of Date or Branch is required' });
    }

    // Perform aggregation to count documents and sum the price
    const aggregationResults = await Soldaccessories.aggregate([
      { $match: query },
      {
        $group: {
          _id: null,
          totalPrice: { $sum: '$amount' },
          productsCount: { $sum: 1 },
        },
      },
    ]);

    const { totalPrice = 0, productsCount = 0 } = aggregationResults[0] || {};

    // Apply filters for pagination and get the matching products
    const sold = await Soldaccessories.find(query)
      .limit(resPerPage)
      .skip(resPerPage * ((req.query.page || 1) - 1))
      .sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      productsCount,
      totalPrice,
      resPerPage,
      sold,
    });
  } catch (err) {
    console.error('Error fetching products:', err);
    res.status(500).json({ error: err.message || 'Internal Server Error' });
  }
};

