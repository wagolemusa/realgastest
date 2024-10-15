'use client'

import React, { useState, useEffect, Suspense } from "react";
import Link from "next/link";
import CustromPagination from "../../layouts/CustromPagination";
import { toast } from "react-toastify";
import '../../layouts/styles.css'
import axios from "axios";


const ListGasBought = () => {
    const [data, setData] = useState(null);
    const [error, setError] = useState(null);


    // const {deleteCompany } = useContext(CompanyContext)
    useEffect(() => {
        async function fetchData(){
            try{
                const response = await axios.get(`${process.env.ENVIRONMENT_URL}/api/admin/gasbought`);
                setData(response.data);
            } catch(error){
                setError('Failed to fetch data');
                console.error('Error fetching data:', error);
            }
        }
        fetchData();
    }, []);


    const deleteBoughtData = async (id) => {
        // Utility function to validate ObjectId
        const isValidObjectId = (id) => /^[a-f\d]{24}$/i.test(id);
    
        if (!isValidObjectId(id)) {
            setError("Invalid company ID format");
            return;
        }

        try {
            const response = await axios.delete(`${process.env.ENVIRONMENT_URL}/api/admin/gasbought/${id}`);
            
            if (response.data?.success) {
                router.replace(`/admin/gasbought`);
            } else {
                setError("Failed to delete Gas Data. Please try again.");
            }
        } catch (error) {
            console.error("Delete company error:", error);
            setError(error?.response?.data?.message || "An error occurred. Please try again.");
        }
    }


    return (

        <Suspense className="container">
             <h1 className="py-4 text-2xl pl-10 font-bold">Gas Bought From Companies</h1>
             <Link href="/admin/gasbought/new" className="btn btn-primary">Create Bought Gas Records</Link>

            <div className="scroller">
               
                {
                    data?.gasbought?.map((gasdata) => {
                        return (
                            <div key={gasdata._id} className="userform">

                                <div className="row">
                                    <div className="col">
                                        <h1>Date</h1>
                                        <p>{gasdata.date}</p>
                                    </div>
                                    <div className="col">
                                        <h1>Distributor</h1>
                                        <p>{gasdata.distributor}</p>
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
                                        <div class="btnSubmit1">Print</div><br/>
                                        <div class="btnSubmit2"
                                         onClick={() => deleteBoughtData(gasdata?._id)}
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

export default ListGasBought;