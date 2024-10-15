import Sell from '../model/sell';

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