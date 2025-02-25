"use client";
import EmployeeContext from "../../../context/EmployeesContext";

import React, {useEffect, useContext, useState } from "react";
import { toast } from "react-toastify";

const UpdateEmployeePage = ({ data, id }) => {
    
  const {updateEmployee, updated, setUpdated, error } = useContext(EmployeeContext);


  const [employee, setEmployee] = useState({
    firstname: data?.firstname,
    lastname: data?. lastname,
    location: data?. location,
    phone: data?.phone,
    sex: data?.sex,
    salary: data?.salary,
    idnumber: data?.idnumber,
    nextOfKinName: data?.nextOfKinName,
    nextOfKinPhone: data?.nextOfKinPhone,
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
    lastname,
    firstname,
    location,
    phone,
    sex,
    salary,
    idnumber,
    nextOfKinName, 
    nextOfKinPhone} = employee;

  const onChange = (e) => {
    setEmployee({ ...employee, [e.target.name]: e.target.value });
  };

  const submitHandler = (e) => {
    e.preventDefault();
    updateEmployee(employee, data?._id);
  };
  
  
  return (
    <section 
    style={{ maxWidth: "700px" }}
    className="main2 mt-10 mb-20 p-4 md:p-7 mx-auto rounded bg-white shadow-lg">

      <h1 className=" mb-3 text-xl md:text-2xl font-semibold text-black">
        <a href="/admin/customer">Back</a> &nbsp;&nbsp;Update Employee
      </h1>

      <form onSubmit={submitHandler}>
        <div className="mb-4">
          <label className="block mb-1"> FirstName </label>
          <input
            type="text"
            className="appearance-none border border-gray-200 bg-gray-100 rounded-md py-2 px-3 hover:border-gray-400 focus:outline-none focus:border-gray-400 w-full"
            placeholder="FirstName"
            name="firstname"
            value={firstname}
            onChange={onChange}
            required
          />
        </div>

        <div className="mb-4">
          <label className="block mb-1"> LastName </label>
          <input
            type="text"
            className="appearance-none border border-gray-200 bg-gray-100 rounded-md py-2 px-3 hover:border-gray-400 focus:outline-none focus:border-gray-400 w-full"
            placeholder="Lastname"
            name="lastname"
            value={lastname}
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

        <div className="mb-4">
          <label className="block mb-1"> Sex </label>
          <input
            type="text"
            className="appearance-none border border-gray-200 bg-gray-100 rounded-md py-2 px-3 hover:border-gray-400 focus:outline-none focus:border-gray-400 w-full"
            placeholder="sex"
            name="sex"
            value={sex}
            onChange={onChange}
            required
          />
        </div>

        <div className="mb-4">
          <label className="block mb-1"> Salary </label>
          <input
            type="text"
            className="appearance-none border border-gray-200 bg-gray-100 rounded-md py-2 px-3 hover:border-gray-400 focus:outline-none focus:border-gray-400 w-full"
            placeholder="Salary"
            name="salary"
            value={salary}
            onChange={onChange}
            required
          />
        </div>


        <div className="mb-4">
          <label className="block mb-1"> ID Number </label>
          <input
            type="text"
            className="appearance-none border border-gray-200 bg-gray-100 rounded-md py-2 px-3 hover:border-gray-400 focus:outline-none focus:border-gray-400 w-full"
            placeholder="ID Number"
            name="idnumber"
            value={idnumber}
            onChange={onChange}
            required
          />
        </div>


        <div className="mb-4">
          <label className="block mb-1">Next-Of-Kin-Name </label>
          <input
            type="text"
            className="appearance-none border border-gray-200 bg-gray-100 rounded-md py-2 px-3 hover:border-gray-400 focus:outline-none focus:border-gray-400 w-full"
            placeholder="next-Of-Kin-Name"
            name="nextOfKinName"
            value={nextOfKinName}
            onChange={onChange}
            required
          />
        </div>
        <div className="mb-4">
          <label className="block mb-1"> Next-Of-Kin-Phone </label>
          <input
            type="text"
            className="appearance-none border border-gray-200 bg-gray-100 rounded-md py-2 px-3 hover:border-gray-400 focus:outline-none focus:border-gray-400 w-full"
            placeholder="Numbers of Days"
            name="nextOfKinPhone"
            value={nextOfKinPhone}
            onChange={onChange}
            required
          />
        </div>

        <button
          type="submit"
          className="my-2 px-4 py-2 text-center inline-block text-white bg-blue-600 border border-transparent rounded-md hover:bg-blue-700 w-full"
        >
          Update Employee
        </button>
      </form>
    </section>
  );
};

export default UpdateEmployeePage;