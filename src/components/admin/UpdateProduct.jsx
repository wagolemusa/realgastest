"use client";

import { toast } from "react-toastify";
import ProductContext from "../../context/ProductContext"
import React, { useContext, useEffect, useState } from "react";

const UpdateProduct = ({data, id} ) => {
  const { updateProduct, error, updated, setUpdated, clearErrors } = useContext(ProductContext);

  const [product, setProduct] = useState({
    name: data?.name,
    description: data?.description,
    price: data?.price,
   
  });

  useEffect(() => {
    if(updated){
        toast.success('Product Updated')
        setUpdated(false)
    }
    if(error) {
        toast.error(error)
        clearErrors()
    }
  }, [error, updated, setUpdated, clearErrors])


  const { name, description, price  } = product;

  const onChange = (e) => {
    setProduct({ ...product, [e.target.name]: e.target.value });
  };

  

  const submitHandler = (e) => {
    e.preventDefault();
    updateProduct(product, data?._id);
  };
  

  return (
    <section className="container max-w-3xl p-6 mx-auto">
      <h1 className="mb-3 text-xl md:text-3xl font-semibold text-black mb-8">
      update Product
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
        
        <div className="grid md:grid-cols-2 gap-x-2 mt-5">
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

        <div className="mb-4 mt-5">
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
          Update Product
        </button>
      </form>
    </section>
  );
};

export default UpdateProduct;