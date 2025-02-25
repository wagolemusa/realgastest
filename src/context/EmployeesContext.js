'use client'
import { createContext, useState } from "react"
import axios from "axios"
import { useRouter } from "next/navigation"


const EmployeeContext = createContext();


export const EmployeeProvider = ({ children }) => {
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(null);
    
    const [updated, setUpdated] = useState(false);
  
    const router = useRouter();

    // creating the branch
    const newEmplyeeCreate = async (customer) => {
        try {
            const { data } = await axios.post(
              `${process.env.ENVIRONMENT_URL}/api/admin/employee`,
              customer
            );
      
            if (data) {
              router.replace("/admin/employee");
            }
          } catch (error) {
            setError(error?.response?.data?.message);
          }
        };


    // update Products
    const updateEmployee = async (customer, id) => {
      try {
        const { data } = await axios.put(
          `${process.env.ENVIRONMENT_URL}/api/admin/employee/${id}`,
          customer
        );

        if (data) {
          setUpdated(true);
          router.replace(`/admin/employee`);
        }
      } catch (error) {
        setError(error?.response?.data?.message);
      }
    };

      // Delete
  const deleteEmployee = async (id) => {
    try {
      const { data } = await axios.delete(
        `${process.env.ENVIRONMENT_URL}/api/admin/employee/${id}`
      );
      if (data?.success) {
        router.replace(`/admin/employee`)
      }

    } catch (error) {
      setError(error?.response?.data.message);
    }
  }


    return (
        <EmployeeContext.Provider

        value={{
            updated,
            setUpdated,
            newEmplyeeCreate,
            updateEmployee,
            deleteEmployee
        }}

        >
            {children}
        </EmployeeContext.Provider>
    )
}

export default EmployeeContext;

 