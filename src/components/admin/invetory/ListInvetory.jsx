'use client'

import React, { useEffect, useState, Suspense} from "react";
import Link from "next/link";
import CustromPagination from "../../layouts/CustromPagination";
import '../../layouts/styles.css'
import axios from "axios";


const ListInvetory = () => {
    const [data, setData] = useState(null);
    const [error, setError] = useState(null);


    useEffect(() => {
        async function fetchData(){
            try{
                const response = await axios.get(`${process.env.ENVIRONMENT_URL}/api/admin/invetory`);
                setData(response.data);
            } catch(error){
                setError('Failed to fetch data');
                console.error('Error fetching data:', error);
            }
        }
        fetchData();
    }, []);

  
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
                 <Link href="/admin/invetory/new" className="btn btn-primary">Add Invetory</Link>&nbsp;&nbsp;
                 <Link href="/admin/invetory/outofStock" className="btn btn-primary">Out Of Stock</Link>

                </h1>
           
            <table className="table w-full text-sm text-left">
                <thead className="text-l text-gray-700 uppercase">
                    <tr>
                        <th scope="col" className="px-6 py-3">
                            Accessories Name
                        </th>
                        <th scope="col" className="px-6 py-3">
                            Amount
                        </th>
                        <th scope="col" className="px-6 py-3">
                          Initial  Quantity
                        </th>
                        <th scope="col" className="px-6 py-3">
                            Added Stock
                        </th>
                        <th scope="col" className="px-6 py-3">
                            Stock Quantity
                        </th>
                        <th scope="col" className="px-6 py-3">
                            Actions
                        </th>
                    </tr>
                </thead>
                <tbody>
             
                    {data?.inventory?.map(( branches ) => (
                        
                        <tr key={branches._id }className="bg-white">
                        <td className="px-6 py-2">{branches?.nameaccessory}</td>
                        <td className="px-6 py-2">{branches?.amount}</td>
                        <td className="px-6 py-2">{branches?.initial_quantity}</td>
                        <td className="px-6 py-2">{branches?.added_stock}</td>
                        <td className="px-6 py-2">{branches?.stock_quantity}</td>
                        <td className="px-6 py-2">{branches?.stock}</td>
                      
                        <td className="px-6 py-2">
                           
                            <div>
                           
                            
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

export default ListInvetory;