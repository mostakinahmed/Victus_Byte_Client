import React from "react";
import { motion } from "framer-motion"; // 1. Import motion
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
  // 2. Define fast, snappy variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.08, // Very fast sequence between sections
      },
    },
  };

  const sectionVariants = {
    hidden: { opacity: 0, y: 15 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.4, ease: "easeOut" },
    },
  };

  return (
    // 3. Wrap everything in a motion.div
    <motion.div initial="hidden" animate="visible" variants={containerVariants}>
      <motion.div variants={sectionVariants}>
        <HeroSection />
      </motion.div>

      <motion.div variants={sectionVariants}>
        <FeaturedCategory />
      </motion.div>

      <motion.div variants={sectionVariants}>
        <TopCategoryCards />
      </motion.div>

      <motion.div variants={sectionVariants}>
        <FlashSale />
      </motion.div>

      <motion.div variants={sectionVariants}>
        <HorizontalAds />
      </motion.div>

      <motion.div variants={sectionVariants}>
        <FeatureProduct />
      </motion.div>

      <motion.div variants={sectionVariants}>
        <NewArrival />
      </motion.div>

      <motion.div variants={sectionVariants}>
        <FirstBanner />
      </motion.div>

      <motion.div variants={sectionVariants}>
        <AllProduct />
      </motion.div>
    </motion.div>
  );
};
