import Customer from './src/backend/model/customer';

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


