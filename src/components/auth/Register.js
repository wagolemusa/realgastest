'use client'

import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useState, useContext, useEffect } from "react";
import AuthContext from "../../context/AuthContext";
import { toast } from "react-toastify";

const Register = () => {
  const router = useRouter();
  const {  registerUser, clearErrors } = useContext(AuthContext);
  const [name, setName] = useState("");
  const [username, setUsername] = useState("");
  const [phone, setPhone] = useState("");
  const [referalCode, setReferalCode] = useState("");
  const [password, setPassword] = useState("");

  const [error, setError] = useState("");

  useEffect(() => {
    if (error) {
      toast.error(error);
      clearErrors(); 
    }
  }, [error, clearErrors]);


  const isValidPhoneNumber = (phone) => {
    const callPhone = phone.length === 12;
    return callPhone;
  };

  const submitHandler = async (e) => {
    e.preventDefault();

    const result = await registerUser({ name, username, phone, referalCode, password });

    if(!isValidPhoneNumber(phone)){
      setError("Phone Number must start with 2567xxxxxxx")
      return
    }

    if (result.error) {
        // Display error message if there's an issue (e.g., username or email already exists)
        toast.error(result.error);
    } else {
        // Success case
        toast.success("Registration successful! Redirecting to login...");
        router.push("/login");
    }
};

  return (
    <div
      style={{ maxWidth: "480px" }}
      className="mt-10 mb-20 p-4 md:p-7 mx-auto rounded bg-white shadow-lg"
    >
      <form onSubmit={submitHandler}>
        <h2 className="mb-5 text-2xl font-semibold">Register Account</h2>

        <div className="mb-4">
          <label className="block mb-1"> Full Name </label>
          <input
            className="appearance-none border border-gray-200 bg-gray-100 rounded-md py-2 px-3 hover:border-gray-400 focus:outline-none focus:border-gray-400 w-full"
            type="text"
            placeholder="Type your name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>

        <div className="mb-4">
          <label className="block mb-1"> Username </label>
          <input
            className="appearance-none border border-gray-200 bg-gray-100 rounded-md py-2 px-3 hover:border-gray-400 focus:outline-none focus:border-gray-400 w-full"
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </div>

        <div className="mb-4">
          <label className="block mb-1"> Phpne Number </label>
          <input
            className="appearance-none border border-gray-200 bg-gray-100 rounded-md py-2 px-3 hover:border-gray-400 focus:outline-none focus:border-gray-400 w-full"
            type="number"
            placeholder="256754188938"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            required
          />
        </div>

        <div className="mb-4">
          <label className="block mb-1"> Invitation Code </label>
          <input
            className="appearance-none border border-gray-200 bg-gray-100 rounded-md py-2 px-3 hover:border-gray-400 focus:outline-none focus:border-gray-400 w-full"
            type="text"
            placeholder="Your invitation code or username"
            value={referalCode}
            onChange={(e) => setReferalCode(e.target.value)}
          />
        </div>

        <div className="mb-4">
          <label className="block mb-1"> Password </label>
          <input
            className="appearance-none border border-gray-200 bg-gray-100 rounded-md py-2 px-3 hover:border-gray-400 focus:outline-none focus:border-gray-400 w-full"
            type="password"
            placeholder="Type your password"
            minLength={6}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>

        <button
          type="submit"
          className="my-2 px-4 py-2 text-center w-full inline-block text-white bg-blue-600 border border-transparent rounded-md hover:bg-blue-700"
        >
          Register
        </button>

        <hr className="mt-2" />
          <Link href="/login" className="registerbtn my-2 px-4 py-2 w-full text-center rounded-md">
              Login
          </Link>
      </form>
    </div>
  );
};

export default Register;
