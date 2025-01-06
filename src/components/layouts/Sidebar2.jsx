import React, { useContext } from "react";
import Link from "next/link";
import { signOut } from "next-auth/react";
import AuthContext from "../../context/AuthContext";

import {
BsCart3, BsGrid1X2Fill, BsFillArchiveFill, BsFillGrid3X3GapFill, BsPeopleFill,
BsListCheck, BsMenuButtonWideFill, BsFillGearFill
}
    from 'react-icons/bs'
import { BiCross } from "react-icons/bi";
import { RiStockFill } from "react-icons/ri";
import { FcSalesPerformance } from "react-icons/fc";
import { FaCode } from "react-icons/fa";
import { AiOutlineStock } from "react-icons/ai";
import { MdOutlineLocalGasStation } from "react-icons/md";
import { BiBookmarkAltPlus } from "react-icons/bi";

const Sidebarnav = ({ openSidebarToggle, OpenSidebar }) => {

    const { user } = useContext(AuthContext)
    const logoutHandler = () => {
        signOut();
    }


    return (
        <aside id="sidebar" className={openSidebarToggle ? "sidebar-responsive" : ""}>
            <div className='sidebar-title'>
                <span className='icon close_icon' onClick={OpenSidebar}>X</span>
            </div>
     
            {user?.role === 'admin' && (
                <ul className='sidebar-list'>

                    <li className="sidebar-list-item">
                    <BsCart3 className='icon_header' />
                        <a href="/admin" className='sidebar-brand'>
                            Dashboard
                        </a>
                    </li>

                    <li className='sidebar-list-item'>
                        <BsGrid1X2Fill className='icon' />
                        <a href="/admin/orders">
                            Orders
                        </a>
                    </li>
                    <li className='sidebar-list-item'>
                        <BsFillArchiveFill className='icon' />
                        <a href="/admin/users">
                            Users
                        </a>
                    </li>

                    <li className='sidebar-list-item'>
                        <BsFillArchiveFill className='icon' />
                        <a href="/admin/customer-sms">
                            Message
                        </a>
                    </li>

                    <li className='sidebar-list-item'>
                        <BsPeopleFill className='icon' />
                        <a href="/admin/branch">
                            Branches
                        </a>
                    </li>
                    <li className='sidebar-list-item'>
                        <BsListCheck className='icon' />
                        <a href="/admin/company">
                            Gas Companies
                        </a>
                    </li>
                    <li className='sidebar-list-item'>
                        <BsMenuButtonWideFill className='icon' />
                        <a href="/admin/customer">
                            Customers
                        </a>
                    </li>
                    <li className='sidebar-list-item'>
                        <BsMenuButtonWideFill className='icon' />
                        <a href="/admin/installment">
                            Installments
                        </a>
                    </li>
                    <li className='sidebar-list-item'>
                        <BsFillGearFill className='icon' />
                        <a href="/admin/points">
                            Points
                        </a>
                    </li>
                    <li className='sidebar-list-item'>
                        <BsFillGearFill className='icon' />
                        <a href="/admin/referral">
                            Referral Points
                        </a>
                    </li>
                    <li className='sidebar-list-item'>
                        <MdOutlineLocalGasStation className='icon' />
                        <a href="/admin/gasbought">
                            Gas Bought
                        </a>
                    </li>
                    <li className='sidebar-list-item'>
                        <MdOutlineLocalGasStation className='icon' />
                        <a href="/admin/bulk">
                            Bulk Gas
                        </a>
                    </li>
                    <li className='sidebar-list-item'>
                        <AiOutlineStock className='icon' />
                        <a href="/admin/sell">
                            Gas Sales
                        </a>
                    </li>
                    <li className='sidebar-list-item'>
                        <AiOutlineStock className='icon' />
                        <a href="/admin/sealed">
                            Create Cylinders
                        </a>
                    </li>
                    <li className='sidebar-list-item'>
                        <AiOutlineStock className='icon' />
                        <a href="/admin/resaler">
                            Resalers
                        </a>
                    </li>
                    <li className='sidebar-list-item'>
                        <AiOutlineStock className='icon' />
                        <a href="/admin/updatedseal">
                            Tracker Cylinders
                        </a>
                    </li>
                    <li className='sidebar-list-item'>
                        <FaCode className='icon' />
                        <a href="/admin/promocode">
                            Promo code
                        </a>
                    </li>
                    <li className='sidebar-list-item'>
                        <FaCode className='icon' />
                        <a href="/admin/expense">
                            Expenses
                        </a>
                    </li>
                    <div class="dropdown">
                        <li className='sidebar-list-item'>
                            <BiBookmarkAltPlus className='icon' />
                            <a class="dropbtn">Accesories</a>
                            <div class="dropdown-content">
                                <a href="/admin/products">Post Accesories for Web</a>
                                <a href="/admin/accessory">Accesory Category</a>
                                <a href="/admin/invetory">New Invetory</a>
                            </div>
                        </li>
                    </div>
                    <li className='sidebar-list-item'>
                        <FcSalesPerformance className='icon' />
                        <a href="/admin/sold">
                            Sold Invetory
                        </a>
                    </li>
                    <li className='sidebar-list-item'>
                        <RiStockFill className='icon' />
                        <a href="/admin/cylinder">
                            Stocked Cylinders
                        </a>
                    </li>


                    <li className='sidebar-list-item'>
                        <BiCross className='icon' />
                        <a href="/admin/gas">
                            Post Gas
                        </a>
                    </li>
                </ul>

            )}

            {/* Routes for users */}
            {user?.role == 'user' && (
                <ul className='sidebar-list'>
                <li className='sidebar-list-item'>
                    <BsGrid1X2Fill className='icon' />
                    <a href="/address">
                        Address
                    </a>
                </li>
                <li className='sidebar-list-item'>
                    <BsGrid1X2Fill className='icon' />
                    <a href="/me/userOrders">
                        My Orders
                    </a>
                </li>
            </ul>
            )}


            {/* Routes for Shopkeeper */}
            { user?.role == "shopkeeper" && (
                <ul className='sidebar-list'>
                    <li className="sidebar-list-item">
                    <BsCart3 className='icon_header' />
                        <a href="/admin/shopkeeper" className='sidebar-brand'>
                            BulkS ales
                        </a>
                    </li>

                    <li className="sidebar-list-item">
                    <BsCart3 className='icon_header' />
                        <a href="/admin/retail" className='sidebar-brand'>
                           Retail Sales
                        </a>
                    </li>
                    <li className="sidebar-list-item">
                    <BsCart3 className='icon_header' />
                        <a href="/admin/shoper" className='sidebar-brand'>
                           Today Sales
                        </a>
                    </li>
                </ul>
            )}
        

            
        </aside>
    )
}

export default Sidebarnav;