'use client'

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";

const Accessory = () => {

    const [name, setName] = useState('')
    const [error, setError] = useState("");

    const router = useRouter();

    const handleSave = async (e) => {
        e.preventDefault();
        setError(null);

        const createAccessory = {
            name
        }
        try {
            const response = await axios.post(`${process.env.ENVIRONMENT_URL}/api/admin/accessory`, createAccessory, {
            headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                }
            });
            if (response.status === 201) {
                window.location.replace("/admin/accessory");
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
        <section 
        style={{ maxWidth: "700px" }}
        className="main2 mt-10 mb-20 p-4 md:p-7 mx-auto rounded bg-white shadow-lg">
            <form onSubmit={handleSave}>
                <div className="mb-4">
                    <label className="block mb-1"> Accessories</label>
                    <input
                        type="text"
                        className="appearance-none border border-gray-200 bg-gray-100 rounded-md py-2 px-3 hover:border-gray-400 focus:outline-none focus:border-gray-400 w-full"
                        placeholder="accessory Name"
                        name="name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required
                    />
                </div>
                <button
                    type="submit"
                    className="my-2 px-4 py-2 text-center inline-block text-white bg-blue-600 border border-transparent rounded-md hover:bg-blue-700 w-full"
                >
                    Create Accessory
                </button>
            </form>
        </section>
    )
}

export default Accessory;