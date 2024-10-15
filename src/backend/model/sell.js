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
    createdAt: {
        type: Date,
        default: Date.now,
    }
    
})
export default mongoose.models.Sell || mongoose.model("Sell",  sellSchema)