import mongoose from "mongoose";

const retailSchema = new mongoose.Schema({
    sealtaken: {
        type: String,
        required: true
    },
    sealreplaced: {
        type: String,
        required: true
    },
    cylinderType: { 
        type: String, 
        required: true
    },
    cylinderSize: { 
        type: String, 
        required: true 
    },
    category: {
        type: String,
        required: true
    },
    price: { 
        type: Number, 
        required: true 
    },
    phone: {
        type: Number,
        required: false
    },
    customername: {
        type: String,
        required: false
    },
    paymentmethod: {
        type: String,
        required: false
    },
    condition: {
        type: String,
        required: false
    },
    branch:{
        type: String,
        required: false
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: false,
    },    
}, { timestamps: true})

export default mongoose.models.Retail ||
mongoose.model("Retail", retailSchema)
