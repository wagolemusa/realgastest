// 'use client'
import { useState } from "react";
import { useRouter } from "next/navigation";


const VeiwSales = () =>{

    // const  [data, setData] = useState(null);
    // const [ error, setError] = useState(null);
    // const router = useRouter()

    // useEffect(() => {
    //     async function fetchData(){
    //         try{
    //             const response = await axios.get(`${process.env.ENVIRONMENT_URL}/api/admin/sell`);
    //             setData(response.data);
    //         } catch(error){
    //             setError('Failed to fetch data');
    //             console.error('Error fetching data:', error);
    //         }
    //     }
    //     fetchData();
    // }, []);

    return(
        <Suspense className="customer relative overflow-x-auto shadow-md sm:rounded-lg">
        <h1 className="text-3xl my-5 ml-4 font-bold">
        <Link href="/admin/sell/new" className="btn btn-primary">Create Sales</Link></h1>
       
       <h2>refuge wisae</h2>
        </Suspense>
    )
}

export default VeiwSales;