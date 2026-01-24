import { React, useContext, useEffect, useState } from "react";
import { useLocation, Route, Routes } from "react-router-dom";
import Navber from "./components/Home/Navber";
import CatMenu from "./components/Home/CatMenu.jsx";
import { Home } from "./pages/Home";
import AllProduct from "./pages/AllProduct.jsx";
import ProductDetails from "./components/Product Details/ProductDetails.jsx";
import { Offer } from "./pages/Offer.jsx";
import Footer from "./components/Footer/Footer.jsx";
import { BuyNow } from "./pages/BuyNow.jsx";
import { Cart } from "./pages/Cart.jsx";
import { CartProvider } from "./components/Context Api/CartContext.jsx";
import ProfileHome from "./pages/ProfileHome.jsx";
import SearchResult from "./pages/SearchResult";
import SignUp from "./components/Authentication/SignUp";
import SignIn from "./components/Authentication/SignIn";
import Profile from "./components/Profile/Profile";
import TrackOrder from "./components/TrackOrder";
import { DataContext } from "./components/Context Api/UserContext";
import { MyOrders } from "./components/Profile/MyOrder";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import FooterLinks from "./components/PolicyCard";
import AboutUs from "./components/Footer/AboutUs";
import Contact from "./components/Footer/Contact";
import FAQ from "./components/Footer/FAQ";
import Shipping from "./components/Footer/Shipping";
import Return from "./components/Footer/Return";
import Payment from "./components/Footer/Payment";
import KidsZone from "./components/Kids Zone/KidsZone";
import Electronics from "./components/Electronics/Electronics";
import SectionList from "./pages/SectionList";
import Header from "./components/Home/Header";
import  TestBuy  from "./components/Buy Now/TestBuy";

const Loader = () => (
  <div className="fixed inset-0 flex items-center justify-center bg-white z-50">
    <div className="flex flex-col items-center max-w-xs w-full px-6">
      {/* Modern Icon Container */}
      <div className="relative mb-8">
        {/* Subtle Outer Pulse */}
        <div className="absolute inset-0 rounded-full bg-indigo-50 animate-pulse scale-150" />

        {/* Main Spinner */}
        <AiOutlineLoading3Quarters className="text-4xl text-indigo-600 animate-spin relative z-10" />
      </div>

      {/* Brand/Status Text */}
      <div className="text-center space-y-2">
        <h2 className="text-slate-900 text-lg font-semibold tracking-tight">
          Preparing your experience
        </h2>
        <p className="text-slate-500 text-sm font-light">
          Securely connecting to our servers...
        </p>
      </div>

      {/* Minimalist Progress Bar (Optional but high-end) */}
      <div className="w-full h-1 bg-slate-100 rounded-full mt-8 overflow-hidden">
        <div className="h-full bg-indigo-600 rounded-full animate-[loading_2s_ease-in-out_infinite] w-1/3" />
      </div>
    </div>

    <style jsx>{`
      @keyframes loading {
        0% {
          transform: translateX(-100%);
        }
        50% {
          transform: translateX(100%);
        }
        100% {
          transform: translateX(200%);
        }
      }
    `}</style>
  </div>
);

function App() {
  const { productData } = useContext(DataContext);
  const location = useLocation();
  const [loading, setLoading] = useState(true);
  const [isScrolled, setIsScrolled] = useState(false);

  // Stop loader as soon as productData is available
  useEffect(() => {
    if (productData && productData.length > 0) {
      setLoading(false);
    }
  }, [productData]);

  // Scroll to top on route change
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);

  // Handle Scroll logic for Animated Header
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  if (loading) return <Loader />;

  return (
    <CartProvider>
      {/* 1. NAVIGATION WRAPPER: Moves from top-10 to top-0 */}
      <div
        className={`fixed left-0 w-full z-50  ${
          isScrolled ? "top-0 " : "top-0"
        }`}
      >
        {/* 2. SLIM HEADER CONTAINER: Shrinks height to 0 and fades out */}
        <div
          className={`transition-all md:duration-400 duration-300 ease-in-out overflow-hidden ${
            isScrolled ? "h-0 opacity-0" : "h-7 md:h-10 opacity-100"
          }`}
        >
          <Header />
        </div>

        {/* Navbar and Category Menu remain visible but move up with the wrapper */}
        <Navber />
        <CatMenu />
      </div>

      {/* 3. MAIN CONTENT: Added padding-top (pt-44) so content isn't 
          hidden behind the fixed navigation on load.
      */}
      <main className="md:pt-10 pt-6">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/:cat" element={<AllProduct />} />
          <Route path="/:cat/:name" element={<ProductDetails />} />
          <Route path="/offer" element={<Offer />} />
          <Route path="/product/:cat/:id/buynow" element={<BuyNow />} />
          <Route path="/checkout/cart" element={<Cart />} />
          <Route path="/profile/:card" element={<ProfileHome />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/profile/my-order" element={<MyOrders />} />
          <Route path="/search-result/:keyword" element={<SearchResult />} />
          <Route path="/signin" element={<SignIn />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/track-order" element={<TrackOrder />} />
          <Route path="/checkout/purchase" element={<BuyNow />} />
          <Route path="/kids-zone" element={<KidsZone />} />
          <Route path="/electronics" element={<Electronics />} />
          <Route path="/section/:section" element={<SectionList />} />
          <Route path="/about-us" element={<AboutUs />} />
          <Route path="/contact-us" element={<Contact />} />
          <Route path="/faq" element={<FAQ />} />
          <Route path="/shipping-info" element={<Shipping />} />
          <Route path="/return-policy" element={<Return />} />
          <Route path="/payment-info" element={<Payment />} />
          <Route path="/test-buy" element={<TestBuy />} />


        </Routes>
      </main>

      <FooterLinks />
      <Footer />
    </CartProvider>
  );
}

export default App;
