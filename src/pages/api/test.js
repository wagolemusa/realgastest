async function getCustomersAndCountDays() {
    try {
      // Fetch all customers with the necessary fields
      const customers = await Customer.find().select("numberOfDays phone");
  
      // Iterate over each customer and set up their interval
      for (const customer of customers) {
        let count = 0;
  
        // Using setInterval to increment the count for each customer
        const intervalId = setInterval(() => {
          count++;
  
          // Check if the counter matches the customer's 'numberOfDays' - 1
          if (count === customer.numberOfDays - 1) {
            console.log(`Sending message to customer ${customer.phone}`);
            // Insert your message sending logic here...
  
            // Once the message is sent, clear the interval
            clearInterval(intervalId);
          }
        }, 86400000); // 1 day in milliseconds (86400000 ms = 1 day)
      }
    } catch (error) {
      console.error("Error fetching customers:", error);
    }
  }
  
  // Call the function to execute it immediately
  getCustomersAndCountDays();
  