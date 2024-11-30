import mongoose from "mongoose";

const sellSchema = mongoose.Schema({
    branch: {
        type: String,
        required: true
    },
    cylinderSize: {
        type: String,
        required: true
    },
    cylinderType: {
        type: String,
        required: true
    },
    category: {
        type: String,
        required: true
    },
    amount: {
        type: Number,
        required: true
    },
    numberOfDays: {
        type: String,
        required: true
    },
    paidamount: {
        type: Number,
        required: false
    },
    balance: {
        type: Number,
        required: false
    },
    paymantstatus: {
        type: String,
        required: false
    },
    paymentmethod: {
        type: String,
        required: false
    },
    datedata: {
        type: String, 
        required: true
    },
    time: {
        type: String,
        required: true
    },
    customerName: {
        type: String,
        required: false
    },
    phone: {
        type: String,
        required: false
    },
    condition: {
        type: String,
        required: true
    }, 
    sealTaken: {
        type: String,
        required: false
    },
    sealReplaced: {
        type: String,
        required: false
    }
}, {timestamps: true})

export default mongoose.models.Sell || 
mongoose.model("Sell",  sellSchema)