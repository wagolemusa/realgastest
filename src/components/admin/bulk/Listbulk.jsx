'use client'

import React, { useState, useEffect, Suspense } from "react";
import Link from "next/link";
import CustromPagination from "../../layouts/CustromPagination";
import { toast } from "react-toastify";
import '../../layouts/styles.css'
import axios from "axios";


const ListBulk = () => {
    const [data, setData] = useState(null);
    const [resaler, setResaler] = useState("");
    const [resalerdata, setResalerdata] = useState(null)
    const [createdAt,  setCreatedAt] = useState(null)
    const [error, setError] = useState(null);


    // const {deleteCompany } = useContext(CompanyContext)
    useEffect(() => {
        async function fetchData(){
            try{
                const response = await axios.get(`${process.env.ENVIRONMENT_URL}/api/admin/bulk`);
                setData(response.data);
            } catch(error){
                setError('Failed to fetch data');
                console.error('Error fetching data:', error);
            }
        }

        async function fetchDataReser() {
            try {
                const response = await axios.get(`${process.env.ENVIRONMENT_URL}/api/admin/resaler`);
                setResalerdata(response.data);
            } catch (error) {
                setError('Failed to fetch data');
                console.error('Error fetching data:', error);
            }
        }
        fetchData();
        fetchDataReser()
    }, []);

    
        // Do the search here
        const handleSave = async (e) => {
            e.preventDefault();
            setError(null);
    
            const BookData = {
                createdAt,
                branch
            };
    
            try {
                const response = await axios.post(`${process.env.ENVIRONMENT_URL}/api/admin/sell/searchSalers`, BookData, {
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json'
                    }
                });
    
                if (response.status === 201) {
                    window.location.replace("/admin/bulk");
                }
    
                setDatasale(response.data);
            } catch (err) {
                if (err.response) {
                    setError(err.response.data.message);
                } else {
                    setError(err.message);
                }
            }
        }
    
        // console.log("Saleeeee", datasale)

     

    const deleteBoughtData = async (id) => {
        // Utility function to validate ObjectId
        const isValidObjectId = (id) => /^[a-f\d]{24}$/i.test(id);
    
        if (!isValidObjectId(id)) {
            setError("Invalid company ID format");
            return;
        }

        try {
            const response = await axios.delete(`${process.env.ENVIRONMENT_URL}/api/admin/bulk/${id}`);
            
            if (response.data?.success) {
                router.replace(`/admin/bulk`);
            } else {
                setError("Failed to delete Gas Data. Please try again.");
            }
        } catch (error) {
            console.error("Delete company error:", error);
            setError(error?.response?.data?.message || "An error occurred. Please try again.");
        }
    }


    return (

        <Suspense className="container">
            <br/>
             <Link href="/admin/bulk/new" className="btn btn-primary my-5">Bulk Sales</Link>

             <h2 className="text-3xl my-3 ml-4 font-bold">Whole Sales Gas</h2>   

                     <form onSubmit={handleSave}>
                <div class="grid gap-6 mb-6 md:grid-cols-3">
                    <div>
                        <input type="date" class="form-control" placeholder="How many Kgs"
                            onChange={e => setCreatedAt(e.target.value)} />
                    </div>
                    
                    <div>
                    <select className="form-select mb-3" onChange={(e) => setResaler(e.target.value)}>
                                        <option>Resalers</option>
                                        {resalerdata?.pointsofsales?.map((pointdata, index) => (
                                            <option key={pointdata?.id || index} value={pointdata?.businessname}>
                                                {pointdata?.businessname}
                                            </option>
                                        ))}
                                    </select>
                    </div>
                    <button type="submit" class="text-white bg-blue-700 hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 font-medium rounded-full text-sm  text-center me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Search</button>
                </div>
            </form>      

            <div className="scroller overflow-auto">
               
                {
                    data?.bulkgas?.map((gasdata) => {
                        return (
                            <div key={gasdata._id} className="userform">

                                <div className="row">
                                    <div className="col">
                                        <h1>Date</h1>
                                        <p>{gasdata.date}</p>
                                    </div>
                                    <div className="col">
                                        <h1>Resaler</h1>
                                        <p>{gasdata.resaler}</p>
                                    </div>
                                    <div className="col">
                                        <h1>Gas Culcations</h1>
                                        <table class="table">
                                            <thead>
                                                <tr>
                                                    <th scope="col">Brand</th>
                                                    <th scope="col">kgs</th>
                                                    <th scope="col">Cyliders</th>
                                                    <th scope="col">Total</th>
                                                </tr>
                                            </thead>

                                            {
                                                gasdata.cylinders.map(datame => (
                                                    <tbody key={datame._id}>
                                                        <tr>
                                                            <>
                                                                <td>{datame.brand}</td>
                                                                <td>{datame.kgs}</td>
                                                                <td>{datame.quantity}</td>
                                                                <td>{datame.total}</td>
                                                            </>
                                                        </tr>


                                                    </tbody>
                                                ))}

                                        </table>
                                    </div>

                                    <div className="col">
                                        <center>
                                            <h1>Final Total</h1>
                                        </center>

                                        <h3>{gasdata.finaltotal} kgs </h3>
                                        <hr/>
                                        <h3>{gasdata.priceperkgs} Price-per-kg</h3>
                                       <hr/>
                                        <h3>{gasdata.finaltotal} * {gasdata.priceperkgs} = {gasdata.amount}</h3>
                                       <hr/>
                                        {/* <h4>Amount  {gasdata.amount}</h4> */}
                                        <h3>Cash Paid {gasdata.cashPaid}</h3>
                                        <hr/>
                                        <h3>Balance {gasdata.balance}</h3>      
                                       

                                    </div>
                                </div>
                            <div className="col-md-3 btnSubmit2">
                            <Link
                                    href={`/admin/bulk/new/${gasdata?._id}`}
                                    className="px-1 py-2 inline-block text-white cursor-pointer mr-2"
                                >
                                   
                                    View & Print
                                </Link>
                            </div>
                            </div>
   
                        )

                    })
                }
            </div>
            

        </Suspense>


    )
}

export default ListBulk;