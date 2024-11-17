import mongoose from "mongoose";

const expenseSchema = new mongoose.Schema({
    resaon: {
        type: String,
        required: true,
    },
    amount: {
        type: Number,
        required: true,
    },
    person: {
        type: String
    },
    date: {
        type: String,
    },

}, {timestamps: true});

export default mongoose.models.Expense ||
 mongoose.model('Expense', expenseSchema)