'use client'

import Sidebarnav from "../../components/layouts/Sidebar2"
import DashordHeader from "../../components/layouts/DashordHeader"
import { useState } from "react";

const AdminLayout = ({ children }) => {
    const [openSidebarToggle, setOpenSidebarToggle] = useState(false)

    const OpenSidebar = () => {
        setOpenSidebarToggle(!openSidebarToggle)
    }
    return (
        <section className="py-20">
            <DashordHeader OpenSidebar={OpenSidebar} />
            <div className="mx-auto px-4">
                <div className="flex flex-col md:flex-row -mx-4">
                    {/* <Sidebar /> */}

                    <Sidebarnav openSidebarToggle={openSidebarToggle} OpenSidebar={OpenSidebar} />
                    <main className="main2 md:w-1/2 lg:w-3/4">
                        <main className="md:w-1/8 lg:w-3/8">
                            {children}
                        </main>
                    </main>
                </div>
            </div>
        </section>
    );
}
export default AdminLayout;


