import Shop from "../model/shop";

export const newShop = async(req, res) => {
    try{

        let shopkeeper  = new Shop({
            ...req.body
        })
  
        await shopkeeper.save();
        return res.status(201).json({
            shopkeeper
        });
    }catch(error){
        console.log(error)
    }    
};


