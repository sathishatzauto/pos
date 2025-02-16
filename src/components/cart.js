import "../App.css";
import "swiper/css";
import "swiper/css/pagination";
import veg from "../assets/img/veg.webp";
import { useEffect, useState } from "react";
import Footer from "./footer/footer.js";
import rcfav from "../assets/img/rcfav.png";
import dinein from "../assets/img/dinein.png";
import parcell from "../assets/img/parcell.png";
import axios from "axios";
import toast from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";

function Cart() {
  const [isExpanded, setIsExpanded] = useState(false);
  const [isExpanded1, setIsExpanded1] = useState(false);
  const [quantity, setQuantity] = useState(0);
  const [quantity1, setQuantity1] = useState(0);
  const [cartList, setCartList] = useState([]);
  const [addons, setAddons] = useState([]);
  const [products, setProducts] = useState([]);
  const [subTotal, setSubTotal] = useState(0);
  const [fullName, setFullName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [orderNote, setOrderNote] = useState("");
  const [orderType, setOrderType] = useState("Dine In");
  const [isPopuppVisible, setIsPopuppVisible] = useState(false);
  const [activeButton, setActiveButton] = useState(null);
  const navigate = useNavigate();

  //----cart additional quantity--------------
  const [isPopupVisible, setIsPopupVisible] = useState(false);
  const [isVariationPopupVisible, setIsVariationPopupVisible] = useState(false);
  const [isCharacteristicsPopupVisible, setIsCharacteristicsPopupVisible] =
    useState(false);
  const [selectedItemId, setSelectedItemId] = useState("");

  const [varients, setVarients] = useState([]);
  const [selectedVariation, setSelectedVariation] = useState("");
  const [characters, setCharacters] = useState([]);
  const [quantities, setQuantities] = useState(
    JSON.parse(localStorage.getItem("quantities") || "[]") || []
  );
  const [selectedAddons, setSelectedAddons] = useState([]);
  const [selectedCharacters, setSelectedCharacters] = useState([]);
  const [isAddonsPopupVisible, setAddonsPopupVisible] = useState(false);

  const incrementQuantity = (productId) => {
    console.log(cartList, "cartilo", selectedVariation);
    setCartList((prev) =>
      prev.map((item) =>
        item.productId === productId && selectedVariation === item.variation
          ? { ...item, quantity: item.quantity + 1 }
          : item
      )
    );
  };

  const decrementQuantity = (productId) => {
    setCartList((prev) =>
      prev.map((item) =>
        item.productId === productId && item.quantity > 1
          ? { ...item, quantity: item.quantity - 1 }
          : item
      )
    );
    const quantities=JSON.parse(localStorage.getItem("quantities") || "[]")
    const updatedQuantities = quantities.map((qtyItem) => {
      if (qtyItem.id === productId) {
        return { ...qtyItem, quantity: qtyItem.quantity - 1 };
      }
      return qtyItem;
    });
    console.log(updatedQuantities,"updatedQuantities")

    localStorage.setItem("quantities", JSON.stringify(updatedQuantities))
  };

  //-------------nwe one -------------
  const decrementQuantity1 = (productId) => {
    setSelectedItemId(productId);
    decrementQuantity(productId);
    // setQuantities((prev) => {
    //   const existingItem = prev.find((item) => item.id === productId);

    //   if (existingItem) {
    //     return prev.map((item) => {
    //       if (item.id === productId) {
    //         return {
    //           ...item,
    //           quantity: item.quantity - 1,
    //         };
    //       }
    //       return item;
    //     });
    //   }
    // });
    // setCartList((prev) => {
    //   // Find the index of the latest product with the matching productId
    //   const latestIndex = [...prev]
    //     .reverse()
    //     .findIndex((item) => item.productId === productId);

    //   // If no such product is found, return the cart as is
    //   if (latestIndex === -1) return prev;

    //   // Convert the reverse index to the actual index in the original array
    //   const actualIndex = prev.length - 1 - latestIndex;

    //   // Update the cart list
    //   return prev.reduce((acc, item, index) => {
    //     if (index === actualIndex) {
    //       // If quantity is greater than 1, decrement it
    //       if (item.quantity > 1) {
    //         acc.push({ ...item, quantity: item.quantity - 1 });
    //       }
    //       // Otherwise, exclude the item from the cart
    //     } else {
    //       acc.push(item);
    //     }
    //     return acc;
    //   }, []);
    // });
  };

  const incrementQuantity1 = (productId) => {
    setSelectedItemId(productId);
    setIsPopupVisible(true);
  };

  const [isPromoPopupVisible, setIsPromoPopupVisible] = useState(false);
  const handlePopupOpen = () => {
    setIsPromoPopupVisible(true);
  };
  const handlePopupClose = () => {
    setIsPromoPopupVisible(false);
  };
  const [saveDetailsPopup, setSaveDetailsPopup] = useState(false);
  const handleLoginPopupOpen = () => {
    if (cartList.length === 0) {
      toast.error("Your cart is empty!");
    } else {
      if(localStorage.getItem('fullName') && localStorage.getItem('phoneNumber'))
      {
        handleLogin(true)
      }
      else{
        setSaveDetailsPopup(true);
        
      }
      
    }
  };

  const handleLogin = async (alreadyLogin) => {
    debugger;
    if(!alreadyLogin)
    {
      
      if (fullName.trim().length === 0) {
        toast.error("Enter Full Name");
        
      } else if (phoneNumber.trim().length === 0) {
        toast.error("Enter Phone Number");
      }
      localStorage.setItem("fullName", fullName);
      localStorage.setItem("phoneNumber", phoneNumber);
    }
     else {
      if(!localStorage.getItem('order'))
      {
        const Name = localStorage.getItem("fullName") || fullName;
        const Number = localStorage.getItem("phoneNumber") || phoneNumber;
        
        
        console.log("State Name and phone",Name ,Number)
        console.log("local Name and phone",localStorage.getItem("fullName") ,localStorage.getItem("phoneNumber"))
        localStorage.setItem("fullName", Name)
        localStorage.setItem("phoneNumber", Number)
        let response = await axios.post(
          `https://api.rcpos.co.za/api/table/order`,
          {
            name: Name,
            mobile: Number,
            products: cartList,
            table_id: localStorage.getItem("table") || null,
            order_note: orderNote,
            order_type: orderType,
            sub_total: calculateSubtotal(),
            total_vat: calculateSubtotal() * 0.15,
            total_amount:
              parseFloat(calculateSubtotal()) +
              parseFloat(calculateSubtotal()) * 0.15,
          }
        );
        if (response.status === 200) {
          if (response.data.status) {
            toast.success(response.data.message);
            setSaveDetailsPopup(false);
            localStorage.setItem(
              "order_details",
              JSON.stringify(response.data.order_details)
            );
            localStorage.setItem("cartList", JSON.stringify([]));
            localStorage.setItem("quantities", JSON.stringify([]));
            navigate("/order");
          } else {
            toast.error(response.data.message);
          }
        }
      }
      else{
        const Name = localStorage.getItem("fullName") || fullName;
        const Number = localStorage.getItem("phoneNumber") || phoneNumber;
        
        console.log("Name and phone",Name,Number)
        localStorage.setItem("fullName", Name)
        localStorage.setItem("phoneNumber", Number)
        const order=JSON.parse(localStorage.getItem('order'))
        let response = await axios.post(
          `https://api.rcpos.co.za/api/table/order/${order.id}`,
          {
            name: Name,
            mobile: Number,
            products: cartList,
            table_id: localStorage.getItem("table") || null,
            order_note: orderNote,
            order_type: orderType,
            sub_total: calculateSubtotal(),
            total_vat: calculateSubtotal() * 0.15,
            total_amount:
              parseFloat(calculateSubtotal()) +
              parseFloat(calculateSubtotal()) * 0.15,
          }
        );
        if (response.status === 200) {
          if (response.data.status) {
            toast.success(response.data.message);
            setSaveDetailsPopup(false);
            localStorage.setItem(
              "order_details",
              JSON.stringify(response.data.order_details)
            );
            localStorage.setItem("cartList", JSON.stringify([]));
            localStorage.setItem("quantities", JSON.stringify([]));
            localStorage.setItem("order", JSON.stringify([]));
            navigate("/order");
          } else {
            toast.error(response.data.message);
          }
        }
      }
      
    }
  };

  const fetchAddons = async () => {
    try {
      const response = await axios.get("https://api.rcpos.co.za/api/addons");
      setAddons(response.data);
    } catch (error) {
      console.log(error);
    }
  };
  const fetchCharacters = async () => {
    try {
      const response = await axios.get(
        "https://api.rcpos.co.za/api/characters"
      );
      setCharacters(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  const fetchProducts = async () => {
    try {
      const response = await axios.get("https://api.rcpos.co.za/api/products");
      setProducts(response.data.products);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    setCartList(JSON.parse(localStorage.getItem("cartList") || "[]") || []);
    fetchAddons();
    fetchCharacters();
    fetchProducts();
  }, []);

  useEffect(() => {
    if (cartList.length > 0) {
      localStorage.setItem('cartList', JSON.stringify(cartList));
    }
  },[cartList])

  
  useEffect(() => {
    console.log("Name",fullName)
    console.log("Phone", phoneNumber)
  },[fullName,phoneNumber,cartList])

  const handleCookingPopupOpen = () => {
    setIsPopuppVisible(true);
  };
  const handleCookingPopupClose = () => {
    setIsPopuppVisible(false);
  };

  const calculateSubtotal = () => {
    let calculatedSubTotal = 0;

    cartList.forEach((item) => {
      // Find the product price and calculate total for product
      const product = products.find((product) => product.id === item.productId);
      if (product) {
        calculatedSubTotal += product.price * item.quantity;
      }

      // Add addon prices
      item.addOns.forEach((addonId) => {
        const addon = addons.find((addonItem) => addonItem.id === addonId);
        if (addon) {
          calculatedSubTotal += addon.price * item.quantity;
        }
      });
    });
    return parseFloat(calculatedSubTotal).toFixed(2);
  };

  //-------cart additonal ---------
  // useEffect(() => {
  //   fetchItems();
  //   fetchAddons();
  //   fetchCharacters();
  // }, []);
  const handleChooseClick = () => {
    const selectedProduct = products.find((item) => item.id === selectedItemId);
    console.log(selectedProduct, "vastru");
    if (selectedProduct.varients && selectedProduct?.varients?.length > 0) {
      setVarients(selectedProduct.varients);
      setIsVariationPopupVisible(true);
    } else {
      setIsCharacteristicsPopupVisible(true);
      setVarients([]);
      setSelectedVariation("");
    }
    setIsPopupVisible(false);
  };

  const handleSelectVariation = (id) => {
    setSelectedVariation(id);
    setIsVariationPopupVisible(false);
    setIsCharacteristicsPopupVisible(true);
    console.log(characters);
  };

  const handleSkip = () => {
    setIsCharacteristicsPopupVisible(false);
  };
  console.log(cartList, "cartilo");

  const repeatLatItem = (productId) => {
    setCartList((prev) =>
      prev.map((item) =>
        item.productId === productId
          ? { ...item, quantity: item.quantity + 1 }
          : item
      )
    );
    setIsPopupVisible(false);
  };

  const confirmIncrement = (productId) => {
    setIsPopupVisible(false);
    console.log(productId);
    console.log(
      cartList,
      "cartilo",
      selectedVariation,
      selectedAddons,
      selectedCharacters
    );
    // setQuantities((prev) => {
    //   const existingItem = prev.find((item) => item.id === productId);

    //   if (existingItem) {
    //     return prev.map((item) => {
    //       if (item.id === productId) {
    //         return {
    //           ...item,
    //           quantity: item.quantity + 1,
    //         };
    //       }
    //       return item;
    //     });
    //   } else {
    //     return [...prev, { id: productId, quantity: 1 }];
    //   }
    // });
    setCartList((prev) => {
      const existingProduct = prev.find(
        (item) =>
          item.productId === productId &&
          JSON.stringify(item.addOns) === JSON.stringify(selectedAddons) &&
          JSON.stringify(item.variation) === JSON.stringify(selectedVariation)
      );

      if (existingProduct) {
        return prev.map((item) => {
          if (
            item.productId === productId &&
            JSON.stringify(item.addOns) === JSON.stringify(selectedAddons) &&
            JSON.stringify(item.variation) === JSON.stringify(selectedVariation)
          ) {
            return {
              ...item,
              quantity: item.quantity + 1,
            };
          }
          return item;
        });
      } else {
        return [
          ...prev,
          {
            productId: productId,
            productName: products.filter((item) => item.id === productId)[0]
              .name,
            quantity: 1,
            addOns: selectedAddons,
            characters: selectedCharacters,
            variation: selectedVariation,
          },
        ];
      }
    });
    // incrementQuantity(productId);
    setSelectedCharacters({});
    setSelectedAddons([]);
  };

  const handleAddonChange = (addon) => {
    if (selectedAddons.includes(addon)) {
      setSelectedAddons(selectedAddons.filter((item) => item !== addon));
    } else {
      setSelectedAddons([...selectedAddons, addon]);
    }
  };
  const handleClick = (taste, character) => {
    setSelectedCharacters((prev) => ({
      ...prev,
      [character]: taste,
    }));
  };
  const closePopup = () => {
    setIsPopupVisible(false);
    setIsVariationPopupVisible(false);
    setIsCharacteristicsPopupVisible(false);
  };

  const handleSkipOrContinue = () => {
    setIsCharacteristicsPopupVisible(false);
    setAddonsPopupVisible(true);
  };

  const handleAdd = () => {
    // Handle adding selected add-ons logic here
    console.log("Selected Add-ons:", selectedAddons);
    // setCartList((prev) => [
    //   ...prev,
    //   {
    //     productId: selectedItemId,
    //     quantity: ,
    //     addOns: selectedAddons,
    //     characters: selectedCharacters,
    //     variation: selectedVariation,
    //   },
    // ]);
    setAddonsPopupVisible(false);
  };

  const handleSkipp = (productId) => {
    setIsPopupVisible(false);

    setQuantities((prev) => {
      const existingItem = prev.find((item) => item.id === productId);

      if (existingItem) {
        return prev.map((item) =>
          item.id === productId
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      } else {
        return [...prev, { id: productId, quantity: 1 }];
      }
    });

    setCartList((prev) => {
      const existingProduct = prev.find(
        (item) =>
          item.productId === productId &&
          JSON.stringify(item.variation) === JSON.stringify(selectedVariation)
      );

      if (existingProduct) {
        return prev.map((item) => {
          if (
            item.productId === productId &&
            JSON.stringify(item.variation) === JSON.stringify(selectedVariation)
          ) {
            return { ...item, quantity: item.quantity + 1 };
          }
          return item;
        });
      } else {
        return [
          ...prev,
          {
            productId: productId,
            productName: cartList.find((item) => item.id === productId)?.name,
            quantity: 1,
            addOns: [], // Skipping add-ons
            characters: selectedCharacters,
            variation: selectedVariation,
          },
        ];
      }
    });

    // Reset only selected characters
    setSelectedCharacters({});
  };

  const removeProductFromCart = (productId) => {
    // Get the existing cart from localStorage
    let cartList = JSON.parse(localStorage.getItem("cartList") || "[]");
  
    // Filter out the product with the given productId
    cartList = cartList.filter((item) => item.productId !== productId);
  
    // Update the cart in localStorage
    console.log("Card List",cartList)
    localStorage.setItem("cartList", JSON.stringify(cartList));
    const quantities=JSON.parse(localStorage.getItem("quantities") || "[]")
    const updatedQuantities = quantities.map((qtyItem) => {
      if (qtyItem.id === productId) {
        return { ...qtyItem, quantity: qtyItem.quantity - 1 };
      }
      return qtyItem;
    });
    console.log(updatedQuantities,"updatedQuantities")

    localStorage.setItem("quantities", JSON.stringify(updatedQuantities))
    setProducts(cartList)
    navigate('/')
    setTimeout(() => {
      navigate('/cart')
    }, 50);
    
  
  };
  
  
  return (
    <>
      <section className="bg-neutral-100 container mx-auto px-3 pb-32">
        <div className="sticky top-0 bg-neutral-50 border-b z-50 px-4  pt-4 pb-2">
          <div className="flex items-center gap-4 ">
            <Link to={`/${localStorage.getItem("table") || ""}`}>
              <i className="las la-times text-xl text-neutral-600"></i>
            </Link>
            <h1 className="text-center justify-center text-black text-xl  tracking wider font-semibold">
              Cart
            </h1>
          </div>
        </div>

        <div className="bg-white my-2 rounded-lg">
          <div className="px-2 py-6 bgthree rounded-lg">
            {cartList.length > 0 &&
              cartList.map((item) => (
                <div className="flex gap-2 py-2">
                  <div className="w-7/12 ">
                    <h1 className="text-sm flex items-center gap-2 font-semibold">
                      <img src={veg} alt="Veg" className="w-3 h-3"></img>
                      {item.productName}{" "}
                    </h1>

                    {item.addOns.length > 0 &&
                      item.addOns.map((addon) => (
                        <p className="pt-1 pl-5 text-neutral-600 text-xs transition-all duration-300">
                          {addons
                            .filter((addonItem) => addonItem.id === addon)
                            .map((addonItem) => addonItem.name)}
                          {""}
                        </p>
                      ))}
                  </div>
                  <div className="w-2/12 pl-3">
                    <div className="bg-white border border-neutral-200 flex items-center justify-center mx-auto rounded">
                      <div className="bg-white border border-neutral-200 flex items-center justify-center mx-auto rounded">
                        {/* Decrement Button */}
                        <button
                          // onClick={() => decrementQuantity1(item.productId)}
                          // onClick={() => decrementQuantity(item.productId)}
                          className="w-6 h-6 flex items-center justify-center text-lg font-bold bg-gray-200 rounded-l"
                          // disabled={item.quantity <= 1}
onClick={() => {
  if (item.quantity <= 1) {
    console.log("ProductId",item.productId)
    removeProductFromCart(item.productId);
  } else {
    decrementQuantity1(item.productId);
  }
}}                        >
                          -
                        </button>

                        {/* Quantity Input (Read-Only) */}
                        <input
                          type="text"
                          value={item.quantity}
                          readOnly
                          className="w-8 h-6 text-center border-none font-bold"
                        />

                        {/* Increment Button */}
                        <button
                          onClick={() => incrementQuantity1(item.productId)}
                          // onClick={() => incrementQuantity(item.productId)}
                          className="w-6 h-6 flex items-center justify-center text-lg font-bold bg-gray-200 rounded-r"
                        >
                          +
                        </button>
                      </div>
                    </div>
                  </div>
                  <div className="w-3/12">
                    <h6 className="text-right text-neutral-800 font-semibold">
                      R{" "}
                      {products
                        .filter((product) => product.id === item.productId)
                        .map((product) => product.price * item.quantity) ?? 0}
                    </h6>
                    {item.addOns.map((addon) => (
                      <h6 className="text-right text-neutral-600 font-semibold text-xs transition-all duration-300">
                        R{" "}
                        {addons
                          .filter((addonItem) => addonItem.id === addon)
                          .map((addonItem) => addonItem.price * item.quantity)}
                      </h6>
                    ))}
                  </div>
                </div>
              ))}

            <div className="mt-6 flex gap-4">
              <button
                className="border border-neutral-300 rounded-lg focus:outline-none py-3 w-6/12"
                onClick={handleCookingPopupOpen}
              >
                <i className="las la-pencil-alt"></i>{" "}
                <span className="text-neutral-700 text-sm font-semibold">
                  Cooking Request
                </span>
              </button>
              <button className="bg-fuchsia-700 rounded-lg focus:outline-none py-3 w-6/12">
                <Link to={`/${localStorage.getItem("table") || ""}`}>
                  <i className="las la-plus text-white "></i>{" "}
                  <span className="text-white text-sm font-semibold">
                    Add more items
                  </span>
                </Link>
              </button>
            </div>
          </div>
        </div>
        {isPopuppVisible && (
          <div className="fixed inset-0 bg-gray-700 px-2 bg-opacity-50 flex justify-center items-center z-50">
            <div className="bg-white rounded-lg w-12/12 ">
              <div className="p-5  sticky top-0 z-50  pb-2">
                <h1 className="text-fuchsia-800 text-base font-semibold pb-4">
                  Cooking Request
                </h1>
                <textarea
                  className="border border-neutral-300 rounded w-full"
                  value={orderNote}
                  onChange={(e) => setOrderNote(e.target.value)}
                ></textarea>
                <div className="flex flex-row gap-2 justify-end mt-6">
                  <button
                    className="bgheader text-white px-8 py-2 rounded"
                    onClick={handleCookingPopupClose}
                  >
                    Add
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
        {/* //------------------------cart add item modal ------------------------ */}
        {isPopupVisible && (
          <div className="px-2 fixed top-0 left-0 w-full h-full bg-slate-900 bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white p-6 rounded shadow-lg text-center">
              <h4 className="text-xl font-semibold">
                Repeat last used customizationsss?
              </h4>
              <p className="text-sm text-neutral-700">
                Choose your Variants, Characters and addons
              </p>
              <div className="mt-4 flex justify-center gap-4">
                <button
                  className="bgheader2 text-white px-4 py-2 rounded"
                  onClick={handleChooseClick}
                >
                  I'll Choose
                </button>
                <button
                  className="bgheader text-white px-4 py-2 rounded"
                  onClick={() => repeatLatItem(selectedItemId)}
                >
                  Repeat Last
                </button>
              </div>
            </div>
          </div>
        )}

        {isVariationPopupVisible && (
          <div className="fixed top-0 left-0 w-full h-full bg-slate-900 bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white p-6 rounded shadow-lg ">
              <h4 className="text-base font-semibold">Items Variations</h4>
              <p className="text-sm">
                Varients available for the selected Item.
              </p>
              <table className="table-auto w-full mt-4 border">
                <thead>
                  <tr className="bg-gray-100">
                    <th className="border px-4 py-2 text-sm">Item Name</th>
                    <th className="border px-4 py-2 text-sm">Price (in R)</th>
                    <th className="border px-4 py-2 text-sm">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {varients.map((variant) => (
                    <tr>
                      <td className="border px-4 py-2 text-sm">
                        {variant.size}
                      </td>
                      <td className="border px-4 py-2 text-sm">
                        {parseFloat(variant.price)}
                      </td>
                      <td className="border px-4 py-2">
                        <button
                          className="bgheader text-white px-4 py-2 rounded text-sm"
                          onClick={() => handleSelectVariation(variant.id)}
                        >
                          Select
                        </button>
                      </td>
                    </tr>
                  ))}
                  <tr>
                    <td className="border px-4 py-2 text-sm">Without Fries</td>
                    <td className="border px-4 py-2 text-sm">94.78</td>
                    <td className="border px-4 py-2">
                      <button
                        className="bgheader text-white px-4 py-2 rounded text-sm"
                        onClick={handleSelectVariation}
                      >
                        Select
                      </button>
                    </td>
                  </tr>
                </tbody>
              </table>
              <div className="flex justify-end ml-auto">
                <button
                  className="bgheader2 justify-end left-0 text-white px-6 py-2 mt-4 rounded text-sm"
                  onClick={closePopup}
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        )}

        {isCharacteristicsPopupVisible && (
          <div className="fixed top-0 px-2 left-0 w-full h-full bg-slate-900 bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white w-12/12 p-6 rounded shadow-lg">
              <h4 className="text-base font-semibold">Food Characteristics</h4>
              <div className="mt-4">
                {/* {characters[0].character} */}
                {characters.map((item) => (
                  <>
                    <h5 className="text-base font-semibold">
                      {item.character}
                    </h5>
                    <div className="flex justify-left gap-4 mt-2">
                      {item.properties.map((taste) => (
                        <button
                          key={taste}
                          className={`px-4 py-2 rounded text-sm ${selectedCharacters[item.character] === taste
                              ? "bg-blue-500 text-white"
                              : "bg-gray-100"
                            }`}
                          onClick={() => handleClick(taste, item.character)}
                        >
                          {taste}
                        </button>
                      ))}
                    </div>
                  </>
                ))}
              </div>
              <div className="mt-6 flex justify-end gap-2">
                <button
                  className="bgheader2 text-white px-6 py-2 rounded text-sm"
                  onClick={handleSkip}
                >
                  Skip
                </button>
                <button
                  className="bgheader text-white px-6 py-2 rounded text-sm"
                  onClick={handleSkipOrContinue}
                >
                  Continue
                </button>
              </div>
            </div>
          </div>
        )}

        {isAddonsPopupVisible && (
          <div className="fixed top-0 left-0 px-3  w-full h-full bg-slate-900 bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white w-12/12 p-6 rounded shadow-lg">
              <h4 className="text-base font-semibold">Add your Add-ons</h4>
              <p className="text-neutral-700 text-xs pt-1">
                Please add your extra addons for the item
              </p>
              <div className="mt-4">
                {addons.map((addon) => (
                  <div key={addon} className="flex items-center gap-2 mt-2">
                    <input
                      type="checkbox"
                      id={addon.id}
                      checked={selectedAddons.includes(addon.id)}
                      onChange={() => handleAddonChange(addon.id)}
                    />
                    <label htmlFor={addon.id} className="text-sm">
                      {addon.name}
                    </label>
                  </div>
                ))}
              </div>
              <div className="mt-6 flex justify-end gap-2">
                <button
                  className="bgheader2 text-white px-6 py-2 rounded text-sm"
                  onClick={() => {
                    handleAdd();
                    handleSkipp(selectedItemId);
                  }}
                >
                  Skip
                </button>
                <button
                  className="bgheader text-white px-6 py-2 rounded text-sm"
                  onClick={() => {
                    handleAdd();
                    confirmIncrement(selectedItemId);
                  }}
                >
                  Add
                </button>
              </div>
            </div>
          </div>
        )}

        {/* //------------------------cart add item modal ends here ------------------------ */}

        <div className="bg-white rounded-lg">
          <div
            className="bg-white rounded-lg mx-2 cursor-pointer"
            onClick={handlePopupOpen}
          >
            {/* <div className="p-3 flex justify-between items-center">
              <div className="flex gap-2 items-center">
                <img src={ticket} alt="" className="w-4" />
                <span className="text-black text-base font-semibold">
                  Add Promo Code
                </span>
              </div>
              <div>
                <i className="las la-angle-right text-xl font-bold"></i>
              </div>
            </div> */}
          </div>

          {/* Popup */}
          {isPromoPopupVisible && (
            <div className="fixed inset-0 bg-gray-700 px-2 bg-opacity-50 flex justify-center items-center z-50">
              <div className="bg-white rounded-lg w-12/12 ">
                <div className="p-5  sticky top-0 z-50  pb-2">
                  <div className="flex items-center gap-4 justify-between">
                    <h1 className="text-center justify-center text-black text-xl  tracking wider font-semibold">
                      Apply Coupon
                    </h1>
                    <button
                      className="text-gray-500 hover:text-black text-2xl"
                      onClick={handlePopupClose}
                    >
                      ×
                    </button>
                  </div>
                  <div className="bg-green-100 text-emerald-700 border border-green-300 tracking-wider text-xs p-2 rounded-lg mt-2">
                    <i className="las la-bolt "></i>
                    <b>R143 saved!</b> including Pocket Hero benefits
                  </div>
                  <div className="mt-4 flex border rounded-lg overflow-hidden w-full max-w-md">
                    <input
                      type="text"
                      placeholder="Enter promo code"
                      className="flex-grow p-2 focus:outline-none "
                    />
                    <button className="focus:outline-none  px-4 bg-gray-300 text-gray-500 font-semibold hover:bg-blue-500 hover:text-white transition-all">
                      Apply
                    </button>
                  </div>
                </div>

                <div
                  className=" overflow-y-scroll bg-gray-100 px-2 py-6 mt-4"
                  style={{ height: "500px" }}
                >
                  <h2 className="font-semibold text-lg">Applied Coupon</h2>
                  <div className="bg-white rounded-lg mt-6">
                    <div className="flex ">
                      <div className="w-1/12 bg-fuchsia-700 rounded-l-lg">
                        <div class="flex justify-center items-center py-6 ">
                          <p class="[writing-mode:vertical-lr] text-lg text-white font-bold">
                            20% OFF
                          </p>
                        </div>
                      </div>
                      <div className="p-2 w-10/12 ">
                        <div className="flex items-center justify-between">
                          <h1 className="font-bold text-base uppercase">
                            TryNew
                          </h1>
                          <button className="border-none focus:outline-none text-fuchsia-800 text-base font-bold">
                            Apply
                          </button>
                        </div>
                        <p className="text-green-600 text-sm font-semibold">
                          Save R 47 on this order!
                        </p>

                        <div className="mt-4 pt-3 border-dashed border-t-2 border-neutral-300">
                          <p className="text-neutral-600 text-sm">
                            Use code TRYNEW & get 20% off on orders above R250.
                            Maximum discount : R50
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="bg-white rounded-lg mt-6">
                    <div className="flex ">
                      <div className="w-1/12 bg-fuchsia-700 rounded-l-lg">
                        <div class="flex justify-center items-center py-6 ">
                          <p class="[writing-mode:vertical-lr] text-lg text-white font-bold">
                            20% OFF
                          </p>
                        </div>
                      </div>
                      <div className="p-2 w-10/12 ">
                        <div className="flex items-center justify-between">
                          <h1 className="font-bold text-base uppercase">
                            TryNew
                          </h1>
                          <button className="border-none focus:outline-none text-fuchsia-800 text-base font-bold">
                            Apply
                          </button>
                        </div>
                        <p className="text-green-600 text-sm font-semibold">
                          Save R 47 on this order!
                        </p>

                        <div className="mt-4 pt-3 border-dashed border-t-2 border-neutral-300">
                          <p className="text-neutral-600 text-sm">
                            Use code TRYNEW & get 20% off on orders above R250.
                            Maximum discount : R50
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="bg-white rounded-lg mt-6">
                    <div className="flex ">
                      <div className="w-1/12 bg-fuchsia-700 rounded-l-lg">
                        <div class="flex justify-center items-center py-6 ">
                          <p class="[writing-mode:vertical-lr] text-lg text-white font-bold">
                            20% OFF
                          </p>
                        </div>
                      </div>
                      <div className="p-2 w-10/12 ">
                        <div className="flex items-center justify-between">
                          <h1 className="font-bold text-base uppercase">
                            TryNew
                          </h1>
                          <button className="border-none focus:outline-none text-fuchsia-800 text-base font-bold">
                            Apply
                          </button>
                        </div>
                        <p className="text-green-600 text-sm font-semibold">
                          Save R 47 on this order!
                        </p>

                        <div className="mt-4 pt-3 border-dashed border-t-2 border-neutral-300">
                          <p className="text-neutral-600 text-sm">
                            Use code TRYNEW & get 20% off on orders above R250.
                            Maximum discount : R50
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        <div className="bg-white rounded-lg my-2">
          <div className="px-3 py-6">
            <div className="flex gap-2 text-black ">
              <p className="flex  bg-fuchsia-700 p-1 rounded h-8 w-8">
                <i className="flex mx-auto items-center text-white las la-file-alt"></i>
              </p>
              <div>
                <h1 className="text-lg font-semibold ">To Pay the Amount</h1>
                <h1 className="pt-1 text-neutral-600 text-xs transition-all duration-300">
                  Incl. all taxes & Charges
                </h1>
              </div>
            </div>

            <div className="border-dashed border-t-2  py-4 flex items-center gap-2 mt-4">
              <div className="w-8/12">
                <h1 className=" text-neutral-700 text-base">Sub Total</h1>
              </div>
              <div className="w-4/12">
                <p className="text-right text-neutral-800  font-semibold">
                  R {calculateSubtotal()}
                </p>
              </div>
            </div>

            <div className="py-1 flex items-center gap-2 ">
              <div className="w-8/12">
                <h1 className=" text-neutral-700 text-base">Item Discount</h1>
              </div>
              <div className="w-4/12">
                <p className="text-right text-green-600 font-semibold">
                  - R 0.00
                </p>
              </div>
            </div>
            <div className="py-1">
              <div className="flex items-center gap-2 mt-2">
                <div className="w-8/12">
                  <h1 className=" text-neutral-700 text-base">VAT</h1>
                </div>
                <div className="w-4/12">
                  <p className="text-right text-neutral-800 font-semibold">
                    R {(calculateSubtotal() * 0.15).toFixed(2)}
                  </p>
                </div>
              </div>
            </div>

            <div className="border-dashed border-t-2  mt-3">
              <div className="flex gap-2 pt-4">
                <div className="w-8/12">
                  <h4 className="text-black font-bold text-base">
                    To Pay{" "}
                    <span className="text-neutral-500 text-sm">(incl.VAT)</span>
                  </h4>
                </div>
                <div className="w-4/12">
                  <p className="text-right text-black tracking-wide font-semibold">
                    R{" "}
                    {(
                      parseFloat(calculateSubtotal()) +
                      parseFloat(calculateSubtotal()) * 0.15
                    ).toFixed(2)}
                  </p>
                </div>
              </div>
            </div>

            <div className="mt-6 flex gap-4">
              <button
                className={`flex gap-2 items-center justify-center border rounded-lg focus:outline-none py-3 w-6/12 ${orderType === "Take Away"
                  ? "bg-fuchsia-700 text-white"
                  : "border-fuchsia-700 text-neutral-700"
                  }`}
                onClick={() => setOrderType("Take Away")}
              >
                {/* <img src={parcell} alt="Delivery" className="w-5" /> */}
                <i class="las la-archive"></i>
                <span className="text-sm font-semibold">Take Away</span>
              </button>

              <button
                className={`flex gap-2 items-center justify-center border rounded-lg focus:outline-none py-3 w-6/12 ${orderType === "Dine In"
                  ? "bg-fuchsia-700 text-white"
                  : "border-fuchsia-700 text-neutral-700"
                  }`}
                onClick={() => setOrderType("Dine In")}
              >
                {/* <img src={dinein} alt="Delivery" className="w-8" /> */}
                <i class="las la-concierge-bell"></i>
                <span className="text-sm font-semibold">Dine-In</span>
              </button>
            </div>

            <button
              className="bg-fuchsia-600 mt-4 rounded-lg text-white text-base py-2 w-full focus:outline-none"
              onClick={handleLoginPopupOpen}
            >
              Save Order
            </button>
            {saveDetailsPopup && (
              <div className="fixed inset-0 bg-gray-700 px-2 bg-opacity-50 flex justify-center items-center z-50 ">
                <div className="bg-white rounded-lg  ">
                  <div className="bgthree mx-2 px-2 py-6 rounded">
                    {/* <div className="flex justify-center mx-auto">
                      <img
                        src={rcfav}
                        alt="Logo"
                        className="w-10 text-center justify-center "
                      ></img>
                    </div> */}

                    <p className="text-center text-neutral-500 text-base pt-2">
                      Please enter your details to order your food
                    </p>
                    <form className="mt-4">
                      <div className="">
                        <label className="returntext form-label text-sm font-semibold">
                          Full Name
                        </label>
                        <input
                          className="border rounded h-10 rounded w-full"
                          value={fullName}
                          onChange={(e) => setFullName(e.target.value)}
                        />
                      </div>
                      <div className="pt-4">
                        <label className="returntext form-label text-sm font-semibold">
                          Phone Number
                        </label>
                        <input
                          className="border rounded h-10 rounded w-full"
                          value={phoneNumber}
                          onChange={(e) => setPhoneNumber(e.target.value)}
                        />
                      </div>
                      <button
                        type="button"
                        onClick={handleLogin}
                        // onClick={handleLoginPopupClose}
                        className="mt-6 border-none focus:outline-none w-full bg-fuchsia-600 text-white text-center rounded py-2"
                      >
                        Save
                      </button>
                    </form>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </section>
      <Footer />
    </>
  );
}

export default Cart;
