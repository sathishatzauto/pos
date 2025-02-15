/*eslint-disable*/
import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBagShopping } from "@fortawesome/free-solid-svg-icons";
import jimmyslogo from "../../assets/img/jimmyslogo.png";
import { ThumbsUpIcon } from "react-line-awesome";
import table from "../../assets/img/table.png";
import rcfav from "../../assets/img/rcfav.png";
import axios from "axios";

export default function IndexNavbar() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const tableId =  localStorage.getItem("table") || "";
  const [tableName, setTableName] = useState('');
  const [tableArea, setTableArea] = useState('');

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  const fetchTable = async (tableId) => {
    try {
      const response = await axios.get(
        `https://api.rcpos.co.za/api/table/find/${tableId}`
      );
      if (response.status == 200) {
        if(response.data.status) {
            setTableName(response.data.name);
            setTableArea(response.data.area_name);
        }
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    console.log(tableId)
    if (tableId) {
      fetchTable(tableId);
    }
  }, [tableId]);

  return (
    <>
      <nav className="bgheader top-0 absolute z-50 w-full flex flex-wrap items-center justify-between px-2 navbar-expand-lg transparent">
        <div className="container mx-auto py-3">
          <div className="flex items-center justify-between">
            <div className="w-2/12">
              <Link to={`/${localStorage.getItem('table') || ''}`}>
                <img src={rcfav} alt="logo" className="w-8"></img>
              </Link>
            </div>
            <div className="w-4/12">
              <div>
                <img src={jimmyslogo} alt="logo" className="w-40"></img>
              </div>
            </div>
            <div className="w-8/12 flex gap-2 justify-end items-center">
              <div className="">
                <h1 className="font-semibold text-sm text-white text-center">
                  Table No : {tableArea} - {tableName}
                </h1>
              </div>
              <img src={table} alt="Table" className="w-7 h-7" />
            </div>
          </div>
        </div>
      </nav>
      <div className={`sidebar ${sidebarOpen ? "open" : ""}`}>
        <div onClick={toggleSidebar} className="close-btn">
          <img
            src="https://i.ibb.co/mN96B3V/closee.png"
            alt=""
            className="w-12"
          />
        </div>

        <div className="container mx-auto xl:px-32">
          <div className="w-full mt-24">
            <div className="flex flex-wrap">
              <div className="xl:w-7/12">
                <p className="text-white fontfamily xl:text-7xl font-light mt-16 uppercase">
                  Home
                </p>
                <Link to="/projects">
                  <p className="text-white fontfamily xl:text-7xl font-light mt-6 uppercase">
                    Projects
                  </p>
                </Link>
                <Link to="/who-we-are">
                  <p className="text-white fontfamily xl:text-7xl font-light mt-6 uppercase">
                    Studio
                  </p>
                </Link>
                <Link to="/contact">
                  <p className="text-white fontfamily xl:text-7xl font-light mt-6 uppercase">
                    Contact
                  </p>
                </Link>
              </div>

              <div className="xl:w-5/12 mt-16">
                <h1 className="text-white fontfamily xl:text-2xl font-light">
                  500 Terry Francine Street,<br></br>
                  San Francisco, CA 94158
                </h1>
                <p className="text-white fontfamily xl:text-2xl font-light mt-6">
                  info@mysite.com
                </p>
                <p className="text-white fontfamily xl:text-2xl font-light mt-2">
                  Tel: 123-456-7890
                </p>

                <p className="text-white fontfamily xl:text-xl font-light flex  items-center mt-12">
                  Facebook{" "}
                  <img
                    src="https://i.ibb.co/qjtq7P8/arrowws.png"
                    alt=""
                    className=" h-5 pl-4"
                  ></img>
                </p>
                <p className="text-white fontfamily xl:text-xl font-light flex items-center mt-3">
                  LinkedIn{" "}
                  <img
                    src="https://i.ibb.co/qjtq7P8/arrowws.png"
                    alt=""
                    className=" h-5 pl-4"
                  ></img>
                </p>
                <p className="text-white fontfamily xl:text-xl font-light flex items-center mt-3">
                  Instagram{" "}
                  <img
                    src="https://i.ibb.co/qjtq7P8/arrowws.png"
                    alt=""
                    className=" h-5 pl-4"
                  ></img>
                </p>
                <p className="text-white fontfamily xl:text-xl font-light flex items-center mt-3">
                  X{" "}
                  <img
                    src="https://i.ibb.co/qjtq7P8/arrowws.png"
                    alt=""
                    className=" h-5 pl-4"
                  ></img>
                </p>
              </div>
            </div>
          </div>
        </div>
        {/* Sidebar content goes here */}
      </div>
    </>
  );
}
