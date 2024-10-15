'use client'
import { createContext, useState } from "react"
import axios from "axios"
import { useRouter } from "next/navigation"


const GasContext = createContext();


export const GasProvider = ({ children }) => {
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(null);
  const [updated, setUpdated] = useState(false);

  const router = useRouter();

  // creating the sell
  const newGasCreate = async (gas) => {
    try {
      const { data } = await axios.post(
        `${process.env.ENVIRONMENT_URL}/api/admin/gas`,
        gas
      );

      if (data) {
        router.replace("/admin/gas");
      }
    } catch (error) {
      setError(error?.response?.data?.message);
    }
  };


  // update Products
  const updateGas = async (gas, id) => {
    try {
      const { data } = await axios.put(
        `${process.env.ENVIRONMENT_URL}/api/admin/gas/${id}`,
        gas
      );

      if (data) {
        setUpdated(true);
        router.replace("/admin/gas");
      }
    } catch (error) {
      setError(error?.response?.data?.message);
    }
  };


  // Delete
  const deleteGas = async (id) => {
    try {
      const { data } = await axios.delete(
        `${process.env.ENVIRONMENT_URL}/api/admin/gas/${id}`
      );
      if (data?.success) {
        router.replace(`/admin/gas`)
      }

    } catch (error) {
      setError(error?.response?.data.message);
    }
  }


  // Upload Images
  const uploadProductImages = async (formData, id) => {
    try {
      setLoading(true);
      const { data } = await axios.post(
        `${process.env.ENVIRONMENT_URL}/api/admin/gas/upload_images/${id}`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      if (data?.data) {
        setLoading(false);
        router.replace("/admin/gas");
      }
    } catch (error) {
      setError(error?.response?.data?.message);
    }
  };

  return (
    <GasContext.Provider

      value={{
        
        newGasCreate,
        updateGas,
        deleteGas,
        uploadProductImages,
        error,
        updated,
        setUpdated,
        setError
      }}

    >
      {children}
    </GasContext.Provider>
  )
}

export default GasContext;

