import mongoose from "mongoose";

const invetorySchema = mongoose.Schema({
     productName: {
        type: String,
        required: true
     },
     quanty: {
        type: Number,
        required: true
     },
     price: {
        type: Number,
        required: true
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
})

export default mongoose.models.Invetories || mongoose.model("invetories", invetorySchema)