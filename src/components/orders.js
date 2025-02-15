import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import foodPlaceholder from "../assets/img/food.png"

export default function Orders() {
  const navigate = useNavigate();
  const [order, setOrder] = useState(null);
  const [products, setProducts] = useState([]);

  // Fetch the latest order using the mobile number
  useEffect(() => {
    const fetchOrderData = async () => {
      try {
        const mobile = localStorage.getItem("phoneNumber") || "";
        const response = await axios.post(
          `https://api.rcpos.co.za/api/table/latest-order?mobile=${mobile}`
        );

        if (response.data && response.data.orders) {
          setOrder(response.data.orders);
          setProducts(response.data.orders.products || []);
        }
      } catch (error) {
        console.error("Error fetching order data:", error);
      }
    };

    fetchOrderData();
  }, []);

  const transformProductData = (currentFormat) => {
    return currentFormat.map((item) => {
      let parsedCharacters = {};
      try {
        parsedCharacters = item.characters ? JSON.parse(item.characters) : {};
      } catch (error) {
        console.error("Error parsing characters:", error);
      }
  
      return {
        productId: parseInt(item.product_id, 10),
        productName: item.product_name,
        quantity: parseInt(item.quantity, 10),
        addOns: item.addons ? item.addons.split(",").filter(Boolean) : [],
        characters: parsedCharacters,
        variation: item.varient_id || "",
      };
    });
  };

  const editAndNavigate = () => {
    localStorage.setItem("cartList", JSON.stringify(transformProductData(products)));
    localStorage.setItem("order", JSON.stringify(order));
    navigate("/cart");

  };

  if (!order) {
    return <div>Loading Order...</div>;
  }

  // Parse totals from the order
  const subTotal = parseFloat(order.subtotal_amount) || 0;
  const vat = parseFloat(order.total_vat) || 0;
  const totalAmount = parseFloat(order.total_amount) || 0;

  return (
    <section className="pt-3 bg-gray-50">
      <div className="container mx-auto py-2">
        {/* Header */}
        <div className="px-2 flex items-center border-b border-neutral-200 gap-2 pb-3">
          <div className="w-1/12">
            <Link to="/account">
              <i className="las la-arrow-left text-2xl"></i>
            </Link>
          </div>
          <div className="w-8/12">
            <h1 className="font-semibold text-lg text-black">
              Order No #{order.order_id}
            </h1>
            <p className="text-neutral-600 text-sm">
              {products.length} Items, R {totalAmount.toFixed(2)}
            </p>
          </div>
        </div>

        {/* Order Details */}
        <div className="bg-neutral-100 px-3 min-h-screen">
          <div className="py-4 flex justify-between items-center">
            <h3 className="text-sm uppercase text-neutral-600 font-semibold">
              Bill Details
            </h3>
            <button
              className="border border-fuchsia-700 rounded px-2"
              onClick={editAndNavigate}
            >
              <i className="las la-pencil-alt text-base"></i>
            </button>
          </div>

          <div className="bg-white rounded px-2 py-4">
            {products.map((item, index) => {
              let characteristics = {};
              try {
                characteristics = item.characters
                  ? JSON.parse(item.characters)
                  : {};
              } catch (err) {
                console.error("Error parsing characteristics:", err);
              }

              return (
                <div key={index} className="flex py-2 border-b border-gray-200">
                  <div className="w-1/6 pt-1">
                    <img
                      src={
                        item.product?.image
                          ? `https://api.rcpos.co.za/storage/${item.product.image}`
                          : foodPlaceholder
                      }
                      alt={item.product_name}
                      className="w-12 h-12 rounded"
                    />
                  </div>
                  <div className="w-7/12 pl-2">
                    <h2 className="text-black text-base">
                      {item.product_name} x <span>({item.quantity})</span>
                    </h2>
                    {/* Display characteristics */}
                    {Object.keys(characteristics).length > 0 && (
                      <div className="mt-1 text-sm text-gray-600">
                        {Object.entries(characteristics).map(
                          ([key, value]) => (
                            <p key={key}>
                              <strong>{key}:</strong> {value}
                            </p>
                          )
                        )}
                      </div>
                    )}
                    {/* Display add-ons if available */}
                    {item.addons && item.addons.trim() !== "" && (
                      <div className="mt-1 text-sm text-gray-600">
                        <p>
                          <strong>Add-ons:</strong> {item.addons}
                        </p>
                      </div>
                    )}
                  </div>
                  <div className="w-4/12 text-right">
                    <h2 className="text-black text-base">
                      R {parseFloat(item.product_price).toFixed(2)}
                    </h2>
                  </div>
                </div>
              );
            })}

            {/* Total Calculation */}
            <div className="border-t border-dashed border-neutral-300 mt-6">
              <div className="py-6">
                <div className="flex items-center py-1">
                  <div className="w-8/12">
                    <h2 className="text-base text-gray-600">Sub Total</h2>
                  </div>
                  <div className="w-4/12 text-right text-gray-600">
                    <p>R {subTotal.toFixed(2)}</p>
                  </div>
                </div>
                <div className="flex items-center py-1">
                  <div className="w-8/12">
                    <h2 className="text-base text-gray-600">VAT</h2>
                  </div>
                  <div className="w-4/12 text-right text-gray-600">
                    <p>R {vat.toFixed(2)}</p>
                  </div>
                </div>
                <div className="flex items-center py-1">
                  <div className="w-8/12">
                    <h2 className="text-base text-gray-600">Total Amount</h2>
                  </div>
                  <div className="w-4/12 text-right text-gray-600">
                    <p>R {totalAmount.toFixed(2)}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Previous Order Button */}
          <Link to="/order-history">
            <div className="mt-12 flex justify-center mx-auto">
              <button className="bg-fuchsia-700 text-white flex items-center gap-2 justify-center mx-auto border-neutral-600 rounded w-8/12 py-4">
                <i className="las la-file-alt text-white text-xl"></i>
                Previous Order
              </button>
            </div>
          </Link>
        </div>
      </div>
    </section>
  );
}
