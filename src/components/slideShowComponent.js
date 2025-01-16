import React, { useState, useEffect } from 'react';

const Slideshow = ({ imageUrls }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [fade, setFade] = useState(true);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setFade(false);
      setTimeout(() => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % imageUrls.length);
        setFade(true);
      }, 600); // Duration of the fade out transition
    }, 5000); // Change image every 5 seconds

    return () => clearInterval(intervalId);
  }, [imageUrls.length]);

  const goToPrevious = () => {
    setFade(false);
    setTimeout(() => {
      setCurrentIndex((currentIndex - 1 + imageUrls.length) % imageUrls.length);
      setFade(true);
    }, 300); // Duration of the fade out transition
  };

  const goToNext = () => {
    setFade(false);
    setTimeout(() => {
      setCurrentIndex((currentIndex + 1) % imageUrls.length);
      setFade(true);
    }, 300); // Duration of the fade out transition
  };

  return (
    <div className="m-5 relative w-120 h-96 rounded-lg shadow-lg overflow-hidden">
      <img
        src={imageUrls[currentIndex]}
        alt={`Slide ${currentIndex}`}
        className={`w-full h-full object-cover transition-opacity duration-300 ${fade ? 'opacity-100' : 'opacity-0'}`}
        style={{ minHeight: '100%', minWidth: '100%' }}
      />
      <div className="absolute inset-0 flex items-center justify-between">
        <button
          onClick={goToPrevious}
          className="bg-transparent text-gray-800 p-3 rounded-full hover:bg-gray-200 hover:text-gray-900 transition duration-300"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6 transform"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M15 19l-7-7 7-7"
            />
          </svg>
        </button>
        <button
          onClick={goToNext}
          className="bg-transparent text-gray-800 p-3 rounded-full hover:bg-gray-200 hover:text-gray-900 transition duration-300"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M9 5l7 7-7 7"
            />
          </svg>
        </button>
      </div>
    </div>
  );
};

export default Slideshow;
