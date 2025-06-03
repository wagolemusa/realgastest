'use client'
import React, { useState, useEffect, Suspense } from "react";
import Link from "next/link";
import CustromPagination from "../../layouts/CustromPagination";
import { toast } from "react-toastify";
import '../../layouts/styles.css'
import axios from "axios";
import { useRouter } from "next/navigation";

const ListSales = () => {
    const [retail, setRetail] = useState({ ordersCount: 0 })
    const [data, setData] = useState({ sell: [], totalPrice: 0, resPerPage: 0, filteredProductsCount: 0 }); // Initialize with proper structure
    const [branch, setBranch] = useState("");
    const [branchdata, setBranchdate] = useState(null);
    const [createdAt, setCreatedAt] = useState("");
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true); // Add loading state
    const router = useRouter();

    useEffect(() => {
        const fetchAllData = async () => {
            try {
                setLoading(true);
                const [sellResponse, shoperResponse, retailResponse, branchResponse] = await Promise.all([
                    axios.get(`${process.env.ENVIRONMENT_URL}/api/admin/sell`),
                    axios.get(`${process.env.ENVIRONMENT_URL}/api/admin/shoper`),
                    axios.get(`${process.env.ENVIRONMENT_URL}/api/admin/shoper/retailsum`),
                    axios.get(`${process.env.ENVIRONMENT_URL}/api/admin/branch`)
                ]);

                setData(sellResponse.data || { sell: [], totalPrice: 0 });
                setRetail(retailResponse.data || { ordersCount: 0 });
                setBranchdate(branchResponse.data || { branch: [] });
            } catch (error) {
                setError('Failed to fetch data');
                console.error('Error fetching data:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchAllData();
    }, []);

    const handleSave = async (e) => {
        e.preventDefault();
        setError(null);

        const BookData = {
            createdAt,
            branch
        };

        try {
            setLoading(true);
            const response = await axios.post(`${process.env.ENVIRONMENT_URL}/api/admin/sell/searchSales`, BookData, {
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                }
            });

            setData(response.data || { sell: [], totalPrice: 0 });
        } catch (err) {
            if (err.response) {
                setError(err.response.data.message);
            } else {
                setError(err.message);
            }
        } finally {
            setLoading(false);
        }
    }

    if (loading) {
        return <div className="text-center py-10">Loading...</div>;
    }

    if (error) {
        return <div className="text-center py-10 text-red-500">{error}</div>;
    }

    return (
        <Suspense fallback={<div className="text-center py-10">Loading...</div>}>
            <div className="customer relative overflow-x-auto shadow-md sm:rounded-lg">
                <h1 className="text-3xl my-5 ml-4 font-bold">
                    <Link href="/admin/sell/new" className="btn btn-primary">Sales Gas</Link>&nbsp;&nbsp;
                    <Link href="/admin/sell/allsales" className="btn btn-danger text-600">All Records</Link>
                </h1>

                <div className="my-2 ml-4 retailcash">
                    Cash Sold <br /> {data?.totalPrice || 0}
                </div><br />

                <form onSubmit={handleSave}>
                    <div className="grid gap-6 mb-6 md:grid-cols-3">
                        <div>
                            <input type="date" className="form-control" placeholder="How many Kgs"
                                onChange={e => setCreatedAt(e.target.value)} />
                        </div>

                        <div>
                            <select 
                                className="select border border-gray-200 bg-gray-100 rounded-md py-2 px-3 hover:border-gray-400 focus:outline-none focus:border-gray-400 w-full"
                                name="branch"
                                value={branch}
                                onChange={(e) => setBranch(e.target.value)}
                            >
                                <option>Select branch</option>
                                {branchdata?.branch?.map((pointdata, index) => (
                                    <option key={pointdata?.id || index} value={pointdata?.branchName}>
                                        {pointdata?.branchName}
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
                <h2 className="text-3xl my-3 ml-4 font-bold">Sales Records</h2>
 <div className="scroller overflow-auto">
                {data?.sell?.length > 0 ? (
                    <>
                        <table className="table w-full text-sm text-left">
                            <thead className="text-l text-gray-700 uppercase">
                                <tr>
                                    <th scope="col" className="px-6 py-3">SealToken</th>
                                    <th scope="col" className="px-6 py-3">SealReplaced</th>
                                    <th scope="col" className="px-6 py-3">Cylinder Type</th>
                                    <th scope="col" className="px-6 py-3">Cylinder Size</th>
                                    <th scope="col" className="px-6 py-3">Category</th>
                                    <th scope="col" className="px-6 py-3">Price</th>
                                    <th scope="col" className="px-6 py-3">Paymentmethod</th>
                                    <th scope="col" className="px-6 py-3">Condition</th>
                                    <th scope="col" className="px-6 py-3">Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {data.sell.map((sales) => (
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
                                            <Link
                                                href={`/admin/sell/new/${sales?._id}`}
                                                className="px-2 py-2 inline-block text-green-600 bg-white shadow-sm border border-gray-200 rounded-md hover:bg-gray-100 cursor-pointer mr-2"
                                            >
                                                View
                                            </Link>

                                            
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>

                        <div className="mb-6">
                            <CustromPagination
                                resPerPage={data?.resPerPage || 10}
                                productsCount={data?.filteredProductsCount || 0}
                            />
                        </div>
                    </>
                ) : (
                    <div className="text-center py-10">No sales records found</div>
                )}
                </div>
            </div>
        </Suspense>
    );
};

export default ListSales;