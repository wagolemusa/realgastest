'use client'

import React, { useState } from "react";

import axios from "axios";
import Link from "next/link";



const Gasbought = () => {
    const [date, setDate] = useState("");
    const [cyliders, setCyliders] = useState("");
    const [numberkgs, setNumberkgs] = useState("");
    const [brand, setBrand] = useState("");
    const [total, setTotal] = useState("");
    const [distributor, setDistributor] = useState("");
    const [itemList, updateItemList] = useState([]);
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault();
        const totalItems = itemList.reduce((acc, item) => acc + (item.numberkgs * item.cyliders), 0);
        updateItemList(prev => [...prev, { numberkgs, cyliders, brand, key: Date.now(), total: numberkgs * cyliders }]);
        setTotal(totalItems + (numberkgs * cyliders));
        e.target.reset();
    }

    const deleteItemFromList = key => {
        const newList = itemList.filter(itemObj => {
            return itemObj.key !== key;
        });
        updateItemList(newList);
        const totalItems = newList.reduce((acc, item) => acc + (item.numberkgs * item.cyliders), 0);
        setTotal(totalItems);
    }

    const handleSave = async (e) => {
        e.preventDefault();
        setError(null);

        const BookData = {
            date,
            cylinders: itemList.map(item => ({
                ...item,
                brand: item.brand,
                kgs: item.numberkgs,
                quantity: item.cyliders
            })),
            finaltotal: total,
            distributor
        };

        try {
            const response = await axios.post(`${process.env.ENVIRONMENT_URL}/api/admin/gasbought`, BookData, {
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                }
            });

            if (response.status === 201) {
                window.location.replace("/admin/gasbought");
            }

            setSuccess(response.data.message);
        } catch (err) {
            if (err.response) {
                setError(err.response.data.message);
            } else {
                setError(err.message);
            }
        }
    }


    return (
        <>
            <div className='profileside'>
                <div class="container py-3">
                <Link  href="/admin/gasbought" className="btn btn-primary">Back</Link> 

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
                                    <div class="form-group">

                                        <input type="number" class="form-control" placeholder="How many Kgs"
                                            onChange={e => setNumberkgs(e.target.value)}

                                        />
                                    </div><br />
                                    <div class="form-group">
                                        <input type="number" class="form-control" placeholder="How many Cyliders"
                                            onChange={e => setCyliders(e.target.value)}

                                        />

                                    </div><br />
                                    <div class="form-group">
                                        {/* <input type="submit" class="btnSubmit" value="Add" /> */}
                                        <button type="submit" class="btnSubmit">Add</button>
                                    </div><br />
                                </form>
                            </div>
                        </div>
                        <div className="col-md-2">
                        </div>

                        {/* Saving Orders */}
                        <div className="col-md-6 py-4">
                            <div className="userform">

                                {!error && <div className='suc'>{success ? success : ""}</div>}
                                {!success && Array.isArray(error) ? error.map((item, i) => (
                                    <div key={i} className="notice notice-danger alert fade show" role="alert">
                                        <button type="button" class="close" data-dismiss="alert" aria-label="Close">
                                            <span aria-hidden="true">×</span>
                                        </button>
                                        <h4> {item} </h4>
                                    </div>
                                )) : <p>{error} </p>
                                }
                                <form onSubmit={handleSave}>
                                <input type="date" className="form-control" placeholder=""
                                    onChange={(e) => setDate(e.target.value)}
                                />
                                <br/>
                                    <input type="text" className="form-control" placeholder="Distributor Name"
                                    onChange={(e) => setDistributor(e.target.value)}
                                />

                                {

                                    itemList.map(itemObj => {
                                        let productNum = itemObj.numberkgs * itemObj.cyliders

                                        return (
                                            <div key={itemObj.key} className="items">
                                                <p>{itemObj.brand}   ---- </p>

                                                <p>{itemObj.numberkgs} kgs * {itemObj.cyliders} Cyliders</p>

                                                <p>{Number(productNum)}</p>
                                                <button onClick={() => deleteItemFromList(itemObj.key)} >X</button>
                                            </div>
                                        )
                                    })
                                }
                                <br />
                                <div className="totalgas">
                                    <h2>Total: &nbsp; &nbsp; <span>{total}</span> </h2>
                                </div>
                                
                                <button type="submit" class="btnSubmit">Save Gas Kgs</button>
                            </form>
                            </div>

                        </div>

                    </div>
                </div>
            </div>
        </>
    )
}
export default Gasbought;


