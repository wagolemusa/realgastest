// Import the africastalking module
import Africastalking from 'africastalking';

// Define your credentials
const credentials = {
    apiKey: 'atsk_ce057c14781f8df2d36b35786fa4dfd289427c2e581351fb3f156cd56a3eb0b3b0023322',
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
