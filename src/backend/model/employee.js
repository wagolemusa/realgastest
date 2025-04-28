import mongoose from "mongoose";

const employeeSchema = new mongoose.Schema({
    firstname: {
        type: String,
        required: true,
    },
    lastname: {
        type: String,
        required: true
    },
    phone: {
        type: String,
        required: true
    },
    location: {
        type: String,
        required: true
    },
    sex: {
        type: String,
        required: true
    },
    salary: {
        type: Number,
        required: true,
    },
    idnumber: {
        type: String,
        required: false
    },
    nextOfKinName: {
        type: String,
        required: false 
    },
    nextOfKinPhone: {
        type: String,
        required: false 
    }

}, {timestamps: true});

export default mongoose.models.Employee ||
 mongoose.model('Employee', employeeSchema)