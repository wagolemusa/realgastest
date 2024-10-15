import Referral from "../model/referal";


export const getReferral = async(req, res) =>{

    const refer = await Referral.find();

    return res.status(201).json({

        refer
    })
}



// get Referral Code
export const getReferralById = async(req, res) =>{
    const refer = await Referral.findById(req.query.id);
    if(!refer){
        return res.status(401).json({
            message: "Referral not fund"
        })
    }
    return res.status(201).json({
        refer
    })
}



// update Referral points
export const updateReferral = async(req, res, next) => {
    let refer = await Referral.findById(req.query.id);

    if(!refer){
        res.status(404).json({
            error: "Referral not found"
        })
    }
    refer = await Referral.findByIdAndUpdate(req.query.id, req.body)
    res.status(200).json({
        refer,
    })
};
