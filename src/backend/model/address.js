import mongoose from "mongoose";

const addressSchema = new mongoose.Schema({
  street: {
    type: String,
    required: true,
  },
  phoneNo: {
    type: String,
    required: true,
  },
  locationArea: {
    type: String,
    required: false,
  },
  mapurl: {
    type: String,
    required: false,
  },
  describeLocation: {
    type: String,
    required: false
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "User",
  },

  createdAt: {
    type: Date,
    default: Date.now,
  },
});

export default mongoose.models.Address ||
  mongoose.model("Address", addressSchema);