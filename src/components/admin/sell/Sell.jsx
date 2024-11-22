"use client";

import React, { useContext, useState, useEffect } from "react";
import SellContext from "../../../context/SellContext";
import axios from "axios";

const NewSell = () => {
  const { newSellCreate } = useContext(SellContext);
  const [data, setData] = useState(null);
  const [customerdata, setCustomerData] = useState(null);
  const [error, setError] = useState(null)


// Fetch branches
useEffect(() => {

  async function fetchData(){
      try{
          const response = await axios.get(`${process.env.ENVIRONMENT_URL}/api/admin/branch`);
          setData(response.data);
      } catch(error){
          setError('Failed to fetch data');
          console.error('Error fetching data:', error);
      }
  }

  async function fetchcustomer(){
    try{
        const response = await axios.get(`${process.env.ENVIRONMENT_URL}/api/admin/customer`);
        setCustomerData(response.data);
    } catch(error){
        setError('Failed to fetch data');
        console.error('Error fetching data:', error);
    }
}
  fetchcustomer()
  fetchData();
}, []);



  const [sell, setSell] = useState({
    branch: "",
    cylinderSize: "",
    cylinderType: "",
    category: "",
    amount: "",
    numberOfDays:"",
    paidamount: "",
    balance: "",
    paymantstatus: "",
    paymentmethod:"",
    datedata: "",
    time: "",
    customerName: "",
    phone: "",
    condition: "",
    sealTaken: "",
    sealReplaced: ""

  });

  const { 
    branch,
    cylinderType,
    cylinderSize,
    category,
    amount,
    numberOfDays,
    paidamount,
    balance,
    paymantstatus,
    paymentmethod,
    time,
    datedata,
    customerName, 
    phone,
    condition,
    sealTaken,
    sealReplaced,} = sell;

  const onChange = (e) => {
    setSell({ ...sell, [e.target.name]: e.target.value });
  };


  const submitHandler = (e) => {
    e.preventDefault();
    newSellCreate(sell);
  };
  

  return (
    <section 
    style={{ maxWidth: "700px" }}
    className="main2 mt-10 mb-20 p-4 md:p-7 mx-auto rounded bg-white shadow-lg">
      <h3 className="mb-3 text-xl md:text-3xl font-semibold text-black">
      <a href="/admin/sell">Back</a> &nbsp;&nbsp;Create Sales || &nbsp;&nbsp;<a href="/admin/branch/new">Create Branch</a> 
      </h3>

      <form onSubmit={submitHandler}>

              
      <label className="" for="inlineFormSelectPref">Shop branch Name</label>
          <select data-mdb-select-init list="browsers3" class="select
              border border-gray-200 bg-gray-100 rounded-md py-2 px-3 hover:border-gray-400 focus:outline-none focus:border-gray-400 w-full"
              name="branch"
              value={branch}
              onChange={onChange}
          >
            <option>Select branch</option>
              {data?.branch?.map(( pointdata, index ) => (
              <option key={pointdata?.id || index} value={pointdata?.branchName}>
              {pointdata?.branchName}
          </option>
            ))}
          </select>

            <br/> <br/>

            <select class="form-select" aria-label="Default select example" 
                name="cylinderSize"
                value={cylinderSize}
                onChange={onChange}
            >
                <option selected>Cylinder Size</option>
                <option value="3kgs">3kgs</option>
                <option value="6kgs">6kgs</option>
                <option value="12kgs">12kgs</option>
                <option value="12.5kgs">12.5kgs</option>
                <option value="13kgs">13kgs</option>
                <option value="15kgs">15kgs</option>
                <option value="25kgs">25kgs</option>
                <option value="45kgs">45kgs</option>
            </select>
            <br/> 

        <select className="form-select" aria-label="Default select example"
              name="cylinderType"
              value={cylinderType}
              onChange={onChange}
         >
            <option>Cylinder Type</option>
            <option>Korgas</option>
            <option>Mengas</option>
             <option>Total</option>
            <option>Oryx</option>
            <option>Shell</option>
             <option>Oilibya</option>
              <option>K-gas</option>
              <option>Hashi</option>
              <option>Stabex</option>
              <option>Easy</option>
              <option>Lake</option>
              <option>Mongas</option>
              <option>Petgas</option>
              <option>Others</option>
          </select><br />


      <select class="form-select" aria-label="Default select example"
            name="category"
            value={category}
            onChange={onChange}
        >
            <option selected>Select Category</option>
            <option>Refill</option>
            <option>Full Set</option>
        </select>

        <div className="mb-2 py-2">
          <label className="block mb-1"> Amount </label>
          <input
            type="number"
            className="appearance-none border border-gray-200 bg-gray-100 rounded-md py-2 px-3 hover:border-gray-400 focus:outline-none focus:border-gray-400 w-full"
            placeholder="Amount"
            name="amount"
            value={amount}
            onChange={onChange}
            required
          />
        </div>

        <div className="mb-2">
          <label className="block mb-1">Number of days Gas takes  </label>
          <input
            type="number"
            className="appearance-none border border-gray-200 bg-gray-100 rounded-md py-2 px-3 hover:border-gray-400 focus:outline-none focus:border-gray-400 w-full"
            placeholder="Number of days Gas takes"
            name="numberOfDays"
            value={numberOfDays}
            onChange={onChange}
            required
          />
        </div>

        <div className="mb-2">
          <label className="block mb-1">Cash Paid</label>
          <input
            type="number"
            className="appearance-none border border-gray-200 bg-gray-100 rounded-md py-2 px-3 hover:border-gray-400 focus:outline-none focus:border-gray-400 w-full"
            placeholder="Cash Paid"
            name="paidamount"
            value={paidamount}
            onChange={onChange}
            required
          />
        </div>
        <div className="mb-4">
          <label className="block mb-1">Balance</label>
          <input
            type="number"
            className="appearance-none border border-gray-200 bg-gray-100 rounded-md py-2 px-3 hover:border-gray-400 focus:outline-none focus:border-gray-400 w-full"
            placeholder="Balance"
            name="balance"
            value={balance}
            onChange={onChange}
            required
          />
        </div>

        <select class="mb-3 form-select" aria-label="Default select example"
            name="paymantstatus"
            value={paymantstatus}
            onChange={onChange}
        >
            <option>Payment Status</option>
            <option>paid-all</option>
            <option>Not-paid-all</option>
            <option>Not-paid</option>
        </select>


        <select class="mb-3 form-select" aria-label="Default select example"
            name="paymentmethod"
            value={paymentmethod}
            onChange={onChange}
        >
            <option selected>Cylinders Conditions</option>
            <option>cash</option>
            <option>momo</option>
            <option>airtel</option>
            <option>phone</option>
        </select>

        <div className="mb-3">
          <label className="block mb-1">Date</label>
          <input
            type="date"
            className="appearance-none border border-gray-200 bg-gray-100 rounded-md py-2 px-3 hover:border-gray-400 focus:outline-none focus:border-gray-400 w-full"
            placeholder="Date"
            name="datedata"
            value={datedata}
            onChange={onChange}
            required
          />
        </div>

        <div className="mb-3">
          <label className="block mb-1"> Time</label>
          <input
            type="time"
            className="appearance-none border border-gray-200 bg-gray-100 rounded-md py-2 px-3 hover:border-gray-400 focus:outline-none focus:border-gray-400 w-full"
            placeholder="Time"
            name="time"
            value={time}
            onChange={onChange}
            required
          />
        </div>

        <label className="" for="inlineFormSelectPref">Customers</label>
          <select data-mdb-select-init list="browsers3" class="select
              border border-gray-200 bg-gray-100 rounded-md py-2 px-3 hover:border-gray-400 focus:outline-none focus:border-gray-400 w-full"
              name="customerName"
              value={customerName}
              onChange={onChange}
          >
            <option>Select Customer</option>
              {customerdata?.products?.map(( custdata, index ) => (
                <option key={custdata?.id || index} value={custdata?.name}>
                    {custdata?.name}
                </option>
            ))}
          </select>

        <div className="mb-3 py-2">
          <label className="block mb-1"> Phone</label>
          <input
            type="text"
            className="appearance-none border border-gray-200 bg-gray-100 rounded-md py-2 px-3 hover:border-gray-400 focus:outline-none focus:border-gray-400 w-full"
            placeholder="Phone"
            name="phone"
            value={phone}
            onChange={onChange}
            
          />
        </div>

        <select class="mb-3 form-select" aria-label="Default select example"
            name="condition"
            value={condition}
            onChange={onChange}
        >
            <option selected>Cylinders Conditions</option>
            <option>very-new</option>
            <option>new</option>
            <option>nice</option>
            <option>old</option>
        </select>

        <div className="mb-2 py-2">
          <label className="block mb-1">seal Taken</label>
          <input
            type="text"
            className="appearance-none border border-gray-200 bg-gray-100 rounded-md py-2 px-3 hover:border-gray-400 focus:outline-none focus:border-gray-400 w-full"
            placeholder="Seal Taken"
            name="sealTaken"
            value={sealTaken}
            onChange={onChange}
          
          />
        </div>
        <div className="mb-2 py-2">
          <label className="block mb-1">Seal Replaced</label>
          <input
            type="text"
            className="appearance-none border border-gray-200 bg-gray-100 rounded-md py-2 px-3 hover:border-gray-400 focus:outline-none focus:border-gray-400 w-full"
            placeholder="Seal Taken"
            name="sealReplaced"
            value={sealReplaced}
            onChange={onChange}
          />
        </div>
        <button
          type="submit"
          className="my-2 px-4 py-2 text-center inline-block text-white bg-blue-600 border border-transparent rounded-md hover:bg-blue-700 w-full"
        >
          Create Sell
        </button>
      </form>
    </section>
  );
};

export default NewSell;