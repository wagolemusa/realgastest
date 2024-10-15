"use client";

import CustomerContext from "../../../context/CustomerContext";
import React, { useContext, useState } from "react";

const Customer = () => {
  const { newCustomerCreate } = useContext(CustomerContext);
  
  const [customer, setCustomer] = useState({
    name: "",
    phone: "",
    email: "",
    location: "",
    describeLocation: "",
    cylinderType: "",
    cylinderSize: "",
    numberOfDays: "",
    mapurl: "",
  });

  const { 
    name,
    phone,
    email,
    cylinderType,
    cylinderSize,
    numberOfDays, 
    describeLocation, 
    location,
    mapurl} = customer;

  const onChange = (e) => {
    setCustomer({ ...customer, [e.target.name]: e.target.value });
  };


  const submitHandler = (e) => {
    e.preventDefault();
    newCustomerCreate(customer);
  };
  

  return (
    <section 
    style={{ maxWidth: "700px" }}
    className="main2 mt-10 mb-20 p-4 md:p-7 mx-auto rounded bg-white shadow-lg">

      <h1 className=" mb-3 text-xl md:text-2xl font-semibold text-black">
        <a href="/admin/customer">Back</a> &nbsp;&nbsp;Create New Customer
      </h1>

      <form onSubmit={submitHandler}>
        <div className="mb-4">
          <label className="block mb-1"> Name </label>
          <input
            type="text"
            className="appearance-none border border-gray-200 bg-gray-100 rounded-md py-2 px-3 hover:border-gray-400 focus:outline-none focus:border-gray-400 w-full"
            placeholder="Product name"
            name="name"
            value={name}
            onChange={onChange}
            required
          />
        </div>

        <div className="mb-4">
          <label className="block mb-1"> Phone </label>
          <input
            type="text"
            className="appearance-none border border-gray-200 bg-gray-100 rounded-md py-2 px-3 hover:border-gray-400 focus:outline-none focus:border-gray-400 w-full"
            placeholder="Phone Number"
            name="phone"
            value={phone}
            onChange={onChange}
            required
          />
        </div>

        <div className="mb-4">
          <label className="block mb-1"> Email </label>
          <input
            type="text"
            className="appearance-none border border-gray-200 bg-gray-100 rounded-md py-2 px-3 hover:border-gray-400 focus:outline-none focus:border-gray-400 w-full"
            placeholder="Email"
            name="email"
            value={email}
            onChange={onChange}
            required
          />
        </div>

        <div className="mb-4">
          <label className="block mb-1"> Cylinder Type </label>
          <input
            type="text"
            className="appearance-none border border-gray-200 bg-gray-100 rounded-md py-2 px-3 hover:border-gray-400 focus:outline-none focus:border-gray-400 w-full"
            placeholder="Cylinder Type"
            name="cylinderType"
            value={cylinderType}
            onChange={onChange}
            required
          />
        </div>


        <div className="mb-4">
          <label className="block mb-1"> Cylinder Size </label>
          <input
            type="number"
            className="appearance-none border border-gray-200 bg-gray-100 rounded-md py-2 px-3 hover:border-gray-400 focus:outline-none focus:border-gray-400 w-full"
            placeholder="Cylinder Size"
            name="cylinderSize"
            value={cylinderSize}
            onChange={onChange}
            required
          />
        </div>
        <div className="mb-4">
          <label className="block mb-1"> Number of days </label>
          <input
            type="text"
            className="appearance-none border border-gray-200 bg-gray-100 rounded-md py-2 px-3 hover:border-gray-400 focus:outline-none focus:border-gray-400 w-full"
            placeholder="Numbers of Days"
            name="numberOfDays"
            value={numberOfDays}
            onChange={onChange}
            required
          />
        </div>

        <div className="mb-4">
          <label className="block mb-1"> Location </label>
          <input
            type="text"
            className="appearance-none border border-gray-200 bg-gray-100 rounded-md py-2 px-3 hover:border-gray-400 focus:outline-none focus:border-gray-400 w-full"
            placeholder="Location"
            name="location"
            value={location}
            onChange={onChange}
            required
          />
        </div>  
        <div className="mb-4 mt-5">
          <label className="block mb-1"> Map Url or Codinates </label>
          <input
            type="text"
            className="appearance-none border border-gray-200 bg-gray-100 rounded-md py-2 px-3 hover:border-gray-400 focus:outline-none focus:border-gray-400 w-full"
            placeholder="Paste Map Url or Codinates"
            name="mapurl"
            value={mapurl}
            onChange={onChange}
            
          ></input>
        </div>

        <div className="mb-4 mt-5">
          <label className="block mb-1"> Describe Location </label>
          <textarea
            rows="4"
            className="appearance-none border border-gray-200 bg-gray-100 rounded-md py-2 px-3 hover:border-gray-400 focus:outline-none focus:border-gray-400 w-full"
            placeholder="Describe Location"
            name="describeLocation"
            value={describeLocation}
            onChange={onChange}
            required
          ></textarea>
        </div>

        <button
          type="submit"
          className="my-2 px-4 py-2 text-center inline-block text-white bg-blue-600 border border-transparent rounded-md hover:bg-blue-700 w-full"
        >
          Create Customers
        </button>
      </form>
    </section>
  );
};

export default Customer;