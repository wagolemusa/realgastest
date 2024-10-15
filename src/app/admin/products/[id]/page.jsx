import React from 'react'
import axios from 'axios';
import UpdateProduct from '../../../../components/admin/UpdateProduct';


const getProducts = async (id) => {
    const { data } = await axios.get(`${process.env.ENVIRONMENT_URL}/api/products/${id}`);
    return data;
}

const AllProducts =  async({ params }) => {

    const data = await getProducts(params.id);
    return <UpdateProduct data={data.product} />                     
} 

export default AllProducts;
