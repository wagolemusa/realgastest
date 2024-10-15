import axios from "axios";
import React from "react"
import { cookies } from "next/headers";

import queryString from "query-string";

import ShippedData from "../../../../components/admin/orders/Shipped"

const getOrdersShipped = async (searchParams) => {
  const nextCookies = cookies();

  const nextAuthSessionToken = nextCookies.get("next-auth.session-token");

  const urlParams = {
    page: searchParams.page || 1,
  };

  const searchQuery = queryString.stringify(urlParams);

  const { data } = await axios.get(
    `${process.env.ENVIRONMENT_URL}/api/admin/orders/shippingToday?${searchQuery}`,
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

  return <ShippedData orders={orders} />;
};

export default AdminOrdersPageData;