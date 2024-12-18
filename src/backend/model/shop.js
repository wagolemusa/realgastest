import mongoose from "mongoose";

const shopSchema = new mongoose.Schema({
    cylinders: [
        {
            sealnumber: { type: String, required: true},
            replacedseal: {type: String, required: true},
            cylinderbrand: { type: String, required: true},
            cylindersize: { type: String, required: true },
            price: { type: Number, required: true }
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
    finalPrice: {
        type: Number,
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
