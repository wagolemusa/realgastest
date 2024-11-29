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
        required: false
    },
    branch: {
        type: String,
        required: false
    },

}, {timestamps: true})

export default mongoose.models.Stockcylinder || 
    mongoose.model("Stockcylinder", stockcylinderSchema)