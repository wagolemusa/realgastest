
import ListUpdateSeal from '../../../components/admin/updatedseal/Listupdatedseal';
import queryString from 'query-string'
import axios from 'axios';


const getListedseal = async (searchParams ) => {

    const urlParams = {
        page: searchParams.page,
    };

    const searchQuery = queryString.stringify(urlParams)

    const { data } = await axios.get(`${process.env.ENVIRONMENT_URL}/api/admin/updatedseal?${searchQuery}`);
    return data;
}

const SealedListPage = async ({ searchParams }) => {
    const data = await getListedseal(searchParams)

    return <ListUpdateSeal  data={data} />
}

export default SealedListPage;






