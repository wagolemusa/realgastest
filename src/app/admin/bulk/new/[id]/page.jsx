import axios from "axios";
import React from "react";

import GetBulkData from "../../../../../components/admin/bulk/ViewBulk";

const getBulkById = async(id) => {
    const { data } = await axios.get(`${process.env.ENVIRONMENT_URL}/api/admin/bulk/${id}`);
    return data
}

const allBulkdata = async({ params }) => {
    const data = await getBulkById(params.id);
    return <GetBulkData data={data.bulk} />

}

export default allBulkdata;

