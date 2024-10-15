// import Gasbought from "../model/gasbought";

import Gasbought from '../model/gasbought'

export const newGassBought = async(req, res, next) => {
    try{
        // const { brand, date, distributor, cyliders, finaltotal} = req.body
        let gas  = new Gasbought({
            ...req.body
        })
        await gas.save();
        return res.status(201).json({
            gas
        });
    }catch(error){
        console.log(error)
    }    
};


// Query Gas bought
export const getGasBought = async(req, res) => {
    const gasbought = await Gasbought.find();
    if(!gasbought){
        return res.status(400).json({
            message: "There is No Gas Records"
        })
    }
    return res.status(201).json({
        gasbought
    })
}


// Delete Company data
export const deleteBought = async(req, res, next) => {
    let gasbought = await Gasbought.findById(req.query.id);
    if(!gasbought){
        res.status(404).json({
            error: "Product not found"
        })
    }  
    await gasbought.deleteOne();
    res.status(200).json({
        success: true,
    })
};


