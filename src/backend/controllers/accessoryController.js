import Accessories from "../model/accessories";

// create accessories
export const newAccessory = async(req, res) => {

    try{

        let accessories  = new Accessories({
            ...req.body
        })

        await accessories.save()
        return res.status(201).json({
            accessories
        });
    }catch(error){
        console.log(error)
    }    
};



// Query accessories
export const getAccessory = async(req, res) => {
    const accessories = await Accessories.find()
    return res.status(200).json({
        accessories
    })
}


// Delete data associated with the accessories
export const deleteAccessory = async(req, res, next) => {
    let accessories = await Accessories.findById(req.query.id);

    if(!accessories){
        res.status(404).json({
            error: "Accessories not found"
        })
    }  

    await accessories.deleteOne();
    res.status(200).json({
        success: true,
    })
};



