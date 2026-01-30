import React from "react";
import HeroSection from "../components/Home/Hero.jsx";
import FeaturedCategory from "../components/FeatureCategory.jsx";
import { FeatureProduct } from "../components/Home/FeatureProduct.jsx";
import HorizontalAds from "../components/Home/HorizontalAds.jsx";
import FlashSale from "../components/Home/FlashSale.jsx";
import AllProduct from "../components/Home/AllProduct.jsx";
import TopCategoryCards from "../components/Home/TopCategoryCards.jsx";
import FirstBanner from "../components/Home/FirstBanner.jsx";
import NewArrival from "../components/Home/NewArrival.jsx";

export const Home = () => {
  return (
    <div>
      <HeroSection />
      <FeaturedCategory />
      <TopCategoryCards />
      <FlashSale />
      <HorizontalAds />
      <FeatureProduct />
      <NewArrival />
      <FirstBanner />
      <AllProduct />

      
    </div>
  );
};
