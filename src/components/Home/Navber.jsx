import React, { useContext, useEffect, useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import "remixicon/fonts/remixicon.css";
import { CartContext } from "../Context Api/CartContext";
import { DataContext } from "../Context Api/UserContext";
import { SearchBar } from "../SearchBar";
import { Profile } from "../Profile/ProfileNav";
import { FiTruck, FiPercent } from "react-icons/fi";
import Header from "../Home/Header";

const NavbarTop = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { cartItems } = useContext(CartContext);
  const { categoryData, productData } = useContext(DataContext);

  const [values, setValue] = useState(false);
  const [sBar, setSbar] = useState(false);
  const [searchIcon, setSearchIcon] = useState(true);
  const [catData, setCatData] = useState([]);

  const toggle = () => setValue(!values);

  // Navbar height for positioning sidebar
  //const navHeight = "top-[80px]"; // Adjust this value to match your navbar's height exactly
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      // Logic: If scrolled > 10px, set state to true
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Define the dynamic variable here
  // When not scrolled: 80px | When scrolled: 45px
  const navHeight = isScrolled ? "top-[48px]" : "top-[80px]";

  useEffect(() => {
    if (values) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
    return () => (document.body.style.overflow = "auto");
  }, [values]);

  useEffect(() => {
    if (!categoryData || !productData) return;
    const productCategories = productData.map((p) => p.category);
    const data = categoryData.filter((cat) =>
      productCategories.includes(cat.catID),
    );
    setCatData(data);
  }, [categoryData, productData]);

  useEffect(() => {
    setSbar(false);
    setSearchIcon(location.pathname !== "/");
  }, [location]);

  return (
    // Height is implicit here, but sticky top-0 is key
    //sticky top-0 z-50
    <>
      <div className="bg-white font-sans shadow lg:shadow-none text-black py-1 md:py-0 border-b ">
        {/* ======= DESKTOP NAV ======= */}
        <div className="max-w-[1400px] mx-auto items-center justify-between px-4 hidden md:flex h-[56px]">
          <div>
            <Link to="/">
              <img
                className="w-[100px] h-[48px]"
                src="/logo desk.png"
                alt="Logo"
              />
            </Link>
          </div>

          <div className="w-1/2">
            <SearchBar />
          </div>

          <div className="flex items-center gap-4">
            <Link to="/offer" className="group">
              <div className="relative flex items-center gap-2 px-4 py-1.5 bg-gradient-to-r from-rose-600 to-red-500 rounded-full shadow-[0_0_15px_rgba(225,29,72,0.4)] hover:shadow-[0_0_25px_rgba(225,29,72,0.6)] transition-all duration-300 active:scale-95 overflow-hidden">
                {/* Pulse Animation Layer */}
                <span className="absolute inset-0 bg-white/20 animate-pulse group-hover:animate-none" />

                {/* Icon Container */}
                <div className="relative z-10 flex items-center justify-center w-5 h-5 bg-white/20 rounded-full backdrop-blur-sm group-hover:rotate-12 transition-transform">
                  <FiPercent className="text-white text-[10px]" />
                </div>

                {/* Text Label */}
                <span className="relative z-10 text-[11px] font-black text-white uppercase tracking-[0.15em]">
                  Live Offers
                </span>

                {/* Shine Effect */}
                <div className="absolute top-0 -inset-full h-full w-1/2 z-20 block transform -skew-x-12 bg-gradient-to-r from-transparent to-white/30 opacity-40 group-hover:animate-shine" />
              </div>
            </Link>

            <div
              onClick={() => navigate("/track-order")}
              className="cursor-pointer p-2 rounded hover:bg-gray-100 transition"
              title="Track Order"
            >
              <FiTruck size={24} className="text-gray-800" />
            </div>

            <div
              className="relative p-2 rounded hover:bg-gray-100 transition"
              title="Cart"
            >
              <Link to="/checkout/cart">
                <i className="ri-shopping-cart-2-line text-2xl"></i>
              </Link>
              {cartItems.length > 0 && (
                <span className="absolute top-0 right-0 bg-[#fe741d] text-white text-[10px] font-bold px-1.5 py-0.5 rounded-full">
                  {cartItems.length}
                </span>
              )}
            </div>

            <Profile />
          </div>
        </div>

        {/* ======= MOBILE NAV ======= */}
        <div className="bg-white w-full h-[40px] md:hidden flex items-center justify-between px-3">
          <div className="text-2xl cursor-pointer" onClick={toggle}>
            <i
              className={
                values ? "ri-close-line text-indigo-600" : "ri-menu-3-line"
              }
            ></i>
          </div>

          <Link to="/">
            <img
              className="h-[39px] ml-15"
              src="/logo desk.png"
              alt="Logo"
            />
          </Link>

          <div className="flex items-center gap-3 w-[100px] justify-end">
            {searchIcon && (
              <i
                className="ri-search-line text-xl"
                onClick={() => setSbar(!sBar)}
              ></i>
            )}
            <div className="relative ml-1">
              <Link to="/checkout/cart">
                <i className="ri-shopping-cart-2-line text-2xl text-gray-800"></i>
              </Link>
              {cartItems.length > 0 && (
                <span className="absolute -top-1 -right-1 bg-[#fe741d] text-white text-[10px] px-1 rounded-full">
                  {cartItems.length}
                </span>
              )}
            </div>
            <Profile />
          </div>
        </div>

        {sBar && (
          <div className="mx-2 mt-5 pb-2 md:hidden">
            <SearchBar />
          </div>
        )}

        {/* ======= SIDEBAR + OVERLAY ======= */}
        {/* Overlay starts below Navbar */}
        <div
          className={`fixed inset-0  ${navHeight}  bg-black/20 backdrop-blur-sm z-40 transition-opacity duration-300 ${
            values ? "opacity-100 visible" : "opacity-0 invisible"
          }`}
          onClick={() => setValue(false)}
        />

        {/* Sidebar starts below Navbar */}
        <div
          className={`fixed ${navHeight} left-0 bottom-0 w-1/2 bg-white z-50 transform transition-transform duration-500 ease-in-out overflow-y-auto border-r ${
            values ? "translate-x-0" : "-translate-x-full"
          }`}
        >
          <div className="flex items-center justify-between bg-gray-50 p-4 border-b">
            <span className="text-gray-800 font-bold uppercase tracking-wider text-xs">
              Categories
            </span>
            <i className="ri-arrow-left-s-line text-gray-400"></i>
          </div>

          <nav className="flex flex-col pb-20">
            {catData?.map((cat, index) => (
              <Link
                key={index}
                to={`/${cat.catName}`}
                className="group flex items-center justify-between px-4 py-3 border-b-1 text-gray-700  border-gray-200 text-sm font-medium hover:bg-indigo-50 hover:text-indigo-600 transition-all"
                onClick={() => setValue(false)}
              >
                <span>{cat.catName}</span>
                <i className="ri-arrow-right-s-line opacity-0 group-hover:opacity-100 transition-opacity"></i>
              </Link>
            ))}
          </nav>
        </div>
      </div>
    </>
  );
};

export default NavbarTop;
