// const cron = require('node-cron');
// // const Customer = require('./src/backend/model/customer.js'); // Use require for other imports
// const axios = require('axios');
// const mongoose = require('mongoose');
// const dotenv = require('dotenv');

// // Load environment variables
// dotenv.config();




// console.log("MONGODB_URI:", process.env.DB_URL); // Debugging

// // Connect to the database
// mongoose.connect(process.env.DB_URL, {
//   useNewUrlParser: true,
//   useUnifiedTopology: true,
// })
// .then(() => console.log("Database connected"))
// .catch((err) => console.error("Database connection error:", err));

// function sendMessages() {
//   Customer.find().select('numberOfDays phone').exec((err, customers) => {
//     if (err) {
//       console.error("Error fetching customers:", err);
//       return;
//     }

//     customers.forEach((customer) => {
//       if (customer.numberOfDays <= 1) {
//         console.log(`Sending message to customer ${customer.phone}`);

//         const message = "Hello customer, Your gas service is out of service.";
//         const to = "+256" + customer.phone;

//         // Mock the SMS API for testing
//         console.log(`Mock SMS sent to ${to}: ${message}`);
//         // axios.post('/api/sms', { to, message }).then(() => {
//         //   console.log(`Message sent to ${customer.phone}`);
//         // }).catch((smsError) => {
//         //   console.error(`Error sending message to ${to}:`, smsError.message);
//         // });
//       }
//     });
//   });
// }

// // Schedule the task to run every minute for testing
// console.log("Cron job started at:", new Date().toISOString());
// cron.schedule('* * * * *', () => {
//   console.log("Cron job triggered at:", new Date().toISOString());
//   sendMessages();
// });

// Optionally, call sendMessages immediately for testing
// sendMessages();



// const cron = require('node-cron');
// const Customer = require('./src/backend/model/customer.js'); // Ensure this path is correct
// const axios = require('axios');
// const mongoose = require('mongoose');
// const dotenv = require('dotenv');
// // Load environment variables
// dotenv.config();

// console.log("MONGODB_URI:", process.env.DB_URL); // Debugging

// // Connect to the database
// mongoose.connect(process.env.DB_URL, {
//   useNewUrlParser: true,
//   useUnifiedTopology: true,
// })
// .then(() => {
//   console.log("Database connected");
//   // Start the cron job after the database is connected
//   cron.schedule('* * * * *', () => {
//     console.log("Cron job triggered at:", new Date().toISOString());
//     try {
//       sendMessages();
//     } catch (error) {
//       console.error("Error in cron job:", error);
//     }
//   });
// })
// .catch((err) => console.error("Database connection error:", err));

// function sendMessages() {
//   console.log("sendMessages() called"); // Debugging

//   Customer.find().select('numberOfDays phone').exec((err, customers) => {
//     if (err) {
//       console.error("Error fetching customers:", err);
//       return;
//     }

//     console.log("Fetched customers:", customers); // Debugging

//     customers.forEach((customer) => {
//       if (customer.numberOfDays <= 1) {
//         console.log(`Sending message to customer ${customer.phone}`);

//         const message = "Hello customer, Your gas service is out of service.";
//         const to = "+256" + customer.phone;

//         // Mock the SMS API for testing
//         console.log(`Mock SMS sent to ${to}: ${message}`);
//         // axios.post('/api/sms', { to, message }).then(() => {
//         //   console.log(`Message sent to ${customer.phone}`);
//         // }).catch((smsError) => {
//         //   console.error(`Error sending message to ${to}:`, smsError.message);
//         // });
//       }
//     });
//   });
// }




// const cron = require('node-cron');
// const Customer = require('./src/backend/model/customer.js'); // Ensure this path is correct
// const mongoose = require('mongoose');
// const dotenv = require('dotenv');

// // Load environment variables
// dotenv.config();

// console.log("MONGODB_URI:", process.env.DB_URL); // Debugging

