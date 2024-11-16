'use client'

import React, { useContext, useState } from "react";
import Link from "next/link";
import AuthContext from "../../context/AuthContext";
import UserAddresses from "../user/UserAddresses";
import Image from "next/image";

const Profile = ({ addresses }) => {

  const { user } = useContext(AuthContext)

  return (
    <>
      <div className="conatiner p-4">
        <div className="row">
          <div className="col-md-3">

            <a href="#" class="cardx1 block max-w-sm p-3 border-gray-200 rounded-lg shadow text-center hover:bg-gray-100 text-white dark:hover:bg-blue-700">

              <h2 class="font-normal  text-white">ONLINE ORDERS</h2>
              <h3>59</h3>
            </a>
          </div>

          <div className="col-md-3">
            <a href="#" class="card3 text-center block max-w-sm p-1 bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700">
              <h2 class="font-normal text-gray-700 dark:text-gray-400">SHOPS <br/>SALES</h2>
              {/* <h2 class="text-lg font-semibold text-gray-900">Top students:</h2> */}

              <h2>30</h2>

            </a>

          </div>
          <div className="col-md-3">
            <a href="#" class="cardx2 text-center block max-w-sm p-6 text-white">
              <h2 class="font-normal text-white dark:text-gray-400">TOTAL</h2>
              <h3>854000</h3>
            </a>
          </div>
          <div className="col-md-3">
            <a href="#" class="cardx3 block text-center max-w-sm p-6">
              <h2 class="font-normal text-white">Expense</h2>
              <h2>50</h2>
            </a>

          </div>

        </div>
      </div>

    <div className="container">                   
      <div className="row">
        <div className="col-md-4">
          <div className="card3x1 text-center block max-w-sm p-1 text-white border-gray-200 rounded-lg shadow">
          <h2 class="font-normal p-2 text-black-700 ">Accesories</h2>
          <p>
              <span class="font-semibold text-black-700">Banners</span> <span class="font-semibold text-white">10</span>
          </p>
          <p>
              <span class="font-semibold  text-black-700">Gas Ligter</span> <span class="font-semibold text-white">8</span>
          </p>
          <p>
              <span class="font-semibold  text-black-700">Grills</span> <span class="font-semibold text-white">8</span>
          </p>
          <p>
              <span class="font-semibold  text-black-700">Gas Cookers</span> <span class="font-semibold text-white"> 20</span>
          </p>

          </div>
        </div>
        <div className="col-md-4">
        <div className="card3x2 p-10 text-center block max-w-sm border-gray-200 rounded-lg shadow">
          <h2>CUSTOMERS</h2>
          <h1>500</h1>
          </div>
        </div>
        <div className="col-md-4">
        <div className="card3x3 text-center block max-w-sm p-1 border-gray-200 rounded-lg shadow">
          <h2>LAST ORDERS</h2>
          <p>
              <span class="font-semibold text-black-700">6kgs </span> <span class="font-semibold text-white">10</span>
          </p>
          <p>
              <span class="font-semibold  text-black-700">3ks </span> <span class="font-semibold text-white">8</span>
          </p>
          <p>
              <span class="font-semibold  text-black-700">12.5kgs </span> <span class="font-semibold text-white">8</span>
          </p>
          <p>
              <span class="font-semibold  text-black-700">13kgs </span> <span class="font-semibold text-white"> 20</span>
          </p>
          </div>
        </div>
        </div>
    </div>

    </>
  );
};

export default Profile;


