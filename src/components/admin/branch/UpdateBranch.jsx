"use client";
import MainContext from "../../../context/MainContext";
import React, {useEffect, useContext, useState } from "react";
import { toast } from "react-toastify";

const UpdateBranch = ({ data, id }) => {
    
  const {updateBranchdata, updated, setUpdated, error } = useContext(MainContext);

  const [branch, setBranch] = useState({
    branchName: data?.branchName,
    employee: data?.employee,
    location: data?.location,
   
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
    branchName,
    employee,
    location} = branch;

  const onChange = (e) => {
    setBranch({ ...branch, [e.target.name]: e.target.value });
  };

  const submitHandler = (e) => {
    e.preventDefault();
    updateBranchdata(branch, data?._id);
  };
  
  
  return (
    <section 
    style={{ maxWidth: "700px" }}
    className="main2 mt-10 mb-20 p-4 md:p-7 mx-auto rounded bg-white shadow-lg">

      <h1 className=" mb-3 text-xl md:text-2xl font-semibold text-black">
        <a href="/admin/branch">Back</a> &nbsp;&nbsp;Update  Branch
      </h1>

      <form onSubmit={submitHandler}>
        <div className="mb-4">
          <label className="block mb-1"> Branch Name </label>
          <input
            type="text"
            className="appearance-none border border-gray-200 bg-gray-100 rounded-md py-2 px-3 hover:border-gray-400 focus:outline-none focus:border-gray-400 w-full"
            placeholder="Branch Name"
            name="branchName"
            value={branchName}
            onChange={onChange}
            required
          />
        </div>

        <div className="mb-4">
          <label className="block mb-1"> Employee </label>
          <input
            type="text"
            className="appearance-none border border-gray-200 bg-gray-100 rounded-md py-2 px-3 hover:border-gray-400 focus:outline-none focus:border-gray-400 w-full"
            placeholder="Employee"
            name="employee"
            value={employee}
            onChange={onChange}
            required
          />
        </div>


        <div className="mb-4 mt-5">
          <label className="block mb-1"> Describe Location </label>
          <textarea
            rows="4"
            className="appearance-none border border-gray-200 bg-gray-100 rounded-md py-2 px-3 hover:border-gray-400 focus:outline-none focus:border-gray-400 w-full"
            placeholder="Describe Location"
            name="location"
            value={location}
            onChange={onChange}
            required
          ></textarea>
        </div>

        <button
          type="submit"
          className="my-2 px-4 py-2 text-center inline-block text-white bg-blue-600 border border-transparent rounded-md hover:bg-blue-700 w-full"
        >
          Update Branch
        </button>
      </form>
    </section>
  );
};

export default UpdateBranch