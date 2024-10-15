
import React from "react"
import UpdateAddress from "../../../components/user/UpdateAddress";
import { cookies } from "next/headers";
import axios from "axios";

const nextCookies = cookies();

const nextAuthSessionToken = nextCookies.get("next-auth.session-token");

const getAddress = async (id) => {

    const { data } = await axios.get(`${process.env.ENVIRONMENT_URL}/api/address/${id}`, {
        headers: {
            Cookie: `next-auth.session-token=${nextAuthSessionToken?.value}`,
          },
    });

    return data?.address;
}

const UpdateAddressPage = async ({ params }) => {
    const data = await getAddress(params?.id);

    return <UpdateAddress  data={data.addresses}/>;
}

export default UpdateAddressPage;

