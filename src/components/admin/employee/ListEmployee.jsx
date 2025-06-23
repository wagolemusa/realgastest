'use client'

import React, { useState, Suspense} from "react";
import Link from "next/link";
import CustromPagination from "../../layouts/CustromPagination";
import { toast } from "react-toastify";
import '../../layouts/styles.css'
import axios from "axios";


const ListEmployee = ({ data }) => {

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
            const response = await axios.delete(`${process.env.ENVIRONMENT_URL}/api/admin/employee/${id}`);
            
            if (response.data?.success) {
                router.replace(`/admin/empoyee`);
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
                    ({ data?.productsCount}) <Link href="/admin/employee/new" className="btn btn-primary">Create Employee</Link>
                </h1>
                <h2 className="text-3xl my-3 ml-4 font-bold">List Of Employee</h2>         

            <table className="table w-full text-sm text-left">
                <thead className="text-l text-gray-700 uppercase">
                    <tr>
                        <th scope="col" className="px-6 py-3">
                            Firstname
                        </th>
                        <th scope="col" className="px-6 py-3">
                            Lastname
                        </th>
                        <th scope="col" className="px-6 py-3">
                            Phone
                        </th>
                        <th scope="col" className="px-6 py-3">
                            Location
                        </th>
                        <th scope="col" className="px-6 py-3">
                            Sex
                        </th>
                        <th scope="col" className="px-6 py-3">
                            Salary
                        </th>
                        <th scope="col" className="px-6 py-3">
                            ID Number
                        </th>
                      
                   
                        <th scope="col" className="px-6 py-3">
                            Actions
                        </th>
                    </tr>
                </thead>
                <tbody>
             
                    {data?.employee?.map(( product ) => (
                        
                        <tr key={product._id} className="bg-white">
                        <td className="px-6 py-2">{product?.firstname}</td>
                        <td className="px-6 py-2">{product?.lastname}</td>
                        <td className="px-6 py-2">{product?.phone}</td>
                        <td className="px-6 py-2">{product?.location}</td>
                        <td className="px-6 py-2">{product?.sex}</td>
                        <td className="px-6 py-2">{product?.salary}</td>
                        <td className="px-6 py-2">{product?.idnumber}</td>
                      
                        <td className="px-6 py-2">
                           
                            <div>
                                <Link
                                    href={`/admin/employee/new/${product?._id}`}
                                    className="px-2 py-2 inline-block text-green-600 bg-white shadow-sm border border-gray-200 rounded-md hover:bg-gray-100 cursor-pointer mr-2"
                                >
                                    {/* <i className="fa fa-image" aria-hidden="true"></i> */}
                                    View
                                </Link>

                                <Link
                                    href={`/admin/employee/${product?._id}`}
                                    className="px-2 py-2 inline-block text-yellow-600 bg-white shadow-sm border border-gray-200 rounded-md hover:bg-gray-100 cursor-pointer mr-2"
                                >
                                    {/* <i className="fa fa-pencil" aria-hidden="true"></i> */}
                                    Edit
                                </Link>
                                <a className="px-2 py-2 inline-block text-red-600 bg-white shadow-sm border border-gray-200 rounded-md hover:bg-gray-100 cursor-pointer"
                                    onClick={() => deleteCustomer(product?._id)}
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

export default ListEmployee;