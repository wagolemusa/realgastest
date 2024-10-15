import React from 'react'
import axios from 'axios';
import Getcustomers from '../../../../../components/admin/customer/ViewCustomers'


const getCustomerById = async (id) => {
    const { data } = await axios.get(`${process.env.ENVIRONMENT_URL}/api/admin/customer/${id}`);
    return data;
}

const Allcustomers =  async({ params }) => {

    const data = await getCustomerById(params.id);
    
    return <Getcustomers data={data.customer} />                     
} 

export default Allcustomers;
