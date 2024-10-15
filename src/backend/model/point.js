import mongoose from "mongoose";
const pointsSchema = mongoose.Schema({
    customerName: {
        type: String,
        required: false
    },
    phone: {
        type: Number,
        required: true,
    },
    cylinderSize: {
        type: String,
        required: true
    },
    cylinderType: {
        type: String,
        required: true
    },
    points: {
        type: Number, 
        default: "0"
     },
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
export default mongoose.models.Point || mongoose.model("Point", pointsSchema)






