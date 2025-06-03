'use client'

import React, { Suspense, useEffect, useState} from "react";
import Link from "next/link";
import CustromPagination from "../../layouts/CustromPagination";
import '../../layouts/styles.css'
import axios from "axios";
import CompanyContext from "../../../context/CompanyContext";
import { useRouter } from "next/navigation";
import { formatDate } from "./formatDate"


const Getpromo = () => {

    const [data, setData] = useState(null);
    const [code, setCode] = useState(null);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(null);
    const router = useRouter();

    // const {deleteCompany } = useContext(CompanyContext)

    useEffect(() => {
        async function fetchData(){
            try{
                const response = await axios.get(`${process.env.ENVIRONMENT_URL}/api/admin/promocode`);
                setData(response.data);
            } catch(error){
                setError('Failed to fetch data');
                console.error('Error fetching data:', error);
            }
        }
        fetchData();
    }, []);

    // const deleteHandler = (id) => {
    //     deleteCompany(id);
    // }


    // Delete Company Data
    const deleteCompany = async (id) => {
        // Utility function to validate ObjectId
        const isValidObjectId = (id) => /^[a-f\d]{24}$/i.test(id);
    
        if (!isValidObjectId(id)) {
            setError("Invalid company ID format");
            return;
        }

        try {
            const response = await axios.delete(`${process.env.ENVIRONMENT_URL}/api/admin/company/${id}`);
            
            if (response.data?.success) {
                router.replace(`/admin/company`);
            } else {
                setError("Failed to delete company. Please try again.");
            }
        } catch (error) {
            console.error("Delete company error:", error);
            setError(error?.response?.data?.message || "An error occurred. Please try again.");
        }
    }


     const handleSave = async (e) => {
                e.preventDefault();
                setError(null);
        
                const BookData = {
                    code
                };
        
                try {
                    setLoading(true);
                    const response = await axios.post(`${process.env.ENVIRONMENT_URL}/api/admin/promocode/searchcode`, BookData, {
                        headers: {
                            'Accept': 'application/json',
                            'Content-Type': 'application/json'
                        }
                    });
        
                    setData(response.data);
                } catch (err) {
                    if (err.response) {
                        setError(err.response.data.message);
                    } else {
                        setError(err.message);
                    }
                }
            }
  
    return (

        <Suspense className="customer relative overflow-x-auto shadow-md sm:rounded-lg">
                <h1 className="text-3xl my-5 ml-4 font-bold">
                 <Link href="/admin/promocode/new" className="btn btn-primary">Create Promo Code</Link>
                </h1>
                <h2 className="text-3xl my-3 ml-4 font-bold">List Of Promo codes</h2>

                <form onSubmit={handleSave}>
                <div className="grid gap-6 mb-6 md:grid-cols-3">
                    <div>
                        <input type="text" className="form-control" placeholder="Search By Code"
                            onChange={e => setCode(e.target.value)} />
                    </div>


                    <button
                        type="submit"
                        className="text-white bg-blue-700 hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 font-medium rounded-full text-sm text-center me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                    >
                        Search
                    </button>
                </div>
            </form>

            <table className="table w-full text-sm text-left">
                <thead className="text-l text-gray-700 uppercase">
                    <tr>
                        <th scope="col" className="px-6 py-3">
                            Code
                        </th>
                        <th scope="col" className="px-6 py-3">
                            Amount
                        </th>
                        <th scope="col" className="px-6 py-3">
                            Created At
                        </th>
                        <th scope="col" className="px-6 py-3">
                            Expiration Date
                        </th>
                       
                        <th scope="col" className="px-6 py-3">
                            Actions
                        </th>
                    </tr>
                </thead>
                <tbody>
             
                    {data?.promo?.map(( promoCode ) => (
                        
                        <tr key={promoCode._id} className="bg-white">
                        <td className="px-6 py-2">{promoCode?.code}</td>
                        <td className="px-6 py-2">{promoCode?.amount}</td>
                        <td className="px-6 py-2">{formatDate(promoCode?.createdAt)}</td>
                        <td className="px-6 py-2">{formatDate(promoCode?.expirationDate)}</td>
                        <td className="px-6 py-2">
                           
                            <div>
                                
                                <a className="px-2 py-2 inline-block text-red-600 bg-white shadow-sm border border-gray-200 rounded-md hover:bg-gray-100 cursor-pointer"
                                    onClick={() => deletePromo(promoCode?._id)}
                                >
                                    {/* <i className="fa fa-trash" aria-hidden="true"></i> */}
                                    Delete
                                </a>
                            </div>
                        </td>
                    </tr>
                    ))}
         
                </tbody>
            </table>


                    

            <div className="mb-6">
                <CustromPagination
                    resPerPage={data?.resPerPage}
                    productsCount={data?.filteredProductsCount}
                />
            </div>
        </Suspense>

    );
};

export default Getpromo;



