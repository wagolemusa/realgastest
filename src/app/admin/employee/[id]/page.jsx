import React from 'react'
import axios from 'axios';
import UpdateEmployeePage from '../../../../components/admin/employee/updateEmployee';


const getEmployeeById = async (id) => {
    const { data } = await axios.get(`${process.env.ENVIRONMENT_URL}/api/admin/employee/${id}`);
    return data;
}

const Allemployee =  async({ params }) => {

    const data = await getEmployeeById(params.id);
    return <UpdateEmployeePage data={data.employee} />                     
} 

export default Allemployee;

