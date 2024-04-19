import React, { useRef } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { FaArrowLeft } from "react-icons/fa";
import { FaArrowRight } from "react-icons/fa";

const Yoga = () => {
  const data = [
    {
      img: "https://i.pinimg.com/originals/64/41/61/644161b5ce15397473f2c4a49620ee8f.gif",
      name: "Dhanurasana Pose",
      specialties: "It helps in weight loss and boosts digestion and blood circulation.",
      
    },
    {
      img: "https://i.gifer.com/74y4.gif",
      name: "Triangle pose",
      specialties: "It help relieve back pain and help with emotional baggage too.",
     
    },
    {
      img: "https://cdnl.iconscout.com/lottie/premium/thumb/girl-doing-king-warrior-yoga-pose-5465539-4562551.gif",
      name: "Paschimottanasana",
      specialties: "It help relieve back pain and help with emotional baggage too.",
      
    },
    {
      img: "https://www.careerguide.com/career/wp-content/uploads/2020/02/image_processing20190915-23847-1hdqdop.gif",
      name: "Camel pose",
      specialties: "It help relieve back pain and help with emotional baggage too.",
      
    },
    {
      img: "https://media1.giphy.com/media/H3SYd8rWzFXQrAWLNc/giphy.gif?cid=6c09b952sbzarsgo9y720fyki05654iod09yxa71vyxjugi6&ep=v1_internal_gif_by_id&rid=giphy.gif&ct=g",
      name: "Mountain Pose",
      specialties: "It help relieve back pain and help with emotional baggage too.",
      
    },
    {
      img: "https://cdn.dribbble.com/users/974028/screenshots/14943333/media/f0d927649fc3566932c7b7c209c901e0.gif",
      name: "Paschimottanasana",
      specialties: "It help relieve back pain and help with emotional baggage too.",
    
    },
  ];

  const slider = useRef(null);

  const settings = {
    accessibility: true,
    dots: true,
    infinite: true,
    speed: 500,
    arrows: false,
    slidesToShow: 5,
    slidesToScroll: 1,
    responsive: [
      {
        breakpoint: 1023,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
          infinite: true,
          dots: true,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          initialSlide: 2,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          initialSlide: 2,
        },
      },
    ],
  };

  return (
    <div className=" min-h-screen flex flex-col justify-center lg:px-32 px-5 pt-16">
      <div className=" flex flex-col items-center lg:flex-row justify-between mb-10 lg:mb-0">
        <div>
          <h1 className=" text-4xl font-semibold text-center lg:text-start">
           Do Yoga Daily
          </h1>
          <p className=" mt-2 text-center lg:text-start">
            Do this Basics Yoga Excerise Daily as you as see
          </p>
        </div>
        <div className="flex gap-5 mt-4 lg:mt-0">
          <button
            className=" bg-[#d5f2ec] text-backgroundColor px-4 py-2 rounded-lg active:bg-[#ade9dc]"
            onClick={() => slider.current.slickPrev()}
          >
            <FaArrowLeft size={25} />
          </button>
          <button
            className=" bg-[#d5f2ec] text-backgroundColor px-4 py-2 rounded-lg active:bg-[#ade9dc]"
            onClick={() => slider.current.slickNext()}
          >
            <FaArrowRight size={25} />
          </button>
        </div>
      </div>
      <div className=" mt-5">
        <Slider ref={slider} {...settings}>
          {data.map((e, index) => (
            <div
              className="h-[350px] text-black rounded-xl shadow-[rgba(0,_0,_0,_0.24)_0px_3px_8px] mb-2 cursor-pointer"
              key={index}
            >
              <div>
                <img
                  src={e.img}
                  alt="img"
                  className=" h-56 rounded-t-xl w-full"
                />
              </div>

              <div className=" flex flex-col justify-center items-center">
                <h1 className=" font-semibold text-xl pt-4">{e.name}</h1>
                <h3 className=" pt-2 , ml-4 mr-2">{e.specialties}</h3>
              </div>
            </div>
          ))}
        </Slider>
      </div>
    </div>
  );
};

export default Yoga;