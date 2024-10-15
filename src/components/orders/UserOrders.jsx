'use client';

import React, { useEffect, useState } from "react";
import axios from "axios";
import Image from "next/image";
import { useSession } from "next-auth/react";

const UserOrdersData = () => {
    const { data: session, status } = useSession();
    const [data, setData] = useState({ order: [] });
    const [error, setError] = useState(null);

    useEffect(() => {
        if (status === "loading") return; // Wait for the session to load

        async function fetchData() {
            if (!session || !session.user) {
                setError("User not authenticated");
                return;
            }

            const token = session.user.id;
            console.log("Token:", token);

            try {
                const response = await axios.get(`${process.env.ENVIRONMENT_URL}/api/orders/userOrder`, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });
                console.log('API Response:', response.data);
                setData(response.data);
            } catch (error) {
                setError('Failed to fetch data');
                console.error('Error fetching data:', error);
            }
        }

        fetchData();
    }, [session, status]);

    if (status === "loading") {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>Error: {error}</div>;
    }

    // if (!data || !data.order || data.order.length === 0) {
    //     return <div>No orders found.</div>;
    // }

    return (
        <div>
            {data.order.map((orderdata) => (
                <article key={orderdata._id} className="p-3 lg:p-5 mb-5 bg-white border border-blue-600 rounded-md">
                    <header className="lg:flex justify-between mb-4">
                        <div className="mb-4 lg:mb-0">
                            <p className="font-semibold">
                                <span>Order ID: {orderdata._id} </span>
                                {orderdata.orderStatus === "Processing" ? (
                                    <span className="text-red-500">
                                        {orderdata.orderStatus.toUpperCase()}
                                    </span>
                                ) : (
                                    <span className="text-green-500">
                                        {orderdata.orderStatus.toUpperCase()}
                                    </span>
                                )}
                            </p>
                            <p className="text-gray-500">{orderdata.createAt?.substring(0, 10)} </p>
                        </div>
                    </header>
                    <div className="grid md:grid-cols-3 gap-2">
                        <div>
                            <p className="text-gray-400 mb-1">Payment</p>
                            <ul className="text-gray-600">
                                <li>Total paid: UGX {orderdata.amount} </li>
                            </ul>
                        </div>
                    </div>

                    <hr className="my-4" />

                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-2">
                        {orderdata.orderItems?.map((item) => (
                            <figure className="flex flex-row mb-4" key={item.product}>
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
        </div>
    );
};

export default UserOrdersData;
