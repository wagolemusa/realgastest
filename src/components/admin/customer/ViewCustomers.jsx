"use client";
import Link from "next/link";
import CustomerContext from "../../../context/CustomerContext";
import React, { useEffect, useContext, useState, Suspense } from "react";
import { toast } from "react-toastify";

const Getcustomers = ({ data }) => {


    const [customer, setCustomer] = useState({
        name: data?.name,
        phone: data?.phone,
        email: data?.email,
        cylinderType: data?.cylinderType,
        cylinderSize: data?.cylinderSize,
        numberOfDays: data?.numberOfDays,
        describeLocation: data?.describeLocation,
        location: data?.location,
        mapurl: data?.mapurl

    });

   
    const {
        name,
        phone,
        cylinderType,
        cylinderSize,
        numberOfDays,
        describeLocation,
        location,
        mapurl } = customer;


    return (
        <Suspense className="customer relative overflow-x-auto shadow-md sm:rounded-lg">
        <h1 className="text-3xl my-5 ml-4 font-bold">
            <Link href="/admin/customer" className="btn btn-primary">Back-To-Customer</Link></h1>
        <section
            style={{ maxWidth: "1000px" }}
            className="main2 mt-10 mb-20 p-4 md:p-7 mx-auto rounded bg-white shadow-lg">
            
            <div className="row">
                <div className="col-md-6">
                <ul class="max-w-md divide-y divide-gray-200 dark:divide-gray-700">
                            <li class="pb-3 sm:pb-4">
                                <div class="flex items-center space-x-4 rtl:space-x-reverse">
                                    <div class="flex-shrink-0">
                                    </div>
                                    <div class="flex-1 min-w-0">

                                        <p class="text-sm text-gray-600 truncate dark:text-gray-600">
                                            Customer Names
                                        </p>
                                    </div>
                                    <div class="inline-flex items-center text-base font-semibold text-gray-900">
                                        {name}
                                    </div>
                                </div>
                            </li>

                            <li class="pb-3 sm:pb-4">
                                <div class="flex items-center space-x-4 rtl:space-x-reverse">
                                    <div class="flex-shrink-0">
                                    </div>
                                    <div class="flex-1 min-w-0">

                                        <p class="text-sm text-gray-600 truncate dark:text-gray-600">
                                            Customer Phone
                                        </p>
                                    </div>
                                    <div class="inline-flex items-center text-base font-semibold text-gray-900">
                                        {phone}
                                    </div>
                                </div>
                            </li>
                            <li class="pb-3 sm:pb-4">
                                <div class="flex items-center space-x-4 rtl:space-x-reverse">
                                    <div class="flex-shrink-0">
                                    </div>
                                    <div class="flex-1 min-w-0">

                                        <p class="text-sm text-gray-600 truncate dark:text-gray-600">
                                            Cylinder Size
                                        </p>
                                    </div>
                                    <div class="inline-flex items-center text-base font-semibold text-gray-900">
                                        {cylinderSize}
                                    </div>
                                </div>
                            </li>
                            <li class="pb-3 sm:pb-4">
                                <div class="flex items-center space-x-4 rtl:space-x-reverse">
                                    <div class="flex-shrink-0">
                                    </div>
                                    <div class="flex-1 min-w-0">

                                        <p class="text-sm text-gray-600 truncate dark:text-gray-600">
                                            Cylinder Brand
                                        </p>
                                    </div>
                                    <div class="inline-flex items-center text-base font-semibold text-gray-900">
                                        {cylinderType}
                                    </div>
                                </div>
                            </li>


                    </ul>

                </div>

                <div className="col-md-6">
                <ul class="max-w-md divide-y divide-gray-200 dark:divide-gray-700">
                            <li class="pb-3 sm:pb-4">
                                <div class="flex items-center space-x-4 rtl:space-x-reverse">
                                    <div class="flex-shrink-0">
                                    </div>
                                    <div class="flex-1 min-w-0">

                                        <p class="text-sm text-gray-600 truncate dark:text-gray-600">
                                        Number of Days Gas Take
                                        </p>
                                    </div>
                                    <div class="inline-flex items-center text-base font-semibold text-gray-900">
                                        {numberOfDays}
                                    </div>
                                </div>
                            </li>
                            <li class="pb-3 sm:pb-4">
                                <div class="flex items-center space-x-4 rtl:space-x-reverse">
                                    <div class="flex-shrink-0">
                                    </div>
                                    <div class="flex-1 min-w-0">

                                        <p class="text-sm text-gray-600 truncate dark:text-gray-600">
                                            Location
                                        </p>
                                    </div>
                                    <div class="inline-flex items-center text-base font-semibold text-gray-900">
                                        {location}
                                    </div>
                                </div>
                            </li>
                            <li class="pb-3 sm:pb-4">
                                <div class="flex items-center space-x-4 rtl:space-x-reverse">
                                    <div class="flex-shrink-0">
                                    </div>
                                    <div class="flex-1 min-w-0">

                                        <p class="text-sm text-gray-600 truncate dark:text-gray-600">
                                        Described Location
                                        </p>
                                    </div>
                                    <div class="inline-flex items-center text-base font-semibold text-gray-900">
                                        {describeLocation}
                                    </div>
                                </div>
                            </li>
                            <li class="pb-3 sm:pb-4">
                                <div class="flex items-center space-x-4 rtl:space-x-reverse">
                                    <div class="flex-shrink-0">
                                    </div>
                                    <div class="flex-1 min-w-0">

                                        <p class="text-sm text-gray-600 truncate dark:text-gray-600">
                                            Map URL
                                        </p>
                                    </div>
                                    <div class="inline-flex items-center text-base font-semibold text-gray-900">
                                        {mapurl}
                                    </div>
                                </div>
                            </li>
                    </ul>

                </div>
            </div>

        </section>
        </Suspense>
    );
};

export default Getcustomers;

 