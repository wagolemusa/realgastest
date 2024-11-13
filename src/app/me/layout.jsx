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
                 

                    <Sidebarnav openSidebarToggle={openSidebarToggle} OpenSidebar={OpenSidebar} />
                        <main className="">
                            <main className="">
                                <article>
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


