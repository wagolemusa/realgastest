'use client'
import { createContext, useState } from "react"
import axios from "axios"
import { useRouter } from "next/navigation"


const ExpenseContext = createContext();


export const ExpenseProvider = ({ children }) => {
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(null);
    const [updated, setUpdated] = useState(false);
  
    const router = useRouter();

    // creating the branch
    const newexpenseCreate = async (expense) => {
        try {
            const { data } = await axios.post(
              `${process.env.ENVIRONMENT_URL}/api/admin/expense`,
              expense
            );
      
            if (data) {
              router.replace("/admin/expense");
            }
          } catch (error) {
            setError(error?.response?.data?.message);
          }
        };



        
    // update Products
    const updateExpensedata = async (expense, id) => {
      try {
        const { data } = await axios.put(
          `${process.env.ENVIRONMENT_URL}/api/admin/expense/${id}`,
          expense
        );

        if (data) {
          setUpdated(true);
          router.replace(`/admin/expense`);
        }
      } catch (error) {
        setError(error?.response?.data?.message);
      }
    };



    return (
        <ExpenseContext.Provider

        value={{
            error,
            loading,
            updated,
            setLoading,
            setUpdated,
            newexpenseCreate,
            updateExpensedata
        }}

        >
            {children}
        </ExpenseContext.Provider>
    )
}

export default ExpenseContext;
