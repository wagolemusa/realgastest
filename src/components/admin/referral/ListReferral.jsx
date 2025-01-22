'use client'

import React, { useContext, useEffect, useState, Suspense} from "react";
import Link from "next/link";
import CustromPagination from "../../layouts/CustromPagination";
import '../../layouts/styles.css'
import axios from "axios";


const ListReferral = () => {
    const [data, setData] = useState(null);
    const [error, setError] = useState(null);


    useEffect(() => {
        async function fetchData(){
            try{
                const response = await axios.get(`${process.env.ENVIRONMENT_URL}/api/admin/referral`);
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
          <h2 className="text-3xl my-3 ml-4 font-bold">Referral Points Withdraw</h2>         
            <table className="table w-full text-sm text-left">
                <thead className="text-l text-gray-700 uppercase">
                    <tr>
                        <th scope="col" className="px-6 py-3">
                            Referral Code
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
             
                    {data?.refer?.map(( referral ) => (
                        
                        <tr key={referral._id} className="bg-white">
                        <td className="px-6 py-2">{referral?.referralcode}</td>
                        <td className="px-6 py-2">{referral?.points}</td>
                      
                        <td className="px-6 py-2">
                           
                            <div>
                           
                            <Link
                                    href={`/admin/referral/${referral?._id}`}
                                    className="px-2 py-2 inline-block text-yellow-600 bg-white shadow-sm border border-gray-200 rounded-md hover:bg-gray-100 cursor-pointer mr-2"
                                >
                                    {/* <i className="fa fa-pencil" aria-hidden="true"></i> */}
                                    Withdraw Points
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

export default ListReferral;