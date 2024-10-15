'use client'

import React, { useState, useEffect} from "react";
import { useRouter } from "next/navigation";
import axios from "axios";

const NewSold = () => {
    const [data, setData] = useState(null);
    const [nameaccessory, setNameaccessory] = useState('')
    const [quantity, setQuantity] = useState('')
    const [amount, setAmount] = useState('')
    const [date, setDate] = useState('')
    const [error, setError] = useState("");

    const router = useRouter();

    const handleSave = async (e) => {
        e.preventDefault();
        setError(null);

        const createSell = {
            nameaccessory,
            quantity,
            amount,
            date
        }
        try {
            const response = await axios.post(`${process.env.ENVIRONMENT_URL}/api/admin/sold`, createSell, {  
            headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                }
            });
            if (response.status === 201) {
                window.location.replace("/admin/sold");
            }

            setSuccess(response.data.message);
        } catch (err) {
            if (err.response) {
                setError(err.response.data.message);
            } else {
                setError(err.message);
            }
        }
    }


    // Fetch Accessories
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
        <a href="/admin/sold">Back</a> &nbsp;&nbsp;
      </h1>

            <form onSubmit={handleSave}>

            <label className="" for="inlineFormSelectPref">Accessory Name</label>
                <select data-mdb-select-init list="browsers3" class="select
                    border border-gray-200 bg-gray-100 rounded-md py-2 px-3 hover:border-gray-400 focus:outline-none focus:border-gray-400 w-full"
                    name="nameaccesory"
                    value={nameaccessory}
                    onChange={(e) => setNameaccessory(e.target.value)}
                    required
                >
                    <option>Select branch</option>
                    {data?.accessories?.map(( accessdata, index ) => (
                  <option key={accessdata?.id || index} value={accessdata?.name}>
                  {accessdata?.name}
                </option>
                    ))}
                </select>

                

                <div className="mb-4">
                    <label className="block mb-1"> Quantity</label>
                    <input
                        type="text"
                        className="appearance-none border border-gray-200 bg-gray-100 rounded-md py-2 px-3 hover:border-gray-400 focus:outline-none focus:border-gray-400 w-full"
                        placeholder="Quantity"
                        name="quantity"
                        value={quantity}
                        onChange={(e) => setQuantity(e.target.value)}
                        required
                    />
                </div>
                <div className="mb-4">
                    <label className="block mb-1"> Amount</label>
                    <input
                        type="number"
                        className="appearance-none border border-gray-200 bg-gray-100 rounded-md py-2 px-3 hover:border-gray-400 focus:outline-none focus:border-gray-400 w-full"
                        placeholder="Amount"
                        name="amount"
                        value={amount}
                        onChange={(e) => setAmount(e.target.value)}
                        required
                    />
                </div>
                <div className="mb-4">
                    <label className="block mb-1"> Date</label>
                    <input
                        type="date"
                        className="appearance-none border border-gray-200 bg-gray-100 rounded-md py-2 px-3 hover:border-gray-400 focus:outline-none focus:border-gray-400 w-full"
                        placeholder="Date"
                        name="date"
                        value={date}
                        onChange={(e) => setDate(e.target.value)}
                        required
                    />
                </div>
                <button
                    type="submit"
                    className="my-2 px-4 py-2 text-center inline-block text-white bg-blue-600 border border-transparent rounded-md hover:bg-blue-700 w-full"
                >
                    Create Sales
                </button>
            </form>
        </section>
    )
}

export default NewSold;