'use client'

import React, { useContext, useState, useEffect } from "react";

// import BreadCrumbs from "../layout/BreadCrumbs";
import { useSearchParams, useRouter } from "next/navigation";
import { countries } from "countries-list";
import Sidebar from "../layouts/Sidebar";
import AuthContext from "../../context/AuthContext";

const NewAddress = () => {
    const router = useRouter();
    const { error, addNewAddress, clearErrors } = useContext(AuthContext)
    const { user } = useContext(AuthContext);

    const [ street, setStreet ] = useState('');
    const [ phoneNo, setPhoneNo ] = useState('');
    const [locationArea, setLocationArea] = useState('');
    const [ mapurl, setMapurl] = useState('');
    const [describeLocation, setDescribeLocation] = useState('');

    useEffect(() => {
      if (error) {
        toast.error(error);
        clearErrors();
      }
    }, [error, clearErrors]);
  
    const submitHandler = (e) =>{
        e.preventDefault();

        const newAddress = {
            street,
            phoneNo,
            locationArea,
            mapurl,
            describeLocation,
            user
        }

        addNewAddress(newAddress)
        router.replace("/pay");

    }
  return (
    <>
      
      <section className="py-10">
        <div className="container max-w-screen-xl mx-auto px-4">
          <div className="flex flex-col md:flex-row -mx-4">
            {/* <Sidebar/> */}
            <main className="md:w-2/3 lg:w-3/4 px-4">
              <div
                style={{ maxWidth: "480px" }}
                className="mt-1 mb-20 p-4 md:p-7 mx-auto rounded bg-white shadow-lg"
              >
                <form onSubmit={submitHandler} >
                  <h2 className="mb-5 text-2xl font-semibold">
                    Add new Address
                  </h2>

                  <div className="mb-4 md:col-span-2">
                    <label className="block mb-1"> Address* </label>
                    <input
                      className="appearance-none border border-gray-200 bg-gray-100 rounded-md py-2 px-3 hover:border-gray-400 focus:outline-none focus:border-gray-400 w-full"
                      type="text"
                      placeholder="Type your address"
                      value={street}
                      onChange={(e) => setStreet(e.target.value)}
                    />
                  </div>
                  <div className="mb-4 md:col-span-2">
                    <label className="block mb-1"> Phone  </label>
                    <input
                      className="appearance-none border border-gray-200 bg-gray-100 rounded-md py-2 px-3 hover:border-gray-400 focus:outline-none focus:border-gray-400 w-full"
                      type="number"
                      placeholder="Phone Number"
                      value={phoneNo}
                      onChange={(e) => setPhoneNo(e.target.value)}
                    />
                  </div>
                  <div className="mb-4 md:col-span-2">
                    <label className="block mb-1"> Area of your Location </label>
                    <input
                      className="appearance-none border border-gray-200 bg-gray-100 rounded-md py-2 px-3 hover:border-gray-400 focus:outline-none focus:border-gray-400 w-full"
                      type="text"
                      placeholder=""
                      value={locationArea}
                      onChange={(e) => setLocationArea(e.target.value)}
                    />
                  </div>

                  <div className="mb-4 md:col-span-2">
                    <label className="block mb-1"> Share your Map or Codinates </label>
                    <input
                      className="appearance-none border border-gray-200 bg-gray-100 rounded-md py-2 px-3 hover:border-gray-400 focus:outline-none focus:border-gray-400 w-full"
                      type="text"
                      placeholder="Share your map or Codinates"
                      value={mapurl}
                      onChange={(e) => setMapurl(e.target.value)}
                    />
                  </div>
                  <div className="mb-4 md:col-span-2">
                    <label className="block mb-1"> Describe your Location  </label>
                    <input
                      className="appearance-none border border-gray-200 bg-gray-100 rounded-md py-2 px-3 hover:border-gray-400 focus:outline-none focus:border-gray-400 w-full"
                      type="text"
                      placeholder="Describe your Location"
                      value={describeLocation}
                      onChange={(e) => setDescribeLocation(e.target.value)}
                    />
                  </div>
       


                  <button
                    type="submit"
                    className="my-2 px-4 py-2 text-center w-full inline-block text-white bg-blue-600 border border-transparent rounded-md hover:bg-blue-700"
                  >
                    Add
                  </button>
                </form>
              </div>
            </main>
          </div>
        </div>
      </section>
    </>
  );
};

export default NewAddress;