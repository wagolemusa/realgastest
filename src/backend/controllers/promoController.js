import Promocode from "../model/promocode";
import { v4 as uuidv4 } from 'uuid';
import moment from "moment";

// Create promo code for discount
export const newPromocode = async(req, res)=> {
    try{
        const { amount } = req.body;

        const discountCode = uuidv4().substr(0, 8); // Generate a random code
        const expiration = moment().add(2, 'days').toDate(); // Calculate expiration date
            
        let promo = new Promocode({
            amount,
            code: discountCode,
            expirationDate:expiration
        }) 
        await promo.save()
        return res.status(201).json({
            promo
        })

    }catch(error){
        console.log(error)
    }
}


// check if the is expired or not
export const checkCode = async(req, res) => {
    try{
        const { code } = req.body;
        let discount = await Promocode.findOne({ code: code })

        if(!discount){
            return res.status(400).json({
                message: "Promo Code not found"
            })
        }
        const currentDate = new Date();
        if(currentDate > discount.expirationDate) {
            return res.status(400).json({
                success: false,
                message: "Promo Code is expired"
            })
        }
        return res.status(400).json({
            success: true,
            message: "Promo Code is Still working"
        })

    }catch(error){
        console.log(error)
    }
}




// query Code promo Code
export const getPromoCode = async(req, res) =>{
    const promo = await Promocode.find();
    return res.status(201).json({
        promo
    })

}


// Search by promo Code..................
export const getSearchCode = async (req, res) => {
    try {
      const { code } = req.body;
  
      console.log('Request Body:', req.body);
  
      // Initialize query object
      let query = {};

      // Validate and add branch if provided
      if (code) {
        query.code = code;
      }
      const promo = await Promocode.find(query)
 
      res.status(200).json({
        success: true,
        promo,
      });
    } catch (err) {
      console.error('Error fetching products:', err);
      res.status(500).json({ error: err.message || 'Internal Server Error' });
    }
  };
  