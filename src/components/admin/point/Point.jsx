"use client";

import React, { useContext, useState, useEffect} from "react";
import PointContext from "../../../context/PointContext";
import axios from "axios";

const Point = () => {
  const { newPointCreate } = useContext(PointContext);
  const [data, setData] = useState(null);
  const [error, setError] = useState(null)

  const [point, setPoint] = useState({
    customerName: "",
    phone: "",
    cylinderSize: "",
    cylinderType: "",
  });

  const { 
    customerName,
    phone,
    cylinderSize,
    cylinderType} = point;

  const onChange = (e) => {
    setPoint({ ...point, [e.target.name]: e.target.value });
  };


  const submitHandler = (e) => {
    e.preventDefault();
    newPointCreate(point);
  };

  // Fetch 
  useEffect(() => {
    async function fetchData(){
        try{
            const response = await axios.get(`${process.env.ENVIRONMENT_URL}/api/admin/customer`);
            setData(response.data);
        } catch(error){
            setError('Failed to fetch data');
            console.error('Error fetching data:', error);
        }
    }
    fetchData();
}, []);
  

  return (
    <section 
            style={{ maxWidth: "700px" }}
            className="main2 mt-10 mb-20 p-4 md:p-7 mx-auto rounded bg-white shadow-lg">
            

            <h1 className=" mb-3 text-xl md:text-2xl font-semibold text-black">
                <a href="/admin/points">Back</a> &nbsp;&nbsp;Give Points To Buyers || &nbsp;&nbsp; <a href="/admin/customer/new">Create New Customer</a>
            </h1>

      <form onSubmit={submitHandler}>

      
        <label className="" for="inlineFormSelectPref">Customer Name</label>

            <select data-mdb-select-init list="browsers3" class="select
                border border-gray-200 bg-gray-100 rounded-md py-2 px-3 hover:border-gray-400 focus:outline-none focus:border-gray-400 w-full"
                name="customerName"
                value={customerName}
                onChange={onChange}
            >
               <option>Select Customer</option>
                {data?.products?.map(( pointdata, index ) => (
                    <option  key={pointdata._id || index } value={pointdata?.name}> 
                        {pointdata?.name}
                    </option>
              ))}
            </select>

            <label className="" for="inlineFormSelectPref">Phone Name</label>

            <select data-mdb-select-init list="browsers3" class="select
                border border-gray-200 bg-gray-100 rounded-md py-2 px-3 hover:border-gray-400 focus:outline-none focus:border-gray-400 w-full"
                name="phone"
                value={phone}
                onChange={onChange}
            >
              <option>Phone Number</option>
                {data?.products?.map(( pointdata ) => (
                  <option  key={pointdata._id || index } value={pointdata?.phone}> 
                  {pointdata?.phone}
              </option>
              ))}
            </select>

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


        <button
          type="submit"
          className="my-2 px-4 py-2 text-center inline-block text-white bg-blue-600 border border-transparent rounded-md hover:bg-blue-700 w-full"
        >
          Create Points
        </button>
      </form>
    </section>
  );
};

export default Point;