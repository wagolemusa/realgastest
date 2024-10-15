import mongoose from "mongoose";
const statementSchema = mongoose.Schema({
    customerName: {
        type: String,
        required: false
    },
    phone: {
        type: Number,
        required: true,
    },
     amount: {
        type: Number,
        default: 0
     },
     cylinderSize: {
        type: String,
        required: true,
     },
     cylinderType: {
        type: String,
        required: true,
     },
     category: {
         type: String,
         required: true,
     },
     installmentPaid: {
        type: Number,
        default: 1000
     },
     totalPaid: {
         type: Number,
      default: 0
     },
     balance: {
        type: Number,
        default: 0
     },
     status: {
        type: String,
        default: "Not-Cleared"
     },
    createdAt: {
        type: Date,
        default: Date.now,
    }
})
export default mongoose.models.Statement || mongoose.model("Statement", statementSchema)


