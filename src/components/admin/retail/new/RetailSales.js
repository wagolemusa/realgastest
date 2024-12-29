'use client'
import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import Link from "next/link";
import AuthContext from "../../../../context/AuthContext";
// import { useSession, signOut } from "next-auth/react";

const Retailsales = () => {
    const [data, setData] = useState([]);
    const { user, setUser } = useContext(AuthContext);
    const [sealtaken, setSealtaken] = useState("");
    const [sealreplaced, setSealreplaced] = useState("");
    const [cylinderType, setCylinderType] = useState("");
    const [cylinderSize, setCylinderSize] = useState("");
    const [price, setPrice] = useState("");
    const [phone, setPhone] = useState("");
    const [customername, setCustomername] = useState("");
    const [paymentmethod, setPaymentmethod] = useState("");
    const [category, setCategory] = useState("");
    const [condition, setCondition] = useState("");
    const [branch, setBranch] = useState("");
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");
    const [searchQuery, setSearchQuery] = useState("");
    // const { data: session, status } = useSession();

    // Fetch data when the component mounts
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(`${process.env.ENVIRONMENT_URL}/api/admin/sealed/instock`);
                setData(response.data?.sealedNumbers || []);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };
        fetchData();
    }, []);

    console.log("xdddd", data)

    // useEffect(() => {
    //     if (session?.user) {
    //         setUser(session.user.username);
    //     }
    // }, [session, setUser]);

    // Filter the data based on the search query
    const filteredOptions = data.filter((sealhdata) =>
        sealhdata?.sealnumber?.toLowerCase().includes(searchQuery.toLowerCase())
    );

    // Handle search query input
    const handleSearchInputChange = (e) => {
        setSearchQuery(e.target.value);
    };

    // Set selected seal and auto-fill the fields
    const handleSelectSealnumber = (sealnumber) => {
        const seal = data.find((seal) => seal.sealnumber === sealnumber);
        if (seal) {
            setSealtaken(seal.sealnumber);
            setCylinderType(seal.cylinderType || "");
            setCylinderSize(seal.cylinderSize || "");
            setCustomername(seal.customername || "");
            setPhone(seal.phone || "");
            setBranch(seal.branch || "");
        }
        setSearchQuery(""); // Clear search query after selection
    };

    // Handle form submit
    const handleSave = async (e) => {
        e.preventDefault();
        setError(null);

        const BookData = {
            sealtaken,
            sealreplaced,
            cylinderType,
            cylinderSize,
            price,
            phone,
            customername,
            paymentmethod,
            category,
            condition,
            branch,
            // user,
        };

        try {
            const response = await axios.post(`${process.env.ENVIRONMENT_URL}/api/admin/retail`, BookData, {
                headers: { 'Accept': 'application/json', 'Content-Type': 'application/json' }
            });

            if (response.status === 201) {
                setSuccess("Gas Kgs saved successfully!");
            } else {
                setError("Error saving data.");
            }
        } catch (err) {
            setError(err.response?.data?.message || err.message);
        }
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
                            </div>
                        </div>

                        <div className="col-md-6 py-4">
                            <div className="userform">
                                {error && <div className="notice">{error}</div>}
                                {success && <div className="success">{success}</div>}
                                <form onSubmit={handleSave}>
                                    {/* Seal number input and search */}
                                    <div className="form-group">
                                        <label htmlFor="sealnumber">Seal Number</label>
                                        <input
                                            type="text"
                                            className="form-control"
                                            placeholder="Search Seal Number"
                                            value={searchQuery}
                                            onChange={handleSearchInputChange}
                                        />
                                        {searchQuery && (
                                            <ul className="suggestions-list">
                                                {filteredOptions.length > 0 ? (
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

                                    {/* Fields */}
                                    <div className="form-group pt-2">
                                        <input
                                            type="text"
                                            className="form-control"
                                            placeholder="Cylinder Size"
                                            value={cylinderSize}
                                            onChange={(e) => setCylinderSize(e.target.value)}
                                        />
                                    </div>
                                    <div className="form-group pt-2">
                                        <input
                                            type="text"
                                            className="form-control"
                                            placeholder="Cylinder Brand"
                                            value={cylinderType}
                                            onChange={(e) => setCylinderType(e.target.value)}
                                        />
                                    </div>
                                    <div className="form-group pt-2">
                                        <input
                                            type="text"
                                            className="form-control"
                                            placeholder="Replaced Seal Number"
                                            value={sealreplaced}
                                            onChange={(e) => setSealreplaced(e.target.value)}
                                        />
                                    </div>
                                    <div className="form-group pt-2">
                                        <input
                                            type="text"
                                            className="form-control"
                                            placeholder="Price"
                                            value={price}
                                            onChange={(e) => setPrice(e.target.value)}
                                        />
                                    </div>
                                    <div className="form-group pt-2">
                                        <input
                                            type="number"
                                            className="form-control"
                                            placeholder="Phone"
                                            value={phone}
                                            onChange={(e) => setPhone(e.target.value)}
                                        />
                                    </div>
                                    <div className="form-group pt-2">
                                        <input
                                            type="text"
                                            className="form-control"
                                            placeholder="Customer Name"
                                            value={customername}
                                            onChange={(e) => setCustomername(e.target.value)}
                                        />
                                    </div>
                                    <div className="form-group pt-2">
                                        <input
                                            type="text"
                                            className="form-control"
                                            placeholder="Branch"
                                            value={branch}
                                            onChange={(e) => setBranch(e.target.value)}
                                        />
                                    </div>
                                    {/* Dropdowns */}
                                    <div className="form-group pt-2">
                                        <select
                                            className="form-select mb-3"
                                            value={condition}
                                            onChange={(e) => setCondition(e.target.value)}
                                        >
                                            <option>Cylinder Condition</option>
                                            <option>very-new</option>
                                            <option>new</option>
                                            <option>nice</option>
                                            <option>old</option>
                                            <option>very-old</option>
                                        </select>
                                    </div>
                                    <div className="form-group pt-2">
                                        <select
                                            className="form-select mb-3"
                                            value={paymentmethod}
                                            onChange={(e) => setPaymentmethod(e.target.value)}
                                        >
                                            <option>Payment Method</option>
                                            <option>cash</option>
                                            <option>momo</option>
                                            <option>airtel</option>
                                            <option>phone</option>
                                        </select>
                                    </div>
                                    <div className="form-group pt-2">
                                        <select
                                            className="form-select mb-3"
                                            value={category}
                                            onChange={(e) => setCategory(e.target.value)}
                                        >
                                            <option>Category</option>
                                            <option>refill</option>
                                            <option>fullset</option>
                                            <option>gas & cylinder</option>
                                        </select>
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

export default Retailsales;
