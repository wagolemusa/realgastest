"use client";

import React, { useContext, useState, useEffect} from "react";
// import ExpenseContext from "../../../context/ExpenseContext";
import ExpenseContext from '../../../context/ExpenseContext';

const CreateExpense = () => {
  
  const { newexpenseCreate } = useContext(ExpenseContext);

  const [data, setData] = useState(null);
  const [error, setError] = useState(null)

  const [expense, setExpese] = useState({
    resaon: "",
    amount: "",
    person: "",
    date: "",
  });

  const { 
    resaon,
    amount,
    person,
    date} = expense;

  const onChange = (e) => {
    setExpese({ ...expense, [e.target.name]: e.target.value });
  };


  const submitHandler = (e) => {
    e.preventDefault();
    newexpenseCreate(expense);
  };


  return (
    <section 
            style={{ maxWidth: "700px" }}
            className="main2 mt-10 mb-20 p-4 md:p-7 mx-auto rounded bg-white shadow-lg">
            

            <h1 className=" mb-3 text-xl md:text-2xl font-semibold text-black">
                <a href="/admin/expense">Back</a> &nbsp;&nbsp;Make Expenses || &nbsp;&nbsp; <a href="/admin/expense/new">Create New Customer</a>
            </h1>

      <form onSubmit={submitHandler}>

        <div className="mb-4">
          <label className="block mb-1"> Resaon of payment </label>
          <input
            type="text"
            className="appearance-none border border-gray-200 bg-gray-100 rounded-md py-2 px-3 hover:border-gray-400 focus:outline-none focus:border-gray-400 w-full"
            placeholder="Resaon"
            name="resaon"
            value={resaon}
            onChange={onChange}
            required
          />
        </div>


        <div className="mb-4">
          <label className="block mb-1"> Amount </label>
          <input
            type="number"
            className="appearance-none border border-gray-200 bg-gray-100 rounded-md py-2 px-3 hover:border-gray-400 focus:outline-none focus:border-gray-400 w-full"
            placeholder="Cylinder Size"
            name="amount"
            value={amount}
            onChange={onChange}
            required
          />
        </div>

        <div className="mb-4">
          <label className="block mb-1">Who is taking the money </label>
          <input
            type="text"
            className="appearance-none border border-gray-200 bg-gray-100 rounded-md py-2 px-3 hover:border-gray-400 focus:outline-none focus:border-gray-400 w-full"
            placeholder="who is taking money"
            name="person"
            value={person}
            onChange={onChange}
        
          />
        </div>

        <div className="mb-4">
          <label className="block mb-1">Date</label>
          <input
            type="date"
            className="appearance-none border border-gray-200 bg-gray-100 rounded-md py-2 px-3 hover:border-gray-400 focus:outline-none focus:border-gray-400 w-full"
            placeholder="Date"
            name="date"
            value={date}
            onChange={onChange}
        
          />
        </div>

        <button
          type="submit"
          className="my-2 px-4 py-2 text-center inline-block text-white bg-blue-600 border border-transparent rounded-md hover:bg-blue-700 w-full"
        >
          Create Expenses
        </button>
      </form>
    </section>
  );
};

export default CreateExpense;