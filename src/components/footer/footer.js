/*eslint-disable*/
import React, { useState, useEffect } from "react";
import location from "../../assets/img/location.png";
import { Link } from "react-router-dom";

export default function Footer() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [cartList, setCartList] = useState([]);

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  useEffect(() => {
    setCartList(JSON.parse(localStorage.getItem("cartList") || "[]") || []);
  },[]);

  return (
    <>

      <section className="border-t border-neutral-200 py-4 fixed bg-puple-500  bottom-0 z-50 w-full flex flex-wrap items-center justify-between px-2 navbar-expand-lg transparent border-b border-gray-100">
        <div className="container mx-auto ">
          <div className="flex justify-between">
            <Link to={`/${localStorage.getItem('table') || ''}`}>
              <div className="justify-center text-center">
                <i className="las la-home text-xl text-neutral-600"></i>
                <h1 className="text-neutral-900 text-sm">Home</h1>
              </div>
            </Link>

            <Link to="/search">
              <div className="justify-center text-center">
                <i className="las la-search text-xl text-neutral-600"></i>
                <h1 className="text-neutral-900 text-sm">Search</h1>
              </div>
            </Link>

            <Link to="/cart" className="relative">
              <div className="justify-center text-center relative">
                <i className="las la-shopping-bag text-xl text-neutral-600"></i>
                <h1 className="text-neutral-900 text-sm">Cart</h1>

                {/* Notification Badge */}
                {cartList.length > 0 && (
                <span className="absolute -top-1 -right-1 bg-red-600 text-white text-xs font-bold rounded-full w-4 h-4">
                  {cartList.length}
                </span>
                )}
              </div>
            </Link>


            <Link to="/account">
              <div className="justify-center text-center">
                <i className="las la-user text-xl text-neutral-600"></i>
                <h1 className="text-neutral-900 text-sm">Account</h1>
              </div>
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
