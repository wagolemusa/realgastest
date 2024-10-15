import mongoose from "mongoose";

const referralSchema = mongoose.Schema({

     referralcode:{
        type: String,
        required: false
     },
     points: {
        type: Number, 
        required: false
     },

    
})

export default mongoose.models.Referal ||
   mongoose.model("Referal", referralSchema)

