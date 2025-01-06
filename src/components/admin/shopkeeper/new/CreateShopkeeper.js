'use client'

import React, { useState, useEffect } from "react";
import axios from "axios";
import Link from "next/link";

const CreateShop = () => {
    const [data, setData] = useState([]);
    const [sealnumber, setSealnumber] = useState("");
    const [cylindersize, setCylindersize] = useState("");
    const [cylinderbrand, setCylinderbrand] = useState("");
    const [replacedseal, setReplacedseal] = useState("");
    const [price, setPrice] = useState("");
    const [phone, setPhone] = useState("");
    const [customername, setCustomername] = useState("");
    const [paymentmethod, setPaymentmethod] = useState("");
    const [itemList, updateItemList] = useState([]);
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");
    const [searchQuery, setSearchQuery] = useState(""); // Search query input

    const handleSubmit = (e) => {
        e.preventDefault();
        updateItemList(prev => [...prev, { sealnumber, cylindersize, cylinderbrand, replacedseal, price, key: Date.now() }]);
        e.target.reset();
    };

    const deleteItemFromList = (key) => {
        updateItemList(itemList.filter(item => item.key !== key));
    };

    const handleSave = async (e) => {
        e.preventDefault();
        setError(null);

        const BookData = {
            cylinders: itemList.map(item => ({
                ...item,
                sealnumber: item.sealnumber,
                cylindersize: item.cylindersize,
                cylinderbrand: item.cylinderbrand,
                replacedseal: item.replacedseal,
                price: item.price
            })),
            phone,
            customername,
            paymentmethod,
            finalPrice
        };
        
        try {
            const response = await axios.post(`${process.env.ENVIRONMENT_URL}/api/admin/shopkeeper`, BookData, {
                headers: { 'Accept': 'application/json', 'Content-Type': 'application/json' }
            });

            if (response.status === 201) {
                window.location.replace("/admin/shopkeepe");
            }
            setSuccess(response.data.message);
        } catch (err) {
            setError(err.response?.data?.message || err.message);
        }
    };

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(`${process.env.ENVIRONMENT_URL}/api/admin/sealed`);
                setData(response.data?.cylinder || []);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };
        fetchData();
    }, []);

    const finalPrice = itemList.reduce((total, item) => total + Number(item.price), 0);

    // Filter options based on the search query
    const filteredOptions = data?.filter((sealhdata) =>
        sealhdata?.sealnumber?.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const handleSearchInputChange = (e) => {
        setSearchQuery(e.target.value);
    };

    const handleSelectSealnumber = (sealnumber) => {
        setSealnumber(sealnumber);
    };

    return (
        <>
            <div className='profileside'>
                <div className="container py-3">
                    <Link href="/admin/shopkeeper" className="btn btn-primary">Back</Link>
                    <div className="row">
                        <div className="col-md-4 py-4">
                            <div className="userform">
                                <h1>Gas Bought</h1>
                                <form onSubmit={handleSubmit}>
                                    <div className="form-group">
                                        <label htmlFor="sealnumber">Seal Number</label>
                                        <input
                                            type="text"
                                            className="form-control"
                                            placeholder="Search Seal Number"
                                            value={searchQuery}
                                            onChange={handleSearchInputChange}
                                        />
                                        {/* Display filtered seal numbers as suggestions */}
                                        {searchQuery && (
                                            <ul className="suggestions-list">
                                                {filteredOptions?.length > 0 ? (
                                                    filteredOptions.map((sealhdata) => (
                                                        <li
                                                            key={sealhdata.sealnumber}
                                                            onClick={() => handleSelectSealnumber(sealhdata.sealnumber)}
                                                        >
                                                            {sealhdata.sealnumber}
                                                        </li>
                                                    ))
                                                ) : (
                                                    <li>No matches found</li>
                                                )}
                                            </ul>
                                        )}
                                    </div>
                                    <div className="form-group pt-2">
                                    <input
                                        type="text"
                                        className="form-control"
                                        placeholder="Cylinder Size"
                                        onChange={(e) => setCylindersize(e.target.value)}
                                    />
                                    </div>
                                    <div className="form-group pt-2">
                                    <input
                                        type="text"
                                        className="form-control"
                                        placeholder="Cylinder Brand"
                                        onChange={(e) => setCylinderbrand(e.target.value)}
                                    />
                                    </div>
                                    <div className="form-group pt-2">
                                    <input
                                        type="text"
                                        className="form-control"
                                        placeholder="Replaced Seal Number"
                                        onChange={(e) => setReplacedseal(e.target.value)}
                                    />
                                    </div>
                                    <div className="form-group pt-2">
                                    <input
                                        type="text"
                                        className="form-control"
                                        placeholder="Price"
                                        onChange={(e) => setPrice(e.target.value)}
                                    />
                                    </div>
                                    <button type="submit" className="btnSubmit">
                                        Add
                                    </button>
                                </form>
                            </div>
                        </div>

                        <div className="col-md-6 py-4">
                            <div className="userform">
                                {error && <div className="notice">{error}</div>}
                                {success && <div className="success">{success}</div>}
                                <form onSubmit={handleSave}>
                                <div className="form-group pt-2">
                                    <input
                                        type="number"
                                        className="form-control"
                                        placeholder="Phone"
                                        onChange={(e) => setPhone(e.target.value)}
                                    />
                                    </div>
                                    <div className="form-group pt-2">
                                    <input
                                        type="text"
                                        className="form-control"
                                        placeholder="Customer Name"
                                        onChange={(e) => setCustomername(e.target.value)}
                                    />
                                    </div>
                                    <div className="form-group pt-2">
                                    <select
                                        className="form-select mb-3"
                                        onChange={(e) => setPaymentmethod(e.target.value)}
                                    >
                                        <option>Payment Method</option>
                                        <option>cash</option>
                                        <option>momo</option>
                                        <option>airtel</option>
                                        <option>phone</option>
                                    </select>
                                    </div>
                                    {itemList.map((itemObj) => (
                                        <div key={itemObj.key} className="items">
                                            <p>{itemObj.sealnumber}</p>
                                            <p>{itemObj.cylinderbrand}</p>
                                            <p>{itemObj.cylindersize}</p>
                                            <p>{itemObj.replacedseal}</p>
                                            <p>{itemObj.price}</p>
                                            <button onClick={() => deleteItemFromList(itemObj.key)}>
                                                X
                                            </button>
                                        </div>
                                    ))}
                                    <div className="totalgas">
                                        <h2>
                                            Total: &nbsp; <span>{finalPrice}</span>
                                        </h2>
                                    </div>
                                    <button type="submit" className="btnSubmit">
                                        Save Gas Kgs
                                    </button>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default CreateShop;
