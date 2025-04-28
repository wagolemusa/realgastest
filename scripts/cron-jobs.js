import Customer from './src/backend/model/customer.js'; // Correct path with .js extension
import axios from 'axios';
import cron from 'node-cron';
import mongoose from 'mongoose';
import dotenv from 'dotenv';

// Load environment variables
dotenv.config();

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