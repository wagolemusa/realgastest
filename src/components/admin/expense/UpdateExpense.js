"use client";
import React, { useContext, useState, useEffect } from "react";
import ExpenseContext from "../../../context/ExpenseContext";
import axios from "axios";

const UpdateExpenses = ({ data, id}) => {

    const [error, setError] = useState(null)

    const { updateExpensedata } = useContext(ExpenseContext);

    const [expensedata, setExpensedata] = useState({
    
        resaon: data?.resaon,
        amount: data?.amount,
        person: data?.person,
        date: data?.date,
    });

    const {
        resaon,
        amount,
        person,
        date,
    } = expensedata;

    const onChange = (e) => {
        setExpensedata({ ...expensedata, [e.target.name]: e.target.value });
    };


    const submitHandler = (e) => {
        e.preventDefault();
        updateExpensedata(expensedata, data?._id);
    };


    return (
        <section
            style={{ maxWidth: "700px" }}
            className="main2 mt-10 mb-20 p-4 md:p-7 mx-auto rounded bg-white shadow-lg">

            <h1 className=" mb-3 text-xl md:text-2xl font-semibold text-black">
                <a href="/admin/expense">Back</a> &nbsp;&nbsp;Expense
            </h1>

            <form onSubmit={submitHandler}>


            <div className="mb-4">
                    <label className="block mb-1"> Resaon</label>
                    <input
                        type="text"
                        className="appearance-none border border-gray-200 bg-gray-100 rounded-md py-2 px-3 hover:border-gray-400 focus:outline-none focus:border-gray-400 w-full"
                        placeholder=""
                        name="resaon"
                        value={resaon}
                        onChange={onChange}
                    />
                </div>

                <br /><br />
                <div className="mb-4">
                    <label className="block mb-1"> Amount </label>
                    <input
                        type="text"
                        className="appearance-none border border-gray-200 bg-gray-100 rounded-md py-2 px-3 hover:border-gray-400 focus:outline-none focus:border-gray-400 w-full"
                        placeholder=""
                        name="amount"
                        value={amount}
                        onChange={onChange}
                        
                    />
                </div>

                    <br/><br/>
                    <div className="mb-4">
                    <label className="block mb-1"> Person</label>
                    <input
                        type="text"
                        className="appearance-none border border-gray-200 bg-gray-100 rounded-md py-2 px-3 hover:border-gray-400 focus:outline-none focus:border-gray-400 w-full"
                        placeholder=""
                        name="person"
                        value={person}
                        onChange={onChange}
                      
                    />
                </div>


                <div className="mb-4">
                    <label className="block mb-1"> Date</label>
                    <input
                        type="date"
                        className="appearance-none border border-gray-200 bg-gray-100 rounded-md py-2 px-3 hover:border-gray-400 focus:outline-none focus:border-gray-400 w-full"
                        placeholder=""
                        name="date"
                        value={date}
                        onChange={onChange}
                        required
                    />
                </div>

           
                <button
                    type="submit"
                    className="my-2 px-4 py-2 text-center inline-block text-white bg-blue-600 border border-transparent rounded-md hover:bg-blue-700 w-full"
                >
                    Update Expense
                </button>
            </form>
        </section>
    );
};

export default UpdateExpenses;