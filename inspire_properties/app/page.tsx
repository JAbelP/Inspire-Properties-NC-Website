"use client";
import Slider from "./component/HomeComponents/Slider";
import MyHeader from "./component/Header";
import Myfooter from "./component/Footer";
import { MainGeneralContactUsComponent } from "./component/GeneralContactUsComponents/MainGeneralContactUsComponent";
import Image from "next/image";
import Link from "next/link";
import {
  ReactCompareSlider,
  ReactCompareSliderImage,
} from "react-compare-slider";
import { ImgComparisonSlider } from "@img-comparison-slider/react";

export const metadata = {
  title: "Inspire Properties - Property Services and Renovations Experts",
  description:
    "Your trusted partner for property services and renovations. From maintenance to landscaping, plumbing to roofing, we've got you covered. Contact us today!",
};

export default function Home() {
  const slides = [
    { path: "/SlideShow/1.jpg", title: "First", button: "Book With Us Today" },
    { path: "/SlideShow/2.jpg", title: "2nd", button: "Book With Us Today" },
    { path: "/SlideShow/3.jpg", title: "3rd", button: "Book With Us Today" },
    { path: "/SlideShow/4.jpg", title: "4th", button: "Book With Us Today" },
    { path: "/SlideShow/5.jpg", title: "5th", button: "Book With Us Today" },
    { path: "/SlideShow/6.jpg", title: "Yolo ", button: "Book With Us Today" },
  ];

  return (
    <div className="bg-white lg:min-h-screen flex flex-col">
      <MyHeader />
      <main className="flex-grow">
        <div>
          <div className="w-full lg:h-[40rem]  bg-gray-300  overflow-hidden">
            <Slider slides={slides} />
          </div>
          <div></div>

          <div className="bg-gray-100 py-10 capitalize">
            <div className="container mx-auto px-4">
              <h2 className="text-3xl font-semibold text-gray-800 mb-4">
                Power Washing & Deck Staining Services
              </h2>
              <p className="text-gray-600 mb-8">
                We offer top-notch power washing and deck staining services to
                keep your property looking fresh and well-maintained. Our expert
                team ensures thorough cleaning and professional staining for
                stunning results.
              </p>
              <Image
                className="rounded-xl mb-2"
                src="/HomePageImages/image1.jpg"
                width={400}
                height={400}
                alt="Deck that was powerwashed and stained"
              />
              <Link href="/Book">
                <button className="bg-blue-500 text-white px-6 py-2 rounded-lg border-2 border-black font-semibold hover:text-black hover:bg-blue-300">
                  Book with Us Today
                </button>
              </Link>
            </div>
          </div>
          <div className="bg-gray-200 py-10">
            <div className="container mx-auto px-4">
              <h2 className="text-3xl font-semibold text-gray-800 mb-4">
                Lawn Care Services
              </h2>
              <p className="text-gray-600 mb-8">
                Transform your outdoor space with our comprehensive lawn care
                services. From mowing and fertilizing to landscaping and
                maintenance, we ensure your lawn stays lush and inviting.
              </p>
              <Image
                className="rounded-xl mb-2"
                src="/HomePageImages/Lawn.jpg"
                width={400}
                height={400}
                alt="Deck that was powerwashed and stained"
              />
              <Link href="/Book">
                <button className="bg-green-500 text-white px-6 py-2 rounded-lg border-2 border-black font-semibold hover:text-black hover:bg-green-300">
                  Book with Us Today
                </button>
              </Link>
            </div>
          </div>
          <div className="bg-gray-300 py-10">
            <div className="container mx-auto px-4">
              <h2 className="text-3xl font-semibold text-gray-800 mb-4">
                Home Improvement Solutions
              </h2>
              <p className="text-gray-600 mb-8">
                Enhance your property&apos;s value and comfort with our range of
                home improvement services. From renovations and repairs to
                installations, we bring your vision to life with quality
                workmanship.
              </p>
              <div>
                <ImgComparisonSlider
                  width={2}
                  height={2}
                  className="rounded-lg"
                >
                  <img
                    slot="first"
                    src="/HomePageImages/Image2Before.jpg"
                    height={220}
                    width={220}
                  />
                  <img
                    slot="second"
                    src="/HomePageImages/Image2After.jpg"
                    height={220}
                    width={220}
                  />
                </ImgComparisonSlider>
              </div>
              <Link href="/Book">
                <button className="bg-red-500 text-white px-6 py-2 rounded-lg capitalize border-2 border-black font-semibold hover:text-black hover:bg-red-300">
                  Book with Us Today
                </button>
              </Link>
            </div>
          </div>

          <MainGeneralContactUsComponent />
        </div>
      </main>
      <footer className="inline-block">
        <Myfooter />
      </footer>
    </div>
  );
}
