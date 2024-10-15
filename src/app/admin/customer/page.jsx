
import ListCustomer from "../../../components/admin/customer/ListCustomer"
import queryString from 'query-string'
import axios from 'axios';


const getCustomers = async (searchParams ) => {

    const urlParams = {
        page: searchParams.page,
    };

    const searchQuery = queryString.stringify(urlParams)

    const { data } = await axios.get(`${process.env.ENVIRONMENT_URL}/api/admin/customer?${searchQuery}`);
    return data;
}


const CustomerPage = async ({ searchParams }) => {
    const data = await getCustomers(searchParams)

    return <ListCustomer  data={data} />
}

export default CustomerPage;

