import CylinderStock from "../model/cylinderStock";

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
    const cylinder = await CylinderStock.find({sealnumber}).select("back-instock instock");
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

