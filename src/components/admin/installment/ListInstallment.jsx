'use client'
import React, {  useEffect, useState, Suspense} from "react";
import Link from "next/link";
import CustromPagination from "../../layouts/CustromPagination";
import '../../layouts/styles.css'
import axios from "axios";


const ListInstallment = () => {
    const [data, setData] = useState(null);
    const [error, setError] = useState(null);


    useEffect(() => {
        async function fetchData(){
            try{
                const response = await axios.get(`${process.env.ENVIRONMENT_URL}/api/admin/installment`);
                setData(response.data);
            } catch(error){
                setError('Failed to fetch data');
                console.error('Error fetching data:', error);
            }
        }
        fetchData();
    }, []);

  
    const deleteBranch = async (id) => {
        // Utility function to validate ObjectId
        const isValidObjectId = (id) => /^[a-f\d]{24}$/i.test(id);
    
        if (!isValidObjectId(id)) {
            setError("Invalid company ID format");
            return;
        }

        try {
            const response = await axios.delete(`${process.env.ENVIRONMENT_URL}/api/admin/branch/${id}`);
            
            if (response.data?.success) {
                router.replace(`/admin/company`);
            } else {
                setError("Failed to delete company. Please try again.");
            }
        } catch (error) {
            console.error("Delete company error:", error);
            setError(error?.response?.data?.message || "An error occurred. Please try again.");
        }
    }
  
    return (

        <Suspense className="customer relative overflow-x-auto shadow-md sm:rounded-lg">
                <h1 className="text-3xl my-5 ml-4 font-bold">
                 <Link href="/admin/installment/new" className="btn btn-primary">Installment Payment</Link>&apos; &apos;
                 <Link href="/admin/customer/new" className="btn btn-primary">Create Customer</Link>
                </h1>
                <h2 className="text-3xl my-3 ml-4 font-bold">List Of Installments</h2>         

            <table className="table w-full text-sm text-left">
                <thead className="text-l text-gray-700 uppercase">
                    <tr>
                        <th scope="col" className="px-6 py-3">
                            Customer Names
                        </th>
                        <th scope="col" className="px-6 py-3">
                            Phone 
                        </th>
                        <th scope="col" className="px-6 py-3">
                          CylinderType
                        </th>
                        <th scope="col" className="px-6 py-3">
                            CylinderSize
                        </th>
                        <th scope="col" className="px-6 py-3">
                            Amount
                        </th>
                        <th scope="col" className="px-6 py-3">
                            Installment Paid
                        </th>
                        <th scope="col" className="px-6 py-3">
                            Total Paid
                        </th>
                        <th scope="col" className="px-6 py-3">
                            Balance
                        </th>
                        <th scope="col" className="px-6 py-3">
                            Actions
                        </th>
                    </tr>
                </thead>
                <tbody>
             
                    {data?.installment?.map(( install ) => (
                        
                        <tr key={ install._id } className="bg-white">
                        <td className="px-6 py-2">{install?.customerName}</td>
                        <td className="px-6 py-2">{install?.phone}</td>
                        <td className="px-6 py-2">{install?.cylinderType}</td>
                        <td className="px-6 py-2">{install?.cylinderSize}</td>
                        <td className="px-6 py-2">{install?.amount}</td>
                        <td className="px-6 py-2">{install?.installmentPaid}</td>
                        <td className="px-6 py-2">{install?.totalPaid}</td>
                        <td className="px-6 py-2">{install?.balance}</td>
                      
                        <td className="px-6 py-2">
                           
                            <div>
                            <Link
                                    href={`/admin/installment/${install?._id}`}
                                    className="px-2 py-2 inline-block text-yellow-600 bg-white shadow-sm border border-gray-200 rounded-md hover:bg-gray-100 cursor-pointer mr-2"
                                >
                                    {/* <i className="fa fa-pencil" aria-hidden="true"></i> */}
                                    Edit
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

export default ListInstallment