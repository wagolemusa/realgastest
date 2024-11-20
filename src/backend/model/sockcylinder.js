import mongoose from "mongoose";

const stockcylinderSchema = new mongoose.Schema({
    cylinderSize: {
        type: String,
        required: true
    },
    cylinderType:{
        type: String,
        required: true
    },
    condition: {
        type: String,
        required: true
    },
    sealnumber: {
        type: String,
        required: true
    },
    shopname: {
        type: String,
        required: true
    },
    status:{
        type: String,
        required: false
    },
    sealTaken: {
        type: String,
        required: false
    },
    sealReplaced: {
        type: String,
        required: false
    }
}, {timestamps: true})

export default mongoose.models.Stockcylinder || 
    mongoose.model("Stockcylinder", stockcylinderSchema)