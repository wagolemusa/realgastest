import mongoose from "mongoose";

const shopSchema = new mongoose.Schema({
    cylinders: [
        {
            brand: { type: String, required: true},
            kgs: { type: Number, required: true },
            price: { type: Number, required: true },
            sealnumber: { type: String, required: true},
            replacedseal: {type: String, required: true}
        }
    ],
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
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: false,
      },   
}, { timestamps: true})

export default mongoose.models.Shop ||
mongoose.model("Shop", shopSchema)
