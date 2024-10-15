'use client'
import { createContext, useState } from "react"
import axios from "axios"
import { useRouter } from "next/navigation"


const InstallmentContext = createContext();


export const InstallmentProvider = ({ children }) => {
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(null);
    
    const [updated, setUpdated] = useState(false);
  
    const router = useRouter();

    // creating new Installment
    const newInstallmentCreate = async (installment) => {
        try {
            const { data } = await axios.post(
              `${process.env.ENVIRONMENT_URL}/api/admin/installment`,
                installment
            );
      
            if (data) {
              router.replace("/admin/installment");
            }
          } catch (error) {
            setError(error?.response?.data?.message);
          }
        };


        // Create Installment payment
        const newSecandPaidCreate = async (installment) => {
            try {
                const { data } = await axios.post(
                  `${process.env.ENVIRONMENT_URL}/api/admin/installment`,
                    installment
                );
          
                if (data) {
                  router.replace("/admin/installment");
                }
              } catch (error) {
                setError(error?.response?.data?.message);
              }
            };
    

    // update Installment Status
    const updatePaidStatus = async (installment, id) => {
      try {
        const { data } = await axios.put(
          `${process.env.ENVIRONMENT_URL}/api/admin/installment/${id}`,
          installment
        );

        if (data) {
          setUpdated(true);
          router.replace(`/admin/installment`);
        }
      } catch (error) {
        setError(error?.response?.data?.message);
      }
    };



    return (
        <InstallmentContext.Provider

        value={{
            updated,
            setUpdated,
            newInstallmentCreate,
            newSecandPaidCreate,
            updatePaidStatus,
        }}

        >
            {children}
        </InstallmentContext.Provider>
    )
}

export default InstallmentContext;



