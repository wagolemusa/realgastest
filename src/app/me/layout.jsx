'use client'

import React, { useState} from "react";

import DashordHeader from "../../components/layouts/DashordHeader";
import Sidebarnav from "../../components/layouts/Sidebar2";

export default function UserLayout({ children }) {
    const [openSidebarToggle, setOpenSidebarToggle] = useState(false)

    const OpenSidebar = () => {
        setOpenSidebarToggle(!openSidebarToggle)
    }
    return (
        <> 
           <section className="py-20">
            <DashordHeader OpenSidebar={OpenSidebar} />
            <div className="mx-auto px-4">
                <div className="flex flex-col md:flex-row -mx-4">
                    {/* <Sidebar /> */}

                    <Sidebarnav openSidebarToggle={openSidebarToggle} OpenSidebar={OpenSidebar} />
                        <main className="md:w-2/3 lg:w-3/4 px-4">
                            <main className="md:w-2/3 lg:w-3/4 px-4">
                                <article className="border border-gray-200 bg-white shadow-sm rounded mb-5 p-3 lg:p5">
                                    {children }
                                </article>
                            </main>
                        </main>
                    </div>
                </div>
            </section>
        </>
    );
}


