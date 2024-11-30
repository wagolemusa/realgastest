'use client'

import React, { useState, Suspense} from "react";
import Link from "next/link";
import CustromPagination from "../../layouts/CustromPagination";
import { toast } from "react-toastify";
import '../../layouts/styles.css'
import axios from "axios";


const ListResaler = ({ data }) => {

    const [error, setError] = useState()


    // Delete Company Data
    const deleteCustomer = async (id) => {
        // Utility function to validate ObjectId
        const isValidObjectId = (id) => /^[a-f\d]{24}$/i.test(id);
    
        if (!isValidObjectId(id)) {
            setError("Invalid company ID format");
            return; 
        }

        try {
            const response = await axios.delete(`${process.env.ENVIRONMENT_URL}/api/admin/resaler/${id}`);
            
            if (response.data?.success) {
                router.replace(`/admin/customer`);
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
                    ({ data?.productsCount}) <Link href="/admin/resaler/new" className="btn btn-primary">Create Resaler</Link>

                </h1>
            <table className="table w-full text-sm text-left">
                <thead className="text-l text-gray-700 uppercase">
                    <tr>
                        <th scope="col" className="px-6 py-3">
                            Business Name
                        </th>
                        <th scope="col" className="px-6 py-3">
                            Price
                        </th>
                        <th scope="col" className="px-6 py-3">
                            Phone
                        </th>
                        <th scope="col" className="px-6 py-3">
                            whatsup Number
                        </th>
                        <th scope="col" className="px-6 py-3">
                            District
                        </th>
                    
                        <th scope="col" className="px-6 py-3">
                            Town
                        </th>
                        <th scope="col" className="px-6 py-3">
                            Code
                        </th>
                        <th scope="col" className="px-6 py-3">
                            Actions
                        </th>
                    </tr>
                </thead>
                <tbody>
             
                    {data?.pointsofsales?.map(( resale ) => (
                        
                        <tr key={resale._id} className="bg-white">
                        <td className="px-6 py-2">{resale?.businessname}</td>
                        <td className="px-6 py-2">{resale?.price}</td>
                        <td className="px-6 py-2">{resale?.phone}</td>
                        <td className="px-6 py-2">{resale?.whatsup}</td>
                        <td className="px-6 py-2">{resale?.district}</td>
                        <td className="px-6 py-2">{resale?.town}</td>
                        <td className="px-6 py-2">{resale?.code}</td>
                        <td className="px-6 py-2">
                           
                            <div>
                             

                                <Link
                                    href={`/admin/customer/${resale?._id}`}
                                    className="px-2 py-2 inline-block text-yellow-600 bg-white shadow-sm border border-gray-200 rounded-md hover:bg-gray-100 cursor-pointer mr-2"
                                >
                                    {/* <i className="fa fa-pencil" aria-hidden="true"></i> */}
                                    Edit
                                </Link>
                                <a className="px-2 py-2 inline-block text-red-600 bg-white shadow-sm border border-gray-200 rounded-md hover:bg-gray-100 cursor-pointer"
                                    onClick={() => deleteCustomer(resale?._id)}
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

export default ListResaler;