'use client'

import React, { useContext, useState } from "react";
import Link from "next/link";
import CartContext from "../../context/CartContext";
import { toast } from "react-toastify";

import axios from "axios";
import Image from "next/image";

const Shipping = () => {
  const { cart, saveOnCheckoutPay } = useContext(CartContext);

  const [shippingInfo, setShippinInfo] = useState("");

  const setShippingAddress = (address) => {
    setShippinInfo(address._id);
  };

  // PAying using Stripe
  // const checkoutHandler = async () => {
  //   if (!shippingInfo) {
  //     return toast.error("Please select your shipping address");
  //   }
  //   // move to stripe checkoutpage
  //   try {
  //     const { data } = await axios.post(
  //       `${process.env.ENVIRONMENT_URL}/api/orders/checkout_session`,
  //       {
  //         items: cart?.cartItems,
  //         shippingInfo,
  //       }
  //     );
      
  //     console.log("Data => ", data)
  //     window.location.href = data.url;
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };

  const amountWithoutTax = cart?.cartItems?.reduce(
    (acc, item) => acc + item.quantity * item.price,
    0
  );


  // const taxAmount = (amountWithoutTax * 0.15).toFixed(2);

  // const taxAmount = amountWithoutTax

  

  const totalAmount = (Number(amountWithoutTax))                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                            

 

  const checkoutHandlerPay = () => {
    const data = {
      amount: amountWithoutTax,
      totalAmount
    }

    saveOnCheckoutPay(data)

  }


 

  return (
    <div>
     
      <section className="py-10 bg-gray-50">
        <div className="container max-w-screen-xl mx-auto px-4">
          <div className="flex flex-col md:flex-row gap-4 lg:gap-8">
            <main className="md:w-2/3">
              <article className="border border-gray-200 bg-white shadow-sm rounded p-4 lg:p-6 mb-5">
                <h2 class="text-xl font-semibold mb-5">Shipping information</h2>

                <div class="grid sm:grid-cols-2 gap-4 mb-6">
                   
       
              </div>

            

                <div className="flex justify-end space-x-2 mt-10">
                  <Link
                    href="/cart"
                    className="px-5 py-2 inline-block text-gray-700 bg-white shadow-sm border border-gray-200 rounded-md hover:bg-gray-100 hover:text-blue-600"
                  >
                    Back
                  </Link>
                  <a className="px-5 py-2 inline-block text-white bg-green-600 border border-transparent rounded-md hover:bg-green-700 cursor-pointer"
                    onClick={checkoutHandlerPay}
                  >
                    Checkout
                  </a>
                </div>
              </article>
            </main>
            <aside className="md:w-1/3">
              <article className="text-gray-600" style={{ maxWidth: "350px" }}>
                <h2 className="text-lg font-semibold mb-3">Summary</h2>
                <ul>
                  <li className="flex justify-between mb-1">
                    <span>Amount:</span>
                    <span>UGX {cart?.checkoutInfo?.amount}</span>
                  </li>
            
                  <li className="border-t flex justify-between mt-3 pt-3">
                    <span>Total Amount:</span>
                    <span className="text-gray-900 font-bold">UGX {cart?.checkoutInfo?.totalAmount}</span>
                  </li>
                </ul>

                <hr className="my-4" />

                <h2 class="text-lg font-semibold mb-3">Items in cart</h2>

                  {cart?.cartItems?.map((item) => (

                    <figure key={item._id} class="flex items-center mb-4 leading-5">
                    <div>
                      <div class="block relative w-20 h-20 rounded p-1 border border-gray-200">
                        <Image
                          width="50"
                          height="50"
                          src={item.image}
                          alt="Title"
                        />
                        <span class="absolute -top-2 -right-2 w-6 h-6 text-sm text-center flex items-center justify-center text-white bg-gray-400 rounded-full">
                          {item.quantity}
                        </span>
                      </div>
                    </div>
                    <figcaption class="ml-3">
                      <p>{item.name.substring(0, 50)}</p>
                      <p class="mt-1 text-gray-400">Total: UGX {item.quantity * item.price}</p>
                    </figcaption>
                    </figure>
                  ))}    
         
              </article>
            </aside>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Shipping;