// // Connect to the database
// mongoose.connect(process.env.DB_URL, {
//   useNewUrlParser: true,
//   useUnifiedTopology: true,
// })
// .then(() => {
//   console.log("Database connected");
//   // Start the cron job after the database is connected
//   cron.schedule('* * * * *', async () => {
//     console.log("Cron job triggered at:", new Date().toISOString());
//     try {
//       await sendMessages();
//     } catch (error) {
//       console.error("Error in cron job:", error);
//     }
//   });
// })
// .catch((err) => console.error("Database connection error:", err));

// async function sendMessages() {
//   console.log("sendMessages() called"); // Debugging

//   try {
//     const customers = await Customer.find().select('numberOfDays phone');
//     console.log("Fetched customers:", customers); // Debugging

//     // customers.forEach((customer) => {
//     //   if (customer.numberOfDays >= 3) {
//     //     console.log(`Sending message to customer ${customer.phone}`);

//     //     const message = "Hello customer, Your gas service is out of service.";
//     //     const to = "+256" + customer.phone;

//     //     // Mock the SMS API for testing
//     //     console.log(`Mock SMS sent to ${to}: ${message}`);
//     //     // axios.post('/api/sms', { to, message }).then(() => {
//     //     //   console.log(`Message sent to ${customer.phone}`);
//     //     // }).catch((smsError) => {
//     //     //   console.error(`Error sending message to ${to}:`, smsError.message);
//     //     // });
//     //   }
//     // });

//     for (const customer of customers) {
//         if (customer.numberOfDays <= 3) {
//           console.log(`Sending message to customer ${customer.phone}`);
  
//           const message = "Hello customer, Your gas service is out of service.";
//           const to = "+256" + customer.phone; // Ensure correct phone number format
  
//           try {
//             // Mock the SMS API for testing
//             console.log(`Mock SMS sent to ${to}: ${message}`);
//             // await axios.post('/api/sms', { to, message }); // Comment this out for testing
//           } catch (smsError) {
//             console.error(`Error sending message to ${to}:`, smsError.message);
//           }
//         }
//       }
//   } catch (err) {
//     console.error("Error fetching customers:", err);
//   }
// }




const cron = require('node-cron');
const Customer = require('./src/backend/model/customer.js'); // Ensure this path is correct
const mongoose = require('mongoose');
const dotenv = require('dotenv');

// Load environment variables
dotenv.config();

console.log("MONGODB_URI:", process.env.DB_URL); // Debugging

// Connect to the database
mongoose.connect(process.env.DB_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => {
  console.log("Database connected");
  // Start the cron job after the database is connected
  cron.schedule('0 0 * * *', async () => { // Runs every day at midnight
    console.log("Cron job triggered at:", new Date().toISOString());
    try {
      await sendMessages();
    } catch (error) {
      console.error("Error in cron job:", error);
    }
  });
})
.catch((err) => console.error("Database connection error:", err));

async function sendMessages() {
  console.log("sendMessages() called"); // Debugging

  try {
    // Fetch all customers
    const customers = await Customer.find().select('numberOfDays phone');
    console.log("Fetched customers:", customers); // Debugging

    for (const customer of customers) {
      // Decrement the numberOfDays by 1
      customer.numberOfDays -= 1;

      // If numberOfDays is 3 or fewer, send a message
      if (customer.numberOfDays <= 3) {
        console.log(`Sending message to customer ${customer.phone}. Remaining days: ${customer.numberOfDays}`);

        const message = `Hello customer, Your gas service will expire in ${customer.numberOfDays} days.`;
        const to = "+256" + customer.phone;

        // Mock the SMS API for testing
        console.log(`Mock SMS sent to ${to}: ${message}`);
        // axios.post('/api/sms', { to, message }).then(() => {
        //   console.log(`Message sent to ${customer.phone}`);
        // }).catch((smsError) => {
        //   console.error(`Error sending message to ${to}:`, smsError.message);
        // });
      }

      // Save the updated numberOfDays to the database
      await customer.save();
      console.log(`Updated customer ${customer.phone}: ${customer.numberOfDays} days remaining`);
    }
  } catch (err) {
    console.error("Error fetching or updating customers:", err);
  }
}