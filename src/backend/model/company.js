import mongoose from "mongoose";

const companySchema = mongoose.Schema({

    companyName: {
        type: String,
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now,
    }
})

export default mongoose.models.Company|| mongoose.model("Company", companySchema)