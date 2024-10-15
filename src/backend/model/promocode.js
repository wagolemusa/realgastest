import mongoose from "mongoose";


const promocodeSchema = mongoose.Schema({
    code: {
        type: String,
        required: true,
        unique: true,
    },
    amount: {
        type: Number ,
        required: true
    },
    expirationDate: {
        type: Date,
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now,
    }
})
export default mongoose.models.Promocode || mongoose.model("Promocode", promocodeSchema)






