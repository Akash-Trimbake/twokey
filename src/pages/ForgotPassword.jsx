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

  // style={{backgroundImage:`url(${ForgotPasswordBackGroundImage})`}}

  return (
    <div
      className="bg-cover bg-[#FFFFFF]  rounded-md  " >
      <section className="md:flex  m-auto md:w-[70%] md:mt-12 md:py-12 md:border-y-2 md:border-t-transparent ">
        <div className=" items-center flex justify-end ">
            <img className="opacity-50  md:w-[80%] w-[100%]" src={ForgotPasswordImage} alt="" />
        </div>

        <div className="sm:w-1/2 mt-6">
          <form className="rounded-md md:flex ">
            <div
              className=" px-4  md:px-12 bg-[#FFFF] p-4 rounded-md 
        flex flex-col border-y-2 sm:w-full  bg-slate-50"
            >
              <div>
                <p className="text-3xl md:text-4xl text-black  font-bold">
                  Forgot
                 </p>
                <p className="text-3xl md:text-4xl text-black  font-bold ">
                Your Password
                 </p>
              </div>
              <InputLabel
                className=" text-md text-black  text-left mb-2  mt-10 md:mt-16 font-bold"
                htmlFor="email"
              >
               <p className=" text-black text-[13px]">
                  Enter the email address associated with
                </p>
                <p className=" text-black text-[13px]"> your account.</p>

            
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

              {loading ? (
                <CircularProgress
                  className="mt-8"
                  style={{ color: "#000", height: 25, width: 25 }}
                />
              ) : (
                <button
                  onClick={sendPasswordResetRequest}
                  className="w-full m-auto bg-blue-600 text-white py-1 px-10 text-center mt-8  md:mt-12 rounded-sm hover:bg-blue-500"
                >
                  <span className="font-semibold">Send</span>
                </button>
              )}
              <div className="text-center text-[12px] p-2 text-gray-500 ">
                <p>
                  Didn't recieve code?{" "}
                  <span className="text-blue-900 underline">Resend </span>{" "}
                </p>
              </div>
            </div>
          </form>
        </div>
      </section>
    </div>
  );
};

export default ForgotPassword;
