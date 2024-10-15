'use client';
import Link from "next/link";
import React, { useState, useEffect } from "react";
import axios from "axios";

const UserAddresses = () => {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await axios.get(`${process.env.ENVIRONMENT_URL}/api/address`);
        setData(response.data);
      } catch (error) {
        setError('Failed to fetch data');
        console.error('Error fetching data', error);
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, []);


  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div>
      {data?.addresses?.length > 0 ? (
        data.addresses.map((address) => (
          <div key={address._id} className="mb-5 gap-4">
            <Link href={`/address/${address._id}`}>
              <figure className="w-full flex align-center bg-gray-100 p-4 rounded-md cursor-pointer">
                <div className="mr-3">
                  <span className="flex items-center justify-center text-yellow-500 w-12 h-12 bg-white rounded-full shadow mt-2">
                    <i className="fa fa-map-marker-alt"></i>
                  </span>
                </div>
                <figcaption className="text-gray-600">
                  <p>
                    {address.street} <br /> {address.mapurl}, {address.describeLocation}
                    {address.locationArea}, {address.country}
                    <br />
                    Phone no: {address.phoneNo}
                  </p>
                </figcaption>
              </figure>
            </Link>
          </div>
        ))
      ) : (
        <p>No addresses found</p>
      )}
    </div>
  );
};

export default UserAddresses;
