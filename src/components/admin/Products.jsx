'use client'

import React, { useContext, useEffect} from "react";
import Link from "next/link";
import CustromPagination from "../layouts/CustromPagination";
import ProductContext from "../../context/ProductContext";
import { toast } from "react-toastify";

const Products = ({ data }) => {
    const { deleteProduct, error, clearErrors } = useContext(ProductContext)

    useEffect(() => {
        if(error){
            toast.error(error);
            clearErrors();
        }
    }, [error, clearErrors]);

    const deleteHandler = (id) => {
        deleteProduct(id);
    }
  
    return (

        <div className="customer relative overflow-x-auto shadow-md sm:rounded-lg">
            <h1 className="text-3xl my-5 ml-4 font-bold">
                { data?.productsCount} Posted Accessories to Web
            </h1>
            <Link href="/admin/products/new" className="btn btn-primary">Post Accessories to Web</Link>&nbsp;&nbsp;
            
            

            <table className="table w-full text-sm text-left">
                <thead className="text-l text-gray-700 uppercase">
                    <tr>
                        <th scope="col" className="px-6 py-3">
                            Name
                        </th>
                        <th scope="col" className="px-6 py-3">
                            Category
                        </th>
                        <th scope="col" className="px-6 py-3">
                            Price
                        </th>
                        <th scope="col" className="px-6 py-3">
                            Actions
                        </th>
                    </tr>
                </thead>
                <tbody>
                    {data?.products?.map(( product ) => (
                        <tr key={product._id} className="bg-white">
                        <td className="px-6 py-2">{product?.name}</td>
                        <td className="px-6 py-2">{product?.category}</td>
                        <td className="px-6 py-2">{product?.price}</td>
                        <td className="px-6 py-2">
                            <div>
                                <Link
                                    href={`/admin/products/${product?._id}/upload_images`}
                                    className="px-2 py-2 inline-block text-green-600 bg-white shadow-sm border border-gray-200 rounded-md hover:bg-gray-100 cursor-pointer mr-2"
                                >
                                    {/* <i className="fa fa-image" aria-hidden="true"></i> */}
                                    Upload-Image
                                </Link>

                                <Link
                                    href={`/admin/products/${product?._id}`}
                                    className="px-2 py-2 inline-block text-yellow-600 bg-white shadow-sm border border-gray-200 rounded-md hover:bg-gray-100 cursor-pointer mr-2"
                                >
                                    {/* <i className="fa fa-pencil" aria-hidden="true"></i> */}
                                    Edit
                                </Link>
                                <a className="px-2 py-2 inline-block text-red-600 bg-white shadow-sm border border-gray-200 rounded-md hover:bg-gray-100 cursor-pointer"
                                    onClick={() => deleteHandler(product?._id)}
                                >
                                    {/* <i className="fa fa-trash" aria-hidden="true"></i> */}
                                    Delete
                                </a>
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
        </div>

    );
};

export default Products;