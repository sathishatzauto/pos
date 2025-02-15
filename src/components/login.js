import React, { useEffect, useState } from "react";
import rcfav from "../assets/img/rcfav.png";
import toast from "react-hot-toast";
import axios from "axios";
import {  useNavigate } from "react-router-dom";

export default function Login() {
  const [fullName, setFullName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const navigate = useNavigate();

  const handleLogin = () => {
    if (fullName.trim().length === 0) {
      toast.error("Enter Full Name");
    } else if (phoneNumber.trim().length === 0) {
      toast.error("Enter Phone Number");
    } else {
      localStorage.setItem("fullName", fullName);
      localStorage.setItem("phoneNumber", phoneNumber);
      const formData = { name: fullName, mobile: phoneNumber };
      try {
        axios
          .post(
            "https://api.rcpos.co.za/api/table-user/create",
            formData
          )
          .then((response) => {
            if (response.status === 200) {
              if (response.data.status) {
                toast.success(response.data.message);
                navigate('/')
              }
              else {
                toast.error(response.data.message);
              }
            }
          });
      } catch (error) {
        console.log(error.message);
        toast.error("Something Went Wrong");
      }
    }
  };


  return (
    <section className="flex items-center w-full h-screen">
      <div className="bgthree mx-2 px-2 py-6 w-12/12 rounded">
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
            className="mt-6 border-none focus:outline-none w-full bg-fuchsia-600 text-white text-center rounded py-2"
          >
            Save
          </button>
        </form>
      </div>
    </section>
  );
}
