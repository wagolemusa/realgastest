import Invetoryaccessory from "../model/invetoryaccessory";

export const newInventoryAccessory = async (req, res) => {
    try {
        const { nameaccessory, amount, added_stock } = req.body;

        let initQnt = await Invetoryaccessory.findOne({ nameaccessory: nameaccessory }).select("stock_quantity").sort({ _id: -1});

        let initial_quantity = 0;
        if (initQnt) {
            initial_quantity = initQnt.stock_quantity;
        }

        let stock_quantity = initial_quantity + Number(added_stock);

        let shopStock = new Invetoryaccessory({
            nameaccessory,
            amount,
            initial_quantity,
            added_stock,
            stock_quantity,
        });
            
        initQnt = await Invetoryaccessory.findOneAndUpdate(
            { nameaccessory: nameaccessory, stock: "Instock" },
            { $set: { stock: "Outstock" } }, // Update operation
            { sort: { _id: -1 },  } // Sort by _id in descending order and return the updated document
        );

        await shopStock.save();
        return res.status(201).json({
            success: true,
            message: "Stock Was created"
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            success: false,
            message: "Internal Server Error"
        });
    }
};


// Query Inventory data Out of stock
export const getInventoryOutOfStock = async(req, res) => {
    const inventory = await Invetoryaccessory.find({stock: "Outstock"});
    return res.status(200).json({
        inventory
    })

}

// Query Inventory data 
export const getInventoryInStock = async(req, res) => {
    const inventory = await Invetoryaccessory.find({stock: "Instock"});
    return res.status(200).json({
        inventory
    })

}


