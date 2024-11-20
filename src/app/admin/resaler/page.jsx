import queryString from 'query-string'
import axios from 'axios';
import ListResaler from "../../../components/admin/resaler/listResaler";


const getResaler = async (searchParams ) => {

    const urlParams = {
        page: searchParams.page,
    };

    const searchQuery = queryString.stringify(urlParams)

    const { data } = await axios.get(`${process.env.ENVIRONMENT_URL}/api/admin/resaler?${searchQuery}`);
    return data;
}


const ResalerPage = async ({ searchParams }) => {
    const data = await getResaler(searchParams)

    return <ListResaler  data={data} />
}

export default ResalerPage;

