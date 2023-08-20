'use client'
import React, { useState } from 'react';
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import Link from 'next/link';

const ImageSlider = ({ slides }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const goToPrevious = () => {
    const isFirstSlide = currentIndex === 0;
    const newIndex = isFirstSlide ? slides.length - 1 : currentIndex - 1;
    setCurrentIndex(newIndex);
  };

  const goToNext = () => {
    const isLastSlide = currentIndex === slides.length - 1;
    const newIndex = isLastSlide ? 0 : currentIndex + 1;
    setCurrentIndex(newIndex);
  };

  const goToSlide = (slideIndex) => {
    setCurrentIndex(slideIndex);
  };

  return (
    <div className="relative lg:h-full lg:w-full">
      <div className="absolute top-1/2 transform -translate-y-1/2 left-0 z-10">
        <button
          className="text-white text-8xl px-4 py-2 rounded-md focus:outline-none"
          onClick={goToPrevious}
        >
          &larr;
        </button>
      </div>
      <div className="absolute top-1/2 transform -translate-y-1/2 right-0 z-10">
        <button
          className="text-white text-8xl px-4 py-2 rounded-md focus:outline-none"
          onClick={goToNext}
        >
          &rarr;
        </button>
      </div>
      <Carousel
        selectedItem={currentIndex}
        onChange={goToSlide}
        showStatus={false}
        showThumbs={false}
        emulateTouch
        infiniteLoop
        showArrows={false}
        showIndicators={false}
      >
        {slides.map((slide, slideIndex) => (
          <div key={slideIndex}>
            <img
              src={slide.path}
              alt={slide.title}
              style={{ maxWidth: '100%', height: 'auto' }}
            />
          </div>
        ))}
      </Carousel>
      <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2 z-10">
        <div className="flex space-x-3">
          {slides.map((slide, slideIndex) => (
            <button
              key={slideIndex}
              className={`w-4 h-4 rounded-full border-2 border-gray-600 focus:outline-none transition-colors ${
                slideIndex === currentIndex ? 'bg-orange-600' : 'bg-transparent'
              }`}
              onClick={() => goToSlide(slideIndex)}
            ></button>
          ))}
          <Link href="/Book">
            <button className="bg-greenLogo hover:bg-green-400 absolute bottom-24 left-96 p-4 px-8 rounded-md border-4 w-80 h-32 text-4xl border-black hover:border-green-600 hover:text-black">
              {slides[currentIndex].button}
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ImageSlider;
