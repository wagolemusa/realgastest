import React from 'react'
import axios from 'axios';
import UpdateSales from '../../../../components/admin/sell/UpdateSales';


const getCustomerById = async (id) => {
    const { data } = await axios.get(`${process.env.ENVIRONMENT_URL}/api/admin/sell/${id}`);
    return data;
}

const Allcustomers =  async({ params }) => {

    const data = await getCustomerById(params.id);
    return <UpdateSales data={data.sell} />                     
} 

export default Allcustomers;

