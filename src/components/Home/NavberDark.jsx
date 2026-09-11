import React, { useContext, useEffect, useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import "remixicon/fonts/remixicon.css";
import { CartContext } from "../Context Api/CartContext";
import { DataContext } from "../Context Api/UserContext";
import { SearchBar } from "../SearchBar";
import { Profile } from "../Profile/ProfileNav";
import { FiTruck, FiPercent, FiRefreshCw } from "react-icons/fi";
import { ArrowLeftRight, Sidebar } from "lucide-react";
import Header from "../Home/Header";
import { ModernSidebar } from "./Sidebar";

const NavbarDark = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { cartItems, updateCart } = useContext(CartContext);
  const { categoryData, productData } = useContext(DataContext);

  const [compare, setComapre] = useState(0);
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
  const navHeight = isScrolled ? "top-[48px]" : "top-[51.5px]";

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
      <div className="bg-black font-sans shadow lg:shadow-none text-black py-1  md:py-2 md:border-b ">
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
                className="w-[190px] h-[53px] outline-none"
                src="/logo/web NAV tp white1.png"
                alt="Logo"
              />
            </Link>
          </div>

          <div className="w-[550px] md:ml-5">
            <SearchBar />
          </div>

          <div className="flex items-center gap-4">
            <Link
              to="/offer"
              className="flex items-center gap-1 text-sm font-semibold"
            >
              <span className="text-base">🎁</span>

              <span
                className="
    bg-gradient-to-r
    from-brand
    via-red-700
    to-yellow-400
    bg-clip-text
    text-transparent text-[17px] font-extrabold
  "
              >
                Offers
              </span>
            </Link>

            {/*   for compare */}
            <button
              onClick={() => navigate("/product/compare")}
              className="relative flex items-center gap-2 px-1 py-1.5 rounded-full transition-all group cursor-pointer"
              aria-label="Compare Products"
            >
              {/* Compare Icon */}
              <img
                src="https://7vgva7cju0vcfvwf.public.blob.vercel-storage.com/Untitled%20design%20%289%29.png"
                alt=""
                className="w-4 h-5"
              />
              {/* Button Text */}
              <span className="md:text-md font-bold tracking-wide  text-white/90 hover:text-brand">
                Compare
              </span>

              {/* Notification Count Badge */}
              {compare > 0 && (
                <span
                  className="absolute -top-1.5 left-4 w-5 h-5 flex items-center justify-center text-[12px] font-black text-white rounded-full "
                  style={{ backgroundColor: "#F66107" }}
                >
                  {compare}
                </span>
              )}
            </button>
            {/* Track Order */}
            <div
              onClick={() => navigate("/track-order")}
              className="
    group
    relative
    cursor-pointer
    h-9
    w-11
    rounded-xl

    bg-white/5
    border
    border-white/10

    flex
    items-center
    justify-center

    hover:bg-[#1976d2]/10
    hover:border-[#1976d2]/40
    hover:shadow-[0_0_15px_rgba(25,118,210,0.20)]

    transition-all
    duration-300
  "
              title="Track Order"
            >
              <FiTruck
                size={19}
                className="
      text-slate-300
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
    h-9
    w-11
    rounded-xl

    bg-white/5
    border
    border-white/10

    flex
    items-center
    justify-center

    hover:bg-[#F66107]/10
    hover:border-[#F66107]/40
    hover:shadow-[0_0_15px_rgba(246,97,7,0.20)]

    transition-all
    duration-300
  "
              title="Cart"
            >
              <Link
                to="/checkout/cart"
                className="flex items-center justify-center"
              >
                <i
                  className="
        ri-shopping-cart-2-line
        text-[21px]
        text-slate-300

        group-hover:text-[#F66107]
        group-hover:scale-110

        transition-all
        duration-300
      "
                />
              </Link>

              {cartItems.length > 0 && (
                <>
                  {/* Pulse Ring */}
                  <span
                    className="
          absolute
          -top-1
          -right-1
          h-5
          w-5
          rounded-full
          bg-[#F66107]
          animate-ping
          opacity-30
        "
                  />

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

          bg-[#F66107]
          text-white
          text-[10px]
          font-bold

          rounded-full
          shadow-lg
          border
          border-black
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
        <div className="bg-black w-full h-[45px] md:hidden flex items-center justify-between px-3">
          <div
            className="text-2xl cursor-pointer text-white/90"
            onClick={toggle}
          >
            <i
              className={
                values ? "ri-close-line text-white/90" : "ri-menu-2-line"
              }
            ></i>
          </div>

          <Link to="/">
            <img
              className="h-[42px]  ml-17 p-1"
              src="/logo/web NAV tp white1.png"
              alt="Logo"
            />
          </Link>

          <div className="flex items-center gap-3 w-[110px] justify-end">
            {searchIcon && (
              <i
                className="ri-search-line text-xl text-white/85"
                onClick={() => setSbar(!sBar)}
              ></i>
            )}
            <div className="relative ml-1">
              <Link to="/checkout/cart">
                <i className="ri-shopping-cart-2-line text-2xl text-white/80"></i>
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
          <div className="  mx-2 mt-5 pb-2 md:hidden">
            <SearchBar />
          </div>
        )}

        {/* ======= SIDEBAR + OVERLAY ======= */}
        <div
          className={`fixed inset-0 ${navHeight} bg-black/20 backdrop-blur-sm z-40 transition-opacity duration-300 ${
            values ? "opacity-100 visible" : "opacity-0 invisible"
          }`}
          onClick={() => setValue(false)}
        />

        <ModernSidebar
          isOpen={values}
          onClose={() => setValue(false)}
          catData={catData}
        />
      </div>
    </>
  );
};

export default NavbarDark;
