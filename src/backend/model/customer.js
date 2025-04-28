// import  mongoose from "mongoose";

// const customerSchema = new mongoose.Schema({
//     name: {
//         type: String,
//         required: true
//     },
//     phone: {
//         type: Number,
//         required: true
//     },
//     email: {
//         type: String,
//         required: false
//     },
//     cylinderType: {
//         type: String,
//         required: true
//     },
//     cylinderSize: {
//         type: String,
//         required: false
//     },
//     numberOfDays: {
//         type: String,
//         required: true
//     },
//     location: {
//         type: String,
//         required: true
//     },
//     describeLocation: {
//         type: String,
//         required: false
//     },
//     mapurl: {
//         type: String,
//         required: false
//     },
//     user: {
//         type: mongoose.Schema.Types.ObjectId,
//         ref: "User",
//         required: false,
//       },
//     createdAt: {
//         type: Date,
//         default: Date.now,
//     }
// })

// export default mongoose.models.Customer || 
// mongoose.model("Customer", customerSchema);

const mongoose = require('mongoose');

const customerSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  phone: {
    type: Number,
    required: true,
  },
  email: {
    type: String,
    required: false,
  },
  cylinderType: {
    type: String,
    required: true,
  },
  cylinderSize: {
    type: String,
    required: false,
  },
  numberOfDays: {
    type: String,
    required: true,
  },
  location: {
    type: String,
    required: true,
  },
  describeLocation: {
    type: String,
    required: false,
  },
  mapurl: {
    type: String,
    required: false,
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: false,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports =
  mongoose.models.Customer || mongoose.model('Customer', customerSchema);