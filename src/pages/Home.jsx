import React from "react";
import HomeNav from "../components/HomeNav";
import HomeHero from "../components/HomeHero";
import HomeProduct from "../components/HomeProduct";
import HomePricing from "../components/HomePricing";
import HomeAbout from "../components/HomeAbout";
// import HomeTestimonials from "../components/HomeTestimonials";
import HomeContactUs from "../components/HomeContactUs";
import HomeFooter from "../components/HomeFooter";
import { useNavigate } from "react-router-dom";
import  secureLocalStorage  from  "react-secure-storage";

const Home = () => {
  const navigate = useNavigate();
  /**
   * if user is already logged in then redirect to dashboard,
   * instead of returning the login page
   */
  if (secureLocalStorage.getItem("token")) {
    navigate("/dashboard");
  }
  return (
    <div>
      <HomeNav />
      <HomeHero />
      <HomeProduct />
      <HomePricing />
      <HomeAbout />
      {/* <HomeTestimonials /> */}
      <HomeContactUs />
      <HomeFooter />
    </div>
  );
};

export default Home;
