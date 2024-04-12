import React, { useState } from "react";
import { supabase } from "../helper/supabaseClient";
import CircularProgress from "@mui/material/CircularProgress";
import TextField from "@mui/material/TextField";
import InputLabel from "@mui/material/InputLabel";
import ForgotPasswordImage from "../assets/ForgotPassword.avif";

const ForgotPassword = () => {
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState("");

  const handleChange = (event) => {
    setEmail(event.target.value);
  };

  const sendPasswordResetRequest = async (event) => {
    event.preventDefault();
    try {
      const { data, error } = await supabase.auth.resetPasswordForEmail(email);
      if (error) throw error;
      alert("Check your email for a Password reset link.");
    } catch (error) {
      console.log(
        "error occurred while sending Password Reset Request.",
        error
      );
    }
  };

  return (
    <div className="bg-cover bg-[#FFFFFF] border-y-2 border-t-transparent  rounded-md  ">
      <section className="lg:flex md:flex  m-auto lg:w-[70%] md:mt-12 md:py-12  md:border-t-transparent ">
        <div className=" lg:w-1/2 flex justify-center items-center">
          <img
            className="opacity-50 w-full md:w-[80%]"
            src={ForgotPasswordImage}
            alt=""
          />
        </div>

        <div className="lg:w-1/2 p-4 md:p-8 border-y-2 border-b-transparent rounded-md">
          <form className="rounded-md">
            <div className="mb-8">
              <h1 className="text-3xl md:text-4xl text-center text-black font-semibold mb-2 ">
                Find  Your  Account
              </h1>

             

              <InputLabel
                className=" text-md text-black  text-left mb-2  mt-4 md:mt-6 font-bold"
                htmlFor="email"
              >
                 <p className=" text-gray-700 mt-8   text-md text-left mb-1 ">
                Email
              </p>
              
              </InputLabel>
              <span id="email" className="flex flex-row gap-2 rounded-md ">
                <TextField
                  id="outlined-basic-email"
                  variant="outlined"
                  className="w-full bg-gray-100 rounded-md "
                  placeholder="Enter your Email here"
                  name="email"
                  value={email}
                  onChange={handleChange}
                  size="small"
                  autoFocus
                />
              </span>
                <p className="text-[12px] p-1 px-2 ">You may receive SMS notifications from us for security and login purposes</p>
            </div>
            {loading ? (
              <CircularProgress
                className="mt-8"
                style={{ color: "#000", height: 25, width: 25 }}
              />
            ) : (
              <button
                onClick={sendPasswordResetRequest}
                className="w-full m-auto bg-blue-600 text-white py-1 px-10 text-center mt-2  md:mt-4 rounded-sm hover:bg-blue-500"
              >
                <span className="font-semibold">Send</span>
              </button>
            )}
            <div className="text-center text-[12px] p-2 text-gray-500 "></div>
          </form>
        </div>
      </section>
    </div>
  );
};

export default ForgotPassword;
