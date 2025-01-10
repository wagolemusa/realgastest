'use client'
import React, { useState, Suspense} from "react";
import Link from "next/link";
import CustromPagination from "../../layouts/CustromPagination";
import { toast } from "react-toastify";
import '../../layouts/styles.css'
import axios from "axios";

const ListSealed = ({ data }) => {

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
            const response = await axios.delete(`${process.env.ENVIRONMENT_URL}/api/admin/customer/${id}`);
            
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
                     <Link href="/admin/sealed/new" className="btn btn-primary">Stock Cylinders</Link> 
                     <Link href="/admin/sealed/instock" className="btn btn-danger">In-Stock</Link>
                     <Link href="/admin/sealed/backinstock" className="btn btn-success">Back-In-Stock</Link>
                     <Link href="/admin/sealed/outofstock" className="btn btn-warning">Out-of-Stock</Link>
                </h1>

            <table className="table w-full text-sm text-left">
                <thead className="text-l text-gray-700 uppercase">
                    <tr>
                        <th scope="col" className="px-6 py-3">
                            Cylinders Size
                        </th>
                        <th scope="col" className="px-6 py-3">
                            Cylinder Brand
                        </th>
                        <th scope="col" className="px-6 py-3">
                            Cylinder Condition
                        </th>
                        <th scope="col" className="px-6 py-3">
                            SealNumber
                        </th>
                        <th scope="col" className="px-6 py-3">
                            Shop Name
                        </th>

                        <th scope="col" className="px-6 py-3">
                            Status
                        </th>
                        <th scope="col" className="px-6 py-3">
                            Actions
                        </th>
                    </tr>
                </thead>
                <tbody>
             
                    {data?.cylinder?.map(( sealed ) => (
                        
                        <tr key={sealed._id} className="bg-white">
                        <td className="px-6 py-2">{sealed?.cylinderSize}</td>
                        <td className="px-6 py-2">{sealed?.cylinderType}</td>
                        <td className="px-6 py-2">{sealed?.condition}</td>
                        <td className="px-6 py-2">{sealed?.sealnumber}</td>
                        <td className="px-6 py-2">{sealed?.branch}</td>
                        <td className="px-6 py-2">{sealed?.statusStock}</td>
                        <td className="px-6 py-2">
                           
                            <div>
                                <Link
                                    href={`/admin/customer/new/${sealed?._id}`}
                                    className="px-2 py-2 inline-block text-green-600 bg-white shadow-sm border border-gray-200 rounded-md hover:bg-gray-100 cursor-pointer mr-2"
                                >
                                    {/* <i className="fa fa-image" aria-hidden="true"></i> */}
                                    View
                                </Link>

                                <Link
                                    href={`/admin/customer/${sealed?._id}`}
                                    className="px-2 py-2 inline-block text-yellow-600 bg-white shadow-sm border border-gray-200 rounded-md hover:bg-gray-100 cursor-pointer mr-2"
                                >
                                    {/* <i className="fa fa-pencil" aria-hidden="true"></i> */}
                                    Edit
                                </Link>
                                <a className="px-2 py-2 inline-block text-red-600 bg-white shadow-sm border border-gray-200 rounded-md hover:bg-gray-100 cursor-pointer"
                                    onClick={() => deleteCustomer(sealed?._id)}
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

export default ListSealed;