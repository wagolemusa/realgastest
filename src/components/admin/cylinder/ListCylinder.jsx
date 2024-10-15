'use client'

import React, { useState, useEffect,Suspense } from "react";
import Link from "next/link";
import CustromPagination from "../../layouts/CustromPagination";
import { toast } from "react-toastify";
import '../../layouts/styles.css'
import axios from "axios";
import {formatDate } from "../promo/formatDate"

const ListCylinder = () => {
    const [data, setData] = useState(null);
    const [error, setError] = useState(null);


    // const {deleteCompany } = useContext(CompanyContext)
    useEffect(() => {
        async function fetchData(){
            try{
                const response = await axios.get(`${process.env.ENVIRONMENT_URL}/api/admin/cylinder`);
                setData(response.data);
            } catch(error){
                setError('Failed to fetch data');
                console.error('Error fetching data:', error);
            }
        }
        fetchData();
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


    return (

        <Suspense className="container">
             <h1 className="py-4 text-2xl pl-10 font-bold">Cylinders Stocks to branchess</h1>
             <Link href="/admin/cylinder/new" className="btn btn-primary">Add Cylinders To Stock</Link>

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




