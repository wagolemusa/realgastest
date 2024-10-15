import React from 'react'
import axios from 'axios';
import UpdateInstallment from "../../../../components/admin/installment/UpdateInstallment"


const getInstallById = async (id) => {
    const { data } = await axios.get(`${process.env.ENVIRONMENT_URL}/api/admin/installment/${id}`);
    return data;
}

const InstallmentID =  async({ params }) => {

    const data = await getInstallById(params.id);
    return <UpdateInstallment data={data.installment} />                     
} 

export default InstallmentID;



