import UpdateReferralPage from "../../../../components/admin/referral/withdrawPoints"
import axios from "axios";


const getCustomerById = async (id) => {
        const { data } = await axios.get(`${process.env.ENVIRONMENT_URL}/api/admin/referral/${id}`);
        return data;
    }
    
    const updateReferral =  async({ params }) => {
    
        const data = await getCustomerById(params.id);
        return <UpdateReferralPage data={data.refer} />                     
    } 


export default updateReferral;


