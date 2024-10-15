'use client'

import Link from "next/link";
import React, { useContext, useEffect, Suspense } from "react";
import CustromPagination  from '../../layouts/CustromPagination'
import OrderContext from "../../../context/OrderContext";
import { toast } from "react-toastify";
import { formatDate } from '../promo/formatDate';


const AllProcessingData = ({ orders }) => {
  const { deleteOrder, error, clearErrors } = useContext(OrderContext)

  useEffect(() => {
    if(error){
      toast.error(error);
      clearErrors();
    }
  },[error, clearErrors])

  const deleteHandler = (id) =>{
    deleteOrder(id);
  }
  return (
 
            <Suspense className="relative overflow-x-auto shadow-md sm:rounded-lg">
              <h1 className="text-3xl my-5 ml-4 font-bold">{orders?.ordersCount} All Procesing  Orders</h1>
              <a href="/admin/orders" className="btn btn-success">Today Orders</a>&apos; &apos;
              <a href="/admin/orders/shippingToday" className="btn btn-primary">Shipped Orders</a>&apos; &apos;
              {/* <a href="/admin/orders/todayorder" className="btn btn-success">today&apos;s orders</a>&apos; &apos; */}
              <a href="/admin/orders/AllshippedData" className="btn btn-info">All shipped Orders</a>&apos; &apos;
              <a href="/admin/orders/processAll" className="btn btn-warning">All processing Orders</a>
              <table className="table w-full text-sm text-left">
                <thead className="text-l text-gray-700 uppercase">
                  <tr>
                    <th scope="col" className="px-6 py-3">
                      ID
                    </th>
                    <th scope="col" className="px-6 py-3">
                      Amount Paid
                    </th>
                    <th scope="col" className="px-6 py-3">
                      Status
                    </th>
                    <th scope="col" className="px-6 py-3">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {orders?.orders?.map((order) =>(
                    
                    <tr key={order._id} className="bg-white">
                      <td className="px-6 py-2">{formatDate(order?.createAt)}</td>
                    <td className="px-6 py-2">UGX {order?.totalAmount}</td>
                    <td className="px-6 py-2">{order?.orderStatus}</td>
                    <td className="px-6 py-2">
                      <div>
                        <Link
                          href={`/admin/orders/${order?._id}`}
                          className="px-2 py-2 inline-block text-yellow-600 bg-white shadow-sm border border-gray-200 rounded-md hover:bg-gray-100 cursor-pointer mr-2"
                        >
                          {/* <i className="fa fa-pencil" aria-hidden="true"></i> */}
                          View Order
                        </Link>
                      
                      </div>
                    </td>
                    </tr>
                    
                  ))}
              
                </tbody>
              </table>
              <div className="md-6">
              <CustromPagination
                resPerPage={orders?.resPerPage}
                productsCount={orders?.ordersCount}
              />
              </div>
            </Suspense>
 
  );
};

export default AllProcessingData;





