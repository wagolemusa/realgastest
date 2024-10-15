
import next from "next";
import Address from "../model/address";
import ErrorHandler from "../utils/errorHandler";
import { authenticate } from "../middlewares/auth";



export const getAddresses = async (req, res) => {
  try {
    const addresses = await Address.find({ user: req.user.id });
    res.status(200).json({ success: true, addresses });
  } catch (error) {
    console.error("Server error:", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};



export const newAddress = async (req, res) => {
  try {
    const addressData = {
      ...req.body,
      user: req.user.id,
    };
    const address = await Address.create(addressData);
    res.status(201).json({ address });
  } catch (err) {
    res.status(500).json({ error: 'Error creating address' });
  }
};



export const getAddress = async (req, res) => {
  const address = await Address.findById(req.query.id)
  if (!address) {
    return next(new ErrorHandler('Address not found', 404))
  }
  res.status(200).json({
    address
  })
}


// update 
export const updateAddress = async (req, res) => {

  let address = await Address.findById(req.query.id)

  if (!address) {
    return next(ErrorHandler('Address not found'))
  }
  address = await Address.findByIdAndUpdate(req.query.id, req.body)

  res.status(200).json({
    address
  });

}

// delete
export const deleteAddress = async (req, res) => {

  let address = await Address.findById(req.query.id)

  if (!address) {
    return next(ErrorHandler('Address not found'))
  }
  await address.remove();

  res.status(200).json({
    success: true,
  });

}