import Updatedseal from "../model/updateseal";

export const newupdatedSeal = async(req, res, next) => {
    try{
        // const { brand, date, distributor, cyliders, finaltotal} = req.body
        let updatedseals  = new Updatedseal({
            ...req.body
        })
        await updatedseals.save()
        return res.status(201).json({
            updatedseals
        });
    }catch(error){
        console.log(error)
    }    
};


// Query sealed cylinders
export const getupdatedSeal = async(req, res) => {
    const updatedseals = await Updatedseal.find();
    if(!updatedseals){
        return res.status(400).json({
            message: "There is No Gas Records"
        })
    }
    return res.status(201).json({
        updatedseals
    })
}
