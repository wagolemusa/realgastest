import mongoose from "mongoose";

const gasSchema = new mongoose.Schema({
    productName : {
        type: String,
        required: true
    },
    cylinderSize: {
        type: String,
        required: true
    },
    category: {
        type: String,
        required: true,
    },
    price: {
        type: Number,
        required: true
    },
    discount: {
        type: Number,
        required: false,
    },
    promotion: {
        type: String,
        default: "off"
    },
    seton: {
        type: String,
        default: "normal"
    },
    images: [
        {
            public_id: {
                type: String,
            },
            url: {
                type: String,
            },

        }
    ],
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

export default mongoose.models.Gas || 
mongoose.model("Gas", gasSchema)