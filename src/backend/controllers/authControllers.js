import User from "../model/user";
import { uploads } from "../utils/cloudinary";
import APIFilters from '../utils/APIFilters';
import fs from 'fs'
import bcrypt from "bcryptjs"


export const registerUser = async (req, res) => {
  const { name, username, email, referalCode, password } = req.body;
  
  try {
      // Check if a user with the same username already exists
      const existingUser = await User.findOne({ username });
      if (existingUser) {
          return res.status(400).json({ message: 'Username already exists' });
      }

      // Check if a user with the same email already exists
      const existingEmail = await User.findOne({ email });
      if (existingEmail) {
          return res.status(400).json({ message: 'Email already exists' });
      }

      // Create the new user
      const user = await User.create({
          name,
          username,
          email,
          referalCode,
          password
      });

      res.status(201).json({ user });
  } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Server error' });
  }
};



export const updateProfile = async (req, res) => {
    const newUserData = {
      name: req.body.name,
      email: req.body.email,
    };
    if (req.files.length > 0) {
      const uploader = async (path) => await uploads(path, "npc");
      const file = req.files[0];
      const { path } = file;
  
      const avatarResponse = await uploader(path);
      fs.unlinkSync(path);
      newUserData.avatar = avatarResponse;
    }
    const user = await User.findByIdAndUpdate(req.user._id, newUserData);
    res.status(200).json({
      user,
    });
  };


export const updatePassword = async (req, res, next) => {
  const user = await User.findById(req.user._id).select("+password");

  // console.log("current", req.body.currentPassword)
  // console.log("New", req.body.newPassword)
  
  const isPasswordMatched = await bcrypt.compare(
    req.body.currentPassword,
    user.password
  );
  if (!isPasswordMatched) {
    return next(new ErrorHandler("Old password is incorrect", 400));
  }
  user.password = req.body.newPassword;
  await user.save();

  res.status(200).json({
    sucess: true,
  });
};



// get single user details
export const getUser = async (req, res) => {
  let user = await User.findById(req.query.id)

  if (!user) {
    return next(new ErrorHandler("No Order found with this ID", 404));
  }
  res.status(200).json({
    success: true,
    user,
  });
};


// update user Order
export const updateUser = async (req, res) => {
  let user = await User.findById(req.query.id)

  if (!user) {
    return next(new ErrorHandler("No Order found with this ID", 404));
  }
  user = await User.findByIdAndUpdate(req.query.id, req.body.userData)
  res.status(200).json({
    success: true,
    user,
  });
};



// Delete user
export const deleteUsers = async (req, res) => {
  const user = await User.findById(req.query.id)
  if (!user) {
    return next(new ErrorHandler("No user found with this ID", 404));
  }
   await user.deleteOne();
  res.status(200).json({
    success: true
  });
};


// get all users
export const getUsers = async (req, res) => {
  const resPerPage = 20;
  const userCount = await User.countDocuments();

  const apiFilters = new APIFilters(User.find(), req.query).pagination(
    resPerPage
  );
  const users = await apiFilters.query.sort({name: 1})

  res.status(200).json({
    userCount,
    resPerPage,
    users,
  });
};
