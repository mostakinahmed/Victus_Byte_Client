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
    <div className="flex flex-col gap-4 items-center justify-center min-h-screen">
      {/* Spinning loader */}
      <AiOutlineLoading3Quarters className="text-6xl text-blue-500 animate-spin" />

      {/* Data icon */}
      <MdStorage className="text-5xl text-gray-400" />

      {/* Loading text */}
      <div className="text-gray-700 text-lg font-medium">
        Loading your data...
      </div>
      <div className="text-gray-500 text-sm">
        Please wait a moment while we fetch your latest updates
      </div>
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
        <Route path="/product/:cat/:id" element={<ProductDetails />} />
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
