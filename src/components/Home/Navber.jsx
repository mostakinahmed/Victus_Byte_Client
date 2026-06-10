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
  const { cartItems, updateCart } = useContext(CartContext);
  const { categoryData, productData } = useContext(DataContext);

  const [values, setValue] = useState(false);
  const [sBar, setSbar] = useState(false);
  const [searchIcon, setSearchIcon] = useState(true);
  const [catData, setCatData] = useState([]);

  const toggle = () => setValue(!values);

  // Navbar height for positioning sidebar
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
      <div className="bg-white font-sans shadow lg:shadow-none text-black py-1  md:py-0 border-b ">
        {/* ======= DESKTOP NAV ======= */}
        <div className="max-w-[1400px] mx-auto items-center justify-between px-4 hidden md:flex h-[65px]">
          <div>
            {/* <Link to="/">
              <img
                className="w-[128px] h-[65px] -mt-2.5"
                src="/logo desk.png"
                alt="Logo"
              />
            </Link> */}
            <Link to="/">
              <img
                className="w-[120px] h-[55px] mb-1.5"
                src="https://7vgva7cju0vcfvwf.public.blob.vercel-storage.com/c5c44365-8659-46b0-8653-d5af8a80a399.png"
                alt="Logo"
              />
            </Link>
          </div>

          <div className="w-1/2">
            <SearchBar />
          </div>

          <div className="flex items-center gap-4">
            <Link to="/offer" className="group">
              <div
                className="
      relative
      flex
      items-center
      gap-2
      px-4
      py-2
      rounded-full
      overflow-hidden
      bg-gradient-to-r
      from-[#1565c0]
      via-[#1976d2]
      to-[#42a5f5]
      shadow-[0_4px_20px_rgba(25,118,210,0.35)]
      hover:shadow-[0_8px_30px_rgba(25,118,210,0.5)]
      transition-all
      duration-300
      hover:scale-[1.03]
    "
              >
                {/* Animated Glow */}
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent animate-[shine_4s_linear_infinite]" />

                {/* Live Pulse */}
                <div className="absolute left-2">
                  <span className="relative flex h-2.5 w-2.5">
                    <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-white opacity-75"></span>
                    <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-white"></span>
                  </span>
                </div>

                {/* Icon */}
                <div
                  className="
        ml-3
        flex
        items-center
        justify-center
        h-7
        w-7
        rounded-full
        bg-white
        shadow-sm
      "
                >
                  <FiPercent size={15} className="text-[#1976d2]" />
                </div>

                {/* Text */}
                <span
                  className="
        relative
        z-10
        text-xs
        font-extrabold
        text-white
        uppercase
        tracking-[0.18em]
      "
                >
                  Live Offers
                </span>

                {/* Badge */}
                <span
                  className="
        bg-white/10
        backdrop-blur-sm
        text-white
        text-[9px]
        font-bold
        px-2
        py-[2px]
        rounded-full
        border
        border-white/30
      "
                >
                  HOT
                </span>
              </div>
            </Link>

            {/* Track Order */}
            <div
              onClick={() => navigate("/track-order")}
              className="
    group
    cursor-pointer
    h-11
    w-11
    rounded-xl

    bg-white
    flex
    items-center
    justify-center

    hover:border-[#1976d2]/30
    hover:bg-blue-50
    hover:shadow-md
    transition-all
    duration-300
  "
              title="Track Order"
            >
              <FiTruck
                size={20}
                className="
      text-slate-700
      group-hover:text-[#1976d2]
      group-hover:scale-110
      transition-all
      duration-300
    "
              />
            </div>

            {/* Cart */}
            <div
              className="
    relative
    group
    h-11
    w-11
    rounded-xl
    bg-white
    flex
    items-center
    justify-center
    hover:border-[#1976d2]/30
    hover:bg-blue-50
    hover:shadow-md
    transition-all
    duration-300
  "
              title="Cart"
            >
              <Link to="/checkout/cart">
                <i
                  className="
        ri-shopping-cart-2-line
        text-[22px]
        text-slate-700
        group-hover:text-[#1976d2]
        group-hover:scale-110
        transition-all
        duration-300
      "
                />
              </Link>

              {cartItems.length > 0 && (
                <>
                  {/* Pulse Ring */}
                  <span className="absolute -top-1 -right-1 h-5 w-5 rounded-full bg-[#fe741d] animate-ping opacity-30"></span>

                  {/* Counter */}
                  <span
                    className="
          absolute
          -top-1
          -right-1
          min-w-[18px]
          h-[18px]
          flex
          items-center
          justify-center
          bg-[#fe741d]
          text-white
          text-[10px]
          font-bold
          rounded-full
          shadow-md
          border
          border-white
        "
                  >
                    {cartItems.length}
                  </span>
                </>
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
              className="h-[39px]  ml-18"
              src="https://7vgva7cju0vcfvwf.public.blob.vercel-storage.com/c5c44365-8659-46b0-8653-d5af8a80a399.png"
              alt="Logo"
            />
          </Link>

          <div className="flex items-center gap-3 w-[110px] justify-end">
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
