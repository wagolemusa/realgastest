import React from 'react'
import axios from 'axios';
import UpdateExpenses from '../../../../components/admin/expense/UpdateExpense'


const getExpenseById = async (id) => {
    const { data } = await axios.get(`${process.env.ENVIRONMENT_URL}/api/admin/expense/${id}`);
    return data;
}

const Allexpense =  async({ params }) => {

    const data = await getExpenseById(params.id);
    return <UpdateExpenses data={data.expense} />                     
} 

export default Allexpense;
