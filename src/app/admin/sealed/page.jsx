import ListSealed from "../../../components/admin/sealed/Listsealed";
import queryString from 'query-string'
import axios from 'axios';


const getListSealed = async (searchParams ) => {

    const urlParams = {
        page: searchParams.page,
    };

    const searchQuery = queryString.stringify(urlParams)

    const { data } = await axios.get(`${process.env.ENVIRONMENT_URL}/api/admin/sealed?${searchQuery}`);
    return data;
}


const SealedListPage = async ({ searchParams }) => {
    const data = await getListSealed(searchParams)

    return <ListSealed  data={data} />
}

export default SealedListPage;






