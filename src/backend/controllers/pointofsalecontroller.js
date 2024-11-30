import Pointofsale from "../model/pointofsale";

export const Newpointofsale = async(req, res) =>{

    try{
        let pointofsale = new Pointofsale({
            ...req.body
        })
        await pointofsale.save();
        return res.status(201).json({
            pointofsale
        })
    }catch(error){
        console.log(error)
    }
}


// Query Gas bought
export const getPointofsale = async(req, res) => {
    const pointsale = await Pointofsale.find();
    if(!pointsale){
        return res.status(400).json({
            message: "There is No Gas Records"
        })
    }
    return res.status(201).json({
        pointsale
    })
}



