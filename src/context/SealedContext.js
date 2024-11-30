'use client'
import { createContext, useState } from "react"
import axios from "axios"
import { useRouter } from "next/navigation"


const SealedContext = createContext();

export const SealedProvider = ({ children }) => {
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(null);
    
    const [updated, setUpdated] = useState(false);
  
    const router = useRouter();

    // creating the branch
    const newSealedCreate = async (sealed) => {
        try {
            const { data } = await axios.post(
              `${process.env.ENVIRONMENT_URL}/api/admin/sealed`,
              sealed
            );
      
            if (data) {
              router.replace("/admin/sealed");
            }
          } catch (error) {
            setError(error?.response?.data?.message);
          }
        };


    // update Products
    const updateSealed = async (sealed, id) => {
      try {
        const { data } = await axios.put(
          `${process.env.ENVIRONMENT_URL}/api/admin/sealed/${id}`,
          sealed
        );

        if (data) {
          setUpdated(true);
          router.replace(`/admin/sealed`);
        }
      } catch (error) {
        setError(error?.response?.data?.message);
      }
    };

      // Delete
  const deleteSealed = async (id) => {
    try {
      const { data } = await axios.delete(
        `${process.env.ENVIRONMENT_URL}/api/admin/sealed/${id}`
      );
      if (data?.success) {
        router.replace(`/admin/sealed`)
      }

    } catch (error) {
      setError(error?.response?.data.message);
    }
  }


    return (
        <SealedContext.Provider

        value={{
            updated,
            setUpdated,
            newSealedCreate,
            updateSealed,
            deleteSealed
        }}

        >
            {children}
        </SealedContext.Provider>
    )
}

export default SealedContext;

