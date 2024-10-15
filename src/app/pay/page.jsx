// import axios from "axios";
// import React from "react"

// import { cookies } from "next/headers";
// // import Shipping from "../../components/cart/Shipping";
// import Pay from '../../components/cart/Pay'

// const getAddresses = async () => {
//   const nextCookies = cookies();
//   const nextAuthSessionToken = nextCookies.get("next-auth.session-token");

//   try {
//     const { data } = await axios.get(`${process.env.ENVIRONMENT_URL}/api/address`, {
//       headers: {
//         Cookie: `next-auth.session-token=${nextAuthSessionToken?.value}`,
//       },
//     });
//     return data?.addresses;
//   } catch (error) {
//     console.error("Error fetching addresses:", error.response?.data || error.message);
//     throw error;
//   }
// };

// const Payment = async () => {
//     const addresses = await getAddresses()

//     return <Pay addresses={addresses} />;
// }

// export default Payment;


// pages/pay.js (or wherever this component is rendered)


// app/pay/page.js
// import { getServerSession } from "next-auth";
// import { authOptions } from "../../lib/authOptions";
// import Pay from '../../components/cart/Pay';
// import fetchAddressesForUser from "../../lib/fetchAddressesForUser"; // Mock function to fetch user addresses

// export default async function PayPage() {
//   const session = await getServerSession(authOptions);

//   // Assuming you have a function to fetch the user's addresses
//   const addresses = await fetchAddressesForUser(session?.user?.id);

//   return (
//     <div>
//       {/* Pass the session and addresses to the client component */}
//       <Pay session={session} addresses={addresses} />
//     </div>
//   );
// }


import axios from "axios";
import { cookies } from "next/headers";
import { getServerSession } from "next-auth";
import { authOptions } from "../../lib/authOptions";
import Pay from '../../components/cart/Pay';

export default async function PayPage() {
  const session = await getServerSession(authOptions);

  // Fetch addresses for the user
  const nextCookies = cookies();
  const nextAuthSessionToken = nextCookies.get("next-auth.session-token");

  let addresses = [];
  if (session?.user?.id) {
    try {
      const { data } = await axios.get(`${process.env.ENVIRONMENT_URL}/api/address`, {
        headers: {
          Cookie: `next-auth.session-token=${nextAuthSessionToken?.value}`,
        },
      });
      addresses = data?.addresses || [];
    } catch (error) {
      console.error("Error fetching addresses:", error.response?.data || error.message);
    }
  }

  return (
    <div>
      {/* Pass the session and addresses to the client component */}
      <Pay session={session} addresses={addresses} />
    </div>
  );
}
