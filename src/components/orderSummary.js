/*eslint-disable*/
import React, { useEffect, useState } from "react";
import Footer from "./footer/footer";
import "react-tabs/style/react-tabs.css";
import food from "../assets/img/food.png";
import check from "../assets/img/check.gif";
import breakfast from "../assets/img/breakfast.jpg";
import roti from "../assets/img/roti.jpg";
import { Accordion } from "flowbite-react";
import { Link } from "react-router-dom";
import axios from "axios";

export default function OrderSummary() {
  
  const orderDetails =
    JSON.parse(localStorage.getItem("order_details") || "[]") || [];
  const [addons, setAddons] = useState([]);
  const [products, setProducts] = useState([]);
  const accordionData = [
    {
      id: 1,
      title: "Dogwood Sandwich",
      imgSrc: breakfast, // Replace with your image source
      price: "R 73.04",
      qty: 1,
      description:
        "This classic sandwich is stacked with ham, turkey, bologna, and pepperon",
      characteristics: "Sweet, Warm",
      addons: [
        { name: "Hot Chocolate Icecream", quantity: 1, price: 10.0 },
        { name: "Tomato Ketchup", quantity: 2, price: 15.0 },
      ],
    },
    {
      id: 2,
      title: "Cheese Griller",
      imgSrc: roti, // Replace with your image source
      price: "R 22.61",
      qty: 2,
      description:
        "Its double trouble, at the same time it's a perfect pair ,2 Legendary Hake and Chips",
      characteristics: "Bitter, hot",
      addons: [
        { name: "French Fries", quantity: 1, price: 10.0 },
        { name: "Gulab Jamun", quantity: 2, price: 15.0 },
      ],
    },
  ];

  const fetchAddons = async () => {
    try {
      const response = await axios.get(
        "https://api.rcpos.co.za/api/addons"
      );
      setAddons(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  const fetchProducts = async () => {
    try {
      const response = await axios.get(
        "https://api.rcpos.co.za/api/products"
      );
      setProducts(response.data.products);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchAddons();
    fetchProducts();
  }, []);

  useEffect(() => {
    console.log(orderDetails)
  },[orderDetails]);

  return (
    <>
      <section className="pt-6 h-screen px-3 bg-gray-50">
        <div className="container mx-auto py-2 px-2">
          <div className="flex items-center border-b border-neutral-100  pb-4">
            <div className="w-2/12">
              <Link to="/cart">
                <i className="las la-arrow-left"></i>
              </Link>
            </div>
            <div className="w-8/12">
              <h1 className="text-center font-semibold text-lg text-black">
                Order Summary
              </h1>
            </div>
          </div>
          <div className="">
            <div className="flex mx-auto justify-center text-center">
              <img
                src={check}
                alt="Success"
                className="justify-center flex mx-auto w-24"
              />
            </div>
            <h2 className="text-center font-semibold  text-lg -mt-6">
              Thank You!
            </h2>
            <p className="text-center text-sm text-neutral-600">
              Your order successfully placed
            </p>
            <p className="text-center font-semibold text-2xl text-fuchsia-800 pt-4">
              Order No: {orderDetails.orderNumber}
            </p>
          </div>

          <div className="bg-fuchsia-100 rounded py-6 justify-center text-center my-6 mx-auto">
            <div className="justify-center flex mx-auto bg-fuchsia-200 p-2 rounded-full w-12">
              <img src={food} className="w-10 " alt="" />
            </div>

            <p className="text-center text-sm text-fuchsia-800 pt-2">
              We are preparing your order.
            </p>
          </div>

          <p className="pb-3 text-base font-semibold">Your Order List</p>
          {orderDetails.products.map((item, index) => (
              <div
                key={index}
                className="bg-white border border-neutral-100 rounded px-2 py-2"
              >
                <Accordion collapseAll className="border-none">
                  <Accordion.Panel className="borderaccordion">
                    <Accordion.Title className="borderaccordion">
                      <div className="flex gap-4 items-center">
                        {/* <div className="w-3/12">
                          <img
                            src={item.imgSrc}
                            alt=""
                            className="rounded w-24 h-12"
                          ></img>
                        </div> */}
                        <div className="w-10/12">
                          <h1 className="font-semibold  text-sm">
                            {products.filter((productItem) => productItem.id === item.productId).map((productItem) => productItem.name)}
                          </h1>
                          <p className="font-semibold text-fuchsia-700">
                          {products.filter((productItem) => productItem.id === item.productId).map((productItem) => productItem.price * item.quantity)}{" "}
                            <span className="text-neutral-500 text-xs font-normal">
                              Qty :{item.quantity}
                            </span>
                          </p>
                        </div>
                      </div>
                    </Accordion.Title>
                    <Accordion.Content className="accordionContent focus:outline-none">
                      <p className="text-neutral-600 text-sm">
                      {products.filter((productItem) => productItem.id === item.productId).map((productItem) => productItem.description)}
                      </p>
                      <h4 className="text-fuchsia-800 font-semibold text-sm py-1">
                        Addons (Extra addons for the items)
                      </h4>
                      {item.addOns.map((addon, index) => (
                        <div
                          key={index}
                          className="flex justify-between gap-4 text-neutral-600 text-sm"
                        >
                          <p className="text-neutral-600 text-sm">
                          {addons.filter((addonItem) => addonItem.id === addon).map((addonItem) => addonItem.name)} X {item.quantity}
                          </p>
                          <h2 className="">R {addons.filter((addonItem) => addonItem.id === addon).map((addonItem) => addonItem.price * item.quantity)}</h2>
                        </div>
                      ))}
                    </Accordion.Content>
                  </Accordion.Panel>
                </Accordion>
              </div>
            ))}

          <div className="bg-white border border-neutral-100 rounded px-2 py-4 mt-2">
            <div className="flex items-center gap-2 border-dashed border-b border-neutral-200 pb-2 mt-3">
              <div className="w-7/12">
                <h5 className=" text-neutral-600 font-semibold text-sm">
                  Items Total
                </h5>
              </div>
              <div className="w-5/12">
                <p className="text-black font-semibold text-right">R {parseFloat(orderDetails.subTotalAmount).toFixed(2)}</p>
              </div>
            </div>
            <div className="flex items-center gap-2 border-dashed border-b border-neutral-200 pb-2 mt-3">
              <div className="w-7/12">
                <h5 className=" text-neutral-600 font-semibold text-sm">VAT</h5>
              </div>
              <div className="w-5/12">
                <p className="text-black font-semibold text-right">R {(orderDetails.vatAmount).toFixed(2)}</p>
              </div>
            </div>
            <div className="flex items-center gap-2 border-dashed border-b border-neutral-200 pb-2 mt-3">
              <div className="w-7/12">
                <h5 className=" font-bold text-black text-sm">Total</h5>
              </div>
              <div className="w-5/12">
                <p className="text-black font-semibold text-right">R {(orderDetails.totalAmount).toFixed(2)}</p>
              </div>
            </div>
          </div>

          <div className="flex items-center justify-center mx-auot gap-3 mt-6">
            <Link
              to={`/${localStorage.getItem("table") || ""}`}
              className="w-6/12"
            >
              <button className="border-none focus:outline-none flex items-center w-full justify-center mx-auto  py-3 bgheader text-center text-white text-base font-semibold rounded">
                Go to Menu<i className="las la-arrow-right pl-2 text-lg"></i>
              </button>
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
