import Resaler from "../model/resalers";
import crypto from 'crypto';


export const NewResaler = async (req, res) => {
    try{

        const { businessname,phone, whatsup,  district, town, price } = req.body;
        
        const code = crypto.randomInt(10000000,99999999)

        let resaler = new Resaler({
            businessname,
            phone,
            whatsup,
            district,
            town,
            price,
            code
        })
        await resaler.save()
        return res.status(200).json({
            success: true,
            message: "Point of sale was saved"
        })

    }catch(error){
        console.log(error)
    }
}

export const getResaler = async(req, res) => {
    const pointsofsales = await Resaler.find();
    return res.status(200).json({
        pointsofsales
    })
}
