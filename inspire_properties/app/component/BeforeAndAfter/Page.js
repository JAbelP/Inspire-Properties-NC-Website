"use client";
import React, { useState } from "react";
import Image from "next/image";
import Slider from "./Slider";

function BAAPage() {
  // { path: "/SlideShow/1.jpg", title: "First", button: "Book With Us Today" },
  const images = [
    { path: "/BeforeAndAfter/1.jpg", title: "Image 1" },
    { path: "/BeforeAndAfter/2.jpg", title: "Image 2" },
    { path: "/BeforeAndAfter/3.jpg", title: "Image 3" },
    { path: "/BeforeAndAfter/4.jpg", title: "Image 4" },
    { path: "/BeforeAndAfter/5.jpg", title: "Image 5" },
    { path: "/BeforeAndAfter/6.jpg", title: "Image 6" },
    { path: "/BeforeAndAfter/7.jpg", title: "Image 7" },
    { path: "/BeforeAndAfter/8.jpg", title: "Image 8" },
    { path: "/BeforeAndAfter/9.jpg", title: "Image 9" },

    { path: "/BeforeAndAfter/11.jpg", title: "Image 11" },
    { path: "/BeforeAndAfter/12.jpg", title: "Image 12" },
    { path: "/BeforeAndAfter/13.jpg", title: "Image 13" },
    { path: "/BeforeAndAfter/14.jpg", title: "Image 14" },
    { path: "/BeforeAndAfter/15.jpg", title: "Image 15" },
    { path: "/BeforeAndAfter/16.jpg", title: "Image 16" },
    { path: "/BeforeAndAfter/17.jpg", title: "Image 17" },
    { path: "/BeforeAndAfter/18.jpg", title: "Image 18" },
    { path: "/BeforeAndAfter/19.jpg", title: "Image 19" },

    { path: "/BeforeAndAfter/21.jpg", title: "Image 21" },
    { path: "/BeforeAndAfter/22.jpg", title: "Image 22" },
    { path: "/BeforeAndAfter/23.jpg", title: "Image 23" },
    { path: "/BeforeAndAfter/24.jpg", title: "Image 24" },
    { path: "/BeforeAndAfter/25.jpg", title: "Image 25" },
    { path: "/BeforeAndAfter/26.jpg", title: "Image 26" },
    { path: "/BeforeAndAfter/27.jpg", title: "Image 27" },
    { path: "/BeforeAndAfter/28.jpg", title: "Image 28" },
    { path: "/BeforeAndAfter/29.jpg", title: "Image 29" },

    { path: "/BeforeAndAfter/31.jpg", title: "Image 31" },
    { path: "/BeforeAndAfter/32.jpg", title: "Image 32" },
    { path: "/BeforeAndAfter/33.jpg", title: "Image 33" },
    { path: "/BeforeAndAfter/34.jpg", title: "Image 34" },
    { path: "/BeforeAndAfter/35.jpg", title: "Image 35" },
    { path: "/BeforeAndAfter/36.jpg", title: "Image 36" },
    { path: "/BeforeAndAfter/37.jpg", title: "Image 37" },
    { path: "/BeforeAndAfter/38.jpg", title: "Image 38" },
    { path: "/BeforeAndAfter/39.jpg", title: "Image 39" },

    { path: "/BeforeAndAfter/41.jpg", title: "Image 41" },
    { path: "/BeforeAndAfter/42.jpg", title: "Image 42" },
    { path: "/BeforeAndAfter/43.jpg", title: "Image 43" },
    { path: "/BeforeAndAfter/44.jpg", title: "Image 44" },
    { path: "/BeforeAndAfter/45.jpg", title: "Image 45" },
    { path: "/BeforeAndAfter/46.jpg", title: "Image 46" },
    { path: "/BeforeAndAfter/47.jpg", title: "Image 47" },

    // Add more image filenames here
  ];
  return (
    <div className=" bg-Color2darkBlue ">
    <h2 className="text-3xl text-center border-b-8 py-2 border-black"> Check out our before and after images!</h2>
      <div>
        <div className="w-full lg:h-[40rem]  mx-auto bg-white">
          <Slider slides={images} />
        </div>
      </div>
    </div>
  );
}

export default BAAPage;
