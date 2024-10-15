import mongoose from "mongoose";
const withdrowpointSchema = mongoose.Schema({
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
        default: "2000"
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
export default mongoose.models.Withdrowpoint || mongoose.model("Withdrowpoint", withdrowpointSchema)






