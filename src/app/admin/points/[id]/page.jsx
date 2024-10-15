import React from 'react'
import axios from 'axios';
import UpdatePoints from '../../../../components/admin/point/UpdatePoints';


const getPointsById = async (id) => {
    const { data } = await axios.get(`${process.env.ENVIRONMENT_URL}/api/admin/points/${id}`);
    return data;
}

const Allpoints =  async({ params }) => {

    const data = await getPointsById(params.id);
    return <UpdatePoints data={data.point} />                     
} 

export default Allpoints;

