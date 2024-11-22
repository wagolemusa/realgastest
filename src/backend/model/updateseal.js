import mongoose from "mongoose";

const updatedsealSchema = new mongoose.Schema({
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
    customerName: {
        type: String,
        required: false
    },
    phone: {
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
    statusStock:{
        type: String,
        required: false
    }
}, {timestamps: true})

export default mongoose.models.Updatedseal || 
    mongoose.model("Updatedseal", updatedsealSchema)