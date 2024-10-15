import React from 'react'
import axios from 'axios';
import ListCompany from '../../../../components/admin/company/ListCompany'


// const getCompanydataById = async (id) => {
//     const { data } = await axios.get(`${process.env.ENVIRONMENT_URL}/api/admin/company/${id}`);
//     return data;
// }

const AllCompany =  async({ params }) => {

    // const data = await getCompanydataById(params.id);
    return <ListCompany id={params.id} />                     
} 

export default AllCompany;

