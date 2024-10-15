"use client";
import React, { useContext, useState, useEffect } from "react";
import InstallmentContext from "../../../../context/InstallmentContext";
import axios from "axios";

const Installment = () => {
    const [data, setData] = useState(null)
    const [error, setError] = useState(null)
    const { newSecandPaidCreate , newInstallmentCreate} = useContext(InstallmentContext);



    // Fetch  customers
    useEffect(() => {
        async function fetchData() {
            try {
                const response = await axios.get('http://localhost:3000/api/admin/customer');
                setData(response.data);
            } catch (error) {
                setError('Failed to fetch data');
                console.error('Error fetching data:', error);
            }
        }
        fetchData();
    }, []);


    const [instllment, setInstllment] = useState({
        customerName: "",
        phone: "",
        cylinderSize: "",
        cylinderType: "",
        category: "",
        amount: "",
        installmentPaid: "",

    });

    const {
        customerName,
        phone,
        cylinderSize,
        cylinderType,
        category,
        amount,
        installmentPaid,
    } = instllment;

    const onChange = (e) => {
        setInstllment({ ...instllment, [e.target.name]: e.target.value });
    };


    const submitHandler = (e) => {
        e.preventDefault();
        newInstallmentCreate(instllment);
    };




    return (
        <section
            style={{ maxWidth: "700px" }}
            className="main2 mt-10 mb-20 p-4 md:p-7 mx-auto rounded bg-white shadow-lg">

            <h1 className=" mb-3 text-xl md:text-2xl font-semibold text-black">
                <a href="/admin/installment">Back</a>   Save Custamer &apos;s Installment
            </h1>

            <form onSubmit={submitHandler}>


                <label className="" for="inlineFormSelectPref">Customer Name</label>

                <select data-mdb-select-init list="browsers3" class="select
                border border-gray-200 bg-gray-100 rounded-md py-2 px-3 hover:border-gray-400 focus:outline-none focus:border-gray-400 w-full"
                    name="customerName"
                    value={customerName}
                    onChange={onChange}
                >
                    <option>Select Customer</option>
                    {data?.products?.map((custdata, index) => (
                        <option key={custdata?.id || index} value={custdata?.name}>
                            {custdata?.name}
                        </option>
                    ))}
                </select>
                <br /><br />
                <select data-mdb-select-init list="browsers3" class="select
                border border-gray-200 bg-gray-100 rounded-md py-2 px-3 hover:border-gray-400 focus:outline-none focus:border-gray-400 w-full"
                    name="phone"
                    value={phone}
                    onChange={onChange}
                >
                    <option>Select Customer</option>
                    {data?.products?.map((custdata) => (
                        <option key={custdata?.id || index} value={custdata?.phone}>
                            {custdata?.phone}
                        </option>
                    ))}
                </select>
                    <br/><br/>
                <select className="form-select" aria-label="Default select example"
                    name="cylinderType"
                    value={cylinderType}
                    onChange={onChange}
                >
                    <option>Select</option>
                    <option>Korgas</option>
                    <option>Mengas</option>
                    <option>Total</option>
                    <option>Oryx</option>
                    <option>Shell</option>
                    <option>Oilibya</option>
                    <option>K-gas</option>
                    <option>Hashi</option>
                    <option>Stabex</option>
                    <option>Easy</option>
                    <option>Lake</option>
                    <option>Mongas</option>
                    <option>Petgas</option>
                    <option>Others</option>
                </select><br />

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
                <br />

                <select class="form-select" aria-label="Default select example"
                    name="category"
                    value={category}
                    onChange={onChange}
                >
                    <option selected>Category</option>
                    <option value="refill">refill</option>
                    <option value="fullset">fullset</option>
                </select>
                <br />

                <div className="mb-4">
                    <label className="block mb-1"> Amount </label>
                    <input
                        type="text"
                        className="appearance-none border border-gray-200 bg-gray-100 rounded-md py-2 px-3 hover:border-gray-400 focus:outline-none focus:border-gray-400 w-full"
                        placeholder="Amount"
                        name="amount"
                        value={amount}
                        onChange={onChange}
                        required
                    />
                </div>

                <div className="mb-4">
                    <label className="block mb-1"> Installment Paid </label>
                    <input
                        type="text"
                        className="appearance-none border border-gray-200 bg-gray-100 rounded-md py-2 px-3 hover:border-gray-400 focus:outline-none focus:border-gray-400 w-full"
                        placeholder="installment Paid"
                        name="installmentPaid"
                        value={installmentPaid}
                        onChange={onChange}
                        required
                    />
                </div>
                <button
                    type="submit"
                    className="my-2 px-4 py-2 text-center inline-block text-white bg-blue-600 border border-transparent rounded-md hover:bg-blue-700 w-full"
                >
                    Create Customers
                </button>
            </form>
        </section>
    );
};

export default Installment;