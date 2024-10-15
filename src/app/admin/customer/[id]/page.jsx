import React from 'react'
import axios from 'axios';
import UpdateCustomePage from '../../../../components/admin/customer/updateCustomer';


const getCustomerById = async (id) => {
    const { data } = await axios.get(`${process.env.ENVIRONMENT_URL}/api/admin/customer/${id}`);
    return data;
}

const Allcustomers =  async({ params }) => {

    const data = await getCustomerById(params.id);
    return <UpdateCustomePage data={data.customer} />                     
} 

export default Allcustomers;

