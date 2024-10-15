'use client'
import { createContext, useState } from "react"
import axios from "axios"
import { useRouter } from "next/navigation"


const CustomerContext = createContext();


export const CustomerProvider = ({ children }) => {
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(null);
    
    const [updated, setUpdated] = useState(false);
  
    const router = useRouter();

    // creating the branch
    const newCustomerCreate = async (customer) => {
        try {
            const { data } = await axios.post(
              `${process.env.ENVIRONMENT_URL}/api/admin/customer`,
              customer
            );
      
            if (data) {
              router.replace("/admin/customer");
            }
          } catch (error) {
            setError(error?.response?.data?.message);
          }
        };


    // update Products
    const updateCustomer = async (customer, id) => {
      try {
        const { data } = await axios.put(
          `${process.env.ENVIRONMENT_URL}/api/admin/customer/${id}`,
          customer
        );

        if (data) {
          setUpdated(true);
          router.replace(`/admin/customer`);
        }
      } catch (error) {
        setError(error?.response?.data?.message);
      }
    };

      // Delete
  const deleteCustomer = async (id) => {
    try {
      const { data } = await axios.delete(
        `${process.env.ENVIRONMENT_URL}/api/admin/customer/${id}`
      );
      if (data?.success) {
        router.replace(`/admin/products`)
      }

    } catch (error) {
      setError(error?.response?.data.message);
    }
  }


    return (
        <CustomerContext.Provider

        value={{
            updated,
            setUpdated,
            newCustomerCreate,
            updateCustomer,
            deleteCustomer
        }}

        >
            {children}
        </CustomerContext.Provider>
    )
}

export default CustomerContext;

