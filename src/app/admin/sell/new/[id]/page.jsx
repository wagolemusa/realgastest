import axios from "axios";
import React from "react";
import VeiwSales from "../../../../../components/admin/sell/ViewSales";

const getSelasById  = async(id) =>{
    const { data } = await axios.get(`${process.env.ENVIRONMENT_URL}/api/admin/sell/${id}`);
    return data
}

const ViewsalesData = async({params}) => {

    const data = await getSelasById(params.id);
        return <VeiwSales data={data.sell} />
}

export default ViewsalesData

