"use client"

import React, { useContext, useEffect,Suspense } from "react";
import Link from "next/link";
import { toast } from "react-toastify";
import AuthContext from "../../context/AuthContext";
import CustromPagination  from '../layouts/CustromPagination'

const Users = ({ data }) => {
    const { error, deleteUser, clearErrors } = useContext(AuthContext);
  
    useEffect(() => {
      if (error) {
        toast.error(error);
        clearErrors();
      }
    }, [error, clearErrors]);
  
    const deleteHandler = (id) => {
      deleteUser(id);
    };
  
    return (
      <Suspense className="relative overflow-x-auto shadow-md sm:rounded-lg">
        <h1 className="text-3xl my-5 ml-4 font-bold">
          {data?.users?.length} Users
        </h1>
        <h2 className="text-3xl my-3 ml-4 font-bold">List Of Users</h2>         
        <table className="w-full text-sm text-left">
          <thead className="text-l text-gray-700 uppercase">
            <tr>
              <th scope="col" className="px-6 py-3">
                Name
              </th>
              <th scope="col" className="px-6 py-3">
              Username
              </th>
              <th scope="col" className="px-6 py-3">
                Referal Code
              </th>
              <th scope="col" className="px-6 py-3">
                Role
              </th>
              <th scope="col" className="px-6 py-3">
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {data?.users?.map((user) => (
              <tr key={user?._id} className="bg-white">
                <td className="px-6 py-2">{user?.name}</td>
                <td className="px-6 py-2">{user?.username}</td>
                <td className="px-6 py-2">{user?.referalCode}</td>
                <td className="px-6 py-2">{user?.role}</td>
                <td className="px-6 py-2">
                  <div>
                    <Link
                      href={`/admin/users/${user?._id}`}
                      className="px-2 py-2 inline-block text-yellow-600 bg-white shadow-sm border border-gray-200 rounded-md hover:bg-gray-100 cursor-pointer mr-2"
                    >
                      {/* <i className="fa fa-pencil" aria-hidden="true"></i> */}
                      Edit
                    </Link>
                    <a
                      className="px-2 py-2 inline-block text-red-600 bg-white shadow-sm border border-gray-200 rounded-md hover:bg-gray-100 cursor-pointer"
                      onClick={() => deleteHandler(user?._id)}
                    >
                      {/* <i className="fa fa-trash" aria-hidden="true"></i> */}
                      Delete
                    </a>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {data?.users?.length > data?.resPerPage && (
          <div className="mb-6">
            <CustromPagination
              resPerPage={data?.resPerPage}
              productsCount={data?.ordersCount}
            />
          </div>
        )}
      </Suspense>
    );
  };
  
  export default Users;