"use client";

import GasContext from "../../../context/GasContext";
import React, { useContext, useState } from "react";
import { useRouter } from "next/navigation";

const NewGas = () => {
  const { newGasCreate } = useContext(GasContext);

  const router = useRouter();

  const [product, setProduct] = useState({
    productName: "",
    cylinderSize: "",
    category: "",
    price: "",
    discount: "",
  });

  const {productName, cylinderSize, category, price, discount } = product;

  const onChange = (e) => {
    setProduct({ ...product, [e.target.name]: e.target.value });
  };


  const submitHandler = (e) => {
    e.preventDefault();
    newGasCreate(product);
    router.replace("/admin/gas")
  };
  

  return (
    <section

    style={{ maxWidth: "700px" }}
    className="main2 mt-10 mb-20 p-4 md:p-7 mx-auto rounded bg-white shadow-lg">

      <h1 className=" mb-3 text-xl md:text-2xl font-semibold text-black">
        <a href="/admin/gas">Back</a> &nbsp;&nbsp;Create Gas
      </h1>

      <form onSubmit={submitHandler}>
        <div className="mb-4">
          <label className="block mb-1"> Cylinder Title </label>
          <input
            type="text"
            className="appearance-none border border-gray-200 bg-gray-100 rounded-md py-2 px-3 hover:border-gray-400 focus:outline-none focus:border-gray-400 w-full"
            placeholder="Cylinder Title"
            name="productName"
            value={productName}
            onChange={onChange}
            required
          />
        </div>
       

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

        <select class="form-select" aria-label="Default select example"
            name="category"
            value={category}
            onChange={onChange}
        >
            <option selected>Category</option>
            <option value="Refill">Refill</option>
            <option value="Full Set">Full Set</option>
        </select>

        <div className="grid md:grid-cols-2 gap-x-2 mt-3">
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
          <div className="grid md:grid-cols-2 gap-x-2 mt-3">
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
        <button
          type="submit"
          className="my-2 px-4 py-2 text-center inline-block text-white bg-blue-600 border border-transparent rounded-md hover:bg-blue-700 w-full"
        >
          Create Gas
        </button>
      </form>
    </section>
  );
};

export default NewGas;