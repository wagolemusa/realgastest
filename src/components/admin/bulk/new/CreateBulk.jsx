'use client'

import React, { useState, useEffect } from "react";

import axios from "axios";
import Link from "next/link";

const CreateBulk = () => {
    const [data, setData] = useState("")
    const [date, setDate] = useState("");
    const [resaler, setResaler] = useState("");
    const [priceperkgs, setPriceperkgs] = useState("");
    const [amount, setAmount] = useState("");
    const [cashPaid, setCashPaid] = useState("");
    const [balance, setBalance] = useState("");
    const [paymentstatus, setPaymentstatus] = useState("");
    const [paymentmethod, setPaymentmethod] = useState("");
    const [cyliders, setCyliders] = useState("");
    const [numberkgs, setNumberkgs] = useState("");
    const [brand, setBrand] = useState("");
    const [total, setTotal] = useState(0);
    const [itemList, updateItemList] = useState([]);
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");

    // Fetch Resalers
    useEffect(() => {
        async function fetchData() {
            try {
                const response = await axios.get(`${process.env.ENVIRONMENT_URL}/api/admin/resaler`);
                setData(response.data);
            } catch (error) {
                setError('Failed to fetch data');
                console.error('Error fetching data:', error);
            }
        }

        fetchData();
    }, []);

    const handleSubmit = (e) => {
        e.preventDefault();
        const totalItems = itemList.reduce((acc, item) => acc + (item.numberkgs * item.cyliders), 0);
        updateItemList(prev => [...prev, { numberkgs, cyliders, brand, key: Date.now(), total: numberkgs * cyliders }]);
        setTotal(totalItems + (numberkgs * cyliders));
        e.target.reset();
    };

    const deleteItemFromList = (key) => {
        const newList = itemList.filter(itemObj => itemObj.key !== key);
        updateItemList(newList);
        const totalItems = newList.reduce((acc, item) => acc + (item.numberkgs * item.cyliders), 0);
        setTotal(totalItems);
    };

    const handleSave = async (e) => {
        e.preventDefault();
        setError(null);

        const calculatedAmount = priceperkgs * total;
        const calculatedBalance = cashPaid - calculatedAmount;

        setAmount(calculatedAmount);
        setBalance(calculatedBalance);

        const BookData = {
            date,
            resaler,
            cylinders: itemList.map(item => ({
                ...item,
                brand: item.brand,
                kgs: item.numberkgs,
                quantity: item.cyliders
            })),
            finaltotal: total,
            priceperkgs,
            amount: calculatedAmount,
            cashPaid,
            balance: calculatedBalance,
            paymentstatus,
            paymentmethod,
        };

        try {
            const response = await axios.post(`${process.env.ENVIRONMENT_URL}/api/admin/bulk`, BookData, {
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                }
            });

            if (response.status === 201) {
                window.location.replace("/admin/bulk");
            }

            setSuccess(response.data.message);
        } catch (err) {
            if (err.response) {
                setError(err.response.data.message);
            } else {
                setError(err.message);
            }
        }
    };

    return (
        <>
            <div className='profileside'>
                <div className="container py-3">
                    <Link href="/admin/bulk" className="btn btn-primary">Back</Link>

                    <div className="row">
                        <div className="col-md-4 py-4">
                            <div className="userform">
                                <h1>Gas Bought</h1>
                                <form onSubmit={handleSubmit}>
                                <select className="form-select" aria-label="Default select example"
                                        onChange={(e) => setBrand(e.target.value)}
                                    >
                                        <option>Select</option>
                                        <option>Korgas</option>
                                        <option>Mengas</option>
                                        <option>Total</option>
                                        <option>Oryx</option>
                                        <option>Shell</option>
                                        <option>Oilibya</option>
                                        <option>K-gas</option>
                                        <option>Hashi</option>
                                        <option>Stabex</option>
                                        <option>Easy</option>
                                        <option>Lake</option>
                                        <option>Mongas</option>
                                        <option>Petgas</option>
                                        <option>Others</option>
                                    </select><br />
                                    <input type="number" className="form-control" placeholder="How many Kgs"
                                        onChange={e => setNumberkgs(e.target.value)} /><br />
                                    <input type="number" className="form-control" placeholder="How many Cylinders"
                                        onChange={e => setCyliders(e.target.value)} /><br />
                                    <button type="submit" className="btnSubmit">Add</button><br />
                                </form>
                            </div>
                        </div>

                        <div className="col-md-6 py-4">
                            <div className="userform">
                                {error && <p className="error">{error}</p>}
                                {success && <p className="success">{success}</p>}
                                <form onSubmit={handleSave}>
                                    <select className="form-select mb-3" onChange={(e) => setResaler(e.target.value)}>
                                        <option>Resalers</option>
                                        {data?.pointsofsales?.map((pointdata, index) => (
                                            <option key={pointdata?.id || index} value={pointdata?.businessname}>
                                                {pointdata?.businessname}
                                            </option>
                                        ))}
                                    </select>
                                    <input type="date" className="form-control mb-3"
                                        onChange={(e) => setDate(e.target.value)} />
                                    <input type="number" className="form-control mb-3" placeholder="Price per kgs"
                                        onChange={(e) => setPriceperkgs(e.target.value)} />
                                    <input type="number" className="form-control mb-3" placeholder="Cash Paid"
                                        onChange={(e) => setCashPaid(e.target.value)} />
                                    <select className="form-select mb-3" onChange={(e) => setPaymentstatus(e.target.value)}>
                                        <option>Payment Status</option>
                                        <option>paid-all</option>
                                        <option>Not-paid-all</option>
                                        <option>Not-paid</option>
                                    </select>
                                    <select className="form-select mb-3" onChange={(e) => setPaymentmethod(e.target.value)}>
                                        <option>Payment Method</option>
                                            <option>cash</option>
                                            <option>momo</option>
                                            <option>airtel</option>
                                            <option>phone</option>
                                    </select>
                                    <div>
                                        {itemList.map(itemObj => (
                                            <div key={itemObj.key} className="items">
                                                <p>{itemObj.brand} - {itemObj.numberkgs} kgs x {itemObj.cyliders} Cylinders</p>
                                                <p>Total: {itemObj.total}</p>
                                                <button onClick={() => deleteItemFromList(itemObj.key)}>X</button>
                                            </div>
                                        ))}
                                    </div>
                                    <div className="totals">
                                        <h2>Total: {total}</h2>
                                        <h2>Amount: {amount}</h2>
                                        <h2>Balance: {balance}</h2>
                                    </div>
                                    <button type="submit" className="btnSubmit">Save Gas Kgs</button>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default CreateBulk;
