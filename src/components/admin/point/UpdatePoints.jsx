"use client";
import React, { useContext, useState, useEffect } from "react";
import PointContext from "../../../context/PointContext"
import axios from "axios";

const UpdatePoints = ({ data, id}) => {

    const [error, setError] = useState(null)

    const { updatePointsData } = useContext(PointContext);

    const [pointdata, setPointdata] = useState({
    
        customerName: data?.customerName,
        phone: data?.phone,
        cylinderSize: data?.cylinderSize,
        cylinderType: data?.cylinderType,
        points: data?.points,
    });

    const {
        customerName,
        phone,
        cylinderSize,
        cylinderType,
        points,
    } = pointdata;

    const onChange = (e) => {
        setPointdata({ ...pointdata, [e.target.name]: e.target.value });
    };


    const submitHandler = (e) => {
        e.preventDefault();
        updatePointsData(pointdata, data?._id);
    };


    return (
        <section
            style={{ maxWidth: "700px" }}
            className="main2 mt-10 mb-20 p-4 md:p-7 mx-auto rounded bg-white shadow-lg">

            <h1 className=" mb-3 text-xl md:text-2xl font-semibold text-black">
                <a href="/admin/points">Back</a> &nbsp;&nbsp;Redeem Points
            </h1>

            <form onSubmit={submitHandler}>


            <div className="mb-4">
                    <label className="block mb-1"> Customer NAme </label>
                    <input
                        type="text"
                        className="appearance-none border border-gray-200 bg-gray-100 rounded-md py-2 px-3 hover:border-gray-400 focus:outline-none focus:border-gray-400 w-full"
                        placeholder=""
                        name="customerName"
                        value={customerName}
                        onChange={onChange}
                        required
                    />
                </div>

                <br /><br />
                <div className="mb-4">
                    <label className="block mb-1"> Phone </label>
                    <input
                        type="text"
                        className="appearance-none border border-gray-200 bg-gray-100 rounded-md py-2 px-3 hover:border-gray-400 focus:outline-none focus:border-gray-400 w-full"
                        placeholder=""
                        name="phone"
                        value={phone}
                        onChange={onChange}
                        required
                    />
                </div>

                    <br/><br/>
                    <div className="mb-4">
                    <label className="block mb-1"> Cylinder Type </label>
                    <input
                        type="text"
                        className="appearance-none border border-gray-200 bg-gray-100 rounded-md py-2 px-3 hover:border-gray-400 focus:outline-none focus:border-gray-400 w-full"
                        placeholder=""
                        name="cylinderType"
                        value={cylinderType}
                        onChange={onChange}
                        required
                    />
                </div>


                <div className="mb-4">
                    <label className="block mb-1"> Cylinder Size </label>
                    <input
                        type="text"
                        className="appearance-none border border-gray-200 bg-gray-100 rounded-md py-2 px-3 hover:border-gray-400 focus:outline-none focus:border-gray-400 w-full"
                        placeholder=""
                        name="cylinderSize"
                        value={cylinderSize}
                        onChange={onChange}
                        required
                    />
                </div>


                <div className="mb-4">
                    <label className="block mb-1"> Ponts</label>
                    <input
                        type="text"
                        className="appearance-none border border-gray-200 bg-gray-100 rounded-md py-2 px-3 hover:border-gray-400 focus:outline-none focus:border-gray-400 w-full"
                        placeholder=""
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
                    Redeem Points
                </button>
            </form>
        </section>
    );
};

export default UpdatePoints;