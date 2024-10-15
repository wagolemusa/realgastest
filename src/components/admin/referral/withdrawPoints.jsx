"use client";
import React, {useEffect, useContext, useState } from "react";
import { toast } from "react-toastify";
import ReferralContext from "../../../context/RefarralContext"



const UpdateCustomePage = ({ data, id}) => {
  const {updateReferral, updated, setUpdated, error } = useContext(ReferralContext);


  const [referral, setReferral] = useState({
    points: data?.points,

   
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
    points,
 } = referral;

  const onChange = (e) => {
    setReferral({ ...referral, [e.target.name]: e.target.value });
  };


  const submitHandler = (e) => {
    e.preventDefault();
    updateReferral(referral, data?._id);
  };
  

  return (
    <section 
    style={{ maxWidth: "700px" }}
    className="main2 mt-10 mb-20 p-4 md:p-7 mx-auto rounded bg-white shadow-lg">

      <h1 className=" mb-3 text-xl md:text-2xl font-semibold text-black">
        <a href="/admin/referral">Back</a> &nbsp;&nbsp;
      </h1>

      <form onSubmit={(e) => submitHandler(e, data)}>
        <div className="mb-4">
          <label className="block mb-1"> Withdraw </label>
          <input
            type="text"
            className="appearance-none border border-gray-200 bg-gray-100 rounded-md py-2 px-3 hover:border-gray-400 focus:outline-none focus:border-gray-400 w-full"
            name="points"
            value={points}
            onChange={onChange}
            required
          />
        </div>
  
        <button
          type="submit"
          className="my-2 px-4 py-2 text-center inline-block text-white bg-blue-600 border border-transparent rounded-md hover:bg-blue-700 w-full"
        >
          Withdraw Points
        </button>
      </form>
    </section>
  );
};

export default UpdateCustomePage;