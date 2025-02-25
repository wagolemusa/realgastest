import queryString from 'query-string'
import axios from 'axios';
import ListEmployee from "../../../components/admin/employee/ListEmployee";


const getEmployee = async (searchParams ) => {

    const urlParams = {
        page: searchParams.page,
    };
    const searchQuery = queryString.stringify(urlParams)

    const { data } = await axios.get(`${process.env.ENVIRONMENT_URL}/api/admin/employee?${searchQuery}`);
    return data;
}


const EmployeePage = async ({ searchParams }) => {
    const data = await getEmployee(searchParams)

    return <ListEmployee  data={data} />
}

export default EmployeePage;