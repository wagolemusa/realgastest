'use client'
import React, { useState, useEffect, Suspense } from "react";
import Link from "next/link";
import CustromPagination from "../../layouts/CustromPagination";
import { toast } from "react-toastify";
import '../../layouts/styles.css'
import axios from "axios";
import { useRouter } from "next/navigation";

const Allsales = () => {
    const [data, setData] = useState(null);

    const router = useRouter();

    useEffect(() => {

        async function fetchData() {
            try {
                const response = await axios.get(`${process.env.ENVIRONMENT_URL}/api/admin/sell`);
                setData(response.data);
            } catch (error) {
                setError('Failed to fetch data');
                console.error('Error fetching data:', error);
            }
        }

    
        fetchData();
     
    }, []);

    return (
        <Suspense className="customer relative overflow-x-auto shadow-md sm:rounded-lg">
            <h1 className="text-3xl my-5 ml-4 font-bold">
                <Link href="/admin/sell" className="btn btn-primary"> Back Gas Sales</Link>&nbsp;&nbsp;
           
            </h1>
  
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
                            Branch
                        </th>

                        <th scope="col" className="px-6 py-3">
                            Actions
                        </th>
                    </tr>
                </thead>
                <tbody>

                    {data?.sell?.map((sales) => (

                        <tr key={sales._id} className="bg-white">
                            <td className="px-6 py-2">{sales?.sealtaken}</td>
                            <td className="px-6 py-2">{sales?.sealreplaced}</td>
                            <td className="px-6 py-2">{sales?.cylinderType}</td>
                            <td className="px-6 py-2">{sales?.cylinderSize}</td>
                            <td className="px-6 py-2">{sales?.category}</td>
                            <td className="px-6 py-2">{sales?.price}</td>
                            <td className="px-6 py-2">{sales?.paymentmethod}</td>
                            <td className="px-6 py-2">{sales?.branch}</td>
                            <td className="px-6 py-2">

                                <div>
                                    <Link
                                        href={`/admin/sell/new/${sales?._id}`}
                                        className="px-2 py-2 inline-block text-green-600 bg-white shadow-sm border border-gray-200 rounded-md hover:bg-gray-100 cursor-pointer mr-2"
                                    >
                                        {/* <i className="fa fa-image" aria-hidden="true"></i> */}
                                        View
                                    </Link>


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

export default Allsales;


