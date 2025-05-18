import { useEffect, useState } from 'react';

const slides = [
  {
    image: '/AuthCarousel/slide1.png',
    profilePic: '/AuthCarousel/profiles/user1.jpg',
    name: 'Jamal Robert Suba, 32',
    text: 'I never thought I’d meet someone who truly gets me—but Alike’s AI matched us perfectly. We clicked from day one!',
  },
  {
    image: '/AuthCarousel/slide2.png',
    profilePic: '/AuthCarousel/profiles/user2.jpeg',
    name: 'Julien Veniz Cano, 20',
    text: 'I’ve tried so many dating apps, but Alike felt different. The conversations felt more natural, and the matches actually shared my values.',
  },
  {
    image: '/AuthCarousel/slide3.jpg',
    profilePic: '/AuthCarousel/profiles/user3.jpg',
    name: 'Johanne Nacorda, 22',
    text: 'Alike cut through the noise. No endless swiping—just real, compatible people. The AI made dating feel smarter.',
  },
];

const AuthCarousel = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [fade, setFade] = useState(true);


  useEffect(() => {
    const timer = setInterval(() => {
      setFade(false); // Start fade out
      setTimeout(() => {
        setCurrentIndex((prev) => (prev + 1) % slides.length);
        setFade(true); // Fade in after slide change
      }, 200); // 200ms fade out before changing
    }, 5000);
    return () => clearInterval(timer);
  }, []);


  return (
    <div className="w-full h-[300px] md:h-full relative border-[10px] lg:border-[30px] lg:border-r-0 border-white rounded-lg overflow-hidden">
      
      {/* Slide Container */}
      <div
        className="flex h-full transition-transform duration-700 ease-in-out"
        style={{
          width: `${slides.length * 100}%`,
          transform: `translateX(-${currentIndex * (100 / slides.length)}%)`,
        }}
      >
        {slides.map((slide, index) => (
          <div
            key={index}
            className="w-full flex items-center justify-center bg-[#fefefe]"
          >
            <img
              src={slide.image}
              alt={`Slide ${index + 1}`}
              className="w-auto h-full object-cover rounded-lg"
            />
          </div>
        ))}
      </div>

      {/* Overlay */}
      <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-r from-[#C53771]/80 to-[#F282B0]/80 z-10 rounded-lg" />

      {/* Testimonial Caption */}
      <div
        className={`absolute bottom-8 left-80 transform -translate-x-1/2 z-20 text-white text-start w-300 max-w-xl transition-opacity duration-500 ${
          fade ? 'opacity-100' : 'opacity-0'
        }`}
      >
        <p className="text-3xl font-semibold">“{slides[currentIndex].text}”</p>
        <div className="flex items-center justify-start gap-4 mt-3">
          <img
            src={slides[currentIndex].profilePic}
            alt={slides[currentIndex].name}
            className="w-10 h-10 rounded-full border-2 border-white"
          />
          <span className="font-semibold text-lg">{slides[currentIndex].name}</span>
        </div>
      </div>


      {/* Slide Indicators */}
      <div className="absolute top-5 left-1/2 transform -translate-x-1/2 flex gap-2 z-20">
        {slides.map((_, index) => (
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
