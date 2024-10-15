import mongoose from "mongoose";


const accessorySchema = new mongoose.Schema({
    name : {
        type: String,
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now,
    }
})

export default mongoose.models.Accessories || mongoose.model("Accessories",accessorySchema)

