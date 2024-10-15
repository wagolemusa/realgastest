import { BsFillBellFill, BsFillEnvelopeFill, BsPersonCircle, BsSearch, BsJustify } from 'react-icons/bs';
import React, { useContext } from "react";
import Link from "next/link";
import { signOut } from "next-auth/react";
import AuthContext from "../../context/AuthContext";
import { useRouter } from 'next/navigation'; // Import useRouter to handle redirects

const DashordHeader = ({ OpenSidebar }) => {
  const router = useRouter(); // Initialize the router

  const logoutHandler = async () => {
    // Clear session and sign out
    await signOut({ redirect: false }); // Prevents automatic redirect by next-auth

    // You can add additional cleanup logic here if needed
    router.push('/login'); // Redirect to login page or any other page after logout
  };

  return (
    <header className='header'>
      <div className='menu-icon'>
        <BsJustify className='icon1' onClick={OpenSidebar} />
      </div>
      <div className='header-left'>
        <BsSearch className='icon' />
      </div>
      <div className='header-right'>
        <div className="dropdown">
          <button className="dropbtn">Profile</button>
          <div className="dropdown-content">
            <Link href="/me">My Profile</Link>
            <Link href="/me/update">Update Profile</Link>
            <Link href="/me/update_password">Update Password</Link>
            <a
              className="block px-3 py-2 text-red-800 hover:bg-red-100 hover:text-white-500 rounded-md cursor-pointer"
              onClick={logoutHandler}
            >
              Logout
            </a>
          </div>
        </div>
      </div>
    </header>
  );
};

export default DashordHeader;
