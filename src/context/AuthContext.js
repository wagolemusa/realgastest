"use client";

import axios from "axios";
import { useRouter } from "next/router";
import { createContext, useState } from 'react';

const AuthContext = createContext();


export const AuthProvider =({ children }) => {
    const [user, setUser] = useState(null);
    const [ error, setError] = useState(null);
    const [loading, setLoading] = useState(null)
    const [updated, setUpdated] = useState(false);

    const router = useRouter;
    
    // Register user
    const registerUser = async ({ name, username, email, referalCode, password }) => {
      try {
          const { data } = await axios.post(
              `${process.env.ENVIRONMENT_URL}/api/auth/register`,
              {
                  name,
                  username,
                  email,
                  referalCode,
                  password
              }
          );
  
          // If registration is successful, return user data
          return { user: data.user };
          
      } catch (error) {
          // Return error message for handling in the component
          return { error: error?.response?.data?.message || "Registration failed. Please try again." };
      }
  };
  


    // // Load User
    // const loadUser = async () => {
    //     try {
    //         setLoading(true);
      
    //         const { data } = await axios.get(
    //             "/api/auth/session?update"
    //         );
      
    //         if (data?.user) {
    //             setUser(data.user)
    //             router.replace("/login")
    //         }
    //       } catch (error) {
    //         setLoading(false);
    //         setError(error?.response?.data?.message);
    //       }
    // }
// Load User
    // const loadUser = async () => {
    //   try {
    //     setLoading(true);

    //     const { data } = await axios.get("/api/auth/session?update");

    //     if (data?.user) {
    //       setUser(data.user); // User is logged in, set user data
    //       localStorage.setItem("user", JSON.stringify(data.user));
    //     } else {
    //       router.replace("/login"); // No user data, redirect to login
    //     }
    //   } catch (error) {
    //     setError(error?.response?.data?.message || "An error occurred");
    //   } finally {
    //     setLoading(false);
    //   }
    // };
          const loadUser = async () => {
            try {
                setLoading(true);
        
                // Fetch session from next-auth
                const { data } = await axios.get("/api/auth/session?update");
        
                if (data?.user) {
                    setUser(data.user); // Update context with user data
                    localStorage.setItem("user", JSON.stringify(data.user));
                    window.location.reload(); // Refresh the page to reflect user data
                } else {
                    setUser(null); // Clear user context
                    router.replace("/login"); // Redirect to login if no user
                }
            } catch (error) {
                setError(error?.response?.data?.message || "An error occurred");
            } finally {
                setLoading(false);
            }
        };
        
  

            // update Profile
            const updateProfile = async (formData) => {
                try {
                  setLoading(true);
            
                  const { data } = await axios.put(
                    `${process.env.ENVIRONMENT_URL}/api/auth/me/update`,
                    formData,
                    {
                      headers: {
                        "Content-Type": "multipart/form-data",
                      },
                    }
                  );
            
                  if (data?.user) {
                    loadUser();
                    setLoading(false);
                  }
                } catch (error) {
                  setLoading(false);
                  setError(error?.response?.data?.message);
                }
              };

    // Add Address
    const addNewAddress = async(address) => {
        try{
            const { data } = await axios.post(
                `${process.env.ENVIRONMENT_URL}/api/address`,
                address
            )
            if(data){
                router.push("/me");
            }
        }catch(error){
            setError(error?.response?.data?.message)
        }
    }


    // Update Address 
    const updateAddress = async(id, address) => {
        try{
            const { data } = await axios.put(
                `${process.env.ENVIRONMENT_URL}/api/address/${id}`,
                address
            );
            if(data?.address){
                setUpdated(true)
                router.replace(`/address/${id}`);
            }
        }catch(error){
            setError(error?.response?.data.message);
        }
    }

    // update Password
    const updatePassword = async ({ currentPassword, newPassword }) => {
        try {
          const { data } = await axios.put(
            `${process.env.ENVIRONMENT_URL}/api/auth/me/update_password`,
            {
              currentPassword,
              newPassword,
            }
          );
    
          if (data?.success) {
            router.replace("/me");
          }
        } catch (error) {
          console.log(error.response);
          setError(error?.response?.data?.message);
        }
      };

     // update user
      const updateUser = async (id, userData) => {
        try {
          const { data } = await axios.put(
            `${process.env.ENVIRONMENT_URL}/api/admin/users/${id}`,
            {
              userData,
            }
          );
    
          if (data?.success) {
            setUpdated(true);
            router.replace(`/admin/users/${id}`);
          }
        } catch (error) {
          setError(error?.response?.data?.message);
        }
      }

          // Delete USer
      const deleteUser = async (id) => {
        try {
          const { data } = await axios.delete(
            `${process.env.ENVIRONMENT_URL}/api/admin/users/${id}`
          );
    
          if (data?.success) {
            
            router.replace(`/admin/users`);
          }
        } catch (error) {
          setError(error?.response?.data?.message);
        }
      };
    
      
        // Dalete Address 
        const deleteAddress = async(id) => {
            try{
                const { data } = await axios.delete(
                    `${process.env.ENVIRONMENT_URL}/api/address/${id}`
                );
                if(data?.success){
                  router.push("/me")
                }
            }catch(error){
                setError(error?.response?.data.message);
            }
        }   
    

    const clearErrors = () => {
        setError(null)
    }

    return(
        <AuthContext.Provider
            value={{
                user, 
                setUser,
                error,
                setError,
                updated,
                loading,
                registerUser,
                addNewAddress,
                updateProfile,
                updatePassword,
                updateAddress,
                deleteAddress,
                updateUser,
                deleteUser,
                setUpdated,
                clearErrors
            }}
        >
            {children}
        </AuthContext.Provider>
    )
}

export default AuthContext;
