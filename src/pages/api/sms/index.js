// pages/api/send-sms.js

import Africastalking from 'africastalking';

// const credentials = {
//     apiKey: process.env.AFRICASTALKING_API_KEY,
//     username: process.env.AFRICASTALKING_USERNAME,
// };
const credentials = {
    apiKey: 'atsk_33da5082f5a46f33de2359045ff47cccce68db3d88141dea46ba25662821e49951d3675e',
    username: 'refuge',
};

const africastalking = Africastalking(credentials);
const sms = africastalking.SMS;

export default async function handler(req, res) {
    if (req.method === 'POST') {
        const { to, message } = req.body;
        
        const options = {
            to,
            message,
        };

        try {
            const response = await sms.send(options);
            return res.status(200).json(response);
        } catch (error) {
            console.error('Error sending SMS:', error.response ? error.response.data : error);
            return res.status(500).json({ error: 'Failed to send SMS', details: error.message });
        }
    } else {
        return res.status(405).json({ error: 'Method not allowed' });
    }
}
