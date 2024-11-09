// Import the africastalking module
import Africastalking from 'africastalking';

// Define your credentials
const credentials = {
    apiKey: 'atsk_33da5082f5a46f33de2359045ff47cccce68db3d88141dea46ba25662821e49951d3675e',
    username: 'refuge',
};
// Initialize the Africastalking service
const africastalking = Africastalking(credentials);

// Initialize the SMS service
const sms = africastalking.SMS;

// Define the phoneSms function
const phoneSms = async (to, message) => {
    const options = {
        to,
        message
    };

    try {
        const response = await sms.send(options);
        console.log(response);
    } catch (error) {
        console.log(error);
    }
};

// Export the phoneSms function
export default phoneSms;
