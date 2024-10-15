"use client";
import CustomerContext from "../../../context/CustomerContext";
import React, { useEffect, useContext, useState, Suspense } from "react";
import { toast } from "react-toastify";

const Getcustomers = ({ data, id }) => {

    const { updateCustomer, updated, setUpdated, error } = useContext(CustomerContext);

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

    useEffect(() => {
        if (updated) {
            toast.success('Customer Updated')
            setUpdated(false)
        }
        if (error) {
            toast.error(error)
            clearErrors()
        }
    }, [error, updated, setUpdated])

    const {
        name,
        phone,
        email,
        cylinderType,
        cylinderSize,
        numberOfDays,
        describeLocation,
        location,
        mapurl } = customer;

    const onChange = (e) => {
        setCustomer({ ...customer, [e.target.name]: e.target.value });
    };

    const submitHandler = (e) => {
        e.preventDefault();
        updateCustomer(customer, data?._id);
    };


    return (
        <Suspense
            style={{ maxWidth: "700px" }}
            className="main2 mt-10 mb-20 p-4 md:p-7 mx-auto rounded bg-white shadow-lg">
            <a href="/admin/customer">Back</a>

            <ul class="list-group list-group-light">
                <li class="list-group-item"><span>Customer Name</span>&nbsp;&nbsp;&nbsp;<br/>{name}</li>
                <li class="list-group-item"><span>Phone</span>&nbsp;&nbsp;&nbsp;<br/>{phone}</li>
                <li class="list-group-item"><span>Cylinder Type</span>&nbsp;&nbsp;&nbsp;<br/>{cylinderType}</li>
                <li class="list-group-item"><span>Cylinder Size</span>&nbsp;&nbsp;&nbsp;<br/>{cylinderSize}</li>
                <li class="list-group-item"><span>Days</span>&nbsp;&nbsp;&nbsp;<br/>{numberOfDays}</li>
                <li class="list-group-item"><span>Location</span>&nbsp;&nbsp;&nbsp;<br/>{location}</li>
                <li class="list-group-item"><span>Map Url</span>&nbsp;&nbsp;&nbsp;<br/>{mapurl}</li>
                <li class="list-group-item"><span>Described Location</span>&nbsp;&nbsp;&nbsp;<br/>{describeLocation}</li>


            </ul>
        </Suspense>
    );
};

export default Getcustomers;