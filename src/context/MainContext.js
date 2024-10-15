'use client'
import { createContext, useState } from "react"
import axios from "axios"
import { useRouter } from "next/navigation"


const MainContext = createContext();


export const MainProvider = ({ children }) => {
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(null);
    const [updated, setUpdated] = useState(false);
  
    const router = useRouter();

    // creating the branch
    const newBranchCreate = async (branch) => {
        try {
            const { data } = await axios.post(
              `${process.env.ENVIRONMENT_URL}/api/admin/branch`,
              branch
            );
      
            if (data) {
              router.replace("/admin/branch");
            }
          } catch (error) {
            setError(error?.response?.data?.message);
          }
        };



        
    // update Products
    const updateBranchdata = async (branch, id) => {
      try {
        const { data } = await axios.put(
          `${process.env.ENVIRONMENT_URL}/api/admin/branch/${id}`,
          branch
        );

        if (data) {
          setUpdated(true);
          router.replace(`/admin/branch`);
        }
      } catch (error) {
        setError(error?.response?.data?.message);
      }
    };

      // Delete
  const deleteBranch = async (id) => {
    try {
      const { data } = await axios.delete(
        `${process.env.ENVIRONMENT_URL}/api/admin/branch/${id}`
      );
      if (data?.success) {
        router.replace(`/admin/branch`)
      }

    } catch (error) {
      setError(error?.response?.data.message);
    }
  }



    return (
        <MainContext.Provider

        value={{
            error,
            loading,
            updated,
            setLoading,
            setUpdated,
            newBranchCreate,
            deleteBranch,
            updateBranchdata
        }}

        >
            {children}
        </MainContext.Provider>
    )
}

export default MainContext;

