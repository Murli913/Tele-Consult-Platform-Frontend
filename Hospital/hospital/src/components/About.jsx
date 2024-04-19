import React from "react";
import img from "../assets/img/about.jpg";

const About = () => {
  return (
    <div className=" min-h-screen flex flex-col lg:flex-row justify-between items-center lg:px-32 px-5 pt-24 lg:pt-16 gap-5">
      <div className=" w-full lg:w-3/4 space-y-4">
        <h1 className=" text-4xl font-semibold text-center lg:text-start">About Us</h1>
        <p className=" text-justify lg:text-start">
        At [Tele-Consult], we are committed to providing exceptional healthcare services with compassion, 
        integrity, and innovation. Founded [2024],
         our hospital has been serving the [IIIT-B] community for [1st] years
         , and we take pride in being a trusted healthcare provider for our patients and their families.
        </p>
        <p className="text-justify lg:text-start">
        
         Our mission is to improve the health and well-being of our community
          by delivering high-quality, patient-centered care in a compassionate 
         and respectful environment. We strive to be a leader in healthcare innovation, 
        continuously seeking ways to enhance our services and improve patient outcomes.
        </p>
        <p className="text-justify lg:text-start">
        At [Tele-Consult], we are proud to have a team of highly skilled and 
        compassionate healthcare professionals, including physicians, nurses,
         therapists, and support staff. Our team is dedicated to providing personalized
          care and support to every patient, helping them navigate their healthcare journey
           with confidence and peace of mind.
        </p>
      </div>
      <div className=" w-full ml-11 lg:w-2/4">
        <img className=" rounded-lg" src="https://assets-global.website-files.com/60bfb6df3405a15b8f0d8f9c/60bfb94d894af358c290efba_Doctors.gif" alt="img" />
      </div>
    </div>
  );
};

export default About;