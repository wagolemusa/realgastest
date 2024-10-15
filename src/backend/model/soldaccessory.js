import mongoose from "mongoose";

const soldaccessory =  new mongoose.Schema({
    nameaccessory: {
        type: String,
        required: true
    },
    quantity: {
        type: Number,
        default: 0
    },
    amount: {
        type: Number,
        default: 0
    },
    date: {
        type: String,
        required: false
    },
    createdAt: {
        type: Date,
        default: Date.now,
    }

})

export default mongoose.models.Soldaccessories || mongoose.model("Soldaccessories", soldaccessory)

