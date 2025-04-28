// import Customer from './src/backend/model/customer';

// import axios from 'axios';  // Ensure axios is imported if not already
// import cron from 'node-cron'; // Ensure node-cron is imported

// // Function to fetch customers and send messages when it's time
// async function sendMessages() {
//   try {
//     const customers = await Customer.find().select('numberOfDays phone');
    
//     // Use 'for...of' to handle asynchronous actions properly
//     for (const customer of customers) {

//       if (customer.numberOfDays <= 1) {
//         console.log(`Sending message to customer ${customer.phone}`);

//         // Define the message and the recipient's phone number
//         const message = "Hello customer, Your gas service is out of service.";
//         const to = "+" + 256 + customer.phone;

//         // Send the SMS via axios
//         try {
//           // Replace with the correct API endpoint for SMS sending
//           await axios.post('/api/sms', { to, message });
//           console.log(`Message sent to ${customer.phone}`);
//         } catch (smsError) {
//           console.error(`Error sending message to ${customer.phone}:`, smsError.message);
//         }
//       }
//     }

    
//   } catch (error) {
//     console.error("Error fetching customers:", error);
//   }
// }

// // Schedule the task to run every day at midnight (00:00)
// cron.schedule('0 0 * * *', sendMessages);

// // Optionally, you can also call sendMessages immediately when the app starts
// sendMessages();




// import Customer from './src/backend/model/customer';
// import axios from 'axios';
// import cron from 'node-cron';

// async function sendMessages() {
//   try {
//     const customers = await Customer.find().select('numberOfDays phone');
//     console.log("Fetched customers:", customers); // Debugging

//     for (const customer of customers) {
//       if (customer.numberOfDays <= 1) {
//         console.log(`Sending message to customer ${customer.phone}`);

//         const message = "Hello customer, Your gas service is out of service.";
//         const to = "+256" + customer.phone; // Ensure correct phone number format

//         try {
//           // Replace with the correct API endpoint for SMS sending
//           await axios.post('/api/sms', { to, message });
//           console.log(`Message sent to ${customer.phone}`);
//         } catch (smsError) {
//           console.error(`Error sending message to ${customer.phone}:`, smsError.message);
//           console.error("Full error:", smsError); // Log full error object
//         }
//       }
//     }
//   } catch (error) {
//     console.error("Error fetching customers:", error.message);
//     console.error("Full error:", error); // Log full error object
//   }
// }

// // Schedule the task to run every day at midnight (00:00)
// cron.schedule('0 0 * * *', sendMessages);

// // Optionally, call sendMessages immediately for testing
// // sendMessages();



// import Customer from './src/backend/model/customer';
// import axios from 'axios';
// import cron from 'node-cron';

// async function sendMessages() {
//   try {
//     // Fetch customers from the database
//     const customers = await Customer.find().select('numberOfDays phone');
//     console.log("Fetched customers:", customers); // Debugging

//     // For testing, you can use hardcoded data
//     // const customers = [
//     //   { phone: '712345678', numberOfDays: 0 },
//     //   { phone: '712345679', numberOfDays: 2 },
//     // ];
//     // console.log("Using hardcoded customers for testing:", customers);

//     for (const customer of customers) {
//       if (customer.numberOfDays <= 1) {
//         console.log(`Sending message to customer ${customer.phone}`);

//         const message = "Hello customer, Your gas service is out of service.";
//         const to = "+256" + customer.phone; // Ensure correct phone number format

//         try {
//           // Mock the SMS API for testing
//           console.log(`Mock SMS sent to ${to}: ${message}`);
//           // await axios.post('/api/sms', { to, message }); // Comment this out for testing
//         } catch (smsError) {
//           console.error(`Error sending message to ${to}:`, smsError.message);
//         }
//       }
//     }
//   } catch (error) {
//     console.error("Error fetching customers:", error.message);
//   }
// }

// // Schedule the task to run every minute for testing
// console.log("Cron job scheduled to run every minute.");
// cron.schedule('* * * * *', () => {
//   console.log("Cron job triggered at:", new Date().toISOString());
//   sendMessages();
// });

// // Optionally, call sendMessages immediately for testing
// // sendMessages();




require('dotenv').config(); // Load environment variables
import Customer from '../src/backend/model/customer';

// import Customer from '../../src/backend/model/customer';

import axios from 'axios';
import cron from 'node-cron';
import mongoose from 'mongoose';

// Connect to the database
mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log("Database connected"))
.catch((err) => console.error("Database connection error:", err));

async function sendMessages() {
  try {
    const customers = await Customer.find().select('numberOfDays phone');
    console.log("Fetched customers:", customers); // Debugging

    for (const customer of customers) {
      if (customer.numberOfDays <= 1) {
        console.log(`Sending message to customer ${customer.phone}`);

        const message = "Hello customer, Your gas service is out of service.";
        const to = "+256" + customer.phone; // Ensure correct phone number format

        try {
          // Mock the SMS API for testing
          console.log(`Mock SMS sent to ${to}: ${message}`);
          // await axios.post('/api/sms', { to, message }); // Comment this out for testing
        } catch (smsError) {
          console.error(`Error sending message to ${to}:`, smsError.message);
        }
      }
    }
  } catch (error) {
    console.error("Error fetching customers:", error.message);
  }
}

// Schedule the task to run every minute for testing
console.log("Cron job started at:", new Date().toISOString());
cron.schedule('* * * * *', () => {
  console.log("Cron job triggered at:", new Date().toISOString());
  sendMessages();
});

// Optionally, call sendMessages immediately for testing
// sendMessages();