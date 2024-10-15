import mongoose from "mongoose";

const gasboughtSchema = new mongoose.Schema({
    date:{
       type: String,
       required: true 
    },
    distributor:{
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
    cashPaid: {
        type: String,
        required: false
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: false,
      },
    createdAt: {
        type: Date,
        default: Date.now,
    }
    
})
export default mongoose.models.Gasbought ||
mongoose.model("Gasbought",  gasboughtSchema)