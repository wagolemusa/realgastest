import mongoose from "mongoose";

const bulkSchema = new mongoose.Schema({
    date:{
       type: String,
       required: true 
    },
    resaler:{
        type: String,
        required: true,
    },
    cylinders:[
        {
            brand: { type: String, required: true},
            kgs:{type: Number, required: true},
            quantity: { type: Number, required: true},
            total: { type: Number, required: false}
        }
    ],
    finaltotal: {
        type: Number,
        required: true
    },
    priceperkgs: {
        type: Number,
        required: false
    },
    amount:{
        type: Number,
        required: false
    },
    cashPaid: {
        type: String,
        required: false
    },
    balance: {
        type: Number,
        required: false
    },
    paymentstatus: {
        type: String,
        required: false
    },
    paymentmethod: {    
        type: String,
        required: false
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: false,
      },   
}, { timestamps: true})

export default mongoose.models.Bulk ||
mongoose.model("Bulk",  bulkSchema)