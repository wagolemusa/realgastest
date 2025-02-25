
"use client";

import EmployeeContext from "../../../context/EmployeesContext";
import React, { useContext, useState } from "react";

const NewEmployee = () => {
  const { newEmplyeeCreate } = useContext(EmployeeContext)
  
  const [employee, setEmployee] = useState({
    firstname: "",
    lastname: "",
    phone: "",
    location: "",
    sex: "",
    salary: "",
    idnumber: "",
    nextOfKinName: "",
    nextOfKinPhone: ""
  });

  const { 
    firstname,
    lastname,
    phone,
    location,
    sex,
    salary,
    idnumber, 
    nextOfKinName,
    nextOfKinPhone
    } = employee;

  const onChange = (e) => {
    setEmployee({ ...employee, [e.target.name]: e.target.value });
  };


  const submitHandler = (e) => {
    e.preventDefault();
    newEmplyeeCreate(employee);
  };
  

  return (
    <section 
    style={{ maxWidth: "700px" }}
    className="main2 mt-10 mb-20 p-4 md:p-7 mx-auto rounded bg-white shadow-lg">

      <h1 className=" mb-3 text-xl md:text-2xl font-semibold text-black">
        <a href="/admin/employee">Back</a> &nbsp;&nbsp;Employees
      </h1>

      <form onSubmit={submitHandler}>
        <div className="mb-4">
          <label className="block mb-1"> FirstName </label>
          <input
            type="text"
            className="appearance-none border border-gray-200 bg-gray-100 rounded-md py-2 px-3 hover:border-gray-400 focus:outline-none focus:border-gray-400 w-full"
            placeholder="Firstname"
            name="firstname"
            value={firstname}
            onChange={onChange}
            required
          />
        </div>

        <div className="mb-4">
          <label className="block mb-1"> Lastname </label>
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
            type="number"
            className="appearance-none border border-gray-200 bg-gray-100 rounded-md py-2 px-3 hover:border-gray-400 focus:outline-none focus:border-gray-400 w-full"
            placeholder="Phone"
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
            placeholder="Sex"
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
          <label className="block mb-1"> ID Number</label>
          <input
            type="number"
            className="appearance-none border border-gray-200 bg-gray-100 rounded-md py-2 px-3 hover:border-gray-400 focus:outline-none focus:border-gray-400 w-full"
            placeholder="ID Number"
            name="idnumber"
            value={idnumber}
            onChange={onChange}
            required
          />
        </div>
        <div className="mb-4">
          <label className="block mb-1"> Next-Of-Kin-Name </label>
          <input
            type="text"
            className="appearance-none border border-gray-200 bg-gray-100 rounded-md py-2 px-3 hover:border-gray-400 focus:outline-none focus:border-gray-400 w-full"
            placeholder="Next-Of-Kin-Name"
            name="nextOfKinName"
            value={nextOfKinName}
            onChange={onChange}
            required
          />
        </div>
 
        <div className="mb-4 mt-5">
          <label className="block mb-1"> Next-Of-Kin-Phone </label>
          <input
            type="text"
            className="appearance-none border border-gray-200 bg-gray-100 rounded-md py-2 px-3 hover:border-gray-400 focus:outline-none focus:border-gray-400 w-full"
            placeholder="Paste Map Url or Codinates"
            name="nextOfKinPhone"
            value={nextOfKinPhone}
            onChange={onChange}
            
          ></input>
        </div>

        <button
          type="submit"
          className="my-2 px-4 py-2 text-center inline-block text-white bg-blue-600 border border-transparent rounded-md hover:bg-blue-700 w-full"
        >
          Create Employee
        </button>
      </form>
    </section>
  );
};

export default NewEmployee;