"use client";
import Link from "next/link";
import CustomerContext from "../../../context/CustomerContext";
import React, { useEffect, useContext, useState, Suspense } from "react";
import { toast } from "react-toastify";

const Getemployee = ({ data }) => {


    const [customer, setCustomer] = useState({
        firstname: data?.firstname,
        lastname: data?.lastname,
        phone: data?.phone,
        location: data?.location,
        sex: data?.sex,
        salary: data?.salary,
        idnumber: data?.idnumber,
        nextOfKinName: data?.nextOfKinName,
        nextOfKinPhone: data?.nextOfKinPhone

    });

   
    const {
        firstname,
        lastname,
        phone,
        location,
        sex,
        salary,
        idnumber,
        nextOfKinName,
        nextOfKinPhone
         } = customer;


    return (
        <Suspense className="customer relative overflow-x-auto shadow-md sm:rounded-lg">
        <h1 className="text-3xl my-5 ml-4 font-bold">
            <Link href="/admin/employee" className="btn btn-primary">Back-To-Employee</Link></h1>
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
                                            FirstName
                                        </p>
                                    </div>
                                    <div class="inline-flex items-center text-base font-semibold text-gray-900">
                                        {firstname}
                                    </div>
                                </div>
                            </li>

                            <li class="pb-3 sm:pb-4">
                                <div class="flex items-center space-x-4 rtl:space-x-reverse">
                                    <div class="flex-shrink-0">
                                    </div>
                                    <div class="flex-1 min-w-0">

                                        <p class="text-sm text-gray-600 truncate dark:text-gray-600">
                                            Lastname
                                        </p>
                                    </div>
                                    <div class="inline-flex items-center text-base font-semibold text-gray-900">
                                        {lastname}
                                    </div>
                                </div>
                            </li>
                            <li class="pb-3 sm:pb-4">
                                <div class="flex items-center space-x-4 rtl:space-x-reverse">
                                    <div class="flex-shrink-0">
                                    </div>
                                    <div class="flex-1 min-w-0">

                                        <p class="text-sm text-gray-600 truncate dark:text-gray-600">
                                            Phone
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
                                            Location
                                        </p>
                                    </div>
                                    <div class="inline-flex items-center text-base font-semibold text-gray-900">
                                        {location}
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
                                        Sex
                                        </p>
                                    </div>
                                    <div class="inline-flex items-center text-base font-semibold text-gray-900">
                                        {sex}
                                    </div>
                                </div>
                            </li>
                            <li class="pb-3 sm:pb-4">
                                <div class="flex items-center space-x-4 rtl:space-x-reverse">
                                    <div class="flex-shrink-0">
                                    </div>
                                    <div class="flex-1 min-w-0">

                                        <p class="text-sm text-gray-600 truncate dark:text-gray-600">
                                            Salary
                                        </p>
                                    </div>
                                    <div class="inline-flex items-center text-base font-semibold text-gray-900">
                                        {salary}
                                    </div>
                                </div>
                            </li>
                            <li class="pb-3 sm:pb-4">
                                <div class="flex items-center space-x-4 rtl:space-x-reverse">
                                    <div class="flex-shrink-0">
                                    </div>
                                    <div class="flex-1 min-w-0">

                                        <p class="text-sm text-gray-600 truncate dark:text-gray-600">
                                        ID Number
                                        </p>
                                    </div>
                                    <div class="inline-flex items-center text-base font-semibold text-gray-900">
                                        {idnumber}
                                    </div>
                                </div>
                            </li>
                            <li class="pb-3 sm:pb-4">
                                <div class="flex items-center space-x-4 rtl:space-x-reverse">
                                    <div class="flex-shrink-0">
                                    </div>
                                    <div class="flex-1 min-w-0">

                                        <p class="text-sm text-gray-600 truncate dark:text-gray-600">
                                        Next-Of-Kin-Name
                                        </p>
                                    </div>
                                    <div class="inline-flex items-center text-base font-semibold text-gray-900">
                                        {nextOfKinName}
                                    </div>
                                </div>
                            </li>

                            <li class="pb-3 sm:pb-4">
                                <div class="flex items-center space-x-4 rtl:space-x-reverse">
                                    <div class="flex-shrink-0">
                                    </div>
                                    <div class="flex-1 min-w-0">

                                        <p class="text-sm text-gray-600 truncate dark:text-gray-600">
                                        Next-Of-Kin-Contact
                                        </p>
                                    </div>
                                    <div class="inline-flex items-center text-base font-semibold text-gray-900">
                                        {nextOfKinPhone}
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

export default Getemployee;