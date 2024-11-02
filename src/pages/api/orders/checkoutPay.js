
import  Order from '../../../backend/model/order'
import Referal from '../../../backend/model/referal';
import { getServerSession } from 'next-auth';
import { authOptions } from '../../../lib/authOptions';

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const session = await getServerSession(req, res, authOptions);

    if (!session) {
      return res.status(401).json({ message: 'Unauthorized' });
    }

    try {
      // Extract necessary data from the request body
      const { amount, totalAmount, user, orderItems, shippingInfo, referralcode, points } = req.body;

      // Create a new order
      const order = await Order.create({
        amount,
        totalAmount,
        user: session.user.id,
        orderItems,
        shippingInfo,
        referralcode,
        points,
        orderStatus: 'Processing',
      });

      let refCode = await Referal.findOne({referralcode});

      if(refCode){
        await Referal.findOneAndUpdate(
          { referralcode },
          { $inc: { points: 2000 } }
        )
        
      }else{
        await Referal.create({
          referralcode,
          points: 2000
        })
    
      }

      

      // Respond with success
      res.status(200).json({ message: 'Order created successfully', order });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Something went wrong' });
    }
  } else {
    res.status(405).json({ message: 'Method not allowed' });
  }
}
