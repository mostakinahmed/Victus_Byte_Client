import { React, useContext, useEffect, useState } from "react";
import { useLocation, Route, Routes } from "react-router-dom";
import Navber from "./components/Home/Navber";
import CatMenu from "./components/Home/CatMenu.jsx";
import { Home } from "./pages/Home";
import AllProduct from "./pages/AllProduct.jsx";
import ProductDetails from "./components/Product Details/ProductDetails.jsx";
import { Offer } from "./pages/Offer.jsx";
import Footer from "./components/Footer.jsx";
import { BuyNow } from "./pages/BuyNow.jsx";
import { Cart } from "./pages/Cart.jsx";
import { CartProvider } from "./components/Context Api/CartContext.jsx";
import ProfileHome from "./pages/ProfileHome.jsx";
import TempHome from "./pages/TempHome.jsx";
import TechGadgetHome from "./pages/TechGadgetHome.jsx";
import SearchResult from "./pages/SearchResult";
import SignUp from "./components/Authentication/SignUp";
import SignIn from "./components/Authentication/SignIn";
import Profile from "./components/Profile/Profile";
import TrackOrder from "./components/TrackOrder";
import { DataContext } from "./components/Context Api/UserContext";
import { MyOrders } from "./components/Profile/MyOrder";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { MdStorage } from "react-icons/md";
import FooterLinks from "./components/PolicyCard";

const Loader = () => (
  <div
    style={{
      height: "100vh",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
    }}
  >
    <div className="flex flex-col items-center justify-center min-h-screen bg-slate-50">
      {/* Container with Glassmorphism effect */}
      <div className="flex flex-col items-center p-10 bg-white/40 backdrop-blur-md rounded-3xl border border-white/20 shadow-xl">
        {/* Spinner Wrapper with a pulse glow */}
        <div className="relative flex items-center justify-center mb-6">
          <div className="absolute w-16 h-16 bg-blue-400/20 rounded-full animate-ping"></div>
          <AiOutlineLoading3Quarters className="text-5xl text-blue-600 animate-spin relative z-10" />
        </div>

        {/* Loading Text with character spacing */}
        <h2 className="text-gray-800 text-xl font-bold tracking-widest uppercase">
          Loading
          <span className="inline-flex ml-1">
            <span className="animate-[bounce_1.5s_infinite_100ms]">.</span>
            <span className="animate-[bounce_1.5s_infinite_200ms]">.</span>
            <span className="animate-[bounce_1.5s_infinite_300ms]">.</span>
          </span>
        </h2>

        <p className="text-gray-500 text-sm mt-2 font-medium">
          Synchronizing your data...
        </p>
      </div>

      {/* Optional: Subtle background decorative blobs */}
      <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-blue-100 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob"></div>
      <div className="absolute bottom-1/4 right-1/4 w-64 h-64 bg-indigo-100 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob animation-delay-2000"></div>
    </div>
  </div>
);

function App() {
  const { productData } = useContext(DataContext);
  const location = useLocation();

  const [loading, setLoading] = useState(true);

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

  const isTempHome = location.pathname === "/";

  // Show loader while backend/data is loading
  if (loading) return <Loader />;

  return (
    <CartProvider>
      {!isTempHome && (
        <div className="fixed top-0 w-full z-50">
          <Navber />
          <CatMenu />
        </div>
      )}

      <Routes>
        <Route path="/" element={<TempHome />} />
        <Route path="/home" element={<Home />} />
        <Route path="/:cat" element={<AllProduct />} />
        <Route path="/:cat/:name" element={<ProductDetails />} />
        <Route path="/offer" element={<Offer />} />
        <Route path="/product/:cat/:id/buynow" element={<BuyNow />} />
        <Route path="/checkout/cart" element={<Cart />} />
        <Route path="/profile/:card" element={<ProfileHome />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/profile/my-order" element={<MyOrders />} />
        <Route path="/home-new" element={<TechGadgetHome />} />
        <Route path="/search-result/:keyword" element={<SearchResult />} />
        <Route path="/signin" element={<SignIn />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/track-order" element={<TrackOrder />} />
        <Route path="/checkout/purchase" element={<BuyNow />} />
      </Routes>

      <FooterLinks />
      {!isTempHome && <Footer />}
    </CartProvider>
  );
}

export default App;
