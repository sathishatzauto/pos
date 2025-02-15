/*eslint-disable*/
import { useEffect, useState } from "react";
import Footer from "./footer/footer";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import "react-tabs/style/react-tabs.css";
import axios from "axios";
import {  useNavigate } from "react-router-dom";

export default function Searching() {
  const [categories, setCategories] = useState([]);
  const [items, setItems] = useState([]);
  const [search, setSearch] = useState("");
  const [menuOpen, setMenuOpen] = useState(false);
  const [expandedSection, setExpandedSection] = useState(null); // Tracks which section is expanded
  const navigate = useNavigate();

  const toggleMenu = () => {
    setMenuOpen(!menuOpen); // Toggles the menu
  };
  const toggleSection = (section) => {
    setExpandedSection(expandedSection === section ? null : section); // Toggles the section
  };
  const fetchCategories = async () => {
    try {
      const response = await axios.get(
        "https://api.rcpos.co.za/api/table/categories"
      );
      setCategories(response.data);
    } catch (error) {
      console.log(error);
    }
  };
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

  const handleCategory = (id, name) => {
    localStorage.setItem("category", id);
    localStorage.setItem("category_name", name);
    navigate('/category');
    
  }
  useEffect(() => {
    fetchCategories();
    fetchItems();
  }, []);

  useEffect(() => {
    if (search.trim().length === 0) {
      fetchCategories();
    } else {
      const fetchCategories = categories.filter((item) =>
        item.name.toLowerCase().includes(search.toLowerCase())
      );
      setCategories(fetchCategories);
    }
  }, [search]);

  return (
    <>
      <section className="mt-12 h-screen px-3 ">
        <div className="container mx-auto py-2 px-2">
          <h1 className="text-2xl font-semibold mb-6">Search</h1>
          <label
            for="search"
            class="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white"
          ></label>

          <div class="relative">
            <div class="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
              <i className="las la-search text-xl text-fuchsia-600"></i>
            </div>
            <input
              type="search"
              id="search"
              class="pl-12 block w-full p-4 ps-10 text-sm text-gray-900 border border-gray-200 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="Search Food and Kitchen"
              required
              value={search}
              autoComplete="off"
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>

          <Tabs>
            <TabList className="w-full flex items-center justify-start gap-4 overflow-x-scroll whitespace-nowrap mb-6 mt-6">
              <Tab key="all-items">All Categories</Tab>
            </TabList>

            <TabPanel key="all-items">
              <div className="grid grid-cols-2 gap-2 pb-32">
                {categories.map((item) => (
                  <button onClick = {() => handleCategory(item.id, item.name)}
                    key={item.id}
                    className="relative p-5 rounded-lg h-36 w-full focus:outline-none"
                    style={{
                      background: `url(${item.image})`,
                        
                      backgroundPosition: "center",
                      backgroundSize: "cover",
                      backgroundColor: "rgba(0, 0, 0, 0.51)",
                      backgroundRepeat: "no-repeat",
                    }}
                  >
                    <div
                      className="absolute inset-0 bg-black opacity-25"
                      style={{ zIndex: 1 }}
                    ></div>
                    <div className="relative z-10">
                      <p className="text-white font-bold text-center text-xl">
                        {item.name}
                      </p>
                    </div>
                  </button>
                ))}
              </div>
            </TabPanel>

          </Tabs>
        </div>
      </section>
      <Footer />
    </>
  );
}
