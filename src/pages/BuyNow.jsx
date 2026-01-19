import React, { useContext, useEffect, useState } from "react";
import { motion } from "framer-motion"; // 1. Import motion
import { HomeBuy } from "../components/Buy Now/HomeBuy.jsx";
import { RelatedProduct } from "../components/Product Details/RelatedProduct";
import { DataContext } from "../components/Context Api/UserContext.jsx";

export const BuyNow = () => {
  const { productData } = useContext(DataContext);
  const [items, setItems] = useState([]);

  useEffect(() => {
    const cartItems = JSON.parse(localStorage.getItem("cart")) || [];
    const merged = cartItems
      .map((cartItem) => {
        const product = productData.find((p) => p.pID === cartItem.pID);
        if (!product) return null;
        return { ...product, qty: cartItem.qty || 1 };
      })
      .filter(Boolean);
    setItems(merged);
  }, [productData]);

  const categoryList = items.flatMap((item) =>
    Array.isArray(item.category) ? item.category : [item.category],
  );
  const uniqueCategories = [...new Set(categoryList)];

  let relatedProducts = productData.filter(
    (item) =>
      uniqueCategories.includes(item.category) &&
      !items.some((cartItem) => cartItem.pID === item.pID),
  );

  relatedProducts = relatedProducts.sort(() => Math.random() - 0.5);
  const allProductsInCategory = relatedProducts.slice(0, 6);

  // Animation Variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1 },
    },
  };

  const leftSlide = {
    hidden: { opacity: 0, x: -15 },
    visible: {
      opacity: 1,
      x: 0,
      transition: { duration: 0.3, ease: "easeOut" },
    },
  };

  const rightSlide = {
    hidden: { opacity: 0, x: 15 },
    visible: {
      opacity: 1,
      x: 0,
      transition: { duration: 0.3, ease: "easeOut" },
    },
  };

  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={containerVariants}
      className="max-w-[1400px] mx-auto flex mt-[60px] md:mt-[105px] mb-4 overflow-hidden"
    >
      {/* Checkout form (Left Side) */}
      <motion.div variants={leftSlide} className="flex-1">
        <HomeBuy data={items} />
      </motion.div>

      {/* Related products (Right Side - Desktop Only) */}
      <motion.div variants={rightSlide} className="hidden lg:flex">
        <RelatedProduct data={allProductsInCategory} />
      </motion.div>
    </motion.div>
  );
};
