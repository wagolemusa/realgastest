import mongoose from "mongoose";
const paidInstallmentSchema = mongoose.Schema({
    customerName: {
        type: String,
        required: false
    },
     amount: {
        type: Number,
        required: true
     },
    createdAt: {
        type: Date,
        default: Date.now,
    }
})
export default mongoose.models.PaidInstallment || mongoose.model("Point", paidInstallmentSchema)
