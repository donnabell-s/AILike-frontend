import { useEffect, useState } from 'react';

const images = [
  '/AuthCarousel/slide1.png',
  '/AuthCarousel/slide2.png',
  '/AuthCarousel/slide3.jpg',
];

const AuthCarousel = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % images.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="w-full h-[300px] md:h-full relative border-[10px] lg:border-[30px] lg:border-r-0 border-white rounded-2xl overflow-hidden">
      
      {/* Image Slides */}
      {images.map((image, index) => (
        <div
          key={index}
          className={`absolute top-0 left-0 w-full h-full bg-cover bg-center transition-opacity duration-1000 ${
            index === currentIndex ? 'opacity-100 z-0' : 'opacity-0 z-0'
          }`}
          style={{
            backgroundImage: `url(${image})`,
            borderRadius: 'inherit',
          }}
        />
      ))}

      {/* Overlay */}
      <div className="absolute top-0 left-0 w-full h-full bg-[#F282B0]/60 z-10 rounded-2xl" />

      {/* Static Text Content */}
      <div
        className="absolute bottom-8 left-8 z-20 text-white max-w-[80%] md:max-w-[560px]"
        style={{ textShadow: '2px 2px 8px #C53771' }}
      >
        <p className="text-4xl sm:text-5xl md:text-6xl lg:text-8xl font-bold leading-tight">
          AILike
        </p>
        <p className="text-lg sm:text-xl md:text-2xl lg:text-4xl font-semibold">
          Where machine learning meets heart-felt connections.
        </p>
      </div>

      {/* Slide Indicators */}
      <div className="absolute top-5 left-1/2 transform -translate-x-1/2 flex gap-2 z-20">
        {images.map((_, index) => (
          <div
            key={index}
            className={`w-3 h-3 rounded-full transition-all duration-300 ${
              index === currentIndex ? 'bg-white' : 'bg-white/50'
            }`}
          />
        ))}
      </div>
    </div>
  );
};

export default AuthCarousel;
