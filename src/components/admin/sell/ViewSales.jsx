'use client'
import { useState, useEffect, Suspense } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";


const VeiwSales = ({ data }) => {

    const [sell, setSell] = useState({
        branch: data?.branch,
        cylinderSize: data?.cylinderSize,
        cylinderType: data?.cylinderType,
        category: data?.category,
        amount: data?.amount,
        numberOfDays: data?.numberOfDays,
        paidamount: data?.paidamount,
        balance: data?.balance,
        paymantstatus: data?.paymantstatus,
        paymentmethod: data?.paymentmethod,
        datedata: data?.datedata,
        time: data?.time,
        customerName: data?.customerName,
        phone: data?.phone,
        condition: data?.condition,
        sealTaken: data?.sealTaken,
        sealReplaced: data?.sealReplaced

    })


    const {
        branch,
        cylinderSize,
        cylinderType,
        category,
        amount,
        numberOfDays,
        paidamount,
        balance,
        paymantstatus,
        paymentmethod,
        datedata,
        time,
        customerName,
        phone,
        condition,
        sealTaken,
        sealReplaced
    } = sell;


    return (
        <Suspense className="customer relative overflow-x-auto shadow-md sm:rounded-lg">
            <h1 className="text-3xl my-5 ml-4 font-bold">
                <Link href="/admin/sell" className="btn btn-primary">Back-To-Sales</Link></h1>
            <section
                style={{ maxWidth: "1000px" }}
                className="main2 mt-10 mb-20 p-4 md:p-7 mx-auto rounded bg-white shadow-lg">

                <div className="row">
                    <div className="col-md-6">
                        <h6>Date:   <b>{datedata}</b></h6>
                    </div>
                    <div className="col-md-6">
                        <h6>Customer:  <b>{customerName}</b></h6>
                    </div>
                    <hr />

                    <div className="col-md-6">

                        <ul class="max-w-md divide-y divide-gray-200 dark:divide-gray-700">
                            <li class="pb-3 sm:pb-4">
                                <div class="flex items-center space-x-4 rtl:space-x-reverse">
                                    <div class="flex-shrink-0">
                                    </div>
                                    <div class="flex-1 min-w-0">

                                        <p class="text-sm text-gray-600 truncate dark:text-gray-600">
                                            Shop Name
                                        </p>
                                    </div>
                                    <div class="inline-flex items-center text-base font-semibold text-gray-900">
                                        {branch}
                                    </div>
                                </div>
                            </li>
                            <li class="py-3 sm:py-4">
                                <div class="flex items-center space-x-4 rtl:space-x-reverse">
                                    <div class="flex-shrink-0">
                                    </div>
                                    <div class="flex-1 min-w-0">

                                        <p class="text-sm text-gray-500 truncate dark:text-gray-600">
                                            Cylinder Size
                                        </p>
                                    </div>
                                    <div class="inline-flex items-center text-base font-semibold text-gray-900 ">
                                        {cylinderSize}
                                    </div>
                                </div>
                            </li>
                            <li class="py-3 sm:py-4">
                                <div class="flex items-center space-x-4 rtl:space-x-reverse">
                                    <div class="flex-shrink-0">
                                    </div>
                                    <div class="flex-1 min-w-0">

                                        <p class="text-sm text-gray-500 truncate dark:text-gray-600">
                                            Cylinder Brand
                                        </p>
                                    </div>
                                    <div class="inline-flex items-center text-base font-semibold text-gray-900">
                                        {cylinderType}
                                    </div>
                                </div>
                            </li>
                            <li class="py-3 sm:py-4">
                                <div class="flex items-center space-x-4 rtl:space-x-reverse">
                                    <div class="flex-shrink-0">
                                    </div>
                                    <div class="flex-1 min-w-0">

                                        <p class="text-sm text-gray-500 truncate dark:text-gray-600">
                                            Services
                                        </p>
                                    </div>
                                    <div class="inline-flex items-center text-base font-semibold text-gray-900">
                                        {category}
                                    </div>
                                </div>
                            </li>
                            <li class="pt-3 pb-0 sm:pt-4">
                                <div class="flex items-center space-x-4 rtl:space-x-reverse">
                                    <div class="flex-shrink-0">
                                    </div>
                                    <div class="flex-1 min-w-0">

                                        <p class="text-sm text-gray-500 truncate dark:text-gray-600">
                                            Cylinder Condition
                                        </p>
                                    </div>
                                    <div class="inline-flex items-center text-base font-semibold text-gray-900">
                                        {condition}
                                    </div>
                                </div>
                            </li>
                            <li class="pt-3 pb-0 sm:pt-4">
                                <div class="flex items-center space-x-4 rtl:space-x-reverse">
                                    <div class="flex-shrink-0">
                                    </div>
                                    <div class="flex-1 min-w-0">

                                        <p class="text-sm text-gray-500 truncate dark:text-gray-600">
                                            Customer Phone
                                        </p>
                                    </div>
                                    <div class="inline-flex items-center text-base font-semibold text-gray-900">
                                        {phone}
                                    </div>
                                </div>
                            </li>
                            <li class="pt-3 pb-0 sm:pt-4">
                                <div class="flex items-center space-x-4 rtl:space-x-reverse">
                                    <div class="flex-shrink-0">
                                    </div>
                                    <div class="flex-1 min-w-0">

                                        <p class="text-sm text-gray-500 truncate dark:text-gray-600">
                                            Cylinder SealNumber
                                        </p>
                                    </div>
                                    <div class="inline-flex items-center text-base font-semibold text-gray-900">
                                        {sealTaken}
                                    </div>
                                </div>
                            </li>
                        </ul>
                    </div>

                    <div className="col-md-6">
                    <ul class="max-w-md divide-y divide-gray-200 dark:divide-gray-700">
                        <li class="pt-3 pb-0 sm:pt-4">
                            <div class="flex items-center space-x-4 rtl:space-x-reverse">
                                <div class="flex-shrink-0">
                                </div>
                                <div class="flex-1 min-w-0">

                                    <p class="text-sm text-gray-500 truncate dark:text-gray-600">
                                        Amount
                                    </p>
                                </div>
                                <div class="inline-flex items-center text-base font-semibold text-gray-900">
                                    {amount}
                                </div>
                            </div>
                        </li>
                        <li class="pt-3 pb-0 sm:pt-4">
                            <div class="flex items-center space-x-4 rtl:space-x-reverse">
                                <div class="flex-shrink-0">
                                </div>
                                <div class="flex-1 min-w-0">

                                    <p class="text-sm text-gray-500 truncate dark:text-gray-600">
                                        Paid Amount
                                    </p>
                                </div>
                                <div class="inline-flex items-center text-base font-semibold text-gray-900">
                                    {paidamount}
                                </div>
                            </div>
                        </li>
                        <li class="pt-3 pb-0 sm:pt-4">
                            <div class="flex items-center space-x-4 rtl:space-x-reverse">
                                <div class="flex-shrink-0">
                                </div>
                                <div class="flex-1 min-w-0">

                                    <p class="text-sm text-gray-500 truncate dark:text-gray-600">
                                        Balance
                                    </p>
                                </div>
                                <div class="inline-flex items-center text-base font-semibold text-gray-900">
                                    {balance}
                                </div>
                            </div>
                        </li>
                        <li class="pt-3 pb-0 sm:pt-4">
                            <div class="flex items-center space-x-4 rtl:space-x-reverse">
                                <div class="flex-shrink-0">
                                </div>
                                <div class="flex-1 min-w-0">

                                    <p class="text-sm text-gray-500 truncate dark:text-gray-600">
                                        Payment Method
                                    </p>
                                </div>
                                <div class="inline-flex items-center text-base font-semibold text-gray-900">
                                    {paymentmethod}
                                </div>
                            </div>
                        </li>
                        <li class="pt-3 pb-0 sm:pt-4">
                            <div class="flex items-center space-x-4 rtl:space-x-reverse">
                                <div class="flex-shrink-0">
                                </div>
                                <div class="flex-1 min-w-0">

                                    <p class="text-sm text-gray-500 truncate dark:text-gray-600">
                                        Paymant Status
                                    </p>
                                </div>
                                <div class="inline-flex items-center text-base font-semibold text-gray-900">
                                    {paymantstatus}
                                </div>
                            </div>
                        </li>

                        <li class="pt-3 pb-0 sm:pt-4">
                            <div class="flex items-center space-x-4 rtl:space-x-reverse">
                                <div class="flex-shrink-0">
                                </div>
                                <div class="flex-1 min-w-0">

                                    <p class="text-sm text-gray-500 truncate dark:text-gray-600">
                                        Time
                                    </p>
                                </div>
                                <div class="inline-flex items-center text-base font-semibold text-gray-900">
                                    {time}
                                </div>
                            </div>
                        </li>
                        <li class="pt-3 pb-0 sm:pt-4">
                            <div class="flex items-center space-x-4 rtl:space-x-reverse">
                                <div class="flex-shrink-0">
                                </div>
                                <div class="flex-1 min-w-0">

                                    <p class="text-sm text-gray-500 truncate dark:text-gray-600">
                                        Number of days Gas take
                                    </p>
                                </div>
                                <div class="inline-flex items-center text-base font-semibold text-gray-900">
                                    {numberOfDays}
                                </div>
                            </div>
                        </li>
                        <li class="pt-3 pb-0 sm:pt-4">
                            <div class="flex items-center space-x-4 rtl:space-x-reverse">
                                <div class="flex-shrink-0">
                                </div>
                                <div class="flex-1 min-w-0">

                                    <p class="text-sm text-gray-500 truncate dark:text-gray-600">
                                        Cylinder SealNumber Replaced
                                    </p>
                                </div>
                                <div class="inline-flex items-center text-base font-semibold text-gray-900">
                                    {sealReplaced}
                                </div>
                            </div>
                        </li>
                    </ul>
                    </div>

                </div>
            </section>

        </Suspense>
    )
}

export default VeiwSales;