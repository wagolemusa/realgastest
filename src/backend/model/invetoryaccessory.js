import mongoose from "mongoose";


const invetoryaccessorySchema = new mongoose.Schema({
    nameaccessory : {
        type: String,
        required: true
    },
    amount: {
        type: Number,
        default: 0
    },
    initial_quantity: {
        type: Number,
        default: 0
    },  
    added_stock: {
        type: Number,
        default: 0
    },
    stock_quantity:{
        type: Number,
        default: 0
    },
    stock: {
        type: String,
        default: "Instock"
    },
    createdAt: {
        type: Date,
        default: Date.now,
    }
})

export default mongoose.models.Invetoryaccessory || mongoose.model("Invetoryaccessory",invetoryaccessorySchema)

