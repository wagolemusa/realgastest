import mongoose from 'mongoose';

const orderSchema = new mongoose.Schema({
    shippingInfo: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Address',
        required: false,
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: false,
    },
    orderItems: [
        {
            product: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'Product',
                required: true,
            },
            name: {
                type: String,
                required: true,
            },
            quantity: {
                type: String,
                required: true,
            },
            image: {
                type: String,
                required: true,
            },
            price: {
                type: String,
                required: true,
            },
        },
    ],
    tax: {
        type: Number,
        required: false,
    },
    amount: {
        type: Number,
        required: false,
    },
    totalAmount: {
        type: Number,
        required: false,
    },
    orderStatus: {
        type: String,
        default: 'Processing',
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
});

// This ensures that the model is only created once
const Order = mongoose.models.Order || mongoose.model('Order', orderSchema);

export default Order;
