'use client'

import React, { useState, Suspense, useEffect } from "react";
import Link from "next/link";
import CustromPagination from "../../layouts/CustromPagination";
import '../../layouts/styles.css'
import axios from "axios";
import { useRouter } from "next/navigation";

const ListSold = ({ id }) => {
    const [data, setData] = useState(null);
    const [accessories, setAccessories] = useState([]);
    const [createdAt, setCreatedAt] = useState("");
    const [nameaccessory, setNameaccessory] = useState("");
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);
    const router = useRouter();

    useEffect(() => {
        const fetchInitialData = async () => {
            try {
                setLoading(true);
                const [soldResponse, accessoriesResponse] = await Promise.all([
                    axios.get(`${process.env.ENVIRONMENT_URL}/api/admin/sold`),
                    axios.get(`${process.env.ENVIRONMENT_URL}/api/admin/accessory`)
                ]);

                setData(soldResponse.data);
                setAccessories(accessoriesResponse.data?.accessories || []);
            } catch (error) {
                setError('Failed to fetch initial data');
                console.error('Error:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchInitialData();
    }, []);

    const handleSave = async (e) => {
        e.preventDefault();
        setError(null);

        try {
            setLoading(true);
            const response = await axios.post(
                `${process.env.ENVIRONMENT_URL}/api/admin/sold/searchSold`,
                { createdAt, nameaccessory },
                {
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json'
                    }
                }
            );

            setData(response.data);
        } catch (err) {
            setError(err.response?.data?.message || err.message);
        } finally {
            setLoading(false);
        }
    }

    const formatDate = (dateString) => {
        if (!dateString) return '';
        const date = new Date(dateString);
        return date.toLocaleDateString();
    }

    if (loading && !data) {
        return <div className="text-center py-10">Loading...</div>;
    }

    if (error) {
        return <div className="text-center py-10 text-red-500">{error}</div>;
    }

    return (
        <div className="customer relative overflow-x-auto shadow-md sm:rounded-lg">
            <h1 className="text-3xl my-5 ml-4 font-bold">
                <Link href="/admin/sold/new" className="btn btn-primary">Make Sales of Accessories</Link>
            </h1>
            <h2 className="text-3xl my-3 ml-4 font-bold">Sold Accessories</h2>

            <div className="my-2 ml-4 retailcash">
                Cash Sold <br /> {data?.totalPrice || 0}
            </div>

            <form onSubmit={handleSave}>
                <div className="grid gap-6 mb-6 md:grid-cols-3">
                    <div>
                        <input 
                            type="date" 
                            className="form-control" 
                            onChange={e => setCreatedAt(e.target.value)}
                            value={createdAt}
                        />
                    </div>

                    <div>
                        <select
                            className="select border border-gray-200 bg-gray-100 rounded-md py-2 px-3 hover:border-gray-400 focus:outline-none focus:border-gray-400 w-full"
                            value={nameaccessory}
                            onChange={(e) => setNameaccessory(e.target.value)}
                        >
                            <option value="">Select accessory</option>
                            {accessories.map((accessory) => (
                                <option key={accessory._id} value={accessory.name}>
                                    {accessory.name}
                                </option>
                            ))}
                        </select>
                    </div>
                    
                    <button 
                        type="submit" 
                        className="text-white bg-blue-700 hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 font-medium rounded-full text-sm text-center me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                        disabled={loading}
                    >
                        {loading ? 'Searching...' : 'Search'}
                    </button>
                </div>
            </form>

            <table className="table w-full text-sm text-left">
                <thead className="text-l text-gray-700 uppercase">
                    <tr>
                        <th scope="col" className="px-6 py-3">Date</th>
                        <th scope="col" className="px-6 py-3">Product Name</th>
                        <th scope="col" className="px-6 py-3">Quantity</th>
                        <th scope="col" className="px-6 py-3">Amount</th>
                    </tr>
                </thead>
                <tbody>
                    {data?.sold?.length > 0 ? (
                        data.sold.map((solddata) => (
                            <tr key={solddata._id} className="bg-white">
                                <td className="px-6 py-2">{formatDate(solddata.date)}</td>
                                <td className="px-6 py-2">{solddata.nameaccessory}</td>
                                <td className="px-6 py-2">{solddata.quantity}</td>
                                <td className="px-6 py-2">{solddata.amount}</td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan="4" className="px-6 py-4 text-center">
                                No sales records found
                            </td>
                        </tr>
                    )}
                </tbody>
            </table>

            {data?.resPerPage && data?.filteredProductsCount && (
                <div className="mb-6">
                    <CustromPagination
                        resPerPage={data.resPerPage}
                        productsCount={data.filteredProductsCount}
                    />
                </div>
            )}
        </div>
    );
};

export default ListSold;