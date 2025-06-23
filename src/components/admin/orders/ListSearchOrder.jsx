
'use client'
import React, { useState, useEffect, useRef } from "react";

import Link from "next/link";
import { toast } from "react-toastify";
import '../../layouts/styles.css'
import axios from "axios";
import { useRouter } from "next/navigation";
import { formatDate } from '../promo/formatDate';

const ListSearchOrder = () => {
  const [data, setData] = useState(null);
  const [orderdata, setOrderdata] = useState(null);
  const [createdAt, setCreatedAt] = useState(null);
  const [orderStatus, setOrderStatus] = useState(null);
  const [error, setError] = useState(null)
  const [loading, setLoading] = useState(true); // Add loading state

  // Fetch Resalers only (initial data)
  useEffect(() => {
    async function fetchOrderSearch() {
      try {
        const response = await axios.get(`${process.env.ENVIRONMENT_URL}/api/admin/orders`);
        setOrderdata(response.data);
      } catch (error) {
        setError('Failed to fetch resaler data');
        console.error('Error fetching resaler data:', error);
      }
    }
    fetchOrderSearch();
  }, []);

  const handleSave = async (e) => {
    e.preventDefault();
    setError(null);

    const BookData = {
        createdAt,
        orderStatus
    };

    try {
        setLoading(true);
        const response = await axios.post(`${process.env.ENVIRONMENT_URL}/api/admin/orders/SearchOrder`, BookData, {
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
    } finally {
        setLoading(false);
    }
}


  return (
    <>
<form onSubmit={handleSave}>
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
              onChange={(e) => setOrderStatus(e.target.value)}
              value={orderStatus}
            >
              <option value="">Select Resaler</option>
              {orderdata?.orders?.map((pointdata) => (
                <option key={pointdata?.id} value={pointdata?.orderStatus}>
                  {pointdata?.orderStatus}
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

      <h2 className="text-3xl my-3 ml-4 font-bold">Sales Records</h2>
 <div className="scroller overflow-auto">
                     <table className="table w-full text-sm text-left">
                       <thead className="text-l text-gray-700 uppercase">
                         <tr>
                           <th scope="col" className="px-6 py-3">
                             DATE & TIME
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
                         {data?.orders?.map((order) =>(
                           
                           <tr key={order._id} className="bg-white">
                           <td className="px-6 py-2">{formatDate(order?.createdAt)}</td>
                           <td className="px-6 py-2">UGX {order?.totalAmount}</td>
                           <td className="px-6 py-2">{order?.orderStatus}</td>
                           <td className="px-6 py-2">
                             <div>
                               <Link
                                 href={`/admin/orders/${order?._id}`}
                                 className="px-2 py-2 inline-block text-yellow-600 bg-white shadow-sm border border-gray-200 rounded-md hover:bg-gray-100 cursor-pointer mr-2"
                               >
                                 View Order
                               </Link>
                             
                             </div>
                           </td>
                           </tr>
                           
                         ))}
                     
                       </tbody>
                     </table>
                </div>

    </>
  )
}



export default ListSearchOrder;