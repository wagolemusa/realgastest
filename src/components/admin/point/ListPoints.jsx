'use client'

import React, { useEffect, useState, Suspense} from "react";
import Link from "next/link";
import CustromPagination from "../../layouts/CustromPagination";
import '../../layouts/styles.css'
import axios from "axios";
import { useRouter } from "next/navigation";

const ListPoint = ({ id }) => {

    const [data, setData] = useState(null);
    const [error, setError] = useState(null);
    const router = useRouter();

    
    useEffect(() => {
        async function fetchData(){
            try{
                const response = await axios.get(`${process.env.ENVIRONMENT_URL}/api/admin/points`);
                setData(response.data);
            } catch(error){
                setError('Failed to fetch data');
                console.error('Error fetching data:', error);
            }
        }
        fetchData();
    }, []);



  
    return (
        <Suspense className="customer relative overflow-x-auto shadow-md sm:rounded-lg">
                <h1 className="text-3xl my-5 ml-4 font-bold">
                 <Link href="/admin/points/new" className="btn btn-primary">Give Points</Link>
                </h1>
                          <h2 className="text-3xl my-3 ml-4 font-bold">List of Points</h2>         

            <table className="table w-full text-sm text-left">
                <thead className="text-l text-gray-700 uppercase">
                    <tr>
                        <th scope="col" className="px-6 py-3">
                            Customer Name
                        </th>
                        <th scope="col" className="px-6 py-3">
                            Phone
                        </th>
                        <th scope="col" className="px-6 py-3">
                            Cylinder Size
                        </th>
                        <th scope="col" className="px-6 py-3">
                            Cylinder Type
                        </th>
                        <th scope="col" className="px-6 py-3">
                            Points
                        </th>

                        <th scope="col" className="px-6 py-3">
                            Actions
                        </th>
                        
                    </tr>
                </thead>
                <tbody>
             
                    {data?.point?.map(( pointdata ) => (
                        
                        <tr key={pointdata._id} className="bg-white">
                        <td className="px-6 py-2">{pointdata?.customerName}</td>
                        <td className="px-6 py-2">{pointdata?.phone}</td>
                        <td className="px-6 py-2">{pointdata?.cylinderSize}</td>
                        <td className="px-6 py-2">{pointdata?.cylinderType}</td>
                        <td className="px-6 py-2">{pointdata?.points}</td>

                        <td className="px-6 py-2">
                           
                           <div>
                           <Link
                                   href={`/admin/points/${pointdata?._id}`}
                                   className="px-2 py-2 inline-block text-yellow-600 bg-white shadow-sm border border-gray-200 rounded-md hover:bg-gray-100 cursor-pointer mr-2"
                               >
                                   {/* <i className="fa fa-pencil" aria-hidden="true"></i> */}
                                   Redeam points
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

export default ListPoint;



