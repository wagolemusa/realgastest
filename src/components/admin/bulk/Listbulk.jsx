'use client'

import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import axios from "axios";
import { toast } from "react-toastify";
import { usePDF } from 'react-to-pdf';
import * as XLSX from 'xlsx';
import '../../layouts/styles.css';

const ListBulk = () => {
    const [searchedData, setSearchedData] = useState(null);
    const [resaler, setResaler] = useState("");
    const [resalerdata, setResalerdata] = useState(null);
    const [createdAt, setCreatedAt] = useState(null);
    const [error, setError] = useState(null);
    const { toPDF, targetRef } = usePDF({ filename: 'bulk-gas-sales-report.pdf' });

    // Fetch Resalers only (initial data)
    useEffect(() => {
        async function fetchDataReser() {
            try {
                const response = await axios.get(`${process.env.ENVIRONMENT_URL}/api/admin/resaler`);
                setResalerdata(response.data);
            } catch (error) {
                setError('Failed to fetch resaler data');
                console.error('Error fetching resaler data:', error);
            }
        }
        fetchDataReser();
    }, []);

    // Handle search functionality
    const handleSearch = async (e) => {
        e.preventDefault();
        setError(null);

        const searchCriteria = {
            createdAt,
            resaler
        };

        try {
            const response = await axios.post(
                `${process.env.ENVIRONMENT_URL}/api/admin/bulk/searchBulk`,
                searchCriteria,
                {
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json'
                    }
                }
            );

            setSearchedData(response.data);
            toast.success("Search completed successfully");
        } catch (err) {
            if (err.response) {
                setError(err.response.data.message);
                toast.error(err.response.data.message);
            } else {
                setError(err.message);
                toast.error(err.message);
            }
            setSearchedData(null);
        }
    }

    const deleteBoughtData = async (id) => {
        if (!/^[a-f\d]{24}$/i.test(id)) {
            setError("Invalid company ID format");
            return;
        }

        try {
            await axios.delete(`${process.env.ENVIRONMENT_URL}/api/admin/bulk/${id}`);
            toast.success("Record deleted successfully");
            // Refresh the searched data after deletion
            handleSearch({ preventDefault: () => {} });
        } catch (error) {
            console.error("Delete error:", error);
            setError(error?.response?.data?.message || "An error occurred. Please try again.");
            toast.error("Failed to delete record");
        }
    }

    const exportToExcel = () => {
        if (!searchedData?.bulkgas?.length) {
            toast.warning("No data to export");
            return;
        }

        // Prepare data for Excel
        const excelData = searchedData.bulkgas.map(gas => {
            const cylinderData = gas.cylinders.map(cyl => ({
                'Date': gas.date,
                'Resaler': gas.resaler,
                'Brand': cyl.brand,
                'Kgs': cyl.kgs,
                'Cylinders': cyl.quantity,
                'Total': cyl.total,
                'Final Total (kg)': gas.finaltotal,
                'Price per kg': gas.priceperkgs,
                'Amount': gas.amount,
                'Cash Paid': gas.cashPaid,
                'Balance': gas.balance
            }));
            return cylinderData;
        }).flat();

        const worksheet = XLSX.utils.json_to_sheet(excelData);
        const workbook = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(workbook, worksheet, "Bulk Gas Sales");
        
        // Generate Excel file and trigger download
        XLSX.writeFile(workbook, "bulk-gas-sales.xlsx", { compression: true });
    };

    return (
        <div className="container">
            <br />
            <div className="flex justify-between items-center">
                <Link href="/admin/bulk/new" className="btn btn-primary my-5">Bulk Sales</Link>
                {searchedData?.bulkgas?.length > 0 && (
                    <div className="space-x-2">
                        <button 
                            onClick={() => toPDF()} 
                            className="btn btn-danger my-5"
                        >
                            Export to PDF
                        </button>
                        <button 
                            onClick={exportToExcel} 
                            className="btn btn-success my-5"
                        >
                            Export to Excel
                        </button>
                    </div>
                )}
            </div>

            <h2 className="text-3xl my-3 ml-4 font-bold">Whole Sales Gas</h2>

            <form onSubmit={handleSearch}>
                <div className="grid gap-6 mb-6 md:grid-cols-3">
                    <div>
                        <input 
                            type="date" 
                            className="form-control" 
                            onChange={e => setCreatedAt(e.target.value)} 
                        />
                    </div>

                    <div>
                        <select 
                            className="form-select mb-3" 
                            onChange={(e) => setResaler(e.target.value)}
                            value={resaler}
                        >
                            <option value="">Select Resaler</option>
                            {resalerdata?.pointsofsales?.map((pointdata) => (
                                <option key={pointdata?.id} value={pointdata?.businessname}>
                                    {pointdata?.businessname}
                                </option>
                            ))}
                        </select>
                    </div>
                    <button 
                        type="submit" 
                        className="text-white bg-blue-700 hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 font-medium rounded-full text-sm text-center me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                    >
                        Search
                    </button>
                </div>
            </form>

            {error && <div className="alert alert-danger">{error}</div>}

            <div className="scroller overflow-auto" ref={targetRef}>
                {searchedData?.bulkgas?.length > 0 ? (
                    searchedData.bulkgas.map((gasdata) => (
                        <div key={gasdata._id} className="userform mb-4 p-4 border rounded">
                            <div className="row">
                                <div className="col">
                                    <h1 className="text-lg font-bold">Date</h1>
                                    <p>{new Date(gasdata.date).toLocaleDateString()}</p>
                                </div>
                                <div className="col">
                                    <h1 className="text-lg font-bold">Resaler</h1>
                                    <p>{gasdata.resaler}</p>
                                </div>
                                <div className="col">
                                    <h1 className="text-lg font-bold">Gas Calculations</h1>
                                    <table className="table w-full">
                                        <thead className="bg-gray-100">
                                            <tr>
                                                <th className="p-2">Brand</th>
                                                <th className="p-2">Kgs</th>
                                                <th className="p-2">Cylinders</th>
                                                <th className="p-2">Total</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {gasdata.cylinders.map((datame) => (
                                                <tr key={datame._id} className="border-t">
                                                    <td className="p-2">{datame.brand}</td>
                                                    <td className="p-2">{datame.kgs}</td>
                                                    <td className="p-2">{datame.quantity}</td>
                                                    <td className="p-2">{datame.total}</td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                                <div className="col">
                                    <h1 className="text-lg font-bold text-center">Final Total</h1>
                                    <div className="mt-2">
                                        <p><strong>Total Kgs:</strong> {gasdata.finaltotal} kgs</p>
                                        <p><strong>Price per kg:</strong> {gasdata.priceperkgs}</p>
                                        <p><strong>Amount:</strong> {gasdata.finaltotal} * {gasdata.priceperkgs} = {gasdata.amount}</p>
                                        <p><strong>Cash Paid:</strong> {gasdata.cashPaid}</p>
                                        <p><strong>Balance:</strong> {gasdata.balance}</p>
                                    </div>
                                </div>
                            </div>
                            <div className="mt-3 flex justify-end space-x-2">
                                <Link
                                    href={`/admin/bulk/new/${gasdata?._id}`}
                                    className="px-3 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                                >
                                    View & Print
                                </Link>
                                <button
                                    onClick={() => deleteBoughtData(gasdata._id)}
                                    className="px-3 py-2 bg-red-500 text-white rounded hover:bg-red-600"
                                >
                                    Delete
                                </button>
                            </div>
                        </div>
                    ))
                ) : (
                    <div className="alert alert-info">
                        {searchedData ? "No results found for your search criteria" : "Use the search form to find bulk sales records"}
                    </div>
                )}
            </div>
        </div>
    )
}

export default ListBulk;