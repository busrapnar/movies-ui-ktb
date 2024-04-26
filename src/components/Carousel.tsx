import React, { useState, ReactNode } from 'react';

interface CarouselProps {
  children: ReactNode[];
}

const Carousel = ({ children }: CarouselProps) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const totalItems = React.Children.count(children);

  const nextSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex === totalItems - 1 ? 0 : prevIndex + 1));
  };

  const prevSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex === 0 ? totalItems - 1 : prevIndex - 1));
  };

  return (
    <div className="relative">
      <div className="overflow-hidden">
        <div
          className="flex transition-transform duration-300 ease-out"
          style={{ transform: `translateX(-${currentIndex * 100}%)` }}
        >
          {React.Children.map(children, (child, index) => (
            <div className="flex-shrink-0 w-full" key={index}>{child}</div>
          ))}
        </div>
      </div>
      <button
        className="absolute top-1/2 transform -translate-y-1/2 left-0 w-10 h-10 bg-gray-700 text-white rounded-full flex justify-center items-center hover:bg-gray-800"
        onClick={prevSlide}
      >
        {'<<'}
      </button>
      <button
        className="absolute top-1/2 transform -translate-y-1/2 right-0 w-10 h-10 bg-gray-700 text-white rounded-full flex justify-center items-center hover:bg-gray-800"
        onClick={nextSlide}
      >
        {'>>'}
      </button>
    </div>
  );
};

export default Carousel;