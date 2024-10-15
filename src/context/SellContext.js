'use client'
import { createContext, useState } from "react"
import axios from "axios"
import { useRouter } from "next/navigation"


const SellContext = createContext();


export const SellProvider = ({ children }) => {
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(null);
    const [updated, setUpdated] = useState(false);
  
    const router = useRouter();

    // creating the sell
    const newSellCreate = async (sell) => {
        try {
            const { data } = await axios.post(
              `${process.env.ENVIRONMENT_URL}/api/admin/sell`,
              sell
            );
      
            if (data) {
              router.replace("/admin/sell");
            }
          } catch (error) {
            setError(error?.response?.data?.message);
          }
        };

    // update Products
    const updateSales = async (sell, id) => {
      try {
        const { data } = await axios.put(
          `${process.env.ENVIRONMENT_URL}/api/admin/sell/${id}`,
          sell
        );

        if (data) {
          setUpdated(true);
          router.replace(`/admin/sell`);
        }
      } catch (error) {
        setError(error?.response?.data?.message);
      }
    };


    return (
        <SellContext.Provider

        value={{
          
            newSellCreate,
            updateSales
        }}

        >
            {children}
        </SellContext.Provider>
    )
}

export default SellContext;

