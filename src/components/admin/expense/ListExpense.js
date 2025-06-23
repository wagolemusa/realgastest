'use client'

import React, {Suspense, useEffect, useState} from "react";
import Link from "next/link";
import CustromPagination from "../../layouts/CustromPagination";
import '../../layouts/styles.css'
import axios from "axios";


const ListExpense = () => {
    const [data, setData] = useState(null);
    const [date, setDate] = useState(null);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(null);

    useEffect(() => {
        async function fetchData(){
            try{
                const response = await axios.get(`${process.env.ENVIRONMENT_URL}/api/admin/expense`);
                setData(response.data);
            } catch(error){
                setError('Failed to fetch data');
                console.error('Error fetching data:', error);
            }
        }
        fetchData();
    }, []);

    const handleSave = async (e) => {
        e.preventDefault();
        setError(null);

        const BookData = {
            date
        };

        try {
            setLoading(true);
            const response = await axios.post(`${process.env.ENVIRONMENT_URL}/api/admin/expense/searchByDate`, BookData, {
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                }
            });

            setData(response.data);
        } catch (err) {
            if (err.response) {
                setError(err.response.data.message);
            } else {
                setError(err.message);
            }
        }
    }
  
  
    return (

        <Suspense className="customer relative overflow-x-auto shadow-md sm:rounded-lg">
                <h1 className="text-3xl my-5 ml-4 font-bold">
                 <Link href="/admin/expense/new" className="btn btn-primary">Make Expenses</Link>
                </h1>
                <h2 className="text-3xl my-3 ml-4 font-bold">List Of Expenses</h2>

                <form onSubmit={handleSave}>
                <div className="grid gap-6 mb-6 md:grid-cols-3">
                    <div>
                        <input type="date" className="form-control" placeholder="Search By Date"
                            onChange={e => setDate(e.target.value)} />
                    </div>


                    <button
                        type="submit"
                        className="text-white bg-blue-700 hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 font-medium rounded-full text-sm text-center me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                    >
                        Search By Date
                    </button>
                </div>
            </form>


            <table className="table w-full text-sm text-left">
                <thead className="text-l text-gray-700 uppercase">
                    <tr>
                        <th scope="col" className="px-6 py-3">
                            Resaon
                        </th>
                        <th scope="col" className="px-6 py-3">
                            amount
                        </th>
                        <th scope="col" className="px-6 py-3">
                            person
                        </th>
                        <th scope="col" className="px-6 py-3">
                            Date
                        </th>
                       
                        <th scope="col" className="px-6 py-3">
                            Actions
                        </th>
                    </tr>
                </thead>
                <tbody>
             
                    {data?.expense?.map(( expe ) => (
                        
                        <tr  key={expe._id} className="bg-white">
                        <td className="px-6 py-2">{expe?.resaon}</td>
                        <td className="px-6 py-2">{expe?.amount}</td>
                        <td className="px-6 py-2">{expe?.person}</td>
                        <td className="px-6 py-2">{expe?.date}</td>
                       <div>
                       <Link
                            href={`/admin/expense/${expe?._id}`}
                            className="px-2 py-2 inline-block text-yellow-600 bg-white shadow-sm border border-gray-200 rounded-md hover:bg-gray-100 cursor-pointer mr-2"
                            >
                            {/* <i className="fa fa-pencil" aria-hidden="true"></i> */}
                            Edit
                        </Link>
                        </div> 
                  
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

export default ListExpense;