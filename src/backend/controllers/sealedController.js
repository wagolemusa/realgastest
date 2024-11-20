import Stockcylinder from "../model/sockcylinder";

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


// Query Gas bought
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

