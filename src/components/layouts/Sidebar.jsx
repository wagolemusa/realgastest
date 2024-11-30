'use client'

import React, {useContext} from "react";
import Link from "next/link";
import { signOut } from "next-auth/react";
import AuthContext from "../../context/AuthContext";

const Sidebar = () => {

  const { user } = useContext(AuthContext)
  const logoutHandler = () => {
    signOut();
  }

  return (
    <aside className="md:w-1/3 lg:w-1/4 px-4">
      <ul className="sidebar1">

        {user?.role === "admin" && (
            <>
            <li>
              {" "}
              <Link
                href="/admin/products/new"
                className="block px-3 py-2 text-gray-800 hover:bg-blue-100 hover:text-blue-500 rounded-md"
              >
                New Product <span className="text-red-500">(Admin)</span>
              </Link>
            </li>

            <li>
              {" "}
              <Link
                href="/admin/products"
                className="block px-3 py-2 text-gray-800 hover:bg-blue-100 hover:text-blue-500 rounded-md"
              >
                All Products <span className="text-red-500">(Admin)</span>
              </Link>
            </li>

            <li>
              {" "}
              <Link
                href="/admin/orders"
                className="block px-3 py-2 text-gray-800 hover:bg-blue-100 hover:text-blue-500 rounded-md"
              >
                All Orders <span className="text-red-500">(Admin)</span>
              </Link>
            </li>

            <li>
              {" "}
              <Link
                href="/admin/users"
                className="block px-3 py-2 text-gray-800 hover:bg-blue-100 hover:text-blue-500 rounded-md"
              >
                All Users <span className="text-red-500">(Admin)</span>
              </Link>
            </li>

            <li>
              {" "}
              <Link
                href="/admin/branch"
                className="block px-3 py-2 text-gray-800 hover:bg-blue-100 hover:text-blue-500 rounded-md"
                >
                Branch<span className="text-red-500">(Admin)</span>
              </Link>
            </li>

            <li>
              {" "}
              <Link
                href="/admin/company"
                className="block px-3 py-2 text-gray-800 hover:bg-blue-100 hover:text-blue-500 rounded-md"
                >
                Compamy<span className="text-red-500">(Admin)</span>
              </Link>
            </li>

            <li>
              {" "}
              <Link
                href="/admin/customer"
                className="block px-3 py-2 text-gray-800 hover:bg-blue-100 hover:text-blue-500 rounded-md"
                >
                Customer<span className="text-red-500">(Admin)</span>
              </Link>
            </li>


            <li>
              {" "}
              <Link
                href="/admin/points"
                className="block px-3 py-2 text-gray-800 hover:bg-blue-100 hover:text-blue-500 rounded-md"
                >
                Points<span className="text-red-500">(Admin)</span>
              </Link>
            </li>

            <li>
              {" "}
              <Link
                href="/admin/gasbought"
                className="block px-3 py-2 text-gray-800 hover:bg-blue-100 hover:text-blue-500 rounded-md"
                >
                Gas bought<span className="text-red-500">(Admin)</span>
              </Link>
            </li>

            <li>
              {" "}
              <Link
                href="/admin/accessory"
                className="block px-3 py-2 text-gray-800 hover:bg-blue-100 hover:text-blue-500 rounded-md"
                >
                Accessory<span className="text-red-500">(Admin)</span>
              </Link>
            </li>


            <li>
              {" "}
              <Link
                href="/admin/sell"
                className="block px-3 py-2 text-gray-800 hover:bg-blue-100 hover:text-blue-500 rounded-md"
                >
                Sell Gas<span className="text-red-500">(Admin)</span>
              </Link>
            </li>

            <li>
              {" "}
              <Link
                href="/admin/promocode"
                className="block px-3 py-2 text-gray-800 hover:bg-blue-100 hover:text-blue-500 rounded-md"
                >
                Promo Code<span className="text-red-500">(Admin)</span>
              </Link>
            </li>
            <li>
              {" "}
              <Link
                href="/admin/invetory"
                className="block px-3 py-2 text-gray-800 hover:bg-blue-100 hover:text-blue-500 rounded-md"
                >
                Inveyory<span className="text-red-500">(Admin)</span>
              </Link>
            </li>
            <li>
              {" "}
              <Link
                href="/admin/sold"
                className="block px-3 py-2 text-gray-800 hover:bg-blue-100 hover:text-blue-500 rounded-md"
                >
                Sold Invetery<span className="text-red-500">(Admin)</span>
              </Link>
            </li>
            <li>
              {" "}
              <Link
                href="/admin/cylinder"
                className="block px-3 py-2 text-gray-800 hover:bg-blue-100 hover:text-blue-500 rounded-md"
                >
                Stock Cylinders<span className="text-red-500">(Admin)</span>
              </Link>
            </li>
            <li>
              {" "}
              <Link
                href="/admin/gas"
                className="block px-3 py-2 text-gray-800 hover:bg-blue-100 hover:text-blue-500 rounded-md"
                >
                Post Gas <span className="text-red-500">(Admin)</span>
              </Link>
            </li>
            
            <hr />
          </>

      )}
 

        <li>
          {" "}
          <Link
            href="/me"
            className="block px-3 py-2 text-gray-800 hover:bg-blue-100 hover:text-blue-500 rounded-md"
          >
            Your Profile
          </Link>
        </li>
        <li>
          {" "}
          <Link
            href="/me/orders"
            className="block px-3 py-2 text-gray-800 hover:bg-blue-100 hover:text-blue-500 rounded-md"
          >
            Orders
          </Link>
        </li>
        <li>
          {" "}
          <Link
            href="/me/update"
            className="block px-3 py-2 text-gray-800 hover:bg-blue-100 hover:text-blue-500 rounded-md"
          >
            Update Profile
          </Link>
        </li>
        <li>
          {" "}
          <Link
            href="/me/update_password"
            className="block px-3 py-2 text-gray-800 hover:bg-blue-100 hover:text-blue-500 rounded-md"
          >
            Update Password
          </Link>
        </li>

        <li>
          {" "}
          <a className="block px-3 py-2 text-red-800 hover:bg-red-100 hover:text-white-500 rounded-md cursor-pointer"
            onClick={logoutHandler}
          >
            Logout
          </a>
        </li>
      </ul>
    </aside>
  );
};

export default Sidebar;