'use client'
import { createContext, useState } from "react"
import axios from "axios"
import { useRouter } from "next/navigation"


const InvetoryContext = createContext();


export const InvetoryProvider = ({ children }) => {
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(null);
    const [updated, setUpdated] = useState(false);
  
    const router = useRouter();

    // creating the sell
    const newInvetoryCreate = async (sell) => {
        try {
            const { data } = await axios.post(
              `${process.env.ENVIRONMENT_URL}/api/admin/invetory`,
              sell
            );
      
            if (data) {
              router.replace("/admin/invetory");
            }
          } catch (error) {
            setError(error?.response?.data?.message);
          }
        };




    return (
        <InvetoryContext.Provider

        value={{
          
            newInvetoryCreate,
        }}

        >
            {children}
        </InvetoryContext.Provider>
    )
}

export default InvetoryContext;

