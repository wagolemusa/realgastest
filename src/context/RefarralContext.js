'use client'
import { createContext, useState } from "react"
import axios from "axios"
import { useRouter } from "next/navigation"


const ReffaralContext = createContext();


export const ReferralProvider = ({ children }) => {
    const [error, setError] = useState(null);
    const [updated, setUpdated] = useState(false);
  
    const router = useRouter();



    // update Reffaral
    const updateReferral = async (refferal, id) => {
      try {
        const { data } = await axios.put(
          `${process.env.ENVIRONMENT_URL}/api/admin/referral/${id}`,
          refferal
        );

        if (data) {
          setUpdated(true);
          router.replace(`/admin/referral`);
        }
      } catch (error) {
        setError(error?.response?.data?.message);
      }
    };


    return (
        <ReffaralContext.Provider

        value={{
            error,
            updated,
            setError,
            setUpdated,
            updateReferral
        }}

        >
            {children}
        </ReffaralContext.Provider>
    )
}

export default ReffaralContext;

