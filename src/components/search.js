/*eslint-disable*/
import React, { useEffect, useState } from "react";
import rcfav from '../assets/img/rcfav.png';
import axios from "axios";

export default function Search({ search, setSearch }) {
    const [menuOpen, setMenuOpen] = useState(false);
    const [items, setItems] = useState([]);
    const [expandedSection, setExpandedSection] = useState(null); // Tracks which section is expanded
    const fetchItems = async () => {
        try {
          const response = await axios.get(
            "https://api.rcpos.co.za/api/products"
          );
          setItems(response.data);
        } catch (error) {
          console.log(error);
        }
      };

    return (
        <>
            <section className="bgheader pt-16 pb-6">
                <div
                key={items.id} className="container mx-auto pt-2 px-2">
                    <label htmlFor="search" className="text-sm font-medium text-gray-900 sr-only dark:text-white"></label>
                    <div className="relative">
                        <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                            <i className="las la-search text-xl text-fuchsia-600"></i>
                        </div>
                        <input
                            type="search"
                            id="search"
                            className="pl-12 block w-full p-4 ps-10 text-sm text-gray-900 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                            placeholder="Search Food and Kitchen"
                            required
                            value={search}
                            autoComplete="off"
                            onChange={(e) => setSearch(e.target.value)}
                        />
                    </div>
                </div>
                <div
                    className={`fixed top-0 left-0 w-full h-full bg-white text-black transition-transform duration-300 
                        ${menuOpen ? "translate-x-0" : "translate-x-full"
                        } z-50`}
                >
                </div>
            </section>
        </>
    );
}
