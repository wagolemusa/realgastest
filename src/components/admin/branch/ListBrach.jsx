'use client'

import React, { useContext, useEffect, useState,Suspense} from "react";
import Link from "next/link";
import CustromPagination from "../../layouts/CustromPagination";
import '../../layouts/styles.css'
import axios from "axios";
import MainContext from "../../../context/MainContext";


const ListBrach = () => {
    const [data, setData] = useState(null);
    const [error, setError] = useState(null);

    // const {deleteBranch } = useContext(MainContext)

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

    // const deleteHandler = (id) => {
    //     deleteBranch(id);
    // }


    const deleteBranch = async (id) => {
        // Utility function to validate ObjectId
        const isValidObjectId = (id) => /^[a-f\d]{24}$/i.test(id);
    
        if (!isValidObjectId(id)) {
            setError("Invalid company ID format");
            return;
        }

        try {
            const response = await axios.delete(`${process.env.ENVIRONMENT_URL}/api/admin/branch/${id}`);
            
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
  
    return (

        <Suspense className="customer relative overflow-x-auto shadow-md sm:rounded-lg">
                <h1 className="text-3xl my-5 ml-4 font-bold">
                 <Link href="/admin/branch/new" className="btn btn-primary">Create Branch</Link>
                </h1>
                  <h2 className="text-3xl my-3 ml-4 font-bold">Branch Records</h2>
            <table className="table w-full text-sm text-left">
                <thead className="text-l text-gray-700 uppercase">
                    <tr>
                        <th scope="col" className="px-6 py-3">
                            Branch Name
                        </th>
                        <th scope="col" className="px-6 py-3">
                            Branch Employee
                        </th>
                        <th scope="col" className="px-6 py-3">
                            Location
                        </th>
                       
                        <th scope="col" className="px-6 py-3">
                            Actions
                        </th>
                    </tr>
                </thead>
                <tbody>
             
                    {data?.branch?.map(( branches ) => (
                        
                        <tr key={branches._id}className="bg-white">
                        <td className="px-6 py-2">{branches?.branchName}</td>
                        <td className="px-6 py-2">{branches?.employee}</td>
                        <td className="px-6 py-2">{branches?.location}</td>
                      
                        <td className="px-6 py-2">
                           
                            <div>
                           
                                <Link
                                    href={`/admin/branch/${branches?._id}`}
                                    className="px-2 py-2 inline-block text-yellow-600 bg-white shadow-sm border border-gray-200 rounded-md hover:bg-gray-100 cursor-pointer mr-2"
                                >
                                    {/* <i className="fa fa-pencil" aria-hidden="true"></i> */}
                                    Edit
                                </Link>
                                <a className="px-2 py-2 inline-block text-red-600 bg-white shadow-sm border border-gray-200 rounded-md hover:bg-gray-100 cursor-pointer"
                                    onClick={() => deleteBranch(branches?._id)}
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

export default ListBrach;