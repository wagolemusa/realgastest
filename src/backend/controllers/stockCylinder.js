import CylinderStock from "../model/cylinderStock";
import { endOfDay, startOfDay } from 'date-fns';

export const newStockCylinder = async(req, res, next) => {
    try{
        // const { brand, date, distributor, cyliders, finaltotal} = req.body
        let gas  = new CylinderStock({
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


// Query stocked cylinders
export const getSockedCylinder = async(req, res) => {
    const cylinder = await CylinderStock.find();
    if(!cylinder){
        return res.status(400).json({
            message: "There is No Gas Records"
        })
    }
    return res.status(201).json({
        cylinder
    })
}


// Delete Company data
export const deleteSockedCylinder = async(req, res, next) => {
    let cylinder = await CylinderStock.findById(req.query.id);
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


// Search Stocked Cylinders 
export const getStockedCylindersDateAndBranch = async (req, res) => {
    try {
        const resPerPage = parseInt(req.query.resPerPage, 10) || 100;
        const { createdAt, branchname } = req.body;

        console.log('Search Parameters:', { createdAt, branchname });

        // Initialize query object
        let query = {};

        // Handle date filtering if provided
        if (createdAt) {
            const queryDate = new Date(createdAt);
            if (isNaN(queryDate.getTime())) {
                return res.status(400).json({ 
                    success: false,
                    error: 'Invalid date format. Please use YYYY-MM-DD format' 
                });
            }
            query.createdAt = { 
                $gte: startOfDay(queryDate), 
                $lte: endOfDay(queryDate) 
            };
        }

        // Handle branch filtering if provided
        if (branchname) {
            query.branchname = { $regex: branchname, $options: 'i' }; // Case-insensitive search
        }

        // Count total matching documents for pagination
        const totalCount = await CylinderStock.countDocuments(query);

        // Find cylinders with pagination
        const cylinder = await CylinderStock.find(query)
            .limit(resPerPage)
            .skip(resPerPage * ((req.query.page || 1) - 1))
            .sort({ createdAt: -1 });

        if (cylinder.length === 0) {
            return res.status(200).json({
                success: true,
                message: 'No cylinders found matching your criteria',
                resPerPage,
                totalCount: 0,
                cylinder: []
            });
        }

        res.status(200).json({
            success: true,
            resPerPage,
            totalCount,
            cylinder,
            currentPage: parseInt(req.query.page || 1, 10)
        });

    } catch (err) {
        console.error('Error fetching cylinders:', err);
        res.status(500).json({ 
            success: false,
            error: err.message || 'Internal Server Error' 
        });
    }
};