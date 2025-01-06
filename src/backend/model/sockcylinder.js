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
        required: false
    },
    sealnumber: {
        type: String,
        required: false
    },
    branch: {
        type: String,
        required: false
    },
    statusStock: {
        type: String,
        default: "instock"
    }
}, {timestamps: true})

export default mongoose.models.Stockcylinder || 
    mongoose.model("Stockcylinder", stockcylinderSchema)