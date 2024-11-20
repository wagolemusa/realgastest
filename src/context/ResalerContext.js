'use client'
import { createContext, useState } from "react"
import axios from "axios"
import { useRouter } from "next/navigation"


const ResalerContext = createContext();


export const ResalerProvider = ({ children }) => {
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(null);
    
    const [updated, setUpdated] = useState(false);
  
    const router = useRouter();

    // creating the branch
    const newResalerCreate = async (resaler) => {
        try {
            const { data } = await axios.post(
              `${process.env.ENVIRONMENT_URL}/api/admin/resaler`,
              resaler
            );
      
            if (data) {
              router.replace("/admin/resaler");
            }
          } catch (error) {
            setError(error?.response?.data?.message);
          }
        };


    // update Products
    const updateResaler = async (resaler, id) => {
      try {
        const { data } = await axios.put(
          `${process.env.ENVIRONMENT_URL}/api/admin/resaler/${id}`,
          resaler
        );

        if (data) {
          setUpdated(true);
          router.replace(`/admin/resaler`);
        }
      } catch (error) {
        setError(error?.response?.data?.message);
      }
    };

      // Delete
  const deleteResaler = async (id) => {
    try {
      const { data } = await axios.delete(
        `${process.env.ENVIRONMENT_URL}/api/admin/resaler/${id}`
      );
      if (data?.success) {
        router.replace(`/admin/resaler`)
      }

    } catch (error) {
      setError(error?.response?.data.message);
    }
  }


    return (
        <ResalerContext.Provider

        value={{
            updated,
            setUpdated,
            newResalerCreate,
            updateResaler,
            deleteResaler
        }}

        >
            {children}
        </ResalerContext.Provider>
    )
}

export default ResalerContext;

