"use client";

import SealedContext from "../../../../context/SealedContext";
import React, { useContext, useState, useEffect } from "react";
import axios from "axios";

const CreateSeal = () => {
    const { newSealedCreate } = useContext(SealedContext);
    const [data, setData] = useState(null);
    const [error, setError] = useState(null)


    // Fetch branches
useEffect(() => {

    async function fetchData(){
        try{
            const response = await axios.get(`${process.env.ENVIRONMENT_URL}/api/admin/branch`);
            setData(response.data);
        } catch(error){
            setError('Failed to fetch data');
            console.error('Error fetching data:', error);
        }
    }

    fetchData();
  }, []);
  
    const [sealedcylinder, setSealedcylinder] = useState({
        cylinderSize: "",
        cylinderType: "",
        condition: "",
        sealnumber: "",
        branch: "",
    });

    const {
        cylinderType,
        cylinderSize,
        condition,
        sealnumber,
        branch} = sealedcylinder;

    const onChange = (e) => {
        setSealedcylinder({ ...sealedcylinder, [e.target.name]: e.target.value });
    };


    const submitHandler = (e) => {
        e.preventDefault();
        newSealedCreate(sealedcylinder);
    };


    return (
        <section
            style={{ maxWidth: "700px" }}
            className="main2 mt-10 mb-20 p-4 md:p-7 mx-auto rounded bg-white shadow-lg">

            <h1 className=" mb-3 text-xl md:text-2xl font-semibold text-black">
                <a href="/admin/customer">Back</a> &nbsp;&nbsp;Reccord cylinders with Seals
            </h1>

            <form onSubmit={submitHandler}>


                <select class="form-select" aria-label="Default select example"
                    name="cylinderSize"
                    value={cylinderSize}
                    onChange={onChange}
                >
                    <option selected>Cylinder Size</option>
                    <option value="3kgs">3</option>
                    <option value="6kgs">6</option>
                    <option value="12kgs">12</option>
                    <option value="12.5kgs">12.5</option>
                    <option value="13kgs">13</option>
                    <option value="15kgs">15</option>
                    <option value="25kgs">25</option>
                    <option value="45kgs">45</option>
                </select>
                <br />

                <select className="form-select" aria-label="Default select example"
                    name="cylinderType"
                    value={cylinderType}
                    onChange={onChange}
                >
                    <option>Cylinder Type</option>
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
                    name="condition"
                    value={condition}
                    onChange={onChange}
                >
                    <option selected>Cylinders Condition</option>
                    <option>very-new</option>
                    <option>new</option>
                    <option>nice</option>
                    <option>old</option>
                    <option>very-old</option>
                </select>


                <div className="mb-4">
                    <label className="block mb-1"> sealnumber </label>
                    <input
                        type="text"
                        className="appearance-none border border-gray-200 bg-gray-100 rounded-md py-2 px-3 hover:border-gray-400 focus:outline-none focus:border-gray-400 w-full"
                        placeholder="sealnumber"
                        name="sealnumber"
                        value={sealnumber}
                        onChange={onChange}
                        required
                    />
                </div>

                <label className="" for="inlineFormSelectPref">Shop branch Name</label>
                <select data-mdb-select-init list="browsers3" class="select
              border border-gray-200 bg-gray-100 rounded-md py-2 px-3 hover:border-gray-400 focus:outline-none focus:border-gray-400 w-full"
                    name="branch"
                    value={branch}
                    onChange={onChange}
                >
                    <option>Select branch</option>
                    {data?.branch?.map((pointdata, index) => (
                        <option key={pointdata?.id || index} value={pointdata?.branchName}>
                            {pointdata?.branchName}
                        </option>
                    ))}
                </select>

                <button
                    type="submit"
                    className="my-2 px-4 py-2 text-center inline-block text-white bg-blue-600 border border-transparent rounded-md hover:bg-blue-700 w-full"
                >
                    Create Cylinders
                </button>
            </form>
        </section>
    );
};

export default CreateSeal;