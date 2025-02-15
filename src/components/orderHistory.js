/*eslint-disable*/
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";

export default function OrderHistory() {
  const [orderHistoryData, setOrderHistoryData] = useState([]);

  useEffect(() => {
    const fetchOrderHistory = async () => {
      try {
        const phoneNumber = localStorage.getItem("phoneNumber") || "";
        const response = await axios.post(
          `https://api.rcpos.co.za/api/table/previous-orders?mobile=${phoneNumber}`
        );

        if (response.data.status) {
          setOrderHistoryData(response.data.orders);
        } else {
          toast.error(response.data.message);
        }
      } catch (error) {
        console.error("Error fetching order history:", error);
        toast.error("Failed to fetch order history.");
      }
    };

    fetchOrderHistory();
  }, []);

  return (
    <section className="pt-3 bg-gray-50">
      <div className="container mx-auto py-2">
        {/* Header */}
        <div className="px-2 flex items-center border-b border-neutral-200 pb-3">
          <div className="w-2/12">
            <Link to="/orders">
              <i className="las la-arrow-left text-3xl"></i>
            </Link>
          </div>
          <div className="w-8/12">
            <h1 className="font-semibold text-lg text-black">Order History</h1>
          </div>
        </div>

        {/* Order List */}
        <div className="bg-white px-3 min-h-screen">
          {orderHistoryData.length === 0 ? (
            <p className="text-center text-gray-500 mt-6">No previous orders found.</p>
          ) : (
            orderHistoryData.map((order, index) => (
              <div key={index} className="border-b border-gray-300 py-4">
                {/* Order Header */}
                <div className="flex justify-between items-center">
                  <div>
                    <h2 className="text-black text-lg">Order #{order.order_id}</h2>
                    <p className="text-gray-600 text-sm">
                      {order.dine_type} - Table {order.table_id || "N/A"}
                    </p>
                    <p className="text-gray-500 text-xs">{order.order_date}</p>
                  </div>
                  <div className="text-right">
                    <h2 className="text-black text-base font-semibold">
                      R {parseFloat(order.total_amount).toFixed(2)}
                    </h2>
                    <span
                      className={`px-2 py-1 text-xs font-semibold rounded ${
                        order.status === "Active"
                          ? "bg-green-200 text-green-700"
                          : "bg-gray-200 text-gray-700"
                      }`}
                    >
                      {order.status}
                    </span>
                  </div>
                </div>

                {/* Order Details */}
                <div className="mt-3">
                  <p className="text-gray-600 text-sm">
                    Subtotal: R {parseFloat(order.subtotal_amount).toFixed(2)}
                  </p>
                  <p className="text-gray-600 text-sm">
                    VAT: R {parseFloat(order.total_vat).toFixed(2)}
                  </p>
                  <p className="text-gray-600 text-sm">
                    Discount: R {parseFloat(order.discount_amount).toFixed(2)}
                  </p>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </section>
  );
}
