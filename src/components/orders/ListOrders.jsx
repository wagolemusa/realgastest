'use client'

import React, { useContext, useEffect, useState, Suspense } from "react";
import OrderItem from "./OrderItem";
import CustromPagination from "../layouts/CustromPagination";
import CartContext from "../../context/CartContext";
import { useSearchParams, useRouter } from "next/navigation";
import axios from "axios";
import Image from "next/image";

const ListOrders = () => {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  const { clearCart } = useContext(CartContext);
  const params = useSearchParams();
  const router = useRouter();

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await axios.get(`${process.env.ENVIRONMENT_URL}/api/orders/user`);
        setData(response.data);
      } catch (error) {
        setError("Failed to fetch data");
        console.error("Error fetching data", error);
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, []);

  const orderSuccess = params.get("order_success");

  useEffect(() => {
    if (orderSuccess === "true") {
      clearCart();
      router.replace("/me/orders");
    }
  }, [orderSuccess, clearCart, router]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  return (
    <>
      <h3 className="text-xl font-semibold mb-5">Your Orders</h3>
      {data?.orders?.map((order) => (
        <article className="p-3 lg:p-5 mb-5 bg-white border border-blue-600 rounded-md" key={order._id}>
          <header className="lg:flex justify-between mb-4">
            <div className="mb-4 lg:mb-0">
              <p className="font-semibold">
                <span>Order ID: {order?._id} </span>
                {order?.orderStatus === "Processing" ? (
                  <span className="text-red-500">
                    {order?.orderStatus.toUpperCase()}
                  </span>
                ) : (
                  <span className="text-green-500">
                    {order?.orderStatus.toUpperCase()}
                  </span>
                )}
              </p>
              <p className="text-gray-500">{order?.createAt?.substring(0, 10)}</p>
            </div>
          </header>
          <div className="grid md:grid-cols-3 gap-2">
            <div>
              <p className="text-gray-400 mb-1">Person</p>
              <ul className="text-gray-600">
                <li>{order?.user?.name}</li>
                <li>Phone: {order?.shippingInfo?.phoneNo}</li>
              </ul>
            </div>
            <div>
              <p className="text-gray-400 mb-1">Delivery address</p>
              <ul className="text-gray-600">
                <li>{order?.shippingInfo?.street}</li>
                <li>{order?.shippingInfo?.phoneNo}<br />{order?.shippingInfo?.locationArea} {order?.shippingInfo?.zipCode}</li>
                <li>{order?.shippingInfo?.mapurl}</li>
                <li>{order?.shippingInfo?.describeLocation}</li>
              </ul>
            </div>
            <div>
              <p className="text-gray-400 mb-1">Payment</p>
              <ul className="text-gray-600">
                <li>Total paid: UGX {order.totalAmount}</li>
              </ul>
            </div>
          </div>

          <hr className="my-4" />

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-2">
            {order?.orderItems?.map((item) => (
              <figure key={item._id} className="flex flex-row mb-4">
                <div>
                  <div className="block w-20 h-20 rounded border border-gray-200 overflow-hidden p-3">
                    <Image src={item?.image} height="60" width="60" alt={item.name} />
                  </div>
                </div>
                <figcaption className="ml-3">
                  <p>{item.name.substring(0, 35)}</p>
                  <p className="mt-1 font-semibold">{item.quantity}x = {item.price * item.quantity}</p>
                </figcaption>
              </figure>
            ))}
          </div>
        </article>
      ))}
    </>
  );
};

const OrdersPage = () => {
  return (
    <Suspense fallback={<p>Loading orders...</p>}>
      <ListOrders />
    </Suspense>
  );
};

export default OrdersPage;
