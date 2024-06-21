import React, { useState, useEffect } from 'react';

const Slideshow = ({ imageUrls }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [fade, setFade] = useState(true);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setFade(false);
      setTimeout(() => {
        setCurrentIndex(prevIndex => (prevIndex + 1) % imageUrls.length);
        setFade(true);
      }, 600); // Duration of the fade out transition
    }, 5000); // Change image every 3 seconds

    return () => clearInterval(intervalId);
  }, [imageUrls.length]);

  return (
    <div className="relative w-full h-full overflow-hidden rounded-lg shadow-lg">
      <img
        src={imageUrls[currentIndex]}
        alt={`Slide ${currentIndex}`}
        className={`w-full h-auto object-cover transition-opacity duration-300 ${fade ? 'opacity-100' : 'opacity-0'}`}
      />
      <div className="absolute inset-0 flex items-center justify-between p-4">
        <button
          onClick={() => {
            setFade(false);
            setTimeout(() => {
              setCurrentIndex((currentIndex - 1 + imageUrls.length) % imageUrls.length);
              setFade(true);
            }, 300); // Duration of the fade out transition
          }}
          className="bg-gray-800 text-white p-2 rounded-full hover:bg-gray-600"
        >
          Previous
        </button>
        <button
          onClick={() => {
            setFade(false);
            setTimeout(() => {
              setCurrentIndex((currentIndex + 1) % imageUrls.length);
              setFade(true);
            }, 300); // Duration of the fade out transition
          }}
          className="bg-gray-800 text-white p-2 rounded-full hover:bg-gray-600"
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default Slideshow;
