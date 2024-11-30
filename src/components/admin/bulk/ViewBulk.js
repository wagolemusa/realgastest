"use client";
import CustomerContext from "../../../context/CustomerContext";
import React, { useEffect, useContext, useState, Suspense } from "react";
import { toast } from "react-toastify";

const GetBulkData = ({ data }) => {


    const [bulk, setBulk] = useState({
        date: data?.date,
        resaler: data?.resaler,
        cylinders: data?.cylinders,
        finaltotal: data?.finaltotal,
        priceperkgs: data?.priceperkgs,
        amount: data?.amount,
        cashPaid: data?.cashPaid,
        balance: data?.balance,
        paymentstatus: data?.paymentstatus,
        paymentmethod: data?.paymentmethod

    });

    const {
        date,
        resaler,
        finaltotal,
        cylinders,
        priceperkgs,
        amount,
        cashPaid,
        balance,
        paymentstatus,
        paymentmethod } = bulk;

    return (
        <Suspense
            style={{ maxWidth: "700px" }}
            className="main2 mt-10 mb-20 p-4 md:p-7 mx-auto rounded bg-white shadow-lg">
            <a href="/admin/bulk" className="btnSubmit2 pr-6">Back</a>

            <section
                style={{ maxWidth: "900px" }}
                className="main2 mt-10 mb-20 p-4 md:p-7 mx-auto rounded bg-white shadow-lg">
                <div className="row">
                    <div className="col-md-6">
                        <h6>Date:   <b>{date}</b></h6>
                    </div>
                    <div className="col-md-6">
                        <h6>Customer:  <b>{resaler}</b></h6>
                    </div>
                    <hr />

                    <div className="col-md-2">
                    </div>

                    <div className="col-md-8">
                        <table class="table">
                            <thead>
                                <tr>
                                    <th scope="col">Brand</th>
                                    <th scope="col">kgs</th>
                                    <th scope="col">Cyliders</th>
                                    <th scope="col">Total</th>

                                </tr>
                            </thead>

                            {
                                cylinders.map(datame => (
                                    <tbody key={datame._id}>
                                        <tr>
                                            <>
                                                <td>{datame.brand}</td>
                                                <td>{datame.kgs}</td>
                                                <td>{datame.quantity}</td>
                                                <td>{datame.total}</td>

                                            </>

                                        </tr>

                                    </tbody>
                                ))}

                        </table>

                        <div className="row reciept">
                            <div className="col-md-6">
                                <h5> Final Total</h5>
                            </div>

                            <div className="col-md-6">
                                <h2>{finaltotal}</h2>
                            </div>

                            <div className="col-md-6">
                                <h5> Price Per Kgs</h5>
                            </div>

                            <div className="col-md-6">
                                <h2>{priceperkgs} * {finaltotal}</h2>
                            </div>

                            <div className="col-md-6">
                                <h5> Total Amount</h5>
                            </div>

                            <div className="col-md-6">

                                <h2>{amount}</h2>

                            </div>

                            <div className="col-md-6">
                                <h5>Cash Paid</h5>
                            </div>

                            <div className="col-md-6">
                                <h2>{cashPaid}</h2>
                            </div>

                            <div className="col-md-6">
                                <h5>Balance</h5>
                            </div>

                            <div className="col-md-6">
                                <h2>{balance}</h2>
                            </div>

                            <div className="col-md-6">
                                <h5> Payment Method</h5>
                            </div>

                            <div className="col-md-6">
                                <h2>{paymentmethod}</h2>
                            </div>


                            <div className="col-md-6">
                                <h5>Payment Status</h5>
                            </div>

                            <div className="col-md-6">
                                <h2>{paymentstatus}</h2>
                            </div>
                        </div>
                    </div>

                    <div className="col-md-2">
                    </div>
                </div>
            </section>

        </Suspense>
    );
};

export default GetBulkData;