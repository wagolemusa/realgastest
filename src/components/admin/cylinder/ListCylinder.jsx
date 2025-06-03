'use client'

import React, { useState, useEffect, Suspense, } from "react";
import Link from "next/link";
import CustromPagination from "../../layouts/CustromPagination";
import { toast } from "react-toastify";
import '../../layouts/styles.css'
import axios from "axios";
import { formatDate } from "../promo/formatDate"

const ListCylinder = () => {
    const [data, setData] = useState(null);
    const [databranch, useDatabranch] = useState(null);
    const [createdAt, setCreatedAt] = useState(null);
    const [branchName, setBranchName] = useState(null);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true); // Add loading state

    // const {deleteCompany } = useContext(CompanyContext)
    useEffect(() => {
        async function fetchBranch() {
            try {
                const response = await axios.get(`${process.env.ENVIRONMENT_URL}/api/admin/branch`);
                useDatabranch(response.data);
            } catch (error) {
                setError('Failed to fetch data');   
                console.error('Error fetching data:', error);
            }
        }


        async function fetchData() {
            try {
                const response = await axios.get(`${process.env.ENVIRONMENT_URL}/api/admin/cylinder`);
                setData(response.data);
            } catch (error) {
                setError('Failed to fetch data');
                console.error('Error fetching data:', error);
            }
        }
        fetchData();
        fetchBranch();
    }, []);


    const deleteStockcylinder = async (id) => {
        // Utility function to validate ObjectId
        const isValidObjectId = (id) => /^[a-f\d]{24}$/i.test(id);

        if (!isValidObjectId(id)) {
            setError("Invalid company ID format");
            return;
        }

        try {
            const response = await axios.delete(`${process.env.ENVIRONMENT_URL}/api/admin/cylinder/${id}`);

            if (response.data?.success) {
                router.replace(`/admin/cylinder`);
            } else {
                setError("Failed to delete Gas Data. Please try again.");
            }
        } catch (error) {
            console.error("Delete company error:", error);
            setError(error?.response?.data?.message || "An error occurred. Please try again.");
        }
    }

        // Handle search functionality
        const handleSearch = async (e) => {
            e.preventDefault();
            setError(null);
    
            const searchCriteria = {
                createdAt,
                branchname: branchName 
            };
    
            try {
                const response = await axios.post(
                    `${process.env.ENVIRONMENT_URL}/api/admin/cylinder/searchCylinder`,
                    searchCriteria,
                    {
                        headers: {
                            'Accept': 'application/json',
                            'Content-Type': 'application/json'
                        }
                    }
                );
    
                setData(response.data);
                toast.success("Search completed successfully");
            } catch (err) {
                if (err.response) {
                    setError(err.response.data.message);
                    toast.error(err.response.data.message);
                } else {
                    setError(err.message);
                    toast.error(err.message);
                }
                setData(null);
            }
        }

    return (

        <Suspense className="container">
            <h1 className="py-4 text-2xl pl-10 font-bold">Cylinders Stocks to branchess</h1> 
            <Link href="/admin/cylinder/new" className="btn btn-primary">Add Cylinders To Stock</Link>

        <br/><br/>
            <form onSubmit={handleSearch}>
                <div className="grid gap-6 mb-6 md:grid-cols-3">
                    <div>
                        <input
                            type="date"
                            className="form-control"
                            onChange={e => setCreatedAt(e.target.value)}
                        />
                    </div>

                    <div>
                     
                        <select className="select border border-gray-200 bg-gray-100 rounded-md py-2 px-3 hover:border-gray-400 focus:outline-none focus:border-gray-400 w-full"
                        
                            onChange={(e) => setBranchName(e.target.value)}
                            required
                        >
                            <option>Select branch</option>
                            {databranch?.branch?.map((branchdata) => (
                                <option key={branchdata.branchName}>{branchdata.branchName}</option> /* Added key prop */
                            ))}
                        </select>
                        <br />
                    </div>
                    <button
                        type="submit"
                        className="text-white bg-blue-700 hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 font-medium rounded-full text-sm text-center me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                    >
                        Search
                    </button>
                </div>
            </form>

            <div className="scroller">

                {
                    data?.cylinder?.map((gasdata) => {
                        return (
                            <div key={gasdata._id} className="userform">

                                <div className="row" key={gasdata._id}>
                                    <div className="col">
                                        <h1>Date</h1>
                                        <p>{formatDate(gasdata.createdAt)}</p>
                                    </div>
                                    <div className="col">
                                        <h1>Branch Name</h1>
                                        <p>{gasdata.branchname}</p>
                                    </div>
                                    <div className="col">
                                        <h1>Gas Culcations</h1>
                                        <table class="table">
                                            <thead>
                                                <tr>
                                                    <th scope="col">Brand</th>
                                                    <th scope="col">kgs</th>
                                                    <th scope="col">Cyliders</th>
                                                    <th scope="col">Total</th>
                                                </tr>
                                            </thead>

                                            {
                                                gasdata.cylinders.map(datame => (
                                                    <tbody key={datame._id}>
                                                        <tr>
                                                            <>
                                                                <td>{datame.brand}</td>
                                                                <td>{datame.kgs}</td>
                                                                <td>{datame.quantity}</td>
                                                                <td>{datame.total}</td>
                                                            </>
                                                        </tr>


                                                    </tbody>
                                                ))}

                                        </table>
                                    </div>

                                    <div className="col">
                                        <center>
                                            <h1>Final Total</h1>
                                        </center>

                                        <h3>{gasdata.finaltotal}</h3>
                                        <br />
                                        <div class="btnSubmit2"
                                            onClick={() => deleteStockcylinder(gasdata?._id)}
                                        >Delete</div>

                                    </div>
                                </div>
                            </div>

                        )

                    })
                }
            </div>

        </Suspense>


    )
}

export default ListCylinder;




