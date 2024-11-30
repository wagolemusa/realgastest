import mongoose from "mongoose";

const ResalerSchema = mongoose.Schema({

    businessname: {
        type: String,
        required : true
    },
    phone: {
        type: Number,
        required: true
    },
    whatsup: {
        type: Number,
        required: true
    },
    district: {
        type: String,
        required: false
    },
    town: {
        type: String,
        required: false
    },
    price: {
        type: String,
        required: false
    },
    code: {
        type: String,
        required: false
    },
}, {timestamps: true})

export default mongoose.models.Resaler ||
   mongoose.model("Resaler", ResalerSchema)