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
    const [data, setData] = useState(null);
    const [branch, setBranch] = useState("");
    const [branchdata, setBranchdate] = useState("");
    const [createdAt, setCreatedAt] = useState("");
    const [datasale, setDatasale] = useState("")
    const [error, setError] = useState(null);
    const router = useRouter();

    // const {deleteCompany } = useContext(CompanyContext)

    useEffect(() => {

        async function fetchOnline() {
            try {
                const response = await axios.get(`${process.env.ENVIRONMENT_URL}/api/admin/shoper/retailsum`);
                setRetail(response.data);
            } catch (error) {
                setError('Failed to fetch data');
                console.error('Error fetching data:', error);
            }
        }

        async function fetchData() {
            try {
                const response = await axios.get(`${process.env.ENVIRONMENT_URL}/api/admin/shoper`);
                setData(response.data);
            } catch (error) {
                setError('Failed to fetch data');
                console.error('Error fetching data:', error);
            }
        }

        async function fetchDatabranch(){
            try{
                const response = await axios.get(`${process.env.ENVIRONMENT_URL}/api/admin/branch`);
                setBranchdate(response.data);
            } catch(error){
                setError('Failed to fetch data');
                console.error('Error fetching data:', error);
            }
        }


        fetchData();
        fetchOnline();
        fetchDatabranch();
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
            const response = await axios.post(`${process.env.ENVIRONMENT_URL}/api/admin/sell/searchSales`, BookData, {
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                }
            });

            if (response.status === 201) {
                window.location.replace("/admin/sell");
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

    console.log("Saleeeee", datasale)

    return (

        <Suspense className="customer relative overflow-x-auto shadow-md sm:rounded-lg">
            <h1 className="text-3xl my-5 ml-4 font-bold">
                <Link href="/admin/sell/new" className="btn btn-primary">Sales Gas</Link>&nbsp;&nbsp;
                <Link href="/admin/sell/allsales" className="btn btn-danger text-600">All Records</Link>
            </h1>
  
            <div className="my-2 ml-4 retailcash">
                Cash Sold <br />    {datasale.totalPrice}
            </div><br/>
            
            <form onSubmit={handleSave}>
                <div class="grid gap-6 mb-6 md:grid-cols-3">
                    <div>
                        <input type="date" class="form-control" placeholder="How many Kgs"
                            onChange={e => setCreatedAt(e.target.value)} />
                    </div>
                    
                    <div>
                    <select data-mdb-select-init list="browsers3" class="select
                                            border border-gray-200 bg-gray-100 rounded-md py-2 px-3 hover:border-gray-400 focus:outline-none focus:border-gray-400 w-full"
                                            name="branch"
                                            value={branch}
                                            onChange={(e) => setBranch(e.target.value)}
                                        >
                                        <option>Select branch</option>
                                            {branchdata?.branch?.map(( pointdata, index ) => (
                                            <option key={pointdata?.id || index} value={pointdata?.branchName}>
                                            {pointdata?.branchName}
                                        </option>
                        ))}
                    </select>
                    </div>
                    <button type="submit" class="text-white bg-blue-700 hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 font-medium rounded-full text-sm  text-center me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Search</button>
                </div>
            </form>
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
                            Condition
                        </th>

                        <th scope="col" className="px-6 py-3">
                            Actions
                        </th>
                    </tr>
                </thead>
                <tbody>

                    {datasale?.products?.map((sales) => (

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

export default ListSales;


