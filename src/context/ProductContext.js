"use client";
import { createContext, useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";

const ProductContext = createContext();

export const ProductProvider = ({ children }) => {
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(null);
  const [updated, setUpdated] = useState(false);

  const router = useRouter();

  // Create Products
  const newProduct = async (product) => {
    try {
      const { data } = await axios.post(
        `${process.env.ENVIRONMENT_URL}/api/admin/products`,
        product
      );

      if (data) {
        router.replace("/admin/products");
      }
    } catch (error) {
      setError(error?.response?.data?.message);
    }
  };


  // update Products
  const updateProduct = async (product, id) => {
    try {
      const { data } = await axios.put(
        `${process.env.ENVIRONMENT_URL}/api/admin/products/${id}`,
        product
      );

      if (data) {
        setUpdated(true);
        router.replace(`/admin/products/${id}`);
      }
    } catch (error) {
      setError(error?.response?.data?.message);
    }
  };


  // Upload Images
  const uploadProductImages = async (formData, id) => {
    try {
      setLoading(true);
      const { data } = await axios.post(
        `${process.env.ENVIRONMENT_URL}/api/admin/products/upload_images/${id}`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      if (data?.data) {
        setLoading(false);
        router.replace("/admin/products");
      }
    } catch (error) {
      setError(error?.response?.data?.message);
    }
  };

  // Delete
  const deleteProduct = async (id) => {
    try {
      const { data } = await axios.delete(
        `${process.env.ENVIRONMENT_URL}/api/admin/products/${id}`
      );
      if (data?.success) {
        router.replace(`/admin/products`)
      }

    } catch (error) {
      setError(error?.response?.data.message);
    }
  }


  const postReview = async (reviewData) => {
    try {
      const { data } = await axios.put(
        `${process.env.ENVIRONMENT_URL}/api/products/review`,
        reviewData
      );

      if (data?.success) {
        router.replace(`/product/${reviewData?.productId}`);
      }
    } catch (error) {
      setError(error?.response?.data?.message);
    }
  };

  // clear Errors
  const clearErrors = () => {
    setError(null);
  };

  return (
    <ProductContext.Provider
      value={{
        error,
        loading,
        updated,
        uploadProductImages,
        setUpdated,
        newProduct,
        updateProduct,
        clearErrors,
        deleteProduct,
        postReview
      }}
    >
      {children}
    </ProductContext.Provider>
  );
};

export default ProductContext;