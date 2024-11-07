// const Customer = require('./models/Customer');

// import Customer from '../../backend/model/customer'
import Customer from "../../backend/model/customer";

import axios from 'axios';  // Ensure axios is imported if not already
import cron from 'node-cron'; // Ensure node-cron is imported

// Function to fetch customers and send messages when it's time
async function sendMessages() {
  try {
    const customers = await Customer.find().select('numberOfDays phone');
    
    // Use 'for...of' to handle asynchronous actions properly
    for (const customer of customers) {
      if (customer.numberOfDays <= 1) {
        console.log(`Sending message to customer ${customer.phone}`);

        // Define the message and the recipient's phone number
        const message = "Hello customer, Your gas service is out of service.";
        const to = "+" + 256 + customer.phone;

        // Send the SMS via axios
        try {
          // Replace with the correct API endpoint for SMS sending
          await axios.post('/api/sms', { to, message });
          console.log(`Message sent to ${customer.phone}`);
        } catch (smsError) {
          console.error(`Error sending message to ${customer.phone}:`, smsError.message);
        }
      }
    }
  } catch (error) {
    console.error("Error fetching customers:", error);
  }
}

// Schedule the task to run every day at midnight (00:00)
cron.schedule('0 0 * * *', sendMessages);

// Optionally, you can also call sendMessages immediately when the app starts
sendMessages();






// async function getCustomersAndCountDays() {
// const customers = await Customer.find().select("numberOfDays phone");

//   customers.forEach(customer => {
//     let count = 0;

//     setInterval(() => {
//       count++;

//       if (count === customer.numberOfDays - 1) {
//         console.log(`Sending message to customer ${customer.phone}`);
//         // Send message logic here...
//       }
//     }, 86400000); // 1 day in milliseconds
//   });
// }

// getCustomersAndCountDays();





// export default async function handler(req, res) {
//   if (req.method === 'GET') {
//     try {
//       // Fetch customers and select only 'numberOfDays' and 'phone'
//       const customers = await Customer.find().select('numberOfDays phone');

//       // Log the entire customers array to check its structure
//       console.log("Customers:", customers);

//       // Now customers is an array, so iterate through it to access each customer's properties
//       customers.forEach(customer => {
//         console.log("Number of Days:", customer.numberOfDays);
//         console.log("Phone:", customer.phone);
//       });

//       // Return the customers array in the response
//       return res.status(200).json({ customers });
//     } catch (error) {
//       console.error(error);
//       return res.status(500).json({ error: 'Failed to fetch customers' });
//     }
//   } else {
//     res.setHeader('Allow', ['GET']);
//     return res.status(405).json({ error: `Method ${req.method} not allowed` });
//   }
// }
