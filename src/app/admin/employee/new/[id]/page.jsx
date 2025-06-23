import React from 'react'
import axios from 'axios';
import Getemployee from '../../../../../components/admin/employee/ViewEmployee'


const getEmployeeById = async (id) => {
    const { data } = await axios.get(`${process.env.ENVIRONMENT_URL}/api/admin/employee/${id}`);
    return data;
}

const Allemployee =  async({ params }) => {

    const data = await getEmployeeById(params.id);
    
    return <Getemployee data={data.employee} />                     
} 

export default Allemployee;
