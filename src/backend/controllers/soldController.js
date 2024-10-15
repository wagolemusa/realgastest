import Soldaccessories from "../model/soldaccessory";
import Invetoryaccessory from "../model/invetoryaccessory";

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