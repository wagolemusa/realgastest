"use client";
import SellContext from "../../../context/SellContext"
import React, {useEffect, useContext, useState } from "react";
import { toast } from "react-toastify";

const UpdateSales = ({ data, id }) => {
    
  const {updateSales, updated, setUpdated, error } = useContext(SellContext);

  const [sales, setSales] = useState({
    datedata: data?.datedata,
    branch: data?.branch,
    cylinderSize: data?.cylinderSize,
    cylinderType: data?.cylinderType,
    amount: data?.amount,
    customerName: data?.customerName,
    phone: data?.phone,
   
  });


  useEffect(() => {
    if(updated){
        toast.success('Customer Updated')
        setUpdated(false)
    }
    if(error) {
        toast.error(error)
        clearErrors()
    }
  }, [error, updated, setUpdated])

  const { 
    datedata,
    branch,
    cylinderType,
    cylinderSize,
    amount, 
    customerName, 
    phone} = sales;

  const onChange = (e) => {
    setSales({ ...sales, [e.target.name]: e.target.value });
  };

  const submitHandler = (e) => {
    e.preventDefault();
    updateSales(sales, data?._id);
  };
  
  
  return (
    <section 
    style={{ maxWidth: "700px" }}
    className="main2 mt-10 mb-20 p-4 md:p-7 mx-auto rounded bg-white shadow-lg">

      <h1 className=" mb-3 text-xl md:text-2xl font-semibold text-black">
        <a href="/admin/sell">Back</a> &nbsp;&nbsp;Update  Sales
      </h1>

      <form onSubmit={submitHandler}>

      <div className="mb-4">
          <label className="block mb-1"> Date </label>
          <input
            type="text"
            className="appearance-none border border-gray-200 bg-gray-100 rounded-md py-2 px-3 hover:border-gray-400 focus:outline-none focus:border-gray-400 w-full"
            placeholder="Date"
            name="datedata"
            value={datedata}
            onChange={onChange}
            required
          />
        </div>

        <div className="mb-4">
          <label className="block mb-1"> Branch </label>
          <input
            type="text"
            className="appearance-none border border-gray-200 bg-gray-100 rounded-md py-2 px-3 hover:border-gray-400 focus:outline-none focus:border-gray-400 w-full"
            placeholder="Branch name"
            name="branch"
            value={branch}
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
          <label className="block mb-1"> Amount </label>
          <input
            type="text"
            className="appearance-none border border-gray-200 bg-gray-100 rounded-md py-2 px-3 hover:border-gray-400 focus:outline-none focus:border-gray-400 w-full"
            placeholder="Amount"
            name="amount"
            value={amount}
            onChange={onChange}
            required
          />
        </div>  

        <div className="mb-4 mt-5">
          <label className="block mb-1"> Customer Name</label>
          <input
            type="text"
            className="appearance-none border border-gray-200 bg-gray-100 rounded-md py-2 px-3 hover:border-gray-400 focus:outline-none focus:border-gray-400 w-full"
            placeholder="Paste Map Url or Codinates"
            name="customerName"
            value={customerName}
            onChange={onChange}
            
          ></input>
        </div>

        <button
          type="submit"
          className="my-2 px-4 py-2 text-center inline-block text-white bg-blue-600 border border-transparent rounded-md hover:bg-blue-700 w-full"
        >
          Update Customers
        </button>
      </form>
    </section>
  );
};

export default UpdateSales;