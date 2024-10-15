'use client';

import React, { useContext, useState } from "react";
import Link from "next/link";
import CartContext from "../../context/CartContext";
import { useRouter } from "next/navigation";
import AuthContext from "../../context/AuthContext";
import Image from "next/image";
import axios from "axios";

const Pay = ({ session, addresses }) => {
  const router = useRouter();
  const { cart, clearCart } = useContext(CartContext);
  const { user } = useContext(AuthContext);



  const [shippingInfo, setShippinInfo] = useState("");

  const setShippingAddress = (address) => {
    setShippinInfo(address._id);
  };

  const amountWithoutTax = cart?.cartItems?.reduce(
    (acc, item) => acc + item.quantity * item.price,
    0
  );

  const totalAmount = Number(amountWithoutTax);
  const referralcode = session?.user?.referalCode;

  const submitHandlerpay = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post(
        `${process.env.ENVIRONMENT_URL}/api/orders/checkoutPay`,
        {
          amount: amountWithoutTax,
          totalAmount: totalAmount,
          user,
          orderItems: cart?.cartItems,
          shippingInfo,
          referralcode,
          points: 2000,
        }
      );

      console.log("datasss",{
        amount: amountWithoutTax,
        totalAmount,
        user,
        orderItems: cart?.cartItems,
        shippingInfo,
        referralcode,
        points: 2000,
      })

      clearCart();

      if (data) {
        router.push("/me/orders");
      }
    } catch (error) {
      console.error("Error during checkout:", error);
      // Handle the error, show a message to the user, or redirect to an error page.
    }
  };


 

  return (
    <div>

     
      <section className="py-10 bg-gray-50">
        <div className="container max-w-screen-xl mx-auto px-4">
          <div className="flex flex-col md:flex-row gap-4 lg:gap-8">
            <main className="md:w-2/3">
              <article className="border border-gray-200 bg-white shadow-sm rounded p-4 lg:p-6 mb-5">
                <h2 class="text-xl font-semibold mb-5">Shipping information for easy delivery </h2>
                 <h3 className="text-xl text-red-600 font-semibold">Free Delivery To Your Door Step</h3>


                <div class="grid sm:grid-cols-2 gap-4 mb-6">
                    {addresses?.map((address) => (
                     <label key={address._id} class="flex p-3 border border-gray-200 rounded-md bg-gray-50 hover:border-blue-400 hover:bg-blue-50 cursor-pointer"
                     onClick={() => setShippingAddress(address)}
                     >
                   
                    <span>
                      <input
                        name="shipping"
                        type="radio"
                        class="h-4 w-4 mt-1"
                      />
                    </span>
                    <p class="ml-2">
                      <span>{address.street}</span>
                      <small class="block text-sm text-gray-400">
                       <b>Phone</b>:  {address.phoneNo}<br/> 
                       <b>Area</b>:  {address.locationArea}
                        <br />
                        <b>Description</b>:  {address.describeLocation}
                        <br />
                        <b>Map Url</b>:  {address.mapurl}
                      </small>
                    </p>
                  </label>
                    ))}
       
                </div> 

                <Link
                  href="/address/new"
                  className="px-4 py-2 inline-block text-blue-600 border border-gray-300 rounded-md hover:bg-gray-100"
                >
                  <i className="mr-1 fa fa-plus"></i> Add new address
                </Link>

                <div className="flex justify-end space-x-2 mt-10">
                  <Link
                    href="/cart"
                    className="px-5 py-2 inline-block text-gray-700 bg-white shadow-sm border border-gray-200 rounded-md hover:bg-gray-100 hover:text-blue-600"
                  >
                    Back
                  </Link>
                  <a className="px-5 py-2 inline-block text-white bg-green-600 border border-transparent rounded-md hover:bg-green-700 cursor-pointer"
                    onClick={submitHandlerpay}
                  >
                    pay on Delivery
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
                  <li className="flex justify-between mb-1">
                    {/* <span>Est TAX:</span> */}
                    {/* <span>${cart?.checkoutInfo?.tax}</span> */}
                  </li>
                  <li className="border-t flex justify-between mt-3 pt-3">
                    <span>Total Amount:</span>
                    <span className="text-gray-900 font-bold">UGX {cart?.checkoutInfo?.totalAmount}</span>
                  </li>
                </ul>

                <hr className="my-4" />

                <h2 class="text-lg font-semibold mb-3">Items in cart</h2>

                  {cart?.cartItems?.map((item) => (

                    <figure 
                      key={item._id} class="flex items-center mb-4 leading-5">
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

export default Pay