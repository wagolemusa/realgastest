'use client'

import React, { useState, useEffect, Suspense } from "react";
import Link from "next/link";
import CustromPagination from "../../layouts/CustromPagination";
import { toast } from "react-toastify";
import '../../layouts/styles.css'
import axios from "axios";
import { useRouter } from "next/navigation";


const Shoper = () => {
    const [retail, setRetail] = useState({ ordersCount: 0 })
    const [data, setData] = useState(null);
    const [error, setError] = useState(null);
    const router = useRouter();

    // const {deleteCompany } = useContext(CompanyContext)



    

    useEffect(() => {

        async function fetchOnline() {
            try {
              const response = await axios.get(`${process.env.ENVIRONMENT_URL}/api/admin/shoper/retailsum`);
              setRetail(response.data);
            } catch (error) {
              setError('Failed to fetch data');
              console.error('Error fetching data:', error);
            }
        }

        async function fetchData(){
            try{
                const response = await axios.get(`${process.env.ENVIRONMENT_URL}/api/admin/shoper`);
                setData(response.data);
            } catch(error){
                setError('Failed to fetch data');
                console.error('Error fetching data:', error);
            }
        }
        fetchData();
        fetchOnline();
    }, []);

   
    return (

        <Suspense className="customer relative overflow-x-auto shadow-md sm:rounded-lg">
                <h1 className="text-3xl my-5 ml-4 font-bold">
                <Link href="/admin/retail" className="btn btn-primary">Sales Gas</Link>
                </h1>
                <div className="my-2 ml-4 retailcash">
                    Cash Sold <br/>    {retail.totalCash}

                </div>
            <table className="table w-full text-sm text-left">
                <thead className="text-l text-gray-700 uppercase">
                    <tr>
                    <th scope="col" className="px-6 py-3">
                            SealToken
                        </th>
                        <th scope="col" className="px-6 py-3">
                          SealReplaced
                        </th>
                        <th scope="col" className="px-6 py-3">
                        Cylinder Type
                        </th>
                        <th scope="col" className="px-6 py-3">
                        Cylinder Size
                        </th>
                        <th scope="col" className="px-6 py-3">
                        Category
                        </th>
                        <th scope="col" className="px-6 py-3">
                        Price
                        </th>
                        <th scope="col" className="px-6 py-3">
                        Paymentmethod
                        </th>
                        <th scope="col" className="px-6 py-3">
                        Condition
                        </th>
                       
                        <th scope="col" className="px-6 py-3">
                            Actions
                        </th>
                    </tr>
                </thead>
                <tbody>
             
                    {data?.orders?.map(( sales ) => (
                        
                        <tr key={sales._id} className="bg-white">
                        <td className="px-6 py-2">{sales?.sealtaken}</td>
                        <td className="px-6 py-2">{sales?.sealreplaced}</td>
                        <td className="px-6 py-2">{sales?.cylinderType}</td>
                        <td className="px-6 py-2">{sales?.cylinderSize}</td>
                        <td className="px-6 py-2">{sales?.category}</td>
                        <td className="px-6 py-2">{sales?.price}</td>
                        <td className="px-6 py-2">{sales?.paymentmethod}</td>
                        <td className="px-6 py-2">{sales?.condition}</td>
                        <td className="px-6 py-2">
                           
                            <div>
                            <Link
                                    href={`/admin/sell/new/${sales?._id}`}
                                    className="px-2 py-2 inline-block text-green-600 bg-white shadow-sm border border-gray-200 rounded-md hover:bg-gray-100 cursor-pointer mr-2"
                                >
                                    {/* <i className="fa fa-image" aria-hidden="true"></i> */}
                                    View
                                </Link>
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

export default Shoper;


