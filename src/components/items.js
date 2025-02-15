
import '../App.css';
import IndexNavbar from '../components/navbar/IndexNavbar.js';
import 'swiper/css';
import 'swiper/css/pagination';
import breakfast from '../assets/img/breakfast.jpg';
import tag from '../assets/img/tag.png';
import veg from '../assets/img/veg.webp';
import { useState } from 'react';
import Footer from './footer/footer.js';
import roti from '../assets/img/roti.jpg';
import paneer from '../assets/img/paneer.jpg';
import spring from '../assets/img/spring.jpg';
import Subway from '../assets/img/subway.webp';

function Items() {

    const [isExpanded, setIsExpanded] = useState(false);
    const [isExpanded1, setIsExpanded1] = useState(false);
    const [quantity, setQuantity] = useState(0);
    const [quantity1, setQuantity1] = useState(0);

    const toggleText = () => {
        setIsExpanded(!isExpanded);
    };

    const toggleText1 = () => {
        setIsExpanded1(!isExpanded1);
    };

    const handleAddClick = () => {
        setQuantity(1); // Set initial quantity to 1
    };
    const incrementQuantity = () => {
        setQuantity((prev) => prev + 1);
    };
    const decrementQuantity = () => {
        setQuantity((prev) => Math.max(prev - 1, 0)); // Prevent negative quantity
    };


    const handleAddClick1 = () => {
        setQuantity1(1); // Set initial quantity to 1
    };
    const incrementQuantity1 = () => {
        setQuantity1((prev) => prev + 1);
    };
    const decrementQuantity1 = () => {
        setQuantity1((prev) => Math.max(prev - 1, 0)); // Prevent negative quantity
    };


    return (
        <>
            <IndexNavbar />
            <section className="mt-24 container mx-auto px-2 ">
                <div className=''>
                    <h1 className='text-black text-base uppercase tracking wider'>
                        Recommended (20)
                    </h1>
                </div>

                <div className='mt-6'>
                    <div className='flex gap-2 border-b border-gray-100 pb-6 mb-4'>
                        <div className='w-7/12'>
                            <h3 className='flex items-center gap-2'>
                                <img src={veg} alt='Veg' className='w-3 h-3'></img>
                                <p className='text-fuchsia-700 text-xs font-semibold'>
                                    Best Seller
                                </p>
                            </h3>
                            <h1 className='text-lg font-semibold mt-1'>
                                Mini Tiffin
                            </h1>
                            <div className='flex gap-2 pt-1 items-center'>
                                <p className='text-sm font-semibold'>
                                    R 180
                                </p>
                                <p className='flex gap-1 items-center'>
                                    <img src={tag} alt='Tags' className='w-3 h-3'></img><span className='uppercase text-neutral-500 text-xs'>R125 Off use Flat..</span>
                                </p>
                            </div>
                            <div className='w-auto pt-1 font-semibold text-green-700 gap-2 text-sm'>
                                <i className='las la-star text-green-700 pr-1'></i>4.5 <span className='text-sm text-neutral-500'>(8672)</span>
                            </div>
                            <button className='mt-2 border-none focus:outline-none bg-fuchsia-50 w-fit rounded-full p-2 text-xs text-neutral-600'>
                                <i className='las la-bookmark'></i> Save to Eatlist
                            </button>

                            <p className='pt-1 text-neutral-600 text-sm transition-all duration-300'>
                                A Delicious traditional platters of fluffy idliys and vada,... <span>
                                    {!isExpanded1 && (
                                        <span
                                            className="text-black cursor-pointer text-xs font-bold"
                                            onClick={toggleText1}>
                                            more
                                        </span>
                                    )}
                                </span>
                            </p>
                            <p className='text-neutral-600 text-sm transition-all duration-300'
                                style={{
                                    maxHeight: isExpanded1 ? 'none' : `0`,
                                    overflow: isExpanded1 ? 'visible' : 'hidden',
                                }}
                                onClick={toggleText1}>
                                A Delicious traditional platters of fluffy idliys and vada,...
                            </p>

                        </div>
                        <div className='w-5/12 '>
                            <img src={breakfast} alt='Breakfast' className='rounded-xl w-full h-36 h-36' />
                            {quantity1 === 0 ? (
                                <button
                                    className="focus:outline-none text-lg font-bold -mt-6 py-2 w-9/12 flex mx-auto z-50 relative rounded-lg text-center font-semibold justify-center bg-white border border-neutral-300 uppercase text-green-600"
                                    onClick={handleAddClick1}
                                >
                                    Add
                                </button>
                            ) : (
                                <div className="w-9/12 bg-white flex items-center justify-center mx-auto -mt-6">
                                    <button
                                        className="focus:outline-none  bg-white text-green-600 border border-neutral-300 w-10 h-10 flex justify-center items-center rounded-l-md"
                                        onClick={decrementQuantity1}
                                    >
                                        <i className='las la-minus '></i>
                                    </button>
                                    <input
                                        type="text"
                                        value={quantity1}
                                        readOnly
                                        className="w-10 h-10 text-center border border-neutral-300"

                                    />
                                    <button
                                        className="focus:outline-none bg-white text-green-600 border border-neutral-300 w-10 h-10 flex justify-center items-center rounded-r-md"
                                        onClick={incrementQuantity1}
                                    >
                                        <i className='las la-plus'></i>
                                    </button>
                                </div>
                            )}
                        </div>
                    </div>

                    <div className='flex gap-2 border-b border-gray-100 pb-6 mb-4'>
                        <div className='w-7/12'>
                            <h3 className='flex items-center gap-2'>
                                <img src={veg} alt='Veg' className='w-3 h-3'></img>
                                <p className='text-fuchsia-700 text-xs font-semibold'>
                                    Best Seller
                                </p>
                            </h3>
                            <h1 className='text-lg font-semibold mt-1'>
                                Mini Tiffin
                            </h1>
                            <div className='flex gap-2 pt-1 items-center'>
                                <p className='text-sm font-semibold'>
                                    R 180
                                </p>
                                <p className='flex gap-1 items-center'>
                                    <img src={tag} alt='Tags' className='w-3 h-3'></img><span className='uppercase text-neutral-500 text-xs'>R125 Off use Flat..</span>
                                </p>
                            </div>
                            <div className='w-auto pt-1 font-semibold text-green-700 gap-2 text-sm'>
                                <i className='las la-star text-green-700 pr-1'></i>4.5 <span className='text-sm text-neutral-500'>(8672)</span>
                            </div>
                            <button className='mt-2 border-none focus:outline-none bg-fuchsia-50 w-fit rounded-full p-2 text-xs text-neutral-600'>
                                <i className='las la-bookmark'></i> Save to Eatlist
                            </button>

                            <p className='pt-1 text-neutral-600 text-sm transition-all duration-300'>
                                A Delicious traditional platters of fluffy idliys and vada,... <span>
                                    {!isExpanded && (
                                        <span
                                            className="text-black cursor-pointer text-xs font-bold"
                                            onClick={toggleText}
                                        >
                                            more
                                        </span>
                                    )}
                                </span>
                            </p>
                            <p className='text-neutral-600 text-sm transition-all duration-300'
                                style={{
                                    maxHeight: isExpanded ? 'none' : `0`,
                                    overflow: isExpanded ? 'visible' : 'hidden',
                                }}
                                onClick={toggleText}>
                                A Delicious traditional platters of fluffy idliys and vada,...
                            </p>

                        </div>
                        <div className='w-5/12 '>
                            <img src={roti} alt='Breakfast' className='rounded-xl w-full h-36 ' />
                            <button className='focus:outline-none text-lg font-bold -mt-6 py-2 w-9/12 flex mx-auto  z-50 relative rounded-lg text-center font-semibold justify-center bg-white border border-neutral-300 uppercase text-green-600'>
                                Add
                            </button>
                        </div>
                    </div>


                    <div className="flex gap-2 border-b border-gray-100 pb-6 mb-4">
                        <div className="w-7/12">
                            <h3 className="flex items-center gap-2">
                                <img src={veg} alt="Veg" className="w-3 h-3" />
                                <p className="text-fuchsia-700 text-xs font-semibold">Best Seller</p>
                            </h3>
                            <h1 className="text-lg font-semibold mt-1">Mini Tiffin</h1>
                            <div className="flex gap-2 pt-1 items-center">
                                <p className="text-sm font-semibold">R 180</p>
                                <p className="flex gap-1 items-center">
                                    <img src={tag} alt="Tags" className="w-3 h-3" />
                                    <span className="uppercase text-neutral-500 text-xs">
                                        R125 Off use Flat..
                                    </span>
                                </p>
                            </div>
                            <div className="w-auto pt-1 font-semibold text-green-700 gap-2 text-sm">
                                <i className="las la-star text-green-700 pr-1"></i>4.5{' '}
                                <span className="text-sm text-neutral-500">(8672)</span>
                            </div>
                            <button className="mt-2 border-none focus:outline-none bg-fuchsia-50 w-fit rounded-full p-2 text-xs text-neutral-600">
                                <i className="las la-bookmark"></i> Save to Eatlist
                            </button>

                            <p className="pt-1 text-neutral-600 text-sm transition-all duration-300">
                                A Delicious traditional platters of fluffy idliys and vada,...{' '}
                                {!isExpanded && (
                                    <span
                                        className="text-black cursor-pointer text-xs font-bold"
                                        onClick={toggleText}
                                    >
                                        more
                                    </span>
                                )}
                            </p>
                            {isExpanded && (
                                <p className="text-neutral-600 text-sm transition-all duration-300">
                                    A Delicious traditional platters of fluffy idliys and vada, sambhar,
                                    and chutney, perfect for a light and fulfilling breakfast or snack.
                                </p>
                            )}
                        </div>
                        <div className="w-5/12">
                            <img
                                src={spring}
                                alt="Breakfast"
                                className="rounded-xl w-full h-36"
                            />
                            {quantity === 0 ? (
                                <button
                                    className="focus:outline-none text-lg font-bold -mt-6 py-2 w-9/12 flex mx-auto z-50 relative rounded-lg text-center font-semibold justify-center bg-white border border-neutral-300 uppercase text-green-600"
                                    onClick={handleAddClick}
                                >
                                    Add
                                </button>
                            ) : (
                                <div className="w-9/12 bg-white flex items-center justify-center mx-auto -mt-6">
                                    <button
                                        className="focus:outline-none  bg-white text-green-600 border border-neutral-300 w-10 h-10 flex justify-center items-center rounded-l-md"
                                        onClick={decrementQuantity}
                                    >
                                        <i className='las la-minus '></i>
                                    </button>
                                    <input
                                        type="text"
                                        value={quantity}
                                        readOnly
                                        className="w-10 h-10 text-center border border-neutral-300"

                                    />
                                    <button
                                        className="focus:outline-none bg-white text-green-600 border border-neutral-300 w-10 h-10 flex justify-center items-center rounded-r-md"
                                        onClick={incrementQuantity}
                                    >
                                        <i className='las la-plus'></i>
                                    </button>
                                </div>
                            )}
                        </div>
                    </div>


                    <div className='flex gap-2 border-b border-gray-100 pb-6 mb-4'>
                        <div className='w-7/12'>
                            <h3 className='flex items-center gap-2'>
                                <img src={veg} alt='Veg' className='w-3 h-3'></img>
                                <p className='text-fuchsia-700 text-xs font-semibold'>
                                    Best Seller
                                </p>
                            </h3>
                            <h1 className='text-lg font-semibold mt-1'>
                                Poori [2Nos]
                            </h1>
                            <div className='flex gap-2 pt-1 items-center'>
                                <p className='text-sm font-semibold'>
                                    R 180
                                </p>
                                <p className='flex gap-1 items-center'>
                                    <img src={tag} alt='Tags' className='w-3 h-3'></img><span className='uppercase text-neutral-500 text-xs'>R125 Off use Flat..</span>
                                </p>
                            </div>
                            <div className='w-auto pt-1 font-semibold text-green-700 gap-2 text-sm'>
                                <i className='las la-star text-green-700 pr-1'></i>4.5 <span className='text-sm text-neutral-500'>(8672)</span>
                            </div>
                            <button className='mt-2 border-none focus:outline-none bg-fuchsia-50 w-fit rounded-full p-2 text-xs text-neutral-600'>
                                <i className='las la-bookmark'></i> Save to Eatlist
                            </button>

                            <p className='pt-1 text-neutral-600 text-sm transition-all duration-300'>
                                A Delicious traditional platters of fluffy idliys and vada,... <span>
                                    {!isExpanded && (
                                        <span
                                            className="text-black cursor-pointer text-xs font-bold"
                                            onClick={toggleText}
                                        >
                                            more
                                        </span>
                                    )}
                                </span>
                            </p>
                            <p className='text-neutral-600 text-sm transition-all duration-300'
                                style={{
                                    maxHeight: isExpanded ? 'none' : `0`,
                                    overflow: isExpanded ? 'visible' : 'hidden',
                                }}
                                onClick={toggleText}>
                                A Delicious traditional platters of fluffy idliys and vada,...
                            </p>

                        </div>
                        <div className='w-5/12 '>
                            <img src={breakfast} alt='Breakfast' className='rounded-xl w-full h-36' />
                            <button className='focus:outline-none text-lg font-bold -mt-6 py-2 w-9/12 flex mx-auto  z-50 relative rounded-lg text-center font-semibold justify-center bg-white border border-neutral-300 uppercase text-green-600'>
                                Add
                            </button>
                        </div>
                    </div>


                    <div className='flex gap-2 border-b border-gray-100 pb-6 mb-4'>
                        <div className='w-7/12'>
                            <h3 className='flex items-center gap-2'>
                                <img src={veg} alt='Veg' className='w-3 h-3'></img>
                                <p className='text-fuchsia-700 text-xs font-semibold'>
                                    Best Seller
                                </p>
                            </h3>
                            <h1 className='text-lg font-semibold mt-1'>
                                Mini Tiffin
                            </h1>
                            <div className='flex gap-2 pt-1 items-center'>
                                <p className='text-sm font-semibold'>
                                    R 180
                                </p>
                                <p className='flex gap-1 items-center'>
                                    <img src={tag} alt='Tags' className='w-3 h-3'></img><span className='uppercase text-neutral-500 text-xs'>R125 Off use Flat..</span>
                                </p>
                            </div>
                            <div className='w-auto pt-1 font-semibold text-green-700 gap-2 text-sm'>
                                <i className='las la-star text-green-700 pr-1'></i>4.5 <span className='text-sm text-neutral-500'>(8672)</span>
                            </div>
                            <button className='mt-2 border-none focus:outline-none bg-fuchsia-50 w-fit rounded-full p-2 text-xs text-neutral-600'>
                                <i className='las la-bookmark'></i> Save to Eatlist
                            </button>

                            <p className='pt-1 text-neutral-600 text-sm transition-all duration-300'>
                                A Delicious traditional platters of fluffy idliys and vada,... <span>
                                    {!isExpanded && (
                                        <span
                                            className="text-black cursor-pointer text-xs font-bold"
                                            onClick={toggleText}
                                        >
                                            more
                                        </span>
                                    )}
                                </span>
                            </p>
                            <p className='text-neutral-600 text-sm transition-all duration-300'
                                style={{
                                    maxHeight: isExpanded ? 'none' : `0`,
                                    overflow: isExpanded ? 'visible' : 'hidden',
                                }}
                                onClick={toggleText}>
                                A Delicious traditional platters of fluffy idliys and vada,...
                            </p>

                        </div>
                        <div className='w-5/12 '>
                            <img src={breakfast} alt='Breakfast' className='rounded-xl w-full h-36' />
                            <button className='focus:outline-none text-lg font-bold -mt-6 py-2 w-9/12 flex mx-auto  z-50 relative rounded-lg text-center font-semibold justify-center bg-white border border-neutral-300 uppercase text-green-600'>
                                Add
                            </button>
                        </div>
                    </div>
                </div>
            </section>
            <Footer />
        </>
    );
}

export default Items;
