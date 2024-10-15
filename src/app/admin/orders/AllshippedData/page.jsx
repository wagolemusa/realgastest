import axios from "axios";
import React from "react"
import { cookies } from "next/headers";

import queryString from "query-string";

import GetAllShippedData from "../../../../components/admin/orders/AllShippedData"


const getOrdersShipped = async (searchParams) => {
  const nextCookies = cookies();

  const nextAuthSessionToken = nextCookies.get("next-auth.session-token");

  const urlParams = {
    page: searchParams.page || 1,
  };

  const searchQuery = queryString.stringify(urlParams);

  const { data } = await axios.get(
    `${process.env.ENVIRONMENT_URL}/api/admin/orders/AllshippedData?${searchQuery}`,
    {
      headers: {
        Cookie: `next-auth.session-token=${nextAuthSessionToken?.value}`,
      },
    }
  );

  return data;
};

const AdminOrdersPageData = async ({ searchParams }) => {
  const orders = await getOrdersShipped(searchParams);

  return <GetAllShippedData orders={orders} />;
};

export default AdminOrdersPageData;