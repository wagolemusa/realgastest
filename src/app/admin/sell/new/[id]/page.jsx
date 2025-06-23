// import axios from "axios";
// import React from "react";
// import VeiwSales from "../../../../../components/admin/sell/ViewSales";

// const getsalesById  = async(id) =>{
//     const { data } = await axios.get(`${process.env.ENVIRONMENT_URL}/api/admin/sell/${id}`);
//     return data
// }

// // console.log("vvv", data)
// const ViewsalesData = async({params}) => {

//     const data = await getsalesById(params.id);
//         return <VeiwSales data={data.sell} />
// }

// export default ViewsalesData




import axios from "axios";
import React from "react";
import ViewSales from "../../../../../components/admin/sell/ViewSales";

const getsalesById = async (id) => {
  try {
    const { data } = await axios.get(
      `${process.env.ENVIRONMENT_URL}/api/admin/sell/${id}`);
    return data;
  } catch (error) {
    console.error("Error fetching sale:", error.response?.data || error.message);
    // You might want to handle different error statuses differently
    if (error.response?.status === 401) {
      // Handle unauthorized access (redirect to login maybe)
      throw new Error("Unauthorized access");
    } else if (error.response?.status === 404) {
      // Handle not found
      throw new Error("Sale not found");
    }
    throw error;
  }
};

const ViewSalesData = async ({ params }) => {
  try {
    const data = await getsalesById(params.id);
    return <ViewSales data={data.sell} />;
  } catch (error) {
    // Handle the error in your UI
    return (
      <div className="p-4 text-red-500">
        Error loading sale data: {error.message}
      </div>
    );
  }
};

export default ViewSalesData;