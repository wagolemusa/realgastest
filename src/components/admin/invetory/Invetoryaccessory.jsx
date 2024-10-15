'use client'

import React, { useContext, useEffect, useState } from "react";
import InvetoryContext from '../../../context/InvetoryContext'
import axios from "axios";

import { useRouter } from "next/navigation";
 
const Invetory = () => {

    const [data, setData] = useState(null);
    const [error, setError] = useState(null);
    const { newInvetoryCreate } = useContext(InvetoryContext);
    const [nameaccessory, setNameaccessory] = useState('')
    const [amount, setAmount] = useState('')
    const [added_stock, setAdded_stock] = useState('')

    const router = useRouter();

    const submitHandler = (e) => {
        e.preventDefault();
        const createBranch = {
            nameaccessory,
            amount,
            added_stock,
        }
        newInvetoryCreate(createBranch)
        router.replace("/admin/invetory")
    }


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
                    <a href="/admin/invetory">Back</a> &nbsp;&nbsp;
                </h1>
            <form onSubmit={submitHandler}>


         <label className="" for="inlineFormSelectPref">Accessory Name</label>
                <select data-mdb-select-init list="browsers3" class="select
                    border border-gray-200 bg-gray-100 rounded-md py-2 px-3 hover:border-gray-400 focus:outline-none focus:border-gray-400 w-full"
                    name="nameaccesory"
                    value={nameaccessory}
                    onChange={(e) => setNameaccessory(e.target.value)}
                    required
                >
                   <option>Select category</option>
                    {data?.accessories?.map(( accessdata, index ) => (
                    <option key={accessdata?.id || index} value={accessdata?.name}>
                    {accessdata?.name}
                    </option>
                    ))}
                </select>

                <div className="mb-4">
                    <label className="block mb-1"> Amount</label>
                    <input
                        type="text"
                        className="appearance-none border border-gray-200 bg-gray-100 rounded-md py-2 px-3 hover:border-gray-400 focus:outline-none focus:border-gray-400 w-full"
                        placeholder="Amount"
                        name="amount"
                        value={amount}
                        onChange={(e) => setAmount(e.target.value)}
                        required
                    />
                </div>
                <div className="mb-4">
                    <label className="block mb-1">Quantity</label>
                    <input
                        type="text"
                        className="appearance-none border border-gray-200 bg-gray-100 rounded-md py-2 px-3 hover:border-gray-400 focus:outline-none focus:border-gray-400 w-full"
                        placeholder="Quantity"
                        name="added_stock"
                        value={added_stock}
                        onChange={(e) => setAdded_stock(e.target.value)}
                        required
                    />
                </div>

                <button
                    type="submit"
                    className="my-2 px-4 py-2 text-center inline-block text-white bg-blue-600 border border-transparent rounded-md hover:bg-blue-700 w-full"
                >
                    Create Accessory
                </button>
            </form>
        </section>
    )
}

export default Invetory;