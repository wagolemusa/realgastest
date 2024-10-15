import axios from "axios";
import Profile from "../../components/auth/Profile";
import React from "react"

// import { cookies } from "next/headers";

// const getAddresses = async () => {

//     const nextCookies = cookies();

//   const nextAuthSessionToken = nextCookies.get("next-auth.session-token");
  
//     const { data } = await axios.get(`${process.env.ENVIRONMENT_URL}/api/address`, {
//         headers: {
//             Cookie: `next-auth.session-token=${nextAuthSessionToken?.value}`,
//           },
//     });

//     return data?.addresses
// }


const ProfilePage = async () => {
    // const addresses = await getAddresses()

    return <Profile />;
}

export default ProfilePage;

