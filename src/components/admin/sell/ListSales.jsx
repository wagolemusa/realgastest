'use client'

import React, { useState, useEffect, Suspense } from "react";
import Link from "next/link";
import CustromPagination from "../../layouts/CustromPagination";
import { toast } from "react-toastify";
import '../../layouts/styles.css'
import axios from "axios";
import { useRouter } from "next/navigation";


const ListSales = () => {

    const [data, setData] = useState(null);
    const [error, setError] = useState(null);
    const router = useRouter();

    // const {deleteCompany } = useContext(CompanyContext)

    useEffect(() => {
        async function fetchData(){
            try{
                const response = await axios.get(`${process.env.ENVIRONMENT_URL}/api/admin/sell`);
                setData(response.data);
            } catch(error){
                setError('Failed to fetch data');
                console.error('Error fetching data:', error);
            }
        }
        fetchData();
    }, []);


    // Delete Company Data
    const deleteSales = async (id) => {
        // Utility function to validate ObjectId
        const isValidObjectId = (id) => /^[a-f\d]{24}$/i.test(id);
    
        if (!isValidObjectId(id)) {
            setError("Invalid company ID format");
            return;
        }

        try {
            const response = await axios.delete(`${process.env.ENVIRONMENT_URL}/api/admin/sell/${id}`);
            
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
                <Link href="/admin/sell/new" className="btn btn-primary">Create Sales</Link>

                </h1>
            <table className="table w-full text-sm text-left">
                <thead className="text-l text-gray-700 uppercase">
                    <tr>
                    <th scope="col" className="px-6 py-3">
                            Date
                        </th>
                        <th scope="col" className="px-6 py-3">
                            Category
                        </th>
                        <th scope="col" className="px-6 py-3">
                            Bra-Name
                        </th>
                        <th scope="col" className="px-6 py-3">
                            Cyl-D-Size
                        </th>
                        <th scope="col" className="px-6 py-3">
                            Cyl-D-Type
                        </th>
                        <th scope="col" className="px-6 py-3">
                            Amount
                        </th>
                        <th scope="col" className="px-6 py-3">
                            Cust-Name
                        </th>
                        <th scope="col" className="px-6 py-3">
                            Phone
                        </th>
                        <th scope="col" className="px-6 py-3">
                            Time
                        </th>
                        <th scope="col" className="px-6 py-3">
                            Actions
                        </th>
                    </tr>
                </thead>
                <tbody>
             
                    {data?.sell?.map(( sales ) => (
                        
                        <tr key={sales._id} className="bg-white">
                        <td className="px-6 py-2">{sales?.datedata}</td>
                        <td className="px-6 py-2">{sales?.category}</td>
                        <td className="px-6 py-2">{sales?.branch}</td>
                        <td className="px-6 py-2">{sales?.cylinderSize}</td>
                        <td className="px-6 py-2">{sales?.cylinderType}</td>
                        <td className="px-6 py-2">{sales?.amount}</td>
                        <td className="px-6 py-2">{sales?.customerName}</td>
                        <td className="px-6 py-2">{sales?.phone}</td>
                        <td className="px-6 py-2">{sales?.time}</td>
                        <td className="px-6 py-2">
                           
                            <div>

                                <Link
                                    href={`/admin/sell/${sales?._id}`}
                                    className="px-2 py-2 inline-block text-yellow-600 bg-white shadow-sm border border-gray-200 rounded-md hover:bg-gray-100 cursor-pointer mr-2"
                                >
                                    {/* <i className="fa fa-pencil" aria-hidden="true"></i> */}
                                    Edit
                                </Link>
                                <a className="px-2 py-2 inline-block text-red-600 bg-white shadow-sm border border-gray-200 rounded-md hover:bg-gray-100 cursor-pointer"
                                    onClick={() => deleteSales(sales?._id)}
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

export default ListSales;


