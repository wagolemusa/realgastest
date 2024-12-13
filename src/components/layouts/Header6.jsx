'use client';

import React, { useContext, useState, useEffect } from "react";
import Image from "next/image";
import g from '../../../public/images/g.png';
import { IoCloseOutline } from "react-icons/io5";
import { FiMenu } from "react-icons/fi";
import { Dialog } from '@headlessui/react';
import { useRouter } from "next/navigation";
import CartContext from "../../context/CartContext";
import { useSession, signOut } from "next-auth/react";
import AuthContext from "../../context/AuthContext";

export default function Header6() {
    const [mobile, setMobile] = useState(false);
    const { user, setUser } = useContext(AuthContext);
    const { cart, setCart } = useContext(CartContext);
    const router = useRouter();
    const { data: session, status } = useSession();

    useEffect(() => {
        if (session?.user) {
            setUser(session.user);
            fetchCartData(session.user.id);
        }
    }, [session, setUser]);


    
    const fetchCartData = async (userId) => {
        try {
            const response = await fetch('/api/cart');
            if (response.ok) {
                const { cartItems } = await response.json();
                setCart({ cartItems });
            } else {
                console.error('Failed to fetch cart data');
            }
        } catch (error) {
            console.error('Failed to fetch cart data:', error);
        }
    };

    const logoutHandler = async () => {
        try {
            localStorage.removeItem("cartItems");
            await signOut({ redirect: false });
            setUser(null); // Clear user context
            router.replace('/login');
        } catch (error) {
            console.error("Logout failed:", error);
        }
    };

    const handleNavigate = (url) => {
        router.replace(url);
        setMobile(false);
    };

    if (status === "loading") {
        return <h2>Loading........</h2>;
    }

    return (
        <header className="sticky-header mx-auto border-b shadow-md">
            <div className="help">
                <p>Quick Response</p>
                <p>0743955171</p>
            </div>
            <nav className="flex items-center justify-between p-4 md:p-6 lg:px-8 font-bold">
                <div>
                    <button onClick={() => handleNavigate('/')} className="flex items-center gap-1 text-lg text-red-600">
                        <span className="text-4xl font-mono">
                            <Image
                                width={40}
                                height={40}
                                className="h-8 w-8 rounded-full"
                                src={g}
                                alt="avatar-img"
                            />
                        </span>
                    </button>
                </div>

                <div className="hidden md:flex md:space-x-8">
                    <ul className="flex space-x-8">
                     
                            <li><button onClick={() => handleNavigate('/fullset')} className="text-lg font-medium leading-6 text-slate-900">Full-set</button></li>
                                <li><button onClick={() => handleNavigate('/cookers')} className="text-lg font-medium leading-6 text-slate-900">Gas Cookers</button></li>
                                <li><button onClick={() => handleNavigate('/accessories')} className="text-lg font-medium leading-6 text-slate-900">Accessories</button></li>
                                <li><button onClick={() => handleNavigate('/contact')} className="text-lg font-medium leading-6 text-slate-900">Help Center</button></li>
                    </ul>
                </div>

                {!user ? (
                    <>
                    <button onClick={() => handleNavigate('/login')} className="hidden md:block w-full rounded bg-red-600 px-8 py-2 text-md font-medium text-white shadow hover:bg-red focus:outline-none focus:ring active:bg-red-500 sm:w-auto">
                        <i className="text-gray-400 fa fa-user"></i>
                        <span className="hidden lg:inline ml-1">Sign in</span>
                    </button>
                    </>
                  
                ) : (
                    <>
                     <button onClick={() => handleNavigate('/cart')} className="inline-block text-center text-gray-700">
                    Cart (<b className="cartX">{cart?.cartItems?.length || 0}</b>)
                    </button>

                        <button  onClick={() => handleNavigate('/me')} className="hidden md:block">
                            <div className="flex items-center cursor-pointer">
                                <div className="space-y-1 font-medium">
                                    <p className="usernamex">{user?.name}</p>
                                </div>
                            </div>
                        </button>
                    </>
                )}

                    <div className="slidemenu flex md:hidden">
                            <button className="-m-2 inline-flex items-center justify-center rounded-md p-2.5 text-gray-900 hover:text-red-600 transition duration-100" onClick={() => setMobile(true)}>
                                <FiMenu />
                        </button>
                     </div>
            </nav>


            {/* Mobile Dialog */}
            <Dialog as='div' className={'md:hidden'} open={mobile} onClose={() => setMobile(false)}>
                <div className="fixed inset-0 z-50 bg-gray bg-opacity-8" />
                <Dialog.Panel className="fixed inset-y-0 right-0 z-50 overflow-y-auto bg-white px-6 py-6 sm:max-w-sm sm:ring-1 sm:ring-text/10 w-screen">
                    <div className="flex items-center justify-between mb-3">
                        <div>
                            <button onClick={() => handleNavigate('/')} className="flex items-center gap-1 text-lg text-red-600">
                                <span className="text-4xl font-mono">
                                    <Image
                                        width={40}
                                        height={40}
                                        className="h-8 w-8 rounded-full"
                                        src={g}
                                        alt="avatar-img"
                                    />
                                </span>
                            </button>
                        </div>
                        <button className="closeQ -m-2 inline-flex items-center justify-center rounded-md p-2.5 text-gray-900 hover:text-red-600 transition duration-100" onClick={() => setMobile(false)}>
                            <IoCloseOutline />
                        </button>
                    </div>

                    <div className="mt-6 flow-root">
                        <div className="-my-2 divide-y divide-gray-500/50">
                            <ul className="space-y-10 py-6">
                                <li><button onClick={() => handleNavigate('/fullset')} className="text-lg font-medium leading-6 text-slate-900">Full-set</button></li>
                                <li><button onClick={() => handleNavigate('/cookers')} className="text-lg font-medium leading-6 text-slate-900">Gas Cookers</button></li>
                                <li><button onClick={() => handleNavigate('/accessories')} className="text-lg font-medium leading-6 text-slate-900">Accessories</button></li>
                                <li><button onClick={() => handleNavigate('/contact')} className="text-lg font-medium leading-6 text-slate-900">Help Center</button></li>
                            </ul>
                            {!user ? (
                                <div className="py-6">
                                    <button onClick={() => handleNavigate('/login')} className="block w-full text-center rounded bg-red-600 px-8 py-3 text-md font-medium text-white shadow hover:bg-red focus:outline-none focus:ring active:bg-red-500 sm:w-auto">
                                        Login
                                    </button>
                                </div>
                            ) : (
                                <div className="py-6">
                                    <button onClick={() => handleNavigate('/me')} className="block w-full text-center rounded bg-red-600 px-8 py-3 text-md font-medium text-white shadow hover:bg-red focus:outline-none focus:ring active:bg-red-500 sm:w-auto">
                                        My Account
                                    </button>
                                    <a className="block w-full text-center mt-2 text-red-800 hover:bg-red-100 hover:text-white-500 rounded-md cursor-pointer" onClick={logoutHandler}>
                                        Logout
                                    </a>
                                </div>
                            )}
                        </div>
                    </div>
                </Dialog.Panel>
            </Dialog>
        </header>
    );
}
