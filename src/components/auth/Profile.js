'use client'

import React, { useContext, useState, useEffect } from "react";
import Link from "next/link";
import AuthContext from "../../context/AuthContext";
import UserAddresses from "../user/UserAddresses";
import Image from "next/image";
import axios from "axios";

const Profile = () => {

  const { user } = useContext(AuthContext)
  const [data, setData] = useState({ ordersCount: 0 }); // Set a default value
  const [sell, setSell] = useState({ ordersCount: 0 }); // Set a default value
  const [bulk, setBulk] = useState({ ordersCount: 0 }); // Set a default value
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchOnline() {
      try {
        const response = await axios.get(`${process.env.ENVIRONMENT_URL}/api/admin/orders/sumOrders`);
        setData(response.data);
      } catch (error) {
        setError('Failed to fetch data');
        console.error('Error fetching data:', error);
      }
    }

    async function fetchSales() {
      try {
        const response = await axios.get(`${process.env.ENVIRONMENT_URL}/api/admin/sell/salecount`);
        setSell(response.data);
      } catch (error) {
        setError('Failed to fetch data');
        console.error('Error fetching data:', error);
      }
    }

    async function fetchBulk() {
      try {
        const response = await axios.get(`${process.env.ENVIRONMENT_URL}/api/admin/bulk/countRevene`);
        setBulk(response.data);
      } catch (error) {
        setError('Failed to fetch data');
        console.error('Error fetching data:', error);
      }
    }

    fetchOnline();
    fetchSales()
    fetchBulk()
  }, []);



  let  finalTotalSum = data.totalRevenue + bulk.totalRevenue + sell.totalRevenue

  return (
    <>
      <div className="conatiner p-4">
        <div className="row">
          <div className="col-md-3">

            <a href="#" class="cardx1 block max-w-sm p-3 border-gray-200 rounded-lg shadow  hover:bg-gray-100 text-white dark:hover:bg-blue-700">
         
              <p class="font-normal  text-white">ONLINE ORDERS</p>
              <hr/>
              <p class="font-normal  text-white">Number of Orders: {data.ordersCount}</p>
              <p class="font-normal  text-white">Total Revenue: {data.totalRevenue}</p>
            </a>
          </div>

          <div className="col-md-3">
            <a href="#" class="card3 p-3 block max-w-sm bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700">
              <p class="font-normal text-gray-700 dark:text-gray-600">SHOPS SALES</p>
              <hr/>
              <p class="font-normal text-gray-700">Number of Sales: {sell.ordersCount}</p>
              <p class="font-normal text-gray-700">Total Revenue: {sell.totalRevenue}</p>

            </a>

          </div>
          <div className="col-md-3">
          <a href="#" class="cardx2 p-3 block max-w-sm  border border-gray-200 rounded-lg shadow">
              <p class="font-normal text-white dark:text-gray-600">WHOLE SALES ORDERS</p>
              <hr/>
              <p class="font-normal text-white">Number of Bulk Orders: {bulk.ordersCount}</p>
              <p class="font-normal text-white">Total Revenue: {bulk.totalRevenue}</p>

            </a>
          </div>

          <div className="col-md-3">
            <a href="#" class="cardx3 block text-center max-w-sm p-6">
              <h5 class="font-normal text-white">Final Total Revenue</h5>
              <hr/>
              <h2>{finalTotalSum}</h2>
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


