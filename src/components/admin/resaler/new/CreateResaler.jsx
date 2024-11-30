"use client";

import ResalerContext from "../../../../context/ResalerContext";
import React, { useContext, useState } from "react";

const Createresaler = () => {
  const { newResalerCreate } = useContext(ResalerContext);

  
  
  const [resaler, setResaler] = useState({
    businessname: "",
    phone: "",
    whatsup: "",
    district: "",
    town: "",
    price: "",
  });

  const { 
    businessname,
    phone,
    whatsup,
    district,
    town,
    price
} = resaler;

  const onChange = (e) => {
    setResaler({ ...resaler, [e.target.name]: e.target.value });
  };


  const submitHandler = (e) => {
    e.preventDefault();
    newResalerCreate(resaler);
  };
  

  return (
    <section 
    style={{ maxWidth: "700px" }}
    className="main2 mt-10 mb-20 p-4 md:p-7 mx-auto rounded bg-white shadow-lg">

      <h1 className=" mb-3 text-xl md:text-2xl font-semibold text-black">
        <a href="/admin/resaler">Back</a> &nbsp;&nbsp;Create New Resaler
      </h1>

      <form onSubmit={submitHandler}>
        <div className="mb-4">
          <label className="block mb-1">Business Name </label>
          <input
            type="text"
            className="appearance-none border border-gray-200 bg-gray-100 rounded-md py-2 px-3 hover:border-gray-400 focus:outline-none focus:border-gray-400 w-full"
            placeholder="Product name"
            name="businessname"
            value={businessname}
            onChange={onChange}
            required
          />
        </div>
        <div className="mb-4">
          <label className="block mb-1"> Price </label>
          <input
            type="number"
            className="appearance-none border border-gray-200 bg-gray-100 rounded-md py-2 px-3 hover:border-gray-400 focus:outline-none focus:border-gray-400 w-full"
            placeholder="Price"
            name="price"
            value={price}
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
          <label className="block mb-1"> Whatsup Number </label>
          <input
            type="text"
            className="appearance-none border border-gray-200 bg-gray-100 rounded-md py-2 px-3 hover:border-gray-400 focus:outline-none focus:border-gray-400 w-full"
            placeholder="Whats Number"
            name="whatsup"
            value={whatsup}
            onChange={onChange}
            required
          />
        </div>

        <div className="mb-4">
          <label className="block mb-1">District </label>
          <input
            type="text"
            className="appearance-none border border-gray-200 bg-gray-100 rounded-md py-2 px-3 hover:border-gray-400 focus:outline-none focus:border-gray-400 w-full"
            placeholder="District"
            name="district"
            value={district}
            onChange={onChange}
            required
          />
        </div>

        <div className="mb-4">
          <label className="block mb-1">Town</label>
          <input
            type="text"
            className="appearance-none border border-gray-200 bg-gray-100 rounded-md py-2 px-3 hover:border-gray-400 focus:outline-none focus:border-gray-400 w-full"
            placeholder="Town"
            name="town"
            value={town}
            onChange={onChange}
            required
          />
        </div>
   

        <button
          type="submit"
          className="my-2 px-4 py-2 text-center inline-block text-white bg-blue-600 border border-transparent rounded-md hover:bg-blue-700 w-full"
        >
          Create Resaler
        </button>
      </form>
    </section>
  );
};

export default Createresaler;