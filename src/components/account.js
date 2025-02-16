import "../App.css";
import IndexNavbar from "../components/navbar/IndexNavbar.js";
import "swiper/css";
import "swiper/css/pagination";
import Footer from "./footer/footer.js";
import profile from "../assets/img/profile.png";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function Account() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [selectedFullName, setSelectedFullName] = useState("");
  const [selectedPhoneNumber, setSelectedPhoneNumber] = useState("");
  const navigate = useNavigate()

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };
  const handleLogout = () => {
    localStorage.removeItem("authToken");
    sessionStorage.clear();
    localStorage.clear();
    navigate('/')
  };

  useEffect(() => {
    setSelectedFullName(localStorage.getItem("fullName") || "");
    setSelectedPhoneNumber(localStorage.getItem("phoneNumber") || "");
  }, []);

  return (
    <>
      <IndexNavbar />
      <section className="mt-24 container mx-auto px-4 h-screen">
        <div className="mt-6">
          <div className="flex mx-auto justify-center">
            <img src={profile} alt="profile" className="rounded-full w-20" />
          </div>
          <h2 className="text-center text-black font-semibold text-xl pt-1">
            {selectedFullName}
          </h2>
          <p className="text-neutral-600 text-center text-base pt-1">
            {selectedPhoneNumber}
          </p>
        </div>

        <div className="mt-6">
          <a href="/orders">
            <div
              className="flex border-b border-t border-neutral-100 items-center py-3 cursor-pointer"
              // onClick={handleLogout}
            >
              <div className="w-10/12">

                <p className="flex items-center gap-4">
                  <i className="las la-file-alt text-neutral-600"></i>
                  <span className="text-base text-neutral-600">Order History</span>
                </p>
              </div>
              <button className="focus:outline-none text-right w-2/12">
                <i className="las la-angle-right text-black text-xl"></i>
              </button>
            </div>
          </a>
          <div
            className="flex border-b border-t border-neutral-100 items-center py-3 cursor-pointer"
            onClick={handleLogout}
          >
            <div className="w-10/12">
              <p className="flex items-center gap-4">
                <i className="las la-sign-out-alt text-neutral-600"></i>
                <span className="text-base text-neutral-600">Logout</span>
              </p>
            </div>
            <button className="focus:outline-none text-right w-2/12">
              <i className="las la-angle-right text-black text-xl"></i>
            </button>
          </div>
        </div>
      </section>
      <Footer />
    </>
  );
}

export default Account;
