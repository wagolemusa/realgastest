'use client'

import React, { useState, Suspense} from "react";
import Link from "next/link";
import CustromPagination from "../../layouts/CustromPagination";
import { toast } from "react-toastify";
import '../../layouts/styles.css'
import axios from "axios";


const ListUpdateSeal = ({ data }) => {
    const [error, setError] = useState()
   
    return (
        <Suspense className="customer relative overflow-x-auto shadow-md sm:rounded-lg">
                <h1 className="text-3xl my-5 ml-4 font-bold">
                     <Link href="" className="btn btn-primary">Tracker Out and In Cylinders</Link>

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
                            Customer Name
                        </th>
                        <th scope="col" className="px-6 py-3">
                           Phone
                        </th>
                        <th scope="col" className="px-6 py-3">
                            Branch
                        </th>
                        <th scope="col" className="px-6 py-3">
                           Status
                        </th>
                      
                    </tr>
                </thead>
                <tbody>
             
                    {data?.updatedseals?.map(( sealed ) => (
                        <tr key={sealed._id} className="bg-white">
                        <td className="px-6 py-2">{sealed?.cylinderSize}</td>
                        <td className="px-6 py-2">{sealed?.cylinderType}</td>
                        <td className="px-6 py-2">{sealed?.condition}</td>
                        <td className="px-6 py-2">{sealed?.sealnumber}</td>
                        <td className="px-6 py-2">{sealed?.customerName}</td>
                        <td className="px-6 py-2">{sealed?.phone}</td>
                        <td className="px-6 py-2">{sealed?.branch}</td>
                        <td className="px-6 py-2">{sealed?.statusStock}</td>
                        
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

export default ListUpdateSeal;