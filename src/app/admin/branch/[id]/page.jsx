import React from 'react'
import axios from 'axios';
import UpdateBranch from '../../../../components/admin/branch/UpdateBranch';


const getbranchById = async (id) => {
    const { data } = await axios.get(`${process.env.ENVIRONMENT_URL}/api/admin/branch/${id}`);
    return data;
}

const Allbranch =  async({ params }) => {

    const data = await getbranchById(params.id);
    return <UpdateBranch data={data.branch} />                     
} 

export default Allbranch;

