
import ListOrders from '../../../components/orders/ListOrders'
import React from "react"

// import { cookies } from "next/headers";

// const getOrders = async (searchParams) => {

//   const nextCookies = cookies();

//   const nextAuthSessionToken = nextCookies.get("next-auth.session-token");

//   // const urlParams = {
//   //   page: searchParams.page || 1,
//   // }

//   // const searchQuery = queryString.stringify(urlParams);

//   const { data } = await axios.get(`${process.env.ENVIRONMENT_URL}/api/orders/me`, {
//     headers: {
//       Cookie: `next-auth.session-token=${nextAuthSessionToken?.value}`,
//     },
//   });
  
//   return data
// }


// const getOrders = async (searchParams) => {
//   const nextCookies = cookies();
//   const nextAuthSessionToken = nextCookies.get("next-auth.session-token");

//   if (!nextAuthSessionToken?.value) {
//     throw new Error('Authentication token is missing');
//   }

//   try {
//     const response = await axios.get(`${process.env.ENVIRONMENT_URL}/api/orders/me`, {
//       headers: {
//         Cookie: `next-auth.session-token=${nextAuthSessionToken.value}`,
//       },
//     });
//     console.log('Server Response:', response);
//     return response.data;
//   } catch (error) {
//     console.error('Error fetching orders:', error.response?.data || error.message);
    
//   }
// };


const MyOrdersPage = async () => {
  // const orders = await getOrders()

  // return <ListOrders orders={orders} />;
  return <ListOrders />
}

export default MyOrdersPage;



// import React from "react";
// import { cookies } from "next/headers";
// import ListOrders from '../../../components/orders/ListOrders';

// const getOrders = async () => {
//   const nextCookies = cookies();
//   const nextAuthSessionToken = nextCookies.get("next-auth.session-token");

//   try {
//     const response = await fetch(`${process.env.ENVIRONMENT_URL}/api/orders/me`, {
//       headers: {
//         Cookie: `next-auth.session-token=${nextAuthSessionToken?.value}`,
//       },
//       cache: 'no-store', // Optional: ensures fresh data
//     });

//     if (!response.ok) {
//       throw new Error('Failed to fetch orders');
//     }

//     const data = await response.json();
//     return data;
//   } catch (error) {
//     console.error("Error fetching orders:", error);
//     return { orders: [] }; // Return an empty array if the fetch fails
//   }
// };

// const MyOrdersPage = async () => {
//   const data = await getOrders();

//   return <ListOrders orders={data.orders} />;
// };

// export default MyOrdersPage;
