import "./App.css";
import IndexNavbar from "./components/navbar/IndexNavbar.js";
import Search from "./components/search.js";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import { Pagination, Autoplay } from "swiper/modules";
import Subway from "./assets/img/subway.webp";
import anim from "./assets/img/anim.gif";
import food from "./assets/img/dine.png"
import Footer from "./components/footer/footer.js";
import veg from "./assets/img/veg.webp";
import { use, useEffect, useState } from "react";
import axios from "axios";
import { CartListState } from "./store/index.js";
import { Link, useNavigate, useParams } from "react-router-dom";

function App() {
  const { id } = useParams();
  const [categories, setCategories] = useState([]);
  const [expandedItems, setExpandedItems] = useState({});
  const [items, setItems] = useState([]);
  const [isExpanded1, setIsExpanded1] = useState(false);
  const [isExpanded2, setIsExpanded2] = useState(false);
  const [isExpanded3, setIsExpanded3] = useState(false);
  const [quantity, setQuantity] = useState(0);
  const [quantity1, setQuantity1] = useState(0);
  const [quantities, setQuantities] = useState(
    JSON.parse(localStorage.getItem("quantities") || "[]") || []
  );
  const [selectedCharacters, setSelectedCharacters] = useState([]);
  const [selectedItemId, setSelectedItemId] = useState("");
  const [addons, setAddons] = useState([]);
  const [isPopupVisible, setIsPopupVisible] = useState(false);
  const [isVariationPopupVisible, setIsVariationPopupVisible] = useState(false);
  const [isCharacteristicsPopupVisible, setIsCharacteristicsPopupVisible] =
    useState(false);
  const [isactive, setIsActive] = useState(null);
  const [active, setActive] = useState(null);
  const [isAddonsPopupVisible, setAddonsPopupVisible] = useState(false);
  const [selectedAddons, setSelectedAddons] = useState([]);
  const [varients, setVarients] = useState([]);
  const [selectedVariation, setSelectedVariation] = useState("");
  const [characters, setCharacters] = useState([]);
  const [cartList, setCartList] = useState(
    JSON.parse(localStorage.getItem("cartList") || "[]") || []
  );
  const [search, setSearch] = useState("");

  const navigate = useNavigate();

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
      setItems(response.data.products);
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
  useEffect(() => {
    fetchCategories();
    fetchItems();
    fetchCharacters();
    fetchAddons();
    if (localStorage.getItem("quantities")) {
      setQuantities(JSON.parse(localStorage.getItem("quantities")));
    }
    if (localStorage.getItem("cartList")) {
      setCartList(JSON.parse(localStorage.getItem("cartList")));
    }
  }, []);

  const toggleText = (itemId) => {
    setExpandedItems((prev) => ({
      ...prev,
      [itemId]: !prev[itemId],
    }));
  };

  const decrementQuantity1 = (productId) => {
    setSelectedItemId(productId);
    setQuantities((prev) => {
      const existingItem = prev.find((item) => item.id === productId);

      if (existingItem) {
        return prev.map((item) => {
          if (item.id === productId) {
            return {
              ...item,
              quantity: item.quantity - 1,
            };
          }
          return item;
        });
      }
    });
    setCartList((prev) => {
      // Find the index of the latest product with the matching productId
      const latestIndex = [...prev]
        .reverse()
        .findIndex((item) => item.productId === productId);

      // If no such product is found, return the cart as is
      if (latestIndex === -1) return prev;

      // Convert the reverse index to the actual index in the original array
      const actualIndex = prev.length - 1 - latestIndex;

      // Update the cart list
      return prev.reduce((acc, item, index) => {
        if (index === actualIndex) {
          // If quantity is greater than 1, decrement it
          if (item.quantity > 1) {
            acc.push({ ...item, quantity: item.quantity - 1 });
          }
          // Otherwise, exclude the item from the cart
        } else {
          acc.push(item);
        }
        return acc;
      }, []);
    });
  };

  const incrementQuantity1 = (productId) => {
    setSelectedItemId(productId);
    setIsPopupVisible(true);
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
            productName: items.find((item) => item.id === productId)?.name,
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



  const confirmIncrement = (productId) => {
    setIsPopupVisible(false);
    console.log(productId);
    setQuantities((prev) => {
      const existingItem = prev.find((item) => item.id === productId);

      if (existingItem) {
        return prev.map((item) => {
          if (item.id === productId) {
            return {
              ...item,
              quantity: item.quantity + 1,
            };
          }
          return item;
        });
      } else {
        return [...prev, { id: productId, quantity: 1 }];
      }
    });
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
            productName: items.filter((item) => item.id === productId)[0].name,
            quantity: 1,
            addOns: selectedAddons,
            characters: selectedCharacters,
            variation: selectedVariation,
          },
        ];
      }
    });
    setSelectedCharacters({});
    setSelectedAddons([]);
  };

  const closePopup = () => {
    setIsPopupVisible(false);
    setIsVariationPopupVisible(false);
    setIsCharacteristicsPopupVisible(false);
  };

  const handleChooseClick = () => {
    const selectedProduct = items.find((item) => item.id === selectedItemId);
    if (selectedProduct.varients.length > 0) {
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

  const handleSkipOrContinue = () => {
    setIsCharacteristicsPopupVisible(false);
    setAddonsPopupVisible(true);
  };

  const handleAddonChange = (addon) => {
    if (selectedAddons.includes(addon)) {
      setSelectedAddons(selectedAddons.filter((item) => item !== addon));
    } else {
      setSelectedAddons([...selectedAddons, addon]);
    }
  };

  const handleCancel = () => {
    setAddonsPopupVisible(false); // Close the popup
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
  const handleAddClick1 = (id) => {
    console.log(id);
    setSelectedItemId(id);
    if (
      !quantities.some((qtyItem) => qtyItem.id == id) ||
      quantities.find((qtyItem) => qtyItem.id == id).quantity === 0
    ) {
      setIsPopupVisible(false);
      const selectedProduct = items.find((item) => item.id === id);
      if (selectedProduct.varients.length > 0) {
        setVarients(selectedProduct.varients);
        setIsVariationPopupVisible(true);
      } else {
        setIsCharacteristicsPopupVisible(true);
        setVarients([]);
        setSelectedVariation("");
      }
    } else {
      setIsPopupVisible(true);
    }
  };

  const handleClick = (taste, character) => {
    setSelectedCharacters((prev) => ({
      ...prev,
      [character]: taste,
    }));
  };
  const handleClick1 = (temparature) => {
    setIsActive(temparature);
  };

  const handleCategory = (id, name) => {
    localStorage.setItem("category", id);
    localStorage.setItem("category_name", name);
    navigate("/category");
  };

  useEffect(() => {
    if (search.trim().length === 0) {
      fetchItems();
    } else {
      const fetchItems = items.filter((item) =>
        item.name.toLowerCase().includes(search.toLowerCase())
      );
      setItems(fetchItems);
    }
  }, [search]);

  useEffect(() => {
    console.log(cartList);
   
    localStorage.setItem("cartList", JSON.stringify(cartList));
  }, [cartList]);

  useEffect(() => {
    console.log(quantities);
    localStorage.setItem("quantities", JSON.stringify(quantities));
  }, [quantities]);

  // useEffect(() => {
   
  //   localStorage.clear("order_details")
  //   localStorage.clear("order")
  // }, []);

  useEffect(() => {
    if (id) {
      localStorage.setItem("table", id);
    }
  }, [id]);

  return (
    <>
      <IndexNavbar />
      <section className="container mx-auto pb-32">
        <Search setSearch={setSearch} search={search} />
        <div className=" bgheader rounded-b-3xl ">
          <div className="">
            <Swiper
              slidesPerView={4}
              spaceBetween={0}
              loop={true}
              autoplay={{
                delay: 4500,
                disableOnInteraction: false,
              }}
              modules={[Autoplay]}
              className="mySwiper"
            >
              {categories.map((category) => (
                <SwiperSlide
                  onClick={() => handleCategory(category.id, category.name)}
                >
                  <div className="flex justify-center">
                    <div className="">
                      <img
                        src={category.image}
                        alt=""
                        className="border-2 rounded-full w-20 h-20"
                      />
                      <p className="text-sm text-white text-center pt-2 font-semibold">
                        {category.name}
                      </p>
                    </div>
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>
          </div>

          <div className="mt-8">
            <Swiper
              slidesPerView={4}
              spaceBetween={0}
              loop={true}
              dir="rtl"
              autoplay={{
                delay: 4500,
                disableOnInteraction: false,
              }}
              modules={[Autoplay]}
              className="mySwiper"
            >
              {categories.map((category) => (
                <SwiperSlide
                  onClick={() => handleCategory(category.id, category.name)}
                >
                  <div className="flex justify-center">
                    <div className=" overflow-visible">
                    <img
  src={category.image}
  alt=""
  title={category.image ? "" : "food"} // Shows full text on hover if image fails
  className="border-2 rounded-full w-20 h-20"
/>

                      <p className="text-sm text-white text-center pt-2 font-semibold">
                        {category.name}
                      </p>
                    </div>
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>

            <Link to="/search">
              <button className="mt-8 border border-white focus:outline-none justify-center flex mx-auto px-4 py-2 rounded">
                <p className="text-white text-xs uppercase font-semibold">
                  View More <i className="las la-arrow-rightext-white"></i>
                </p>
              </button>
            </Link>
          </div>
          <div className="bg-fuchsia-600 text-center mt-6 py-2 rounded-b-3xl mt-8">
            <div className="flex items-center gap-2  mx-auto justify-center">
              <p className="bg-white rounded-full ">
                <img
                  src={anim}
                  className="flex justify-center items-center mx-auto w-8 h-8"
                  alt="RCPOS"
                />
              </p>
              <p className="uppercase text-sm text-white font-semibold">
                <span className="font-bold pr-2">Dine-In</span>| 20% Off All
                Premium Pizzas
              </p>
            </div>
          </div>
        </div>

        <div className="px-4 mt-6 mb-6">
          <div className="pb-2 flex items-center justify-between">
            <h1 className="uppercase text-base font-bold tracking-wider ">
              Recommended for you
            </h1>

            <Link to="/search">
              <p className="text-right text-fuchsia-600 text-xs underline font-semibold">
                View More{" "}
                <i className="las la-arrow-right text-fuchsia-600"></i>
              </p>
            </Link>
          </div>
        </div>

        <div className=" px-4">
          {items.slice(0, 10).map((item) => (
            <div
              key={item.id}
              className="flex gap-2 border-b border-gray-200 pb-6 mb-4"
            >
              <div className="w-7/12">
                <h3 className="flex items-center gap-2">
                  <img src={veg} alt="Veg" className="w-3 h-3"></img>
                  <p className="text-fuchsia-700 text-xs font-semibold">
                    Best Seller
                  </p>
                </h3>
                <h1 className="text-lg font-semibold mt-1">{item.name}</h1>
                <div className="flex gap-2 items-center">
                  <p className="text-lg font-semibold">R {item.price}</p>
                  {/* <p className='flex gap-1 items-center'>
                  <img src={tag} alt='Tags' className='w-3 h-3'></img><span className='uppercase text-neutral-500 text-xs'>R125 Off use Flat..</span>
                </p> */}
                </div>
                {/* <div className='w-auto pt-1 font-semibold text-green-700 gap-2 text-sm'>
                <i className='las la-star text-green-700 pr-1'></i>4.5 <span className='text-sm text-neutral-500'>(8672)</span>
              </div> */}
                {/* <button className='mt-2 border-none focus:outline-none bg-fuchsia-50 w-fit rounded-full p-2 text-xs text-neutral-600'>
                <i className='las la-bookmark'></i> Save to Eatlist
              </button> */}

                <p className="text-neutral-600 text-sm transition-all duration-300">
                  {!expandedItems[item.id] ? (
                    <>
                      {item.description.slice(0, 50)} ...
                      <span
                        className="text-black cursor-pointer text-xs font-bold"
                        onClick={() => toggleText(item.id)}
                      >
                        more
                      </span>
                    </>
                  ) : (
                    <>
                      <span className="block ">{item.description}</span>
                      <span
                        className="text-black cursor-pointer text-xs font-bold block mt-2"
                        onClick={() => toggleText(item.id)}
                      >
                        less
                      </span>
                    </>
                  )}
                </p>
              </div>
              <div className="w-5/12">
              <img
  src={`https://admin.rcpos.co.za/uploads/${item.image}`}
  alt=""
  className="rounded-full w-32 h-32 flex mx-auto justify-center items-center"
  onError={(e) => (e.target.src = food)}
/>

                {!quantities.some((qtyItem) => qtyItem.id == item.id) ||
                  quantities.find((qtyItem) => qtyItem.id == item.id).quantity ===
                  0 ? (
                  <button
                    className="focus:outline-none text-base font-bold -mt-8 py-2 w-7/12 flex mx-auto relative rounded-lg text-center font-semibold justify-center bg-white border border-neutral-300 uppercase text-green-600"
                    onClick={() => handleAddClick1(item.id)}
                  >
                    Add
                  </button>
                ) : (
                  <div className="w-7/12 bg-white flex items-center justify-center mx-auto -mt-6">
                    <button
                      className="focus:outline-none bg-white text-green-600 border border-neutral-300 w-8 h-8 flex justify-center items-center rounded-l-md"
                      onClick={() => decrementQuantity1(item.id)}
                    >
                      <i className="las la-minus"></i>
                    </button>
                    <input
                      type="text"
                      value={
                        quantities.find((qtyItem) => qtyItem.id === item.id)
                          .quantity
                      }
                      readOnly
                      className="w-10 h-8 text-center border border-neutral-300"
                    />
                    <button
                      className="focus:outline-none bg-white text-green-600 border border-neutral-300 w-8 h-8 flex justify-center items-center rounded-r-md"
                      onClick={() => incrementQuantity1(item.id)}
                    >
                      <i className="las la-plus"></i>
                    </button>
                  </div>
                )}
              </div>
            </div>
          ))}

          {isPopupVisible && (
            <div className="px-2 fixed top-0 left-0 w-full h-full bg-slate-900 bg-opacity-50 flex items-center justify-center z-50">
              <div className="bg-white p-6 rounded shadow-lg text-center">
                <h4 className="text-xl font-semibold">
                  Repeat last used customization?
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
                    onClick={() => confirmIncrement(selectedItemId)}
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
                      <td className="border px-4 py-2 text-sm">
                        Without Fries
                      </td>
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
                <h4 className="text-base font-semibold">
                  Food Characteristics
                </h4>
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
        </div>
      </section>
      <Footer />
    </>
  );
}

export default App;
