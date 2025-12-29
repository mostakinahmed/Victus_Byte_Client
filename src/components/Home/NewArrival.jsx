import { useContext, useEffect, useState, useRef } from "react";
import { FiZap, FiChevronLeft, FiChevronRight } from "react-icons/fi";
import { DataContext } from "../Context Api/UserContext";
import { Link } from "react-router-dom";
import ProductCard from "../ProductCard";

export default function NewArrivals() {
  const { productData } = useContext(DataContext);
  const [newArrivalData, setNewArrivalData] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  
  // 1. Logic to handle dynamic visible items based on screen width
  const [visibleItems, setVisibleItems] = useState(6);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 640) setVisibleItems(2);      // Mobile
      else if (window.innerWidth < 768) setVisibleItems(3); // Small Tablet
      else if (window.innerWidth < 1024) setVisibleItems(4); // Tablet
      else setVisibleItems(6);                               // Desktop
    };

    handleResize(); // Initialize on mount
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    const data = productData.filter((item) => item.status?.isNewArrival);
    setNewArrivalData(data);
  }, [productData]);

  // Prevent sliding past the end
  const maxIndex = Math.max(0, newArrivalData.length - visibleItems);

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev >= maxIndex ? 0 : prev + 1));
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev <= 0 ? maxIndex : prev - 1));
  };

  useEffect(() => {
    if (isPaused) return;
    const interval = setInterval(() => {
      nextSlide();
    }, 3000); 
    return () => clearInterval(interval);
  }, [currentIndex, isPaused, maxIndex, visibleItems]);

  return (
 <section className="max-w-[1370px] mt-4 bg-red-300 mb-6 lg:mx-auto md:pb-4 pb-3 mx-2 ">
      {/* Header Section */}
       <div className="flex items-center justify-between bg-white shadow-sm border border-gray-100 md:p-4 px-4 py-2  mb-8">
             <div className="flex items-center gap-3">
               <div className="p-2 -ml-4 md:ml-0">
                 <FiZap className="text-xl md:-ml-3 text-[#fe741d] animate-pulse" />
               </div>
               <h3 className="text- md:text-xl -ml-3  md:-ml-1 font-bold text-gray-900">
                 New Arrival
               </h3>
             </div>
     
             {/* View All Button */}
             <Link
               to="/all-products"
               className="flex items-center gap-1 text-[11px] md:text-xs font-bold uppercase tracking-wider text-[#fe741d] hover:text-white border border-[#fe741d] hover:bg-[#fe741d] px-3 py-1.5 md:px-5 md:py-2 rounded-full transition-all duration-300"
             >
               View All
             </Link>
           </div>

      {/* Product Slider Container */}
      <div 
        className="relative group"
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
        onTouchStart={() => setIsPaused(true)} // Pause on mobile touch
        onTouchEnd={() => setIsPaused(false)}
      >
        <div className="overflow-hidden px-1">
          <div
            className="flex transition-transform duration-1000 ease-in-out"
            style={{
              // 2. The movement percentage now adapts to visibleItems
              transform: `translateX(-${currentIndex * (100 / visibleItems)}%)`,
            }}
          >
            {newArrivalData.map((product) => (
              <div
                key={product.pID}
                // 3. Changed w-full to w-1/2 for mobile
                className="w-1/2 sm:w-1/3 md:w-1/4 lg:w-1/5 xl:w-1/6 flex-shrink-0 px-1 md:px-2"
              >
                <Link to={`/product/${product.category}/${product.pID}`}>
                  <ProductCard data={product} />
                </Link>
              </div>
            ))}
          </div>
        </div>

        {/* Navigation Buttons - Visible on Mobile too, but styled better */}
        {newArrivalData.length > visibleItems && (
          <>
             <button
                         onClick={prevSlide}
                         className="absolute left-0 top-1/2 -translate-y-1/2 z-20 bg-red-300/90 hover:bg-indigo-600 hover:text-white text-gray-800 p-2 md:p-3 rounded-r-xl shadow-lg transition-all"
                       >
                         <FiChevronLeft size={24} />
                       </button>
                       <button
                         onClick={nextSlide}
                         className="absolute right-0 top-1/2 -translate-y-1/2 z-20 bg-red-300/90 hover:bg-indigo-600 hover:text-white text-gray-800 p-2 md:p-3 rounded-l-xl shadow-lg transition-all"
                       >
                         <FiChevronRight size={24} />
                       </button>
          </>
        )}
      </div>
    </section>
  );
}