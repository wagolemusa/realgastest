import mongoose from "mongoose";

const pointofsaleSchema = mongoose.Schema({
    businessName: {
        type: String,
        required: true
    },
    cylinders:[
        {
            brand:{type: String, String: false},
            kgs:{type: Number, required: true},
            quantity: { type: Number, required: true},
            total: { type: Number, required: false}
        }
    ],
    finaltotal: {
        type: Number,
        required: true
    },
    priceperkg: {
        type: Number,
        required: false
    },
    amount: {
        type: Number,
        required: false
    },
    paid: {
        type: Number,
        required: false
    },
    paymentstatus: {
        type: String,
        required: false
    },
    balance: {
        type: Number,
        required: false
    }
})

export default mongoose.models.Pointofsale ||
mongoose.model("Pointofsale", pointofsaleSchema)
