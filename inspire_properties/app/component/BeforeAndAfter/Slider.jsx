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
      <Carousel
        dynamicHeight={true}
        selectedItem={currentIndex}
        onChange={goToSlide}
        showStatus={false}
        showThumbs={false}
        emulateTouch
        infiniteLoop
        showArrows={true}
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
    </div>
  );
};

export default ImageSlider;
