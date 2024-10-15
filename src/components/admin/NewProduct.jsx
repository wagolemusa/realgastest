"use client";

import ProductContext from "../../context/ProductContext"
import React, { useContext, useState, useEffect } from "react";
import axios from "axios";

const NewProduct = () => {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const { newProduct } = useContext(ProductContext);

  const [product, setProduct] = useState({
    name: "",
    description: "",
    price: "",
    size: "",
    discount: "",
    category: "",
  });

  const { name,  description, price, size, discount, category } = product;

  const onChange = (e) => {
    setProduct({ ...product, [e.target.name]: e.target.value });
  };


  const submitHandler = (e) => {
    e.preventDefault();2
    newProduct(product);
  };
  
  useEffect(() => {
    async function fetchData(){
        try{
            const response = await axios.get(`${process.env.ENVIRONMENT_URL}/api/admin/accessory`);
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
        <a href="/admin/products">Back</a>   Post Accessories on the web
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

        <select data-mdb-select-init list="browsers3" class="select
              border border-gray-200 bg-gray-100 rounded-md py-2 px-3 hover:border-gray-400 focus:outline-none focus:border-gray-400 w-full"
                name="category"
                value={category}
                onChange={onChange}
                required
              >
              <option>Select category</option>
                {data?.accessories?.map(( accessdata, index ) => (
              <option key={accessdata?.id || index} value={accessdata?.name}>
                {accessdata?.name}
              </option>
             ))}
          </select>


        <div className="grid md:grid-cols-2 gap-x-2 mt-2">
          <div className="mb-4">
            <label className="block mb-1"> Price </label>
            <div className="relative">
              <div className="col-span-2">
                <input
                  type="text"
                  className="appearance-none border border-gray-200 bg-gray-100 rounded-md py-2 px-3 hover:border-gray-400 focus:outline-none focus:border-gray-400 w-full"
                  placeholder="0.00"
                  name="price"
                  value={price}
                  onChange={onChange}
                  required
                />
              </div>
            </div>
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-x-2 mt-2">
          <div className="mb-4">
            <label className="block mb-1"> Discount </label>
            <div className="relative">
              <div className="col-span-2">
                <input
                  type="text"
                  className="appearance-none border border-gray-200 bg-gray-100 rounded-md py-2 px-3 hover:border-gray-400 focus:outline-none focus:border-gray-400 w-full"
                  placeholder="0.00"
                  name="discount"
                  value={discount}
                  onChange={onChange}
                  required
                />
              </div>
            </div>
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-x-2 mt-2">
          <div className="mb-4">
            <label className="block mb-1"> Size </label>
            <div className="relative">
              <div className="col-span-2">
                <input
                  type="text"
                  className="appearance-none border border-gray-200 bg-gray-100 rounded-md py-2 px-3 hover:border-gray-400 focus:outline-none focus:border-gray-400 w-full"
                  placeholder="0.00"
                  name="size"
                  value={size}
                  onChange={onChange}
                  required
                />
              </div>
            </div>
          </div>
        </div>

        <div className="mb-4 mt-2">
          <label className="block mb-1"> Description </label>
          <textarea
            rows="4"
            className="appearance-none border border-gray-200 bg-gray-100 rounded-md py-2 px-3 hover:border-gray-400 focus:outline-none focus:border-gray-400 w-full"
            placeholder="Product description"
            name="description"
            value={description}
            onChange={onChange}
            required
          ></textarea>
        </div>

        <button
          type="submit"
          className="my-2 px-4 py-2 text-center inline-block text-white bg-blue-600 border border-transparent rounded-md hover:bg-blue-700 w-full"
        >
          Create Product
        </button>
      </form>
    </section>
  );
};

export default NewProduct;