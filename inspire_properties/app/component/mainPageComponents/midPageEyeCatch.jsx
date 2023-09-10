"use client"
import React from "react";
import Image from "next/image";
import Link from "next/link";
import { ImgComparisonSlider } from "@img-comparison-slider/react";

function MidPageEyeCatch() {
  return (
    <div>
      <div className="bg-gray-100 py-10 capitalize">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-semibold text-gray-800 mb-4">
            Power Washing & Deck Staining Services
          </h2>
          <p className="text-gray-600 mb-8 lg:text-xl lg:font-semibold">
            We offer top-notch power washing and deck staining services to keep
            your property looking fresh and well-maintained. Our expert team
            ensures thorough cleaning and professional staining for stunning
            results.
          </p>
          <Image
            className="rounded-xl mb-2"
            src="/HomePageImages/Image1.jpg"
            width={400}
            height={400}
            alt="Deck that was powerwashed and stained"
          />
          <Link href="/Book">
            <button className="bg-blue-500 text-white text-3xl px-12 py-2 rounded-lg border-2 border-black font-semibold hover:text-black hover:bg-blue-300">
              Book with Us Today
            </button>
          </Link>
        </div>
      </div>
      <div className="bg-gray-200 py-10 ">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-semibold text-gray-800 mb-4">
            Lawn Care Services
          </h2>
          <p className="text-gray-600 mb-8 lg:text-xl lg:font-semibold">
            Transform your outdoor space with our comprehensive lawn care
            services. From mowing and fertilizing to landscaping and
            maintenance, we ensure your lawn stays lush and inviting.
          </p>
          <Image
            className="rounded-xl mb-2"
            src="/HomePageImages/Lawn.jpg"
            width={500}
            height={500}
            alt="Deck that was powerwashed and stained"
          />
          <Link href="/Book">
            <button className="bg-green-500 text-white text-3xl px-12 py-2 rounded-lg border-2 border-black font-semibold hover:text-black hover:bg-green-300">
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
          <p className="text-gray-600 mb-8 lg:text-xl lg:font-semibold">
            Enhance your property&apos;s value and comfort with our range of
            home improvement services. From renovations and repairs to
            installations, we bring your vision to life with quality
            workmanship.
          </p>
          <div>
            <ImgComparisonSlider width={4} height={4} className="rounded-lg">
              <img
                slot="first"
                src="/HomePageImages/Image2Before.jpg"
                height={320}
                width={420}
              />
              <img
                slot="second"
                src="/HomePageImages/Image2After.jpg"
                height={320}
                width={420}
              />
            </ImgComparisonSlider>
          </div>
          <Link href="/Book">
            <button className="bg-red-500 text-white  text-3xl px-12 py-2 rounded-lg capitalize border-2 border-black font-semibold hover:text-black hover:bg-red-300">
              Book with Us Today
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default MidPageEyeCatch;
