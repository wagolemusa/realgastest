'use client'

import React, { useContext, useEffect, useState, Suspense} from "react";
import Link from "next/link";
import CustromPagination from "../../layouts/CustromPagination";
import '../../layouts/styles.css'
import axios from "axios";
import { useRouter } from "next/navigation";

const ListSold = ({ id }) => {

    const [data, setData] = useState(null);
    const [error, setError] = useState(null);
    const router = useRouter();

    
    useEffect(() => {
        async function fetchData(){
            try{
                const response = await axios.get(`${process.env.ENVIRONMENT_URL}/api/admin/sold`);
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
                 <Link href="/admin/sold/new" className="btn btn-primary">Make Sales of Accesories</Link>
                </h1>
                <h2 className="text-3xl my-3 ml-4 font-bold">Sold Accessories</h2>
            <table className="table w-full text-sm text-left">
                <thead className="text-l text-gray-700 uppercase">
                    <tr>
                    <th scope="col" className="px-6 py-3">
                            Date
                        </th>
                        <th scope="col" className="px-6 py-3">
                            Product Name
                        </th>
                        <th scope="col" className="px-6 py-3">
                            Quantity
                        </th>
                        <th scope="col" className="px-6 py-3">
                            amount
                        </th>
                    

                    </tr>
                </thead>
                <tbody>
             
                    {data?.sold?.map(( solddata ) => (
                                   
                        <tr key={solddata._id} className="bg-white">
                        <td className="px-6 py-2">{solddata?.date}</td>
                        <td className="px-6 py-2">{solddata?.nameaccessory}</td>
                        <td className="px-6 py-2">{solddata?.quantity}</td>
                        <td className="px-6 py-2">{solddata?.amount}</td>
                        
            
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

export default ListSold;



