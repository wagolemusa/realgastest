import mongoose from "mongoose";

const branchSchema = mongoose.Schema({
     branchName: {
        type: String,
        required: true
     },
     employee: {
      type: String,
      required: false
     },
     location: {
      type: String,
      required: false
     },
     user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: false,
      },
})

export default mongoose.models.Branch|| mongoose.model("Branch", branchSchema)