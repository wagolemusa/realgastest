'use client'

import React, { useState } from "react"

import axios from "axios"



const Sendsms = () =>{
    const [message, setMessage] = useState("");
    const [error, setError] = useState("")


    const handleSave = async (e) => {
        e.preventDefault();
        setError(null);

        const Savesms = {
            message
        }

        try {
            const response = await axios.post(`${process.env.ENVIRONMENT_URL}/api/customer-sms`, Savesms, {
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                }
            });

            if (response.status === 201) {
                window.location.replace("/admin/me");
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
     <section 
        style={{ maxWidth: "700px" }}
        className="main2 mt-10 mb-20 p-4 md:p-7 mx-auto rounded bg-white shadow-lg">
            <h2 className="text-3xl my-3 ml-4 font-bold">Send Messages to all Custoners</h2>         

    
        <div className="relative overflow-x-auto shadow-md sm:rounded-lg px-8 py-8">
            <form onSubmit={handleSave}>
                <div className="mb-4">
                    <label className="block mb-1"> Message</label>
                    {/* <input
                        type="text"
                        className="appearance-none border border-gray-200 bg-gray-100 rounded-md py-2 px-3 hover:border-gray-400 focus:outline-none focus:border-gray-400 w-full"
                        placeholder="Send Message"
                        name="message"
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                        required
                    /> */}
                    <textarea id="message" rows="6" class="block p-2.5 w-full text-sm text-gray-900  focus:ring-blue-500 focus:border-blue-500  dark:border-gray-600 dark:placeholder-gray-400 bg-gray-50 rounded-lg border border-gray-300 dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Write your thoughts here..."
                      name="message"
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      required
                    />

                    
                </div>

        
                <button
                    type="submit"
                    className="my-2 px-4 py-2 text-center inline-block text-white bg-blue-600 border border-transparent rounded-md hover:bg-blue-700 w-full"
                >
                    Send Messages
                </button>
            </form>
        </div>
        </section>
        </div>
        </div>
        </>
    )

}


export default Sendsms;